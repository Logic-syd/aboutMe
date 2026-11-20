import images from './optimized-images.json';

/** Use smaller display assets without changing original-image links or project facts. */
export function displayImage(src: string): string {
  return (images as Record<string, string>)[src] ?? src;
}
