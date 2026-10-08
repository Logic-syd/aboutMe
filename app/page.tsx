import Link from 'next/link';
import { projects } from '@/lib/projects';
import { Diagram } from '@/components/diagram';
import { Contact, Footer, Header } from '@/components/site';

export default function Home() {
  return <div id="top">
    <Header />
    <main id="main">
      <section className="shell hero" aria-labelledby="hero-title">
        <div className="hero-meta"><p className="eyebrow">YIDAN SHAO / SENIOR FRONTEND ENGINEER</p><span className="availability"><i />Open to opportunities</span></div>
        <h1 id="hero-title">Complex products.<br /><span>Considered</span> interfaces<span className="pink-period">.</span></h1>
        <div className="hero-bottom"><p>I turn complex requirements into clear, dependable web experiences. 7+ years building with React, TypeScript and Vue — from energy platforms to tools for everyday discovery.</p><a className="button" href="#work">Explore my work <span aria-hidden="true">↘</span></a></div>
        <div className="hero-location"><span>Munich, Germany <span className="small-separator">/</span> Open to relocate</span><span>WEB · MOBILE · PRODUCT THINKING</span></div>
      </section>
      <section id="work" className="shell work-section" aria-labelledby="work-title">
        <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="work-title">Built around real problems.</h2></div><p>Six projects. Different domains. <br />The same care for the details.</p></div>
        <div className="featured-projects">{projects.slice(0, 3).map(project => <article className="featured-project" key={project.slug}>
          <Link className="diagram-link" href={`/projects/${project.slug}`} aria-label={`Read ${project.title} case study`}><Diagram project={project} /></Link>
          <div className="project-copy"><div className="project-kicker"><span>{project.number} / {project.category}</span></div><span className={`status ${project.inDevelopment ? 'status-progress' : ''}`}><i />{project.status}</span><h3><Link href={`/projects/${project.slug}`}>{project.shortTitle}</Link></h3><p className="project-name">{project.title}</p><p className="project-description">{project.description}</p><ul className="tags" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><Link className="text-link" href={`/projects/${project.slug}`}>Read case study <span aria-hidden="true">↗</span></Link></div>
        </article>)}</div>
        <div className="more-work-heading"><h3>More work, same attention.</h3><span>03 MORE CASE STUDIES</span></div>
        <div className="project-grid">{projects.slice(3).map(project => <article className="small-project" key={project.slug}><div className="small-project-top"><span>{project.number}</span><span aria-hidden="true">↗</span></div><p className="eyebrow">{project.organization}</p><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.description}</p><span className="small-status">{project.status}</span><ul className="tags" aria-label="Technologies">{project.tags.slice(0, 3).map(tag => <li key={tag}>{tag}</li>)}</ul><Link className="text-link" href={`/projects/${project.slug}`}>Read case study <span aria-hidden="true">↗</span></Link></article>)}</div>
        <p className="work-note">Commercial work is presented as written case studies. All diagrams are original illustrations of workflows, not product screenshots.</p>
      </section>
      <section id="about" className="about-section"><div className="shell about-grid"><div><p className="eyebrow">02 / A LITTLE ABOUT ME</p><h2>Frontend craft.<br /><em>End-to-end care.</em></h2></div><div className="about-copy"><p className="large-copy">I’m Yidan, a Senior Frontend Engineer based in Munich. I enjoy the work between a complex problem and an interface that makes sense.</p><p>Over 7+ years, I’ve worked on energy platforms, operational dashboards, financial workflows and web and mobile training products. My responsibilities have ranged from independently building a frontend to leading platform delivery and a European release.</p><p>React, TypeScript and Vue are my core tools. I also work with Next.js and React Native, and explore Node.js, Express and PostgreSQL through personal product development.</p><div className="about-facts"><div><strong>7+ years</strong><span>Frontend experience</span></div><div><strong>Web + mobile</strong><span>Across product domains</span></div></div></div></div></section>
      <section className="shell experience-section" aria-labelledby="experience-title"><div className="section-heading"><div><p className="eyebrow">03 / EXPERIENCE SNAPSHOT</p><h2 id="experience-title">A broader perspective.</h2></div><p>Selected responsibilities across teams. <br />A summary, not a chronological résumé.</p></div><div className="experience-list">{[
        ['NeuVerge-Tron / Sungrow', 'Energy & API products', 'Led the React frontend and European API-platform rollout, including localization, regional themes, testing and post-launch iteration.'],
        ['Danzhu (淡竹)', 'Sports education · Web & mobile', 'Built training interfaces with React, TypeScript, React Native and Vue, including camera integration and movement feedback.'],
        ['Longshine', 'Internal platforms & field operations', 'Contributed to technical selection and led an internal low-code platform for work orders and marketing applications.'],
        ['GLP', 'Logistics & supply chain finance', 'Frontend work on logistics and supply-chain finance workflows.'],
        ['Fingard', 'Treasury management SaaS', 'Worked on a Vue-based treasury management SaaS product.']
      ].map(([company, domain, description]) => <article className="experience-row" key={company}><h3>{company}</h3><div><p className="experience-domain">{domain}</p><p>{description}</p></div></article>)}</div></section>
      <Contact />
    </main>
    <Footer />
  </div>;
}
