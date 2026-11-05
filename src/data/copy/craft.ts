// Copy and definitions for the Studio Craft & Hidden Features section.
// Verified against the Frameshelf desktop implementation (see docs/developer/claims-ledger.md).

export type ThemeId =
  | 'warm-clay'
  | 'cyber-sunset'
  | 'acid-lime'
  | 'crimson-slate'
  | 'nordic-frost'
  | 'oceanic-cyan'
  | 'nordic-mist'
  | 'silver-slate';

export interface ThemeItem {
  readonly id: ThemeId;
  readonly name: string;
  readonly kind: 'Dark' | 'Light';
  readonly isDefault?: boolean;
  readonly vibe: string;
  readonly swatches: readonly [string, string, string, string];
}

export interface CraftFeatureCard {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly caption: string;
  readonly image800: string;
  readonly image1600: string;
  readonly imageAlt: string;
  readonly tags: readonly string[];
}

export interface StudioCraftCopy {
  readonly eyebrow: string;
  readonly titleLines: readonly [string, string];
  readonly lead: string;
  readonly viewers: CraftFeatureCard;
  readonly modernUi: CraftFeatureCard;
  readonly themes: {
    readonly eyebrow: string;
    readonly titleLines: readonly [string, string];
    readonly body: string;
    readonly list: readonly ThemeItem[];
  };
}

export const themesList: readonly ThemeItem[] = [
  {
    id: 'warm-clay',
    name: 'Warm Clay',
    kind: 'Dark',
    isDefault: true,
    vibe: 'Terracotta & warm charcoal',
    swatches: ['#1F1E1D', '#2A2826', '#D97757', '#FAF9F5'],
  },
  {
    id: 'cyber-sunset',
    name: 'Sunset Volt',
    kind: 'Dark',
    vibe: 'Tangerine & electric violet',
    swatches: ['#212529', '#2A2F35', '#FB5607', '#8338EC'],
  },
  {
    id: 'acid-lime',
    name: 'Acid Moss',
    kind: 'Dark',
    vibe: 'Electric lime & forest moss',
    swatches: ['#1A1A1A', '#222521', '#D7FF44', '#386641'],
  },
  {
    id: 'crimson-slate',
    name: 'Crimson Slate',
    kind: 'Dark',
    vibe: 'Carmine red & deep slate',
    swatches: ['#111111', '#1A1C20', '#DC2626', '#4B5563'],
  },
  {
    id: 'nordic-frost',
    name: 'Cobalt Glacier',
    kind: 'Dark',
    vibe: 'Glacier blue & royal cobalt',
    swatches: ['#1E293B', '#334155', '#60A5FA', '#1E40AF'],
  },
  {
    id: 'oceanic-cyan',
    name: 'Oceanic Abyss',
    kind: 'Dark',
    vibe: 'Pacific cyan & abyssal navy',
    swatches: ['#03045E', '#080A7A', '#00B4D8', '#90E0EF'],
  },
  {
    id: 'nordic-mist',
    name: 'Nordic Mist',
    kind: 'Light',
    vibe: 'Glacial frost & marine ink',
    swatches: ['#EDF3F8', '#DBE5EE', '#1A3F75', '#4C718E'],
  },
  {
    id: 'silver-slate',
    name: 'Silver Slate',
    kind: 'Light',
    vibe: 'Cool slate & polished steel',
    swatches: ['#E5E9F2', '#D3D9E4', '#495259', '#1D2329'],
  },
];

export const craftCopy: StudioCraftCopy = {
  eyebrow: 'Built for Daily Flow',
  titleLines: ['Fast to open.', 'Easy on the eyes.'],
  lead: 'Dedicated viewers, quiet glass controls, and studio color palettes—ready the instant inspiration hits.',
  viewers: {
    eyebrow: 'Fast Clip & Image Viewers',
    title: 'Two dedicated viewers. Zero lag.',
    body: 'Hardware-accelerated Studio fires up instantly for frame stepping and audio waveforms. For stills, the dedicated image viewer inspects 1:1 pixels and transparency without waiting on heavy OS software.',
    caption: 'Studio Player · Image Viewer',
    image800: 'media/screens/craft-viewers-800.jpg',
    image1600: 'media/screens/craft-viewers-1600.jpg',
    imageAlt:
      'Frameshelf Studio Video Player with waveform and filmstrip alongside the Dedicated Image Viewer inspecting hand study poses.',
    tags: ['Zero-lag mpv engine', 'Sub-frame timecode', '1:1 pixel inspection'],
  },
  modernUi: {
    eyebrow: 'Modern Studio UI',
    title: 'Quiet glass that stays out of the way.',
    body: 'Switch between uniform 16:9 and aspect-true Mosaic grids, dial thumbnail scale from broad contact sheet to extreme detail, or tuck the sidebar away for pure visual immersion.',
    caption: 'The Wall · Capsule Controls',
    image800: 'media/screens/craft-modern-ui-800.jpg',
    image1600: 'media/screens/craft-modern-ui-1600.jpg',
    imageAlt:
      'Frameshelf Wall interface showing collapsible sidebar, capsule glass search and grid controls, and the thumbnail zoom slider.',
    tags: ['Normal & Mosaic grids', 'Fluid zoom slider', '3-state sidebar'],
  },
  themes: {
    eyebrow: '8 Theme Flavors',
    titleLines: ['Pick a mood', 'for your desk.'],
    body: 'Six dark grading palettes and two crisp daylight modes—your workspace shifts vibe while reference media stays neutral and color-true.',
    list: themesList,
  },
};
