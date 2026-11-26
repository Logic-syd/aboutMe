'use client';

import { useEffect, useState } from 'react';
import { ProjectListLink } from '@/components/project-drawer';

const baseSections = [
  { id: 'work', label: 'Projects', text: 'Projects', short: 'Projects' },
  { id: 'about', label: 'About', text: 'About', short: 'About' },
  { id: 'career-history', label: 'Experience', text: 'Experience', short: 'Experience' },
  { id: 'experience', label: 'Places', text: 'Places', short: 'Places' },
];
const homeSections = [...baseSections.slice(0, 3), { id: 'skills', label: 'Skills', text: 'Skills', short: 'Skills' }, { id: 'gallery', label: 'Gallery', text: 'Gallery', short: 'Gallery' }, baseSections[3]];

export function SectionNavigation({ detail, sidebar }: { detail: boolean; sidebar: boolean }) {
  const sections = detail ? baseSections : homeSections;
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (detail) return;
    const elements = sections.map(section => document.getElementById(section.id)).filter(element => element !== null);
    const update = () => {
      const chapter = elements.find(element => { const bounds = element.getBoundingClientRect(); return bounds.top <= innerHeight * .45 && bounds.bottom > innerHeight * .45; });
      setActive(chapter?.id ?? null);
    };
    let frame = 0;
    const schedule = () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); }); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); cancelAnimationFrame(frame); };
  }, [detail, sidebar, sections]);
  return <div className="nav-sections">{sections.map(section => detail && section.id === 'work'
    ? <ProjectListLink key={section.id} label={section.label}><span className="nav-full-label">{section.text}</span><span className="nav-short-label" aria-hidden="true">{section.short}</span></ProjectListLink>
    : <a key={section.id} href={`${detail ? '/' : ''}#${section.id}`} aria-label={section.label} aria-current={active === section.id ? 'location' : undefined} onClick={() => { if (!detail) setActive(section.id); }}><span className="nav-full-label">{section.text}</span><span className="nav-short-label" aria-hidden="true">{section.short}</span></a>)}</div>;
}
