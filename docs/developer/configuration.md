# Configuration and secrets

How FRAMESHELF LANDING PAGE handles build-time settings, public destinations, and secrets.

- Real secret values live in `.env` (or the operating system's credential store). They are never committed, logged or copied into documents.
- `.env.example` lists build settings by **name** with placeholder values.
- Code never contains API keys, tokens or passwords; this static site uses no runtime secrets or external APIs.
- If a secret is ever committed, treat it as leaked: revoke and replace it, then clean the history deliberately with the owner's approval.

## Environment variables (build time)

| Name | Default | Purpose |
|------|---------|---------|
| `SITE_BASE` | `/frameshelf-landing-page/` | URL base path passed to Vite (`vite.config.ts`). Set to `/<repo-name>/` for a GitHub Pages project site, or `/` for a custom root domain. |

## Typed site configuration (`src/config/site.ts`)

Public-facing release labels and outbound destinations live in `src/config/site.ts`:

- `site.siteUrl`: `string | null` — final public URL (with trailing slash). Leave `null` until the public domain/Pages URL is confirmed; setting it enables `<link rel="canonical">`, `og:url`, and `og:image` URL tags during `npm run build`.
- `site.release`: `{ platform, stage }` — currently `Windows · Internal beta`.
- `site.destinations.contactEmail`: owner-approved public email for `Request access` and `Contact` `mailto:` links, or `null` to omit them.
- `site.destinations.download`, `repository`, `support`: `string | null` — set to `null` while unapproved so dependent links are omitted automatically.
