# Sitemap and content

## Pages

| Page | URL | Purpose | Content ready? |
|------|-----|---------|----------------|
| Home | `/` | Introduces Frameshelf, lets visitors try a three-mode interactive preview, explains workflow, local-first file safety, optional Review Rooms, and FAQ | yes |

## Section anchors and navigation

### Header navigation
- Brand logo (`#top`)
- `Preview` (`#preview`)
- `Features` (`#features`)
- `How it works` (`#how-it-works`)
- `FAQ` (`#faq`)
- Primary CTA: `Try the preview` (`#preview`)

### Page sections in order
1. Hero (`#hero-title`) — release status badge (`Windows · Internal beta`), headline, supporting copy, primary (`Try the preview`) and secondary (`See how it works`) actions.
2. Interactive preview (`#preview`) — React simulation with `Browse`, `Organize`, and `Study` tabs, plus a `<noscript>` and error-boundary Wall screenshot fallback.
3. Benefits (`#features`) — three alternating sections:
   - Find references visually (`#feature-find`)
   - Study the details (`#feature-study`)
   - Keep useful references organized (`#feature-organize`)
4. How it works (`#how-it-works`) — Add a folder, Browse and organize, Open a clip and save the moment, plus supported formats.
5. Local-first & file safety (`#local-first`).
6. Optional collaboration (`#collaboration`) — Review Rooms via a configured shared folder.
7. FAQ (`#faq`) — seven collapsible `<details>` answers.
8. Closing action (`#closing-title`) — `Request access` (`mailto:` when configured) and `Try the preview`.
9. Footer — Preview, Features, How it works, FAQ, Credits (`#credits`), copyright (`© 2026 Kriio Works.`), and conditional Contact / Support / Project links from `src/config/site.ts`.

## Design tokens

Defined in `src/styles/tokens.css`:
- **Palette:** warm near-black canvas (`#0b0a09`), raised surfaces (`#161514`–`#302e2b`), hairline borders, warm light text (`#f5f2ee` / `#b9b4ae` / `#8e8983`), and a single brand accent (`#d97757`, matching the Flow FS vector mark).
- **Typography:** self-hosted variable `Inter` (`public/fonts/InterVariable.woff2`) with system fallbacks and monospace (`Cascadia Mono` / `SF Mono` / `Consolas`) for timecodes and frame counters.
- **Spacing & layout:** 4px base scale, fluid section rhythm (`clamp(96px, 4.5rem + 7vw, 184px)`), `1200px` content container (`1320px` for the preview).
- **Motion:** restrained CSS transitions (`120ms` / `220ms` / `560ms`); zeroed under `prefers-reduced-motion: reduce`.

## SEO and metadata

- **Title:** `Frameshelf: your video and image references, within reach`
- **Description:** concise local-first Windows reference library summary in `index.html` and `src/config/site.ts`.
- **Icons & social preview:** `public/brand/frameshelf-icon.svg` and `public/og-image.png` (`1200×630`).
- **Canonical & Open Graph URLs:** injected by `scripts/prerender.mjs` only when `site.siteUrl` in `src/config/site.ts` is set to the approved public URL.

## Hosting and deployment

- Static build output in `dist/`, built with Vite (`SITE_BASE` defaults to `/frameshelf-landing-page/`).
- Deployed via `.github/workflows/pages.yml` (`workflow_dispatch` manual trigger) from a dedicated public website-only repository to GitHub Pages.
