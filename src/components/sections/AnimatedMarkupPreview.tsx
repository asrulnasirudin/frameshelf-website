import { useEffect, useRef, useState } from 'react';
import { asset } from '../../lib/asset';
import { Icon } from '../ui/Icon';

interface AnimatedMarkupPreviewProps {
  /** If false, animations pause to save CPU when off screen */
  active?: boolean;
}

const FULL_NOTE = 'Check branch edge separation.';
const TOTAL_DURATION_MS = 7200;

export function AnimatedMarkupPreview({ active = true }: AnimatedMarkupPreviewProps) {
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
  // 0ms - 400ms   : idle
  // 400ms - 1600ms : drawing arrow
  // 1600ms - 2800ms: drawing circle
  // 2800ms - 4600ms: typing note
  // 4600ms - 5600ms: save privately confirmation
  // 5600ms - 7200ms: hold complete state

  const arrowProgress = Math.max(0, Math.min(1, (elapsed - 400) / 1200));
  const circleProgress = Math.max(0, Math.min(1, (elapsed - 1600) / 1200));
  const typingProgress = Math.max(0, Math.min(1, (elapsed - 2800) / 1800));
  const isSaved = elapsed >= 4600 && elapsed < 5800;

  // Active tool indicator
  const activeTool =
    elapsed < 400 ? 'pen' : elapsed < 1600 ? 'arrow' : elapsed < 2800 ? 'circle' : 'pen';

  // Substring of typed note
  const typedCount = Math.floor(typingProgress * FULL_NOTE.length);
  const currentText = FULL_NOTE.slice(0, typedCount);
  const charCount = elapsed < 2800 ? 15 : Math.max(15, typedCount);
  const showText = elapsed < 2800 ? 'Frame reference' : currentText || 'Frame reference';

  return (
    <div
      className="mini-markup"
      ref={containerRef}
      aria-label="Frame Markup Studio demonstrating drawing tools, circle highlight and private captioning"
    >
      {/* Background Footage Image */}
      <img
        src={asset('media/library/forest-fog-960.jpg')}
        alt="Annotated video frame"
        className="mini-markup__bg"
        loading="lazy"
      />

      {/* Subtle CRT / Film Grain Overlay */}
      <div className="mini-markup__scanline" aria-hidden="true" />

      {/* Top Floating Markup Toolbar Dock */}
      <div className="mini-markup__dock" aria-hidden="true">
        {/* Tool Selector */}
        <div className="mini-markup__group">
          <span className={`mini-markup__tool ${activeTool === 'pen' ? 'is-active' : ''}`}>
            <Icon name="pen" size={10} />
            <span className="mini-markup__tool-label">Pen</span>
          </span>
          <span className={`mini-markup__tool ${activeTool === 'arrow' ? 'is-active' : ''}`}>
            <Icon name="arrowUpRight" size={10} />
            <span className="mini-markup__tool-label">Arrow</span>
          </span>
          <span className="mini-markup__tool">
            <Icon name="square" size={10} />
            <span className="mini-markup__tool-label">Box</span>
          </span>
          <span className={`mini-markup__tool ${activeTool === 'circle' ? 'is-active' : ''}`}>
            <Icon name="circle" size={10} />
            <span className="mini-markup__tool-label">Circle</span>
          </span>
        </div>

        <span className="mini-markup__divider" />

        {/* Color Palette */}
        <div className="mini-markup__group mini-markup__swatches">
          <span className="mini-markup__swatch mini-markup__swatch--red is-active" />
          <span className="mini-markup__swatch mini-markup__swatch--cyan" />
          <span className="mini-markup__swatch mini-markup__swatch--yellow" />
          <span className="mini-markup__swatch mini-markup__swatch--white" />
        </div>

        <span className="mini-markup__divider mini-markup__hide-sm" />

        {/* Widths */}
        <div className="mini-markup__group mini-markup__hide-sm">
          <span className="mini-markup__width">Thin</span>
          <span className="mini-markup__width is-active">Med</span>
          <span className="mini-markup__width">Thick</span>
        </div>

        <span className="mini-markup__divider" />

        {/* Action Button */}
        <div className="mini-markup__group">
          <button
            type="button"
            className={`mini-markup__save-btn ${isSaved ? 'is-saving' : ''}`}
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
          >
            {isSaved ? 'Saved' : 'Save privately'}
          </button>
        </div>
      </div>

      {/* SVG Canvas Overlay for Animated Drawing */}
      <svg
        className="mini-markup__svg-canvas"
        viewBox="0 0 400 250"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="markup-arrowhead"
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
          >
            <path d="M 0 0.5 L 6 3.5 L 0 6.5 Z" fill="#ef4444" />
          </marker>
          <filter id="markup-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(0,0,0,0.85)" />
          </filter>
        </defs>

        {/* Animated Arrow */}
        {arrowProgress > 0 && (
          <g filter="url(#markup-glow)">
            <line
              x1="150"
              y1="135"
              x2="202"
              y2="105"
              stroke="#ef4444"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeDasharray="64"
              strokeDashoffset={String(64 * (1 - arrowProgress))}
              markerEnd={arrowProgress > 0.8 ? 'url(#markup-arrowhead)' : undefined}
            />
          </g>
        )}

        {/* Animated Circle Ring */}
        {circleProgress > 0 && (
          <ellipse
            cx="220"
            cy="100"
            rx="26"
            ry="23"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.8"
            strokeDasharray="155"
            strokeDashoffset={String(155 * (1 - circleProgress))}
            transform="rotate(-12 220 100)"
            filter="url(#markup-glow)"
          />
        )}
      </svg>

      {/* Bottom Floating Caption Card */}
      <div className="mini-markup__caption-card" aria-hidden="true">
        <div className="mini-markup__caption-header">
          <div className="mini-markup__caption-title-group">
            <span className="mini-markup__caption-title">Caption</span>
            <span className="mini-markup__privacy-badge">
              <Icon name="lock" size={8.5} /> Private
            </span>
          </div>
          <span className="mini-markup__caption-counter">{charCount} / 1800</span>
        </div>

        {/* Caption Textarea Simulation */}
        <div className="mini-markup__textarea">
          <span className="mini-markup__text-content">{showText}</span>
          {elapsed >= 2800 && elapsed < 4600 && (
            <span className="mini-markup__cursor">|</span>
          )}
        </div>

        {/* Destination Footer */}
        <div className="mini-markup__destination">
          <div className="mini-markup__profile-row">
            <span className="mini-markup__profile-label">
              Your profile: <strong>Asrul · Compositor</strong>
            </span>
            <span className="mini-markup__edit-btn">Edit profile</span>
          </div>

          <div className="mini-markup__radio-row">
            <span className="mini-markup__radio-opt is-selected">
              <span className="mini-markup__radio-dot" />
              <Icon name="lock" size={8.5} />
              <span>Private · stays on this computer</span>
            </span>
            <span className="mini-markup__radio-opt mini-markup__hide-sm">
              <span className="mini-markup__radio-dot is-empty" />
              <Icon name="users" size={8.5} />
              <span>Share to Review Room</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
