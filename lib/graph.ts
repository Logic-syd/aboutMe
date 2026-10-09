import { projects } from '@/lib/projects';

// Keep at most six projects in the 3D scene, regardless of catalog size.
export const GRAPH_PAGE_SIZE = 6;
export const graphTitles = projects.map(project => project.graphTitle ?? project.title);
export type GraphSelection = { project: number | null; technology: number | null };
export function graphLeaves(project: number, technology: number) {
  return projects[project].contributions?.[technology] ?? [projects[project].role];
}
