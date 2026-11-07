import { useId, useMemo, useState, useEffect } from 'react';
import { studyClip } from '../../data/sampleLibrary';
import { asset } from '../../lib/asset';
import { usePreloadImages, useReducedMotion } from '../../hooks/media';
import { Icon } from '../ui/Icon';
import { MediaImage } from '../ui/MediaImage';

type ViewMode = 'frameshelf' | 'explorer';

interface CardState {
  scrubRatio: number | null;
  engaged: boolean;
}

const BOX_FRAMES_COUNT = 36;
const boxFrame = (index: number) => `media/study/box-${String(index + 1).padStart(3, '0')}.svg`;
const boxPoster = 'media/study/box-poster.svg';

const STAR_FRAMES_COUNT = 36;
const starFrame = (index: number) => `media/study/star-${String(index + 1).padStart(3, '0')}.svg`;
const starPoster = 'media/study/star-poster.svg';

export function WallComparisonPreview() {
  const [mode, setMode] = useState<ViewMode>('frameshelf');
  const panelId = useId();
  const tabFrameshelfId = useId();
  const tabExplorerId = useId();

  return (
    <div className="wall-compare" aria-label="Interactive comparison: Frameshelf Wall vs Windows Explorer">
      {/* Segmented Capsule Toggle */}
      <div className="wall-compare__toggle-bar">
        <div className="segmented wall-compare__toggle" role="tablist" aria-label="Experience comparison">
          <button
            id={tabFrameshelfId}
            type="button"
            role="tab"
            aria-selected={mode === 'frameshelf'}
            aria-controls={panelId}
            className={`segmented__item wall-compare__tab ${mode === 'frameshelf' ? 'is-active' : ''}`}
            onClick={() => setMode('frameshelf')}
          >
            <Icon name="check" size={14} className="wall-compare__tab-icon" />
            <span className="wall-compare__tab-title">Frameshelf Wall</span>
            <span className="wall-compare__badge wall-compare__badge--accent">Zero-click scrub</span>
          </button>
          <button
            id={tabExplorerId}
            type="button"
            role="tab"
            aria-selected={mode === 'explorer'}
            aria-controls={panelId}
            className={`segmented__item wall-compare__tab ${mode === 'explorer' ? 'is-active' : ''}`}
            onClick={() => setMode('explorer')}
          >
            <span className="wall-compare__icon-x" aria-hidden="true">✕</span>
            <span className="wall-compare__tab-title">Windows Explorer</span>
            <span className="wall-compare__badge">Traditional</span>
          </button>
        </div>
      </div>

      {/* Surface Panel */}
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={mode === 'frameshelf' ? tabFrameshelfId : tabExplorerId}
        className={`wall-compare__frame wall-compare__frame--${mode}`}
      >
        {mode === 'frameshelf' ? (
          <FrameshelfWallView />
        ) : (
          <WindowsExplorerView onSwitchToFrameshelf={() => setMode('frameshelf')} />
        )}
      </div>
    </div>
  );
}

