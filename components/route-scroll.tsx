'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { clearHomeReturn, homeEntryKey, markHomeReturn, returningHomeView, saveHomeView } from '@/lib/home-view';

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
  const previousPath = useRef(pathname);
  useEffect(() => {
    const onHistory = (event: PopStateEvent) => {
      if (window.location.pathname === '/' && previousPath.current !== '/') markHomeReturn(event.state);
      else clearHomeReturn();
    };
    const onLink = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest('a');
      if (anchor && anchor.target !== '_blank') {
        const key = homeEntryKey();
        if (key) saveHomeView(key, { x: window.scrollX, y: window.scrollY });
        clearHomeReturn();
      }
    };
    window.addEventListener('popstate', onHistory);
    document.addEventListener('click', onLink, true);
    return () => { window.removeEventListener('popstate', onHistory); document.removeEventListener('click', onLink, true); };
  }, []);
  useLayoutEffect(() => {
    previousPath.current = pathname;
    if (pathname !== '/') {
      window.dispatchEvent(new Event('portfolio:leave-home'));
      if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }
    const restored = returningHomeView();
    const key = homeEntryKey();
    let frame = 0;
    const restore = () => { if (restored) window.scrollTo({ top: restored.y, left: restored.x, behavior: 'instant' }); };
    if (restored) { restore(); frame = requestAnimationFrame(restore); }
    else if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const record = () => {
      if (key && window.location.pathname === '/') saveHomeView(key, { x: window.scrollX, y: window.scrollY });
    };
    window.addEventListener('scroll', record, { passive: true });
    // A direct section link may have scrolled before hydration installed this
    // listener. Preserve that starting position even if the user never scrolls.
    record();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', record); };
  }, [pathname]);
  return <script dangerouslySetInnerHTML={{ __html: resetHomepageOnReload }} />;
}
