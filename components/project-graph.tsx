'use client';

import { Component, useCallback, useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { classifySceneError, type SceneFailure } from '@/lib/scene-status';
import { graphLeaves, graphTitles, type FocusSide, type GraphSelection } from '@/lib/graph';

const ThreeGraph = dynamic(() => import('@/components/three-project-scene'), { ssr: false, loading: () => <div className="three-loading">Preparing the 3D constellation…</div> });
function subscribeMotion(callback: () => void) { const query = window.matchMedia('(prefers-reduced-motion: reduce)'); query.addEventListener('change', callback); return () => query.removeEventListener('change', callback); }
const getMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getServerMotion = () => true;
const projectGroups = [
  { kind: 'commercial', id: 'professional-work', label: 'Work', title: 'Work projects' },
  { kind: 'independent', id: 'personal-projects', label: 'Personal', title: 'Personal projects' },
] as const;
type ProjectCategory = typeof projectGroups[number]['kind'];
class SceneBoundary extends Component<{ children: ReactNode; onUnavailable: (reason: SceneFailure) => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error) { console.error('3D scene failed:', error); this.props.onUnavailable(classifySceneError(error)); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function ProjectGraph({ onUnavailable, onSlow }: { onUnavailable: (reason: SceneFailure) => void; onSlow: (slow: boolean) => void }) {
  const [selection, setSelection] = useState<GraphSelection>({ project: null, technology: null });
  const [category, setCategory] = useState<ProjectCategory>('commercial');
  const [interaction, setInteraction] = useState({ nodeId: '', revision: 0 });
  const projectDirections = useRef(new Map<number, FocusSide>());
  const [motion, setMotion] = useState(true);
  const [view, setView] = useState({ reset: 0, zoom: 0 });
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const sceneReady = useCallback(() => { setReady(true); onSlow(false); }, [onSlow]);
  const region = useRef<HTMLDivElement>(null);
  const catalog = useRef<HTMLDivElement>(null);
  const navigation = useRef<HTMLDivElement>(null);
  const categoryButtons = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const list = navigation.current;
    if (!list || selection.project === null) return;
    const frame = requestAnimationFrame(() => {
      const row = list.querySelector<HTMLElement>('[data-selected="true"]');
      if (!row || getComputedStyle(list).overflowY === 'visible') return;
      const bounds = list.getBoundingClientRect(), selectedBounds = row.getBoundingClientRect();
      const rowTop = list.scrollTop + selectedBounds.top - bounds.top;
      if (selectedBounds.top < bounds.top || selectedBounds.bottom > bounds.bottom) {
        list.scrollTo({ top: Math.max(0, Math.min(rowTop, rowTop + selectedBounds.height - list.clientHeight)), behavior: 'instant' });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [category, selection.project, selection.technology]);
  useEffect(() => {
    let frame = 0;
    const followHash = () => {
      cancelAnimationFrame(frame);
      const group = projectGroups.find(item => `#${item.id}` === window.location.hash);
      if (!group && window.location.hash !== '#work-projects') return;
      frame = requestAnimationFrame(() => {
        if (group) {
          setCategory(group.kind);
          setSelection({ project: null, technology: null });
          navigation.current?.scrollTo({ top: 0 });
        }
        // Scroll to the catalog including its tabs, rather than hiding the
        // category switch just above an old project-group anchor.
        frame = requestAnimationFrame(() => (group ? catalog.current : document.getElementById('work-projects'))?.scrollIntoView({ block: 'start', behavior: 'instant' }));
      });
    };
    followHash();
    window.addEventListener('hashchange', followHash);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', followHash); };
  }, []);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getMotion, getServerMotion);
  useEffect(() => {
    const element = region.current;
    if (!element) return;
    let requested = false;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (!entry.isIntersecting || requested) return;
      requested = true;
      // Let the actual renderer create its context; a throwaway probe needlessly
      // allocates a second GPU context and can disagree with renderer options.
      setLoaded(true);
    }, { rootMargin: '100px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, [onUnavailable]);
  useEffect(() => {
    if (!loaded || ready) return;
    const timeout = window.setTimeout(() => onSlow(true), 12000);
    return () => window.clearTimeout(timeout);
  }, [loaded, ready, onSlow]);
  const project = selection.project === null ? null : projects[selection.project];
  const selectProject = useCallback((index: number) => {
    setCategory(projects[index].kind);
    setInteraction(current => ({ nodeId: projects[index].slug, revision: current.revision + 1 }));
    setSelection(current => current.project === index ? { project: null, technology: null } : { project: index, technology: null, focusSide: projectDirections.current.get(index) ?? 1 });
  }, []);
  const selectTechnology = useCallback((index: number) => { if (selection.project !== null) setInteraction(current => ({ nodeId: `${projects[selection.project!].slug}-tech-${index}`, revision: current.revision + 1 })); setSelection(current => ({ ...current, technology: current.technology === index ? null : index })); }, [selection.project]);
  const reset = useCallback(() => { setInteraction(current => ({ nodeId: 'root', revision: current.revision + 1 })); setSelection({ project: null, technology: null }); setView(current => ({ reset: current.reset + 1, zoom: 0 })); }, []);
  const selectCategory = (next: ProjectCategory) => {
    if (next !== category) {
      setCategory(next);
      reset();
      navigation.current?.scrollTo({ top: 0 });
    }
  };
  const navigateCategories = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = projectGroups.findIndex(group => group.kind === category);
    let next: number;
    if (event.key === 'ArrowRight') next = (index + 1) % projectGroups.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + projectGroups.length) % projectGroups.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = projectGroups.length - 1;
    else return;
    event.preventDefault();
    selectCategory(projectGroups[next].kind);
    categoryButtons.current[next]?.focus();
  };
  return <div className="project-explorer three-explorer">

    <div id="work-projects" className="project-explorer-workspace">
    <div ref={region} className="three-stage" aria-label="Interactive three-dimensional project knowledge graph">
      <div className="three-corner-label" aria-hidden="true"><span>PROJECT CONNECTIONS / THREE.JS</span><span>{selection.technology !== null ? 'CONTRIBUTIONS' : project ? 'TECHNOLOGIES' : 'SELECT A PROJECT'}</span></div>
      <SceneBoundary onUnavailable={onUnavailable}>{loaded ? <ThreeGraph projectDirections={projectDirections} onUnavailable={onUnavailable} onReady={sceneReady} interaction={interaction} selection={selection} onProject={selectProject} onTechnology={selectTechnology} onReset={reset} animate={motion && !reducedMotion && visible} reducedMotion={reducedMotion} visible={visible} view={view} /> : <div className="three-loading">3D project constellation</div>}</SceneBoundary>
      <div className="three-controls" aria-label="3D view controls"><button onClick={() => setView(v => ({ ...v, zoom: v.zoom + 1 }))} aria-label="Zoom in">+</button><button onClick={() => setView(v => ({ ...v, zoom: v.zoom - 1 }))} aria-label="Zoom out">−</button><button onClick={reset}>Reset view</button><button aria-pressed={!motion || reducedMotion} disabled={reducedMotion} onClick={() => setMotion(m => !m)}>{!motion || reducedMotion ? 'Motion paused' : 'Pause motion'}</button></div>
      <p className="three-stage-hint">Drag to explore · Select a project</p>
    </div>
    <div ref={catalog} className="graph-project-navigation">
    <div className="project-category-tabs" role="tablist" aria-label="Project categories" onKeyDown={navigateCategories}>{projectGroups.map((group, index) => <button ref={element => { categoryButtons.current[index] = element; }} type="button" role="tab" id={`${group.id}-tab`} aria-controls={group.id} aria-selected={category === group.kind} tabIndex={category === group.kind ? 0 : -1} onClick={() => selectCategory(group.kind)} key={group.kind}>{group.label}<span>{projects.filter(item => item.kind === group.kind).length}</span></button>)}</div>
    <div ref={navigation} className="graph-project-groups">{projectGroups.map(group => <section id={group.id} role="tabpanel" tabIndex={0} hidden={category !== group.kind} className={`project-picker-group project-group-${group.kind}`} aria-labelledby={`${group.id}-tab`} key={group.kind}>
      <div className="graph-project-picker" aria-label={`Select from ${group.title.toLowerCase()}`}>{projects.map((item,index) => item.kind === group.kind && <div className="graph-project-entry" data-selected={selection.project === index} key={item.slug}>
        <button aria-pressed={selection.project === index} aria-expanded={selection.project === index} aria-controls={`project-${item.slug}-technologies`} onClick={() => selectProject(index)}>{graphTitles[index]}</button>
        <Link className="graph-project-case-link" href={`/projects/${item.slug}`} aria-label={`Read ${item.title} case study`} title={`Read ${item.title} case study`}>Details<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg></Link>
        {selection.project === index && <div id={`project-${item.slug}-technologies`} className="technology-picker project-technology-panel"><span className="eyebrow">Technologies & contributions</span><div>{item.tags.map((tag,technologyIndex) => <button key={tag} aria-pressed={selection.technology === technologyIndex} onClick={() => selectTechnology(technologyIndex)}>{tag}<span aria-hidden="true">{selection.technology === technologyIndex ? '−' : '+'}</span></button>)}</div>{selection.technology !== null && <ul className="graph-contributions" aria-label="Selected technology contributions">{graphLeaves(index, selection.technology).map(leaf => <li key={leaf}>{leaf}</li>)}</ul>}</div>}
      </div>)}</div>
    </section>)}</div>
    </div>
    </div>
    <div className="graph-selection-summary" aria-live="polite">{project ? <><div><h3>{project.title}</h3><p>{project.role}</p></div><Link className="text-link graph-case-button" href={`/projects/${project.slug}`}>Read case study <span aria-hidden="true">↗</span></Link></> : <p>Select a project to explore its technologies. Details opens the full case study.</p>}</div>
  </div>;
}
