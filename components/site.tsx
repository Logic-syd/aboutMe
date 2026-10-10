import Link from 'next/link';

export function Header({ detail = false }: { detail?: boolean }) {
  return <header className="site-header shell craft-header">
    <Link className="wordmark" href="/" aria-label="Yidan Shao home">ys<span>.</span></Link>
    <nav aria-label="Main navigation">
      <div className="nav-sections">
        <a href={detail ? '/#about' : '#about'}>About Me</a>
        <a href={detail ? '/#work' : '#work'}>My Projects</a>
        <a href={detail ? '/#professional-work' : '#professional-work'}>My Work</a>
        <a href={detail ? '/#experience' : '#experience'}>Growth Map</a>
      </div>
      <a className="nav-contact" href={detail ? '/#contact' : '#contact'}>Let’s talk <span aria-hidden="true">↗</span></a>
    </nav>
  </header>;
}
export function Footer({ pixel = false }: { pixel?: boolean } = {}) {
  return <footer className="shell footer"><Link className="wordmark" href="/">ys<span>.</span></Link><p>{pixel ? 'A little world by Yidan Shao.' : 'Built with Next.js, Three.js & Leaflet.'}</p><a href="#top">Back to top ↑</a></footer>;
}
export function Contact() {
  return <section id="contact" className="contact-section">
    <div className="shell contact-inner">
      <div><p className="eyebrow">05 / GET IN TOUCH</p><h2>Let’s build something<br /><em>that matters.</em></h2><p>Open to frontend and full-stack engineering opportunities.<br />Based in Munich. Open to relocate. Ready for new challenges.</p></div>
      <div className="contact-links"><a className="email-link" href="mailto:yidanshao622@gmail.com">yidanshao622@gmail.com <span aria-hidden="true">↗</span></a><div className="social-links"><a href="https://github.com/Logic-syd">GitHub ↗</a><a href="https://linkedin.com/in/yidanshao/">LinkedIn ↗</a></div></div>
    </div>
  </section>;
}
