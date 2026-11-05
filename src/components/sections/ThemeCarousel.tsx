import { useCallback, useId, useRef, useState } from 'react';
import type { ThemeItem } from '../../data/copy/craft';
import { Icon } from '../ui/Icon';

interface ThemeCarouselProps {
  readonly themes: readonly ThemeItem[];
}

export function ThemeCarousel({ themes }: ThemeCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const carouselId = useId();

  const total = themes.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % total) + total) % total);
    },
    [total],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(total - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      touchStartX.current = touch.clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    if (touch && touchStartX.current !== null) {
      const diff = touch.clientX - touchStartX.current;
      if (Math.abs(diff) > 40) {
        if (diff > 0) goPrev();
        else goNext();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      id={carouselId}
      className="theme-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Frameshelf Studio Color Palettes"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="theme-carousel__stage" aria-live="polite">
        {themes.map((theme, i) => {
          let offset = i - activeIndex;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isCurrent = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          return (
            <article
              key={theme.id}
              data-theme={theme.id}
              data-offset={isVisible ? offset : 'hidden'}
              data-active={isCurrent || undefined}
              className={`theme-card ${isCurrent ? 'is-active' : ''} ${!isVisible ? 'is-hidden' : ''}`}
              aria-hidden={!isCurrent}
              aria-label={`${theme.name} (${theme.kind})`}
              onClick={() => {
                if (!isCurrent) goTo(i);
              }}
            >
              <div className="theme-card__palette" aria-hidden="true">
                <div className="theme-card__band theme-card__band--1" />
                <div className="theme-card__band theme-card__band--2" />
                <div className="theme-card__band theme-card__band--3" />
                <div className="theme-card__band theme-card__band--4" />

                <span className={`theme-card__badge theme-card__badge--${theme.kind.toLowerCase()}`}>
                  {theme.kind}
                </span>
              </div>

              <div className="theme-card__info">
                <div className="theme-card__meta">
                  <div className="theme-card__title-row">
                    <span className="theme-card__name">{theme.name}</span>
                    {theme.isDefault && <span className="theme-card__default">Default</span>}
                  </div>
                  <p className="theme-card__vibe">{theme.vibe}</p>
                </div>

                <div className="theme-card__dots" aria-hidden="true">
                  <span className="theme-card__dot theme-card__dot--3" />
                  <span className="theme-card__dot theme-card__dot--4" />
                  <span className="theme-card__dot theme-card__dot--1" />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="theme-carousel__controls">
        <button
          type="button"
          className="theme-carousel__nav-btn"
          aria-label="Previous theme"
          onClick={goPrev}
        >
          <Icon name="arrowLeft" size={16} />
        </button>

        <div className="theme-carousel__pills" role="tablist" aria-label="Theme selector">
          {themes.map((theme, i) => (
            <button
              key={theme.id}
              type="button"
              role="tab"
              data-theme={theme.id}
              aria-selected={i === activeIndex}
              aria-label={theme.name}
              className={`theme-carousel__pill ${i === activeIndex ? 'is-active' : ''}`}
              onClick={() => goTo(i)}
            >
              <span className="theme-carousel__pill-dot" aria-hidden="true" />
              <span className="theme-carousel__pill-label">{theme.name}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="theme-carousel__nav-btn"
          aria-label="Next theme"
          onClick={goNext}
        >
          <Icon name="arrowRight" size={16} />
        </button>
      </div>
    </div>
  );
}
