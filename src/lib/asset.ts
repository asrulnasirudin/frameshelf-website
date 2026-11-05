/** Resolves a public-folder path against the deploy base (e.g. /frameshelf-landing-page/). */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\/+/, '')}`;
}

/** Builds a srcSet string from a small and optional 2x rendition. */
export function srcSet(src: string, src2x?: string, smallWidth = 480, largeWidth = 960): string | undefined {
  return src2x ? `${asset(src)} ${smallWidth}w, ${asset(src2x)} ${largeWidth}w` : undefined;
}