function FrameshelfWallView() {
  // Card 1: Bounce study (frame-accurate vector scrub)
  const [card1, setCard1] = useState<CardState>({ scrubRatio: null, engaged: false });
  // Card 2: Box squash & stretch (frame-accurate vector scrub)
  const [card2, setCard2] = useState<CardState>({ scrubRatio: null, engaged: false });
  // Card 3: 3D rotating star turnaround (frame-accurate vector scrub)
  const [card3, setCard3] = useState<CardState>({ scrubRatio: null, engaged: false });

  const handlePointer = (
    e: React.PointerEvent<HTMLDivElement>,
    setter: React.Dispatch<React.SetStateAction<CardState>>,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width > 0) {
      const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
      setter({ scrubRatio: x / rect.width, engaged: true });
    }
  };

  const resetCard = (setter: React.Dispatch<React.SetStateAction<CardState>>) => {
    setter({ scrubRatio: null, engaged: false });
  };

  // Card 2: Box scrub readout
  const card2Text = useMemo(() => {
    if (card2.scrubRatio !== null) {
      const frame = Math.min(BOX_FRAMES_COUNT, Math.max(1, Math.round(card2.scrubRatio * (BOX_FRAMES_COUNT - 1)) + 1));
      return `F ${String(frame).padStart(2, '0')} · 0:01.5`;
    }
    return '0:01.5';
  }, [card2.scrubRatio]);

  // Card 3: Star scrub readout (showing frame + angle)
  const card3Text = useMemo(() => {
    if (card3.scrubRatio !== null) {
      const frame = Math.min(STAR_FRAMES_COUNT, Math.max(1, Math.round(card3.scrubRatio * (STAR_FRAMES_COUNT - 1)) + 1));
      const deg = ((frame - 1) * 10) % 360;
      return `F ${String(frame).padStart(2, '0')} · ${deg}°`;
    }
    return '0:01.5';
  }, [card3.scrubRatio]);

  return (
    <div className="mini-wall">
      {/* App Bar */}
      <div className="mini-wall__bar">
        <div className="mini-wall__search">
          <Icon name="search" size={14} />
          <span>Search 12 clips...</span>
        </div>
        <div className="mini-wall__filters">
          <span className="mini-wall__chip is-active">All (12)</span>
          <span className="mini-wall__chip">Videos (8)</span>
          <span className="mini-wall__chip">Images (4)</span>
        </div>
      </div>

      {/* Grid of Visual Reference Cards (All 3 video clips interactive!) */}
      <div className="mini-wall__grid" role="region" aria-label="Interactive reference cards">
        {/* Card 1: Vector-scrubbed bounce clip */}
        <div
          className="mini-card"
          data-hovered={card1.engaged || undefined}
          onPointerEnter={() => setCard1((s) => ({ ...s, engaged: true }))}
          onPointerMove={(e) => handlePointer(e, setCard1)}
          onPointerLeave={() => resetCard(setCard1)}
        >
          <div className="mini-card__media">
            <InteractiveBounceScrub scrubRatio={card1.scrubRatio} engaged={card1.engaged} />
            {card1.engaged && (
              <span
                className="mini-card__scrub-bar"
                style={{ '--scrub-pct': `${((card1.scrubRatio ?? 0.3) * 100).toFixed(1)}%` } as React.CSSProperties}
                aria-hidden="true"
              >
                <span className="mini-card__scrub-progress" />
                <span className="mini-card__scrub-head" />
              </span>
            )}
            <span className="mini-card__badge">
              {card1.scrubRatio !== null
                ? `F ${String(Math.min(48, Math.max(1, Math.round(card1.scrubRatio * 47) + 1))).padStart(2, '0')} · 0:02`
                : '0:02'}
            </span>
          </div>
          <div className="mini-card__info">
            <span className="mini-card__name">bounce_study.mp4</span>
            <span className="mini-card__fps">24 fps</span>
          </div>
        </div>

        {/* Card 2: Box squash and stretch */}
        <div
          className="mini-card"
          data-hovered={card2.engaged || undefined}
          onPointerEnter={() => setCard2((s) => ({ ...s, engaged: true }))}
          onPointerMove={(e) => handlePointer(e, setCard2)}
          onPointerLeave={() => resetCard(setCard2)}
        >
          <div className="mini-card__media">
            <InteractiveBoxScrub scrubRatio={card2.scrubRatio} engaged={card2.engaged} />
            {card2.engaged && (
              <span
                className="mini-card__scrub-bar"
                style={{ '--scrub-pct': `${((card2.scrubRatio ?? 0.4) * 100).toFixed(1)}%` } as React.CSSProperties}
                aria-hidden="true"
              >
                <span className="mini-card__scrub-progress" />
                <span className="mini-card__scrub-head" />
              </span>
            )}
            <span className="mini-card__badge">{card2Text}</span>
          </div>
          <div className="mini-card__info">
            <span className="mini-card__name">box_squash_study.mp4</span>
            <span className="mini-card__fps">24 fps</span>
          </div>
        </div>

        {/* Card 3: 3D rotating star turnaround */}
        <div
          className="mini-card"
          data-hovered={card3.engaged || undefined}
          onPointerEnter={() => setCard3((s) => ({ ...s, engaged: true }))}
          onPointerMove={(e) => handlePointer(e, setCard3)}
          onPointerLeave={() => resetCard(setCard3)}
        >
          <div className="mini-card__media">
            <InteractiveStarScrub scrubRatio={card3.scrubRatio} engaged={card3.engaged} />
            {card3.engaged && (
              <span
                className="mini-card__scrub-bar"
                style={{ '--scrub-pct': `${((card3.scrubRatio ?? 0.5) * 100).toFixed(1)}%` } as React.CSSProperties}
                aria-hidden="true"
              >
                <span className="mini-card__scrub-progress" />
                <span className="mini-card__scrub-head" />
              </span>
            )}
            <span className="mini-card__badge">{card3Text}</span>
          </div>
          <div className="mini-card__info">
            <span className="mini-card__name">star_turnaround.mp4</span>
            <span className="mini-card__fps">24 fps</span>
          </div>
        </div>

        {/* Card 4: Walk cycle poses */}
        <div className="mini-card">
          <div className="mini-card__media">
            <img
              src={asset('media/library/walk-cycle-480.jpg')}
              width="480"
              height="270"
              alt="Walk cycle character pose guide"
              loading="lazy"
              decoding="async"
              className="mini-card__img"
            />
            <span className="mini-card__badge mini-card__badge--type">Image</span>
          </div>
          <div className="mini-card__info">
            <span className="mini-card__name">walk_cycle.png</span>
            <span className="mini-card__fps">Pose Guide</span>
          </div>
        </div>
      </div>

      {/* Helpful Hint Bar */}
      <div className="mini-wall__footer">
        <span className="mini-wall__footer-icon" aria-hidden="true">💡</span>
        <span className="mini-wall__footer-text">
          <strong>Hover to scrub:</strong> Move your cursor across any video card to scrub frames in real time without opening a player.
        </span>
      </div>
    </div>
  );
}

