# Ante: landing tagline, card bookmarks, internal page structure (2026-11-18)

Request (Andrew, relayed by the coordinator): adjust where the landing-page sentence "Black and Indigenous social relations confront racial capitalism…" stands apart in the middle of the page; fix the bookmarks on the two smaller sections; assess the internal page structures. Visual and structural only: no prose, headings' wording, citations or credits change.

Checked on the live site (identical to `site/` at ab1bb9c) in the built-in browser at 1280×800 and 375×812, Paper and Night. The local preview server still can't start from the app (macOS "Operation not permitted"), so mock-ups were injected as temporary CSS into the live page in the browser only; nothing was published.

## 1. Landing tagline

Today: on desktop the title sits left and the sentence floats in its own column to the right, bottom-aligned to "in the Americas", with a wide gap between. It reads as a separate object in the middle of the page. On phones it already stacks under the title.

- **A. Deck under the title (pick; confidence: high).** Kicker, title, then the sentence directly beneath at about 19px, measure ~34rem, before the manuscript. The title page reads as one lockup, and it matches the chapter pages, where the deck ("Understanding Recursive Dispossession") already sits under the title. Phone: unchanged. Cost: the hero gets about 80px taller on desktop.
- **B. Lead-in to Contents (confidence: low).** Move the sentence under the "Contents" heading as its introduction. It ties the claim to the chooser, but the first screen then shows only the title, and a project statement under a navigation heading undersells it.
- Not proposed: setting it over the manuscript (legibility on a busy scan, and it competes with the archival object).

## 2. Bookmarks on the two case cards

Which element: the bookmark buttons on the Adam Saffin and Juan Patricio cards in Contents on Home (`.index-save-case > .bookmark-action`, added by curation.js). They are 44px square chips pinned to the top-right corner of each map image, with a paper (Night: black) fill. Theory & Method's bookmark, the larger section above, is a bare icon beside its title. So the same control has two looks, and on the cards it sits on the archival maps.

- **Fix (pick; confidence: high):** move each card's bookmark into the title row, right-aligned with "Adam Saffin" / "Juan Patricio", bare icon, no fill, the same as Theory & Method. The maps are left clean. Checked as a mock-up at both widths; the title keeps 44px clear on the right for it.
- Alternative: keep it on the image but show it only on hover/focus. Rejected: touch screens have no hover, so it would be either always-on (today's problem) or invisible.

## 3. Internal page structure (ranked)

Status 18 Nov: items 1, 2, 3, 5 and 6 applied and published; 4 is with the collaborators; 7 left as is. Tagline A and the bookmark fix were applied earlier the same day.

Pages measured at 1280px: Theory 18,450px tall, Juan Patricio 16,330, Adam Saffin 11,920, Sources 8,270, About 3,570.

1. **Long pages have no way back to the contents mid-page on phones.** On desktop the sticky rail lists the sections. On phones the "On this page" list sits only at the top, so from deep inside Theory or Juan Patricio a reader has to scroll up thousands of pixels. Fix: a quiet "On this page ↑" link at the end of each H2 section on screens ≤900px, linking back to the disclosure, which opens it. No new sticky bar (the 16 Nov review removed sticky tools on phones to save space).
2. **The Juan Patricio Story Map has no heading.** The rail lists "Juan Patricio Story Map", but its target (`#storymap-container`) is a bare div. Adam's equivalent has an H2 ("Adam Saffin Story Map"). Fix: give Juan's block the same H2 structure as Adam's, using the rail's existing label as its text, so screen-reader heading navigation and the two case pages match. This adds a heading, not prose; confirm with the collaborators if you prefer.
3. **Rail labels differ from the headings they point to.** Adam: "Overview" → H2 "Dispossession in colonial New England"; "Interactive Story Map" → "Adam Saffin Story Map". Juan: "Overview" → "Dispossession in the Yucatán Peninsula"; "Slavery in the Yucatán" → "Slavery and Society in the Yucatán Peninsula". The short forms are reasonable rail labels, but "Overview" names nothing on the page, and the two story-map labels differ from each other. Fix: rail labels as shortened forms of each heading ("Dispossession", "Slavery and Society", "Story Map"), the same pattern on both case pages.
4. **Uneven section rhythm between the case pages.** Theory runs H2 → H3 → H4 throughout. Adam has H3s only in Implications. Juan Patricio has no H3 at all across 16,000px; "The Language of the Yucatán" alone runs about 5,200px with no sub-break. Subheadings are editorial, so this is for the collaborators: suggest they mark 2–3 natural breaks in Juan's two long sections. Visual fallback, if they don't: a small section-rule ornament every few paragraphs is NOT recommended (the "no purposeless symbols" rule).
5. **Sources lists Juan Patricio before Adam.** Everywhere else the order is Theory, Adam, Juan (menu, Contents, Previous/Next, figure numbering). Fix: swap the two sections on Sources and in its rail. This changes order, not entries.
6. **Sources headings have hard line breaks.** "Conceptual &<br/>Theoretical Framework" and similar force a break that suits one width only; at 375px they break twice. Fix: remove the `<br/>`s and let `text-wrap: balance` handle them, as elsewhere.
7. **Hidden duplicate H2s.** Each chapter's key-terms panel has an H2 repeating the page name ("Juan Patricio"), set to `display: none`. It is harmless to screen readers (hidden from them too), but it is dead markup. Fix: leave it, or remove it in a later cleanup. Lowest priority.
8. **Consistency with Home.** With tagline option A, Home and the chapter pages share one lockup (kicker, title, deck beneath). About and Sources also follow it. No further change is needed.

Not changed and not proposed: the wording of any heading, prose or citation; the order of sections within chapters; the manuscript banner; the crimson band; the Framework/Case Studies chooser.
