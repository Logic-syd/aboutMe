import Link from 'next/link';
import type { Project } from '@/lib/projects';
import { Header, Footer } from '@/components/site';
import { ApiPlatformDemo } from '@/components/api-platform-demo';
import { CaseChapter, CaseIntro } from '@/components/case-chapter';
import { CaseNotes } from '@/components/case-notes';
import styles from './api-case-study.module.css';

const engineeringNotes = [
  {
    number: '01', title: 'The site is part of the request.', label: 'REGIONAL CONTEXT',
    detail: 'The platform separates build configuration from the selected business site. Site initialization determines the default gateway; individual requests can override it, including registration against another server. The interface needs to make the target site explicit and send each request to the intended gateway.',
  },
  {
    number: '02', title: 'One request layer. Different contracts.', label: 'PORTAL VS. DEBUGGER',
    detail: 'Ordinary portal requests can use the shared encryption and response-handling path. The debugger reuses that request layer with application-level credentials, a permission check and a raw-response mode. Its request-body encryption is disabled for that flow; the ordinary portal result wrapper is bypassed.',
  },
  {
    number: '03', title: 'HTTP success is not business success.', label: 'RESPONSE HANDLING',
    detail: 'The API reports business outcomes through result_code and result_data. The default POST wrapper can resolve with an error value rather than reject the promise. Callers must inspect that outcome; debugging instead exposes the full response. Network failures and business failures require different UI states.',
  },
  {
    number: '04', title: 'Navigation is only one access layer.', label: 'PERMISSIONS',
    detail: 'The frontend matches user permission codes to route metadata and registers the permitted pages. Menus and management entry points follow that context. Backend services remain responsible for identity, authorization and resource scope; hiding an action does not secure its API.',
  },
];

export function ApiCaseStudy({ project, next }: { project: Project; next: Project }) {
  return <div id="top" className={`project-case ${styles.page}`}>
    <Header detail />
    <main id="main" className={styles.main}>
      <CaseIntro>
      <header className={styles.hero} data-case-hero>
        <div>
          <p className={styles.kicker}>CASE 01 / SUNGROW · DEVELOPER EXPERIENCE</p>
          <h1>Energy APIs.<br /><em>From docs to working calls.</em></h1>
          <p className={styles.intro}>A standalone developer platform for renewable-energy APIs: documentation, application access, online debugging and usage across regional sites.</p>
          <div className={styles.heroActions}><a href="#api-playground" className={styles.tryLink}>Try API debugging <span aria-hidden="true">↓</span></a><a href="#api-engineering" className={styles.secondaryLink}>Engineering notes ↓</a></div>
        </div>
        <aside id="api-delivery" className={styles.ownership} aria-label="My role and delivery">
          <p className={styles.kicker}>MY PART IN THE PRODUCT</p>
          <h2>API platform lead.</h2>
          <p>I lead the React frontend and European delivery, including the online debugger and application-management interfaces.</p>
          <span className={styles.role}>{project.organization}</span>
        </aside>
      </header>

      <div data-case-overview className={styles.overview} aria-label="Platform at a glance">
        <div><span className={styles.overviewNumber}>05</span><p>Configured sites<span>China · International · Europe · Australia · India</span></p></div>
        <div><span className={styles.overviewNumber}>02</span><p>Authorization paths<span>User-level V1 · OAuth2 V2</span></p></div>
        <div className={styles.stack}><span className={styles.kicker}>TOOLS & FOCUS</span><p>React · TypeScript<br /> API integration · Developer experience</p></div>
      </div>

      </CaseIntro>
      <CaseChapter id="api-playground" kicker="01 / THE INTERACTIVE CONSOLE" title="Follow a request." description="Choose a site, check application access and run a sample call. Then try a missing permission or a timeout." layout="demo"><ApiPlatformDemo /></CaseChapter>

      <CaseChapter id="api-product" kicker="02 / THE PRODUCT BEHIND THE API" title="Two sides of one platform." description="Developers need a path to integration. Operators need tools to manage access and keep that path working."><div className="case-centered-content">
        <div className={styles.workspaces}>
          <article className={styles.workspace}>
            <span className={styles.workspaceIcon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H6a2 2 0 0 0-2 2v4a3 3 0 0 1-2 3 3 3 0 0 1 2 3v4a2 2 0 0 0 2 2h2M16 3h2a2 2 0 0 1 2 2v4a3 3 0 0 0 2 3 3 3 0 0 0-2 3v4a2 2 0 0 1-2 2h-2" /></svg></span>
            <div><p className={styles.kicker}>FOR DEVELOPERS</p><h3>From the docs to a working call.</h3><p>Browse API documentation, create an application, obtain authorization, debug a request and inspect usage.</p></div>
          </article>
          <article className={`${styles.workspace} ${styles.operations}`}>
            <span className={styles.workspaceIcon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 6h14M5 12h14M5 18h14" /></svg></span>
            <div><p className={styles.kicker}>FOR OPERATORS</p><h3>The workflows behind access.</h3><p>Review applications and manage API versions, plans, call logs and help content within the same frontend.</p></div>
          </article>
        </div>
        <p className={styles.productNote}>Applications connect API access with plans, allowlists, Webhook and MQTT settings. The frontend makes these relationships navigable.</p>
      </div></CaseChapter>

      <CaseChapter id="api-engineering" kicker="03 / ENGINEERING IN CONTEXT" title="Where the complexity lives." description="Explore the platform’s request, regional and access boundaries—and their implications for frontend implementation.">
        <CaseNotes label="API engineering topics" notes={engineeringNotes.map(note => ({ label: note.label, title: note.title, body: <p>{note.detail}</p> }))} />
      </CaseChapter>

      <nav className={`case-next ${styles.next}`} aria-label="Case study navigation"><Link href="/#work">← All projects</Link><Link href={`/projects/${next.slug}`}><span>UP NEXT</span>{next.title} ↗</Link></nav>
    </main>
    <Footer />
  </div>;
}
