'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ReactFlow, Background, Controls, Handle, Position, type Node, type Edge, type NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { projects } from '@/lib/projects';

function subscribeToViewport(callback: () => void) {
  const query = window.matchMedia('(max-width: 650px)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
const getCompactSnapshot = () => window.matchMedia('(max-width: 650px)').matches;
const getServerSnapshot = () => false;

const technologies = [
  { id: 'react', label: 'React', projects: [0, 1, 3, 5] },
  { id: 'typescript', label: 'TypeScript', projects: [0, 2, 3, 5] },
  { id: 'vue', label: 'Vue', projects: [2, 3] },
  { id: 'native', label: 'React Native', projects: [3] },
  { id: 'uniapp', label: 'uni-app', projects: [3] },
  { id: 'next', label: 'Next.js · SSR', projects: [1] },
  { id: 'backend', label: 'Node.js · Express', projects: [1] },
  { id: 'database', label: 'PostgreSQL', projects: [1] },
  { id: 'maps', label: 'Maps / visualization', projects: [1, 5] },
  { id: 'components', label: 'Components / themes', projects: [0, 4] },
];
const titles = ['Energy API platform', 'Coffee & beer map', 'Data export center', 'Sports & training', 'Low-code platform', 'Operations dashboard'];
type GraphNode = Node<{ label: string; number?: string; status?: string; active: boolean; onSelect: () => void; kind: 'project' | 'technology'; side: 'left' | 'right'; compact?: boolean }>;

function RelationNode({ data }: NodeProps<GraphNode>) {
  return <>
    <Handle type="target" position={Position.Left} id="left" isConnectable={false} />
    <button className={`nodrag nopan relation-node ${data.kind}-node ${data.active ? 'is-active' : ''}`} onClick={data.onSelect} aria-pressed={data.active}>
      {data.number && <span className="relation-index">PROJECT / {data.number}</span>}
      <strong>{data.label}</strong>
      {data.status && <span className="relation-status">{data.status}</span>}
    </button>
    <Handle type="source" position={data.compact ? Position.Left : Position.Right} id="right" isConnectable={false} />
  </>;
}
const nodeTypes = { relation: RelationNode };

export function ProjectGraph() {
  const compact = useSyncExternalStore(subscribeToViewport, getCompactSnapshot, getServerSnapshot);
  const [selection, setSelection] = useState({ kind: 'project', id: projects[0].slug });
  const selectedProject = selection.kind === 'project' ? projects.find(p => p.slug === selection.id) : undefined;
  const selectedTechnology = technologies.find(t => t.id === selection.id && selection.kind === 'technology');
  const highlighted = selectedTechnology ? selectedTechnology.projects : [projects.findIndex(p => p.slug === selection.id)];
  const { nodes, edges } = useMemo(() => {
    const activeProjectIndices = selection.kind === 'project' ? [projects.findIndex(p => p.slug === selection.id)] : technologies.find(t => t.id === selection.id)?.projects ?? [];
    const nodes: GraphNode[] = projects.map((project, index) => ({
      id: project.slug, type: 'relation', position: { x: index < 3 ? 0 : 740, y: 35 + (index % 3) * 205 },
      draggable: false, focusable: false, data: { label: titles[index], number: project.number, status: project.inDevelopment ? 'In development · Not released' : project.status, kind: 'project', side: index < 3 ? 'left' : 'right', active: activeProjectIndices.includes(index), onSelect: () => setSelection({ kind: 'project', id: project.slug }) },
    }));
    technologies.forEach((tech, index) => nodes.push({ id: tech.id, type: 'relation', position: { x: 395, y: index * 61 }, draggable: false, focusable: false, data: { label: tech.label, kind: 'technology', side: 'left', active: selection.kind === 'technology' ? selection.id === tech.id : tech.projects.includes(activeProjectIndices[0]), onSelect: () => setSelection({ kind: 'technology', id: tech.id }) } }));
    const edges: Edge[] = technologies.flatMap(tech => tech.projects.map(index => {
      const active = selection.kind === 'project' ? projects[index].slug === selection.id : tech.id === selection.id;
      return { id: `${projects[index].slug}-${tech.id}`, source: index < 3 ? projects[index].slug : tech.id, target: index < 3 ? tech.id : projects[index].slug, sourceHandle: 'right', targetHandle: 'left', type: 'default', selectable: false, focusable: false, style: { stroke: active ? '#ab4364' : '#c9c8c1', strokeWidth: active ? 2 : 1, opacity: active ? 1 : .28 }, zIndex: active ? 1 : 0 };
    }));
    if (compact) {
      const primary = nodes.find(node => node.id === selection.id)!;
      const related = selection.kind === 'project'
        ? nodes.filter(node => technologies.some(tech => tech.id === node.id && tech.projects.includes(activeProjectIndices[0])))
        : nodes.filter(node => activeProjectIndices.some(index => projects[index].slug === node.id));
      const compactNodes = [primary, ...related].map((node, index) => ({ ...node, position: { x: 40, y: index === 0 ? 0 : 145 + (index - 1) * (selection.kind === 'project' ? 66 : 132) }, data: { ...node.data, compact: true } }));
      const compactEdges: Edge[] = related.map(node => ({ id: `mobile-${primary.id}-${node.id}`, source: primary.id, target: node.id, sourceHandle: 'right', targetHandle: 'left', type: 'smoothstep', selectable: false, focusable: false, style: { stroke: '#ab4364', strokeWidth: 1.5 } }));
      return { nodes: compactNodes, edges: compactEdges };
    }
    return { nodes, edges };
  }, [selection, compact]);
  return <div className="project-explorer">
    <div className="explorer-toolbar"><div><span className="eyebrow">PROJECTS × TECHNOLOGIES</span><p>Follow the connections. Explore the work.</p></div><span className="graph-key"><i />Selected connection</span></div>
    <div className="graph-canvas" style={compact ? { height: 210 + (nodes.length - 1) * (selection.kind === 'project' ? 66 : 132) } : undefined} aria-label="Interactive project and technology graph">
      <ReactFlow key={compact ? `compact-${selection.kind}-${selection.id}` : 'full-graph'} nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: .12 }} minZoom={.25} maxZoom={1.6} nodesDraggable={false} nodesConnectable={false} elementsSelectable={false} zoomOnScroll={false} zoomOnDoubleClick={false} preventScrolling={false} panOnDrag={true} onlyRenderVisibleElements={false}>
        <Background color="#cfcec7" gap={23} size={1} /><Controls showInteractive={false} />
      </ReactFlow>
    </div>
    <div className="graph-project-picker" aria-label="Select a project">{projects.map((project,index) => <button key={project.slug} aria-pressed={selection.kind === 'project' && selection.id === project.slug} className={highlighted.includes(index) ? 'is-related' : ''} onClick={() => setSelection({ kind: 'project', id: project.slug })}><span>{project.number}</span>{titles[index]}</button>)}</div>
    <div className="graph-detail" aria-live="polite">
      {selectedProject ? <><div><span className={`status ${selectedProject.inDevelopment ? 'status-progress' : ''}`}><i />{selectedProject.status}</span><h3>{selectedProject.title}</h3><p>{selectedProject.description}</p></div><div className="graph-detail-meta"><p className="eyebrow">MY ROLE</p><p>{selectedProject.role}</p><ul className="tags">{selectedProject.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><Link className="text-link" href={`/projects/${selectedProject.slug}`}>Read case study ↗</Link></div></> : <><div><p className="eyebrow">TECHNOLOGY CONNECTION</p><h3>{selectedTechnology?.label}</h3><p>Explore where this technology or approach appears in my work.</p></div><ul className="related-projects">{selectedTechnology?.projects.map(index => <li key={projects[index].slug}><Link href={`/projects/${projects[index].slug}`}>{projects[index].title} ↗</Link><span>{projects[index].status}</span></li>)}</ul></>}
    </div>
    <p className="explorer-help">Select a node to explore its connections. Drag to pan; use + / − to zoom. On smaller screens, the graph focuses on the selected project or technology.</p>
  </div>;
}
