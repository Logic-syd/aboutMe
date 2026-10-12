import Image from 'next/image';
import { CaseChapter } from '@/components/case-chapter';
import { CaseNotes } from '@/components/case-notes';

export function RunningShowcase() {
  return <CaseChapter id="running-product" kicker="PRODUCT SNAPSHOT / VUE + UNI-APP" title="A running session, on mobile." layout="media">
    <div className="case-running-view">
      <CaseNotes horizontal label="Running product context and sharing notes" notes={[
        { label: 'Product context', title: 'Student training, teacher reporting.', body: <><p>I contributed to a sports mini-program built with Vue and uni-app, supporting student running and camera-based free training, with a teacher dashboard for reviewing results and exporting reports. This selected screen from the running mode shows an activity timer, progress, running metrics and in-session controls.</p><a className="text-link" href="http://www.danzle.com/web/index.html" target="_blank" rel="noopener noreferrer">Visit Danzhu’s official website ↗</a><p className="case-illustration-note">Company website · For product context</p></> },
        { label: 'Sharing notes', title: 'What I can show.', body: <><p>The full screen also includes a route map and checkpoints. Personal identifiers and location details are redacted; the preview focuses on the activity controls.</p><p>Many of the commercial interfaces I worked on are not suitable for public display. This selected screenshot complements the written case study; the remaining work is described through my responsibilities and technical approach.</p></> },
      ]} />
      <figure className="case-running-figure"><a href="/images/danzhu-running-redacted.png" target="_blank" rel="noopener noreferrer" aria-label="Open the full privacy-redacted running mini-program screenshot in a new tab"><div className="running-image-window"><Image src="/images/danzhu-running-redacted.png" alt="Privacy-redacted running mini-program screen showing a session timer, activity metrics, a lock control and an end-session control. The portrait, title and map are concealed." width={853} height={1844} sizes="(max-width: 800px) 80vw, 380px" /></div><span className="case-image-action">View full redacted screenshot ↗</span></a><figcaption>Running mini-program · Vue / uni-app<br />Selected activity controls · AI-assisted privacy redaction.</figcaption></figure>
    </div>
  </CaseChapter>;
}
