# Claude baseline, 16 November 2026

Outcome: I received both handoff bundles and checked them. Nothing was edited or published.

## Enoch
- Manifest: all 179 files are present and every hash matches.
- enoch-app: `node --test test/*.test.mjs` passed 17/17. `node build.mjs` rebuilt `dist/` byte-identical to the shipped copy.
- enoch-cloudflare-public: tests passed 4/4. `node build.mjs` rebuilt `dist/` byte-identical.
- `node server.mjs` serves on 127.0.0.1:8765. Its /api/catalogue and /api/atlas match published-snapshot on all 38 guides, 140 sources, 28 places, 31 events, 15 churches and 15 relations. Only `updatedAt` differs, plus the local session's `canEdit`/`signedIn` flags, because the local server treats this computer as the owner by design.
- Runtime note: these checks ran on Node 22.23 because Node 24 isn't available here. Everything passed; node:sqlite printed an experimental warning.

## Ante
- Manifest: all 106 files are present and every hash matches.
- A static check covered 237 href/src/srcset refs across 7 pages and found no missing files or anchors outside 404.html. All 51 search-index targets resolve. The bundled live check reports 8/8 files matching.
- Mismatch: 404.html uses root-absolute, extensionless links (`/theory`, `/bibliography`), and the canonical/og URLs are extensionless too. These links rely on Cloudflare Pages' pretty URLs. Under `python3 -m http.server` the URLs `/theory` and `/bibliography` return 404, so local preview needs `.html` URLs.
- The GitHub address in README.md (davidkazanjian.github.io/dispossession) is historical, as the handoff says.

## Not checked this session
- I didn't fetch either live site; live-match claims come from Codex's checks at 14:15 UTC today.
- I didn't do a browser or visual pass (desktop/phone, keyboard, reduced motion).

## Still external
- Enoch: production auth, D1 data, R2 uploads, drafts and revisions are on the Sites origin. Cloudflare Pages deploys are manual Direct Uploads.
- Ante: Cloudflare Pages deploys, Knight Lab and ArcGIS StoryMaps, and reader-local storage.
- Neither bundle is a git repository.

Next step: wait for Andrew's first objective.
