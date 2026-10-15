import Link from 'next/link';
import type { Project } from '@/lib/projects';
import { Header, Footer } from '@/components/site';
import { IsolarCloudProductViews } from '@/components/isolarcloud-product-views';
import { CaseIntro, CaseChapter } from '@/components/case-chapter';
import { CaseNotes } from '@/components/case-notes';
import { DataAccessChapter } from '@/components/data-access-chapter';
import styles from './isolarcloud-case-study.module.css';

const migrationNotes = [
  { number: '01', title: 'Product, cloud and language are different contexts.', label: 'REGIONAL ROUTING', summary: 'A European interface can still need a test gateway.', text: 'The migration involved keeping European product behavior separate from the target cloud environment and the user’s language. The shared request layer resolves the intended service, while individual flows can override that default. A European test deployment must retain European UI behavior without sending its requests to production.' },
  { number: '02', title: 'Country selection changes business eligibility.', label: 'COUNTRY RULES', summary: 'An allowed-country list and an excluded-country list cannot share the same filter.', text: 'The localized European product uses configured countries as an allowed set. The original platform’s European-country path excludes countries assigned to that rollout. These are different business rules, even when the country names are identical. Configuration failures, historical selections and string-versus-number IDs also affect the frontend behavior.' },
  { number: '03', title: 'Preserve the meaning of a measurement.', label: 'NUMBERS & TIME', summary: 'Formatting affects inputs, requests and interpretation.', text: 'German decimal and grouping separators need consistent parsing and display. Zero readings must remain distinct from missing values. Browser time-zone offsets, plant time zones and daylight-saving boundaries also represent different contexts; a date or numeric label alone does not settle how a measurement should be interpreted.' },
  { number: '04', title: 'Follow the task beyond the first API response.', label: 'ASYNC REPORTS', summary: 'Task creation, push updates and file delivery cross different services.', text: 'Report exports create a task over HTTP, follow updates through an MQTT connection and receive a separate download destination. A successful API call therefore does not prove that a report can be downloaded in the European environment. The implementation also needs to account for task ownership and cleanup of subscriptions, timers and registrations.' },
  { number: '05', title: 'A direct link carries its own regional context.', label: 'EMAIL ENTRY POINTS', summary: 'An existing browser session must not choose another email’s destination.', text: 'Email entry points can derive their cloud context from the host or from URL parameters, depending on the workflow. They can also use explicit service addresses and a different login path. Migrating the main application gateway alone does not cover report, upgrade or unsubscribe links; parameter parsing and the downstream request have to agree.' },
];

export function IsolarCloudCaseStudy({ project, next }: { project: Project; next: Project }) {
  return <div id="top" className={`project-case ${styles.page}`}>
    <Header detail />
    <main id="main" className={styles.main}>
      <CaseIntro>
      <header className={styles.hero} data-case-hero>
        <div><p className={styles.kicker}>CASE {project.number} / NVT · SUNGROW · SOLAR & ENERGY STORAGE</p><h1>iSolarCloud.<br /><em>From China to Europe.</em></h1><p className={styles.intro}>My frontend work on Sungrow’s solar and energy-storage platform spans the China-to-Europe migration, plant and device feature settings, and more recent EU Data Act data-access requirements.</p><div className={styles.heroActions}><a href="#product" className={styles.tryLink}>Explore the platform <span aria-hidden="true">↓</span></a><a href="#migration" className={styles.secondaryLink}>Inside the migration ↓</a></div></div>
        <aside className={styles.ownership} aria-label="My frontend contribution"><p className={styles.kicker}>MY PART IN THE PRODUCT</p><h2>Regional delivery.<br /> Real device workflows.</h2><p>I worked on adapting the China-based frontend for Europe and on features for individual plants and devices. Data-access requirements are one additional part of that wider work.</p><span className={styles.role}>{project.organization}</span></aside>
      </header>
      <div data-case-overview className={styles.overview} aria-label="Project focus"><div><span className={styles.overviewNumber}>CN → EU</span><p>Frontend migration<span>Regional routing · Country rules · Localization</span></p></div><div><span className={styles.overviewNumber}>↳</span><p>Plants & devices<span>Feature settings · Capability-aware operations</span></p></div><div className={styles.stack}><span className={styles.kicker}>PLATFORM TECHNOLOGY</span><p>Vue 3 · TypeScript · Pinia<br /> ECharts · Axios · MQTT</p></div></div>

      </CaseIntro>
      <CaseChapter id="product" kicker="01 / THE PRODUCT" title="An energy operations platform." description="Plants, devices, energy analysis and operational workflows within a shared, multi-region web application." layout="media"><IsolarCloudProductViews project={project} /></CaseChapter>

      <CaseChapter id="migration" kicker="02 / CHINA-TO-EUROPE MIGRATION" title="More than translating the interface." description="Adapt regional behavior and service dependencies while keeping the original platform’s workflows compatible."><CaseNotes label="China-to-Europe migration topics" notes={migrationNotes.map(note => ({ label: note.label, title: note.title, summary: note.summary, body: <p>{note.text}</p> }))} /></CaseChapter>

      <CaseChapter id="features" kicker="03 / PLANT & DEVICE FEATURES" title="Settings meet real equipment." description="My work also covered feature settings and business interfaces for specific plants and devices."><div className={styles.featureGrid}><article><span className={styles.kicker}>PLANT CONTEXT</span><h3>Configure features for the right plant.</h3><p>Plant-specific interfaces need to keep the selected plant, its data and its available features together as the user moves between views.</p></article><article><span className={styles.kicker}>DEVICE CAPABILITIES</span><h3>A device type is only the beginning.</h3><p>Parameter-setting logic considers country, grid type, firmware and protocol capabilities. Batch settings need to respect differences between the selected devices.</p></article><article><span className={styles.kicker}>SHARED PLATFORM</span><h3>Carry the context through the workflow.</h3><p>Feature settings sit within the same regional, permission and request conventions as the wider platform. The interface must make availability and the next action clear.</p></article></div></CaseChapter>

      <DataAccessChapter />

      <div className={styles.contact}><div><p className={styles.kicker}>BUILDING A COMPLEX BUSINESS PRODUCT?</p><h2>Let’s make the workflows usable.</h2></div><a href="https://linkedin.com/in/yidanshao/">Let’s talk ↗</a></div><nav className={styles.next} aria-label="Case study navigation"><Link href="/#work">← All projects</Link><Link href={`/projects/${next.slug}`}><span>UP NEXT</span>{next.title} ↗</Link></nav>
    </main><Footer />
  </div>;
}
