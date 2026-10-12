'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { PersonalPhoto } from '@/lib/about';

export function PhotoViewer({ photo, className = '' }: { photo: PersonalPhoto; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const captionId = useId();
  const previousOverflow = useRef<string | null>(null);
  const restoreScroll = useCallback(() => {
    if (previousOverflow.current === null) return;
    document.body.style.overflow = previousOverflow.current;
    previousOverflow.current = null;
  }, []);
  useEffect(() => restoreScroll, [restoreScroll]);
  function openPhoto() {
    if (!dialog.current || dialog.current.open) return;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current.showModal();
    setOpen(true);
  }
  function finishClosing() { restoreScroll(); setOpen(false); }
  function closePhoto() { dialog.current?.close(); finishClosing(); }
  return <figure className={`personal-photo ${className}`}>
    <button className="personal-photo-trigger" aria-label={`Open photo: ${photo.caption}`} aria-haspopup="dialog" onClick={openPhoto}>
      <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 800px) 75vw, 300px" style={{ objectFit: photo.fit ?? 'cover', objectPosition: photo.position ?? '50% 50%' }} />
      <span className="personal-photo-open" aria-hidden="true">↗</span>
    </button>
    <figcaption>{photo.shortCaption ?? photo.caption}</figcaption>
    <dialog ref={dialog} className="personal-photo-dialog" aria-labelledby={captionId} onClose={finishClosing} onCancel={finishClosing} onClick={event => { if (event.target === event.currentTarget) closePhoto(); }}>
      <button className="personal-photo-close" aria-label="Close photo" onClick={closePhoto}>×</button>
      {open && <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="92vw" />}
      <p id={captionId}>{photo.caption}</p>
    </dialog>
  </figure>;
}
