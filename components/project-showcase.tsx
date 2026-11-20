'use client';

import { useCallback, useState, type ReactNode } from 'react';
import type { SceneFailure } from '@/lib/scene-status';
import { ProjectGraph } from '@/components/project-graph';

export function ProjectShowcase({ children }: { children: ReactNode }) {
  const [failure, setFailure] = useState<SceneFailure | null>(null);
  const [slow, setSlow] = useState(false);
  const showCards = useCallback((reason: SceneFailure) => { setFailure(reason); setSlow(false); }, []);
  return <>
    <ProjectGraph failure={failure} onUnavailable={showCards} onSlow={setSlow} onRetry={() => {
      // A rejected dynamic import remains cached; a reload starts a fresh download.
      if (failure === 'download-failed') { window.location.reload(); return; }
      setFailure(null); setSlow(false);
    }} />
    {slow && <p className="project-fallback-notice" role="status">The 3D view is still loading. The project list remains available.</p>}
    <noscript><div className="project-case-cards">{children}</div></noscript>
  </>;
}
