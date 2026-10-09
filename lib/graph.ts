import { projects } from '@/lib/projects';

export const graphTitles = projects.map(project => project.graphTitle ?? project.title);
// Leave room for wrapped titles and the detail arrow in compact sibling cards.
export const graphSiblingGap = 108;
export type GraphSelection = { project: number | null; technology: number | null };
export function graphLeaves(project: number, technology: number) {
  return projects[project].contributions?.[technology] ?? [projects[project].role];
}
