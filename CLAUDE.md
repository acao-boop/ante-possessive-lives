# Ante-Possessive Lives in the Americas

Collaborative scholarly site directed by David Kazanjian. Public: https://ante-possessive-lives.pages.dev/ (Cloudflare Pages). Andrew's role: theory research and writing, web design, integration, editorial work.

## Session routine
- Read HANDOFF.md first. Then read only the files the task needs.
- Do one bounded task per session. Before stopping, update HANDOFF.md (state, last change, checks, next step) and commit.

## Layout
- `site/`: the whole static site; publish this folder as-is. Read site/INTERFACE-NOTES.md and site/CURATION-NOTES.md before interface changes. site/ASSET-CREDITS.md records image provenance.
- `docs/handoff/`: Codex handoff material. Reference only.
- site/README.md and site/MAINTENANCE.md describe the old GitHub Pages release. Don't follow their publish steps.

## Run and check
- Preview: from `site/`, run `python3 -m http.server 8000`, then open http://localhost:8000/. Use `.html` URLs locally: extensionless links like `/theory` work only on Cloudflare Pages.
- No build step. When a feature changes, test search, bookmarks and reading-place persistence, chapter/anchor navigation, image enlargement, map comparisons, narrow layouts, keyboard access and reduced motion.
- CSS and scripts are layered on purpose. Check the HTML load order before consolidating anything.
- Andrew publishes by uploading `site/` to Cloudflare Pages.

## Constraints
- Plain static HTML/CSS/JS only: no framework, build step, backend, login or paid service.
- Preserve scholarly prose, citations, original image bytes, figure sources, anchors, maps, StoryMaps (externally hosted) and all collaborator credits. A visual change does not authorize editorial changes.
- Identity: the project device is a simple inverted V without a cross. Keep the large manuscript banner, the full-width crimson navigation band and the single Framework/Case Studies chooser. Andrew's personal mark stays small and beside his credit.
- Don't add redundant descriptions, duplicate navigation, decorative numbering or purposeless symbols.

## Working with Andrew
- Be direct and specific. Lead with the result. Report only checks you actually ran. No paid services without his decision.
