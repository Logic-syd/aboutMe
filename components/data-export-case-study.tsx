import Link from 'next/link';
import type { Project } from '@/lib/projects';
import { Header, Footer } from '@/components/site';
import { DataExportDemo } from '@/components/data-export-demo';
import styles from './api-case-study.module.css';

const lifecycles = [
  { number: '01', title: 'The export task', states: 'Queued → Preparing → Ready', text: 'Tracks preparation, partial results and failures. Retrying preserves the requested scope. An expired task requires a new request.' },
  { number: '02', title: 'Identity confirmation', states: 'Confirm request · Confirm download', text: 'Creating a task and receiving a file are separate sensitive actions. The interface needs to represent each confirmation independently.' },
  { number: '03', title: 'The download link', states: 'Issued → Used / Expired', text: 'A short-lived link can expire while the export itself is still available. Fresh verification can renew delivery without rerunning preparation.' },
];
const notes = [
  { number: '01', label: 'SCOPE & VALIDATION', title: 'Make limits useful before submission.', summary: 'Large selections need a clear way to become manageable.', text: 'The scope-selection interface accounts for owned devices, data categories, time windows and configurable limits. Estimation and validation guide users toward smaller or batched requests before a task is created. Client-side guidance complements server-side validation.' },
  { number: '02', label: 'PARTIAL RESULTS', title: 'Missing data should remain visible.', summary: 'A partial result can still be useful.', text: 'The design retains available records, marks missing values and identifies gaps in export metadata. The UI distinguishes a partial export from a total failure so users can decide whether to download or make another request.' },
  { number: '03', label: 'RECOVERY', title: 'Keep the selection when something fails.', summary: 'Retry should not make users repeat their choices.', text: 'A failed request retains its device, field and time-range context. The UI separates retrying preparation from renewing a download link and from creating a new task after expiration. Each action matches the state it is recovering from.' },
  { number: '04', label: 'WEB & APP', title: 'One flow, several entry points.', summary: 'A shared browser-based journey connects selection to delivery.', text: 'The system design uses a shared H5 experience for Web and embedded App entry points. Browser-based file delivery avoids requiring an App to manage a large archive itself. Authentication and download verification still need to carry through that handoff.' },
];

export function DataExportCaseStudy({ project, next }: { project: Project; next: Project }) {
  return <div id="top" className={styles.page}>
    <Header detail />
    <main id="main" className={styles.main}>
      <Link className={styles.back} href="/#project-explorer">← All projects</Link>
      <header className={styles.hero}>
        <div><p className={styles.kicker}>CASE {project.number} / EU DATA ACT · ENERGY DATA ACCESS</p><h1>Your data.<br /><em>A clear way out.</em></h1><p className={styles.intro}>A data-access frontend for energy-device owners. Scope selection, identity checks, asynchronous preparation and download recovery become one understandable journey.</p><a href="#export-lab" className={styles.tryLink}>Try the export workflow <span aria-hidden="true">↓</span></a></div>
        <aside className={styles.ownership} aria-label="Frontend contribution"><p className={styles.kicker}>MY FRONTEND FOCUS</p><h2>Scope. State.<br />Recovery.</h2><p>Frontend implementation for EU Data Act data access, with attention to permission-aware selection, task states and actions that help users recover.</p><span className={styles.role}>{project.role}</span></aside>
      </header>
      <div className={styles.overview} aria-label="Technical focus">
        <div><span className={styles.overviewNumber}>↳</span><p>Read-only access<span>Owned devices · Selected fields · Defined scope</span></p></div>
        <div><span className={styles.overviewNumber}>03</span><p>Related lifecycles<span>Export task · Identity · Download link</span></p></div>
        <div className={styles.stack}><span className={styles.kicker}>TOOLS & FOCUS</span><p>React · TypeScript<br />Async workflows · Permission-aware UI</p></div>
      </div>

      <section id="export-lab" className={styles.section} aria-labelledby="export-lab-title">
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>01 / THE INTERACTIVE EXPORT LAB</p><h2 id="export-lab-title">Take a request all the way through.</h2></div><p>Choose a scope, confirm the request and download a real sample file. Try missing data, a failure or an expired link.</p></div>
        <DataExportDemo />
      </section>

      <section className={styles.section} aria-labelledby="export-states-title">
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>02 / FRONTEND STATE DESIGN</p><h2 id="export-states-title">Three lifecycles. Different recovery actions.</h2></div><p>A ready task does not imply a valid download link. Keeping these states separate makes the next action clear.</p></div>
        <div className={styles.lifecycles}>{lifecycles.map(item => <article key={item.number}><span className={styles.kicker}>{item.number}</span><h3>{item.title}</h3><p className={styles.stateSequence}>{item.states}</p><p>{item.text}</p></article>)}</div>
      </section>

      <section className={styles.section} aria-labelledby="export-decisions-title">
        <div className={styles.sectionHeading}><div><p className={styles.kicker}>03 / IMPLEMENTATION CONSIDERATIONS</p><h2 id="export-decisions-title">The edges are part of the experience.</h2></div><p>Scope, missing records, recoverable failures and browser handoffs all affect how the frontend needs to behave.</p></div>
        <div className={styles.notes}>{notes.map(note => <details className={styles.note} key={note.number}><summary><span className={styles.noteNumber}>{note.number}</span><div><span className={styles.kicker}>{note.label}</span><h3>{note.title}</h3><p>{note.summary}</p></div><span className={styles.expand} aria-hidden="true">+</span><span className={styles.expandLabel}>Explore</span></summary><div className={styles.noteBody}><p>{note.text}</p></div></details>)}</div>
      </section>

      <section className={styles.dataFocus} aria-labelledby="export-sharing-title">
        <div><p className={styles.kicker}>04 / BEYOND A ONE-TIME EXPORT</p><h2 id="export-sharing-title">Access stays in the user’s hands.</h2><p>The wider Data Act design connects exports with personal API access and third-party sharing. The frontend needs to make data scope, duration and the option to stop access explicit.</p></div>
        <div className={styles.focusSteps}><div><span>01</span><p><strong>Know the scope</strong>A data catalogue describes available fields, units, formats and access methods.</p></div><div><span>02</span><p><strong>Manage a grant</strong>Authorization defines the receiving application, selected data and duration.</p></div><div><span>03</span><p><strong>Pause or revoke</strong>Suspension is reversible; revocation ends a grant. The interface must explain the difference.</p></div><Link href="/projects/renewable-energy-api">Explore the connected API platform <span aria-hidden="true">↗</span></Link></div>
      </section>
      <nav className={styles.next} aria-label="Case study navigation"><Link href="/#project-explorer">← All projects</Link><Link href={`/projects/${next.slug}`}><span>UP NEXT</span>{next.title} ↗</Link></nav>
    </main><Footer />
  </div>;
}
