# Memory

Durable context a new agent should know without chat history. Target: under 150 lines.

**Allowed:** product identity and principles, terminology, owner preferences that affect development, workflows, historical context, rejected approaches and why, constraints, assumptions, UX principles, conventions.
**Never:** chat transcripts, chronological dumps, copies of `PROJECT_SPEC.md` / `DECISIONS.md` / `CHECKPOINT.md`, or any secret or private data (keys, passwords, tokens, account details, private addresses, financial or unrelated personal information).
**Precedence:** `PROJECT_SPEC.md` > `DECISIONS.md` > `CHECKPOINT.md` > this file. This file never overrides them.
**Update only at a clean checkpoint**, and only if durable knowledge changed. Do not invent past decisions or preferences.

## Product identity
- Name: FRAMESHELF LANDING PAGE
- Subject: Public marketing site and browser simulation for **Frameshelf**, a local-first visual reference library for videos and images on Windows (currently in unsigned internal beta).

## Established setup & stack
- Standalone website repository, kept strictly separate from the private Frameshelf Electron repository so GitHub Free Pages can publish without exposing desktop source code.
- Stack: React 19 + strict TypeScript + Vite 7 + plain CSS custom-property tokens + build-time `react-dom/server` prerender (`scripts/prerender.mjs`).
- Subpath-safe asset resolution via `asset()` (`src/lib/asset.ts`) and `SITE_BASE` (defaults to `/frameshelf-landing-page/`).

## Confirmed product principles & terminology
- **Shelves**: folders registered in the library without moving or modifying source media.
- **Projects**: local groupings of Shelves.
- **Boards, tags, Favourites**: personal organization tools.
- **Studio**: desktop playback workspace with single-frame stepping, timecode, session-only In/Out range looping, and private **Moments** / frame annotations.
- **Review Rooms**: optional collaboration through a user-configured shared folder; sharing is always reviewed and confirmed, never automatic cloud sync.
- Do not claim Compare, AI tagging, infinite moodboard canvas, cloud sync, Mac/Linux support, open-source licensing, or public installer downloads unless newly shipped and owner-approved.

## Owner preferences that affect development
- Visual direction inspired by WhisperBar: warm dark canvas (`#0b0a09`), generous spacing, strong display typography with deliberate breaks, concise calm copy, single brand accent (`#d97757` from Flow FS mark), restrained CSS motion.
- Original generated sample media (`src/data/sampleLibrary.ts`) designed to be swapped easily without touching UI components.
- Outbound destinations and release stage live only in `src/config/site.ts`; unapproved destinations stay `null`.

## Rejected approaches (and why)
- Tailwind, component libraries, animation libraries, backends, databases, and analytics/trackers (excluded by owner brief for maintainability, performance, and privacy).
- Presenting ordinary HTML `<video>` browser seeking as frame-accurate desktop playback (Study mode uses a discrete 48-frame SVG image sequence instead).
