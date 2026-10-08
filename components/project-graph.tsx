'use client';

import { Component, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { graphLeaves, graphTitles, type GraphSelection } from '@/lib/graph';

const ThreeGraph = dynamic(() => import('@/components/three-project-scene'), { ssr: false, loading: () => <div className="three-loading">Preparing the 3D constellation…</div> });
function subscribeMotion(callback: () => void) { const query = window.matchMedia('(prefers-reduced-motion: reduce)'); query.addEventListener('change', callback); return () => query.removeEventListener('change', callback); }
const getMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getServerMotion = () => true;
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="three-loading">3D is unavailable in this browser. Explore every project using the controls below.</div> : this.props.children; }
}

export function ProjectGraph() {
  const [selection, setSelection] = useState<GraphSelection>({ project: null, technology: null });
  const [motion, setMotion] = useState(true);
  const [view, setView] = useState({ reset: 0, zoom: 0 });
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const region = useRef<HTMLDivElement>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getMotion, getServerMotion);
  useEffect(() => {
    const element = region.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => { setVisible(entry.isIntersecting); if (entry.isIntersecting) setLoaded(true); }, { rootMargin: '100px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const project = selection.project === null ? null : projects[selection.project];
  const selectProject = useCallback((index: number) => { setSelection(current => current.project === index ? { project: null, technology: null } : { project: index, technology: null }); }, []);
  const selectTechnology = useCallback((index: number) => { setSelection(current => ({ ...current, technology: current.technology === index ? null : index })); }, []);
  const reset = useCallback(() => { setSelection({ project: null, technology: null }); setView(current => ({ reset: current.reset + 1, zoom: 0 })); }, []);
  return <div className="project-explorer three-explorer">
    <div className="explorer-toolbar"><div><span className="eyebrow">PROJECT CONSTELLATION / THREE.JS</span><p>One idea. Many connections.</p></div><span className="graph-key"><i />{selection.technology !== null ? 'Level 03 / Contributions' : project ? 'Level 02 / Technologies' : 'Level 01 / Projects'}</span></div>
    <div ref={region} className="three-stage" aria-label="Interactive three-dimensional project knowledge graph">
      <div className="three-corner-label" aria-hidden="true"><span>{String(projects.length).padStart(2, '0')} PROJECTS</span><span>EXPLORE IN THREE DIMENSIONS</span></div>
      <SceneBoundary>{loaded ? <ThreeGraph selection={selection} onProject={selectProject} onTechnology={selectTechnology} onReset={reset} animate={motion && !reducedMotion && visible} reducedMotion={reducedMotion} visible={visible} view={view} /> : <div className="three-loading">3D project constellation</div>}</SceneBoundary>
      <div className="three-controls" aria-label="3D view controls"><button onClick={() => setView(v => ({ ...v, zoom: v.zoom + 1 }))} aria-label="Zoom in">+</button><button onClick={() => setView(v => ({ ...v, zoom: v.zoom - 1 }))} aria-label="Zoom out">−</button><button onClick={reset}>Reset view</button><button aria-pressed={!motion || reducedMotion} disabled={reducedMotion} onClick={() => setMotion(m => !m)}>{!motion || reducedMotion ? 'Motion paused' : 'Pause motion'}</button></div>
      <p className="three-stage-hint">Drag space to orbit · Drag a sphere to move it · Click to expand</p>
    </div>
    <div className="graph-project-picker" aria-label="Select a project">{projects.map((item,index) => <button key={item.slug} aria-pressed={selection.project === index} onClick={() => selectProject(index)}><span>{item.number}</span>{graphTitles[index]}</button>)}</div>
    {project && <div className="technology-picker"><span className="eyebrow">02 / SELECT A TECHNOLOGY</span><div>{project.tags.map((tag,index) => <button key={tag} aria-pressed={selection.technology === index} onClick={() => selectTechnology(index)}>{tag}<span aria-hidden="true">{selection.technology === index ? '−' : '+'}</span></button>)}</div>{selection.technology !== null && <ul className="graph-contributions" aria-label="Selected technology contributions">{graphLeaves(selection.project!, selection.technology).map(leaf => <li key={leaf}>{leaf}</li>)}</ul>}</div>}
    <div className="graph-detail" aria-live="polite">{project ? <><div><span className={`status ${project.inDevelopment ? 'status-progress' : ''}`}><i />{project.status}</span><h3>{project.title}</h3><p>{project.description}</p></div><div className="graph-detail-meta"><p className="eyebrow">MY ROLE</p><p>{project.role}</p><ul className="tags">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><Link className="text-link" href={`/projects/${project.slug}`}>Read case study ↗</Link></div></> : <><div><p className="eyebrow">START EXPLORING</p><h3>Projects, technologies, decisions.</h3><p>Six projects across energy, discovery, training and operations. Select a project to unfold its technologies, then follow a connection to the work behind it.</p></div><div className="graph-detail-meta"><p className="eyebrow">THREE LEVELS OF DETAIL</p><ol className="graph-levels"><li>Projects</li><li>Technologies & approaches</li><li>Specific contributions</li></ol><p>One branch opens at a time, keeping the connections clear.</p></div></>}</div>
    <p className="explorer-help">The project and technology buttons provide the same navigation with a keyboard, on mobile, or without 3D. Release status and full case studies appear below the scene.</p>
  </div>;
}