function InteractiveBounceScrub({ scrubRatio, engaged }: { scrubRatio: number | null; engaged: boolean }) {
  const reduced = useReducedMotion();
  const frames = useMemo(
    () => Array.from({ length: studyClip.frameCount }, (_, i) => asset(studyClip.frame(i))),
    [],
  );
  usePreloadImages(frames, true);
  const [autoFrame, setAutoFrame] = useState(0);

  useEffect(() => {
    if (reduced || engaged || scrubRatio !== null) return;
    const timer = window.setInterval(
      () => setAutoFrame((f) => (f + 1) % studyClip.frameCount),
      1000 / studyClip.fps,
    );
    return () => window.clearInterval(timer);
  }, [reduced, engaged, scrubRatio]);

  const activeIndex =
    scrubRatio !== null
      ? Math.min(studyClip.frameCount - 1, Math.max(0, Math.floor(scrubRatio * studyClip.frameCount)))
      : autoFrame;

  return (
    <MediaImage
      src={reduced ? asset(studyClip.poster) : frames[activeIndex] ?? asset(studyClip.poster)}
      width={studyClip.width}
      height={studyClip.height}
      alt="Interactive drawn bounce reference"
      className="mini-card__img"
    />
  );
}

function InteractiveBoxScrub({ scrubRatio, engaged }: { scrubRatio: number | null; engaged: boolean }) {
  const reduced = useReducedMotion();
  const frames = useMemo(
    () => Array.from({ length: BOX_FRAMES_COUNT }, (_, i) => asset(boxFrame(i))),
    [],
  );
  usePreloadImages(frames, true);
  const [autoFrame, setAutoFrame] = useState(0);

  useEffect(() => {
    if (reduced || engaged || scrubRatio !== null) return;
    const timer = window.setInterval(
      () => setAutoFrame((f) => (f + 1) % BOX_FRAMES_COUNT),
      1000 / 24,
    );
    return () => window.clearInterval(timer);
  }, [reduced, engaged, scrubRatio]);

  const activeIndex =
    scrubRatio !== null
      ? Math.min(BOX_FRAMES_COUNT - 1, Math.max(0, Math.floor(scrubRatio * BOX_FRAMES_COUNT)))
      : autoFrame;

  return (
    <MediaImage
      src={reduced ? asset(boxPoster) : frames[activeIndex] ?? asset(boxPoster)}
      width={960}
      height={540}
      alt="Interactive box squash and stretch animation reference"
      className="mini-card__img"
    />
  );
}

function InteractiveStarScrub({ scrubRatio, engaged }: { scrubRatio: number | null; engaged: boolean }) {
  const reduced = useReducedMotion();
  const frames = useMemo(
    () => Array.from({ length: STAR_FRAMES_COUNT }, (_, i) => asset(starFrame(i))),
    [],
  );
  usePreloadImages(frames, true);
  const [autoFrame, setAutoFrame] = useState(0);

  useEffect(() => {
    if (reduced || engaged || scrubRatio !== null) return;
    const timer = window.setInterval(
      () => setAutoFrame((f) => (f + 1) % STAR_FRAMES_COUNT),
      1000 / 24,
    );
    return () => window.clearInterval(timer);
  }, [reduced, engaged, scrubRatio]);

  const activeIndex =
    scrubRatio !== null
      ? Math.min(STAR_FRAMES_COUNT - 1, Math.max(0, Math.floor(scrubRatio * STAR_FRAMES_COUNT)))
      : autoFrame;

  return (
    <MediaImage
      src={reduced ? asset(starPoster) : frames[activeIndex] ?? asset(starPoster)}
      width={960}
      height={540}
      alt="Interactive 3D rotating star turnaround reference"
      className="mini-card__img"
    />
  );
}

