'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Project, ProjectScreenshot } from '@/lib/projects';
import { CaseChapter } from '@/components/case-chapter';

export function ProjectGallery({ project }: { project: Project }) {
  const [selected, setSelected] = useState(0);
  if (!project.screenshots?.length) return null;
  if (project.screenshotLayout === 'portrait-grid') return <PortraitGallery screens={project.screenshots} />;
  const active = Math.min(selected, project.screenshots.length - 1);
  const screen = project.screenshots[active];
  return <>
  <CaseChapter id="product-screens" kicker="PRODUCT SCREENS" title={project.mobileScreenshots?.length ? 'The desktop experience.' : 'The product, in use.'} description="Actual product screenshots. Open an image to see it in full." layout="media">
    <div className={`case-gallery ${screen.width > screen.height ? 'is-landscape' : ''} ${project.mobileScreenshots?.length ? 'has-mobile-showcase' : ''}`}>
      {project.screenshots.length > 1 && <div className="case-media-tabs" role="group" aria-label="Choose a product screenshot">{project.screenshots.map((item, index) => <button key={item.src} type="button" aria-pressed={active === index} onClick={() => setSelected(index)}>{item.label ?? `Screen ${String(index + 1).padStart(2, '0')}`}</button>)}</div>}
      <figure className="case-gallery-view">
        <a href={screen.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full screenshot: ${screen.caption}`}><Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes={screen.width > screen.height ? '(max-width: 800px) 90vw, 1200px' : '(max-width: 800px) 90vw, 850px'} /><span className="case-image-action">Open full image ↗</span></a>
        <figcaption>{screen.caption}</figcaption>
      </figure>
      {project.screenshotCredit && <a className="case-media-credit" href={project.screenshotCredit.href} target="_blank" rel="noopener noreferrer">{project.screenshotCredit.label} ↗</a>}
    </div>
  </CaseChapter>
  {!!project.mobileScreenshots?.length && <MobileGallery screens={project.mobileScreenshots} description={project.mobileDescription} highlights={project.mobileHighlights} />}
  </>;
}

function PortraitGallery({ screens }: { screens: ProjectScreenshot[] }) {
  return <CaseChapter id="product-screens" kicker="THE GAME IN PLAY" title="One journey. Three moments." description="A portrait game made for phones. Choose a traveler, find your direction and make it to the train." layout="media">
    <div className="case-portrait-grid">
      {screens.map((screen, index) => <figure key={screen.src}>
        <a href={screen.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full screenshot: ${screen.caption}`}><Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes="(max-width: 800px) 350px, 320px" /></a>
        <figcaption><h3><span>{String(index + 1).padStart(2, '0')}</span>{screen.label}</h3><p>{screen.caption}</p><a href={screen.src} target="_blank" rel="noopener noreferrer">Open full image ↗</a></figcaption>
      </figure>)}
    </div>
  </CaseChapter>;
}

function MobileGallery({ screens, description, highlights }: { screens: ProjectScreenshot[]; description?: string; highlights?: string[] }) {
  const [selected, setSelected] = useState(0);
  const active = Math.min(selected, screens.length - 1);
  const screen = screens[active];
  return <CaseChapter id="mobile-screens" kicker="MOBILE EXPERIENCE" title="Designed for a smaller screen." layout="media">
    <div className="case-mobile-layout">
      <div className="case-mobile-copy"><p className="eyebrow">SAME PRODUCT / DIFFERENT LAYOUT</p><h3>Room for every interaction.</h3><p>{description ?? 'A separate look at the mobile interface, shown as complete browser screenshots.'}</p>{!!highlights?.length && <ul>{highlights.map(item => <li key={item}>{item}</li>)}</ul>}</div>
      <div className="case-mobile-gallery">
        <div className="case-media-tabs" role="group" aria-label="Choose a mobile screenshot">{screens.map((item, index) => <button key={item.src} type="button" aria-pressed={active === index} onClick={() => setSelected(index)}>{item.label ?? `Screen ${String(index + 1).padStart(2, '0')}`}</button>)}</div>
        <figure className="case-mobile-screen"><a href={screen.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full mobile screenshot: ${screen.caption}`}><Image src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} sizes="(max-width: 800px) 280px, 220px" /></a><figcaption><span>{screen.caption}</span><a href={screen.src} target="_blank" rel="noopener noreferrer">Open full image ↗</a></figcaption></figure>
      </div>
    </div>
  </CaseChapter>;
}
