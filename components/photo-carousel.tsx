'use client';

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import type { PersonalPhoto } from '@/lib/about';
import { PhotoViewer } from '@/components/photo-viewer';

export function PhotoCarousel({ photos }: { photos: PersonalPhoto[] }) {
  const track = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackId = useId();
  const instructionsId = useId();

  const selectPhoto = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const viewport = track.current;
    const slide = viewport?.children[index] as HTMLElement | undefined;
    if (!viewport || !slide) return;
    currentIndex.current = index;
    setActiveIndex(index);
    const bounds = slide.getBoundingClientRect();
    viewport.scrollTo({
      left: viewport.scrollLeft + bounds.left - viewport.getBoundingClientRect().left - (viewport.clientWidth - bounds.width) / 2,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : behavior,
    });
  }, []);

  useEffect(() => {
    const viewport = track.current;
    if (!viewport) return;
    let settled: ReturnType<typeof setTimeout>;
    function updateCurrentPhoto() {
      if (!viewport) return;
      const center = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
      const slides = Array.from(viewport.children);
      const distances = slides.map(slide => {
        const bounds = slide.getBoundingClientRect();
        return Math.abs(bounds.left + bounds.width / 2 - center);
      });
      const nearest = distances.indexOf(Math.min(...distances));
      currentIndex.current = nearest;
      setActiveIndex(nearest);
    }
    function handleScroll() {
      clearTimeout(settled);
      settled = setTimeout(updateCurrentPhoto, 120);
    }
    const resize = new ResizeObserver(() => selectPhoto(currentIndex.current, 'instant'));
    resize.observe(viewport);
    viewport.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(settled);
      resize.disconnect();
      viewport.removeEventListener('scroll', handleScroll);
    };
  }, [selectPhoto]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || (event.target as HTMLElement).closest('dialog')) return;
    let next: number;
    switch (event.key) {
      case 'ArrowLeft': next = Math.max(0, currentIndex.current - 1); break;
      case 'ArrowRight': next = Math.min(photos.length - 1, currentIndex.current + 1); break;
      case 'Home': next = 0; break;
      case 'End': next = photos.length - 1; break;
      default: return;
    }
    event.preventDefault();
    selectPhoto(next);
    if ((event.target as HTMLElement).closest('.personal-photo-trigger')) {
      track.current?.children[next]?.querySelector<HTMLButtonElement>('.personal-photo-trigger')?.focus({ preventScroll: true });
    }
  }

  if (!photos.length) return null;

  return <div className="photo-carousel" role="region" aria-roledescription="carousel" aria-label="Personal photographs" style={{
    '--first-photo-ratio': photos[0].width / photos[0].height,
    '--last-photo-ratio': photos[photos.length - 1].width / photos[photos.length - 1].height,
  } as CSSProperties}>
    <p id={instructionsId} className="gallery-sr-only">Use the left and right arrow keys, or swipe, to browse photos. Select a photo to view the original.</p>
    <div ref={track} id={trackId} className="photo-carousel-track" tabIndex={0} aria-label="Photo slides" aria-describedby={instructionsId} onKeyDown={handleKeyDown}>
      {photos.map((photo, index) => <div
        className="photo-carousel-slide" key={photo.src}
        role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${photos.length}: ${photo.caption}`}
        style={{ '--photo-ratio': photo.width / photo.height } as CSSProperties}
        onFocusCapture={event => {
          if ((event.target as HTMLElement).matches('.personal-photo-trigger') && currentIndex.current !== index) selectPhoto(index);
        }}
      >
        <PhotoViewer photo={photo} className="life-gallery-photo" sizes="(max-width: 800px) calc(100vw - 104px), 600px" />
      </div>)}
    </div>
    <div className="photo-carousel-footer">
      <p>Click a photo to look closer.</p>
      <div className="photo-carousel-controls">
        <button type="button" aria-label="Previous photo" aria-controls={trackId} disabled={activeIndex === 0} onClick={() => selectPhoto(Math.max(0, currentIndex.current - 1))}>
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m14 6-6 6 6 6" /></svg>
        </button>
        <p role="status" aria-live="polite" aria-atomic="true"><span aria-hidden="true">{activeIndex + 1} / {photos.length}</span><span className="gallery-sr-only">Photo {activeIndex + 1} of {photos.length}</span></p>
        <button type="button" aria-label="Next photo" aria-controls={trackId} disabled={activeIndex === photos.length - 1} onClick={() => selectPhoto(Math.min(photos.length - 1, currentIndex.current + 1))}>
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m10 6 6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  </div>;
}
