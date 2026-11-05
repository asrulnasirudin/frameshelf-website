import { contactHref, releaseLabel, site } from '../../config/site';
import { footerCopy } from '../../data/copy';
import { Logo } from './Header';

export function Footer() {
  const contact = contactHref();
  const { repository, support } = site.destinations;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Logo height={24} />
            <p className="site-footer__status">{releaseLabel}</p>
          </div>
          <div className="site-footer__credits" id="credits">
            <p>{footerCopy.credits}</p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">{footerCopy.copyright}</p>
          <nav aria-label="Footer">
            <ul className="site-footer__links">
              {footerCopy.defaultLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
              {contact && (
                <li>
                  <a href={contact}>Contact</a>
                </li>
              )}
              {support && (
                <li>
                  <a href={support}>Support</a>
                </li>
              )}
              {repository && (
                <li>
                  <a href={repository}>Project</a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