function WindowsExplorerView({ onSwitchToFrameshelf }: { onSwitchToFrameshelf: () => void }) {
  return (
    <div className="explorer-view">
      {/* Windows 11 Explorer Header Mockup */}
      <div className="explorer-view__header">
        <div className="explorer-view__nav" aria-hidden="true">
          <span className="explorer-view__btn">‹</span>
          <span className="explorer-view__btn">›</span>
          <span className="explorer-view__btn">↑</span>
        </div>
        <div className="explorer-view__address">
          <Icon name="folder" size={14} className="explorer-view__folder-icon" />
          <span className="explorer-view__path">D:\Footage\2026_Projects\Raw_References</span>
        </div>
        <div className="explorer-view__search">
          <Icon name="search" size={13} />
          <span>Search Raw_References</span>
        </div>
      </div>

      {/* Explorer Command / Status Bar */}
      <div className="explorer-view__subbar">
        <span className="explorer-view__status-chip">4 items</span>
        <span className="explorer-view__view-mode">View: Large icons</span>
      </div>

      {/* 4 Generic Black-Thumbnail Items */}
      <div className="explorer-view__grid" role="region" aria-label="Traditional folder view">
        <div className="explorer-item">
          <div className="explorer-item__thumb">
            <div className="explorer-item__black-frame" />
            <div className="explorer-item__generic-icon" aria-hidden="true">
              <Icon name="film" size={24} />
            </div>
            <span className="explorer-item__badge-fail">Generic black thumbnail</span>
          </div>
          <span className="explorer-item__name">DSC_0942_A01_RAW.MOV</span>
          <span className="explorer-item__meta">412 MB · MOV</span>
        </div>

        <div className="explorer-item">
          <div className="explorer-item__thumb">
            <div className="explorer-item__black-frame" />
            <div className="explorer-item__generic-icon" aria-hidden="true">
              <Icon name="film" size={24} />
            </div>
            <span className="explorer-item__badge-fail">Generic black thumbnail</span>
          </div>
          <span className="explorer-item__name">C0012_render_v03_FINAL2.mp4</span>
          <span className="explorer-item__meta">1.2 GB · MP4</span>
        </div>

        <div className="explorer-item">
          <div className="explorer-item__thumb">
            <div className="explorer-item__black-frame" />
            <div className="explorer-item__generic-icon" aria-hidden="true">
              <Icon name="film" size={24} />
            </div>
            <span className="explorer-item__badge-fail">Generic black thumbnail</span>
          </div>
          <span className="explorer-item__name">VID_20261014_114209.mp4</span>
          <span className="explorer-item__meta">89 MB · MP4</span>
        </div>

        <div className="explorer-item">
          <div className="explorer-item__thumb">
            <div className="explorer-item__black-frame" />
            <div className="explorer-item__generic-icon" aria-hidden="true">
              <Icon name="film" size={24} />
            </div>
            <span className="explorer-item__badge-fail">Generic black thumbnail</span>
          </div>
          <span className="explorer-item__name">IMG_8492_edit_copy(1).mov</span>
          <span className="explorer-item__meta">640 MB · QuickTime</span>
        </div>
      </div>

      {/* Frustration Callout Banner */}
      <div className="explorer-view__frustration">
        <div className="explorer-view__frustration-body">
          <span className="explorer-view__warning-icon" aria-hidden="true">⚠️</span>
          <div>
            <p className="explorer-view__frustration-title">Which was the bounce? Which was the squash box or rotating star?</p>
            <p className="explorer-view__frustration-desc">
              Default OS thumbnails show black first frames and cryptic names. You have to double-click clip after clip in external media players just to see what you recorded.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="btn btn--accent btn--sm explorer-view__cta"
          onClick={onSwitchToFrameshelf}
        >
          <span>Switch to Frameshelf Wall</span>
          <Icon name="arrowRight" size={14} />
        </button>
      </div>
    </div>
  );
}
