'use client';

import { useEffect, useRef, useState } from 'react';
import type { Map as LeafletMap, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { experiences } from '@/lib/experience';
import { placeStories } from '@/lib/place-stories';
import { PlaceMap } from '@/components/place-map';
import { cityPhotos } from '@/lib/about';
import { PhotoViewer } from '@/components/photo-viewer';

// This map tells the place stories; professional work has its own section.
const mapStops = [experiences[0].id, 'berlin', ...experiences.slice(1).map(experience => experience.id)];
const stopLabels: Record<string, { name: string; region: string }> = {
  berlin: { name: 'Berlin', region: 'Wedding · Germany' },
  sungrow: { name: 'Munich', region: 'Current base · Germany' },
  danzhu: { name: 'Caohejing', region: 'Shanghai · China' },
  glp: { name: 'Zhangjiang', region: 'Shanghai · China' },
  longshine: { name: 'West Lake', region: 'Hangzhou · Zhejiang' },
  fingard: { name: 'Xixi Wetland', region: 'Hangzhou · Zhejiang' },
};

// Positions in our original schematic artwork, intentionally not GPS coordinates.
const schematicPoints: Record<string, [number, number]> = { sungrow: [155, 310], berlin: [405, 245], danzhu: [385, 665], glp: [385, 855], longshine: [120, 855], fingard: [120, 675] };
const artworkBounds: [[number, number], [number, number]] = [[0, 0], [600, 1000]];

export function CareerMap() {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const markers = useRef<Marker[]>([]);
  const [selectedId, setSelectedId] = useState('sungrow');
  const [areaView, setAreaView] = useState(false);
  const [mapState, setMapState] = useState<'loading' | 'ready' | 'unavailable'>('loading');
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
        L.imageOverlay('/images/career-map.svg', artworkBounds, { alt: 'Illustrative growth map: Berlin and Wedding in the north, a larger Munich in the south; Shanghai and Hangzhou in Zhejiang on the right. Not to scale.', interactive: false }).on('error', () => { if (!disposed) setMapState('unavailable'); }).addTo(instance);
        markers.current = mapStops.map(id => {
          const { name, region } = stopLabels[id];
          const size = id === 'sungrow' ? 42 : 28;
          const marker = L.marker(schematicPoints[id], { icon: L.divIcon({ className: `career-pin atlas-pin ${id === 'sungrow' ? 'current-base-pin' : ''}`, html: '<span aria-hidden="true"></span>', iconSize: [size, size], iconAnchor: [size / 2, size / 2] }), title: `${name} — ${region}`, alt: `${name} — ${region}`, keyboard: true });
          marker.bindTooltip(`${name}<br>${region}`, { direction: 'top', offset: [0, -18] });
          marker.on('click', () => { setSelectedId(id); setAreaView(true); });
          marker.on('add', () => {
            const icon = marker.getElement();
            if (!icon) return;
            icon.tabIndex = 0;
            icon.setAttribute('role', 'button');
            icon.setAttribute('aria-label', `${name} — ${region}`);
            icon.addEventListener('keydown', event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                event.stopPropagation();
                setSelectedId(id);
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
      const active = mapStops[index] === selectedId;
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
    <div className="career-location-picker" aria-label="Choose a city or neighbourhood, most recent chapter first">{mapStops.map(id => <button key={id} className={id === 'sungrow' ? 'current-base-location' : ''} onClick={() => selectExperience(id)} aria-pressed={selectedId === id}><span><strong>{stopLabels[id].name}</strong><small>{stopLabels[id].region}</small></span></button>)}</div>
    <div className="career-map-panel">
      <div className="career-map-visual">
      <div className="map-toolbar"><span className="eyebrow">{areaView ? 'LOCAL MAP / REAL GEOGRAPHY' : 'GROWTH MAP / NOT TO SCALE'}</span><button type="button" onClick={() => {
        if (areaView) { setAreaView(false); requestAnimationFrame(() => { map.current?.invalidateSize(); map.current?.fitBounds(artworkBounds, { padding: [10, 10], animate: false }); }); }
        else setAreaView(true);
      }}>{areaView ? 'Back to growth map ↗' : `Explore ${place.name} ↗`}</button></div>
      <div className="career-overview-map" hidden={areaView}>
        <div ref={container} className="career-map-canvas schematic-map" role="region" aria-label="Interactive illustrated map of places Yidan has lived and worked" />
        {mapState === 'unavailable' && <p className="map-fallback" role="status">The overview map could not load. Select a place to open its area map and story.</p>}
      </div>
      {areaView && <PlaceMap key={selectedId} place={place} />}
      </div>
      <div className="career-selected place-story" aria-live="polite">
        <p className="eyebrow">{place.neighbourhood ? `${place.neighbourhood} · ` : ''}{place.name} / {place.region}</p><h3>{place.headline}</h3>
        <div id="place-story-chapter">
          <p className="place-life-description">{place.description}</p>
          <div className={`place-memory-chapter ${cityPhotos[selectedId] ? 'has-photo' : ''}`}><blockquote className="place-memory"><p>{place.memory}</p></blockquote>{cityPhotos[selectedId] && <PhotoViewer photo={cityPhotos[selectedId]} className="place-memory-photo" />}</div>
          <div className="place-story-links is-life"><a className="place-source-link" href={place.source.url}>About this place <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg></a></div>
        </div>
      </div>
    </div>
    <p className="map-note">{areaView ? 'OpenStreetMap geography · The circle marks a city area, not an office.' : 'Places I’ve lived and worked · Overview not to scale · Munich is my current base.'}</p>
  </div>;
}
