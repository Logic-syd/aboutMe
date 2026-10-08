import type { Project } from '@/lib/projects';

export function Diagram({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <figure className={`diagram diagram-${project.slug} ${compact ? 'diagram-compact' : ''}`}>
      <div className="diagram-grid" aria-hidden="true" />
      <div className="diagram-top"><span>CONCEPT / {project.number}</span><span aria-hidden="true">↗</span></div>
      <div className="diagram-flow">
        {project.flow.map((item, index) => <div className="flow-item" key={item}>
          <div className="flow-node"><span className="node-index">0{index + 1}</span><span>{item}</span><span className="node-dot" aria-hidden="true" /></div>
          {index < 2 && <div className="flow-line" aria-hidden="true"><span>↓</span></div>}
        </div>)}
      </div>
      <figcaption>Illustrative workflow · Not a product screenshot</figcaption>
    </figure>
  );
}
