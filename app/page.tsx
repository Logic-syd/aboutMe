import Link from 'next/link';
import { ProjectShowcase } from '@/components/project-showcase';
import { ProjectDrawer, ProjectListLink } from '@/components/project-drawer';
import { PixelTown } from '@/components/pixel-town';
import { CareerMap } from '@/components/career-map';
import { projects } from '@/lib/projects';
import { profileDescription, siteUrl, technologyGroups } from '@/lib/profile';
import { CareerExperience } from '@/components/career-experience';
import { AboutMe } from '@/components/about-me';
import { Contact, Footer, Header } from '@/components/site';

const featuredProjects = [
  {
    slug: 'renewable-energy-api', context: 'NVT / Sungrow',
    title: 'Energy API platform',
    reason: 'I lead the React frontend and the European release: documentation, application access and online API debugging.',
  },
  {
    slug: 'ronghe-pay', context: 'Fingard',
    title: 'Insurance payments across banks',
    reason: 'I built the Vue 2 frontend for Ronghe Pay, then added new insurers and banks through configuration.',
  },
  {
    slug: 'sports-education', context: 'Danzhu',
    title: 'PE exam assessment',
    reason: 'I moved a jQuery system to React and connected video streams and WebSocket scores.',
  },
  {
    slug: 'wordweave', context: 'Personal project',
    title: 'Wordweave',
    reason: 'An AI-assisted reader for Chinese speakers learning technical English and German, with word cards, spaced review and a browser extension.',
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
        <div className="section-heading"><div><h2 id="work-title">Selected work</h2></div><div className="work-heading-links"><a href="#project-explorer" className="all-projects-link">All projects</a></div></div>
        <ul className="featured-work-list" aria-label="Selected work and personal projects">{featuredProjects.map(project => <li key={project.slug}><Link href={`/projects/${project.slug}`} className="featured-work-link"><div><h3>{project.title}</h3><p className="featured-work-context">{project.context}</p></div><p className="featured-work-reason">{project.reason}</p></Link></li>)}</ul>
      </section>
      <ProjectDrawer projects={projects.map(({ slug, title, kind }) => ({ slug, title, kind }))} edgeTrigger={false}>
        <section id="project-explorer" className="shell all-work-section" aria-labelledby="all-work-title">
          <div className="section-heading"><h2 id="all-work-title">Explore all projects</h2><ProjectListLink className="text-link" label="Browse project list">Project list</ProjectListLink></div>
          <ProjectShowcase />
        </section>
      </ProjectDrawer>
      <AboutMe />
      <section id="career-history" className="shell experience-section professional-work-section" aria-labelledby="career-history-title">
        <div className="section-heading"><div><h2 id="career-history-title">Experience</h2></div></div>
        <CareerExperience />
      </section>
      <section id="experience" className="shell experience-section" aria-labelledby="experience-title"><div className="section-heading"><div><h2 id="experience-title">Places</h2></div></div><CareerMap /></section>
      <Contact />
    </main>
    <Footer pixel />
  </div>;
}
