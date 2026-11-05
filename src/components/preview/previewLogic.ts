// Pure helpers for the interactive preview. Kept framework-free so they can be
// unit-tested with node:test (see tests/previewLogic.test.ts).

export type KindFilter = 'all' | 'video' | 'image';

export interface FilterableItem {
  readonly filename: string;
  readonly kind: 'video' | 'image';
  readonly tags: readonly string[];
}

export interface FilterState {
  readonly query: string;
  readonly kind: KindFilter;
  readonly tags: readonly string[];
}

/** Filename search (case-insensitive, `_`/`-` treated as spaces), kind and all-tags match. */
export function filterItems<T extends FilterableItem>(items: readonly T[], filter: FilterState): T[] {
  const terms = normalise(filter.query).split(' ').filter(Boolean);
  return items.filter((item) => {
    if (filter.kind !== 'all' && item.kind !== filter.kind) return false;
    if (!filter.tags.every((tag) => item.tags.includes(tag))) return false;
    const name = normalise(item.filename);
    return terms.every((term) => name.includes(term));
  });
}

function normalise(value: string): string {
  return value.toLowerCase().replace(/[_\-.]+/g, ' ').replace(/\s+/g, ' ').trim();
}

export function isFiltered(filter: FilterState): boolean {
  return filter.query.trim() !== '' || filter.kind !== 'all' || filter.tags.length > 0;
}

export interface Range {
  /** First frame inside the range. */
  readonly inFrame: number | null;
  /** Last frame inside the range. */
  readonly outFrame: number | null;
}

export function clampFrame(frame: number, frameCount: number): number {
  return Math.min(Math.max(Math.round(frame), 0), frameCount - 1);
}

/** Single-frame step; stops at the clip edges like desktop frame stepping. */
export function stepFrame(frame: number, delta: number, frameCount: number): number {
  return clampFrame(frame + delta, frameCount);
}

export function hasRange(range: Range): range is { inFrame: number; outFrame: number } {
  return range.inFrame !== null && range.outFrame !== null && range.inFrame <= range.outFrame;
}

/** Sets In; drops Out if it would precede the new In. */
export function setIn(range: Range, frame: number): Range {
  const outFrame = range.outFrame !== null && range.outFrame < frame ? null : range.outFrame;
  return { inFrame: frame, outFrame };
}

/** Sets Out; drops In if it would follow the new Out. */
export function setOut(range: Range, frame: number): Range {
  const inFrame = range.inFrame !== null && range.inFrame > frame ? null : range.inFrame;
  return { inFrame, outFrame: frame };
}

/**
 * Next frame during playback. With an active range loop, playback cycles inside
 * In..Out; otherwise it stops on the last frame (returns null).
 */
export function nextPlaybackFrame(
  frame: number,
  frameCount: number,
  range: Range,
  loopRange: boolean,
): number | null {
  if (loopRange && hasRange(range)) {
    if (frame < range.inFrame || frame >= range.outFrame) return range.inFrame;
    return frame + 1;
  }
  return frame + 1 < frameCount ? frame + 1 : null;
}

/** SMPTE-style non-drop timecode HH:MM:SS:FF for integer frame rates. */
export function timecode(frame: number, fps: number): string {
  const totalSeconds = Math.floor(frame / fps);
  const ff = frame % fps;
  const ss = totalSeconds % 60;
  const mm = Math.floor(totalSeconds / 60) % 60;
  const hh = Math.floor(totalSeconds / 3600);
  return [hh, mm, ss, ff].map((n) => String(n).padStart(2, '0')).join(':');
}

export function padFrame(frame: number, width = 3): string {
  return String(frame).padStart(width, '0');
}
