import { projects } from '@/lib/projects';

export const commercialProjects = projects.filter(project => project.kind === 'commercial');
export const independentProjects = projects.filter(project => project.kind === 'independent');

export const commercialHighlights = [
  {
    slug: 'renewable-energy-api',
    focus: 'Developer platforms',
    title: 'Energy APIs & data access',
    summary: 'European frontend delivery for an energy developer platform, connecting application access, online API debugging and EU Data Act workflows.',
    contributions: ['Application management & online debugging', 'Permissions, asynchronous exports & recovery'],
    skills: ['React', 'TypeScript', 'API integration'],
    related: { slug: 'data-export-center', label: 'Explore the data export workflow' },
  },
  {
    slug: 'operations-monitoring',
    focus: 'Enterprise components & workflows',
    title: 'Component library & work orders',
    summary: 'Shared UI components and work-order interfaces for a State Grid management platform, within a 1,000-person development programme.',
    contributions: ['Reusable enterprise UI building blocks', 'Business processes translated into interfaces'],
    skills: ['React', 'TypeScript', 'Component library'],
  },
  {
    slug: 'sports-education',
    focus: 'Frontend modernization & real-time UI',
    title: 'AI sports assessment',
    summary: 'A TV-based system used for high-school entrance PE exams in parts of China, sports-school training and middle-school PE classes.',
    contributions: ['jQuery-to-React frontend migration', 'Canvas, video streams & WebSocket scores'],
    skills: ['jQuery → React', 'Canvas', 'WebSocket'],
  },
];

export const otherCommercialProjects = commercialProjects.filter(project => !commercialHighlights.some(highlight => highlight.slug === project.slug));
