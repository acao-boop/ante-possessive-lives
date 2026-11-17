# Interface prototype

Open `index.html` in a browser. All six pages are static, and the site can be
hosted on the same static hosting service as the original. No installation,
build command, database, account system, or server application is required.

The design uses an ivory page, oxblood accents, one serif family throughout
reading text, headings, navigation, captions, and controls, fine rules, and generous margins. The
homepage presents the original manuscript as a separate archival object.
Case studies use a quiet contents rail, consistent figures and captions,
and a clearer reading hierarchy. Bibliography and credits share that system.

Optional browser enhancements add image enlargement with original-file access,
reading progress, mobile contents disclosure, touch-accessible definitions,
and previous/next links. The original map-comparison control and StoryMap
embeds remain. The existing external StoryMaps still need an internet
connection and their third-party host; the interface adds no external service
or font requests.

## Preservation

All 18 original image files are byte-for-byte identical. Original research
prose, captions, and citations are preserved. Requested interface changes
convert seven figure identifiers to Roman numerals and remove navigation and
comparison-handle arrows. Original image source and alt attributes, links,
citations, and anchor IDs are preserved. Image dimensions, responsive sources,
and native loading metadata are additive. All other original files, including `styles.css` and
`script.js`, are unchanged. New interface labels have been added, but original
research prose has not been rewritten. Local file and anchor references pass.

The presentation layer is in `interface.css` and `interface.js`. The HTML
changes add these references, a skip link, and the homepage navigation/image
presentation. The site is hosted on GitHub Pages; pushing `main` publishes it.

## Roman numerals

Section navigation uses I, II, III, IV, V. Figure identifiers use the same
Roman-numeral convention, retaining their original chapter/figure structure
(for example, Figure II.I). The theory diagrams already use Roman numerals.
Dates, scholarly references, statistics, and archive identifiers retain their
original notation.

## Typography and loading refinements

- The existing serif family stack now applies to all site typography. Font
  sizes distinguish headings, reading text, navigation, and supporting labels.
  No font files or external font services are required.
- The italic `a.` mark is also the local SVG favicon.
- Decorative interface arrows are removed. The comparison slider uses a small
  grip, while arrows inside the conceptual research diagram are preserved.
- Main actions use a subtle 180 ms zoom on hover and keyboard focus, plus a
  smaller pressed state. Cards zoom by 1.2 percent, smaller controls by 3 percent.
  These effects use CSS scaling and leave the page layout unchanged. Touch
  devices use the pressed state. Reduced-motion preferences disable zoom.
- Fifteen displayed image sources have responsive WebP copies. Even their
  largest display variants total 2.87 MB rather than the originals' 8.61 MB,
  a reduction of 66.7 percent. Smaller screens can request smaller variants.
- Images reserve their dimensions before loading. Below-the-fold images use
  native lazy loading. Enlargement and original-file links open the originals.
- All eighteen original image files remain byte-for-byte unchanged.

## Checks

- Reviewed all six pages at desktop and mobile sizes.
- Confirmed no horizontal page overflow at 390px and 1280px widths.
- Tested map comparison by keyboard, image enlargement and zoom, Escape and
  focus return, mobile contents navigation, and definition disclosure.
- Preserved external embed addresses and fallback links. External services
  are not bundled in this download.

## Sharing previews

All six HTML pages include static Open Graph metadata, a canonical address,
and large-image card metadata. Social previews use `social-preview.jpg`,
a 1200 by 627 pixel capture of the homepage. This image is additive; original
media and visible page content are unchanged. No additional browser script or
external service is used for previews.

The metadata uses `https://acao-boop.github.io/ante-possessive-lives/` as the
public origin (GitHub Pages since 16 November 2026; the Cloudflare address redirects there). If the hosting address changes, update the canonical, `og:url`,
`og:image`, and `twitter:image` URLs on all six pages before uploading again.
After deploying, request a fresh crawl with LinkedIn Post Inspector:
https://www.linkedin.com/post-inspector/

## Reading and discovery upgrade — November 1, 2026

Previous/Continue links now live in the static HTML on all five interior pages.
They work with file names and Cloudflare’s clean addresses, even without JavaScript.
Mobile chapter navigation uses a native disclosure with Roman chapter markers.
Contents navigation focuses the selected section and retains browser history.
Glossary visibility and accessible expanded state agree; Escape retains focus.

New browser enhancements add section/figure link copying, a lazy-loaded static
search index, three text-size choices, and an explicit Save my place action.
Reading tools stay available while scrolling. Saved places and text preferences
are stored only on the reader’s own device, without accounts or tracking.
The homepage offers an explicit Continue reading link when a place was saved.

Search uses search-index.json, generated entirely from the existing site text,
with results linking to existing research sections and glossary definitions.
No backend, framework, web font, or external search provider is introduced.
Print styles hide controls and expose glossary definitions.

## Project device and personal signature

A simple inverted-V device, without a cross, is used beside the existing project title in all page headers and in the favicon. The drawing is a local SVG with no external dependency. Andrew Cao’s separate personal printer’s mark remains a discreet 12-pixel signature beside his contributor credit. The social preview was recaptured at 1200 by 627 pixels to show the selected device.
