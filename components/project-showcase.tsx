'use client';

import { useCallback, useState } from 'react';
import { sceneFailureMessages, type SceneFailure } from '@/lib/scene-status';
import { ProjectGraph } from '@/components/project-graph';

export function ProjectShowcase() {
  const [failure, setFailure] = useState<SceneFailure | null>(null);
  const [slow, setSlow] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const showFallback = useCallback((reason: SceneFailure) => { setFailure(reason); setSlow(false); }, []);
  const retry = () => {
    // A failed dynamic import stays cached until the page loads again.
    if (failure === 'download-failed') { window.location.reload(); return; }
    setFailure(null); setSlow(false); setAttempt(value => value + 1);
  };
  return <>
    {slow && !failure && <p className="project-fallback-notice" role="status">The 3D view is still loading. The project list is ready to browse.</p>}
    <ProjectGraph onUnavailable={showFallback} onSlow={setSlow} attempt={attempt} fallback={failure ? <div className="scene-fallback"><p role="status">{sceneFailureMessages[failure]}</p><button className="button button-outline" onClick={retry}>{failure === 'download-failed' ? 'Reload page' : 'Retry 3D view'}</button></div> : undefined} />
  </>;
}
