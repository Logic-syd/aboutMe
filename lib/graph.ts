import { projects } from '@/lib/projects';

export const graphTitles = projects.map(project => project.graphTitle ?? project.title);
export type GraphSelection = { project: number | null; technology: number | null };
export function graphLeaves(project: number, technology: number) {
  return projects[project].contributions?.[technology] ?? [projects[project].role];
}

// Measure the orbit in label-sized units to leave more room along its top and bottom.
export function orbitPoints(count: number, radiusX: number, radiusY: number, start = Math.PI / 2, labelWidth = 1, labelHeight = 1) {
  const steps = 720;
  const samples = Array.from({ length: steps + 1 }, (_, index) => {
    const angle = start - index / steps * Math.PI * 2;
    return { x: Math.cos(angle) * radiusX, y: Math.sin(angle) * radiusY, distance: 0 };
  });
  for (let index = 1; index <= steps; index++) {
    const point = samples[index], previous = samples[index - 1];
    point.distance = previous.distance + Math.hypot((point.x - previous.x) / labelWidth, (point.y - previous.y) / labelHeight);
  }
  const perimeter = samples[steps].distance;
  return Array.from({ length: count }, (_, index) => {
    const distance = index / count * perimeter;
    const end = samples.findIndex(point => point.distance >= distance);
    if (end <= 0) return { x: samples[0].x, y: samples[0].y };
    const a = samples[end - 1], b = samples[end];
    const ratio = (distance - a.distance) / (b.distance - a.distance);
    return { x: a.x + (b.x - a.x) * ratio, y: a.y + (b.y - a.y) * ratio };
  });
}
