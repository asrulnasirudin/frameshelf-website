export interface FooterLink {
  readonly label: string;
  readonly href: string;
}

export interface FooterCopy {
  readonly credits: string;
  readonly copyright: string;
  readonly defaultLinks: readonly FooterLink[];
}

export const footerCopy: FooterCopy = {
  credits:
    'Sample media and the Study animation are original artwork created for this page. The Wall screenshot shows Frameshelf with synthetic sample media. Typeface: Inter by Rasmus Andersson (SIL Open Font License 1.1). Features described reflect the current Windows internal beta.',
  copyright: '© 2026 Kriio Works.',
  defaultLinks: [
    { label: 'Preview', href: '#preview' },
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Credits', href: '#credits' },
  ],
};
