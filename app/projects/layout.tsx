import { ProjectDrawer } from '@/components/project-drawer';
import { projects } from '@/lib/projects';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const directory = projects.map(project => ({ slug: project.slug, title: project.graphTitle ?? project.title, kind: project.kind }));
  return <ProjectDrawer projects={directory}>{children}</ProjectDrawer>;
}
