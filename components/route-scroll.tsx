'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function RouteScroll() {
  const pathname = usePathname();
  useEffect(() => {
    // Open each case at its title; preserve homepage links to named sections.
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}
