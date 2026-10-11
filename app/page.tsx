import Link from 'next/link';
import { CommercialHighlights } from '@/components/commercial-highlights';
import { ProjectCards } from '@/components/project-cards';
import { ProjectShowcase } from '@/components/project-showcase';
import { PixelTown } from '@/components/pixel-town';
import { CareerMap } from '@/components/career-map';
import { projects } from '@/lib/projects';
import { commercialProjects, independentProjects, otherCommercialProjects } from '@/lib/project-groups';
import { experiences } from '@/lib/experience';
import { Contact, Footer, Header } from '@/components/site';

export default function Home() {
  return <div id="top" className="pixel-portfolio">
    <Header />
    <main id="main">
      <PixelTown />
      <div className="tech-strip" aria-label="Core technologies"><div className="shell">{['React', 'TypeScript', 'Vue', 'Next.js', 'React Native', 'Node.js'].map(tech => <span key={tech}><i aria-hidden="true" />{tech}</span>)}</div></div>
      <section id="work" className="shell work-section commercial-work-section" aria-labelledby="work-title">
        <div className="section-heading"><div><p className="eyebrow">01 / COMMERCIAL WORK</p><h2 id="work-title">Complex systems. Clear interfaces.</h2></div><p>Developer platforms, reusable components<br />and real-time products. Here’s my contribution.</p></div>
        <CommercialHighlights />
        <details className="commercial-more">
          <summary>More commercial case studies <span className="case-count">{otherCommercialProjects.length}</span><span aria-hidden="true">↓</span></summary>
          <ProjectCards projects={otherCommercialProjects} />
        </details>
        <div className="commercial-section-links"><a className="text-link" href="#professional-work">View work history <span aria-hidden="true">↓</span></a><a className="text-link" href="#independent">Explore independent products <span aria-hidden="true">↓</span></a></div>
      </section>
      <section id="professional-work" className="shell experience-section professional-work-section" aria-labelledby="professional-work-title">
        <div className="section-heading"><div><p className="eyebrow">02 / WORK HISTORY</p><h2 id="professional-work-title">Across teams and products.</h2></div><p>Selected responsibilities across my career.<br />From frontend delivery to platform decisions.</p></div>
        <div>{experiences.map(experience => <article className="experience-row" key={experience.id}>
          <div><h3>{experience.company}</h3><p className="experience-city">{experience.city}</p></div>
          <div><p className="experience-domain">{experience.domain}</p><p className="experience-description">{experience.description}</p><div className="experience-case-links">{[experience.project, ...(experience.relatedProjects ?? [])].filter(Boolean).map(slug => <Link key={slug} className="text-link experience-case-link" href={`/projects/${slug}`}>{experience.relatedProjects?.length ? projects.find(project => project.slug === slug)?.title : 'Read case study'} <span aria-hidden="true">↗</span></Link>)}</div></div>
        </article>)}</div>
      </section>
      <section id="independent" className="shell work-section independent-work-section" aria-labelledby="independent-title">
        <div className="section-heading"><div><p className="eyebrow">03 / INDEPENDENT PRODUCTS</p><h2 id="independent-title">From everyday ideas to real products.</h2></div><p>Maps, published games and a practical tool.<br />Product thinking, engineering and independent delivery.</p></div>
        <ProjectCards projects={independentProjects} />
      </section>
      <section id="project-explorer" className="shell work-section" aria-labelledby="explorer-title">
        <div className="section-heading"><div><p className="eyebrow">04 / INTERACTIVE PROJECT EXPLORER</p><h2 id="explorer-title">Follow the connections.</h2></div><p>Explore all {projects.length} cases in Three.js.<br />Select a sphere to see technologies and contributions.</p></div>
        <ProjectShowcase>
          <div className="catalog-group" role="group" aria-label="Commercial project cards"><h3 className="catalog-group-title">Commercial work <span>{commercialProjects.length} cases</span></h3><ProjectCards projects={commercialProjects} /></div>
          <div className="catalog-group" role="group" aria-label="Independent project cards"><h3 className="catalog-group-title">Independent products <span>{independentProjects.length} cases</span></h3><ProjectCards projects={independentProjects} /></div>
        </ProjectShowcase>
      </section>
      <section id="about" className="about-section"><div className="shell about-grid"><div><p className="eyebrow">05 / A LITTLE ABOUT ME</p><h2>Frontend craft.<br /><em>End-to-end care.</em></h2></div><div className="about-copy"><p className="large-copy">I’m Yidan, a Senior Frontend Engineer based in Munich. I enjoy the work between a complex problem and an interface that makes sense.</p><p>Over 7+ years, I’ve worked on energy platforms, operational dashboards, financial workflows and web and mobile training products. My experience includes frontend migration, reusable component libraries, real-time interfaces and European platform delivery.</p><p>React, TypeScript and Vue are my core tools. I also work with Next.js and React Native, and explore Node.js, Express and PostgreSQL through personal product development.</p><div className="about-facts"><div><strong>7+ years</strong><span>Frontend experience</span></div><div><strong>Web + mobile</strong><span>Across product domains</span></div></div></div></div></section>
      <section id="experience" className="shell experience-section" aria-labelledby="experience-title"><div className="section-heading"><div><p className="eyebrow">06 / GROWTH MAP</p><h2 id="experience-title">Places that shaped my work.</h2></div><p>From Shanghai and Hangzhou to Munich.<br />Explore the places, people and memories along the way.</p></div><CareerMap /></section>
      <Contact />
    </main>
    <Footer pixel />
  </div>;
}
