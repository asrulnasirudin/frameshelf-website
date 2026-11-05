// Sample library for the interactive preview.
// All imagery is original generated artwork made for this page (see README > Credits).
// To swap media: replace files under public/media and edit the entries below.
// Paths are relative to the site base; resolve them with `asset()`.

export type MediaKind = 'video' | 'image';

export type TagId = 'animation' | 'movement' | 'lighting' | 'environment' | 'fx' | 'figure' | 'composition';

export interface Tag {
  readonly id: TagId;
  readonly label: string;
}

export interface Thumb {
  /** Path of the small rendition (about 480px wide). */
  readonly src: string;
  /** Optional larger rendition for high-density screens. */
  readonly src2x?: string;
  readonly width: number;
  readonly height: number;
}

export interface SampleItem {
  readonly id: string;
  readonly filename: string;
  readonly kind: MediaKind;
  readonly alt: string;
  readonly thumb: Thumb;
  /** Display duration for videos, e.g. "0:12". */
  readonly duration?: string;
  readonly fps?: number;
  readonly tags: readonly TagId[];
  /** True for the clip that opens in the Study mode. */
  readonly studyClip?: boolean;
}

export interface Board {
  readonly id: string;
  readonly name: string;
}

export const tags: readonly Tag[] = [
  { id: 'movement', label: 'Movement' },
  { id: 'lighting', label: 'Lighting' },
  { id: 'animation', label: 'Animation' },
  { id: 'environment', label: 'Environment' },
  { id: 'fx', label: 'FX' },
  { id: 'figure', label: 'Figure' },
  { id: 'composition', label: 'Composition' },
];

const lib = (name: string, width: number, height: number): Thumb => ({
  src: `media/library/${name}-480.jpg`,
  src2x: `media/library/${name}-960.jpg`,
  width,
  height,
});

export const studyClip = {
  id: 'bounce',
  filename: 'bounce_study_v02.mp4',
  frameCount: 48,
  fps: 24,
  width: 960,
  height: 540,
  poster: 'media/study/bounce-poster.svg',
  frame: (index: number): string => `media/study/bounce-${String(index + 1).padStart(3, '0')}.svg`,
} as const;

export const sampleItems: readonly SampleItem[] = [
  {
    id: 'bounce',
    filename: studyClip.filename,
    kind: 'video',
    alt: 'Drawn orange ball bouncing across grid paper, shown with onion-skinned positions along its arc',
    thumb: { src: studyClip.poster, width: 960, height: 540 },
    duration: '0:02',
    fps: 24,
    tags: ['animation', 'movement'],
    studyClip: true,
  },
  {
    id: 'walk',
    filename: 'walk_cycle_poses.png',
    kind: 'image',
    alt: 'Pencil sheet of six side-view walking poses on cream paper',
    thumb: lib('walk-cycle', 480, 268),
    tags: ['animation', 'figure'],
  },
  {
    id: 'forest',
    filename: 'pine_fog_sunrise.jpg',
    kind: 'image',
    alt: 'Misty pine forest at sunrise with light rays cutting through the fog',
    thumb: lib('forest-fog', 480, 322),
    tags: ['environment', 'lighting'],
  },
  {
    id: 'box',
    filename: 'box_squash_study.mp4',
    kind: 'video',
    alt: 'Drawn terracotta box jumping with squash and stretch deformation on a 12-field grid',
    thumb: { src: 'media/study/box-poster.svg', width: 960, height: 540 },
    duration: '0:01.5',
    fps: 24,
    tags: ['animation', 'movement'],
  },
  {
    id: 'hands',
    filename: 'hand_poses_sheet.png',
    kind: 'image',
    alt: 'Graphite study sheet of six hand poses on toned paper',
    thumb: lib('hand-poses', 480, 480),
    tags: ['figure', 'composition'],
  },
  {
    id: 'star',
    filename: 'star_turnaround.mp4',
    kind: 'video',
    alt: 'Faceted 3D golden star turnaround rotation with angle guide and cel-shaded lighting',
    thumb: { src: 'media/study/star-poster.svg', width: 960, height: 540 },
    duration: '0:01.5',
    fps: 24,
    tags: ['animation', 'movement'],
  },
];

export const boards: readonly Board[] = [
  { id: 'lighting-refs', name: 'Lighting references' },
  { id: 'timing', name: 'Timing & spacing' },
  { id: 'dynamics', name: 'Dynamics & FX' },
];

/** Board membership when the preview starts or is reset. */
export const initialBoardMembership: Readonly<Record<string, readonly string[]>> = {
  'lighting-refs': ['forest'],
  timing: ['bounce', 'walk'],
  dynamics: ['box', 'star'],
};

export const initialFavourites: readonly string[] = ['bounce'];

export interface Moment {
  readonly id: string;
  readonly frame: number;
  readonly note: string;
}

export const initialMoments: readonly Moment[] = [
  { id: 'm-contact', frame: 10, note: 'First contact: full squash' },
];
