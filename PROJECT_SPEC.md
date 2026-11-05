# FRAMESHELF LANDING PAGE: project specification

Created 2026-11-04. This is the source of truth for **what** we are building.
Sections 7, 11 and 13–16 were completed on 2026-11-04 from the owner's approved
landing-page brief and answers.

## 1. Project identity
- Name: FRAMESHELF LANDING PAGE (`frameshelf-landing-page`)
- Category: Website

## 2. Product description
A single-page marketing website that introduces Frameshelf, a local-first visual
reference library for videos and images (Windows desktop application), and lets
visitors try a small interactive simulation of its workflow.

## 3. Target users
Public visitors: creative artists, animators, motion designers, illustrators,
photographers, videographers, filmmakers, editors, directors and hobbyists who
collect and study visual references.

## 4. Problem being solved
References become scattered across folders, filenames say little about a shot, and
previewing clips and images in standard Windows File Explorer is slow. Artists lose
time reopening clips, locating a moment and remembering why they saved it.

## 5. Goals
- Make Frameshelf understandable within a few seconds.
- Show faster visual access to video and image collections.
- Prove value through an interactive preview that needs no installation.
- Give interested visitors one valid way to get in touch.

## 6. Non-goals
- Frameshelf is not a video or image editor, and the site must not imply editing.
- No downloads, installers, accounts, pricing, licensing claims, testimonials or
  invented metrics while the product is an internal beta.
- No backend, database, tracking or third-party scripts.
- The site never accesses visitors' files.

## 7. Functional requirements
1. One page: navigation, hero, interactive preview, three benefit sections, How it
   works, local-first and file safety, optional collaboration, FAQ, closing action,
   footer.
2. Interactive preview with three modes, Browse, Organize and Study, all running on
   local sample data in React state:
   - Browse: filename search, tag filters, an empty state with Reset, and hover
     details with touch and keyboard equivalents.
   - Organize: select an item, add it to a sample Board, mark a favourite, see
     confirmation, Reset.
   - Study: frame stepping through a real image sequence, a frame/time readout,
     In/Out marks with range looping, and saving a sample Moment.
3. Release status and destinations come from one typed configuration file. Missing
   destinations are omitted gracefully.
4. Marketing content is prerendered into the generated HTML and stays readable
   without JavaScript.
5. Sample media is original generated artwork that can be swapped by replacing
   files and editing the sample data file.
6. Product claims must match the current Frameshelf implementation (see
   `docs/developer/claims-ledger.md`).

## 8. Target platform
- The site: modern evergreen browsers on desktop and mobile.
- The advertised product: Windows only.

## 9. Host application
None. This website is a standalone project, separate from the Frameshelf
application repository, which it never modifies.

## 10. Technology stack
- React + TypeScript (strict) + Vite, plain CSS with custom-property design tokens.
- Build-time prerender using `react-dom/server`, with no server runtime.
- Static hosting on GitHub Pages, deployed by GitHub Actions.
- Decision record: `.agent/DECISIONS.md` (2026-11-04).

## 11. Architecture requirements
- Components are organized by responsibility (`layout`, `sections`, `preview`, `ui`).
  Sample data (`src/data`), site configuration (`src/config`) and styles
  (`src/styles`) are kept separate.
- Every asset URL is resolved through Vite's `BASE_URL` so the site works under a
  GitHub Pages project subpath.
- The demo uses React state only and installs no global shortcuts.

## 12. Dependencies and toolchain
- node: >=22.13
- Runtime: `react`, `react-dom`. Dev: `vite`, `@vitejs/plugin-react`,
  `@types/react`, `@types/react-dom`, TypeScript, ESLint (owner-approved 2026-11-04).

## 13. Security requirements
- Secrets (keys, tokens, passwords) never enter the repository, public or private.
  Use `.env`, kept out of Git; `.env.example` holds placeholders only.
- Local-only material: `local/`
- Files named `credentials.*`, `secrets.*`, `*.aep`, `*.prproj`, `*.psb`, `*.mov`,
  `*.mp4`, `*.mxf`, `*.wav`, `*.exr` are flagged for review, not ignored.
- No trackers, analytics or third-party scripts. No private paths, usernames,
  client names, internal reports or installers in published files.
- The owner-approved public contact email is the only personal detail published,
  and only through `src/config/site.ts`.

## 14. Testing requirements
- Automated: strict type check, ESLint, production build, and unit tests for
  preview logic (filtering, frame stepping, range looping) using `node:test`.
- Manual or browser-driven: 360/768/1024/1440 widths, keyboard-only operation,
  reduced motion, no-JavaScript rendering, missing-media fallback and subpath
  preview. The checklist is `.agent/QA_CHECKLIST.md`.

## 15. Distribution requirements
- GitHub Pages from a separate, public, website-only repository. The Frameshelf
  application repository stays private and separate.
- The Pages workflow is manual (`workflow_dispatch`) until the owner approves
  publication. The base path is derived from the repository name.
- No publishing, repository creation, visibility change, tag or push without
  explicit owner authorization.

## 16. Open questions
- Final public site URL (needed for canonical and Open Graph URLs).
- Whether real footage or authentic screenshots should replace the generated
  sample media later.
