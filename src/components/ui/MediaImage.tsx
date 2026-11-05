import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';
import { Icon } from './Icon';

interface MediaImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
}

/**
 * Renders a standard <img> during SSR and normal loads, and switches to a calm
 * framed placeholder if the image fails to load so cards and viewers keep
 * their geometry and remain legible.
 *
 * Avoids re-render loops on rapid src changes (e.g. 24fps frame scrubbing)
 * by only updating state if the current src actually fails.
 */
export function MediaImage({ src, alt = '', fallbackLabel, onError, ...rest }: MediaImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [brokenSrc, setBrokenSrc] = useState<string | null>(null);

  // Check if image failed before hydration on initial mount
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0 && src) {
      setBrokenSrc(src);
    }
  }, [src]);

  const isBroken = Boolean(src && brokenSrc === src);

  if (isBroken) {
    return alt ? (
      <span className="media-fallback" role="img" aria-label={alt}>
        <Icon name="image" size={20} />
        <span>{fallbackLabel ?? 'Preview unavailable'}</span>
      </span>
    ) : (
      <span className="media-fallback" aria-hidden="true">
        <Icon name="image" size={18} />
        {fallbackLabel && <span>{fallbackLabel}</span>}
      </span>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      {...rest}
      onError={(event) => {
        if (src) setBrokenSrc(src);
        onError?.(event);
      }}
    />
  );
}
