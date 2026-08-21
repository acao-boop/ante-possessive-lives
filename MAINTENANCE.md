# Site Maintenance Guide

This guide is written for future student researchers and project assistants who may update *Ante-Possessive Lives in the Americas*. The site is intentionally built with plain HTML, CSS, and JavaScript so that it can be maintained without a framework or paid platform.

## 1. Site map

| File | Public page | Primary responsibility |
| --- | --- | --- |
| `index.html` | Project index | Introduces the project and links to the framework and two case studies. |
| `theory.html` | Theory & Method | Defines the conceptual framework and contains Figures I–IV. |
| `adam.html` | Adam Saffin | Presents the New England case, Figures 2.1–2.4, and its StoryMap. |
| `juan-patricio.html` | Juan Patricio | Presents the Yucatán case, Figures 3.1–3.3, its slider, and its StoryMap. |
| `bibliography.html` | Sources | Holds the shared bibliography, primary records, visual sources, and digital tools. |
| `credits.html` | About | Describes the project and records contributor roles and institutional links. |

Each internal page contains three navigation layers:

1. The site-wide navigation at the top.
2. A page-specific section index in the left rail.
3. A key-terms panel on the right, where applicable.

On narrow screens, these elements collapse into the mobile layout defined near the end of `styles.css`.

## 2. Common editorial updates

### Revise prose

Edit the relevant paragraph directly in its HTML file. Preserve the surrounding section `id`, since the left navigation and cross-page links depend on those anchors.

Use semantic elements where possible:

- `<h1>`, `<h2>`, and `<h3>` for hierarchy
- `<p>` for prose
- `<figure>` and `<figcaption>` for images and diagrams
- `<aside class="editorial-reference">` for related-reading notes
- `.figure-source`, `.map-credit`, `.editorial-reference`, and `.storymap-fallback` for material that is supplementary to the main prose

Do not use color alone to distinguish a caption, source, note, or link.

### Add or replace an image

1. Use a descriptive lowercase filename with hyphens.
2. Place the file in the repository root unless the project is deliberately reorganized in a future major release.
3. Update the relevant `<img src="...">` reference.
4. Write alternative text that describes the information a reader needs from the image.
5. Update the visible figure caption and source note.
6. Update `ASSET-CREDITS.md` and, where appropriate, `bibliography.html`.
7. Confirm that the image is licensed, permissioned, public domain, or being used under a defensible educational rationale.

Avoid AI enlargement or reconstruction of archival material unless it is clearly labeled. Enhancement can invent linework, lettering, or geographic detail that is not present in the source object.

### Update a figure number

Theory figures use Roman numerals: Figures I–IV. Adam figures use 2.x. Juan Patricio figures use 3.x. Update the visible caption, any prose reference, and any accessibility label together.

### Update navigation

The same top navigation appears in all five internal HTML files. If a page name or destination changes, update every copy. The landing page uses a separate card-based index.

When adding a section to an internal page:

1. Give the section a unique `id`.
2. Add a matching left-rail link.
3. Check that the fixed header does not obscure the section title after navigation.

### Update key terms

Key terms are authored inside the relevant page. Follow the existing markup and keep definitions brief. The vocabulary panel supplements the prose; it should not contain an argument that appears nowhere else on the page.

## 3. Theory diagrams

The theory diagrams are responsive HTML and CSS, not flattened images. Their content is in `theory.html`, while their layout is in `styles.css`.

When editing a diagram:

- Keep Roman numerals aligned consistently.
- Test long labels at desktop, tablet, and phone widths.
- Use Roman numerals, spatial order, and headings to communicate sequence. Figure I intentionally uses no arrows; Figure III retains circular arrows because recursivity is its subject.
- Preserve a readable order when the layout stacks on mobile.
- Do not replace accessible text with text embedded in an image.

Figure I compares the familiar and recursive accounts of dispossession. Figure II maps three relations to ownership. Figures III and IV should retain their approved conceptual sequence and captions.

## 4. Interactive elements

### Juan Patricio comparison slider

The slider uses two local WebP images and behavior in `script.js`. Preserve both layers, the slider handle, keyboard behavior, and the figure caption. If either image is replaced, use matching dimensions so the layers remain registered.

### Knight Lab StoryMaps

The Adam and Juan Patricio StoryMaps are externally hosted Knight Lab embeds. Their URLs appear twice on each case page:

- in the deferred iframe’s `data-src`
- in the alternate-access link beneath the embed

If a StoryMap URL changes, update both locations. Do not remove the alternate-access link. The embeds require an internet connection even though the rest of the site is locally hosted.

## 5. CSS and JavaScript

`styles.css` contains the complete visual system and a chronological set of late-stage corrections. New rules should be placed near the component they affect when practical. If an emergency correction is appended at the end, label it clearly and later consolidate it during a planned refactor.

The version query in each HTML file, such as `styles.css?v=1.0.0`, is a cache-busting value. Update it across all pages when a public release changes CSS.

`script.js` provides:

- active section behavior
- deferred iframe loading
- comparison-slider interaction

Test JavaScript changes with both a mouse and keyboard. The core prose and navigation should remain usable if JavaScript fails.

## 6. Pre-release checklist

Before publishing an update:

- Open every page from the top navigation.
- Test every left-rail anchor and every cross-page reference.
- Check external links and StoryMap fallback links.
- Confirm that each local image loads with the exact filename and capitalization used in the HTML or CSS.
- Review at approximately 1440 px, 1024 px, 768 px, 430 px, and 375 px widths.
- Test the landing-page cards, all theory diagrams, both StoryMaps, and the Juan Patricio slider on mobile.
- Check keyboard focus, slider controls, alternative text, heading order, and text contrast.
- Verify figure numbering and visible source notes.
- Update `CHANGELOG.md`, `ASSET-CREDITS.md`, and the CSS cache-busting value if needed.
- Create a Git tag for the public release after the deployed site has been checked.

## 7. Release and preservation practice

Use public semantic versions for releases:

- patch: corrections that do not change the project’s structure, such as 1.0.1
- minor: a new section, figure, or significant accessibility improvement, such as 1.1.0
- major: a substantial redesign or reorganization, such as 2.0.0

Internal experiments can be documented on working branches. Do not place abandoned drafts, exported StoryMap folders, private readings, internal review notes, or redundant assets on `main`. Preserve historically useful material in the `legacy-archive` branch described in `ARCHIVE-MIGRATION.md`.

## 8. Project integrity

This is a collaborative scholarly project. When revising it:

- preserve the authorship of the two case-study researchers
- distinguish site-wide editing from original case research and writing
- retain citations when simplifying prose
- do not infer missing archival provenance
- record substantial interpretive changes in the changelog
- consult the project director before changing the project’s central claims
