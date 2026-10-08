import Link from 'next/link';
import { ProjectShowcase } from '@/components/project-showcase';
import { CareerMap } from '@/components/career-map';
import { projects } from '@/lib/projects';
import { experiences } from '@/lib/experience';
import { Diagram } from '@/components/diagram';
import { OrbitScene } from '@/components/orbit-scene';
import { Contact, Footer, Header } from '@/components/site';

export default function Home() {
  return <div id="top">
    <Header />
    <main id="main">
      <section className="hero orbit-hero" aria-labelledby="hero-title">
        <div className="hero-topline"><p className="eyebrow">PORTFOLIO / YIDAN SHAO</p><span className="availability"><i />Open to opportunities</span></div>
        <div className="hero-center">
          <p className="hero-role">SENIOR FRONTEND ENGINEER</p>
          <h1 id="hero-title">YIDAN SHAO<span className="pink-period">.</span></h1>
          <h2>Complex products.<br className="mobile-break" /> <em>Considered interfaces.</em></h2>
          <p className="hero-intro">7+ years turning complex requirements into clear, dependable web and mobile experiences.</p>
          <div className="hero-actions"><a className="button" href="#work">Explore my work <span aria-hidden="true">↘</span></a><a className="button button-outline" href="mailto:yidanshao622@gmail.com">Get in touch <span aria-hidden="true">↗</span></a></div>
          <p className="hero-base">MUNICH, GERMANY <span>·</span> OPEN TO RELOCATE</p>
        </div>
        <OrbitScene />
        <div className="hero-bottomline"><span>SELECTED WORK / 01—06</span><a href="#work">SCROLL TO EXPLORE ↓</a><span>THOUGHTFUL INTERFACES. RELIABLE DELIVERY.</span></div>
      </section>
      <div className="tech-strip" aria-label="Core technologies"><div className="shell">{['React', 'TypeScript', 'Vue', 'Next.js', 'React Native', 'Node.js'].map(tech => <span key={tech}><i aria-hidden="true" />{tech}</span>)}</div></div>
      <section id="work" className="shell work-section" aria-labelledby="work-title">
        <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="work-title">Connected by craft.</h2></div><p>Six projects. Shared technologies. <br />Explore the connections behind the work.</p></div>
        <ProjectShowcase>
        <div className="featured-projects craft-projects">{projects.slice(0, 3).map(project => <article className="featured-project" key={project.slug}>
          <Link className="diagram-link" href={`/projects/${project.slug}`} aria-label={`Read ${project.title} case study`}><Diagram project={project} /></Link>
          <div className="project-copy"><div className="project-kicker"><span>{project.number} / {project.category}</span></div><span className={`status ${project.inDevelopment ? 'status-progress' : ''}`}><i />{project.status}</span><h3><Link href={`/projects/${project.slug}`}>{project.shortTitle}</Link></h3><p className="project-name">{project.title}</p><p className="project-description">{project.description}</p><ul className="tags" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><Link className="text-link" href={`/projects/${project.slug}`}>Read case study <span aria-hidden="true">↗</span></Link></div>
        </article>)}</div>
        <div className="more-work-heading"><h3>More work, same attention.</h3><span>03 MORE CASE STUDIES</span></div>
        <div className="project-grid">{projects.slice(3).map(project => <article className="small-project" key={project.slug}><div className="small-project-top"><span>{project.number}</span><span aria-hidden="true">↗</span></div><p className="eyebrow">{project.organization}</p><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.description}</p><span className="small-status">{project.status}</span><ul className="tags" aria-label="Technologies">{project.tags.slice(0, 3).map(tag => <li key={tag}>{tag}</li>)}</ul><Link className="text-link" href={`/projects/${project.slug}`}>Read case study <span aria-hidden="true">↗</span></Link></article>)}</div>
        </ProjectShowcase>
        <p className="work-note">Commercial work is presented through written case studies, with a selected privacy-redacted screenshot in the Danzhu case. All workflow diagrams are labeled illustrations.</p>
      </section>
      <section id="about" className="about-section"><div className="shell about-grid"><div><p className="eyebrow">02 / A LITTLE ABOUT ME</p><h2>Frontend craft.<br /><em>End-to-end care.</em></h2></div><div className="about-copy"><p className="large-copy">I’m Yidan, a Senior Frontend Engineer based in Munich. I enjoy the work between a complex problem and an interface that makes sense.</p><p>Over 7+ years, I’ve worked on energy platforms, operational dashboards, financial workflows and web and mobile training products. My responsibilities have ranged from independently building a frontend to leading platform delivery and a European release.</p><p>React, TypeScript and Vue are my core tools. At Zhihuishu (智慧树), I also worked with Three.js on an interactive knowledge graph with floating, draggable sphere nodes, elastic feedback and three-level expansion, keeping one branch open at a time. I also work with Next.js and React Native, and explore Node.js, Express and PostgreSQL through personal product development.</p><div className="about-facts"><div><strong>7+ years</strong><span>Frontend experience</span></div><div><strong>Web + mobile</strong><span>Across product domains</span></div></div></div></div></section>
      <section id="professional-work" className="shell experience-section professional-work-section" aria-labelledby="professional-work-title">
        <div className="section-heading"><div><p className="eyebrow">03 / MY WORK</p><h2 id="professional-work-title">Across teams and products.</h2></div><p>Selected responsibilities across my career.<br />From frontend delivery to platform decisions.</p></div>
        <div>{experiences.map(experience => <article className="experience-row" key={experience.id}>
          <div><h3>{experience.company}</h3><p className="experience-city">{experience.city}</p></div>
          <div><p className="experience-domain">{experience.domain}</p><p className="experience-description">{experience.description}</p>{experience.project && <Link className="text-link experience-case-link" href={`/projects/${experience.project}`}>Read case study <span aria-hidden="true">↗</span></Link>}</div>
        </article>)}</div>
      </section>
      <section id="experience" className="shell experience-section" aria-labelledby="experience-title"><div className="section-heading"><div><p className="eyebrow">04 / GROWTH MAP</p><h2 id="experience-title">Places that shaped my work.</h2></div><p>From Shanghai and Hangzhou to Munich.<br />Explore the places, people and memories along the way.</p></div><CareerMap /></section>
      <Contact />
    </main>
    <Footer />
  </div>;
}
