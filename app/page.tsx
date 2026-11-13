import Link from 'next/link';
import Image from 'next/image';
import { ProjectShowcase } from '@/components/project-showcase';
import { ProjectLinks } from '@/components/project-links';
import { PixelTown } from '@/components/pixel-town';
import { CareerMap } from '@/components/career-map';
import { projects } from '@/lib/projects';
import { profileDescription, siteUrl, technologyGroups } from '@/lib/profile';
import { CareerExperience } from '@/components/career-experience';
import { AboutMe } from '@/components/about-me';
import { Contact, Footer, Header } from '@/components/site';

const featuredProjects = [
  {
    slug: 'renewable-energy-api', context: 'Energy API platform · NVT / Sungrow',
    title: 'Owning a developer platform',
    reason: 'React frontend leadership and European delivery, from application access to online API debugging.',
  },
  {
    slug: 'ronghe-pay', context: 'Ronghe Pay · Fingard',
    title: 'Handling multi-bank payments',
    reason: 'A Vue 2 frontend rebuild followed by new bank integrations, different response fields and safeguards against duplicate submissions.',
  },
  {
    slug: 'sports-education', context: 'AI sports assessment · Danzhu',
    title: 'Connecting video to live feedback',
    reason: 'A jQuery-to-React migration connecting camera streams, WebSocket scores and individual results for school PE assessment.',
  },
  {
    slug: 'love-story-theater', context: 'Love Story Theater · Personal project · Archived',
    title: 'Building a full-stack AI app',
    reason: 'Made for a friend after a breakup: a Next.js conversation interface, a separate Kotlin / Ktor backend and DeepSeek-generated stories.',
  },
];

const profileSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: siteUrl,
  name: 'Yidan Shao — Senior Frontend Engineer',
  mainEntity: {
    '@type': 'Person',
    '@id': `${siteUrl}/#yidan-shao`,
    name: 'Yidan Shao',
    url: siteUrl,
    jobTitle: 'Senior Frontend Engineer',
    description: profileDescription,
    homeLocation: { '@type': 'City', name: 'Munich, Germany' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Jilin University' },
    sameAs: ['https://linkedin.com/in/yidanshao/', 'https://github.com/Logic-syd'],
    knowsAbout: [...technologyGroups.flatMap(group => group.skills), 'Energy platforms', 'Insurance payments', 'Premium collections', 'Claim payouts', 'Payment reconciliation', 'Education platforms', 'Full-stack development', 'AI applications', 'LLM API integration'],
  },
};

export default function Home() {
  return <div id="top" className="pixel-portfolio">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema).replace(/</g, '\\u003c') }} />
    <Header sidebar />
    <main id="main">
      <PixelTown />
      <section id="work" className="shell work-section" aria-labelledby="work-title">
        <div className="section-heading"><div><h2 id="work-title">Selected work</h2></div><div className="work-heading-links"><p className="project-section-counts"><span>{projects.filter(project => project.kind === 'commercial').length} work projects</span><span>{projects.filter(project => project.kind === 'independent').length} personal projects</span></p><a href="#project-explorer" className="all-projects-link">All projects <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18 18 6M6 6h12v12" /></svg></a></div></div>
        <ul className="featured-work-list" aria-label="Selected work and personal projects">{featuredProjects.map(project => <li key={project.slug}><Link href={`/projects/${project.slug}`} className="featured-work-link"><div><p className="featured-work-context">{project.context}</p><h3>{project.title}</h3><p className="featured-work-reason">{project.reason}</p></div><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></Link></li>)}</ul>
        <div id="project-explorer" className="all-work-heading"><h3>Explore all projects</h3></div>
        <ProjectShowcase>
        {[
          { kind: 'commercial', title: 'Work projects', id: 'work-notebooks' },
          { kind: 'independent', title: 'Personal projects', id: 'personal-notebooks' },
        ].map(group => <section id={group.id} className={`project-card-group project-group-${group.kind}`} aria-labelledby={`${group.id}-title`} key={group.kind}>
        <div className="project-group-heading"><h3 id={`${group.id}-title`}>{group.title}</h3><span>{projects.filter(project => project.kind === group.kind).length} projects</span></div>
        <div className="project-grid">{projects.filter(project => project.kind === group.kind).map(project => <article className="small-project town-project-card" key={project.slug}>
          {project.screenshots?.[0] && <Link className="town-card-preview" href={`/projects/${project.slug}`} aria-label={`View ${project.title} case study`}><Image src={project.screenshots[0].src} alt={project.screenshots[0].alt} width={project.screenshots[0].width} height={project.screenshots[0].height} sizes="(max-width: 650px) 85vw, 350px" /><span>PRODUCT SCREEN</span></Link>}
          <p className="eyebrow">{project.organization}</p><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.description}</p>
          {project.status && <span className="small-status">{project.status}</span>}<ul className="tags" aria-label="Technologies">{project.tags.slice(0, 3).map(tag => <li key={tag}>{tag}</li>)}</ul>
          <Link className="text-link" href={`/projects/${project.slug}`}>Read case study <span aria-hidden="true">↗</span></Link><ProjectLinks project={project} />
        </article>)}</div></section>)}
        </ProjectShowcase>
      </section>
      <section id="skills" className="shell skills-section" aria-labelledby="skills-title">
        <h2 id="skills-title">Skills</h2>
        <div className="skills-overview">{technologyGroups.map(group => <div className="skills-group" key={group.label}><h3>{group.label}</h3><ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div>)}</div>
        <p className="skills-context">Payments experience: <Link href="/projects/ronghe-pay">premium collections, claim payouts and payment reconciliation</Link>.</p>
      </section>
      <AboutMe />
      <section id="career-history" className="shell experience-section professional-work-section" aria-labelledby="career-history-title">
        <div className="section-heading"><div><h2 id="career-history-title">Experience</h2></div></div>
        <CareerExperience />
      </section>
      <section id="experience" className="shell experience-section" aria-labelledby="experience-title"><div className="section-heading"><div><h2 id="experience-title">Places</h2></div><p>Shanghai · Hangzhou · Berlin · Munich</p></div><CareerMap /></section>
      <Contact />
    </main>
    <Footer pixel />
  </div>;
}
