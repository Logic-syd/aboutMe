import Image from 'next/image';

export function RunningShowcase() {
  return <section className="running-showcase" aria-labelledby="running-title">
    <div className="running-copy">
      <p className="eyebrow">PRODUCT SNAPSHOT / VUE + UNI-APP</p>
      <h2 id="running-title">A running session, on mobile.</h2>
      <p>I contributed to a running mini-program built with Vue and uni-app. This selected screen shows an activity timer, progress, running metrics and in-session controls.</p>
      <p>The full screen also includes a route map and checkpoints. Personal identifiers and location details are redacted; the preview focuses on the activity controls.</p>
      <div className="sharing-note"><h3>What I can show</h3><p>Many of the commercial interfaces I worked on are not suitable for public display. This selected screenshot complements the written case study; the remaining work is described through my responsibilities and technical approach.</p></div>
      <a className="text-link" href="http://www.danzle.com/web/index.html" target="_blank" rel="noopener noreferrer">Visit Danzhu’s official website <span aria-hidden="true">↗</span></a>
      <p className="website-context">Company website · For product context</p>
    </div>
    <figure className="running-figure">
      <a href="/images/danzhu-running-redacted.png" target="_blank" rel="noopener noreferrer" aria-label="Open the full privacy-redacted running mini-program screenshot in a new tab">
        <div className="running-image-window"><Image src="/images/danzhu-running-redacted.png" alt="Privacy-redacted running mini-program screen showing a session timer, activity metrics, a lock control and an end-session control. The portrait, title and map are concealed." width={853} height={1844} sizes="(max-width: 650px) 85vw, 320px" /></div>
        <span className="screenshot-expand">View full redacted screenshot ↗</span>
      </a>
      <figcaption>Running mini-program · Vue / uni-app<br />Selected screen · AI-assisted privacy redaction.</figcaption>
    </figure>
  </section>;
}
