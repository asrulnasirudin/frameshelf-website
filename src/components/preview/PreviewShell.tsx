import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import {
  boards,
  initialBoardMembership,
  initialFavourites,
  initialMoments,
  sampleItems,
  type Moment,
} from '../../data/sampleLibrary';
import { asset } from '../../lib/asset';
import { useInView } from '../../hooks/media';
import { BrowseMode } from './BrowseMode';
import { OrganizeMode } from './OrganizeMode';
import { StudyMode } from './StudyMode';

export type PreviewMode = 'browse' | 'organize' | 'study';

export const PREVIEW_MODE_EVENT = 'frameshelf:preview-mode';

const modes: readonly { id: PreviewMode; label: string; hint: string }[] = [
  {
    id: 'browse',
    label: 'Browse',
    hint: 'Search filenames, switch between videos and images, or combine tags. Hover, focus or tap a card for details.',
  },
  {
    id: 'organize',
    label: 'Organize',
    hint: 'Pick a reference, then add it to a Board or mark it as a favourite. Changes last for this visit only.',
  },
  {
    id: 'study',
    label: 'Study',
    hint: 'Step frame by frame, mark In and Out, loop the range, and save a Moment. Keys work while the viewer has focus: ← → [ ] R Space.',
  },
];

type Membership = Record<string, string[]>;

const freshMembership = (): Membership =>
  Object.fromEntries(Object.entries(initialBoardMembership).map(([id, items]) => [id, [...items]]));

export function PreviewShell() {
  const baseId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<PreviewMode, HTMLButtonElement | null>>({ browse: null, organize: null, study: null });
  const inView = useInView(rootRef);

  const [mode, setMode] = useState<PreviewMode>('browse');
  const [favourites, setFavourites] = useState<ReadonlySet<string>>(() => new Set(initialFavourites));
  const [membership, setMembership] = useState<Membership>(freshMembership);
  const [moments, setMoments] = useState<readonly Moment[]>(initialMoments);
  const [announcement, setAnnouncement] = useState('');
  const [toast, setToast] = useState<{ text: string; key: number } | null>(null);

  // Polite announcements; alternate a trailing space so repeats are re-read.
  const announce = useCallback((text: string, showToast = false) => {
    setAnnouncement((prev) => (prev === text ? `${text} ` : text));
    if (showToast) setToast({ text, key: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  // Links elsewhere on the page can open a specific mode.
  useEffect(() => {
    const onMode = (event: Event) => {
      const next = (event as CustomEvent<PreviewMode>).detail;
      if (modes.some((m) => m.id === next)) setMode(next);
    };
    window.addEventListener(PREVIEW_MODE_EVENT, onMode);
    return () => window.removeEventListener(PREVIEW_MODE_EVENT, onMode);
  }, []);

  const toggleFavourite = useCallback(
    (id: string) => {
      const item = sampleItems.find((i) => i.id === id);
      const adding = !favourites.has(id);
      const next = new Set(favourites);
      if (adding) next.add(id);
      else next.delete(id);
      setFavourites(next);
      announce(`${item?.filename ?? 'Item'} ${adding ? 'added to' : 'removed from'} Favourites`, true);
    },
    [announce, favourites],
  );

  const toggleBoard = useCallback(
    (boardId: string, itemId: string) => {
      const board = boards.find((b) => b.id === boardId);
      const current = membership[boardId] ?? [];
      const adding = !current.includes(itemId);
      setMembership({ ...membership, [boardId]: adding ? [...current, itemId] : current.filter((i) => i !== itemId) });
      announce(`${adding ? 'Saved to' : 'Removed from'} ${board?.name ?? 'board'}`, true);
    },
    [announce, membership],
  );

  const resetOrganize = useCallback(() => {
    setFavourites(new Set(initialFavourites));
    setMembership(freshMembership());
    announce('Boards and favourites reset', true);
  }, [announce]);

  const onTabKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = modes.findIndex((m) => m.id === mode);
    let next: number;
    if (event.key === 'ArrowRight') next = (index + 1) % modes.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + modes.length) % modes.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = modes.length - 1;
    else return;
    event.preventDefault();
    const target = modes[next];
    if (!target) return;
    setMode(target.id);
    tabRefs.current[target.id]?.focus();
  };

  const active = modes.find((m) => m.id === mode) ?? modes[0]!;
  const panelId = `${baseId}-panel`;

  return (
    <div className="preview" ref={rootRef}>
      {/* Detached showroom workflow controls — clearly separate from the software UI */}
      <div className="preview-controls">
        <div
          className="segmented preview__tabs"
          role="tablist"
          aria-label="Interactive preview workflow"
          onKeyDown={onTabKey}
        >
          {modes.map((m) => (
            <button
              key={m.id}
              ref={(el) => {
                tabRefs.current[m.id] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${m.id}`}
              aria-selected={mode === m.id}
              aria-controls={panelId}
              tabIndex={mode === m.id ? 0 : -1}
              className="segmented__item"
              onClick={() => setMode(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
        <p className="preview__hint">{active.hint}</p>
      </div>

      {/* The authentic simulated desktop application window */}
      <div className="preview-frame reveal">
        <div className="preview-window-bar">
          <div className="preview-window-controls" aria-hidden="true">
            <span className="preview-window-dot preview-window-dot--close" />
            <span className="preview-window-dot preview-window-dot--min" />
            <span className="preview-window-dot preview-window-dot--max" />
          </div>
          <div className="preview-window-title">
            <img src={asset('brand/frameshelf-symbol.svg')} alt="" width="14" height="14" />
            <span>Frameshelf</span>
            <span className="preview-window-sep" aria-hidden="true">/</span>
            <span className="preview-window-context">{active.label}</span>
          </div>
          <div className="preview-window-status">
            <span className="preview-window-status__dot" aria-hidden="true" />
            <span>Local library</span>
          </div>
        </div>

        <div
          className="preview__panel"
          role="tabpanel"
          id={panelId}
          aria-labelledby={`${baseId}-tab-${mode}`}
        >
          <div className="preview__view" hidden={mode !== 'browse'}>
            <BrowseMode
              favourites={favourites}
              onToggleFavourite={toggleFavourite}
              onOpenStudio={() => setMode('study')}
              announce={announce}
            />
          </div>
          <div className="preview__view" hidden={mode !== 'organize'}>
            <OrganizeMode
              favourites={favourites}
              membership={membership}
              onToggleFavourite={toggleFavourite}
              onToggleBoard={toggleBoard}
              onReset={resetOrganize}
            />
          </div>
          <div className="preview__view" hidden={mode !== 'study'}>
            <StudyMode
              moments={moments}
              onMomentsChange={setMoments}
              onBack={() => setMode('browse')}
              announce={announce}
              active={inView && mode === 'study'}
            />
          </div>
        </div>
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
      {toast && (
        <div className="toast" key={toast.key} aria-hidden="true">
          <span className="toast__dot" />
          {toast.text}
        </div>
      )}
    </div>
  );
}
