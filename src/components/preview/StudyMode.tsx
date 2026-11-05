import { useCallback, useEffect, useId, useMemo, useState, type KeyboardEvent } from 'react';
import { studyClip, type Moment } from '../../data/sampleLibrary';
import { asset } from '../../lib/asset';
import { usePreloadImages } from '../../hooks/media';
import { Icon } from '../ui/Icon';
import { MediaImage } from '../ui/MediaImage';
import {
  hasRange,
  nextPlaybackFrame,
  setIn,
  setOut,
  stepFrame,
  timecode,
  type Range,
} from './previewLogic';

interface StudyModeProps {
  moments: readonly Moment[];
  onMomentsChange: (moments: readonly Moment[]) => void;
  onBack: () => void;
  announce: (text: string, toast?: boolean) => void;
  /** False when the preview is off screen; playback pauses. */
  active: boolean;
}

const { frameCount, fps } = studyClip;
const last = frameCount - 1;
const emptyRange: Range = { inFrame: null, outFrame: null };

export function StudyMode({ moments, onMomentsChange, onBack, announce, active }: StudyModeProps) {
  const noteId = useId();
  const frames = useMemo(() => Array.from({ length: frameCount }, (_, i) => asset(studyClip.frame(i))), []);
  usePreloadImages(frames, true);

  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [range, setRange] = useState<Range>(emptyRange);
  const [loopRange, setLoopRange] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!active) setPlaying(false);
  }, [active]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setFrame((current) => {
        const next = nextPlaybackFrame(current, frameCount, range, loopRange);
        if (next === null) {
          setPlaying(false);
          return current;
        }
        return next;
      });
    }, 1000 / fps);
    return () => window.clearInterval(timer);
  }, [playing, range, loopRange]);

  const ranged = hasRange(range);
  const step = (delta: number) => {
    setPlaying(false);
    setFrame((f) => stepFrame(f, delta, frameCount));
  };
  const togglePlay = () => {
    if (!playing && !loopRange && frame >= last) setFrame(0);
    if (!playing && loopRange && ranged && (frame < range.inFrame || frame > range.outFrame)) setFrame(range.inFrame);
    setPlaying((p) => !p);
  };
  const markIn = () => {
    setRange((r) => setIn(r, frame));
    announce(`In set at frame ${frame}`);
  };
  const markOut = () => {
    setRange((r) => setOut(r, frame));
    announce(`Out set at frame ${frame}`);
  };
  const toggleLoop = () => {
    if (!ranged) return;
    announce(loopRange ? 'Range loop off' : `Looping frames ${range.inFrame} to ${range.outFrame}`);
    setLoopRange(!loopRange);
  };
  const clearRange = () => {
    setRange(emptyRange);
    setLoopRange(false);
    announce('In and Out cleared');
  };

  const saveMoment = useCallback(() => {
    const text = note.trim() || `Frame ${frame}`;
    onMomentsChange([...moments, { id: `m-${Date.now()}`, frame, note: text }].sort((a, b) => a.frame - b.frame));
    setNote('');
    announce(`Moment saved at frame ${frame}`, true);
  }, [announce, frame, moments, note, onMomentsChange]);

  const removeMoment = (id: string) => {
    onMomentsChange(moments.filter((m) => m.id !== id));
    announce('Moment removed');
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const isRange = target instanceof HTMLInputElement && target.type === 'range';
    if ((target instanceof HTMLInputElement && !isRange) || target instanceof HTMLTextAreaElement) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        if (isRange) return;
        step(event.key === 'ArrowLeft' ? -1 : 1);
        break;
      case ' ':
        if (target instanceof HTMLButtonElement) return;
        togglePlay();
        break;
      case '[':
        markIn();
        break;
      case ']':
        markOut();
        break;
      case 'r':
      case 'R':
        toggleLoop();
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  const pct = (f: number) => `${(f / last) * 100}%`;

  return (
    <div className="studio" onKeyDown={onKeyDown}>
      <div className="studio__main">
        <div className="studio__top">
          <button type="button" className="btn btn--ghost btn--sm" onClick={onBack}>
            <Icon name="arrowLeft" size={15} />
            Back to Wall
          </button>
          <span className="studio__file">{studyClip.filename}</span>
          <span className="studio__note">Sample: {frameCount} drawn frames</span>
        </div>

        <div
          className="studio__viewer"
          tabIndex={0}
          role="group"
          aria-roledescription="viewer"
          aria-label={`Sample clip viewer, frame ${frame} of ${last}. Left and right arrows step frames, Space plays or pauses, brackets set In and Out, R toggles the range loop.`}
        >
          <MediaImage
            src={frames[frame]}
            width={studyClip.width}
            height={studyClip.height}
            alt=""
            fallbackLabel={`Frame ${frame} unavailable`}
            draggable={false}
          />
          {ranged && (
            <span className="studio__badge">
              {loopRange ? 'Looping' : 'Range'} · {range.inFrame}–{range.outFrame}
            </span>
          )}
        </div>

        <div className="timeline">
          <div
            className="timeline__track"
            aria-hidden="true"
            style={{
              '--playhead-pct': pct(frame),
              '--range-left':
                range.inFrame !== null ? pct(range.inFrame) : range.outFrame !== null ? pct(range.outFrame) : '0%',
              '--range-width':
                range.inFrame !== null && range.outFrame !== null
                  ? `calc(${pct(range.outFrame)} - ${pct(range.inFrame)})`
                  : '2px',
            } as React.CSSProperties}
          >
            {(range.inFrame !== null || range.outFrame !== null) && (
              <span className="timeline__range" data-loop={loopRange || undefined} />
            )}
            <span className="timeline__fill" />
            {moments.map((m) => (
              <span
                key={m.id}
                className="timeline__moment"
                style={{ '--moment-left': pct(m.frame) } as React.CSSProperties}
              />
            ))}
          </div>
          <input
            className="timeline__input"
            type="range"
            min={0}
            max={last}
            step={1}
            value={frame}
            aria-label="Playhead"
            aria-valuetext={`Frame ${frame}, ${timecode(frame, fps)}`}
            onChange={(e) => {
              setPlaying(false);
              setFrame(Number(e.target.value));
            }}
          />
        </div>

        <div className="transport">
          <div className="transport__group">
            <button type="button" className="icon-btn" aria-label="Previous frame" title="Previous frame (←)" onClick={() => step(-1)}>
              <Icon name="prev" size={16} />
            </button>
            <button type="button" className="btn btn--accent btn--sm transport__play" onClick={togglePlay}>
              <Icon name={playing ? 'pause' : 'play'} size={15} />
              {playing ? 'Pause' : 'Play'}
            </button>
            <button type="button" className="icon-btn" aria-label="Next frame" title="Next frame (→)" onClick={() => step(1)}>
              <Icon name="next" size={16} />
            </button>
          </div>
          <div className="transport__group">
            <button type="button" className="btn btn--secondary btn--sm" onClick={markIn} title="Set In ([)">
              In [
            </button>
            <button type="button" className="btn btn--secondary btn--sm" onClick={markOut} title="Set Out (])">
              Out ]
            </button>
            <button
              type="button"
              className="icon-btn"
              aria-pressed={loopRange}
              aria-label="Loop range"
              title="Loop range (R)"
              disabled={!ranged}
              onClick={toggleLoop}
            >
              <Icon name="loop" size={16} />
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              disabled={range.inFrame === null && range.outFrame === null}
              onClick={clearRange}
            >
              Clear
            </button>
          </div>
          <output className="readout" aria-live="off">
            <span>Frame</span> <b>{frame}</b> <span className="readout__tc">{timecode(frame, fps)}</span>{' '}
            <span className="readout__fps">{fps} fps</span>
          </output>
        </div>
      </div>

      <aside className="moments" aria-label="Moments">
        <div className="moments__head">
          <h3 className="panel-title">Moments</h3>
          <span className="moments__scope">
            <Icon name="lock" size={12} />
            Private
          </span>
        </div>
        <form
          className="moments__form"
          onSubmit={(e) => {
            e.preventDefault();
            saveMoment();
          }}
        >
          <label htmlFor={noteId} className="field-label">
            Note for frame {frame}
          </label>
          <input
            id={noteId}
            className="field"
            type="text"
            maxLength={60}
            placeholder="e.g. Anticipation before the hop"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button type="submit" className="btn btn--accent-soft btn--sm moments__save">
            <Icon name="bookmark" size={15} />
            Save Moment
          </button>
        </form>
        {moments.length === 0 ? (
          <p className="moments__empty">No Moments yet. Pause on a useful frame and save one.</p>
        ) : (
          <ul className="moment-list">
            {moments.map((m) => (
              <li className="moment" key={m.id} data-current={m.frame === frame || undefined}>
                <button
                  type="button"
                  className="moment__jump"
                  onClick={() => {
                    setPlaying(false);
                    setFrame(m.frame);
                  }}
                  aria-label={`Go to Moment at frame ${m.frame}: ${m.note}`}
                >
                  <img src={frames[m.frame]} width="96" height="54" alt="" loading="lazy" />
                  <span className="moment__text">
                    <span className="moment__tc">
                      F {m.frame} · {timecode(m.frame, fps)}
                    </span>
                    <span className="moment__note">{m.note}</span>
                  </span>
                </button>
                <button
                  type="button"
                  className="icon-btn icon-btn--sm icon-btn--quiet"
                  aria-label={`Delete Moment at frame ${m.frame}`}
                  onClick={() => removeMoment(m.id)}
                >
                  <Icon name="close" size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
