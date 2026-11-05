export interface HeroCopy {
  readonly titleLine1: string;
  readonly titleLine2Pre: string;
  readonly titleLine2Accent: string;
  readonly lead: string;
  readonly ctaPrimary: {
    readonly label: string;
    readonly href: string;
  };
  readonly ctaSecondary: {
    readonly label: string;
    readonly href: string;
  };
}

export const heroCopy: HeroCopy = {
  titleLine1: 'The visual reference deck.',
  titleLine2Pre: 'Built for ',
  titleLine2Accent: 'motion.',
  lead: 'Browse entire folders of video and stills without opening a single file. Scrub frames on hover, loop motion arcs in Studio, and build a reference library that stays 100% on your local drives.',
  ctaPrimary: {
    label: 'Try the preview',
    href: '#preview',
  },
  ctaSecondary: {
    label: 'See how it works',
    href: '#how-it-works',
  },
};
