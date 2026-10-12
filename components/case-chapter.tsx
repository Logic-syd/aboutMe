import type { ReactNode } from 'react';

export function CaseIntro({ children }: { children: ReactNode }) {
  return <section className="case-intro-screen" data-case-screen="intro">{children}</section>;
}

export function CaseChapter({ id, kicker, title, description, children, className = '', layout = 'content' }: {
  id?: string; kicker: string; title: string; description?: string; children: ReactNode; className?: string; layout?: 'content' | 'media' | 'demo';
}) {
  const headingId = id ? `${id}-title` : undefined;
  return <section id={id} className={`case-screen ${className}`} data-case-screen="chapter" data-case-layout={layout} aria-labelledby={headingId}>
    <div className="case-screen-heading"><div><p className="eyebrow">{kicker}</p><h2 id={headingId}>{title}</h2></div>{description && <p>{description}</p>}</div>
    <div className="case-screen-body">{children}</div>
  </section>;
}
