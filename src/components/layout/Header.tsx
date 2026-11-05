import { useRef } from 'react';
import { asset } from '../../lib/asset';
import { Icon } from '../ui/Icon';

export const navLinks = [
  { href: '#preview', label: 'Preview' },
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#faq', label: 'FAQ' },
] as const;

export function Logo({ height = 26 }: { height?: number }) {
  return (
    <img
      className="logo"
      src={asset('brand/frameshelf-logo-dark.svg')}
      alt="Frameshelf"
      height={height}
      width={Math.round(height * (1150.22 / 280))}
    />
  );
}

export function Header() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => {
    if (menuRef.current) menuRef.current.open = false;
  };

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="site-header__brand" href="#top" aria-label="Frameshelf, back to top">
          <Logo />
        </a>
        <nav className="site-nav" aria-label="Primary">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn--accent btn--sm site-header__cta" href="#preview">
          Try the preview
        </a>
        <details className="nav-menu" ref={menuRef}>
          <summary className="icon-btn" aria-label="Menu">
            <Icon name="menu" size={20} />
          </summary>
          <nav className="nav-menu__panel" aria-label="Primary (mobile)">
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={closeMenu}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a className="btn btn--accent nav-menu__cta" href="#preview" onClick={closeMenu}>
              Try the preview
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
