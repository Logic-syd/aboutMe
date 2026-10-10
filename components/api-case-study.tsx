import Link from 'next/link';
import type { Project } from '@/lib/projects';
import { Header, Footer } from '@/components/site';
import { ApiPlatformDemo } from '@/components/api-platform-demo';
import styles from './api-case-study.module.css';

const engineeringNotes = [
  {
    number: '01', title: 'The site is part of the request.', label: 'REGIONAL CONTEXT',
    summary: 'A build environment and a business region answer different questions.',
    detail: 'The platform separates build configuration from the selected business site. Site initialization determines the default gateway; individual requests can override it, including registration against another server. The interface needs to make the target site explicit and send each request to the intended gateway.',
    takeaway: 'A region selector has consequences beyond the label in the header.',
  },
  {
    number: '02', title: 'One request layer. Different contracts.', label: 'PORTAL VS. DEBUGGER',
    summary: 'An online debugger needs to preserve what the API actually returned.',
    detail: 'Ordinary portal requests can use the shared encryption and response-handling path. The debugger reuses that request layer with application-level credentials, a permission check and a raw-response mode. Its request-body encryption is disabled for that flow; the ordinary portal result wrapper is bypassed.',
    takeaway: 'Shared infrastructure still needs explicit options for different callers.',
  },
  {
    number: '03', title: 'HTTP success is not business success.', label: 'RESPONSE HANDLING',
    summary: 'A resolved request can still contain a business failure.',
    detail: 'The API reports business outcomes through result_code and result_data. The default POST wrapper can resolve with an error value rather than reject the promise. Callers must inspect that outcome; debugging instead exposes the full response. Network failures and business failures require different UI states.',
    takeaway: 'The frontend must understand the response contract, not just await it.',
  },
  {
    number: '04', title: 'Navigation is only one access layer.', label: 'PERMISSIONS',
    summary: 'Visible routes and authorized API calls are separate responsibilities.',
    detail: 'The frontend matches user permission codes to route metadata and registers the permitted pages. Menus and management entry points follow that context. Backend services remain responsible for identity, authorization and resource scope; hiding an action does not secure its API.',
    takeaway: 'A coherent access experience spans routes, actions and server checks.',
  },
];

