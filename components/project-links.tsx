import type { Project } from '@/lib/projects';

export function ProjectLinks({ project }: { project: Project }) {
  if (!project.links?.length) return null;
  return <nav className="project-public-links" aria-label={`${project.title} public links`}>
    {project.links.map(link => <a className="text-link" key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<span aria-hidden="true">↗</span></a>)}
  </nav>;
}
