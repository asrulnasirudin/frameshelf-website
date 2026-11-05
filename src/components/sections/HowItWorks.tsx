import { howItWorksCopy } from '../../data/copy';
import { asset } from '../../lib/asset';
import { Icon } from '../ui/Icon';

export function HowItWorks() {
  const { eyebrow, titleLines, steps } = howItWorksCopy;

  return (
    <section className="how" id="how-it-works" aria-labelledby="how-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="how-title" className="display-2">
            {titleLines[0]}
            <br />
            {titleLines[1]}
          </h2>
        </div>
        <ol className="steps">
          {steps.map((step) => (
            <li className="step reveal" key={step.title}>
              <div className="step__preview">
                <div className="step__preview-bar" aria-hidden="true">
                  <span className="step__preview-dots">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className="step__preview-caption">{step.caption}</span>
                </div>
                <div className="step__preview-media">
                  <img
                    src={asset(step.image1600)}
                    srcSet={`${asset(step.image800)} 800w, ${asset(step.image1600)} 1600w`}
                    sizes="(max-width: 900px) 100vw, 380px"
                    alt={step.imageAlt}
                    width="800"
                    height="500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="step__content">
                <div className="step__meta">
                  <span className="step__num" aria-hidden="true">
                    {step.num}
                  </span>
                  <span className="step__icon" aria-hidden="true">
                    <Icon name={step.icon} size={18} />
                  </span>
                </div>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="formats reveal">
          Supports MP4, MOV, MKV and WebM video, and JPEG, PNG and WebP images.
        </p>
      </div>
    </section>
  );
}
