'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Project } from '@/lib/projects';
import styles from './isolarcloud-case-study.module.css';

const views = [
  { label: 'Plant overview', title: 'A plant brings the system together.', text: 'Solar generation, storage, consumption and the grid share one operational view. The wider platform supports residential, commercial and storage plants.' },
  { label: 'Plant devices', title: 'One plant. Different device capabilities.', text: 'Batteries, hybrid inverters, communication modules and chargers have different measurements, relationships and available actions.' },
  { label: 'Energy analysis', title: 'The numbers need their context.', text: 'Power, energy and battery state of charge represent different quantities. Dates, time zones, units and missing readings affect how users interpret them.' },
];

export function IsolarCloudProductViews({ project }: { project: Project }) {
  const [selected, setSelected] = useState(0);
  const screenshot = project.screenshots![selected];
  const view = views[selected];
  return <div className={styles.productViews}>
    <div className={styles.viewControls} role="group" aria-label="Explore iSolarCloud product screens">
      {views.map((item, index) => <button type="button" key={item.label} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.label}</button>)}
    </div>
    <figure className={styles.productFigure}>
      <a href={screenshot.src} target="_blank" rel="noopener noreferrer" aria-label={`Open full screenshot: ${view.label}`}>
        <Image src={screenshot.src} alt={screenshot.alt} width={screenshot.width} height={screenshot.height} sizes="(max-width: 700px) 92vw, 1152px" />
        <span className={styles.imageAction}>Open full image ↗</span>
      </a>
      <figcaption><div><h3>{view.title}</h3><p>{view.text}</p></div><span>PUBLIC VISITOR DEMO<br />EUROPEAN PLATFORM</span></figcaption>
    </figure>
    <p className={styles.sourceNote}>Screens from the public <a href={project.screenshotCredit!.href} target="_blank" rel="noopener noreferrer">iSolarCloud European visitor demo ↗</a>. They illustrate the product context; the contribution sections describe my own frontend work.</p>
  </div>;
}
