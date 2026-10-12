import Link from 'next/link';
import Image from 'next/image';
import { ProjectShowcase } from '@/components/project-showcase';
import { ProjectLinks } from '@/components/project-links';
import { PixelTown } from '@/components/pixel-town';
import { CareerMap } from '@/components/career-map';
import { projects } from '@/lib/projects';
import { CareerExperience } from '@/components/career-experience';
import { AboutMe } from '@/components/about-me';
import { Contact, Footer, Header } from '@/components/site';

export default function Home() {
  return <div id="top" className="pixel-portfolio">
    <Header sidebar />
    <main id="main">
      <PixelTown />
      <section id="work" className="shell work-section" aria-labelledby="work-title">
        <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="work-title">Projects I’ve built.</h2></div><p className="project-section-counts"><span>{projects.filter(project => project.kind === 'commercial').length} work projects</span><span>{projects.filter(project => project.kind === 'independent').length} personal projects</span></p></div>
        <ProjectShowcase>
        {[
          { kind: 'commercial', title: 'Work projects', id: 'work-notebooks' },
          { kind: 'independent', title: 'Personal projects', id: 'personal-notebooks' },
        ].map(group => <section className={`project-card-group project-group-${group.kind}`} aria-labelledby={`${group.id}-title`} key={group.kind}>
        <div className="project-group-heading"><h3 id={`${group.id}-title`}>{group.title}</h3><span>{projects.filter(project => project.kind === group.kind).length} projects</span></div>
        <div className="project-grid">{projects.filter(project => project.kind === group.kind).map(project => <article className="small-project town-project-card" key={project.slug}>
          <div className="small-project-top"><span className="town-card-stamp" aria-hidden="true">▦</span></div>
          {project.screenshots?.[0] && <Link className="town-card-preview" href={`/projects/${project.slug}`} aria-label={`View ${project.title} case study`}><Image src={project.screenshots[0].src} alt={project.screenshots[0].alt} width={project.screenshots[0].width} height={project.screenshots[0].height} sizes="(max-width: 650px) 85vw, 350px" /><span>PRODUCT SCREEN</span></Link>}
          <p className="eyebrow">{project.organization}</p><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.description}</p>
          {project.status && <span className="small-status">{project.status}</span>}<ul className="tags" aria-label="Technologies">{project.tags.slice(0, 3).map(tag => <li key={tag}>{tag}</li>)}</ul>
          <Link className="text-link" href={`/projects/${project.slug}`}>Open the notebook <span aria-hidden="true">↗</span></Link><ProjectLinks project={project} />
        </article>)}</div></section>)}
        </ProjectShowcase>
      </section>
      <AboutMe />
      <section id="career-history" className="shell experience-section professional-work-section" aria-labelledby="career-history-title">
        <div className="section-heading"><div><p className="eyebrow">03 / CAREER EXPERIENCE</p><h2 id="career-history-title">Across teams and products.</h2></div><p>Selected responsibilities across my career.<br />From frontend delivery to platform decisions.</p></div>
        <CareerExperience />
      </section>
      <section id="experience" className="shell experience-section" aria-labelledby="experience-title"><div className="section-heading"><div><p className="eyebrow">04 / GROWTH MAP</p><h2 id="experience-title">Places that shaped my work.</h2></div><p>Shanghai & Hangzhou, Zhejiang → Berlin & Munich.<br />Work, everyday life, and a few favourite places.</p></div><CareerMap /></section>
      <Contact />
    </main>
    <Footer pixel />
  </div>;
}