export function ApiCaseStudy({ project, next }: { project: Project; next: Project }) {
  return <div id="top" className={styles.page}>
    <Header detail />
    <main id="main" className={styles.main}>
      <Link className={styles.back} href="/#work">← All projects</Link>
      <header className={styles.hero}>
        <div>
          <p className={styles.kicker}>CASE 01 / SUNGROW · DEVELOPER EXPERIENCE</p>
          <h1>Energy APIs.<br /><em>Built for developers.</em></h1>
          <p className={styles.intro}>A renewable-energy developer portal that connects documentation, application access and online debugging across regional sites.</p>
          <a href="#api-playground" className={styles.tryLink}>Try an API call <span aria-hidden="true">↓</span></a>
        </div>
        <aside className={styles.ownership} aria-label="My role and delivery">
          <p className={styles.kicker}>MY PART IN THE PRODUCT</p>
          <h2>European delivery.<br />Developer workflows.</h2>
          <p>My scope covers European delivery, online API debugging and application management, with ongoing work focused on the EU Data Act.</p>
          <div className={styles.release}><i aria-hidden="true" /> {project.status}</div>
          <span className={styles.role}>{project.role}</span>
        </aside>
      </header>

      <div className={styles.overview} aria-label="Platform at a glance">
        <div><span className={styles.overviewNumber}>05</span><p>Configured sites<span>China · International · Europe · Australia · India</span></p></div>
        <div><span className={styles.overviewNumber}>02</span><p>Authorization paths<span>User-level V1 · OAuth2 V2</span></p></div>
        <div className={styles.stack}><span className={styles.kicker}>TOOLS & FOCUS</span><p>React · TypeScript<br />API integration · Developer experience</p></div>
      </div>

      <section id="api-playground" className={styles.section} aria-labelledby="api-playground-title">
        <div className={styles.sectionHeading}>
          <div><p className={styles.kicker}>01 / THE INTERACTIVE CONSOLE</p><h2 id="api-playground-title">Follow a request.</h2></div>
          <p>Choose a site, check application access and run a sample call. Then try a missing permission or a timeout.</p>
        </div>
        <ApiPlatformDemo />
      </section>

      <section className={styles.productSection} aria-labelledby="api-product-title">
        <div className={styles.sectionHeading}>
          <div><p className={styles.kicker}>02 / THE PRODUCT BEHIND THE API</p><h2 id="api-product-title">Two sides of one platform.</h2></div>
          <p>Developers need a path to integration. Operators need the tools to manage access and keep that path working.</p>
        </div>
        <div className={styles.workspaces}>
          <article className={styles.workspace}>
            <span className={styles.workspaceIcon} aria-hidden="true">{'{ }'}</span>
            <div><p className={styles.kicker}>FOR DEVELOPERS</p><h3>From the docs to a working call.</h3><p>Browse API documentation, create an application, obtain authorization, debug a request and inspect usage.</p></div>
            <ul><li>Documentation & quick start</li><li>Applications & credentials</li><li>Online debugging & usage</li></ul>
          </article>
          <article className={`${styles.workspace} ${styles.operations}`}>
            <span className={styles.workspaceIcon} aria-hidden="true">≡</span>
            <div><p className={styles.kicker}>FOR OPERATORS</p><h3>The workflows behind access.</h3><p>Review applications and manage API versions, plans, call logs and help content within the same frontend.</p></div>
            <ul><li>Application review</li><li>Versions, plans & call logs</li><li>Documentation & FAQ maintenance</li></ul>
          </article>
        </div>
        <p className={styles.productNote}>Applications connect API access with plans, allowlists, Webhook and MQTT settings. The frontend makes these relationships navigable.</p>
      </section>

      <section id="api-engineering" className={styles.section} aria-labelledby="api-engineering-title">
        <div className={styles.sectionHeading}>
          <div><p className={styles.kicker}>03 / ENGINEERING IN CONTEXT</p><h2 id="api-engineering-title">Where the complexity lives.</h2></div>
          <p>Explore the platform’s request, regional and access boundaries—and what they mean for frontend implementation.</p>
        </div>
        <div className={styles.notes}>
          {engineeringNotes.map(note => <details key={note.number} className={styles.note}>
            <summary><span className={styles.noteNumber}>{note.number}</span><div><span className={styles.kicker}>{note.label}</span><h3>{note.title}</h3><p>{note.summary}</p></div><span className={styles.expand} aria-hidden="true">+</span><span className={styles.expandLabel}>Explore</span></summary>
            <div className={styles.noteBody}><p>{note.detail}</p><p className={styles.takeaway}>{note.takeaway}</p></div>
          </details>)}
        </div>
      </section>

      <section className={styles.delivery} aria-labelledby="api-delivery-title">
        <div><p className={styles.kicker}>04 / MY DELIVERY SCOPE</p><h2 id="api-delivery-title">Where I contribute.</h2><p>European delivery, online debugging and application management. My EU Data Act work is still in development and has not launched.</p></div>
        <ol className={styles.deliverySteps}>
          <li><span>01</span><div><h3>European delivery</h3><p>Frontend work for the European platform, with current development centered on EU Data Act requirements.</p></div></li>
          <li><span>02</span><div><h3>Online debugging</h3><p>Work on the developer-facing flow for making API calls and inspecting their responses.</p></div></li>
          <li><span>03</span><div><h3>Application management</h3><p>Work on the application interfaces that developers use to manage their API integrations.</p></div></li>
        </ol>
      </section>

      <div className={styles.contact}><div><p className={styles.kicker}>BUILDING A DEVELOPER PRODUCT?</p><h2>Let’s make the complex parts usable.</h2></div><a href="https://linkedin.com/in/yidanshao/">Let’s talk <span aria-hidden="true">↗</span></a></div>
      <nav className={styles.next} aria-label="Case study navigation"><Link href="/#work">← All projects</Link><Link href={`/projects/${next.slug}`}><span>UP NEXT</span>{next.title} ↗</Link></nav>
    </main>
    <Footer />
  </div>;
}
