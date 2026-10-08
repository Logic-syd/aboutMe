"""Export five small OSM extracts as simplified GeoJSON for local map rendering.
Run manually; the portfolio never calls Overpass or public tile servers at runtime.
Map data: © OpenStreetMap contributors, ODbL 1.0.
"""
import json
import math
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urlencode
from urllib.error import HTTPError
from datetime import datetime, timezone

PLACES = {
    'munich': (48.11, 11.53, 48.18, 11.64),
    'caohejing': (31.14, 121.37, 31.19, 121.44),
    'zhangjiang': (31.175, 121.565, 31.225, 121.635),
    'west-lake': (30.21, 120.105, 30.27, 120.175),
    'xixi': (30.245, 120.025, 30.295, 120.095),
}
ROOT = Path(__file__).resolve().parents[1]
ENDPOINT = 'https://api.openstreetmap.org/api/0.6/map.json'

def simplify(points, tolerance=.00006):
    if len(points) <= 2:
        return points
    a, b = points[0], points[-1]
    dx, dy = b[0]-a[0], b[1]-a[1]
    length = dx*dx+dy*dy
    far, distance = 0, 0
    for index, p in enumerate(points[1:-1], 1):
        ratio = max(0, min(1, ((p[0]-a[0])*dx+(p[1]-a[1])*dy)/length)) if length else 0
        d = math.hypot(p[0]-a[0]-ratio*dx, p[1]-a[1]-ratio*dy)
        if d > distance:
            far, distance = index, d
    if distance <= tolerance:
        return [a, b]
    return simplify(points[:far+1], tolerance)[:-1] + simplify(points[far:], tolerance)

def coords(geometry):
    return [[round(p['lon'], 6), round(p['lat'], 6)] for p in geometry if p is not None]

def rings(members, role):
    pieces = [coords(m['geometry']) for m in members if m.get('role', 'outer') == role and m.get('geometry')]
    complete = []
    while pieces:
        ring = pieces.pop()
        while ring and ring[0] != ring[-1]:
            for index, part in enumerate(pieces):
                if ring[-1] == part[0]:
                    ring += part[1:]
                elif ring[-1] == part[-1]:
                    ring += part[-2::-1]
                elif ring[0] == part[-1]:
                    ring = part[:-1] + ring
                elif ring[0] == part[0]:
                    ring = part[:0:-1] + ring
                else:
                    continue
                pieces.pop(index)
                break
            else:
                break
        if len(ring) > 3 and ring[0] == ring[-1]:
            simple = simplify(ring)
            if len(simple) >= 4:
                complete.append(simple)
    return complete

def inside(p, ring):
    x,y=p; result=False
    for a,b in zip(ring, ring[1:]):
        if (a[1]>y)!=(b[1]>y) and x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]:
            result=not result
    return result

for slug, box in PLACES.items():
    target = ROOT / 'public/maps' / f'{slug}.geojson'
    if target.exists():
        print(f'{slug}: cached', flush=True)
        continue
    # API v0.6 supports small bounding-box extracts. Narrow a dense area if
    # the documented 50,000-node limit is exceeded; retain the actual extent.
    actual = box
    for attempt in range(4):
        south, west, north, east = actual
        query_url = ENDPOINT + '?' + urlencode({'bbox': f'{west},{south},{east},{north}'})
        request = Request(query_url, headers={'User-Agent': 'YidanPortfolioMapExport/1.0 (+https://about-me-henna-alpha.vercel.app/)'})
        try:
            with urlopen(request, timeout=90) as response:
                raw = json.load(response)
            break
        except HTTPError as error:
            if error.code != 400 or attempt == 3:
                raise
            lat, lon = (south+north)/2, (west+east)/2
            height, width = (north-south)*.3, (east-west)*.3
            actual = (lat-height, lon-width, lat+height, lon+width)
    nodes = {e['id']: {'lat': e['lat'], 'lon': e['lon']} for e in raw['elements'] if e['type'] == 'node'}
    ways = {e['id']: e for e in raw['elements'] if e['type'] == 'way'}
    for way in ways.values():
        way['geometry'] = [nodes[n] for n in way.get('nodes',[]) if n in nodes]
    for relation in (e for e in raw['elements'] if e['type'] == 'relation'):
        for member in relation.get('members',[]):
            if member['type'] == 'way' and member['ref'] in ways:
                member['geometry'] = ways[member['ref']]['geometry']
    elements = [e for e in raw['elements'] if e['type'] in ['way','relation'] and (
        e.get('tags',{}).get('highway') in ['motorway','trunk','primary','secondary','tertiary','residential','unclassified'] or
        e.get('tags',{}).get('waterway') in ['river','canal'] or
        e.get('tags',{}).get('natural') == 'water' or
        e.get('tags',{}).get('leisure') == 'park' or
        e.get('tags',{}).get('landuse') in ['forest','recreation_ground'])]
    features=[]
    for element in elements:
        tags=element.get('tags',{})
        kind='road' if 'highway' in tags else 'waterway' if 'waterway' in tags else 'water' if tags.get('natural')=='water' else 'park'
        properties={'kind':kind,'osmId':f"{element['type']}/{element['id']}"}
        if tags.get('name:en') or tags.get('name'):
            properties['name']=tags.get('name:en',tags.get('name'))
        if kind=='road': properties['roadClass']=tags['highway']
        if element['type']=='relation':
            outer=rings(element.get('members',[]),'outer')
            inner=rings(element.get('members',[]),'inner')
            polygons=[[ring]+[hole for hole in inner if inside(hole[0],ring)] for ring in outer]
            if not polygons: continue
            geometry={'type':'MultiPolygon','coordinates':polygons}
        else:
            points=coords(element.get('geometry',[]))
            if len(points)<2: continue
            closed=points[0]==points[-1] and kind in ['water','park']
            points=simplify(points)
            if closed and len(points)<4: continue
            geometry={'type':'Polygon','coordinates':[points]} if closed else {'type':'LineString','coordinates':points}
        features.append({'type':'Feature','properties':properties,'geometry':geometry})
    result={'type':'FeatureCollection','attribution':'© OpenStreetMap contributors','license':'https://opendatacommons.org/licenses/odbl/1-0/','source':ENDPOINT,'retrievedAt':datetime.now(timezone.utc).isoformat(),'bbox':[actual[1],actual[0],actual[3],actual[2]],'features':features}
    target.write_text(json.dumps(result,ensure_ascii=False,separators=(',',':'))+'\n')
    print(f'{slug}: {len(features)} features, {target.stat().st_size:,} bytes',flush=True)
