import type { PersonalPhoto } from '@/lib/about';
import { PhotoViewer } from '@/components/photo-viewer';

export function PhotoAlbum({ photos }: { photos: PersonalPhoto[] }) {
  if (!photos.length) return null;
  return <div className="about-photo-timeline" aria-label="From graduation to working in Munich">{photos.map(photo => <PhotoViewer key={photo.src} photo={photo} className="about-timeline-photo" />)}</div>;
}
