'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Run in the initial HTML, before native restoration and the catalog's hash
// handlers. A homepage reload starts over; explicit section links on a new
// navigation and project-detail chapter links keep their normal behavior.
const resetHomepageOnReload = `(() => {
  const navigation = performance.getEntriesByType('navigation')[0];
  if (location.pathname !== '/' || navigation?.type !== 'reload') return;
  const restoration = history.scrollRestoration;
  history.scrollRestoration = 'manual';
  if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  window.addEventListener('pageshow', () => {
    if (location.pathname === '/' && !location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    history.scrollRestoration = restoration;
  }, { once: true });
})();`;

export function RouteScroll() {
  const pathname = usePathname();
  useEffect(() => {
    // Open each case at its title; preserve homepage links to named sections.
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return <script dangerouslySetInnerHTML={{ __html: resetHomepageOnReload }} />;
}
