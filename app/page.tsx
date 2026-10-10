import Link from 'next/link';
import Image from 'next/image';
import { ProjectShowcase } from '@/components/project-showcase';
import { ProjectLinks } from '@/components/project-links';
import { PixelTown } from '@/components/pixel-town';
import { CareerMap } from '@/components/career-map';
import { projects } from '@/lib/projects';
import { experiences } from '@/lib/experience';
import { Contact, Footer, Header } from '@/components/site';

export default function Home() {
  return <div id="top" className="pixel-portfolio">
    <Header />
    <main id="main">
      <PixelTown />
      <div className="tech-strip" aria-label="Core technologies"><div className="shell">{['React', 'TypeScript', 'Vue', 'Next.js', 'React Native', 'Node.js'].map(tech => <span key={tech}><i aria-hidden="true" />{tech}</span>)}</div></div>
      <section id="work" className="shell work-section" aria-labelledby="work-title">
        <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="work-title">A constellation of ideas.</h2></div><p>{projects.length} projects. Explore the spheres, <br />then open a notebook for the work behind them.</p></div>
        <ProjectShowcase>
        <div className="project-grid">{projects.map(project => <article className="small-project town-project-card" key={project.slug}>
          <div className="small-project-top"><span>{project.number}</span><span className="town-card-stamp" aria-hidden="true">▦</span></div>
          {project.screenshots?.[0] && <Link className="town-card-preview" href={`/projects/${project.slug}`} aria-label={`View ${project.title} case study`}><Image src={project.screenshots[0].src} alt={project.screenshots[0].alt} width={project.screenshots[0].width} height={project.screenshots[0].height} sizes="(max-width: 650px) 85vw, 350px" /><span>PRODUCT SCREEN</span></Link>}
          <p className="eyebrow">{project.organization}</p><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.description}</p>
          <span className="small-status">{project.status}</span><ul className="tags" aria-label="Technologies">{project.tags.slice(0, 3).map(tag => <li key={tag}>{tag}</li>)}</ul>
          <Link className="text-link" href={`/projects/${project.slug}`}>Open the notebook <span aria-hidden="true">↗</span></Link><ProjectLinks project={project} />
        </article>)}</div>
        </ProjectShowcase>
        <p className="work-note">Commercial work is presented through written case studies, with a selected privacy-redacted screenshot in the Danzhu case. All workflow diagrams are labeled illustrations.</p>
      </section>
      <section id="about" className="about-section"><div className="shell about-grid"><div><p className="eyebrow">02 / A LITTLE ABOUT ME</p><h2>Frontend craft.<br /><em>End-to-end care.</em></h2></div><div className="about-copy"><p className="large-copy">I’m Yidan, a Senior Frontend Engineer based in Munich. I enjoy the work between a complex problem and an interface that makes sense.</p><p>Over 7+ years, I’ve worked on energy platforms, operational dashboards, financial workflows and web and mobile training products. My responsibilities have ranged from independently building a frontend to leading platform delivery and a European release.</p><p>React, TypeScript and Vue are my core tools. I also work with Next.js and React Native, and explore Node.js, Express and PostgreSQL through personal product development.</p><div className="about-facts"><div><strong>7+ years</strong><span>Frontend experience</span></div><div><strong>Web + mobile</strong><span>Across product domains</span></div></div></div></div></section>
      <section id="professional-work" className="shell experience-section professional-work-section" aria-labelledby="professional-work-title">
        <div className="section-heading"><div><p className="eyebrow">03 / MY WORK</p><h2 id="professional-work-title">Across teams and products.</h2></div><p>Selected responsibilities across my career.<br />From frontend delivery to platform decisions.</p></div>
        <div>{experiences.map(experience => <article className="experience-row" key={experience.id}>
          <div><h3>{experience.company}</h3><p className="experience-city">{experience.city}</p></div>
          <div><p className="experience-domain">{experience.domain}</p><p className="experience-description">{experience.description}</p><div className="experience-case-links">{[experience.project, ...(experience.relatedProjects ?? [])].filter(Boolean).map(slug => <Link key={slug} className="text-link experience-case-link" href={`/projects/${slug}`}>{experience.relatedProjects?.length ? projects.find(project => project.slug === slug)?.title : 'Read case study'} <span aria-hidden="true">↗</span></Link>)}</div></div>
        </article>)}</div>
      </section>
      <section id="experience" className="shell experience-section" aria-labelledby="experience-title"><div className="section-heading"><div><p className="eyebrow">04 / GROWTH MAP</p><h2 id="experience-title">Places that shaped my work.</h2></div><p>From Shanghai and Hangzhou to Munich.<br />Explore the places, people and memories along the way.</p></div><CareerMap /></section>
      <Contact />
    </main>
    <Footer pixel />
  </div>;
}
