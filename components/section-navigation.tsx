'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'work', label: 'My Projects', short: 'Projects' },
  { id: 'about', label: 'About Me', short: 'About' },
  { id: 'career-history', label: 'My Work', short: 'Work' },
  { id: 'experience', label: 'Growth Map', short: 'Map' },
];

export function SectionNavigation({ detail, sidebar }: { detail: boolean; sidebar: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!sidebar || detail) return;
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
  }, [detail, sidebar]);
  return <div className="nav-sections">{sections.map(section => <a key={section.id} href={`${detail ? '/' : ''}#${section.id}`} aria-label={section.label} aria-current={active === section.id ? 'location' : undefined} onClick={() => { if (sidebar) setActive(section.id); }}><span className="nav-full-label">{section.label}</span><span className="nav-short-label" aria-hidden="true">{section.short}</span></a>)}</div>;
}
