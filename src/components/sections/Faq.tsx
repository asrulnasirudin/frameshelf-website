import { requestAccessHref, site } from '../../config/site';
import { faqCopy } from '../../data/copy';
import { asset } from '../../lib/asset';
import { Icon } from '../ui/Icon';

export function Faq() {
  const access = requestAccessHref();
  const { eyebrow, titleLines, items } = faqCopy;

  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div className="section-head reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="faq-title" className="display-2">
            {titleLines[0]}
            <br />
            {titleLines[1]}
          </h2>
        </div>
        <div className="faq__list">
          {items.map((entry) => (
            <details className="faq__item" key={entry.q}>
              <summary>
                <span>{entry.q}</span>
                <span className="faq__mark" aria-hidden="true" />
              </summary>
              <div className="faq__answer">
                <p>
                  {entry.requiresAccessLink && access ? (
                    <>
                      {entry.a}{' '}
                      <a className="text-link" href={access}>
                        Email to request access
                      </a>{' '}
                      and tell us a little about how you work with references.
                    </>
                  ) : entry.requiresAccessLink ? (
                    `${entry.a} Availability will be announced on this page.`
                  ) : (
                    entry.a
                  )}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  const access = requestAccessHref();
  const { closing } = faqCopy;

  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="container closing__inner reveal">
        <img
          className="closing__mark"
          src={asset('brand/frameshelf-symbol.svg')}
          alt=""
          width="56"
          height="56"
          loading="lazy"
        />
        <h2 id="closing-title" className="display-1 display-1--closing">
          {closing.titleLines[0]}
          <br />
          {closing.titleLines[1]}
        </h2>
        <p className="lead">{closing.leadTemplate(site.name)}</p>
        <div className="cta-row cta-row--center">
          {access && (
            <a className="btn btn--accent btn--lg" href={access}>
              <Icon name="mail" size={18} />
              {closing.ctaLabel}
            </a>
          )}
          <a className={`btn btn--lg ${access ? 'btn--ghost' : 'btn--accent'}`} href="#preview">
            Try the preview
          </a>
        </div>
        <p className="closing__meta">
          <Icon name="windows" size={12} />
          <span>Windows 10 &amp; 11 only · Invite-only internal beta</span>
        </p>
      </div>
    </section>
  );
}
