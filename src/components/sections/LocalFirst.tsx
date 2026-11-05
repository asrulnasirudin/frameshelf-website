import { localFirstCopy } from '../../data/copy';
import { Icon } from '../ui/Icon';
import { AnimatedMarkupPreview } from './AnimatedMarkupPreview';
import { AnimatedReviewRoomPreview } from './AnimatedReviewRoomPreview';
import { AnimatedStudioPreview } from './AnimatedStudioPreview';

export function LocalFirst() {
  const { eyebrow, titleLines, lead, facts } = localFirstCopy;

  return (
    <section className="local" id="local-first" aria-labelledby="local-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="local-title" className="display-2">
            {titleLines[0]}
            <br />
            {titleLines[1]}
          </h2>
          <p className="lead">{lead}</p>
        </div>
        <ul className="facts">
          {facts.map((fact) => (
            <li className="fact reveal" key={fact.title}>
              <span className="fact__icon" aria-hidden="true">
                <Icon name={fact.icon} size={20} />
              </span>
              <div>
                <h3 className="fact__title">{fact.title}</h3>
                <p className="fact__text">{fact.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Collaboration() {
  const { eyebrow, titleLines, lead, stages } = localFirstCopy.collaboration;

  return (
    <section className="collab" id="collaboration" aria-labelledby="collab-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="collab-title" className="display-2">
            {titleLines[0]}
            <br />
            {titleLines[1]}
          </h2>
          <p className="lead">{lead}</p>
        </div>

        <ol className="collab__pipeline">
          {stages.map((stage) => (
            <li className="collab__step reveal" key={stage.title}>
              <div className="collab__step-preview">
                <div className="collab__step-bar" aria-hidden="true">
                  <span className="collab__step-dots">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className="collab__step-caption">{stage.caption}</span>
                </div>
                <div className="collab__step-media">
                  {stage.num === '01' ? (
                    <AnimatedStudioPreview />
                  ) : stage.num === '02' ? (
                    <AnimatedMarkupPreview />
                  ) : (
                    <AnimatedReviewRoomPreview />
                  )}
                </div>
              </div>
              <div className="collab__step-content">
                <div className="collab__step-meta">
                  <span className="collab__step-num" aria-hidden="true">
                    {stage.num}
                  </span>
                  <span className="collab__step-icon" aria-hidden="true">
                    <Icon name={stage.icon} size={18} />
                  </span>
                </div>
                <h3 className="collab__step-title">{stage.title}</h3>
                <p className="collab__step-text">{stage.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="collab__guarantee reveal">
          <div className="collab__guarantee-item">
            <span className="collab__guarantee-icon" aria-hidden="true">
              <Icon name="offline" size={20} />
            </span>
            <div>
              <h4 className="collab__guarantee-title">No cloud accounts or external servers</h4>
              <p className="collab__guarantee-text">Rooms use shared folders on your local network, NAS or file server.</p>
            </div>
          </div>
          <div className="collab__guarantee-item">
            <span className="collab__guarantee-icon" aria-hidden="true">
              <Icon name="lock" size={20} />
            </span>
            <div>
              <h4 className="collab__guarantee-title">Private until you confirm</h4>
              <p className="collab__guarantee-text">
                Nothing leaves your PC until you choose a room destination and approve what is shared.
              </p>
            </div>
          </div>
          <div className="collab__guarantee-item">
            <span className="collab__guarantee-icon" aria-hidden="true">
              <Icon name="film" size={20} />
            </span>
            <div>
              <h4 className="collab__guarantee-title">No forced library imports</h4>
              <p className="collab__guarantee-text">
                Teammates can read, reply and inspect annotations without adding the clip to their personal library.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
