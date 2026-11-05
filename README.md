# Frameshelf Landing Page

Marketing website and interactive browser preview for **Frameshelf** — a local-first visual reference library for videos and images on Windows.

Built with **React**, **strict TypeScript**, **Vite**, **plain CSS custom-property tokens**, and a **build-time HTML prerender step** (`react-dom/server`) so marketing copy remains readable without JavaScript.

---

## Requirements

- **Node.js** `>= 22.13`
- **npm** (ships with Node.js)

---

## Setup and local development

```bash
# Install locked dependencies
npm ci

# Start Vite dev server (serves under /frameshelf-landing-page/ by default)
npm run dev
```

Open the URL printed by Vite (typically `http://localhost:5173/frameshelf-landing-page/`).

---

## Build, preview, and checks

```bash
# Strict TypeScript check
npm run typecheck

# ESLint across source, scripts, and tests
npm run lint

# Unit tests for preview filtering, frame stepping, range looping, and timecode
npm test

# Production build + SSR HTML prerender into dist/
npm run build

# Serve the production dist/ under the intended GitHub Pages subpath
npm run preview
```

To build and preview under a different project subpath (for example `/frameshelf/`):

```powershell
# PowerShell
$env:SITE_BASE = '/frameshelf/'
npm run build
npm run preview
```

```bash
# Bash
SITE_BASE=/frameshelf/ npm run build
SITE_BASE=/frameshelf/ npm run preview
```

Repository governance checks (require Python 3 standard library):

```bash
python .agent/check.py
python .agent/safety_check.py
```

---

## Configuration

### Release status and destinations (`src/config/site.ts`)

All release labels, canonical URL state, and outbound links live in one typed file: `src/config/site.ts`.

- `site.release`: `{ platform: 'Windows', stage: 'Internal beta' }`
- `site.siteUrl`: `string | null` — leave `null` until the final public URL is confirmed. Setting a trailing-slash URL (e.g. `'https://example.github.io/frameshelf/'`) automatically emits `<link rel="canonical">`, `og:url`, `og:image`, and `twitter:image` tags at build time.
- `site.destinations`:
  - `contactEmail`: `'asrul.nasirudin@gmail.com'` (powers **Request access** and **Contact** `mailto:` actions)
  - `download`: `null` (hidden while Frameshelf is an internal beta)
  - `repository`: `null` (hidden until a public project URL is approved)
  - `support`: `null` (hidden until a public support page exists)

Setting any destination to `null` cleanly omits its buttons and links across the page.

### Swapping sample media (`src/data/sampleLibrary.ts`)

The interactive preview uses swappable local assets declared in `src/data/sampleLibrary.ts`:

1. Drop replacement high-resolution stills (`.png` or `.jpg`) into `local/production-assets/generated/` (git-ignored).
2. On Windows, run:
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/optimize-images.ps1
   ```
   This outputs `480px` and `960px` JPEG renditions into `public/media/library/`.
3. Update `sampleItems` in `src/data/sampleLibrary.ts` with matching filenames, dimensions, `alt` descriptions, and tags.
4. To replace the Study frame sequence, place sequential frames in `public/media/study/` (or customize `scripts/generate-study-frames.mjs`) and update `studyClip` in `src/data/sampleLibrary.ts`.

---

## Deployment to GitHub Pages (separate public website-only repository)

### Keeping the desktop application private

GitHub Free requires a **public** repository to publish a GitHub Pages site, whereas the Frameshelf Electron desktop application repository is **private**. To publish this website on GitHub Free Pages without exposing any desktop application source code:

1. Maintain **this directory as a standalone Git repository** completely separate from the Frameshelf application repository. Do not add the desktop repo as a submodule or copy internal reports, installers, or source files here.
2. Before pushing anywhere public, run `python .agent/safety_check.py` to verify zero secrets, watched media files, or `local/` artifacts are tracked.
3. With owner authorization, create a new public GitHub repository dedicated solely to the website (for example `<owner>/frameshelf` or `<owner>/frameshelf-landing-page`) and push `main`.
4. In the GitHub repository settings, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.

### Running the prepared workflow (`.github/workflows/pages.yml`)

- Deployment is **manual-only** (`workflow_dispatch`) until public publication is approved.
- Open **Actions → Deploy website to GitHub Pages → Run workflow**.
- Leave `base_path` blank to automatically build for `/<repository-name>/` (or enter `/` if using a custom root domain).
- The workflow runs `npm ci`, `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`, then uploads **only `dist/`** (never the repository root) and deploys to the `github-pages` environment.
- Once the public URL is live and confirmed, set `site.siteUrl` in `src/config/site.ts` and redeploy so canonical and social preview URLs are included.

---

## Credits

- **Brand artwork:** Frameshelf Flow FS vector symbol and wordmark (`public/brand/`), used with owner approval.
- **Product screenshot:** `public/media/screens/wall-overview-*.jpg` from the Frameshelf artist manual (`2.10.x`), showing synthetic sample items only (no personal paths, usernames, or client media).
- **Sample library stills & Study animation:** Original generated reference stills (`public/media/library/`) and procedurally drawn 48-frame bouncing-ball animation (`public/media/study/`, generated by `scripts/generate-study-frames.mjs`), created specifically for this landing page.
- **Typography:** [Inter](https://rsms.me/inter/) by Rasmus Andersson, licensed under the SIL Open Font License 1.1 (`public/fonts/Inter-LICENSE.txt`).

---

## Further documentation

- Product specification: `PROJECT_SPEC.md`
- Visitor guide: `docs/user/README.md`
- Maintainer guide & claims ledger: `docs/developer/README.md`, `docs/developer/claims-ledger.md`, `docs/developer/sitemap.md`, `docs/developer/configuration.md`
- Agent instructions: `AGENTS.md`
- Changelog: `CHANGELOG.md`
