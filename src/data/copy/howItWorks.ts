import type { IconName } from '../../components/ui/Icon';

export interface WorkflowStep {
  readonly num: string;
  readonly icon: IconName;
  readonly title: string;
  readonly caption: string;
  readonly text: string;
  readonly image1600: string;
  readonly image800: string;
  readonly imageAlt: string;
}

export interface HowItWorksCopy {
  readonly eyebrow: string;
  readonly titleLines: readonly [string, string];
  readonly steps: readonly WorkflowStep[];
}

export const howItWorksCopy: HowItWorksCopy = {
  eyebrow: 'Artist Workflow',
  titleLines: ['Built around the way', 'artists actually work.'],
  steps: [
    {
      num: '01',
      icon: 'folder',
      title: 'Connect your reference folders',
      caption: 'Import checklist · Selective folders',
      text: 'Point to any folder on your SSD or studio network and pick which subfolders to include. Frameshelf builds an instant thumbnail cache while your original media stays 100% read-only and untouched.',
      image1600: 'media/workflow/step-01-add-folder-1600.jpg',
      image800: 'media/workflow/step-01-add-folder-800.jpg',
      imageAlt: 'Frameshelf folder import dialog showing selective subfolder checklist and non-destructive import confirmation.',
    },
    {
      num: '02',
      icon: 'grid',
      title: 'Curate your visual Wall',
      caption: 'The Wall · Projects & Shelves',
      text: 'Hover-scrub dozens of clips in seconds without launching video players. Group shelves into active Projects, tag recurring lighting or motion beats, and curate visual reference boards with zero file duplication.',
      image1600: 'media/workflow/step-02-browse-organize-1600.jpg',
      image800: 'media/workflow/step-02-browse-organize-800.jpg',
      imageAlt: 'Frameshelf Wall overview showing reference cards with duration pills, filter tabs, and Project Shelves.',
    },
    {
      num: '03',
      icon: 'bookmark',
      title: 'Pinpoint frames in Studio',
      caption: 'Studio · Timeline & Moments',
      text: 'Step frame-by-frame with zero lag, set In/Out marks to loop tricky motion arcs, and capture timestamped Moments with notes or markup sketches to reference whenever you animate.',
      image1600: 'media/workflow/step-03-save-moment-1600.jpg',
      image800: 'media/workflow/step-03-save-moment-800.jpg',
      imageAlt: 'Frameshelf Studio player with timeline range loop, timecode readout, and Moments inspector.',
    },
  ],
};
