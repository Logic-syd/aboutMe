import type { Metadata, Viewport } from 'next';
import { Figtree, Silkscreen } from 'next/font/google';
import './globals.css';
import './project-case.css';
import './auvers-theme.css';
import { RouteScroll } from '@/components/route-scroll';
import { profileDescription, siteUrl } from '@/lib/profile';

const figtree = Figtree({ subsets: ['latin'], display: 'swap', variable: '--font-figtree' });
const silkscreen = Silkscreen({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-silkscreen' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Yidan Shao — Senior Frontend Engineer in Munich', template: '%s | Yidan Shao' },
  description: profileDescription,
  alternates: { canonical: '/' },
  openGraph: { title: 'Yidan Shao — Senior Frontend Engineer in Munich', description: profileDescription, url: '/', siteName: 'Yidan Shao', type: 'website', locale: 'en_US' },
  twitter: { card: 'summary', title: 'Yidan Shao — Senior Frontend Engineer in Munich', description: profileDescription },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: '#f6eeeb' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${figtree.variable} ${silkscreen.variable}`}><body><RouteScroll /><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
