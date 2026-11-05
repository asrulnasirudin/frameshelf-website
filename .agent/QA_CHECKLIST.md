# QA checklist

What must be validated before work counts as done.

- [x] `PROJECT_SPEC.md` has no TODO or TO CONFIRM left
- [x] Tests pass (`npm test`: 7/7 `node:test` unit tests pass)
- [x] No secrets in tracked files (`python .agent/safety_check.py`: 0 failures, 0 warnings)
- [x] User-visible changes are reflected in `docs/user/README.md`
- [x] Notable changes are recorded in `CHANGELOG.md` under `## [Unreleased]`
- [x] Works on a phone-width screen (`360×800` verified in headless Edge; zero horizontal overflow)
- [x] Keyboard navigation works (`Skip to content`, `tablist` arrow keys, card focus, Study `←` `→` `[` `]` `R` `Space`)
- [x] No broken links (anchor targets clear sticky header; asset URLs verified under `/frameshelf-landing-page/` and `/frameshelf/`)
- [x] Tested in a clean browser profile (`msedge --headless=new` with fresh `--user-data-dir`; full OS user-account switch remains optional manual check)
- [x] Type check and tests pass (`npm run typecheck` + `npm test`)
- [x] ESLint check passes (`npm run lint`)
- [x] HTML validates (prerendered landmark/heading structure, single `<h1>`, explicit image dimensions and `alt` text, zero hydration warnings)
- [x] Page works with JavaScript errors surfaced (0 console errors, 0 runtime exceptions, plus JS-disabled prerendered HTML verified)
- [x] `.agent/CHECKPOINT.md` is current
- [x] No secret values in source, documents or tests
