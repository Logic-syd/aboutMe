import localFont from 'next/font/local';

// Official Google Fonts sources, bundled locally with their OFL licenses.
export const newsreader = localFont({
  src: './fonts/newsreader.woff2',
  variable: '--font-newsreader',
  weight: '200 800',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
});

export const figtree = localFont({
  src: './fonts/figtree.woff2',
  variable: '--font-figtree',
  weight: '300 900',
  display: 'swap',
});

export const silkscreen = localFont({
  src: './fonts/silkscreen.woff2',
  variable: '--font-silkscreen',
  weight: '400',
  display: 'swap',
});
