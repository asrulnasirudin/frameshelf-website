import type { SVGProps } from 'react';

const paths = {
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
  play: <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none" />,
  pause: <><rect x="6.5" y="5.5" width="3.5" height="13" rx="1" fill="currentColor" stroke="none" /><rect x="14" y="5.5" width="3.5" height="13" rx="1" fill="currentColor" stroke="none" /></>,
  prev: <><path d="M6 5v14" /><path d="M18 5.5v13L9 12z" fill="currentColor" stroke="none" /></>,
  next: <><path d="M18 5v14" /><path d="M6 5.5v13L15 12z" fill="currentColor" stroke="none" /></>,
  loop: <><path d="M4 11V9a3 3 0 0 1 3-3h12l-3-3" /><path d="M20 13v2a3 3 0 0 1-3 3H5l3 3" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" />,
  board: <><rect x="4" y="4" width="16" height="16" rx="2.5" /><path d="M4 10h16M10 10v10" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  bookmark: <path d="M7 4h10v16l-5-3.5L7 20z" />,
  folder: <path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />,
  reset: <><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3" /><path d="M4.5 4.5v4h4" /></>,
  close: <path d="m6.5 6.5 11 11m0-11-11 11" />,
  film: <><rect x="3.5" y="5" width="17" height="14" rx="2" /><path d="M7.5 5v14M16.5 5v14M3.5 9.5h4M3.5 14.5h4M16.5 9.5h4M16.5 14.5h4" /></>,
  image: <><rect x="3.5" y="4.5" width="17" height="15" rx="2" /><circle cx="9" cy="10" r="1.8" /><path d="m4 17.5 5-4.5 4 3.5 3-2.5 4.5 3.5" /></>,
  lock: <><rect x="5" y="10.5" width="14" height="9.5" rx="2" /><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" /></>,
  offline: <><path d="M4 9.5a12 12 0 0 1 16 0M7 13a7.5 7.5 0 0 1 10 0M10 16.5a3 3 0 0 1 4 0" /><path d="m4 4 16 16" /></>,
  share: <><circle cx="7" cy="12" r="2.5" /><circle cx="17" cy="6.5" r="2.5" /><circle cx="17" cy="17.5" r="2.5" /><path d="m9.2 10.8 5.6-3m-5.6 5.4 5.6 3" /></>,
  arrowRight: <path d="M5 12h13m-5-5 5 5-5 5" />,
  arrowLeft: <path d="M19 12H6m5-5-5 5 5 5" />,
  menu: <path d="M4 7.5h16M4 12h16M4 16.5h16" />,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  users: <><circle cx="9" cy="9" r="3" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><path d="M15.5 6.5a3 3 0 0 1 0 5.5M17 14.2a5.5 5.5 0 0 1 3.5 4.8" /></>,
  camera: <><path d="M4 8.5a2 2 0 0 1 2-2h2l1.5-2h5L16 6.5h2a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" /><circle cx="12" cy="12.5" r="3.5" /></>,
  grid: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>,
  tag: <><path d="M4 4h7.5l8.5 8.5-7.5 7.5L4 11.5z" /><circle cx="8.5" cy="8.5" r="1.5" /></>,
  maximize: <><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></>,
  volume: <><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></>,
  pen: <><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></>,
  arrowUpRight: <><path d="M7 17L17 7" /><path d="M7 7h10v10" /></>,
  circle: <circle cx="12" cy="12" r="8" />,
  square: <rect x="4" y="4" width="16" height="16" rx="2" />,
  undo: <><path d="M9 14L4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v1" /></>,
  windows: (
    <>
      <path d="M4 5.3 10.5 4.4v6.6H4z" fill="currentColor" stroke="none" />
      <path d="M12 4.2 20 3v8h-8z" fill="currentColor" stroke="none" />
      <path d="M4 13h6.5v6.6L4 18.7z" fill="currentColor" stroke="none" />
      <path d="M12 13H20v8l-8-1.2z" fill="currentColor" stroke="none" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
}

/** Decorative line icon. Give the parent control an accessible name. */
export function Icon({ name, size = 18, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
