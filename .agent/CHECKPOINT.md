# Checkpoint

Where the project is right now. Rewrite (don't append) at each clean checkpoint. Target: under 80 lines.

**POLISHED CANDIDATE READY FOR OWNER REVIEW — UNCOMMITTED**

- Date: 2026-11-04
- Branch / worktree: `main` (standalone landing-page repository)
- Git state: uncommitted working tree (`commit_policy: ask`; awaiting owner review before committing)
- Built:
  - Strict 4pt/8pt UI spacing system based on UXLAB Academy principles (`ui-spacing-system` skill deployed globally and in project), eliminating all arbitrary odd/fractional pixels across `src/styles/` in favor of mathematically harmonious tokens (`--space-1` = 4px through `--space-12` = 96px) with strict Gestalt proximity grouping, Container Law enforcement (internal padding <= external margin/gap), and symmetrical insets across buttons, docks, inputs, cards, and micro-mockups.
  - React 19 + strict TypeScript + Vite 7 landing page with plain CSS custom-property tokens (`src/styles/`), self-hosted `Inter` variable font, and balanced vertical section pacing (`--section-y: clamp(56px, 4.5vw, 92px)`).
  - Authentic Frameshelf application UI showcases across all three "How it works" workflow cards (`public/media/workflow/`): Step 1 selective folder import checklist dialog, Step 2 Wall with Project Shelves and reference cards, and Step 3 Studio timeline with In/Out range loop and Moments inspector.
  - 3-Stage Visual Pipeline for Review Rooms (`#collaboration`): Stage 1 animated Studio transport preview with 24fps ticking timecode, scrubber playhead looping across waveform In/Out marks, active filmstrip cells, live recording dot, and interactive Play/Pause/Step controls; Stage 2 animated Frame Markup Studio with tool selection, progressive arrow & circle drawing, live typed captioning, and private draft save confirmation; and Stage 3 animated Review Room discussion workspace (macro view) with annotated frame thumbnail, Director reply typing, status stamp flipping to "Resolved ✓", and local network storage sync reassurance (`room.json`), backed by a 3-point local-first architecture guarantee banner.
  - WhisperBar-style dark glass capsule CTA buttons with animated conic specular rim borders via `@property --border-angle`, high-contrast white typography, and reduced-motion safety.
  - Full animation parity on the curated 3×2 Wall (`Browse` mode): active visual motion on all dynamic references (`bounce_study` 24fps lightbox loop, `walk_cycle` 6-pose keyframe stepping spotlight with live pose labels, `linen_wind` billowing fabric simulation, `smoke_wisps` fluid plume turbulence, and calm high-res treatment for `forest` and `hands` stills) with cursor-tracking scrubbers and reduced-motion safety.
  - Centered single-column Hero flow with balanced 54ch lead typography and direct CTA progression.
  - Authentic animation line-test / lightbox exposure sheet (48 SVG frames + poster) with 12-field grid, ACME registration pegs, non-repro cyan guides, and volume-preserving squash & stretch.
  - Elevated Benefit 2 & 3 visuals with filmstrip exposure cells and a structured Studio Moment Inspector panel.
  - Build-time HTML prerender (`scripts/prerender.mjs`) injecting server-rendered markup into `dist/index.html` with `<noscript>` and error-boundary Wall screenshot fallbacks.
  - Interactive three-mode preview (`Browse`, `Organize`, `Study`) with detached external showroom controls, authentic simulated application titlebar (`Frameshelf / Mode` with window controls and `Local library` status), preserved playback state across tabs, keyboard/mouse/touch controls, In/Out range loop, and Moment saving.
  - Typed release/destination config (`src/config/site.ts`) with owner-approved contact email (`asrul.nasirudin@gmail.com`), `null` placeholders for unapproved download/repo/support URLs, right-aligned sample media credits, bottom footer copyright bar (`© 2026 Kriio Works.`), and removal of the unneeded static-site privacy callout.
  - Manual-only GitHub Pages workflow (`.github/workflows/pages.yml`, `workflow_dispatch`) uploading `dist/` only, plus `1200×630` social preview card (`public/og-image.png`).
  - Complete documentation (`PROJECT_SPEC.md`, `README.md`, `CHANGELOG.md`, `docs/user/README.md`, `docs/developer/{README,sitemap,configuration,claims-ledger}.md`).
- Verified:
  - `npm run typecheck` (0 errors), `npm run lint` (0 errors, 0 warnings), `npm test` (7/7 pass), `npm run build` (HTML prerender OK), `python .agent/check.py` (OK), `python .agent/safety_check.py` (0 failures, 0 warnings).
  - Headless CDP browser suite across `360px`, `768px`, `1024px`, and `1440px`: 0 console/hydration errors, 0 failed network requests, 0 horizontal overflow, full interactive control pass, keyboard navigation, `prefers-reduced-motion: reduce`, JS-disabled rendering, and missing-media fallbacks.
- Remaining owner items before public launch:
  - Final public GitHub Pages repository name and `siteUrl` (to enable canonical/Open Graph URL tags in `src/config/site.ts`).
  - Optional replacement of generated sample stills/clip with owner-shot footage when desired.
  - Owner authorization before any Git commit, remote creation, push, or Pages workflow run.
