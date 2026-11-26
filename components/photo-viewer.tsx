'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { PersonalPhoto } from '@/lib/about';
import { displayImage } from '@/lib/image-assets';

export function PhotoViewer({ photo, className = '', sizes = '300px' }: { photo: PersonalPhoto; className?: string; sizes?: string }) {
  const crop = photo.previewCrop;
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
    <button className="personal-photo-trigger" aria-label={`Open photo: ${photo.caption}`} aria-haspopup="dialog" onClick={openPhoto} style={crop ? { aspectRatio: `${crop.width} / ${crop.height}`, height: 'auto' } : undefined}>
      <Image src={displayImage(photo.src)} alt={photo.alt} width={photo.width} height={photo.height} sizes={`auto, ${sizes}`} style={crop ? {
        position: 'absolute', maxWidth: 'none', objectFit: 'fill',
        width: `${photo.width / crop.width * 100}%`, height: `${photo.height / crop.height * 100}%`,
        left: `${-crop.x / crop.width * 100}%`, top: `${-crop.y / crop.height * 100}%`,
      } : { objectFit: photo.fit ?? 'cover', objectPosition: photo.position ?? '50% 50%' }} />
      <span className="personal-photo-open" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg></span>
    </button>
    <figcaption>{photo.shortCaption ?? photo.caption}</figcaption>
    <dialog ref={dialog} className="personal-photo-dialog" aria-labelledby={captionId} onClose={finishClosing} onCancel={finishClosing} onClick={event => { if (event.target === event.currentTarget) closePhoto(); }}>
      <button className="personal-photo-close" aria-label="Close photo" onClick={closePhoto}>×</button>
      {open && <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="auto, (max-width: 800px) calc(100vw - 42px), (max-width: 1040px) calc(94vw - 34px), 946px" />}
      <p id={captionId}>{photo.caption}</p>
    </dialog>
  </figure>;
}
