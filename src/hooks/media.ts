import { useEffect, useState, type RefObject } from 'react';

/** True while the element is at least partly on screen. Defaults to false during prerender. */
export function useInView(ref: RefObject<Element | null>, rootMargin = '0px'): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false), {
      rootMargin,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

/** Starts loading the given image URLs once `enabled` becomes true. */
export function usePreloadImages(urls: readonly string[], enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;
    const images = urls.map((url) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = url;
      return img;
    });
    return () => {
      images.length = 0;
    };
  }, [urls, enabled]);
}
