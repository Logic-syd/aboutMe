import Image from 'next/image';
import type { Project } from '@/lib/projects';

export function ProjectGallery({ project }: { project: Project }) {
  if (!project.screenshots?.length) return null;
  return <section className="project-gallery" aria-labelledby="product-screens-title">
    <div className="project-gallery-heading"><p className="eyebrow">PRODUCT SCREENS</p><h2 id="product-screens-title">The product, in use.</h2><p>Actual product screenshots. Open an image to see it in full.</p></div>
    <div className="project-gallery-grid">{project.screenshots.map(screen => <figure key={screen.src}>
      <a className="project-screenshot-link" href={screen.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full screenshot: ${screen.caption}`}><Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes="(max-width: 650px) 80vw, 300px" /></a>
      <figcaption>{screen.caption}</figcaption>
    </figure>)}</div>
    {project.screenshotCredit && <a className="screenshot-credit" href={project.screenshotCredit.href} target="_blank" rel="noopener noreferrer">{project.screenshotCredit.label} ↗</a>}
  </section>;
}
