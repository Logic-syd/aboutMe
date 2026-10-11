import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/lib/projects';
import { ProjectLinks } from '@/components/project-links';

export function ProjectCards({ projects }: { projects: Project[] }) {
  return <div className="project-grid">{projects.map(project => <article className="small-project town-project-card" key={project.slug}>
    <div className="small-project-top"><span>{project.number}</span><span className="project-kind">{project.kind === 'commercial' ? 'COMMERCIAL WORK' : 'INDEPENDENT PRODUCT'}</span></div>
    {project.screenshots?.[0] && <Link className="town-card-preview" href={`/projects/${project.slug}`} aria-label={`View ${project.title} case study`}><Image src={project.screenshots[0].src} alt={project.screenshots[0].alt} width={project.screenshots[0].width} height={project.screenshots[0].height} sizes="(max-width: 650px) 85vw, 350px" /><span>PRODUCT SCREEN</span></Link>}
    <p className="eyebrow">{project.organization}</p><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.description}</p>
    {project.status && <span className="small-status">{project.status}</span>}<ul className="tags" aria-label="Technologies">{project.tags.slice(0, 3).map(tag => <li key={tag}>{tag}</li>)}</ul>
    <Link className="text-link" href={`/projects/${project.slug}`}>Read case study <span aria-hidden="true">↗</span></Link><ProjectLinks project={project} />
  </article>)}</div>;
}
