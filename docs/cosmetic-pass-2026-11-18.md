# Ante cosmetic pass (2026-11-18)

From the Ante cosmetic-fixes session. Status at the end: items 1, 3 and 4 applied, checked in the browser and committed locally (not pushed). Items 2 and 5 are proposals. The sections below the status line keep the original proposal text.

## Snag: the browser preview can't serve Ante
The preview tool reads only `Projects/.claude/launch.json`, and that file has just the Enoch entry (`enoch-local`, port 4321). Nothing is serving Ante on port 8000. Verifying in the browser needs one of these:
- **A (recommended):** add one line to `Projects/.claude/launch.json` (this file is outside `ante/`):
  `{"name": "ante-local", "runtimeExecutable": "python3", "runtimeArgs": ["-m", "http.server", "8000", "--directory", "ante/site"], "port": 8000}`
- B: Andrew runs `python3 -m http.server 8000` from `ante/site`, and the preview attaches to it.

## 1. Naming: one name per destination (proposed mapping)
What the site uses today:
| Destination | Names in use |
|---|---|
| index.html | "Project Index" (Home nav link, search, Previous/Continue links, 404, citation code), "Return to Index" (rail button), "home" (wordmark aria-label), tab title "… \| Dispossession Project" |
| #project-index (the chooser) | kicker "Project Index" + h2 "Framework and case studies" |
| Site menu (masthead disclosure) | "Chapters", but it also lists Sources and About, and screen readers hear them as "Chapter IV: Sources" and "Chapter V: About" |
| bibliography.html | "Sources" (nav), "Sources & Bibliography" (title, h1, search, Previous/Continue, citation) |
| credits.html | "About" (nav), "About & Credits" (title, h1, search, Previous/Continue, citation) |
| theory.html | "Theory & Method" everywhere; group label "Framework" (chooser, rail kicker) |

Proposal:
- **Home** = index.html, everywhere it is named as a place: search results, Previous/Continue links, the 404 link, the wordmark label ("Ante-Possessive Lives, Home"). Tab title becomes "Ante-Possessive Lives in the Americas" (dropping "Dispossession Project", a third name). The tab title touches only `<title>`, not the og/twitter tags.
- **Contents** = the chooser on Home and the site menu, which are the same list. The Home nav link "Project Index" becomes "Contents"; the menu summary "Chapters" becomes "Contents". The chooser's kicker "Project Index" goes, and its h2 becomes "Contents". This also removes the duplicate h2 "Framework and case studies", which sits directly above the "Framework" and "Case Studies" labels.
- Rail button "Return to Index" becomes **"Back to contents"** and links to `index.html#project-index` (on phones it skips the banner).
- **Chapter** numerals only for Theory (I), Adam Saffin (II) and Juan Patricio (III), matching the figures and search. Sources and About lose "Chapter IV/V" in their screen-reader labels.
- **Sources** and **About** as the single names: nav, Previous/Continue, search, h1 and `<title>`. Side effect: Cite on those two pages would quote "Sources" / "About" as the page title. Alternative: keep the long h1s ("Sources & Bibliography", "About & Credits") as page titles and use the short name only in navigation.
- **Framework** and **Case Studies** stay as the chooser's two group labels (CLAUDE.md requires them). They are categories, not destinations.

## 3. Label copy pass (planned, after the mapping)
The buttons are already verbs (Save my place, Clear saved place, Cite this project, Copy, Zoom in, Close). Remaining changes come from the mapping above, plus "Previous / Continue" becoming "Previous / Next" so the pair reads as a matched set (optional). Repeated credits: Home's colophon and the About deck both say "directed by David Kazanjian … earlier collaborative work at Stanford". They sit on different pages, and they are credit text, so I'm leaving them as they are. No research prose touched.

## 4. Monogram
The crossbar version (S1a) is not in `enoch/` files. It is on the Enoch design canvas (linked from enoch/HANDOFF.md), as two vector paths from Libre Caslon Display outlines (OFL), so no font is needed. Plan: replace the contents of `ante/site/andrew-cao-mark.svg` with S1a in Ante's crimson #762e37, and add a version string to the `<img>`. At 12px the C over A may smudge; I'll compare 12px and 14px in the preview.

## 2. Phone first screen (checked; proposal only)
Checked at 375×812 on Home. The title (197–322px) and subtitle (342–424px) are visible on arrival. The manuscript banner fills 459–799px, so the Contents chooser starts at 884px, about one short scroll below the fold. The "Contents" link in the crimson band is on screen and jumps straight to it.
- Proposal, not applied: on screens ≤640px, cap the banner at about 260px tall (`object-fit: cover` on the manuscript's upper half, where the "Juan Patricio" heading is). The Contents heading would then sit at about 700px, inside the first screen. CLAUDE.md protects the "large manuscript banner", so this needs Andrew's decision. Desktop is unaffected.
- No change needed otherwise: no horizontal overflow, and the band's Contents link covers the gap.

## 5. Reading serif (proposal only)
Today the site uses system fonts only: "Iowan Old Style", Baskerville, Palatino, then Georgia. So it renders as Iowan on Apple devices, Palatino Linotype on Windows, and whatever serif Android has. Line length, colour and the italic kicker style change from device to device.
- Proposal: self-host one text serif as WOFF2 in `site/fonts/`, loaded with `@font-face` from Ante's own folder, so there are no external requests and the no-external-fonts rule holds. Candidates, all SIL Open Font License:
  - **Source Serif 4** (recommended): a text optical size built for screen reading, full Latin Extended (Spanish and Yucatec Maya diacritics), and a true italic for the kickers. About 4 files (regular, italic, semibold, semibold italic) at roughly 40–70 KB each after Latin subsetting.
  - Libre Caslon Text: would tie Ante to Enoch's type, but CLAUDE.md keeps Ante's identity separate, and Caslon's small sizes are weaker on screens.
  - EB Garamond: elegant and period-appropriate, but light and small on screen at body sizes.
- How: put it first in `--font-serif`, keep the current stack as the fallback, use `font-display: swap`, and preload only the regular weight. The cost is about 150–250 KB on first visit, then cached. Check: no layout shift on chapter pages, and figures and tables keep their widths.
- Needs Andrew's go-ahead. Typography is a visual decision.

## Portfolio-evaluation findings (from `_reviews/portfolio-evaluation.md`, queued 2026-11-18)
- **#10, Kazanjian "I am he" PDF link (juan-patricio.html):** not broken. Penn stores the file under a name that literally contains `%22`, so the `%2522` in the href is correct. Checked 2026-11-18 with curl: the site's exact href returns 200 (application/pdf), and Penn's own publication page (english.upenn.edu/publications/2022/david-kazanjian/…) links to the same file. The 404 came from the "correctly encoded" `%22` form, which is a different file name. No change needed. If Andrew wants a more stable target, the options are the Penn publication page above, which is already used in bibliography.html, or the SUNY Press book page (sunypress.edu/Books/A/Accumulation-and-Subjectivity). I found no DOI for the chapter. The source is the collaborators', so any swap is their call.
- **#13, "| Dispossession Project" in Home's `<title>`:** the approved naming mapping already drops it from `<title>` (applied 2026-11-18, not yet published). The og:title and twitter:title still carry it; those belong to the cards session. If the collaborators want "Dispossession Project" kept as a name, revert the one `<title>` line in site/index.html.
- **#7, Ante's alpha device vs Andrew's open-A mark:** Andrew's call, and the device is unchanged. Related: on Ante the open-A mark beside Andrew's credit is replaced by the C-over-A crossbar monogram, so the open A no longer appears on this site.
