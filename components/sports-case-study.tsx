import Link from 'next/link';
import type { Project } from '@/lib/projects';
import { Header, Footer } from '@/components/site';
import { SportsAssessmentDemo } from '@/components/sports-assessment-demo';
import { CaseIntro, CaseChapter } from '@/components/case-chapter';
import { CaseNotes } from '@/components/case-notes';
import styles from './sports-case-study.module.css';

const contexts = [
  { number: '01', title: 'High-school entrance PE exams', text: 'Used in high-school entrance physical-education examinations in parts of China.' },
  { number: '02', title: 'Sports-school training', text: 'Used in everyday training at sports schools, with scoring and assessment reports.' },
  { number: '03', title: 'Middle-school PE', text: 'Used in physical-education classes to connect exercise with individual feedback.' },
];
const pipeline = [
  { name: 'Capture', tech: 'CAMERA · VIDEO STREAM', text: 'Camera footage enters the assessment pipeline. My frontend work included camera integration and video-stream transmission.' },
  { name: 'Understand', tech: 'BACKEND AI', text: 'The backend analyzes movement and returns assessment data. Face recognition distinguishes people when several participants train together.' },
  { name: 'Receive', tech: 'WEBSOCKET', text: 'Scoring data returns to the frontend in real time. Each participant’s assessment needs to reach the corresponding on-screen result.' },
  { name: 'Respond', tech: 'REACT · CANVAS · AUDIO', text: 'The TV interface presents visual feedback and individual scores, followed by analysis reports and spoken results after training.' },
];

