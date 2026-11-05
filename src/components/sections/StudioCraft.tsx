import { craftCopy, type CraftFeatureCard } from '../../data/copy/craft';
import { asset } from '../../lib/asset';
import { MediaImage } from '../ui/MediaImage';
import { ThemeCarousel } from './ThemeCarousel';

function FeatureCard({ card, headingId }: { readonly card: CraftFeatureCard; readonly headingId: string }) {
  return (
    <article className="craft-card reveal" aria-labelledby={headingId}>
      <div className="craft-card__preview">
        <div className="craft-card__bar" aria-hidden="true">
          <span className="craft-card__dots">
            <span />
            <span />
            <span />
          </span>
          <span className="craft-card__caption">{card.caption}</span>
        </div>
        <div className="craft-card__media">
          <MediaImage
            src={asset(card.image1600)}
            srcSet={`${asset(card.image800)} 800w, ${asset(card.image1600)} 1600w`}
            sizes="(max-width: 960px) 92vw, 560px"
            width="1600"
            height="960"
            alt={card.imageAlt}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="craft-card__content">
        <span className="craft-card__eyebrow">{card.eyebrow}</span>
        <h3 id={headingId} className="craft-card__title">
          {card.title}
        </h3>
        <p className="craft-card__body">{card.body}</p>
        <ul className="craft-card__tags" aria-label={`${card.title} highlights`}>
          {card.tags.map((tag) => (
            <li key={tag} className="craft-card__tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function StudioCraft() {
  const { viewers, modernUi, themes } = craftCopy;

  return (
    <section id="craft" className="craft-section" aria-labelledby="craft-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">{craftCopy.eyebrow}</p>
          <h2 id="craft-title" className="display-2">
            {craftCopy.titleLines[0]}
            <br />
            {craftCopy.titleLines[1]}
          </h2>
          <p className="lead">{craftCopy.lead}</p>
        </div>

        <div className="craft-bento">
          <FeatureCard card={viewers} headingId="card-viewers-title" />
          <FeatureCard card={modernUi} headingId="card-modern-ui-title" />
        </div>

        <div className="craft-themes-section reveal">
          <div className="section-head">
            <p className="eyebrow">{themes.eyebrow}</p>
            <h3 className="display-2">
              {themes.titleLines[0]}
              <br />
              {themes.titleLines[1]}
            </h3>
            <p className="lead">{themes.body}</p>
          </div>

          <ThemeCarousel themes={themes.list} />
        </div>
      </div>
    </section>
  );
}
