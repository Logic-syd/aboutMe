'use client';

import { useEffect, useRef, useState } from 'react';
import type { FeatureCollection } from 'geojson';
import type { Map as LeafletMap, PathOptions } from 'leaflet';
import type { PlaceStory } from '@/lib/place-stories';

export function PlaceMap({ place }: { place: PlaceStory }) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const areaBounds = useRef(place.bounds);
  const [state, setState] = useState<'loading' | 'ready' | 'unavailable'>('loading');

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const controller = new AbortController();
    let disposed = false;
    let resize: ResizeObserver | undefined;
    const timeout = window.setTimeout(() => { controller.abort(); if (!disposed) setState('unavailable'); }, 8000);
    async function load() {
      try {
        const [L, response] = await Promise.all([import('leaflet'), fetch(`/maps/${place.slug}.geojson`, { signal: controller.signal })]);
        if (!response.ok) throw new Error('Map data unavailable');
        const data: FeatureCollection = await response.json();
        if (disposed || controller.signal.aborted) return;
        if (data.bbox?.length === 4) areaBounds.current = [[data.bbox[1], data.bbox[0]], [data.bbox[3], data.bbox[2]]];
        const bounds = areaBounds.current;
        const instance = L.map(element!, { scrollWheelZoom: false, zoomControl: false, minZoom: 10, maxZoom: 16, zoomSnap: .1, maxBounds: L.latLngBounds(bounds).pad(.2), maxBoundsViscosity: .9 });
        map.current = instance;
        instance.fitBounds(bounds, { padding: [8, 8], animate: false });
        instance.attributionControl.setPrefix(false);
        instance.attributionControl.addAttribution('© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors');
        L.control.zoom({ position: 'bottomleft' }).addTo(instance);
        L.control.scale({ imperial: false, position: 'bottomright' }).addTo(instance);
        function style(kind: string, roadClass?: string): PathOptions {
          if (kind === 'water') return { color: '#b9d5d8', weight: .8, fillColor: '#c7dfe0', fillOpacity: 1 };
          if (kind === 'park') return { color: '#cdd7bd', weight: .5, fillColor: '#dce4ce', fillOpacity: .85 };
          if (kind === 'waterway') return { color: '#b3d2d7', weight: 3, opacity: .9 };
          const major = ['motorway', 'trunk', 'primary', 'secondary'].includes(roadClass ?? '');
          return { color: major ? '#d5bca9' : '#d9d6cc', weight: major ? 2.2 : 1.2, opacity: .9 };
        }
        // Keep land and water beneath the road network; all geometry is real OSM data.
        const ordered: FeatureCollection = { ...data, features: [...data.features].sort((a,b) => {
          const rank = (kind: string) => ({ park: 0, water: 1, waterway: 2, road: 3 })[kind] ?? 0;
          return rank(a.properties?.kind) - rank(b.properties?.kind);
        }) };
        L.geoJSON(ordered, {
          style: feature => style(feature?.properties?.kind, feature?.properties?.roadClass),
          onEachFeature: (feature, layer) => {
            if (!feature.properties?.name) return;
            const label = document.createElement('span');
            label.textContent = feature.properties.name;
            layer.bindTooltip(label, { sticky: true, className: 'place-feature-tooltip' });
          },
        }).addTo(instance);
        instance.setMinZoom(Math.floor(instance.getBoundsZoom(bounds)) - 1);
        L.circle(place.reference, { radius: 450, color: '#b33f66', weight: 1.5, dashArray: '5 5', fillColor: '#d76f91', fillOpacity: .12, interactive: false }).addTo(instance);
        instance.fitBounds(bounds, { padding: [8, 8], animate: false });
        resize = new ResizeObserver(() => { instance.invalidateSize(); instance.fitBounds(bounds, { padding: [8, 8], animate: false }); });
        resize.observe(element!);
        window.clearTimeout(timeout);
        setState('ready');
      } catch {
        window.clearTimeout(timeout);
        if (!disposed) { resize?.disconnect(); map.current?.remove(); map.current = null; setState('unavailable'); }
      }
    }
    load();
    return () => { disposed = true; controller.abort(); window.clearTimeout(timeout); resize?.disconnect(); map.current?.remove(); map.current = null; };
  }, [place]);

  return <div className={`place-map-frame ${state === 'unavailable' ? 'is-unavailable' : ''}`}>
    <div ref={container} className="career-map-canvas geographic-map" role="region" aria-label={`Geographic map of ${place.name}, ${place.region}`} />
    {state === 'ready' && <><div className="place-map-badge"><span className="eyebrow">AREA VIEW</span><strong>{place.name}</strong><small>{place.region}</small></div><span className="place-map-north" aria-hidden="true">N ↑</span></>}
    {state === 'loading' && <p className="place-map-status" role="status">Opening {place.name}…</p>}
    {state === 'unavailable' && <p className="place-map-status" role="status">The area map could not load. You can still read the place story below or return to the growth map.</p>}
    {state === 'ready' && <button className="place-map-reset" type="button" onClick={() => map.current?.fitBounds(areaBounds.current, { padding: [8, 8], animate: false })}>Reset area view ↗</button>}
  </div>;
}
