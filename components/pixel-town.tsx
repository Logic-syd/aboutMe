'use client';

import { useCallback, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { coreTechnologies } from '@/lib/profile';
import styles from './pixel-town.module.css';

type PlaceId = 'studio' | 'cafe' | 'cabin' | 'bottles' | 'station' | 'post';
const places: { id: PlaceId; name: string; tab: string; x: number; y: number; color: string; roof: string; title: string; slugs: string[]; href: string; action: string }[] = [
  { id: 'studio', name: 'The studio', tab: 'Work', x: 21, y: 11, color: '#e7ddc8', roof: '#99958e', title: 'Commercial projects.', slugs: ['renewable-energy-api', 'isolarcloud', 'ronghe-pay', 'sports-education'], href: '#work-projects', action: 'More projects' },
  { id: 'cafe', name: 'Coffee corner', tab: 'Coffee', x: 49, y: 19, color: '#eedbd6', roof: '#b28a98', title: 'Coffee & craft beer map.', slugs: ['discovery-map'], href: '/projects/discovery-map', action: 'View project' },
  { id: 'cabin', name: 'Mountain hut', tab: 'Chess', x: 77, y: 25, color: '#dccfb5', roof: '#81968a', title: 'Mountain Chess.', slugs: ['mountain-chess'], href: '/projects/mountain-chess', action: 'View project' },
  { id: 'station', name: 'The station', tab: 'Train', x: 21, y: 62, color: '#e2e1d3', roof: '#93a9af', title: 'Catch That Train!', slugs: ['catch-that-train'], href: '/projects/catch-that-train', action: 'View project' },
  { id: 'bottles', name: 'Bottle shop', tab: 'Pfand', x: 49, y: 67, color: '#dae5d8', roof: '#84a69a', title: 'Pfand Pause.', slugs: ['pfand-pause'], href: '/projects/pfand-pause', action: 'View project' },
  { id: 'post', name: 'The post office', tab: 'Contact', x: 77, y: 62, color: '#e7ddcc', roof: '#b09c87', title: 'Up for a coffee chat?', slugs: [], href: 'https://linkedin.com/in/yidanshao/', action: 'Let’s connect on LinkedIn' },
];

function Building({ place }: { place: typeof places[number] }) {
  return <svg viewBox="0 0 144 124" aria-hidden="true" shapeRendering="crispEdges">
    <rect x="14" y="109" width="122" height="8" fill="#65736a" opacity=".14" />
    <rect x="26" y="43" width="96" height="68" fill={place.color} /><rect x="26" y="102" width="96" height="9" fill="#b6a89b" />
    <path d="M18 48V36H30V26H42V16H106V26H118V36H130V48Z" fill={place.roof} /><rect x="26" y="44" width="96" height="6" fill="#514e56" opacity=".18" />
    <rect x="94" y="4" width="12" height="24" fill="#c3b4a6" /><rect x="91" y="4" width="18" height="6" fill="#ad9a8e" />
    <rect x="38" y="60" width="22" height="24" fill="#a6bec5" /><path d="M48 60V84M38 72H60" stroke="#f4ead9" strokeWidth="4" /><rect x="90" y="60" width="20" height="24" fill="#a6bec5" /><path d="M100 60V84M90 72H110" stroke="#f4ead9" strokeWidth="4" />
    <rect x="66" y="72" width="18" height="39" fill="#857a73" /><rect x="70" y="77" width="10" height="19" fill="#c7d6cd" /><rect x="78" y="99" width="3" height="3" fill="#eee1bf" />
    {place.id === 'studio' && <g>
      <rect x="42" y="26" width="5" height="10" fill="#786b79" /><rect x="95" y="26" width="5" height="10" fill="#786b79" />
      <rect x="30" y="6" width="85" height="24" fill="#786b79" /><rect x="33" y="9" width="79" height="18" fill="#f8f3e6" />
      <path d="M40 16H57V25H40ZM45 12H52V16H49V14H48V16H45Z" fill="#687a61" />
      <path d="M40 20H57M48 19V22" stroke="#f8f3e6" strokeWidth="1" />
      <text x="62" y="23" fill="#596b52" fontFamily="monospace" fontSize="13" fontWeight="700" letterSpacing="1">WORK</text>
      <rect x="48" y="36" width="48" height="6" fill="#bac4ad" />
    </g>}
    {place.id === 'cafe' && <><path d="M30 52H118V63H30Z" fill="#f3e7d6" /><path d="M30 52H42V63H30ZM54 52H66V63H54ZM78 52H90V63H78ZM102 52H114V63H102Z" fill="#b88796" /><rect x="48" y="26" width="30" height="12" fill="#f6ece0" /><path d="M78 28H87V35H78" fill="none" stroke="#f6ece0" strokeWidth="4" /></>}
    {place.id === 'cabin' && <><path d="M35 52H112M35 91H112" stroke="#b89c83" strokeWidth="4" /><rect x="44" y="26" width="50" height="10" fill="#c8d3c8" /><path d="M50 34L60 24L70 34L79 23L91 34" fill="#798d83" /></>}
    {place.id === 'station' && <><rect x="55" y="21" width="33" height="25" fill="#f5eddf" /><rect x="69" y="25" width="4" height="10" fill="#7e8f93" /><rect x="71" y="32" width="9" height="4" fill="#7e8f93" /><rect x="5" y="93" width="23" height="17" fill="#ac9eae" /><rect x="9" y="96" width="8" height="7" fill="#d9e6e4" /></>}
    {place.id === 'bottles' && <><rect x="47" y="28" width="52" height="15" fill="#e8eee1" />{[0,1,2].map(i => <g key={i} fill={['#91b3a2','#b1a2bc','#c9af8b'][i]}><rect x={55+i*13} y="31" width="4" height="3" /><rect x={53+i*13} y="34" width="8" height="7" /></g>)}<rect x="104" y="94" width="30" height="18" fill="#a9bdac" /><path d="M108 99H130M108 105H130" stroke="#789681" strokeWidth="2" /></>}
    {place.id === 'post' && <><rect x="48" y="26" width="46" height="16" fill="#f0e5d5" /><path d="M51 28L71 38L91 28" fill="none" stroke="#ad9279" strokeWidth="3" /><rect x="111" y="85" width="15" height="21" fill="#b59a7b" /><rect x="110" y="82" width="17" height="6" fill="#967d64" /><rect x="116" y="105" width="5" height="13" fill="#847f77" /></>}
  </svg>;
}

function Tree({ x, y, small = false }: { x: number; y: number; small?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${small ? .65 : 1})`}><rect x="17" y="35" width="8" height="21" fill="#a3947d" /><path d="M8 8H32V16H40V38H32V46H8V38H0V16H8Z" fill="#9cb59f" /><path d="M8 8H26V16H32V27H8Z" fill="#b4c8ac" /><rect x="7" y="36" width="23" height="7" fill="#8aa58e" /></g>;
}

function PreviewArrow() {
  return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18 18 6M6 6h12v12" /></svg>;
}

export function PixelTown() {
  const [selected, setSelected] = useState<PlaceId>('studio');
  const [motion, setMotion] = useState(true);
  const place = places.find(item => item.id === selected)!;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewAsSheet, setPreviewAsSheet] = useState(false);
  const [activation, setActivation] = useState(0);
  const previewId = useId();
  const preview = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const townFrame = useRef<HTMLDivElement>(null);
  const closePreview = useCallback((restoreFocus = true) => {
    sheet.current?.close();
    setPreviewOpen(false);
    if (restoreFocus) trigger.current?.focus({ preventScroll: true });
  }, []);
  const choosePlace = (id: PlaceId, button: HTMLButtonElement) => {
    trigger.current = button;
    setSelected(id);
    setPreviewAsSheet(window.matchMedia('(max-width: 800px)').matches);
    setActivation(value => value + 1);
    setPreviewOpen(true);
  };
  useLayoutEffect(() => {
    if (!previewOpen) return;
    const compactViewport = window.matchMedia('(max-width: 800px)');
    const updateMode = () => setPreviewAsSheet(compactViewport.matches);
    compactViewport.addEventListener('change', updateMode);
    return () => compactViewport.removeEventListener('change', updateMode);
  }, [previewOpen]);
  useLayoutEffect(() => {
    if (!previewOpen || !preview.current || !trigger.current) return;
    const card = preview.current;
    const dialog = sheet.current;
    const previousOverflow = document.body.style.overflow;
    if (previewAsSheet && dialog) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }
    const position = () => {
      if (!trigger.current) return;
      const anchor = trigger.current.getBoundingClientRect();
      const bounds = townFrame.current?.getBoundingClientRect();
      const viewport = window.visualViewport;
      const viewportLeft = viewport?.offsetLeft ?? 0, viewportTop = viewport?.offsetTop ?? 0;
      const viewportWidth = viewport?.width ?? window.innerWidth, viewportHeight = viewport?.height ?? window.innerHeight;
      if (previewAsSheet && dialog) {
        const width = Math.min(520, viewportWidth);
        dialog.style.width = `${width}px`;
        card.style.maxHeight = `${Math.max(0, viewportHeight - 12)}px`;
        dialog.style.left = `${viewportLeft + (viewportWidth - width) / 2}px`;
        dialog.style.top = `${viewportTop + viewportHeight - card.offsetHeight}px`;
        card.style.visibility = 'visible';
        return;
      }
      // Both buildings and the bottom tabs belong to this frame. Limit the
      // preview to the visible town, so it cannot cover the next chapter.
      const minX = Math.max(viewportLeft + 12, (bounds?.left ?? viewportLeft) + 12);
      const minY = Math.max(viewportTop + 12, (bounds?.top ?? viewportTop) + 12);
      const right = Math.min(viewportLeft + viewportWidth - 12, (bounds?.right ?? viewportLeft + viewportWidth) - 12);
      const bottom = Math.min(viewportTop + viewportHeight - 12, (bounds?.bottom ?? viewportTop + viewportHeight) - 12);
      if (anchor.bottom < viewportTop || anchor.top > viewportTop + viewportHeight) {
        closePreview(false);
        return;
      }
      // A partially visible town can be too small for a useful anchored card.
      // The same accessible sheet is a readable fallback, without clipping it.
      if (right - minX < 240 || bottom - minY < 220) {
        setPreviewAsSheet(true);
        return;
      }
      card.style.maxWidth = `${right - minX}px`;
      card.style.maxHeight = `${bottom - minY}px`;
      const width = card.offsetWidth, height = card.offsetHeight;
      const maxX = Math.max(minX, right - width);
      const maxY = Math.max(minY, bottom - height);
      const isMapTrigger = trigger.current.dataset.mapBuilding === 'true';
      let x = anchor.left + anchor.width / 2 - width / 2;
      let y = anchor.top - height - 12;
      if (isMapTrigger) {
        // Prefer the inner side of the town, so the selected building stays visible.
        const leftHalf = bounds ? anchor.left + anchor.width / 2 < bounds.left + bounds.width / 2 : anchor.left < viewportWidth / 2;
        x = leftHalf ? anchor.right + 14 : anchor.left - width - 14;
        y = anchor.top + anchor.height / 2 - height / 2;
      }
      card.style.left = `${Math.max(minX, Math.min(maxX, x))}px`;
      card.style.top = `${Math.max(minY, Math.min(maxY, y))}px`;
      card.style.visibility = 'visible';
    };
    position();
    card.focus({ preventScroll: true });
    const resize = new ResizeObserver(position);
    resize.observe(card);
    window.addEventListener('resize', position);
    window.addEventListener('scroll', position, true);
    window.visualViewport?.addEventListener('resize', position);
    window.visualViewport?.addEventListener('scroll', position);
    const outside = (event: PointerEvent) => {
      const target = event.target;
      if (previewAsSheet) return;
      if (target instanceof Element && !card.contains(target) && !target.closest('[data-town-trigger]')) closePreview(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closePreview(); }
      if (event.key !== 'Tab' || !card.contains(document.activeElement)) return;
      const stops = Array.from(card.querySelectorAll<HTMLElement>('button, a[href]'));
      if (previewAsSheet) {
        if (event.shiftKey && (document.activeElement === card || document.activeElement === stops[0])) {
          event.preventDefault(); stops.at(-1)?.focus();
        } else if (!event.shiftKey && document.activeElement === stops.at(-1)) {
          event.preventDefault(); stops[0]?.focus();
        }
        return;
      }
      if (event.shiftKey && (document.activeElement === card || document.activeElement === stops[0])) {
        event.preventDefault(); closePreview();
      } else if (!event.shiftKey && document.activeElement === stops.at(-1)) {
        event.preventDefault();
        const locations = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-town-trigger]'));
        const next = locations[locations.indexOf(trigger.current!) + 1] ?? trigger.current;
        closePreview(false);
        next?.focus({ preventScroll: true });
      }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      if (dialog) {
        dialog.close();
        document.body.style.overflow = previousOverflow;
      }
      resize.disconnect();
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position, true);
      window.visualViewport?.removeEventListener('resize', position);
      window.visualViewport?.removeEventListener('scroll', position);
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [previewOpen, previewAsSheet, selected, activation, closePreview]);
  const previewContent = <div ref={preview} id={previewId} role={previewAsSheet ? undefined : 'region'} aria-labelledby={`${previewId}-title`} tabIndex={-1} className={`${styles.preview} ${place.id === 'studio' ? styles.commercialPreview : ''}`}>
    <div className={styles.previewBar}><p>{place.name}</p><button type="button" className={styles.previewClose} onClick={() => closePreview()} aria-label="Close preview">×</button></div>
    <h2 id={`${previewId}-title`}>{place.title}</h2>
    <div className={styles.previewLinks}>
      {place.slugs.filter(slug => slug !== place.href.replace('/projects/','')).map(slug => <Link key={slug} href={`/projects/${slug}`} onClick={() => closePreview(false)}>{projects.find(project => project.slug === slug)?.graphTitle}<PreviewArrow /></Link>)}
      <a className={styles.previewPrimary} href={place.href} onClick={() => closePreview(false)}>{place.action}<PreviewArrow /></a>
    </div>
  </div>;
  return <section className={styles.townSection} aria-labelledby="town-title">
    <div className={styles.intro}>
      <p className={styles.kicker}><span aria-hidden="true" />Munich, Germany <span className={styles.relocation}>· Open to relocate</span></p>
      <h1 id="town-title">Yidan Shao<span>.</span></h1>
      <p className={styles.role}>Senior Frontend Engineer</p>
      <p className={styles.bio}>I’ve built frontends for large-scale, high-traffic systems. I also build full-stack personal projects, with a focus on AI applications.</p>
      <div className={styles.facts} aria-label="Experience at a glance"><div><strong>7+</strong><span>years in frontend</span></div><div><strong>{projects.length}</strong><span>project case studies</span></div></div>
      <ul className={styles.skills} aria-label="Core technologies">{coreTechnologies.map(skill => <li key={skill}>{skill}</li>)}</ul>
      <div className={styles.skillContext}><p>Finance · Insurance · Energy · Education</p><a className={styles.skillsLink} href="#skills">All skills <span aria-hidden="true">↓</span></a></div>
      <div className={styles.actions}><a href="#work">View projects <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></a></div>
    </div>
    <div ref={townFrame} className={styles.gameWindow} data-town-frame>
      <div className={styles.windowBar}><span><i aria-hidden="true" />Explore my town</span><button onClick={() => setMotion(value => !value)} aria-pressed={!motion} aria-label={motion ? 'Pause motion' : 'Resume motion'}><svg aria-hidden="true" viewBox="0 0 16 16">{motion ? <path d="M4 3h3v10H4zM10 3h3v10h-3z" /> : <path d="m5 3 8 5-8 5z" />}</svg>{motion ? 'Pause' : 'Resume'}</button></div>
      <div className={`${styles.map} ${motion ? '' : styles.paused}`} aria-describedby={`${previewId}-hint`}>
        <svg viewBox="0 0 1000 620" className={styles.landscape} aria-hidden="true" shapeRendering="crispEdges">
          <defs><linearGradient id={`${previewId}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bfd9e1" /><stop offset="1" stopColor="#edf0dc" /></linearGradient><linearGradient id={`${previewId}-meadow`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d3dfbf" /><stop offset="1" stopColor="#dce8ce" /></linearGradient></defs>
          <rect width="1000" height="620" fill={`url(#${previewId}-meadow)`} /><rect width="1000" height="160" fill={`url(#${previewId}-sky)`} />
          <path d="M0 140V107H60V87H130V107H195V122H250V95H310V65H360V95H410V120H475V95H530V74H590V97H630V115H680V85H745V55H790V85H850V105H930V80H1000V160H0Z" fill="#bacbd0" />
          <path d="M0 163V143H75V123H148V147H220V130H330V143H410V124H490V145H565V130H660V145H745V130H840V143H920V130H1000V180H0Z" fill="#bdcfba" />
          <path d="M895 162H950V250H925V330H956V411H930V500H965V620H910V505H884V403H900V330H875V244H895Z" fill="#b8d5d7" /><path d="M910 185V236M896 265V310M923 355V394M907 438V480M937 534V588" stroke="#d8e9e6" strokeWidth="6" />
          <path d="M0 330H1000V365H0Z" fill="#e9dac5" /><path d="M250 170H282V548H250ZM488 170H520V548H488ZM770 170H802V548H770Z" fill="#e9dac5" /><path d="M125 542H850V565H125Z" fill="#e9dac5" />
          <path d="M0 339H1000M263 170V545M501 170V545M784 170V545" stroke="#f5ead7" strokeWidth="3" strokeDasharray="8 14" />
          <rect x="874" y="321" width="93" height="52" fill="#beac91" /><path d="M883 327V367M897 327V367M911 327V367M925 327V367M939 327V367M953 327V367" stroke="#d9c8ab" strokeWidth="6" />
          <g className={styles.clouds} fill="#f5f2e9"><path d="M86 48H111V38H146V48H167V63H86Z" /><path d="M513 34H537V24H571V34H590V48H513Z" /><path d="M800 44H829V34H860V44H881V58H800Z" /></g>
          {[[55,190],[110,255],[377,181],[645,167],[825,190],[49,431],[344,410],[667,447],[831,492],[84,533],[388,549],[660,559],[950,160]].map(([x,y],i) => <Tree key={i} x={x} y={y} small={i%3===0} />)}
          <g fill="#d5b4be">{[[153,307],[352,292],[635,306],[96,489],[373,510],[678,535],[840,400]].map(([x,y],i)=><path key={i} d={`M${x} ${y}h6v6h-6zM${x+8} ${y+6}h6v6h-6z`} />)}</g>
          <g fill="#91aa91">{[[190,400],[407,320],[561,581],[701,243],[80,575],[824,572]].map(([x,y],i)=><path key={i} d={`M${x} ${y}h4v9h-4zM${x+8} ${y-3}h4v12h-4z`} />)}</g>
          <rect x="584" y="353" width="56" height="9" fill="#a99b87" /><rect x="589" y="362" width="5" height="12" fill="#897f72" /><rect x="629" y="362" width="5" height="12" fill="#897f72" />
          <path d="M136 582H852" stroke="#b0a99d" strokeWidth="9" /><path d="M142 574V590M167 574V590M192 574V590M217 574V590M242 574V590M267 574V590M292 574V590M317 574V590" stroke="#c4b9a7" strokeWidth="4" />
        </svg>
        {places.map(item => <button key={item.id} className={`${styles.building} ${item.id === 'studio' ? styles.commercialBuilding : ''} ${previewOpen && selected === item.id ? styles.selected : ''}`} style={{ left: `${item.x}%`, top: `${item.y}%` }} onClick={event => choosePlace(item.id, event.currentTarget)} aria-label={`Explore ${item.id === 'studio' ? 'Commercial work' : item.name}`} aria-pressed={previewOpen && selected === item.id} aria-expanded={previewOpen && selected === item.id} aria-controls={previewId} data-town-trigger data-map-building="true"><Building place={item} /><span className={styles.buildingLabel}>{item.id === 'studio' ? 'Commercial work' : item.name}</span></button>)}
        <div className={styles.avatar} style={{ left: `${place.x+5}%`, top: `${place.y+23}%` }} aria-hidden="true"><span className={styles.avatarBubble}>Hi!</span><svg viewBox="0 0 24 34" shapeRendering="crispEdges"><ellipse cx="12" cy="32" rx="10" ry="2" fill="#65736a" opacity=".2" /><path d="M6 3H18V6H21V19H3V6H6Z" fill="#655867" /><rect x="7" y="8" width="11" height="12" fill="#efd0b5" /><rect x="7" y="7" width="12" height="4" fill="#655867" /><rect x="9" y="13" width="2" height="2" fill="#544c54" /><rect x="15" y="13" width="2" height="2" fill="#544c54" /><rect x="6" y="20" width="14" height="9" fill="#b890a4" /><rect x="3" y="22" width="4" height="7" fill="#efd0b5" /><rect x="19" y="22" width="3" height="7" fill="#efd0b5" /><path d="M7 29H11V33H5V31H7ZM15 29H19V31H21V33H15Z" fill="#6e747d" /></svg></div>
        <span id={`${previewId}-hint`} className={styles.mapBadge}>Choose a building to explore</span>
      </div>
      <div className={styles.locationNav} aria-label="Choose a place">{places.map(item => <button key={item.id} aria-label={item.name} aria-pressed={previewOpen && selected === item.id} aria-expanded={previewOpen && selected === item.id} aria-controls={previewId} data-active={selected === item.id} data-town-trigger onClick={event => choosePlace(item.id, event.currentTarget)}>{item.tab}</button>)}</div>
    </div>
    {previewOpen && createPortal(previewAsSheet ? <dialog ref={sheet} className={styles.previewSheet} aria-labelledby={`${previewId}-title`} onCancel={event => { event.preventDefault(); closePreview(); }} onPointerDown={event => {
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.target === event.currentTarget && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
        event.preventDefault(); closePreview();
      }
    }}>{previewContent}</dialog> : previewContent, document.body)}
  </section>;
}
