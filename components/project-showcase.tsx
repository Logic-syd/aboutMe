'use client';

import { useCallback, useState, type ReactNode } from 'react';
import { projects } from '@/lib/projects';
import { sceneFailureMessages, type SceneFailure } from '@/lib/scene-status';
import { ProjectGraph } from '@/components/project-graph';

export function ProjectShowcase({ children }: { children: ReactNode }) {
  const [failure, setFailure] = useState<SceneFailure | null>(null);
  const [slow, setSlow] = useState(false);
  const showCards = useCallback((reason: SceneFailure) => { setFailure(reason); setSlow(false); }, []);

  return <>
    {failure ? <div className="project-fallback-notice"><p role="status">{sceneFailureMessages[failure]}</p><button className="button button-outline" onClick={() => {
      // A rejected dynamic import remains cached; a reload starts a fresh download.
      if (failure === 'download-failed') { window.location.reload(); return; }
      setFailure(null); setSlow(false);
    }}>{failure === 'download-failed' ? 'Reload page' : 'Retry 3D view'}</button></div> : <ProjectGraph onUnavailable={showCards} onSlow={setSlow} />}
    {slow && <p className="project-fallback-notice" role="status">The 3D view is still loading. Browse the projects below while it finishes.</p>}
    {failure || slow ? <div className="project-case-cards" aria-label={`All ${projects.length} project case studies`}>{children}</div> : <details className="project-list-disclosure">
      <summary>Browse all {projects.length} case studies as cards <span aria-hidden="true">↓</span></summary>
      {children}
    </details>}
  </>;
}
