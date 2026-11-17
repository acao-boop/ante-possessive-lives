# Ante-Possessive Lives in the Americas

Collaborative scholarly site directed by David Kazanjian. Public: https://acao-boop.github.io/ante-possessive-lives/ (GitHub Pages, repo acao-boop/ante-possessive-lives). The former Cloudflare address, ante-possessive-lives.pages.dev, redirects there. Andrew's role: theory research and writing, web design, integration, editorial work.

## Session routine
- Read HANDOFF.md first. Then read only the files the task needs.
- Do one bounded task per session. Before stopping, update HANDOFF.md (state, last change, checks, next step) and commit.

## Layout
- `site/`: the whole static site; publish this folder as-is. Read site/INTERFACE-NOTES.md and site/CURATION-NOTES.md before interface changes. site/ASSET-CREDITS.md records image provenance.
- `docs/handoff/`: Codex handoff material. Reference only.
- site/README.md and site/MAINTENANCE.md describe the old GitHub Pages release. Don't follow their publish steps.

## Run and check
- Preview: from `site/`, run `python3 -m http.server 8000`, then open http://localhost:8000/. The live site sits under `/ante-possessive-lives/`, so keep page links relative; only 404.html uses full `/ante-possessive-lives/` paths.
- No build step. When a feature changes, test search, bookmarks and reading-place persistence, chapter/anchor navigation, image enlargement, map comparisons, narrow layouts, keyboard access and reduced motion.
- CSS and scripts are layered on purpose. Check the HTML load order before consolidating anything.
- Publishing: every push to `main` on GitHub publishes `site/` through `.github/workflows/pages.yml`. Claude commits and pushes after Andrew approves. The `published` git tag marks the commit that is live.

## Review, then publish (every session)
- Nothing goes live mid-session. Edit `site/` and keep HANDOFF.md current.
- Review locally: from `site/`, run `python3 -m http.server 8000` and open http://localhost:8000/. Check desktop and phone widths.
- As a fallback only, use the overlay preview: run `python3 tools/preview/make_preview.py`, open https://acao-boop.github.io/ante-possessive-lives/ in the browser pane, and run the generated `tools/preview/preview.js` there. New or replaced images appear only after publishing (see tools/preview/README.md).
- When Andrew approves, Claude commits and pushes `main`. When the Actions run finishes, confirm the live HTML/CSS/JS match `site/` (SHA-256), then `git tag -f published` and push the tag. If the homepage preview card changed, rerun LinkedIn Post Inspector.

## Constraints
- Plain static HTML/CSS/JS only: no framework, build step, backend, login or paid service.
- Preserve scholarly prose, citations, original image bytes, figure sources, anchors, maps, StoryMaps (externally hosted) and all collaborator credits. A visual change does not authorize editorial changes.
- Identity: the project device is the serifed, engraved alpha (Λ) in `site/ante-device.svg`, adopted 16 November 2026 in place of the plain inverted V. Keep the large manuscript banner, the full-width crimson navigation band and the single Framework/Case Studies chooser. Andrew's personal mark stays small and beside his credit, and links to his home page, https://acao-boop.github.io/ (repo acao-boop/acao-boop.github.io), where this project is listed.
- Don't add redundant descriptions, duplicate navigation, decorative numbering or purposeless symbols.

## Working with Andrew
- Be direct and specific. Lead with the result. Report only checks you actually ran. No paid services without his decision.
