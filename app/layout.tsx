import type { Metadata, Viewport } from 'next';
import './globals.css';
import { RouteScroll } from '@/components/route-scroll';

export const metadata: Metadata = {
  title: { default: 'Yidan Shao — Senior Frontend Engineer', template: '%s | Yidan Shao' },
  description: 'Senior Frontend Engineer in Munich with 7+ years of experience in React, TypeScript and Vue. Selected work in energy, data workflows and web and mobile products. Open to relocate.',
  openGraph: { title: 'Yidan Shao — Senior Frontend Engineer', description: 'Thoughtful interfaces. Reliable delivery. Explore six frontend project case studies.', type: 'website', locale: 'en_US' },
  twitter: { card: 'summary', title: 'Yidan Shao — Senior Frontend Engineer' },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: '#faf9f6' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><RouteScroll /><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
