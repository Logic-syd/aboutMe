'use client';

import { useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export type CaseNote = { label: string; title: string; summary?: string; body: ReactNode };

export function CaseNotes({ notes, label, horizontal = false }: { notes: CaseNote[]; label: string; horizontal?: boolean }) {
  const [selected, setSelected] = useState(0);
  const prefix = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  if (!notes.length) return null;
  const active = Math.min(selected, notes.length - 1);
  return <div className={`case-notes ${horizontal ? 'is-horizontal' : ''}`} style={{ '--case-topic-columns': notes.length === 4 ? 2 : Math.min(3, notes.length) } as CSSProperties}>
    <div className="case-note-tabs" role="tablist" aria-label={label} aria-orientation="horizontal" onKeyDown={event => {
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? notes.length - 1 : ['ArrowDown', 'ArrowRight'].includes(event.key) ? (active + 1) % notes.length : ['ArrowUp', 'ArrowLeft'].includes(event.key) ? (active + notes.length - 1) % notes.length : null;
      if (next === null) return;
      event.preventDefault(); setSelected(next); buttons.current[next]?.focus();
    }}>
      {notes.map((item, index) => <button ref={element => { buttons.current[index] = element; }} key={item.label} id={`${prefix}-tab-${index}`} type="button" role="tab" aria-selected={index === active} aria-controls={`${prefix}-panel-${index}`} tabIndex={index === active ? 0 : -1} onClick={() => setSelected(index)}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><strong>{item.label}</strong></button>)}
    </div>
    <div className="case-note-panels">{notes.map((note, index) => <div className="case-note-panel" key={note.label} id={`${prefix}-panel-${index}`} role="tabpanel" aria-labelledby={`${prefix}-tab-${index}`} aria-hidden={index !== active} inert={index !== active} tabIndex={index === active ? 0 : -1}><div className="case-note-copy"><h3>{note.title}</h3>{note.summary && <p className="case-note-summary">{note.summary}</p>}<div className="case-note-detail">{note.body}</div></div></div>)}</div>
  </div>;
}
