'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function DetailBackLink() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const header = document.querySelector('.site-header');
    if (!header) return;

    // Follow the actual header height on desktop and mobile, including deep links.
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.boundingClientRect.bottom <= 0);
    });
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return <Link className="case-home-link" href="/" aria-label="Back to home">
    <span className="case-back-mark" aria-hidden="true" />
  </Link>;
}
