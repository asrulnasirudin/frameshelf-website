export interface BenefitSection {
  readonly eyebrow: string;
  readonly titleLines: readonly [string, string];
  readonly body: string;
  readonly points: readonly string[];
  readonly cta: string;
  readonly finePrint?: string;
  readonly image?: {
    readonly src1600: string;
    readonly src800: string;
    readonly alt: string;
    readonly caption: string;
  };
}

export interface BenefitsCopy {
  readonly browse: BenefitSection;
  readonly study: BenefitSection;
  readonly organize: BenefitSection;
}

export const benefitsCopy: BenefitsCopy = {
  browse: {
    eyebrow: 'Zero-click browsing',
    titleLines: ['No more clicking through', 'twenty black thumbnails.'],
    body: 'Windows Explorer treats your video references like spreadsheets, burying shots behind cryptic filenames and black first frames. Frameshelf turns your reference folders into an instant visual Wall—with representative content thumbnails and zero-click hover scrubbing directly on the grid.',
    points: [
      'Zero-click hover scrubbing: Glide your cursor across any video card to preview the full clip in real time',
      'Representative content thumbnails: No more blank icons, black frames, or opening the wrong shot',
      'Instant visual filters: Narrow by format, frame rate, resolution, or custom project tags in a keystroke',
    ],
    cta: 'Try browsing the sample Wall',
    image: {
      src1600: 'media/screens/wall-overview-1600.jpg',
      src800: 'media/screens/wall-overview-800.jpg',
      alt: 'The Frameshelf Wall: a grid of video and image thumbnails with filenames and durations, a sidebar with Favourites, Shelves, Boards and Tags, and a filename search field',
      caption: 'The Frameshelf Wall, with sample media.',
    },
  },
  study: {
    eyebrow: 'Studio reference study',
    titleLines: ['Study the movement.', 'Frame by frame.'],
    body: 'Open any shot in Studio and break down motion at full fidelity. Analyze timing and arcs with frame-accurate stepping, inspect sub-frame timecodes, and loop the exact passage you are studying without opening heavy editing suites.',
    points: [
      'Break down contact frames: Step forward and back a single frame with zero playback lag',
      'Non-destructive In/Out loops: Isolate physics, cloth settles, and micro-movements on repeat',
      'Timeline filmstrip & audio waveform: Jump directly to visual cues, action beats, or audio accents',
    ],
    finePrint: 'In and Out marks only affect playback in your current session. They never trim or alter source files.',
    cta: 'Step through the sample clip',
  },
  organize: {
    eyebrow: 'Artist organization',
    titleLines: ['Keep the exact frame', 'that inspired you.'],
    body: 'Curate reference boards for lighting, choreography, or style without duplicating media. In Studio, save timestamped Moments with notes or draw frame markups—so you can jump straight back to that exact pose weeks later.',
    points: [
      'Boards & Favourites: Group references visually across multiple drives without copying files',
      'Timestamped Moments: Save keyframe notes that jump directly back to the exact frame and timecode',
      'Shelf Projects: Keep active production folders organized while preserving your disk hierarchy',
    ],
    cta: 'Organize the sample library',
  },
};
