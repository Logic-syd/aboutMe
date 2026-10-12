"""Export Berlin's Wedding area from EqualStreetNames' published OSM GeoJSON.

Download the source once, then pass its local path to this script:
  curl -L https://raw.githubusercontent.com/EqualStreetNames/equalstreetnames-berlin/master/data/ways.geojson -o /tmp/berlin-ways.geojson
  python3 scripts/export-berlin-map.py /tmp/berlin-ways.geojson

Only street geometry and names are retained. Map data: OpenStreetMap, ODbL 1.0.
"""
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

BBOX = [13.315, 52.525, 13.425, 52.58]
SOURCE = 'https://raw.githubusercontent.com/EqualStreetNames/equalstreetnames-berlin/master/data/ways.geojson'

def clip_segment(a, b):
    xmin, ymin, xmax, ymax = BBOX
    dx, dy = b[0] - a[0], b[1] - a[1]
    start, end = 0.0, 1.0
    for p, q in zip((-dx, dx, -dy, dy), (a[0]-xmin, xmax-a[0], a[1]-ymin, ymax-a[1])):
        if p == 0:
            if q < 0:
                return None
        elif p < 0:
            start = max(start, q / p)
        else:
            end = min(end, q / p)
        if start > end:
            return None
    return [[round(a[0] + t * dx, 6), round(a[1] + t * dy, 6)] for t in (start, end)]

raw = json.loads(Path(sys.argv[1]).read_text())
features, seen = [], set()
for feature in raw['features']:
    geometry = feature['geometry']
    if geometry['type'] not in ('LineString', 'MultiLineString'):
        continue
    lines = [geometry['coordinates']] if geometry['type'] == 'LineString' else geometry['coordinates']
    for line in lines:
        parts = []
        for a, b in zip(line, line[1:]):
            segment = clip_segment(a, b)
            if not segment or segment[0] == segment[1]:
                continue
            if parts and parts[-1][-1] == segment[0]:
                parts[-1].append(segment[1])
            else:
                parts.append(segment)
        for points in parts:
            key = tuple(map(tuple, points))
            if key in seen or key[::-1] in seen:
                continue
            seen.add(key)
            properties = {'kind': 'road'}
            if feature['properties'].get('name'):
                properties['name'] = feature['properties']['name']
            features.append({'type': 'Feature', 'properties': properties, 'geometry': {'type': 'LineString', 'coordinates': points}})
# One feature per named street keeps the interactive map small and responsive.
streets = {}
for feature in features:
    name = feature['properties'].get('name', '')
    streets.setdefault(name, []).append(feature['geometry']['coordinates'])
features = [{'type': 'Feature', 'properties': {'kind': 'road', **({'name': name} if name else {})}, 'geometry': {'type': 'MultiLineString', 'coordinates': lines}} for name, lines in streets.items()]
result = {'type': 'FeatureCollection', 'attribution': '© OpenStreetMap contributors', 'license': 'https://opendatacommons.org/licenses/odbl/1-0/', 'source': SOURCE, 'retrievedAt': datetime.now(timezone.utc).isoformat(), 'bbox': BBOX, 'features': features}
target = Path(__file__).resolve().parents[1] / 'public/maps/berlin.geojson'
target.write_text(json.dumps(result, ensure_ascii=False, separators=(',', ':')) + '\n')
print(f'Berlin: {len(features)} street features, {target.stat().st_size:,} bytes')
