'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import styles from './project-drawer.module.css';

type DrawerProject = { slug: string; title: string; kind: 'commercial' | 'independent' };
type DrawerControls = { open: boolean; id: string; show: (trigger: HTMLElement) => void };
const ProjectDrawerContext = createContext<DrawerControls | null>(null);
const groups = [{ kind: 'commercial', title: 'Work' }, { kind: 'independent', title: 'Personal' }] as const;
const isPlainClick = (event: MouseEvent) => event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;

export function ProjectListLink({ children, className, label }: { children: ReactNode; className?: string; label?: string }) {
  const drawer = useContext(ProjectDrawerContext);
  return <Link href="/#work" className={className} aria-label={label} aria-haspopup={drawer ? 'dialog' : undefined} aria-expanded={drawer?.open} aria-controls={drawer?.id} onClick={event => {
    if (!drawer || !isPlainClick(event)) return;
    event.preventDefault();
    drawer.show(event.currentTarget);
  }}>{children}</Link>;
}

export function ProjectDrawer({ projects, children }: { projects: DrawerProject[]; children: ReactNode }) {
  const pathname = usePathname();
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const list = useRef<HTMLElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const restoreFocus = useRef(true);
  const pointerOutside = useRef(false);
  const frame = useRef(0);
  const previousBody = useRef<{ overflow: string; paddingRight: string } | null>(null);
  const [open, setOpen] = useState(false);

  const unlock = useCallback(() => {
    if (!previousBody.current) return;
    document.body.style.overflow = previousBody.current.overflow;
    document.body.style.paddingRight = previousBody.current.paddingRight;
    previousBody.current = null;
  }, []);

  const finishClosing = useCallback(() => {
    cancelAnimationFrame(frame.current);
    unlock();
    setOpen(false);
    if (restoreFocus.current && opener.current?.isConnected) opener.current.focus({ preventScroll: true });
    opener.current = null;
  }, [unlock]);

  const close = (returnFocus = true) => {
    restoreFocus.current = returnFocus;
    dialog.current?.close();
    finishClosing();
  };

  const show = useCallback((trigger: HTMLElement) => {
    const modal = dialog.current;
    if (!modal || modal.open) return;
    opener.current = trigger;
    restoreFocus.current = true;
    pointerOutside.current = false;
    previousBody.current = { overflow: document.body.style.overflow, paddingRight: document.body.style.paddingRight };
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbar > 0) document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar}px`;
    document.body.style.overflow = 'hidden';
    modal.showModal();
    setOpen(true);
    frame.current = requestAnimationFrame(() => {
      const container = list.current;
      const current = container?.querySelector<HTMLElement>('[aria-current="page"]');
      if (!container || !current) return;
      const offset = current.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
      container.scrollTo({ top: Math.max(0, offset - container.clientHeight * .4), behavior: 'instant' });
    });
  }, []);

  useEffect(() => {
    const modal = dialog.current;
    return () => {
      cancelAnimationFrame(frame.current);
      restoreFocus.current = false;
      opener.current = null;
      modal?.close();
      unlock();
    };
  }, [pathname, unlock]);

  const trapFocus = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'Tab') return;
    const stops = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]'));
    const first = stops[0], last = stops.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  };

  return <ProjectDrawerContext.Provider value={{ open, id, show }}>
    {children}
    <button type="button" className={styles.trigger} aria-label="Open project list" aria-haspopup="dialog" aria-expanded={open} aria-controls={id} onClick={event => show(event.currentTarget)}>
      <span className={styles.mark} aria-hidden="true" /><span>Projects</span>
    </button>
    <dialog id={id} ref={dialog} className={styles.drawer} aria-labelledby={`${id}-title`} onClose={() => { if (!dialog.current?.open) finishClosing(); }} onCancel={event => { event.preventDefault(); close(); }} onKeyDown={trapFocus} onPointerDown={event => {
      const bounds = event.currentTarget.getBoundingClientRect();
      pointerOutside.current = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    }} onClick={event => {
      if (event.target === event.currentTarget && pointerOutside.current) close();
    }}>
      <div className={styles.heading}>
        <h2 id={`${id}-title`}>Projects <span>{projects.length}</span></h2>
        <button type="button" className={styles.close} aria-label="Close project list" onClick={() => close()}><span aria-hidden="true">×</span></button>
      </div>
      <nav ref={list} className={styles.list} aria-label="All projects">
        {groups.map(group => <section key={group.kind} aria-labelledby={`${id}-${group.kind}`}>
          <h3 id={`${id}-${group.kind}`}>{group.title}<span>{projects.filter(project => project.kind === group.kind).length}</span></h3>
          <ul>{projects.filter(project => project.kind === group.kind).map(project => {
            const current = pathname === `/projects/${project.slug}`;
            return <li key={project.slug}><Link href={`/projects/${project.slug}`} aria-current={current ? 'page' : undefined} onClick={event => {
              if (!isPlainClick(event)) return;
              if (current) event.preventDefault();
              close(current);
            }}><span className={styles.currentMark} aria-hidden="true" /><span>{project.title}</span></Link></li>;
          })}</ul>
        </section>)}
      </nav>
    </dialog>
  </ProjectDrawerContext.Provider>;
}
