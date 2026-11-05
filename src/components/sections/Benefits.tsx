import { benefitsCopy } from '../../data/copy';
import { studyClip } from '../../data/sampleLibrary';
import { asset } from '../../lib/asset';
import { PreviewModeLink } from '../preview/PreviewSupport';
import { timecode } from '../preview/previewLogic';
import { Icon } from '../ui/Icon';
import { MediaImage } from '../ui/MediaImage';
import { WallComparisonPreview } from './WallComparisonPreview';

function Points({ items }: { items: readonly string[] }) {
  return (
    <ul className="points">
      {items.map((item) => (
        <li key={item}>
          <Icon name="check" size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Benefits() {
  const { browse, study, organize } = benefitsCopy;

  return (
    <div id="features" className="features">
      <section className="feature" aria-labelledby="feature-find">
        <div className="container feature__grid">
          <div className="feature__copy reveal">
            <p className="eyebrow">{browse.eyebrow}</p>
            <h2 id="feature-find" className="display-2">
              {browse.titleLines[0]}
              <br />
              {browse.titleLines[1]}
            </h2>
            <p className="body-lg">{browse.body}</p>
            <Points items={browse.points} />
            <PreviewModeLink mode="browse">{browse.cta}</PreviewModeLink>
          </div>
          <div className="feature__visual reveal">
            <WallComparisonPreview />
            {browse.image && (
              <noscript>
                <figure className="shot">
                  <MediaImage
                    src={asset(browse.image.src1600)}
                    srcSet={`${asset(browse.image.src800)} 800w, ${asset(browse.image.src1600)} 1600w`}
                    sizes="(min-width: 1000px) 640px, 92vw"
                    width="1600"
                    height="970"
                    alt={browse.image.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>{browse.image.caption}</figcaption>
                </figure>
              </noscript>
            )}
          </div>
        </div>
      </section>

      <section className="feature feature--flip" aria-labelledby="feature-study">
        <div className="container feature__grid">
          <div className="feature__copy reveal">
            <p className="eyebrow">{study.eyebrow}</p>
            <h2 id="feature-study" className="display-2">
              {study.titleLines[0]}
              <br />
              {study.titleLines[1]}
            </h2>
            <p className="body-lg">{study.body}</p>
            <Points items={study.points} />
            {study.finePrint && <p className="fine-print">{study.finePrint}</p>}
            <PreviewModeLink mode="study">{study.cta}</PreviewModeLink>
          </div>
          <div className="feature__visual reveal" aria-hidden="true">
            <FilmstripVisual />
          </div>
        </div>
      </section>

      <section className="feature" aria-labelledby="feature-organize">
        <div className="container feature__grid">
          <div className="feature__copy reveal">
            <p className="eyebrow">{organize.eyebrow}</p>
            <h2 id="feature-organize" className="display-2">
              {organize.titleLines[0]}
              <br />
              {organize.titleLines[1]}
            </h2>
            <p className="body-lg">{organize.body}</p>
            <Points items={organize.points} />
            <PreviewModeLink mode="organize">{organize.cta}</PreviewModeLink>
          </div>
          <div className="feature__visual reveal" aria-hidden="true">
            <OrganizeVisual />
          </div>
        </div>
      </section>
    </div>
  );
}

const stripFrames = [6, 8, 10, 12, 14] as const;

function FilmstripVisual() {
  return (
    <div className="vis-study">
      <div className="vis-study__viewer">
        <img src={asset(studyClip.frame(10))} width={studyClip.width} height={studyClip.height} alt="" loading="lazy" />
        <span className="vis-study__badge">Looping · 6–14</span>
      </div>
      <div className="vis-study__strip">
        {stripFrames.map((f) => (
          <div className="vis-study__cell" data-current={f === 10 || undefined} key={f}>
            <img src={asset(studyClip.frame(f))} width="192" height="108" alt="" loading="lazy" />
            <span>{f}</span>
          </div>
        ))}
      </div>
      <div className="vis-study__bar">
        <span className="vis-chip">In [ 6</span>
        <span className="vis-chip">Out ] 14</span>
        <span className="vis-readout">
          Frame <b>10</b> {timecode(10, studyClip.fps)} <em>{studyClip.fps} fps</em>
        </span>
      </div>
    </div>
  );
}

function OrganizeVisual() {
  return (
    <div className="vis-organize">
      <div className="vis-organize__header">
        <span className="vis-organize__title">
          <Icon name="bookmark" size={14} /> Moment Inspector
        </span>
        <span className="vis-organize__file">dancer-turn.mp4</span>
      </div>
      <div className="vis-moment">
        <img src={asset('media/library/dancer-turn-480.jpg')} width="480" height="643" alt="" loading="lazy" />
        <div className="vis-moment__body">
          <span className="vis-moment__tc">▶ 00:00:02:14 · F 114</span>
          <span className="vis-moment__title">Spot turn: head leads the body</span>
          <span className="vis-moment__note">Check the fabric settle after the turn.</span>
          <span className="vis-moment__scope">
            <Icon name="lock" size={12} /> Private moment
          </span>
        </div>
      </div>
      <div className="vis-organize__section">
        <span className="vis-organize__section-label">Board collections</span>
        <div className="vis-boards">
          <span className="vis-board" data-on>
            <Icon name="board" size={14} /> Choreography <Icon name="check" size={13} />
          </span>
          <span className="vis-board" data-on>
            <Icon name="board" size={14} /> Lighting references <Icon name="check" size={13} />
          </span>
          <span className="vis-board">
            <Icon name="board" size={14} /> Timing &amp; spacing
          </span>
        </div>
      </div>
      <div className="vis-organize__footer">
        <div className="vis-tags">
          <span>
            <Icon name="tag" size={12} /> Movement
          </span>
          <span>
            <Icon name="tag" size={12} /> Lighting
          </span>
        </div>
        <span className="vis-heart">
          <Icon name="heart" size={13} /> Favourite
        </span>
      </div>
    </div>
  );
}
