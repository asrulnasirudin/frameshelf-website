# Decisions

Why important decisions were made. One entry each; newest first.

## 2026-11-05: Adoption of UXLAB UI Spacing System (4pt/8pt baseline grid)
- Decision: standardize all UI spacing across the landing page to a strict mathematical
  4pt/8pt baseline grid (`--space-1` = 4px through `--space-12` = 96px), codified in the
  permanent skill `ui-spacing-system`.
- Rules enforced:
  1. 4pt/8pt Multiples: all margins, paddings, gaps, and component micro-dimensions
     (dots, badges, thumbs) use exact multiples of 4px. All arbitrary fractional or odd
     pixel values (e.g., 2.5px, 5px, 7px, 11px, 13px, 14px, 18px, 26px) are eliminated.
  2. Gestalt Law of Proximity: related items (labels to fields, icons to text, title to description)
     are spaced strictly closer than unrelated containers.
  3. Container Law: internal card padding is always less than or equal to external margins and grid gaps,
     preventing visual tension and border suffocation.
  4. Symmetrical Insets: floating badges, corner pills, and overlays maintain uniform symmetrical offsets
     from card edges (8px).
- Why: replaces inconsistent, fractional "AI sloppy" spacing with a cohesive, professional, human-designed rhythm.

## 2026-11-04: aesthetic elevation and visual refinement
- Decision: elevate primary buttons to WhisperBar dark glass capsules with `@property --border-angle` rotating specular rim highlight; remove Wall card in-flow footers in favor of pure edge-to-edge thumbnails with floating corner pills and hover/focus/tap drawer; unify Hero flow to a centered single-column scan path; replace cartoon bounce graphic with authentic 12-field ACME peg animator line-test lightbox; eliminate 24fps re-render loop in `MediaImage` and preserve preview state across tab changes.
- Why: eliminate visual roughness and AI-like artifacts; achieve authentic artist-grade visual hierarchy matching WhisperBar art direction and production-grade software standards.

## 2026-11-04: separate website-only repository and subpath
- Decision: the website lives in this repository, separate from the private
  Frameshelf application. It deploys to GitHub Pages from a public, website-only
  repository. The Vite base path comes from `SITE_BASE`; the workflow sets it to
  `/<repository-name>/`, and the local default is `/frameshelf-landing-page/`.
- Why: the owner asked to keep the app repository separate from the website.
  GitHub Free Pages requires a public repository, and the app source must not be
  exposed.

## 2026-11-04: original generated sample media, swappable
- Decision: the demo uses original generated stills plus a procedurally drawn SVG
  frame sequence. All sample items are declared in `src/data/sampleLibrary.ts`, so
  media can be replaced without touching components.
- Why: owner choice. It avoids third-party rights and private footage.
- One authentic app screenshot (`02-wall-overview`, which contains synthetic sample
  media only) is used with owner approval. Screenshots showing personal names are
  excluded.

## 2026-11-04: React + TypeScript + Vite with build-time prerender
- Decision: replace the scaffolded "static HTML/CSS/JS, no build step" stack with
  React, strict TypeScript and Vite, plain CSS tokens, and a small prerender script
  that uses `react-dom/server`.
- Why a build step is needed: the owner's brief requires React for the interactive
  preview states, a subpath-safe asset pipeline for GitHub Pages, and prerendered
  HTML that remains readable without JavaScript. Hand-written static HTML could not
  share one component tree between the prerendered markup and the interactive demo.
- Rejected: Tailwind, component frameworks, animation libraries, backend or
  database (owner brief).

## 2026-11-04: public contact destination
- Decision: the owner-approved email is the only contact destination, exposed as a
  `mailto:` action from `src/config/site.ts`. Download, waitlist and repository
  actions stay disabled (`null`) until approved destinations exist.

## 2026-11-04: project scaffolded
- Decision: structure and layers chosen by the scaffolder (see `.project.json`).
- Why: starting point; change by recording a new decision here.
