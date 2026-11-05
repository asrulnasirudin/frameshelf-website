// Single source of truth for release status and outbound destinations.
// Set a destination to `null` to hide every action that depends on it.

export interface ReleaseStatus {
  readonly platform: string;
  readonly stage: string;
}

export interface Destinations {
  /** Owner-approved public contact address. Used for "Request access". */
  readonly contactEmail: string | null;
  /** Public installer page. Not approved while Frameshelf is an internal beta. */
  readonly download: string | null;
  /** Public source or project repository. */
  readonly repository: string | null;
  /** Public support page. */
  readonly support: string | null;
}

export interface SiteConfig {
  readonly name: string;
  readonly title: string;
  readonly description: string;
  /** Final public URL with trailing slash; enables canonical and social URLs. */
  readonly siteUrl: string | null;
  readonly release: ReleaseStatus;
  readonly destinations: Destinations;
}

export const site: SiteConfig = {
  name: 'Frameshelf',
  title: 'Frameshelf: your video and image references, within reach',
  description:
    'Frameshelf is a local-first visual reference library for videos and images on Windows. Browse your references visually, study movement frame by frame, and keep the moments worth coming back to.',
  siteUrl: null,
  release: { platform: 'Windows', stage: 'Internal beta' },
  destinations: {
    contactEmail: 'asrul.nasirudin@gmail.com',
    download: null,
    repository: null,
    support: null,
  },
};

export const releaseLabel = `${site.release.platform} · ${site.release.stage}`;

/** mailto: link for access requests, or null when no contact is approved. */
export function requestAccessHref(config: SiteConfig = site): string | null {
  const email = config.destinations.contactEmail;
  if (!email) return null;
  const subject = encodeURIComponent('Frameshelf beta access');
  return `mailto:${email}?subject=${subject}`;
}

export function contactHref(config: SiteConfig = site): string | null {
  const email = config.destinations.contactEmail;
  return email ? `mailto:${email}?subject=${encodeURIComponent('Frameshelf')}` : null;
}
