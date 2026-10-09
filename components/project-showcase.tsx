'use client';

import { useCallback, useState, type ReactNode } from 'react';
import { projects } from '@/lib/projects';
import { ProjectGraph } from '@/components/project-graph';

export function ProjectShowcase({ children }: { children: ReactNode }) {
  const [unavailable, setUnavailable] = useState(false);
  const showCards = useCallback(() => setUnavailable(true), []);

  return <>
    {unavailable ? <p className="project-fallback-notice" role="status">Explore all {projects.length} projects below.</p> : <ProjectGraph onUnavailable={showCards} />}
    {unavailable ? <div className="project-case-cards" aria-label={`All ${projects.length} project case studies`}>{children}</div> : <details className="project-list-disclosure">
      <summary>Browse all {projects.length} case studies as cards <span aria-hidden="true">↓</span></summary>
      {children}
    </details>}
  </>;
}
