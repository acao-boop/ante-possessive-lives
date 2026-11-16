# Static reading edition — 15 November 2026

This revision borrows Enoch’s clear wayfinding and saved-reading utility while preserving Ante’s identity as a fixed scholarly edition. All additions are HTML, CSS, JavaScript, and local images. There is no build step, server application, account, database, analytics, external font service, or dependency install.

## Editorial choices

- A solid oxblood band spans the full landing-page width and separates chapter navigation from the paper-colored research text. The side contents panel uses a quieter paper tone. Active links use a 650 ms underline, with immediate reduced-motion behavior.
- The existing opening manuscript becomes a full-width editorial banner. Its original image remains available through the image link. All original research prose, historical numbers, citations, media files, and anchors remain intact.
- A single Framework / Case Studies index supplies the three chapter entries, retaining their original descriptions and imagery. Each entry has a small sibling bookmark control, so saving never follows the chapter link. The additional home publication display and repeated numerals are omitted. Sidebar numerals remain useful for locating sections.
- Related scholarship appears in small source credits beside each chapter heading and in the bibliography. A full citation for the Yucatán chapter was added to Sources & Bibliography and its static search entry.
- Bookmarks can hold whole chapters or individual research sections. They use `ante-lives.bookmarks` in the reader’s browser. They are separate from the pre-existing saved reading place, are removable, survive reloads, and do not sync across browsers or devices.
- The home index remains ordinary static navigation. There is no carousel or background animation.

Andrew Cao’s contributor bio now reads “English & Religion major · Concentration in Literary Theory & Criticism,” following Braden’s concise format. This is the only authorized change to pre-existing visible biographical text.

## Image register

The illustrations below are confined to published work by David Kazanjian. These are source details, not historical portraits or invented archival records. The existing project imagery remains unchanged.

| Asset | Publication and exact selection | Public reading copy |
| --- | --- | --- |
| `published/ante-possession-title.png` | Title and author only, p. 863 of “Ante-Possession: A History of Dispossession’s Present,” *American Literary History* 34.3 (2022), 863–892. No article prose is included. | https://www.english.upenn.edu/publications/2022/david-kazanjian/ante-possession-history-dispossessions-present |
| `published/bristol-woodbury.png` | Figure 3, pp. 10–11 of “Infrastructure in Black: An Ante-Commons in Colonial New England,” *Social Text* 41.4 (2023), 1–36. Samuel Woodbury’s plan of Bristol, first created circa 1690 and updated until circa 1730; original in Bristol Town Hall, copies in Bristol Historical and Preservation Society. The published image is retained in full; the banner shows a crop through CSS. | https://www.english.upenn.edu/publications/2023/david-kazanjian/infrastructure-black-ante-commons-colonial-new-england |
| `published/i-am-he-title.png` | Chapter title and author only, p. 45 of “‘I am he’: A History of Dispossession’s Not-Yet-Present in Colonial Yucatán,” in *Accumulation and Subjectivity: Rethinking Marx in Latin America*, ed. Karen Benezra (SUNY Press, 2022), 45–66. No chapter prose is included. | https://www.english.upenn.edu/publications/2022/david-kazanjian/i-am-he-history-dispossessions-not-yet-present-colonial-yucat%C3%A1n |

The two title details are deliberate publication facsimiles: those essays contain no illustrations. They are rendered from the Penn-hosted reading copies. No stock or generated imagery is used. The linked StoryMap item records could not be accessed publicly during this audit, so no new banner image was attributed to them.

## Selected project identity

Since 16 November 2026 the project identity is a serifed, engraved alpha (Λ); before that it was a simple inverted V without a cross. It sits beside the existing project title. The same device is used in the favicon. Andrew’s separate 12-pixel personal printer’s signature remains beside his contributor credit. All artwork is local SVG.

## Refinements — 16 November 2026

Interface-only changes. No research prose, citations, credits, anchors or original image files changed.

- Phones: the contents rail no longer fills the first screen (its desktop height rule is now scoped to widths above 900px), and the reading-tools bar is no longer sticky below 900px, so only the masthead stays fixed.
- Home: removed the map overlay captions on the case cards (place and date already appear beneath each title), the footer that repeated the navigation band, and the “Explore the project” link that repeated “Project Index”. The index now carries the page's closing margin.
- Saving: chapters are saved from the Project Index and sections beside their headings; the separate “Save chapter” control in the reading tools is gone. “Clear saved place” appears only when a place is saved. On pointer devices the “Link” control appears when its heading is hovered or focused.
- Wayfinding: the contents rail has a “Key terms” link that moves focus to the key-terms panel. “/” opens search, as do Ctrl/⌘ K. Search results no longer carry Roman numerals; Home, Sources and About are labelled “Page” and the three chapters “Chapter”. Saved reading now precedes Search in the tab order, matching the layout.
- Map comparison: keyboard focus shows as a ring around the slider and its handle.
- Typesetting: balanced headings, `text-wrap: pretty` for prose, a paper-toned text selection, and a short cross-fade between pages (with the masthead held still) where the browser supports view transitions and reduced motion is off.
- Images: the Woodbury plate has 480/640/960 WebP copies in `display/` (the PNG remains the original). The paired Indigenous Maps figures declare their real display widths.
- Code: `script.js` is versioned and deferred and initializes whether it loads early or late; its active-link tracking reads only the section list. Asset versions are `20261116`. 404 links use `.html` paths so they also work in local preview. The Theory page title follows the other pages' pattern.

## Citation, Night appearance and Home colophon — 16 November 2026

- **Cite.** Chapter pages have a “Cite” control in the reading tools; Home has “Cite this project” in its colophon. The dialog gives Chicago and MLA forms built from the page's canonical address and the reader's date, and copies them with italics where the clipboard allows. Forms used: project, “Kazanjian, David, dir. *Ante-Possessive Lives in the Americas*. 2026. URL. Accessed …”; chapter, ““Adam Saffin.” *Ante-Possessive Lives in the Americas*. Directed by David Kazanjian. 2026. URL. Accessed …”. The wording comes from About & Credits (“developed under the direction of Professor David Kazanjian”). Professor Kazanjian should confirm the authorship line before it is relied on.
- **Night.** A dark-paper appearance follows the device setting unless the reader chooses Paper, Night or Device under Reading settings (stored as `ante-lives.theme`). A two-line script in each page's head applies it before first paint. Night is screen-only, so printing stays on paper. Archival images keep their own tones; only the wells around them darken, and `mix-blend-mode: multiply` is switched off so images do not disappear into the dark ground. All visible text on the six pages measured at least 4.5:1 contrast in both appearances.
- **Colophon.** One line of provenance from About & Credits, the citation link, and a note that saved reading stays in the browser. It replaces nothing and adds no navigation.
