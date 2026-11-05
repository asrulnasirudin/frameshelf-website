import { useEffect, useRef, useState } from 'react';
import { asset } from '../../lib/asset';
import { Icon } from '../ui/Icon';

interface AnimatedStudioPreviewProps {
  /** If false, animations pause to save CPU when off screen */
  active?: boolean;
}

const IN_FRAME = 48; // 00:00:02:00 (2.0s)
const OUT_FRAME = 96; // 00:00:04:00 (4.0s)
const TOTAL_FRAMES = 192; // 8 seconds total at 24fps
const FPS = 24;

export function AnimatedStudioPreview({ active = true }: AnimatedStudioPreviewProps) {
  const [frame, setFrame] = useState(IN_FRAME);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  // Pause playback when not visible in viewport to save CPU
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

  // Frame ticking loop between IN_FRAME and OUT_FRAME
  useEffect(() => {
    if (!active || !inView || !isPlaying) return;

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFrame(OUT_FRAME);
      return;
    }

    const interval = window.setInterval(() => {
      setFrame((cur) => (cur >= OUT_FRAME ? IN_FRAME : cur + 1));
    }, 1000 / FPS);

    return () => window.clearInterval(interval);
  }, [active, inView, isPlaying]);

  // Compute timecode: HH:MM:SS:FF
  const totalSeconds = Math.floor(frame / FPS);
  const frameInSec = frame % FPS;
  const timecodeStr = `00:00:0${totalSeconds}:${String(frameInSec).padStart(2, '0')}`;

  // Timeline percentages
  const inPercent = (IN_FRAME / TOTAL_FRAMES) * 100;
  const outPercent = (OUT_FRAME / TOTAL_FRAMES) * 100;
  const playheadPercent = (frame / TOTAL_FRAMES) * 100;

  // Step frame manual handler
  const handleStep = (delta: number) => {
    setIsPlaying(false);
    setFrame((cur) => {
      const next = cur + delta;
      if (next < IN_FRAME) return OUT_FRAME;
      if (next > OUT_FRAME) return IN_FRAME;
      return next;
    });
  };

  // Click on scrubber to jump
  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const target = Math.round(ratio * TOTAL_FRAMES);
    const clamped = Math.max(IN_FRAME, Math.min(OUT_FRAME, target));
    setFrame(clamped);
  };

  return (
    <div className="mini-studio" ref={containerRef} aria-label="Studio player demonstrating In/Out range loop">
      {/* Video Viewport */}
      <div className="mini-studio__video">
        <img
          src={asset('media/library/forest-fog-960.jpg')}
          alt="Studio video footage"
          className={`mini-studio__footage ${isPlaying ? 'is-playing' : ''}`}
          loading="lazy"
        />
        {/* Subtle camera drift / live scanlines */}
        <div className="mini-studio__scanline" aria-hidden="true" />

        {/* Video HUD Overlays */}
        <div className="mini-studio__hud" aria-hidden="true">
          <span className="mini-studio__badge">
            <span className="mini-studio__rec-dot" /> SC07_SH07_v012.mp4
          </span>
          <span className="mini-studio__badge mini-studio__badge--accent">
            Looping · 2–4s
          </span>
        </div>
      </div>

      {/* Studio Transport & Timeline Controls */}
      <div className="mini-studio__transport">
        {/* Filmstrip thumbnails row */}
        <div className="mini-studio__filmstrip" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => {
            const inRange = i >= 4 && i <= 9;
            return (
              <span
                key={i}
                className={`mini-studio__film-cell ${inRange ? 'is-in-range' : ''}`}
              >
                <span className="mini-studio__film-pip" />
              </span>
            );
          })}
        </div>

        {/* Waveform Scrubber Track */}
        <div
          className="mini-studio__scrubber"
          onClick={handleScrubberClick}
          role="slider"
          aria-valuemin={IN_FRAME}
          aria-valuemax={OUT_FRAME}
          aria-valuenow={frame}
          aria-label="Studio timeline scrubber"
          tabIndex={0}
          style={{
            '--range-left': `${inPercent}%`,
            '--range-width': `${outPercent - inPercent}%`,
            '--in-left': `${inPercent}%`,
            '--out-left': `${outPercent}%`,
            '--playhead-left': `${playheadPercent}%`,
          } as React.CSSProperties}
        >
          {/* Waveform bars simulation */}
          <svg className="mini-studio__waveform" viewBox="0 0 120 24" preserveAspectRatio="none" aria-hidden="true">
            {Array.from({ length: 60 }).map((_, i) => {
              const inRange = i >= 15 && i <= 30;
              const rawH = 20 + Math.sin(i * 0.42) * 35 + ((i % 5) * 8);
              const clampedH = Math.max(3, Math.min(21, (rawH / 100) * 24));
              const y = (24 - clampedH) / 2;
              return (
                <rect
                  key={i}
                  x={i * 2 + 0.4}
                  y={y}
                  width={1.2}
                  height={clampedH}
                  rx={0.6}
                  fill={inRange ? 'rgba(234, 88, 12, 0.65)' : 'rgba(255, 255, 255, 0.16)'}
                />
              );
            })}
          </svg>

          {/* In/Out loop range highlight */}
          <div className="mini-studio__range-highlight" aria-hidden="true" />

          {/* In marker handle */}
          <span className="mini-studio__marker is-in" aria-hidden="true" />

          {/* Out marker handle */}
          <span className="mini-studio__marker is-out" aria-hidden="true" />

          {/* Animated playhead needle */}
          <div className="mini-studio__playhead" aria-hidden="true">
            <span className="mini-studio__playhead-thumb" />
          </div>
        </div>

        {/* Transport buttons & Live readout */}
        <div className="mini-studio__controls">
          <div className="mini-studio__controls-left">
            <button
              type="button"
              className="mini-studio__btn mini-studio__btn--icon"
              onClick={() => handleStep(-1)}
              aria-label="Previous frame"
              title="Previous frame"
            >
              <Icon name="prev" size={10} />
            </button>
            <button
              type="button"
              className="mini-studio__btn mini-studio__btn--play"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
            >
              <Icon name={isPlaying ? 'pause' : 'play'} size={10} />
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button
              type="button"
              className="mini-studio__btn mini-studio__btn--icon"
              onClick={() => handleStep(1)}
              aria-label="Next frame"
              title="Next frame"
            >
              <Icon name="next" size={10} />
            </button>
            <span className="mini-studio__tag is-active" aria-hidden="true">
              In / Out
            </span>
          </div>

          <div className="mini-studio__timecode" aria-live="off">
            <span className="mini-studio__tc-label">Frame</span>
            <span className="mini-studio__tc-frame">{frame}</span>
            <span className="mini-studio__tc-time">{timecodeStr}</span>
            <span className="mini-studio__tc-fps">24 fps</span>
          </div>
        </div>

        {/* Bottom range indicator bar */}
        <div className="mini-studio__range-bar" aria-hidden="true">
          <div className="mini-studio__range-header">
            <span className="mini-studio__range-hint">
              Drag marks · Out is exclusive · session only
            </span>
          </div>
          <div className="mini-studio__slider-row">
            <span className="mini-studio__slider-label">In</span>
            <div
              className="mini-studio__slider-track"
              style={{
                '--range-left': `${inPercent}%`,
                '--range-width': `${outPercent - inPercent}%`,
                '--in-left': `${inPercent}%`,
                '--out-left': `${outPercent}%`,
              } as React.CSSProperties}
            >
              <div className="mini-studio__slider-fill" />
              <span className="mini-studio__slider-handle is-in" />
              <span className="mini-studio__slider-handle is-out" />
            </div>
            <span className="mini-studio__slider-label">Out</span>
          </div>
        </div>
      </div>
    </div>
  );
}
