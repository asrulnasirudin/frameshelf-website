# FRAMESHELF LANDING PAGE: project specification

Created 2026-11-04. This is the source of truth for **what** we are building.
Entries marked **TO CONFIRM** were not established during setup; the owner fills them in. Nothing here is a decision unless it says so.

## 1. Project identity
- Name: FRAMESHELF LANDING PAGE (`frameshelf-landing-page`)
- Category: Website

## 2. Product description
A landing page for Frameshelf. A place to intro it to the public.

_(Entered during project setup; please confirm.)_

## 3. Target users
TO CONFIRM

## 4. Problem being solved
TO CONFIRM

## 5. Goals
TO CONFIRM

## 6. Non-goals
TO CONFIRM

## 7. Functional requirements
TO CONFIRM

## 8. Target platform
- Windows

## 9. Host application
None: this is a standalone product (confirm if that is wrong).

## 10. Technology stack
- Node.js + TypeScript
- Static HTML/CSS/JS

## 11. Architecture requirements
TO CONFIRM

## 12. Dependencies and toolchain
- node: >=22.13
(Defaults from the project profile; confirm.)

## 13. Security requirements
Baseline set during setup (extend as needed):
- Secrets (keys, tokens, passwords) never enter the repository, public or private. Use `.env`, kept out of Git; `.env.example` holds placeholders only.
- Local-only material: `local/`
- Files named `credentials.*`, `secrets.*`, `*.aep`, `*.prproj`, `*.psb`, `*.mov`, `*.mp4`, `*.mxf`, `*.wav`, `*.exr` are flagged for review, not ignored.
TO CONFIRM: any additional requirements (authentication, data privacy, licences).

## 14. Testing requirements
Checklist: `.agent/QA_CHECKLIST.md`.
TO CONFIRM: what must be tested automatically and what by hand.

## 15. Distribution requirements
No packaged release planned yet. TO CONFIRM.

## 16. Open questions
- What is this project, in one sentence, and who is it for?
- What does 'done' look like for the first usable version?
- What is explicitly out of scope?
- What constraints apply (deadline, budget, platform, licences, accessibility)?
- Who is the audience and what should a visitor do?
- Which pages are needed?
- Where will it be hosted?
