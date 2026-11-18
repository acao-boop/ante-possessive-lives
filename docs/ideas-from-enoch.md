# Ideas from Enoch for Ante (2026-11-18)

Context: on 18 November 2026 the Enoch homepage was redesigned (Enoch repo, branch
`homepage-redesign`, notes in `docs/homepage-redesign-notes.md`). This file lists what
Ante could borrow. It is not a plan to make the two sites look alike: Ante keeps its own
identity (engraved alpha device, manuscript banner, crimson navigation band,
Framework/Case Studies chooser). Every item needs Andrew's approval, and changes to
scholarly content stay with the collaborators.

## 1. Do first: internal files are publicly served
Everything in `site/` is published as-is, so working files are reachable on the live
site (checked 2026-11-18, all return 200), e.g.
`https://acao-boop.github.io/ante-possessive-lives/V26-SOURCE-AUDIT.md`,
`.../PURM_v24_script.txt`, `.../CURATION-NOTES.md`.
Files in `site/` that are notes rather than pages: ARCHIVE-MIGRATION.md, ASSET-CREDITS.md,
CHANGELOG.md, CURATION-NOTES.md, INTERFACE-NOTES.md, MAINTENANCE.md, README.md,
PURM_v23_script.txt, PURM_v24_script.txt, V24_NOTES.txt, V25-1-NOTES.md, V26-*.md.
- Move them to `docs/site-notes/` (outside the published folder) and update CLAUDE.md's
  pointers. Git history keeps every version; nothing is deleted.
- Check first that no page links to them (none of the HTML pages did on 2026-11-18).
- Image credits that readers should see belong on credits.html, not in a .md file.

## 2. Process that worked on Enoch
- **A Claude Design canvas for visual tuning.** Andrew pins a comment on the exact element
  and Claude changes it in place; values are then written into a notes file and built in
  one pass. Much faster than describing changes in chat. Ante's pages are static HTML, so a
  canvas copy of Home and one chapter page is easy to make.
- **"HT:"** (honest take) from Andrew asks for Claude's independent design judgement, not
  shaped by earlier direction.
- **Decide the ornament budget first.** Enoch spent many rounds on decoration that was later
  simplified. Rule that emerged: one ornament per section, detail in mouldings and line
  work, never in symbols.

## 3. Ideas Ante could use
- **One name per destination.** Enoch renamed Catalogue to Sources so the nav, buttons
  and links agree. Ante uses Project Index, Chapters, Framework, Case Studies, Theory and
  Home for overlapping things; a quick naming audit (nav, chooser, search labels, page
  titles) would remove guesswork. Review item 6 already fixed numbering; this is the
  same idea for names.
- **Type at its intended size.** Ante uses one system serif everywhere. Enoch found that a
  display face breaks up below ~32px on dark grounds, and settled on display sizes only for
  large type and a text cut for reading. Ante's system serif renders differently on Mac,
  Windows and phones; a single self-hosted text serif (no external requests, in keeping
  with the no-external-fonts rule) would make it look the same everywhere. Optional.
- **First screen on phones.** Enoch's phone check found the heading below the fold behind a
  tall image band. Worth one check on Ante Home at 390px: does the manuscript banner leave
  the title and the chooser visible on arrival?
- **Copy pass with the same lens.** Buttons as verbs, one noun per thing, no repeated
  credit lines. Visual and labelling changes only; research prose stays untouched.
- **Andrew's personal mark.** Enoch's new ex libris is a C laid over an A (from Andrew's
  sketch) in a tone-on-tone library embosser. Ante shows `andrew-cao-mark.svg` beside his
  credit; using the same monogram there would tie his projects together. Caution: Enoch's
  chosen version draws the A without a crossbar, as an open Λ, and Ante's project device is
  an alpha too. Beside Ante's device it could read as a second project mark. On Ante, use
  the crossbar version (S1a on the Enoch canvas) or the plain small monogram, kept small
  as CLAUDE.md requires.
- **Share card and favicon parity.** Enoch regenerates its share card from the final
  design. Ante's local `social-preview.jpg` is older than the live one (see HANDOFF Log); sync
  it before any card change, then rerun LinkedIn Post Inspector.

## 4. Already good on Ante (Enoch could borrow)
- Cite (Chicago and MLA) on chapter pages, Night/Paper/Device appearance, reduced-motion
  handling, the keyboard-reachable map comparison, and the SHA-256 publish check.
