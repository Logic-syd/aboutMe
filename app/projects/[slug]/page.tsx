import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects';
import { ProjectLinks } from '@/components/project-links';
import { ProjectGallery } from '@/components/project-gallery';
import { SportsCaseStudy } from '@/components/sports-case-study';
import { IsolarCloudCaseStudy } from '@/components/isolarcloud-case-study';
import { ApiCaseStudy } from '@/components/api-case-study';
import { RunningShowcase } from '@/components/running-showcase';
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
      <Link className="back-link" href="/#work">← All projects</Link>
      <div className="case-intro-layout"><div className="case-header"><p className="eyebrow">CASE STUDY {project.number} / {project.category}</p><h1>{project.title}</h1><p className="case-intro">{project.description}</p>{project.status && <span className={`status ${project.inDevelopment ? 'status-progress' : ''}`}><i />{project.status}</span>}<ProjectLinks project={project} /></div>
        <div className="case-facts"><div><span>CONTEXT</span><p>{project.organization}</p>{project.affiliation && <p className="case-affiliation">{project.affiliation}</p>}</div><div><span>MY ROLE</span><p>{project.role}</p></div><div><span>TOOLS & FOCUS</span><p>{project.tags.join(' · ')}</p></div></div>
      </div>
      <nav className="case-outline" aria-label="In this case study"><a href="#problem">The problem ↗</a><a href="#contribution">My contribution ↗</a><a href="#approach">Technical approach ↗</a><a href="#delivery">Delivery ↗</a></nav>
    </CaseIntro>
    {project.slug === 'running-mini-program' && <RunningShowcase />}
    <ProjectGallery project={project} />
    <CaseChapter id="problem" kicker="01 / THE PROBLEM" title="What needed to work.">
      <div className="case-two-column"><p className="case-lead">{project.problem}</p><div className="case-diagram"><Diagram project={project} compact /><p className="case-illustration-note">A summary of my responsibilities and technical approach. This workflow illustration does not reproduce the product UI.</p></div></div>
    </CaseChapter>
    <CaseChapter id="contribution" kicker="02 / MY CONTRIBUTION" title="Where I took ownership.">
      <ul className={`case-responsibilities ${project.responsibilities.length >= 5 ? 'has-many' : ''}`}>{project.responsibilities.map(item => <li key={item}>{item}</li>)}</ul>
    </CaseChapter>
    <CaseChapter id="approach" kicker="03 / TECHNICAL APPROACH" title="Decisions in context.">
      <CaseNotes label="Technical decisions" notes={project.decisions.map(decision => ({ label: decision.title, title: decision.title, body: <p>{decision.text}</p> }))} />
    </CaseChapter>
    <CaseChapter id="delivery" kicker="04 / DELIVERY & REFLECTION" title="What I can share.">
      <div className={project.lesson ? 'case-two-column' : 'case-delivery-copy'}><article><h3>Delivery.</h3><p>{project.delivery}</p></article>{project.lesson && <article><h3>What I learned.</h3><p>{project.lesson}</p></article>}</div>
    </CaseChapter>
    <nav className="case-next" aria-label="Case study navigation"><Link href="/#work">← All projects</Link><Link href={`/projects/${next.slug}`}><span>UP NEXT</span>{next.title} ↗</Link></nav><div className="case-contact"><p>Have a similar challenge?</p><a className="text-link" href="mailto:yidanshao622@gmail.com">Let’s talk ↗</a></div>
  </main><Footer /></div>;
}
