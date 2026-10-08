'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Map as LeafletMap, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { experiences } from '@/lib/experience';

// Positions in our original schematic artwork, intentionally not GPS coordinates.
const schematicPoints: [number, number][] = [[305, 257], [429, 677], [151, 863], [429, 863], [151, 677]];
const artworkBounds: [[number, number], [number, number]] = [[0, 0], [600, 1000]];

export function CareerMap() {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const markers = useRef<Marker[]>([]);
  const [selectedId, setSelectedId] = useState(experiences[0].id);
  const [mapState, setMapState] = useState<'loading' | 'ready' | 'unavailable'>('loading');
  const selected = experiences.find(e => e.id === selectedId)!;

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let disposed = false;
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting || disposed) return;
      observer.disconnect();
      try {
        const L = await import('leaflet');
        if (disposed) return;
        const instance = L.map(element, { crs: L.CRS.Simple, scrollWheelZoom: false, minZoom: -3, maxZoom: 1.5, zoomSnap: .1, zoomDelta: .5, zoomControl: false, attributionControl: false, maxBounds: [[-200, -200], [800, 1200]], maxBoundsViscosity: .9 });
        map.current = instance;
        L.control.zoom({ position: 'bottomleft' }).addTo(instance);
        L.imageOverlay('/images/career-map.svg', artworkBounds, { alt: 'Illustrative career map: Munich enlarged on the left, Shanghai upper right, Hangzhou lower right. Not to scale.', interactive: false }).on('error', () => { if (!disposed) setMapState('unavailable'); }).addTo(instance);
        markers.current = experiences.map((experience, index) => {
          const marker = L.marker(schematicPoints[index], { icon: L.divIcon({ className: `career-pin ${index === 0 ? 'current-base-pin' : ''}`, html: `<span>${index + 1}</span>`, iconSize: [36, 36], iconAnchor: [18, 18] }), title: `${experience.company} — ${experience.area}`, alt: `${experience.company} — ${experience.area}`, keyboard: true }).addTo(instance);
          marker.bindTooltip(`${experience.company}<br>${experience.area}`, { direction: 'top', offset: [0, -18] });
          marker.on('click', () => setSelectedId(experience.id));
          marker.on('add', () => {
            const icon = marker.getElement();
            if (!icon) return;
            icon.tabIndex = 0;
            icon.setAttribute('role', 'button');
            icon.setAttribute('aria-label', `${experience.company} — ${experience.area}`);
            icon.addEventListener('keydown', event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                event.stopPropagation();
                setSelectedId(experience.id);
              }
            });
          });
          return marker;
        });
        instance.fitBounds(artworkBounds, { padding: [10, 10], animate: false });
        const resize = new ResizeObserver(() => { instance.invalidateSize(); instance.fitBounds(artworkBounds, { padding: [10, 10], animate: false }); });
        resize.observe(element);
        instance.on('unload', () => resize.disconnect());
        setMapState('ready');
      } catch { if (!disposed) setMapState('unavailable'); }
    }, { rootMargin: '100px' });
    observer.observe(element);
    return () => { disposed = true; observer.disconnect(); map.current?.remove(); map.current = null; markers.current = []; };
  }, []);

  useEffect(() => {
    markers.current.forEach((marker, index) => {
      const active = experiences[index].id === selectedId;
      const icon = marker.getElement();
      icon?.classList.toggle('is-selected', active);
      icon?.setAttribute('aria-pressed', String(active));
      marker.setZIndexOffset(active ? 1000 : 0);
    });
  }, [selectedId, mapState]);

  function selectExperience(id: string) {
    setSelectedId(id);
    if (map.current) map.current.fitBounds(artworkBounds, { padding: [10, 10], animate: false });
  }
  return <div className="career-explorer">
    <div className="career-location-picker" aria-label="Select work location">{experiences.map((experience,index) => <button key={experience.id} onClick={() => selectExperience(experience.id)} aria-pressed={selectedId === experience.id}><span className="location-number">0{index+1}</span><span><strong>{experience.company}</strong><small>{experience.area}</small></span><span aria-hidden="true">↗</span></button>)}</div>
    <div className="career-map-panel"><div className="map-toolbar"><span className="eyebrow">CAREER MAP / NOT TO SCALE</span><button type="button" onClick={() => map.current?.fitBounds(artworkBounds, { padding: [10, 10], animate: false })} disabled={mapState === 'loading'}>Show all locations ↗</button></div><div ref={container} className="career-map-canvas schematic-map" role="region" aria-label="Interactive illustrated map of Yidan’s work locations" />{mapState === 'unavailable' && <p className="map-fallback" role="status">Map unavailable. You can still select a work area to read the experience details.</p>}<div className="career-selected" aria-live="polite"><p className="eyebrow">{selected.city} / {selected.domain}</p><h3>{selected.company}</h3><p>{selected.description}</p>{selected.project && <Link className="text-link" href={`/projects/${selected.project}`}>Explore related project ↗</Link>}</div></div>
    <p className="map-note">Illustrative map, not to scale. Munich is my current base; the pins show approximate work areas rather than exact office addresses.</p>
  </div>;
}
