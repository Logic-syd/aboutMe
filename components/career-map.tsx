'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Map as LeafletMap, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { experiences } from '@/lib/experience';
import { placeStories } from '@/lib/place-stories';
import { PlaceMap } from '@/components/place-map';

// Positions in our original schematic artwork, intentionally not GPS coordinates.
const schematicPoints: Record<string, [number, number]> = { sungrow: [305, 257], danzhu: [429, 677], longshine: [151, 863], glp: [429, 863], fingard: [151, 677] };
const artworkBounds: [[number, number], [number, number]] = [[0, 0], [600, 1000]];

export function CareerMap() {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const markers = useRef<Marker[]>([]);
  const [selectedId, setSelectedId] = useState(experiences[0].id);
  const [areaView, setAreaView] = useState(false);
  const [mapState, setMapState] = useState<'loading' | 'ready' | 'unavailable'>('loading');
  const selected = experiences.find(e => e.id === selectedId)!;
  const place = placeStories[selectedId];

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
          const marker = L.marker(schematicPoints[experience.id], { icon: L.divIcon({ className: `career-pin ${index === 0 ? 'current-base-pin' : ''}`, html: `<span>${index + 1}</span>`, iconSize: [36, 36], iconAnchor: [18, 18] }), title: `${experience.company} — ${experience.area}`, alt: `${experience.company} — ${experience.area}`, keyboard: true });
          marker.bindTooltip(`${experience.company}<br>${experience.area}`, { direction: 'top', offset: [0, -18] });
          marker.on('click', () => { setSelectedId(experience.id); setAreaView(true); });
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
                setAreaView(true);
              }
            });
          });
          return marker.addTo(instance);
        });
        instance.fitBounds(artworkBounds, { padding: [10, 10], animate: false });
        const resize = new ResizeObserver(() => { if (!element.clientWidth || !element.clientHeight) return; instance.invalidateSize(); instance.fitBounds(artworkBounds, { padding: [10, 10], animate: false }); });
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
    setAreaView(true);
    if (map.current) map.current.fitBounds(artworkBounds, { padding: [10, 10], animate: false });
  }
  return <div className="career-explorer place-story-explorer">
    <div className="career-location-picker" aria-label="Select a place, most recent experience first">{experiences.map((experience,index) => <button key={experience.id} onClick={() => selectExperience(experience.id)} aria-pressed={selectedId === experience.id}><span className="location-number">0{index+1}</span><span><strong>{placeStories[experience.id].name}</strong><small>{placeStories[experience.id].region}</small><span className="place-company-label">{experience.company}</span></span><span aria-hidden="true">↗</span></button>)}</div>
    <div className="career-map-panel">
      <div className="map-toolbar"><span className="eyebrow">{areaView ? 'LOCAL MAP / REAL GEOGRAPHY' : 'GROWTH MAP / NOT TO SCALE'}</span><button type="button" onClick={() => {
        if (areaView) { setAreaView(false); requestAnimationFrame(() => { map.current?.invalidateSize(); map.current?.fitBounds(artworkBounds, { padding: [10, 10], animate: false }); }); }
        else setAreaView(true);
      }}>{areaView ? 'Back to growth map ↗' : `Explore ${place.name} ↗`}</button></div>
      <div className="career-overview-map" hidden={areaView}>
        <div ref={container} className="career-map-canvas schematic-map" role="region" aria-label="Interactive illustrated map of Yidan’s work locations" />
        {mapState === 'unavailable' && <p className="map-fallback" role="status">The overview map could not load. Select a place to open its area map and story.</p>}
      </div>
      {areaView && <PlaceMap key={selectedId} place={place} />}
      <div className="career-selected place-story" aria-live="polite">
        <p className="eyebrow">{place.name} / {place.region}</p><h3>{place.headline}</h3><p>{place.description}</p>
        {place.memory && <blockquote className="place-memory"><p>{place.memory}</p></blockquote>}
        <div className="place-reflection"><p className="eyebrow">WHAT I TAKE WITH ME</p><h4>{selected.company}</h4><p>{place.reflection}</p></div>
        <div className="place-story-links"><a className="place-source-link" href={place.source.url}>About this place <span aria-hidden="true">↗</span></a>{selected.project && <Link className="text-link" href={`/projects/${selected.project}`}>Related project <span aria-hidden="true">↗</span></Link>}</div>
      </div>
    </div>
    <p className="map-note">{areaView ? 'Local maps use real OpenStreetMap geography, with a simplified visual style. The dashed circle locates a city or nearby landmark, not an office address.' : 'A personal growth map, not to scale. Munich is my current base. Select a place to explore its geography and the memories I take from it.'} Experiences are listed most recent first.</p>
  </div>;
}
