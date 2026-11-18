# Ante-Possessive Lives in the Americas

Collaborative scholarly site directed by David Kazanjian, on how Black and Indigenous social relations confront racial capitalism across two legal histories at the turn of the eighteenth century.

**Live site:** https://acao-boop.github.io/ante-possessive-lives/

Web design and build by [Andrew Cao](https://andrewcao.org/), whose other work is listed there.

## Layout
- `site/`: the published website, plain static HTML, CSS and JavaScript. Every push to `main` publishes it through `.github/workflows/pages.yml`.
- `tools/preview/`: previews unpublished changes over the live site in a browser.
- `cloudflare-redirect/`: forwards the former address, ante-possessive-lives.pages.dev, to this site.
- `docs/handoff/`: notes from the November 2026 handoff.
- `CLAUDE.md`, `HANDOFF.md`: working notes for editing sessions.

## Local preview
From `site/`, run `python3 -m http.server 8000` and open http://localhost:8000/.

Credits for the research, writing and images are on the site's About & Credits page and in `docs/site-notes/ASSET-CREDITS.md`.
