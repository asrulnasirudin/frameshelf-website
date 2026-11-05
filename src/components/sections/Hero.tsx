import { releaseLabel } from '../../config/site';
import { heroCopy } from '../../data/copy';
import { PreviewShell } from '../preview/PreviewShell';
import { PreviewBoundary, PreviewFallback } from '../preview/PreviewSupport';
import { Icon } from '../ui/Icon';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__content">
        <p className="status-pill">
          <span className="status-pill__dot" aria-hidden="true" />
          {releaseLabel}
        </p>
        <h1 id="hero-title" className="display-1">
          {heroCopy.titleLine1}
          <br />
          {heroCopy.titleLine2Pre}
          <span className="accent-text">{heroCopy.titleLine2Accent}</span>
        </h1>
        <p className="lead hero__lead">{heroCopy.lead}</p>
        <div className="cta-row cta-row--center hero__cta">
          <a className="btn btn--accent btn--lg" href={heroCopy.ctaPrimary.href}>
            {heroCopy.ctaPrimary.label}
            <Icon name="arrowRight" size={18} />
          </a>
          <a className="btn btn--ghost btn--lg" href={heroCopy.ctaSecondary.href}>
            {heroCopy.ctaSecondary.label}
          </a>
        </div>
        <p className="hero__platform-note">
          <Icon name="windows" size={12} />
          <span>Built natively for Windows 10 &amp; 11 (64-bit)</span>
        </p>
      </div>
    </section>
  );
}

export function PreviewSection() {
  return (
    <section className="preview-section" id="preview" aria-labelledby="preview-title">
      <div className="container container--wide">
        <h2 id="preview-title" className="sr-only">
          Interactive preview
        </h2>
        <PreviewBoundary>
          <PreviewShell />
        </PreviewBoundary>
        <noscript>
          <div className="preview-frame">
            <PreviewFallback reason="nojs" />
          </div>
        </noscript>
        <p className="preview-section__note">
          A simplified simulation in your browser, using sample media. It cannot see your files. In Frameshelf, Studio
          plays your own footage in a desktop player.
        </p>
      </div>
    </section>
  );
}
