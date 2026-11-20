import type { FocusSide, GraphSelection } from './graph';

export type CameraView = { position: [number, number, number]; target: [number, number, number] };
export type ExplorerView = {
  selection: GraphSelection;
  category: 'commercial' | 'independent';
  motion: boolean;
  zoom: number;
  loaded: boolean;
  catalogScroll: number;
  directions: [number, FocusSide][];
};
export type HomeView = { x: number; y: number; explorer?: ExplorerView; camera?: CameraView };
const entries = new Map<string, HomeView>();
const stateKey = 'portfolioHomeEntry';
let returningKey: string | null = null;

// A small, document-local cache. Reloading deliberately starts a fresh homepage;
// only a browser history return restores an earlier visit, never a new Home link.
export function homeEntryKey(): string | null {
  if (typeof window === 'undefined' || window.location.pathname !== '/') return null;
  let key = window.history.state?.[stateKey] as string | undefined;
  if (!key) {
    key = crypto.randomUUID();
    window.history.replaceState({ ...window.history.state, [stateKey]: key }, '');
  }
  return key;
}

export function saveHomeView(key: string, update: Partial<HomeView>) {
  entries.set(key, { x: 0, y: 0, ...entries.get(key), ...update });
  if (entries.size > 8) entries.delete(entries.keys().next().value!);
}

export function markHomeReturn(state: Record<string, unknown> | null) {
  const key = state?.[stateKey];
  returningKey = typeof key === 'string' && entries.has(key) ? key : null;
}

export function clearHomeReturn() { returningKey = null; }

export function returningHomeView(): HomeView | undefined {
  if (typeof window === 'undefined' || window.location.pathname !== '/' || window.history.state?.[stateKey] !== returningKey) return;
  return returningKey ? entries.get(returningKey) : undefined;
}
