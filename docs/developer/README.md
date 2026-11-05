# Developer documentation

Architecture, build pipeline, sample-media workflow, and deployment guide for **Frameshelf Landing Page**.

## Stack and structure

- **UI:** React 19 + strict TypeScript (`tsconfig.json`), bundled with Vite 7 (`vite.config.ts`).
- **Styling:** Plain CSS custom-property tokens (`src/styles/tokens.css`, `base.css`, `components.css`, `layout.css`, `sections.css`, `preview.css`). No CSS framework or runtime animation library.
- **Prerendering:** `npm run build` compiles the client bundle into `dist/`, compiles `src/entry-server.tsx` into `build/ssr/`, injects `renderToString(<App />)` into `dist/index.html` via `scripts/prerender.mjs`, and removes `build/`. Marketing copy and a `<noscript>` screenshot fallback work without JavaScript.
- **Subpath safety:** All public assets resolve through `asset()` (`src/lib/asset.ts`), which prepends `import.meta.env.BASE_URL` (configured via `SITE_BASE`, defaulting to `/frameshelf-landing-page/`).

## Key files

- `src/config/site.ts` — single typed configuration for release status, `siteUrl`, and nullable destinations (`contactEmail`, `download`, `repository`, `support`).
- `src/data/sampleLibrary.ts` — sample Wall items, tags, Boards, initial Moments, and Study frame-sequence descriptor.
- `src/components/preview/previewLogic.ts` — pure filtering, frame-stepping, In/Out range, and SMPTE timecode functions covered by `tests/previewLogic.test.ts`.
- `docs/developer/claims-ledger.md` — mapping between marketing copy and verified Frameshelf `2.10.13` features.
- `docs/developer/sitemap.md` — anchors, tokens, metadata, and hosting summary.
- `docs/developer/configuration.md` — build variables and typed config reference.

## Swapping sample media

1. Place new source stills (PNG or JPEG) in `local/production-assets/generated/` (git-ignored).
2. Run `powershell -ExecutionPolicy Bypass -File scripts/optimize-images.ps1` to generate `480px` and `960px` JPEG renditions in `public/media/library/`.
3. Update `sampleItems` in `src/data/sampleLibrary.ts` (dimensions, `alt`, filename, tags) and record any required attribution in `Footer.tsx` and root `README.md`.
4. To replace the Study frame sequence, place sequential frames in `public/media/study/` (or edit `scripts/generate-study-frames.mjs`) and update `studyClip` in `src/data/sampleLibrary.ts`.

## Publishing from a separate public repository

Because the Frameshelf desktop application repository is private, host this landing page from its own **public, website-only repository** so GitHub Free Pages can serve it without exposing desktop source code:

1. Keep this directory as an independent Git repository containing only the website source, approved brand SVGs, and sample media.
2. When approved by the owner, create a public GitHub repository (for example `frameshelf` or `frameshelf-landing-page`), push `main`, and set **Settings → Pages → Source** to **GitHub Actions**.
3. Trigger **Actions → Deploy website to GitHub Pages → Run workflow**. The workflow automatically derives `SITE_BASE` from the repository name (`/<repo-name>/`) and uploads only `dist/`.
