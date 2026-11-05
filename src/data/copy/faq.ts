export interface FaqItem {
  readonly id: string;
  readonly q: string;
  readonly a: string;
  /** True if the answer requires an access email link insertion */
  readonly requiresAccessLink?: boolean;
}

export interface FaqCopy {
  readonly eyebrow: string;
  readonly titleLines: readonly [string, string];
  readonly items: readonly FaqItem[];
  readonly closing: {
    readonly titleLines: readonly [string, string];
    readonly leadTemplate: (productName: string) => string;
    readonly ctaLabel: string;
  };
}

export const faqCopy: FaqCopy = {
  eyebrow: 'FAQ',
  titleLines: ['Questions,', 'answered.'],
  items: [
    {
      id: 'what-is',
      q: 'What is Frameshelf?',
      a: 'A Windows desktop app that turns your folders of videos and images into a visual, searchable reference library. Browse everything as thumbnails, organize it, and open clips in Studio to study them frame by frame.',
    },
    {
      id: 'original-files',
      q: 'Does it move or change my original files?',
      a: 'No. Adding a folder registers its media; the files stay where they are and Frameshelf does not modify them. Frameshelf keeps its own database and thumbnails in separate local storage. A local playback copy of a clip is only made if you request one.',
    },
    {
      id: 'offline',
      q: 'Can it work offline?',
      a: 'Yes. Your personal library, including browsing, organizing, Studio and private Moments, works without an internet connection. Media on a disconnected drive or network share appears as unavailable until it is reachable again.',
    },
    {
      id: 'formats',
      q: 'Does it support videos and images?',
      a: 'Both. Frameshelf supports MP4, MOV, MKV and WebM video, and JPEG, PNG and WebP images, in one library with an All, Videos or Images view. Videos open in Studio; images open in a viewer with zoom and pan.',
    },
    {
      id: 'os-support',
      q: 'Which operating systems are supported?',
      a: 'Windows only. Frameshelf is currently an internal beta for Windows. Versions for other systems have not been announced.',
    },
    {
      id: 'teams',
      q: 'Can teams use it?',
      a: 'Each person runs Frameshelf on their own PC. For feedback, the optional Review Rooms feature shares selected Moments and comments through a shared folder your team sets up. Nothing from a personal library is shared without review and confirmation.',
    },
    {
      id: 'access',
      q: 'How can I get access?',
      a: 'Frameshelf is currently in internal beta for Windows. We are onboarding small batches of animators, editors, and studio artists directly.',
      requiresAccessLink: true,
    },
  ],
  closing: {
    titleLines: ['Built for artists who', 'hoard visual reference.'],
    leadTemplate: (name: string) =>
      `Less time digging through folders, more time focusing on the shot. ${name} is currently in internal beta for Windows.`,
    ctaLabel: 'Email to request beta access',
  },
};