export function SportsCaseStudy({ project, next }: { project: Project; next: Project }) {
  return <div id="top" className={`project-case ${styles.page}`}><Header detail /><main id="main" className={styles.main}>
    <CaseIntro><Link className={styles.back} href="/#work">← All projects</Link>
      <header className={styles.hero} data-case-hero><div><p className={styles.kicker}>CASE {project.number} / DANZHU · AI SPORTS ASSESSMENT</p><h1>Real movement.<br /><em>Real-time feedback.</em></h1><p className={styles.intro}>A TV-based sports examination and training system. I migrated its frontend from jQuery to React and connected live video, AI scoring and synchronized feedback.</p></div>
        <div className={styles.context}><span className={styles.contextLabel}><i /> IN REGIONAL USE</span><h2>China’s high-school entrance PE exams.</h2><p>The system has been used in high-school entrance PE examinations in parts of China, as well as sports-school training and middle-school PE classes.</p><a href="#sports-demo" className={styles.tryLink}>Explore the interactive demo <span aria-hidden="true">↓</span></a></div>
      </header>
      <div className={styles.facts} data-case-overview><div><span>MY ROLE</span><p>Frontend development<br />jQuery → React migration</p></div><div><span>TECHNICAL FOCUS</span><p>Canvas · Video streams · WebSocket<br />Multi-person results · Audio-visual synchronization</p></div><div><span>IN THIS CASE</span><nav aria-label="On this case study"><a href="#sports-demo">Play the demo ↘</a><a href="#sports-pipeline">Follow the data ↘</a><a href="#sports-scaling">From 2 to 8 cameras ↘</a><a href="#sports-migration">Explore the migration ↘</a></nav></div></div>
    </CaseIntro>
    <CaseChapter id="sports-demo" kicker="01 / THE INTERACTIVE LAB" title="Step onto the training floor." description="Start a session, add participants and adjust the scoring delay. Watch movement become individual results." layout="demo"><SportsAssessmentDemo /></CaseChapter>
    <CaseChapter id="sports-pipeline" kicker="02 / BEHIND THE INTERFACE" title="One movement. A connected system." description="My work connected camera and scoring integrations with the frontend experience. Select a step to follow the flow.">
      <CaseNotes label="Camera-to-feedback pipeline" notes={pipeline.map(step => ({label: step.name, title: step.name, summary: step.tech, body: <><p>{step.text}</p><p className="case-takeaway">System workflow illustration. AI analysis and face recognition are backend capabilities; my contribution was frontend implementation and integration.</p></>}))} />
    </CaseChapter>
    <CaseChapter id="sports-scaling" kicker="03 / THE SCALING CHALLENGE" title="More cameras. A harder stability problem." description="Increasing the number of cameras brought richer assessment data—and a persistent stream-stalling issue.">
      <CaseNotes label="Camera scaling and investigation" notes={[
        {label: 'From 2 to 8 cameras', title: 'Richer data. A persistent stall.', body: <><div className={styles.cameraCount} aria-label="Camera inputs increased from 2 to 8"><span>2 <i aria-hidden="true">→</i> 8</span><p>CAMERA INPUTS</p></div><p>When we expanded from two cameras to eight, the system could capture more data. But in certain operating states, the data stream would stall. This became a difficult, long-running issue for the team.</p><p className="case-takeaway">The team eventually resolved the stream-stalling issue after a sustained period of investigation and debugging.</p></>},
        {label: 'Investigation today', title: 'How I would investigate this today.', summary: 'A diagnostic approach to this class of multi-stream problem:', body: <ol><li><strong>Trace each input through the pipeline.</strong> Correlate camera and session IDs with timestamps at capture, AI response and rendering to locate where progress stops.</li><li><strong>Inspect queue growth and processing cost.</strong> Check whether decoding, analysis or rendering falls behind incoming data. Bound preview-frame queues while preserving scored results.</li><li><strong>Reproduce state transitions.</strong> Exercise start, pause, end and restart paths, checking that subscriptions and camera resources are released and one stalled source cannot block the others.</li></ol>},
      ]} />
    </CaseChapter>
    <CaseChapter id="sports-migration" kicker="04 / MODERNIZING THE FRONTEND" title="A new frontend. A very live environment.">
      <div className="case-two-column"><div className={styles.migrationCopy}><p>I migrated existing jQuery code to React in a system where camera input, scoring updates and visual feedback all meet on one screen.</p><p>The work covered the training and examination interfaces alongside Canvas operations, video transmission, WebSocket updates and audio-visual synchronization.</p><div className={styles.migrationRoute}><span>jQuery</span><span aria-hidden="true">→</span><strong>React</strong></div></div>
        <div className={styles.technicalNotes}><article><span>01</span><div><h3>A component-based interface</h3><p>Moving the existing training and examination UI into React, with camera, assessment and feedback integrations forming part of the frontend work.</p></div></article><article><span>02</span><div><h3>Several people, individual results</h3><p>Supporting simultaneous training and examinations, with recognition data connecting each participant to their own scores and feedback.</p></div></article><article><span>03</span><div><h3>Feedback you can see and hear</h3><p>Bringing Canvas presentation, real-time scoring and synchronized audio-visual feedback together, including spoken results after a session.</p></div></article></div>
      </div>
    </CaseChapter>
    <CaseChapter id="sports-usage" kicker="05 / WHERE IT IS USED" title="Built for actual school days." description="Regional examination use alongside everyday training and PE classes in China."><div className={styles.usageGrid}>{contexts.map(context => <article key={context.number}><span>{context.number}</span><h3>{context.title}</h3><p>{context.text}</p></article>)}</div></CaseChapter>
    <Link href="/projects/running-mini-program" className={styles.related}><div><span className={styles.kicker}>ALSO AT DANZHU</span><h2>Training on a smaller screen.</h2><p>The student mini-program and teacher dashboard: camera-based exercises, weak-network saving and score reporting.</p></div><span aria-hidden="true">↗</span></Link>
    <nav className={styles.next} aria-label="Case study navigation"><Link href="/#work">← All projects</Link><Link href={`/projects/${next.slug}`}><span>UP NEXT</span>{next.title} ↗</Link></nav>
  </main><Footer /></div>;
}
