import Link from 'next/link';
import { SectionNavigation } from '@/components/section-navigation';

export function Header({ detail = false, sidebar = false }: { detail?: boolean; sidebar?: boolean }) {
  return <header className={`site-header shell craft-header ${sidebar ? 'sidebar-header' : ''}`}>
    <Link className="wordmark" href="/" aria-label="Yidan Shao home">ys<span>.</span></Link>
    <nav aria-label="Main navigation">
      <SectionNavigation detail={detail} sidebar={sidebar} />
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
