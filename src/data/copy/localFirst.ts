import type { IconName } from '../../components/ui/Icon';

export interface LocalFact {
  readonly icon: IconName;
  readonly title: string;
  readonly text: string;
}

export interface ReviewStage {
  readonly num: string;
  readonly icon: IconName;
  readonly title: string;
  readonly caption: string;
  readonly text: string;
  readonly image1600: string;
  readonly image800: string;
  readonly imageAlt: string;
}

export interface LocalFirstCopy {
  readonly eyebrow: string;
  readonly titleLines: readonly [string, string];
  readonly lead: string;
  readonly facts: readonly LocalFact[];
  readonly collaboration: {
    readonly eyebrow: string;
    readonly titleLines: readonly [string, string];
    readonly lead: string;
    readonly stages: readonly ReviewStage[];
  };
}

export const localFirstCopy: LocalFirstCopy = {
  eyebrow: 'Local-first architecture',
  titleLines: ['Your files stay', 'where they are.'],
  lead: 'Zero cloud latency. Zero subscription lock-in. Your media stays untouched on your local SSDs and studio network shares, while Frameshelf builds an instant offline visual library.',
  facts: [
    {
      icon: 'folder',
      title: 'Originals stay strictly read-only',
      text: 'Frameshelf indexes your footage right where it lives. It never renames, moves, transcodes, or writes files beside your source media.',
    },
    {
      icon: 'lock',
      title: 'Your library stays on your machine',
      text: 'The SQLite database, thumbnails, and private Moments live in Frameshelf’s local app cache, completely separate from your footage.',
    },
    {
      icon: 'offline',
      title: '100% offline & private',
      text: 'Browse, organize, and study your reference vault without an internet connection, account sign-in, or third-party telemetry.',
    },
    {
      icon: 'share',
      title: 'Explicit sharing, zero surprises',
      text: 'Creating a local playback copy or sharing notes to a Review Room only happens when you explicitly choose it and confirm.',
    },
  ],
  collaboration: {
    eyebrow: 'LAN & NAS collaboration',
    titleLines: ['Review together,', 'when you choose.'],
    lead: 'When you need team feedback, Review Rooms let you exchange frame-accurate notes and drawings over your studio network or shared drive—without forcing cloud uploads or account setup.',
    stages: [
      {
        num: '01',
        icon: 'loop',
        title: 'Pinpoint the exact frame',
        caption: 'Studio · Transport & Timeline',
        text: 'Step frame-by-frame with zero scrubbing lag (Left / Right arrows) and set In/Out marks to loop the exact passage that needs attention.',
        image1600: 'media/workflow/pipeline-01-pinpoint-1600.jpg',
        image800: 'media/workflow/pipeline-01-pinpoint-800.jpg',
        imageAlt: 'Frameshelf Studio timeline paused at frame 96 with In/Out range loop and audio waveform.',
      },
      {
        num: '02',
        icon: 'camera',
        title: 'Annotate and explain',
        caption: 'Frame Markup Studio · Drawing & Caption',
        text: 'Sketch directly on the captured frame with pens, arrows and shapes, or write a timestamped note. Your draft stays private until you choose to share it.',
        image1600: 'media/workflow/pipeline-02-annotate-1600.jpg',
        image800: 'media/workflow/pipeline-02-annotate-800.jpg',
        imageAlt: 'Frame Markup Studio showing drawn arrows on video frame and private caption draft.',
      },
      {
        num: '03',
        icon: 'users',
        title: 'Review over local storage',
        caption: 'Review Room · QC and review',
        text: 'Share to a named team folder over your studio network or NAS. Teammates can inspect annotations and reply without importing footage.',
        image1600: 'media/workflow/pipeline-03-discuss-1600.jpg',
        image800: 'media/workflow/pipeline-03-discuss-800.jpg',
        imageAlt: 'Frameshelf Review Room discussion thread showing clip verification and threaded replies.',
      },
    ],
  },
};
