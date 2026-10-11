import Link from 'next/link';
import { projects } from '@/lib/projects';
import { commercialHighlights } from '@/lib/project-groups';

export function CommercialHighlights() {
  return <div className="commercial-highlights">
    {commercialHighlights.map((highlight, index) => {
      const project = projects.find(project => project.slug === highlight.slug)!;
      return <article className={`commercial-highlight commercial-highlight-${index + 1}`} key={project.slug}>
        <div className="commercial-highlight-top"><span className="eyebrow">{highlight.focus}</span><span aria-hidden="true">0{index + 1}</span></div>
        <p className="commercial-company">{project.organization}</p>
        <h3><Link href={`/projects/${project.slug}`}>{highlight.title}</Link></h3>
        <p className="commercial-summary">{highlight.summary}</p>
        <div className="commercial-contribution"><p className="eyebrow">MY CONTRIBUTION</p><ul>{highlight.contributions.map(item => <li key={item}>{item}</li>)}</ul></div>
        <ul className="tags" aria-label="Technologies">{highlight.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
        <div className="commercial-case-actions"><Link className="text-link" href={`/projects/${project.slug}`}>Read case study <span aria-hidden="true">↗</span></Link>{highlight.related && <Link className="commercial-related" href={`/projects/${highlight.related.slug}`}>{highlight.related.label} <span aria-hidden="true">↗</span></Link>}</div>
      </article>;
    })}
  </div>;
}
