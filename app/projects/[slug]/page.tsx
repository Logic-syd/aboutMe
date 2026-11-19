import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectListLink } from '@/components/project-drawer';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects';
import { ProjectLinks } from '@/components/project-links';
import { ProjectGallery } from '@/components/project-gallery';
import { SportsCaseStudy } from '@/components/sports-case-study';
import { IsolarCloudCaseStudy } from '@/components/isolarcloud-case-study';
import { ApiCaseStudy } from '@/components/api-case-study';
import { RunningShowcase } from '@/components/running-showcase';
import { LowCodeDemo } from '@/components/low-code-demo';
import { CaseIntro, CaseChapter } from '@/components/case-chapter';
import { CaseNotes } from '@/components/case-notes';
import { Diagram } from '@/components/diagram';
import { Footer, Header } from '@/components/site';

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) return {};
  const url = `/projects/${project.slug}`;
  const title = `${project.title} | Yidan Shao`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: { url, title, description: project.description, type: 'website' },
    twitter: { card: 'summary', title, description: project.description },
  };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  if (project.slug === 'sports-education') return <SportsCaseStudy project={project} next={next} />;
  if (project.slug === 'isolarcloud') return <IsolarCloudCaseStudy project={project} next={next} />;
  if (project.slug === 'renewable-energy-api') return <ApiCaseStudy project={project} next={next} />;
  return <div id="top" className="project-case"><Header detail /><main id="main" className="shell case-study">
    <CaseIntro>
      <div className="case-intro-layout"><div className="case-header"><p className="eyebrow">{project.category}</p><h1>{project.title}</h1><p className="case-intro">{project.description}</p>{project.status && <span className={`status ${project.archived ? 'status-archived' : project.inDevelopment ? 'status-progress' : ''}`}><i />{project.status}</span>}<ProjectLinks project={project} /></div>
        <div className="case-facts"><div><span>Organization</span><p>{project.organization}</p>{project.affiliation && <p className="case-affiliation">{project.affiliation}</p>}</div><div><span>My role</span><p>{project.role}</p></div><div><span>Technologies</span><p>{project.tags.join(', ')}</p></div></div>
      </div>
      <nav className="case-outline" aria-label="In this case study">{project.slug === 'low-code-platform' && <a href="#app-builder">Build your own app</a>}{!!project.screenshots?.length && <a href="#product-screens">Product screens</a>}{!!project.mobileScreenshots?.length && <a href="#mobile-screens">Mobile experience</a>}<a href="#problem">The problem</a><a href="#contribution">My contribution</a><a href="#approach">Technical approach</a>{project.delivery && <a href="#delivery">Project outcome</a>}</nav>
    </CaseIntro>
    {project.slug === 'running-mini-program' && <RunningShowcase />}
    {project.slug === 'low-code-platform' && <CaseChapter id="app-builder" kicker="Interactive demo" title="Build your own app" description="Compose a page, arrange its fields and change the theme. Then try the app you made." layout="demo"><LowCodeDemo /></CaseChapter>}
    <ProjectGallery project={project} />
    <CaseChapter id="problem" kicker="Context" title={project.caseHeadings?.problem ?? 'The problem'}>
      <div className="case-two-column"><p className="case-lead">{project.problem}</p><div className="case-diagram"><Diagram project={project} compact /></div></div>
    </CaseChapter>
    <CaseChapter id="contribution" title="What I did">
      <ul className={`case-responsibilities ${project.responsibilities.length >= 5 ? 'has-many' : ''}`}>{project.responsibilities.map(item => <li key={item}>{item}</li>)}</ul>
    </CaseChapter>
    <CaseChapter id="approach" kicker="Technical decisions" title={project.caseHeadings?.approach ?? 'Technical decisions'}>
      <CaseNotes label="Technical decisions" notes={project.decisions.map(decision => ({ label: decision.title, title: decision.title, body: <p>{decision.text}</p> }))} />
    </CaseChapter>
    {project.delivery && <CaseChapter id="delivery" kicker="Project status" title={project.caseHeadings?.delivery ?? 'Current status'}>
      <div className={project.lesson ? 'case-two-column' : 'case-delivery-copy'}><p>{project.delivery}</p>{project.lesson && <article><h3>What I learned</h3><p>{project.lesson}</p></article>}</div>
    </CaseChapter>}
    <nav className="case-next" aria-label="Case study navigation"><ProjectListLink>All projects</ProjectListLink><Link href={`/projects/${next.slug}`}><span>Next project</span>{next.title}</Link></nav>
  </main><Footer /></div>;
}
