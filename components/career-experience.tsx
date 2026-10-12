'use client';

import { useState } from 'react';
import Link from 'next/link';
import { experiences } from '@/lib/experience';
import { projects } from '@/lib/projects';

export function CareerExperience() {
  const [selectedId, setSelectedId] = useState(experiences[0].id);
  const selected = experiences.find(experience => experience.id === selectedId)!;
  return <div className="career-history-browser">
    <div className="career-history-picker" aria-label="Choose a work experience">{experiences.map(experience => <button key={experience.id} onClick={() => setSelectedId(experience.id)} aria-pressed={selectedId === experience.id} aria-controls="career-history-detail"><strong>{experience.company}</strong><span>{experience.city}</span></button>)}</div>
    <article id="career-history-detail" className="career-history-detail" aria-live="polite">
      <p className="eyebrow">{selected.city} / {selected.domain}</p><h3>{selected.company}</h3><p className="experience-description">{selected.description}</p>
      <div className="experience-case-links">{[selected.project, ...(selected.relatedProjects ?? [])].map(slug => <Link key={slug} className="text-link experience-case-link" href={`/projects/${slug}`}>{projects.find(project => project.slug === slug)?.title}<span aria-hidden="true">↗</span></Link>)}</div>
    </article>
  </div>;
}
