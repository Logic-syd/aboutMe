'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import type { PersonalPhoto } from '@/lib/about';
import { PhotoViewer } from '@/components/photo-viewer';

export function PhotoAlbum({ photos }: { photos: PersonalPhoto[] }) {
  const [selected, setSelected] = useState(0);
  const regionId = useId();
  if (!photos.length) return null;
  return <div className="about-photo-album">
    <div id={regionId} aria-live="polite"><PhotoViewer photo={photos[selected]} className="about-album-photo" /></div>
    <div className="about-photo-thumbnails" aria-label="Choose a personal photo">{photos.map((photo, index) => <button key={photo.src} aria-label={`Show photo: ${photo.caption}`} aria-pressed={selected === index} aria-controls={regionId} onClick={() => setSelected(index)}><Image src={photo.src} alt="" width={photo.width} height={photo.height} sizes="80px" style={{ objectPosition: photo.position ?? '50% 50%' }} /></button>)}</div>
  </div>;
}
