import { useEffect, useRef, useState } from 'react';
import { asset } from '../../lib/asset';
import { Icon } from '../ui/Icon';

interface AnimatedReviewRoomPreviewProps {
  /** If false, animations pause to save CPU when off screen */
  active?: boolean;
}

const TOTAL_DURATION_MS = 7200;

export function AnimatedReviewRoomPreview({ active = true }: AnimatedReviewRoomPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  // Pause when off screen to save CPU
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setInView(entry.isIntersecting);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Main animation timer loop
  useEffect(() => {
    if (!active || !inView || !isPlaying) return;

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setElapsed(TOTAL_DURATION_MS - 800);
      return;
    }

    const interval = 40; // 25 fps
    const timer = window.setInterval(() => {
      setElapsed((cur) => (cur + interval >= TOTAL_DURATION_MS ? 0 : cur + interval));
    }, interval);

    return () => window.clearInterval(timer);
  }, [active, inView, isPlaying]);

  // Timeline phases:
  // 0ms - 1600ms  : Initial shared moment with Asrul's note. Status = In Review.
  // 1600ms - 3200ms: Director typing indicator active.
  // 3200ms - 4800ms: Director reply appears.
  // 4800ms - 5800ms: Status stamps to "Resolved" with checkmark.
  // 5800ms - 7200ms: Hold complete approved state.

  const isTyping = elapsed >= 1600 && elapsed < 3200;
  const hasReply = elapsed >= 3200;
  const isResolved = elapsed >= 4800;

  return (
    <div
      className="mini-review"
      ref={containerRef}
      aria-label="Review Room demonstrating team discussion, frame inspection, and approval over local storage"
    >
      {/* Top Header Bar */}
      <div className="mini-review__bar" aria-hidden="true">
        <div className="mini-review__bar-left">
          <span className="mini-review__dots">
            <span />
            <span />
            <span />
          </span>
          <span className="mini-review__room-title">QC and review</span>
        </div>
        <div className="mini-review__bar-right">
          <span className="mini-review__sync-pill">
            <span className="mini-review__sync-dot" />
            <span className="mini-review__sync-path">//studio-nas/vfx_qc/</span>
          </span>
          <button
            type="button"
            className="mini-review__toggle-btn"
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
            title={isPlaying ? 'Pause simulation' : 'Play simulation'}
          >
            <Icon name={isPlaying ? 'pause' : 'play'} size={10} />
          </button>
        </div>
      </div>

      {/* Main Moment Card Container */}
      <div className="mini-review__card">
        {/* Moment Header Bar */}
        <div className="mini-review__moment-head" aria-hidden="true">
          <div className="mini-review__head-left">
            <span className="mini-review__jump-btn">
              <Icon name="play" size={9} />
              <span>00:00:04:00</span>
              <small>F 96</small>
            </span>
            <span className="mini-review__scope-tag">
              <Icon name="users" size={9} />
              <span>Shared</span>
            </span>
            <span className="mini-review__moment-title">SC07_SH07 · Branch edge</span>
          </div>

          <div className="mini-review__head-right">
            <span
              className={`mini-review__status-badge ${
                isResolved ? 'is-resolved' : 'is-review'
              }`}
            >
              {isResolved ? (
                <>
                  <Icon name="check" size={10} />
                  <span>Resolved</span>
                </>
              ) : (
                <span>In Review</span>
              )}
            </span>
          </div>
        </div>

        {/* Moment Body: Thumbnail + Discussion Thread */}
        <div className="mini-review__moment-body">
          {/* Annotated Frame Thumbnail (Continuity with Stage 02) */}
          <div className="mini-review__thumb-wrap" aria-hidden="true">
            <div className="mini-review__thumb-frame">
              <img
                src={asset('media/library/forest-fog-960.jpg')}
                alt="Reviewed frame with markup"
                className="mini-review__thumb-img"
                loading="lazy"
              />
              {/* SVG Markup Overlay: Arrow and Circle matching Stage 02 */}
              <svg
                className="mini-review__thumb-svg"
                viewBox="0 0 200 125"
                preserveAspectRatio="none"
              >
                <defs>
                  <marker
                    id="mini-review-arrow"
                    markerWidth="6"
                    markerHeight="6"
                    refX="5"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M 0 0.5 L 5 3 L 0 5.5 Z" fill="#ef4444" />
                  </marker>
                </defs>
                <line
                  x1="76"
                  y1="68"
                  x2="102"
                  y2="52"
                  stroke="#ef4444"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  markerEnd="url(#mini-review-arrow)"
                />
                <ellipse
                  cx="110"
                  cy="50"
                  rx="14"
                  ry="12"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.4"
                  transform="rotate(-12 110 50)"
                />
              </svg>
              <span className="mini-review__thumb-badge">F 96</span>
            </div>
            <span className="mini-review__thumb-hint">Original on NAS</span>
          </div>

          {/* Discussion Thread */}
          <div className="mini-review__thread">
            {/* Message 1: Asrul (Compositor) */}
            <div className="mini-review__msg">
              <div className="mini-review__msg-header" aria-hidden="true">
                <span className="mini-review__avatar is-asrul">A</span>
                <span className="mini-review__author">
                  Asrul <strong>· Compositor</strong>
                </span>
                <span className="mini-review__time">10:42 AM</span>
              </div>
              <p className="mini-review__msg-text">
                Check branch edge separation. Matte fringing against backlight.
              </p>
            </div>

            {/* Message 2: Director (Typing Indicator or Confirmed Reply) */}
            {isTyping && (
              <div className="mini-review__msg is-typing" aria-hidden="true">
                <div className="mini-review__msg-header">
                  <span className="mini-review__avatar is-director">D</span>
                  <span className="mini-review__author">Director</span>
                  <span className="mini-review__time">reviewing...</span>
                </div>
                <div className="mini-review__typing-dots">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {hasReply && (
              <div className="mini-review__msg is-reply" aria-hidden="true">
                <div className="mini-review__msg-header">
                  <span className="mini-review__avatar is-director">D</span>
                  <span className="mini-review__author">
                    Director <strong>· Lead</strong>
                  </span>
                  <span className="mini-review__time">10:44 AM</span>
                </div>
                <p className="mini-review__msg-text is-approved-text">
                  Matte approved. Clean edge confirmed on PC 2.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Local Storage Guarantee Footer */}
      <div className="mini-review__footer" aria-hidden="true">
        <span className="mini-review__footer-sync">
          <Icon name="folder" size={11} />
          <span>Synced via room.json · 0ms server lag</span>
        </span>
        <span className="mini-review__footer-priv">
          <Icon name="lock" size={9} />
          <span>No cloud lock-in</span>
        </span>
      </div>
    </div>
  );
}
