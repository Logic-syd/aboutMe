import Link from 'next/link';
import { SectionNavigation } from '@/components/section-navigation';

export function Header({ detail = false, sidebar = false }: { detail?: boolean; sidebar?: boolean }) {
  return <><header className={`site-header shell craft-header ${sidebar ? 'floating-navigation-header' : ''}`}>
    <Link className="wordmark" href="/" aria-label="Yidan Shao home">ys<span>.</span></Link>
    <div className="header-connect"><p>Happy to connect.</p><div className="header-profile-links"><a href="https://linkedin.com/in/yidanshao/">LinkedIn <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg></a><a href="https://github.com/Logic-syd">GitHub <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg></a></div></div>
    <nav aria-label="Main navigation">
      <SectionNavigation detail={detail} sidebar={sidebar} />
    </nav>
  </header>
    {detail && <Link className="case-home-link" href="/" aria-label="Back to home">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m3 10 9-7 9 7M5 9v11h5v-6h4v6h5V9" /></svg>
      <span aria-hidden="true">Back home</span>
    </Link>}
  </>;
}
export function Footer({ pixel = false }: { pixel?: boolean } = {}) {
  return <footer className="shell footer"><Link className="wordmark" href="/">ys<span>.</span></Link><p>{pixel ? 'A little world by Yidan Shao.' : 'Built with Next.js, Three.js & Leaflet.'}</p><a href="#top">Back to top ↑</a></footer>;
}
export function Contact() {
  return <section id="contact" className="contact-section">
    <div className="shell contact-inner">
      <div><h2>Thanks for stopping by.</h2><p>Get in touch — let’s build things that make the world a little better.</p></div>
      <a className="email-link" href="mailto:yidanshao622@gmail.com">yidanshao622@gmail.com <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg></a>
    </div>
  </section>;
}
