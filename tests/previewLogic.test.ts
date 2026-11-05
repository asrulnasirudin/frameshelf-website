import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  filterItems,
  isFiltered,
  nextPlaybackFrame,
  setIn,
  setOut,
  stepFrame,
  timecode,
} from '../src/components/preview/previewLogic.ts';

const items = [
  { filename: 'rain_street_night_A012.mov', kind: 'video', tags: ['lighting', 'environment'] },
  { filename: 'walk_cycle_poses.png', kind: 'image', tags: ['animation', 'figure'] },
  { filename: 'bounce_study_v02.mp4', kind: 'video', tags: ['animation', 'movement'] },
] as const;

const none = { query: '', kind: 'all', tags: [] } as const;

test('filename search ignores case and separators', () => {
  assert.deepEqual(filterItems(items, { ...none, query: 'Street Night' }).map((i) => i.filename), [
    'rain_street_night_A012.mov',
  ]);
  assert.equal(filterItems(items, { ...none, query: 'cycle' }).length, 1);
  assert.equal(filterItems(items, { ...none, query: 'nothing-here' }).length, 0);
});

test('kind and tag filters combine (all tags must match)', () => {
  assert.equal(filterItems(items, { ...none, kind: 'video' }).length, 2);
  assert.equal(filterItems(items, { ...none, tags: ['animation'] }).length, 2);
  assert.equal(filterItems(items, { ...none, tags: ['animation', 'movement'] }).length, 1);
  assert.equal(filterItems(items, { ...none, kind: 'image', tags: ['movement'] }).length, 0);
});

test('isFiltered reports active filters', () => {
  assert.equal(isFiltered(none), false);
  assert.equal(isFiltered({ ...none, query: ' ' }), false);
  assert.equal(isFiltered({ ...none, tags: ['fx'] }), true);
});

test('frame stepping clamps to the clip', () => {
  assert.equal(stepFrame(0, -1, 48), 0);
  assert.equal(stepFrame(47, 1, 48), 47);
  assert.equal(stepFrame(10, 1, 48), 11);
});

test('In/Out marks stay ordered', () => {
  const r1 = setOut(setIn({ inFrame: null, outFrame: null }, 10), 20);
  assert.deepEqual(r1, { inFrame: 10, outFrame: 20 });
  assert.deepEqual(setIn(r1, 25), { inFrame: 25, outFrame: null });
  assert.deepEqual(setOut(r1, 5), { inFrame: null, outFrame: 5 });
});

test('playback loops inside the range, otherwise stops at the end', () => {
  const range = { inFrame: 10, outFrame: 12 };
  assert.equal(nextPlaybackFrame(10, 48, range, true), 11);
  assert.equal(nextPlaybackFrame(12, 48, range, true), 10);
  assert.equal(nextPlaybackFrame(30, 48, range, true), 10);
  assert.equal(nextPlaybackFrame(12, 48, range, false), 13);
  assert.equal(nextPlaybackFrame(47, 48, range, false), null);
});

test('timecode formats HH:MM:SS:FF', () => {
  assert.equal(timecode(0, 24), '00:00:00:00');
  assert.equal(timecode(24, 24), '00:00:01:00');
  assert.equal(timecode(47, 24), '00:00:01:23');
});
