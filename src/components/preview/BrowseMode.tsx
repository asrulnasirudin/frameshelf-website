import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { sampleItems, studyClip, tags, type SampleItem } from '../../data/sampleLibrary';
import { asset, srcSet } from '../../lib/asset';
import { usePreloadImages, useReducedMotion } from '../../hooks/media';
import { Icon } from '../ui/Icon';
import { MediaImage } from '../ui/MediaImage';
import { filterItems, isFiltered, type KindFilter } from './previewLogic';

interface BrowseModeProps {
  favourites: ReadonlySet<string>;
  onToggleFavourite: (id: string) => void;
  onOpenStudio: () => void;
  announce: (text: string) => void;
}

const kinds: readonly { id: KindFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'video', label: 'Videos' },
  { id: 'image', label: 'Images' },
];

const tagLabel = (id: string) => tags.find((t) => t.id === id)?.label ?? id;

export function BrowseMode({ favourites, onToggleFavourite, onOpenStudio, announce }: BrowseModeProps) {
  const searchId = useId();
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<KindFilter>('all');
  const [activeTags, setActiveTags] = useState<readonly string[]>([]);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const filter = { query, kind, tags: activeTags };
  const results = useMemo(
    () => filterItems(sampleItems, { query, kind, tags: activeTags }),
    [query, kind, activeTags],
  );
  const filtered = isFiltered(filter);

  // Announce result counts after typing settles.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timer = window.setTimeout(() => {
      announce(results.length === 0 ? 'No matching references' : `${results.length} of ${sampleItems.length} references shown`);
    }, 450);
    return () => window.clearTimeout(timer);
  }, [results.length, announce]);

  const reset = () => {
    setQuery('');
    setKind('all');
    setActiveTags([]);
  };

  const toggleTag = (id: string) =>
    setActiveTags((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));

  return (
    <div className="browse">
      <MotionFiltersSvg />
      <div className="browse__toolbar">
        <div className="segmented segmented--sm" role="group" aria-label="Media type">
          {kinds.map((k) => (
            <button
              key={k.id}
              type="button"
              className="segmented__item"
              aria-pressed={kind === k.id}
              onClick={() => setKind(k.id)}
            >
              {k.label}
            </button>
          ))}
        </div>
        <div className="search">
          <label htmlFor={searchId} className="sr-only">
            Search filenames
          </label>
          <Icon name="search" size={16} className="search__icon" />
          <input
            id={searchId}
            type="search"
            className="search__input"
            placeholder="Search filenames…"
            value={query}
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn--ghost btn--sm" onClick={reset} disabled={!filtered}>
          <Icon name="reset" size={15} />
          Reset
        </button>
      </div>

      <div className="chips" role="group" aria-label="Filter by tag (all selected tags must match)">
        {tags.map((t) => (
          <button
            key={t.id}
            type="button"
            className="chip"
            aria-pressed={activeTags.includes(t.id)}
            onClick={() => toggleTag(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="browse__count">
        {filtered ? `${results.length} of ${sampleItems.length} items` : `${sampleItems.length} items`}
      </p>

      {results.length === 0 ? (
        <div className="empty">
          <Icon name="search" size={28} />
          <p className="empty__title">No references match these filters.</p>
          <p className="empty__text">Try fewer tags, another filename, or start over.</p>
          <button type="button" className="btn btn--secondary btn--sm" onClick={reset}>
            <Icon name="reset" size={15} />
            Reset filters
          </button>
        </div>
      ) : (
        <ul className="wall" aria-label="Sample references">
          {results.map((item, index) => (
            <WallCard
              key={item.id}
              item={item}
              eager={index < 4}
              active={activeCard === item.id}
              favourite={favourites.has(item.id)}
              onActivate={() => setActiveCard((prev) => (prev === item.id ? null : item.id))}
              onToggleFavourite={() => onToggleFavourite(item.id)}
              onOpenStudio={onOpenStudio}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function MotionFiltersSvg() {
  return null;
}

const WALK_POSES = [
  { id: 1, name: 'Contact', pct: 6 },
  { id: 2, name: 'Down', pct: 21 },
  { id: 3, name: 'Passing', pct: 36.5 },
  { id: 4, name: 'Up', pct: 52 },
  { id: 5, name: 'Contact', pct: 67.5 },
  { id: 6, name: 'Passing', pct: 83 },
] as const;

function parseDurationSec(d?: string): number {
  if (!d) return 0;
  const parts = d.split(':').map(Number);
  if (parts.length === 2) return (parts[0] ?? 0) * 60 + (parts[1] ?? 0);
  return 0;
}

function formatDurationSec(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

interface WallCardProps {
  item: SampleItem;
  eager: boolean;
  active: boolean;
  favourite: boolean;
  onActivate: () => void;
  onToggleFavourite: () => void;
  onOpenStudio: () => void;
}

function WallCard({ item, eager, active, favourite, onActivate, onToggleFavourite, onOpenStudio }: WallCardProps) {
  const metaId = useId();
  const [engaged, setEngaged] = useState(false);
  const [scrubRatio, setScrubRatio] = useState<number | null>(null);
  const [autoPoseIndex, setAutoPoseIndex] = useState(0);
  const reduced = useReducedMotion();
  const isVideo = item.kind === 'video';
  const isWalk = item.id === 'walk';
  const isScrubbingActive = (isVideo || isWalk) && engaged && scrubRatio !== null;

  // Walk cycle pose stepping loop when hovered
  useEffect(() => {
    if (reduced || !engaged || !isWalk || scrubRatio !== null) return;
    const timer = window.setInterval(() => {
      setAutoPoseIndex((idx) => (idx + 1) % WALK_POSES.length);
    }, 420);
    return () => window.clearInterval(timer);
  }, [reduced, engaged, isWalk, scrubRatio]);

  const activePoseIndex =
    scrubRatio !== null
      ? Math.min(WALK_POSES.length - 1, Math.max(0, Math.floor(scrubRatio * WALK_POSES.length)))
      : autoPoseIndex;

  const currentPose = WALK_POSES[activePoseIndex] ?? WALK_POSES[0]!;

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!isVideo && !isWalk) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width > 0) {
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      setScrubRatio(x / rect.width);
    }
  };

  const handlePointerLeave = () => {
    setEngaged(false);
    setScrubRatio(null);
  };

  const badgeText = useMemo(() => {
    if (isWalk && engaged) {
      return `Pose 0${currentPose.id} · ${currentPose.name}`;
    }

    if (!item.duration) return 'Image';

    if (scrubRatio !== null) {
      if (item.studyClip) {
        const currentFrame = Math.min(
          studyClip.frameCount,
          Math.max(1, Math.round(scrubRatio * (studyClip.frameCount - 1)) + 1),
        );
        return `F ${String(currentFrame).padStart(2, '0')} · ${formatDurationSec(Math.round(scrubRatio * 2))}`;
      }
      if (item.id === 'box') {
        const currentFrame = Math.min(
          36,
          Math.max(1, Math.round(scrubRatio * 35) + 1),
        );
        return `F ${String(currentFrame).padStart(2, '0')} · 0:01.5`;
      }
      if (item.id === 'star') {
        const currentFrame = Math.min(
          36,
          Math.max(1, Math.round(scrubRatio * 35) + 1),
        );
        const deg = ((currentFrame - 1) * 10) % 360;
        return `F ${String(currentFrame).padStart(2, '0')} · ${deg}°`;
      }
      const totalSec = parseDurationSec(item.duration);
      const curSec = Math.round(scrubRatio * totalSec);
      return `${formatDurationSec(curSec)} / ${item.duration}`;
    }

    if (engaged && isVideo) {
      return `Playing · ${item.duration}`;
    }

    return item.duration;
  }, [currentPose.id, currentPose.name, engaged, isVideo, isWalk, item.duration, item.studyClip, scrubRatio]);

  return (
    <li
      className="card"
      data-active={active || undefined}
      data-scrubbing={isScrubbingActive || undefined}
      onPointerEnter={() => setEngaged(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onFocus={() => setEngaged(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setEngaged(false);
          setScrubRatio(null);
        }
      }}
    >
      <div className="card__inner">
        <button
          type="button"
          className="card__hit"
          aria-expanded={active}
          aria-describedby={metaId}
          onClick={onActivate}
        >
          <span className="card__media">
            {item.studyClip && (engaged || active) ? (
              <FrameClipScrub
                frameCount={studyClip.frameCount}
                fps={studyClip.fps}
                frameFn={studyClip.frame}
                poster={studyClip.poster}
                alt={item.alt}
                scrubRatio={scrubRatio}
              />
            ) : item.id === 'box' && (engaged || active) ? (
              <FrameClipScrub
                frameCount={36}
                fps={24}
                frameFn={(i) => `media/study/box-${String(i + 1).padStart(3, '0')}.svg`}
                poster="media/study/box-poster.svg"
                alt={item.alt}
                scrubRatio={scrubRatio}
              />
            ) : item.id === 'star' && (engaged || active) ? (
              <FrameClipScrub
                frameCount={36}
                fps={24}
                frameFn={(i) => `media/study/star-${String(i + 1).padStart(3, '0')}.svg`}
                poster="media/study/star-poster.svg"
                alt={item.alt}
                scrubRatio={scrubRatio}
              />
            ) : isWalk ? (
              <span className="card__media-wrap card__media-wrap--walk">
                <MediaImage
                  src={asset(item.thumb.src)}
                  srcSet={srcSet(item.thumb.src, item.thumb.src2x)}
                  sizes="(min-width: 1100px) 360px, (min-width: 700px) 45vw, 92vw"
                  width={item.thumb.width}
                  height={item.thumb.height}
                  alt={item.alt}
                  loading={eager ? 'eager' : 'lazy'}
                  decoding="async"
                />
                {engaged && (
                  <span
                    className="card__walk-cursor"
                    style={{ '--cursor-left': `${currentPose.pct}%` } as React.CSSProperties}
                    aria-hidden="true"
                  />
                )}
              </span>
            ) : (
              <span className="card__media-wrap">
                <MediaImage
                  src={asset(item.thumb.src)}
                  srcSet={srcSet(item.thumb.src, item.thumb.src2x)}
                  sizes="(min-width: 1100px) 360px, (min-width: 700px) 45vw, 92vw"
                  width={item.thumb.width}
                  height={item.thumb.height}
                  alt={item.alt}
                  loading={eager ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </span>
            )}
            {isVideo && engaged && (
              <span
                className="card__scrub-bar"
                style={{ '--scrub-pct': `${((scrubRatio ?? 0.25) * 100).toFixed(1)}%` } as React.CSSProperties}
                aria-hidden="true"
              >
                <span className="card__scrub-progress" />
                <span className="card__scrub-head" />
              </span>
            )}
          </span>
          <span className="card__name">{item.filename}</span>
          <span
            className={`card__badge ${item.duration ? '' : 'card__badge--type'} ${isWalk && engaged ? 'card__badge--walk-active' : ''}`}
          >
            {badgeText}
          </span>
        </button>

        <button
          type="button"
          className="card__fav-btn"
          aria-pressed={favourite}
          aria-label={`Favourite ${item.filename}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavourite();
          }}
        >
          <Icon name="heart" size={14} />
        </button>

        <div className="card__overlay" id={metaId}>
          <div className="card__meta">
            <span className="card__meta-kind">
              <Icon name={item.kind === 'video' ? 'film' : 'image'} size={13} />
              {item.kind === 'video' ? `${item.fps} fps` : 'Image'}
            </span>
            <span className="card__tags" aria-hidden="true">
              {item.tags.map((t) => (
                <span key={t}>{tagLabel(t)}</span>
              ))}
            </span>
          </div>
          <div className="card__actions">
            {item.studyClip && (
              <button
                type="button"
                className="btn btn--accent btn--xs card__studio-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenStudio();
                }}
              >
                Open in Studio
                <Icon name="arrowRight" size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

interface FrameClipScrubProps {
  frameCount: number;
  fps: number;
  frameFn: (index: number) => string;
  poster: string;
  alt: string;
  scrubRatio: number | null;
}

/** Loops animation reference frames on hover, focus or tap, with interactive scrub support. */
function FrameClipScrub({ frameCount, fps, frameFn, poster, alt, scrubRatio }: FrameClipScrubProps) {
  const reduced = useReducedMotion();
  const frames = useMemo(() => Array.from({ length: frameCount }, (_, i) => asset(frameFn(i))), [frameCount, frameFn]);
  usePreloadImages(frames, true);
  const [autoFrame, setAutoFrame] = useState(0);

  useEffect(() => {
    if (reduced || scrubRatio !== null) return;
    const timer = window.setInterval(() => setAutoFrame((f) => (f + 1) % frameCount), 1000 / fps);
    return () => window.clearInterval(timer);
  }, [reduced, scrubRatio, frameCount, fps]);

  const activeIndex =
    scrubRatio !== null
      ? Math.min(frameCount - 1, Math.max(0, Math.floor(scrubRatio * frameCount)))
      : autoFrame;

  return (
    <MediaImage
      src={reduced ? asset(poster) : frames[activeIndex] ?? asset(poster)}
      width={960}
      height={540}
      alt={alt}
    />
  );
}
