import { projects } from '@/lib/projects';
export const graphTitles = ['Energy API platform', 'Coffee & beer map', 'Data export center', 'Sports & training', 'Low-code platform', 'Operations dashboard'];
export type GraphSelection = { project: number | null; technology: number | null };
// Each leaf describes documented work, not an inferred technology or outcome.
const leaves: string[][][] = [
  [['React frontend leadership', 'European release delivery'], ['Typed frontend implementation'], ['API integration', 'Integration testing'], ['Multilingual interfaces', 'Regional theme configuration']],
  [['React map experience', 'Server-side rendering'], ['Backend development', 'Data import workflows'], ['500+ curated venues', 'Data access policies'], ['Server-rendered web experience']],
  [['Export interface implementation'], ['Typed export workflows'], ['Task states', 'Retry and download'], ['Data scope', 'Permission-aware actions']],
  [['Web training interfaces'], ['Typed web implementation'], ['Mobile training screens', 'Camera and feedback integration'], ['Running mini-program', 'Vue mobile frontend']],
  [['Configurable pages', 'Field-team applications'], ['Reusable components'], ['Theme switching']],
  [['Initial dashboard frontend ownership'], ['Typed monitoring interfaces'], ['Monitoring charts'], ['Geographic visualization']],
];
export function graphLeaves(project: number, technology: number) { return leaves[project]?.[technology] ?? [projects[project].role]; }
