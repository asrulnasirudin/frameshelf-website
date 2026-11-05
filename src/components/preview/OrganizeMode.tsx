import { useId, useState } from 'react';
import { boards, sampleItems, tags } from '../../data/sampleLibrary';
import { asset, srcSet } from '../../lib/asset';
import { Icon } from '../ui/Icon';
import { MediaImage } from '../ui/MediaImage';

interface OrganizeModeProps {
  favourites: ReadonlySet<string>;
  membership: Readonly<Record<string, readonly string[]>>;
  onToggleFavourite: (id: string) => void;
  onToggleBoard: (boardId: string, itemId: string) => void;
  onReset: () => void;
}

const pickable = sampleItems.slice(0, 8);

export function OrganizeMode({ favourites, membership, onToggleFavourite, onToggleBoard, onReset }: OrganizeModeProps) {
  const headingId = useId();
  const boardsId = useId();
  const [selectedId, setSelectedId] = useState<string>('bounce');
  const selected = sampleItems.find((i) => i.id === selectedId) ?? sampleItems[0]!;
  const isFavourite = favourites.has(selected.id);

  return (
    <div className="organize">
      <div className="organize__pick">
        <div className="organize__head">
          <h3 className="panel-title">Select a reference</h3>
          <button type="button" className="btn btn--ghost btn--sm" onClick={onReset}>
            <Icon name="reset" size={15} />
            Reset
          </button>
        </div>
        <ul className="pick-grid" aria-label="Sample references">
          {pickable.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="pick"
                aria-pressed={item.id === selectedId}
                onClick={() => setSelectedId(item.id)}
              >
                <MediaImage
                  src={asset(item.thumb.src)}
                  srcSet={srcSet(item.thumb.src, item.thumb.src2x)}
                  sizes="(min-width: 900px) 150px, 30vw"
                  width={item.thumb.width}
                  height={item.thumb.height}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span className="pick__name">{item.filename}</span>
                {favourites.has(item.id) && (
                  <span className="card__fav-dot" aria-hidden="true">
                    <Icon name="heart" size={12} />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="board-summary" aria-label="Boards in this session">
          {boards.map((board) => {
            const items = membership[board.id] ?? [];
            return (
              <div className="board-tile" key={board.id}>
                <div className="board-tile__stack" aria-hidden="true">
                  {items.slice(-3).map((id) => {
                    const it = sampleItems.find((s) => s.id === id);
                    return it ? <img key={id} src={asset(it.thumb.src)} alt="" width="40" height="40" /> : null;
                  })}
                  {items.length === 0 && <span className="board-tile__empty" />}
                </div>
                <div>
                  <p className="board-tile__name">{board.name}</p>
                  <p className="board-tile__count">
                    {items.length} {items.length === 1 ? 'reference' : 'references'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <aside className="inspector" aria-labelledby={headingId}>
        <div className="inspector__media">
          <MediaImage
            src={asset(selected.thumb.src2x ?? selected.thumb.src)}
            width={selected.thumb.width}
            height={selected.thumb.height}
            alt={selected.alt}
          />
        </div>
        <div className="inspector__head">
          <div className="inspector__title">
            <h3 id={headingId} className="inspector__name">
              {selected.filename}
            </h3>
            <p className="inspector__meta">
              {selected.kind === 'video' ? `Video · ${selected.duration} · ${selected.fps} fps` : 'Image'}
            </p>
          </div>
          <button
            type="button"
            className="icon-btn"
            aria-pressed={isFavourite}
            aria-label={isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
            onClick={() => onToggleFavourite(selected.id)}
          >
            <Icon name="heart" size={18} />
          </button>
        </div>

        <p className="eyebrow-label" id={boardsId}>
          Boards
        </p>
        <div className="check-list" role="group" aria-labelledby={boardsId}>
          {boards.map((board) => {
            const checked = (membership[board.id] ?? []).includes(selected.id);
            return (
              <label className="check-row" key={board.id} data-checked={checked || undefined}>
                <input type="checkbox" checked={checked} onChange={() => onToggleBoard(board.id, selected.id)} />
                <span className="check-row__box" aria-hidden="true">
                  <Icon name="check" size={13} />
                </span>
                <Icon name="board" size={16} className="check-row__icon" />
                <span className="check-row__label">{board.name}</span>
                {checked && <span className="check-row__state">Saved</span>}
              </label>
            );
          })}
        </div>

        <p className="eyebrow-label">Tags</p>
        <p className="tag-line">
          {selected.tags.map((t) => (
            <span className="tag" key={t}>
              <Icon name="tag" size={12} />
              {tags.find((x) => x.id === t)?.label}
            </span>
          ))}
        </p>
      </aside>
    </div>
  );
}
