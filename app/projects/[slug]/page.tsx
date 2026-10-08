import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/projects';
import { Diagram } from '@/components/diagram';
import { Footer, Header } from '@/components/site';

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  return project ? { title: project.title, description: project.description, openGraph: { title: `${project.title} | Yidan Shao`, description: project.description } } : {};
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return <div id="top"><Header detail /><main id="main" className="shell case-study"><Link className="back-link" href="/#work">← All projects</Link><div className="case-header"><p className="eyebrow">CASE STUDY {project.number} / {project.category}</p><h1>{project.title}</h1><p className="case-intro">{project.description}</p><span className={`status ${project.inDevelopment ? 'status-progress' : ''}`}><i />{project.status}</span></div><div className="case-facts"><div><span>CONTEXT</span><p>{project.organization}</p></div><div><span>MY ROLE</span><p>{project.role}</p></div><div><span>TOOLS & FOCUS</span><p>{project.tags.join(' · ')}</p></div></div><div className="case-body"><div className="case-content"><section><p className="eyebrow">01 / THE PROBLEM</p><h2>What needed to work.</h2><p>{project.problem}</p></section><section><p className="eyebrow">02 / MY CONTRIBUTION</p><h2>Where I took ownership.</h2><ul className="responsibilities">{project.responsibilities.map(item => <li key={item}>{item}</li>)}</ul></section><section><p className="eyebrow">03 / TECHNICAL APPROACH</p><h2>Decisions in context.</h2>{project.decisions.map(decision => <div className="decision" key={decision.title}><h3>{decision.title}</h3><p>{decision.text}</p></div>)}</section><section className="delivery"><p className="eyebrow">04 / DELIVERY STATUS</p><h2>{project.inDevelopment ? 'Still being built.' : 'What I can share.'}</h2><p>{project.delivery}</p></section></div><aside className="case-aside"><Diagram project={project} compact /><div className="aside-note"><span>ABOUT THIS CASE STUDY</span><p>A summary of my responsibilities and technical approach. The diagram illustrates the workflow; it does not reproduce the product UI.</p></div></aside></div><nav className="case-next" aria-label="Case study navigation"><Link href="/#work">← All projects</Link><Link href={`/projects/${next.slug}`}><span>UP NEXT</span>{next.title} ↗</Link></nav><div className="case-contact"><p>Have a similar challenge?</p><a className="text-link" href="mailto:yidanshao622@gmail.com">Let’s talk ↗</a></div></main><Footer /></div>;
}
