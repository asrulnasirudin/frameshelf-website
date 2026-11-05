# Product claims ledger

Every product capability stated on the landing page is verified against the current Frameshelf `2.10.13` implementation and documentation. Unshipped or excluded features are omitted.

## Verified claims used on the page

| Page claim | Evidence in Frameshelf repository |
|------------|-----------------------------------|
| Local-first visual reference library for videos and images on Windows | `PROJECT_SPEC.md` §1, `src/domain/media.ts`, `src/application/services/imageService.ts`, `docs/guides/FRAMESHELF_ARTIST_MANUAL.md` |
| Supported formats: MP4, MOV, MKV, WebM video; JPEG, PNG, WebP images | `src/domain/video.ts`, `src/domain/media.ts`, `FRAMESHELF_ARTIST_MANUAL.md` ("Import your first folder") |
| Adding a folder registers a Shelf with selective subfolder choices; originals stay in place and read-only | `AGENTS.md` (2.10.7), `FRAMESHELF_ARTIST_MANUAL.md` ("Import your first folder"), `FileSystemPort` |
| Projects group Shelves (folders); Boards collect references; tags and Favourites organize personal items | `AGENTS.md` (ADR-031, 2.10.0), `FRAMESHELF_ARTIST_MANUAL.md` Part 1 |
| Wall view with `All / Videos / Images` switch, filename search, technical filters (fps, resolution, availability), and thumbnail colour matching | `PROJECT_SPEC.md` lines 247, 455, 1279; `FRAMESHELF_ARTIST_MANUAL.md` ("Find references with search and filters") |
| Images open in a dedicated viewer with zoom and pan | `PROJECT_SPEC.md` line 504; `FRAMESHELF_ARTIST_MANUAL.md` ("Open and inspect an image") |
| Studio desktop playback with single-frame stepping, timecode and frame readout, frame jump, playback speed, filmstrip and audio waveform | `FRAMESHELF_ARTIST_MANUAL.md` Part 2 |
| Session-only In/Out marks and range looping that never trim or alter source files | `AGENTS.md` (2.10.0), `FRAMESHELF_ARTIST_MANUAL.md` ("Mark and repeat an In/Out range") |
| Private Moments with title/note and private Screenshot & Annotate stored locally | `AGENTS.md` (2.9.2, ADR-029), `FRAMESHELF_ARTIST_MANUAL.md` Part 3 |
| Optional local playback copies (explicitly downloaded and verified, managed in Settings) | `AGENTS.md` (`LOCAL_PLAYBACK_CACHE.md`), `FRAMESHELF_ARTIST_MANUAL.md` ("Use a local copy for smoother playback") |
| Dedicated Image Viewer with Fit / 1:1 Actual Size zoom, Dark, Light, and Checkerboard transparency inspection backgrounds | `PROJECT_SPEC.md` line 504; `FRAMESHELF_ARTIST_MANUAL.md` ("Open and inspect an image", lines 258–275) |
| Normal & Mosaic dual grid modes, continuous thumbnail scaling slider, and 3-state collapsible sidebar | `AGENTS.md` (2.10.0, 2.10.4), `FRAMESHELF_ARTIST_MANUAL.md` line 180 |
| 8 built-in studio themes (6 dark palettes and 2 light drafting modes) | `src/renderer/features/theme/themeRegistry.ts`, `themes.css`, `lightThemes.css`, `AGENTS.md` (2.9.3) |
| Optional Review Rooms via a team-configured shared folder, with reviewed/confirmed sharing and no hosted cloud service | `AGENTS.md` (2.9.3, 2.10.2), `FRAMESHELF_ARTIST_MANUAL.md` ("Use shared Moments and comments"), `REVIEW_ROOMS_TUTORIAL.md` |
| Release state: Windows internal beta (unsigned; not yet publicly distributed) | `AGENTS.md` (2.10.11–2.10.13), `packaging/DISTRIBUTION_READINESS.md` |

## Excluded claims (not advertised)

- Side-by-side Compare workspace (explicitly excluded from 2.10.x builds).
- AI tagging, automatic transcription, or semantic/prompt search.
- Freeform infinite reference canvas / moodboard canvas.
- Automatic background cloud sync or hosted collaboration accounts.
- macOS or Linux builds.
- Claims that Frameshelf is free, open source, or commercially priced.
