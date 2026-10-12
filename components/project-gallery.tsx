'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Project } from '@/lib/projects';
import { CaseChapter } from '@/components/case-chapter';

export function ProjectGallery({ project }: { project: Project }) {
  const [selected, setSelected] = useState(0);
  if (!project.screenshots?.length) return null;
  const active = Math.min(selected, project.screenshots.length - 1);
  const screen = project.screenshots[active];
  return <CaseChapter id="product-screens" kicker="PRODUCT SCREENS" title="The product, in use." description="Actual product screenshots. Open an image to see it in full." layout="media">
    <div className="case-gallery">
      {project.screenshots.length > 1 && <div className="case-media-tabs" role="group" aria-label="Choose a product screenshot">{project.screenshots.map((item, index) => <button key={item.src} type="button" aria-pressed={active === index} onClick={() => setSelected(index)}>Screen {String(index + 1).padStart(2, '0')}</button>)}</div>}
      <figure className="case-gallery-view">
        <a href={screen.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full screenshot: ${screen.caption}`}><Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes="(max-width: 800px) 90vw, 850px" /><span className="case-image-action">Open full image ↗</span></a>
        <figcaption>{screen.caption}</figcaption>
      </figure>
      {project.screenshotCredit && <a className="case-media-credit" href={project.screenshotCredit.href} target="_blank" rel="noopener noreferrer">{project.screenshotCredit.label} ↗</a>}
    </div>
  </CaseChapter>;
}
