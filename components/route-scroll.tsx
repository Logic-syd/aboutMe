'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Run in the initial HTML, before native restoration and the catalog's hash
// handlers. A homepage reload starts over; explicit section links on a new
// navigation and project-detail chapter links keep their normal behavior.
const resetHomepageOnReload = `(() => {
  const navigation = performance.getEntriesByType('navigation')[0];
  if (location.pathname !== '/') return;
  const restoration = history.scrollRestoration;
  // Arm this on the first visit too: a browser can decide how to restore the
  // outgoing entry before the reloaded document gets to execute its script.
  history.scrollRestoration = 'manual';
  if (navigation?.type === 'reload') {
    if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    window.addEventListener('pageshow', () => {
      if (location.pathname === '/' && !location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, { once: true });
  }
  // Native restoration can run after pageshow, even after hydration. Resume it
  // only for deliberate section/route navigation. A pagehide reset would
  // re-enable the restoration that a reload is meant to avoid.
  const resumeRestoration = () => {
    history.scrollRestoration = restoration;
    window.removeEventListener('hashchange', resumeRestoration);
    window.removeEventListener('portfolio:leave-home', resumeRestoration);
  };
  window.addEventListener('hashchange', resumeRestoration);
  window.addEventListener('portfolio:leave-home', resumeRestoration);
})();`;

export function RouteScroll() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== '/') window.dispatchEvent(new Event('portfolio:leave-home'));
    // Open each case at its title; preserve homepage links to named sections.
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return <script dangerouslySetInnerHTML={{ __html: resetHomepageOnReload }} />;
}
