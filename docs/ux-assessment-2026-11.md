# Ante: layout, functionality and reading experience (2026-11-18)

Read-only assessment. No site files were changed. Requested by Andrew through the coordinator: "assess the current state … maybe both [Enoch] and Ante could have cleaner or just better internal article structure."

**Checked:** on the local server (`ante-local`), whose pages, CSS and JS match the live site byte for byte (SHA-256 checked on index, Juan Patricio, curation.css and curation.js). Desktop at 1280×800 and phone at 375×812, in both Paper and Night. I measured headings, sections and figures by script on all six pages. I tested search, "/" to open it, Saved, Save my place and Resume, Cite, the Paper/Night switch, Story Map loading, slider focus, the live 404, the live `/adam` address and the header tab order. **Not checked:** touch scrolling over the Story Maps on a real phone, and screen-reader speech. Reduced motion was checked in the code only, because the browser can't emulate that setting.

**Verdict:** the site is in good shape. Nothing is broken, and the 18 Nov fixes hold: phone reading starts on the first screen, side-list labels match their headings, the return links work, and there's no sideways scroll on any page. What's left is mostly **inconsistency between the two case pages** and **one weak point in re-entry**: the Saved list. The biggest single improvement is one shared section pattern (below), applied to Adam, Juan Patricio and Theory.

Who decides: items marked **[Collaborators]** touch wording, headings' text, order of argument or citations. Everything else is visual or invisible structure, which is Andrew's call.

---

## Proposed structure pattern: "one section frame"

Every H2 section on Theory, Adam and Juan Patricio follows the same frame. These changes are visual and markup only; no prose moves between sections.

1. **Opening:** either every H2 has a small italic kicker or only the first one does. Today it's mixed (see item 2).
2. **Body:** an H3 roughly every two or three phone screens. Juan Patricio and Adam already do this since today's subheadings.
3. **Figures sit inside the section they illustrate**, as real figures with captions, directly after the paragraph that discusses them. Today they float between sections, so each belongs to no section.
4. **Story Map uses the same frame on both pages:** "Interactive Map" kicker, H2, one-line intro, the map, caption, then "Open full screen". On phones the full-screen link sits above the map (item 6).
5. **Section close:** a single "Sources for this section →" line linking to the matching part of Sources (item 4). On phones it's followed by "On this page ↑", which already exists.

The two case pages already use the same section order (Overview, context, Story Map, then Implications), so the frame needs no reordering.

---

## Ranked findings

### 1. The Saved list is a dead end on chapter pages. **Strong**
- On any chapter page, opening Saved shows "No saved items yet" and tells you to go to Home to bookmark a chapter. A place you saved with "Save my place" doesn't appear in the list ("Your reading place is kept separately"), even though it's the one thing you have saved.
- The dialog also says "Chapters and sections saved in this browser", but sections can no longer be saved. That line is out of date.
- Re-entry otherwise works. Home shows "Continue reading: Adam Saffin · Implications", and chapter pages show "Resume saved place".
- **Fix:** put the saved place at the top of the Saved list ("Continue reading: … · Implications"). Correct the empty-state text to say what can actually be saved. Optional: let the header Saved button save the current chapter when the list is empty. This is interface text Andrew wrote, not collaborators' wording.

### 2. The two case pages are built differently underneath. **Strong** (markup) / **[Collaborators]** (kicker text)
| | Adam Saffin | Juan Patricio |
|---|---|---|
| Kickers on H2s | Overview, Historical Context, Interactive Map, then none on Indigenous Maps or Implications | Overview, Slavery in the Yucatán, Language in the Yucatán, Interactive Map, then none on Implications |
| Figures | real `<figure>` with caption | plain blocks with a caption paragraph (III.I, III.II, III.III), so screen readers don't hear them as figures |
| Story Map block | its own section, kicker, H2, one-line intro, frame | a figure block with kicker and H2 inside, no intro |
| "Related reading" / "Source note" | mid-page and at the end | at the end only |
| Theory | every H2 has a kicker | |
- **Fix (Andrew's call, invisible to readers):** turn Juan's three figure blocks into real figures. Give Juan's Story Map the same block as Adam's. Juan's first figure is also misnamed in the code (it carries the story-map class), which ties its styling to the map's.
- **Kicker rule [Collaborators, since kicker text is wording]:** either add kickers to the H2s that lack one (Indigenous Maps, both Implications), or keep kickers only on the opening section of each page. My pick is kickers on every H2, to match Theory (Lean: it's the smaller change on two pages, but it needs three new short phrases from them).
- Anchors stay as they are, even where their names don't match (Adam's `#saffin-details` is Indigenous Maps; Juan's `#patricio-details` is Implications). Renaming them would break shared links.

### 3. On phones, a reader deep in a long section has no way back to the list. **Lean**
- Phone page heights: Theory 18,840px, Juan Patricio 16,850, Adam 12,150. The longest sections are Juan's Slavery and Society (5,100px with its map figure, about six screens) and Language (4,460). "On this page ↑" appears only at the end of each section.
- **Fix:** the crimson band already shows the chapter name at its right ("Juan Patricio +"). Let it show the current section as you scroll ("Juan Patricio · Language"); tapping it opens the list. It adds no new bar or new sticky space, and it reuses the logic that already highlights the desktop side list. Lean, because the band is a protected element, but this changes only its label text.
- "Save my place" saves the section, not the paragraph, so in a 5,000px section Resume lands at the section's top. You could save the nearest H3 or paragraph instead. Toss-up: it's useful, but rarely needed.

### 4. Quotations and sources aren't linked. **Lean** / **[Collaborators]** for anything beyond links
- There are no footnotes. Block quotes end with "—Author, *Title*". The Sources page is separate, and only one link on each case page leads there (Theory has none). A reader who wants Restall or Hanks has to open Sources and look through the right part.
- **Fix (structure only):** add an invisible id to each Sources entry. Make each quote's attribution title a link to its entry, and close each section with "Sources for this section →". No citation text changes.
- **[Collaborators]:** page numbers on quotations, or real notes, would be scholarly additions, so they're the collaborators' decision.

### 5. Search index has fallen behind the pages. **Strong**
- The index has no entry for Juan's Story Map (Adam's has one). Only one figure is indexed ("Figure II"). Today's subheadings (Learning Maya, A shared linguistic world, …) aren't there. The Sources entries are still listed Juan before Adam.
- The result count is in Roman numerals ("IX results"), and so is the Saved count. That's hard to read for a number readers actually need. Use 9. Roman numerals stay where they name chapters.
- **Fix:** rebuild the index from the pages with a small script kept in `tools/`. It runs on Andrew's request, not as a build step, so it can't drift again. Switch counts to ordinary numbers.

### 6. Story Maps take up most of a phone screen. **Lean** (not verified on a real phone)
- Each map frame is 620px tall on a 812px screen. The maps can pan, so on a phone a swipe over the map probably moves the map rather than the page. I couldn't test real touch here.
- **Fix:** on phones, cut the frame to about 60% of the screen height and move "Open full screen" above the frame. Desktop stays as it is.

### 7. Theory's heading list mixes figure titles into the outline. **Lean**
- Theory has 22 headings. Half of them are titles inside the four diagrams ("From Theft to Recursive Dispossession", "Capture", "Propertization", …), so a screen-reader user's heading list jumps between argument and diagram labels.
- **Fix:** style the figure titles the same but stop marking them as headings. Their text is unchanged, so nothing changes on screen.

### 8. Figure numbering uses two schemes. **Toss-up** (Andrew's call)
- Theory uses "Figure I … IV"; the case pages use "Figure II.I … II.IV" and "III.I … III.III". "II.IV" is hard to read.
- Options: (a) Theory becomes I.I–I.IV, which keeps the Roman style and makes the scheme consistent; (b) everything becomes Arabic numbering (1.1, 2.4, 3.3), which is easier to read but less period-flavoured. My pick is (a), because it's the smaller change. It's a Toss-up because it's taste.

### 9. Wording points for the collaborators. **[Collaborators]**, Toss-up
- Theory's second H2 is a full question ("How might we then understand dispossession as the taking of what was not always previously…"). Its side-list label, "How Might We Then Understand Dispossession?", is much longer than every other label. A shorter heading or label is their call.
- Theory's Implications discusses Juan Patricio before Adam, the reverse of the site's order (Adam II, Juan III). It may be deliberate in the argument.

---

## Functionality check

| Feature | Result |
|---|---|
| Search | Works. "/" opens it with focus in the box, Escape returns focus to the button. Index gaps and Roman counts are in item 5. |
| Saved / bookmarks | Card bookmarks on Home work (checked 18 Nov). On chapter pages, see item 1. |
| Save my place / Resume | Saves and resumes. Home shows "Continue reading". Saves at section level (item 3). Right after a jump-scroll, the current-section highlight took up to about a second to update, so a click in that moment could save the previous section. That's minor, and I only saw it with script scrolling. |
| Cite | Chicago and MLA generate correctly, Copy gets focus, and the short `/adam` address resolves on the live site. |
| Paper / Night / Device | Switches and remembers the choice. |
| Story Maps | Load only when scrolled near (checked on Juan), with a fallback link. Phone size is in item 6. |
| Map comparison slider | Visible focus ring on the slider and its handle (the 16 Nov fix holds). |
| 404 | The live missing-page address returns the styled 404, and its links use the project folder. |
| Keyboard | Header order is wordmark, chapters, Saved, Search, then the side list, Key terms, Sources and the reading tools. It's logical. |
| Reduced motion | In the code: all three style layers and the anchor scrolling respect it. Not tested live. |

## Layout check (first screen to last)
- **Desktop 1280:** three columns read well: side list, text, Key terms. All stick, without overlap. Home's Contents starts at 1,141px, below an 800px screen, because of the manuscript banner, which is protected. The band's Contents link covers it, and "Continue reading" sits above the title. No change proposed.
- **Phone 375:** reading starts at about 550px on chapter pages. The sticky header is 118px. No sideways scroll on any page. Key terms sit at the very end of each chapter (16,230px on Juan). They're reachable from "On this page" and by tapping a term, so that's acceptable.
- **About and Sources:** short and clean. Sources follows the frame already, apart from the missing per-entry anchors (item 4).

---

## Kazanjian's published scholarship on the site (added on Andrew's follow-up)

**The earlier image review still holds (Strong).** Of the three Kazanjian pieces the site cites, only "Infrastructure in Black" (*Social Text*, 2023) has figures. Its Fig. 3, the Woodbury plan of Bristol, is already on Adam's page. Figs. 1, 2 and 4 are modern locator maps with pins, so they add nothing the site lacks. The other two pieces have no images. There is nothing more to borrow.

**How his work shows up now:** each chapter opens with a "Related scholarship" plate. For Theory and Juan Patricio it shows a title-page detail; for Adam it shows the Woodbury plan. Each plate links to a free PDF on Penn's site, and all three links returned 200 today. He is also quoted in block quotes, named in Adam's "Related reading" and "Source note", and listed on Sources with DOIs or Penn's publication page.

1. **The Woodbury plan has no visible credit to whoever holds the original. Strong. [Collaborators] to confirm the wording.** The project notes record it as in Bristol Town Hall, with copies at the Bristol Historical and Preservation Society. Neither the page nor Sources says so; the plate reads only "Woodbury's Bristol plan, detail." **Fix:** add a one-line source to the plate: "Samuel Woodbury, plan of Bristol, c. 1690–1730; Bristol Town Hall. As reproduced in Kazanjian, 'Infrastructure in Black,' fig. 3."
2. **Adam's most relevant archival image is shown at thumbnail size. Lean.** The Woodbury plan is the town Adam's case happened in, but it appears only as a 267px plate in the page header. **Option:** keep the plate and also show the plan as a full, enlargeable figure in "Black Labor and Native Land", which already uses the image viewer. The caption would come from Kazanjian's own figure caption, so the caption is theirs to approve.
3. **Mentions in the text don't link anywhere. Lean.** "Infrastructure in Black" in Adam's Related reading and Source note, and the "Ante-Possession" quote attributions, are plain text. **Fix:** link them to his entries on Sources, the same approach as item 4. No text changes.
4. **The plate links point to two different kinds of target. Toss-up, so leave them as they are.** Plates go to the free Penn PDFs; Sources goes to DOIs, which may be paywalled, and to Penn's publication page. The free PDFs serve readers better. The risk is that Penn renames the files, so check them each time the site is published.
5. **The two title-page plates (Theory, Juan Patricio). Toss-up, so keep them.** Their captions repeat the title the image shows. Still, they tell the reader at a glance that the chapter rests on a published essay, which is worth one small image.
6. **More of his work?** Adding other Kazanjian works to Sources or the plates is a scholarly choice. **[Collaborators]**

## Decisions for Andrew
1. **Saved list fix** (item 1): show the saved place, fix the empty-state text. Strong.
2. **Make the case pages match underneath** (item 2: real figures, the same Story Map block). Strong. Send the kicker question to the collaborators.
3. **Rebuild the search index and use ordinary numbers for counts** (item 5). Strong.
4. **Current section in the crimson band on phones** (item 3). Lean.
5. **Link quotes to Sources entries** (item 4). Lean. Ask the collaborators about page numbers.
6. **Smaller Story Maps on phones** (item 6) and **figure titles out of Theory's outline** (item 7). Lean.
7. **Figure numbering** (item 8): (a) I.I–I.IV or (b) Arabic. Toss-up.
8. **Kazanjian scholarship:** a credit line for the Woodbury plan (Strong; ask Kazanjian to confirm the wording); optionally the plan as a full figure (Lean); link mentions of his work to Sources (Lean).
9. **For the collaborators, no action from Andrew:** kickers on every H2, Theory's question heading, Juan/Adam order in Theory's Implications, page numbers on quotes.

If he says GO on 1–3, they fit in one session: local commit, checked at both widths, published only on his yes.

---

## Andrew's decisions (19 Nov 2026)

Asked one at a time; all chose the recommended option unless noted.

1. **Saved list:** the saved place goes at the top of the list, and the empty-state text is corrected.
2. **Case pages:** Juan Patricio's figures become real figures, and his Story Map uses Adam's block. Nothing visible moves.
3. **Search:** rebuild the index from the pages with a rerunnable helper in `tools/`; counts in ordinary numbers.
4. **Phone navigation:** the crimson band's right label shows the current section; tapping it opens the list.
5. **Source links:** quote attributions and mentions link to their Sources entries (entries get anchors), and each section ends with "Sources for this section →".
6. **Phone Story Maps:** about 60% of the screen height, with "Open full screen" above the map.
7. **Theory diagrams (Andrew's own answer, in place of the heading-list question):** "Reconstruct the diagrams if you see fit — pitch them if you have actual disagreements with the models based on your understanding of the scholarship or just optimize current visuals." Pitched and chosen:
   - **Diagram I:** keep both rows. On the recursive row, add a dashed backward arrow from "rendered as ownership" to the start, with a short label saying the ownership appears to have come first. This is Nichols's recursive point.
   - **Diagram II:** three overlapping circles (Before, Against, Apposite), with Ante-Possession where all three meet. No numerals and no top box. Same wording.
   - **Diagram III:** a widening spiral in place of the closed circle. Phones get a visible "back to Capture, on a larger scale" return. "Capitalized" becomes "Capitalization".
   - Rebuilt as inline SVG/HTML. Figure titles stop counting as headings but keep their look, which also settles the heading-list item.
8. **Figure numbering:** Roman throughout, so Theory becomes Figure I.I–I.IV.
9. **Woodbury credit:** committed locally (6c776f1), held for the batch.

**For the collaborators (not asked):** kickers on every H2 (three new phrases); Theory's long question heading; the Juan/Adam order in Theory's Implications; page numbers on quotations; Kazanjian's sign-off on the Woodbury credit wording. **Also worth showing Kazanjian before publishing:** the three rebuilt diagrams, since they change how his models are drawn, and the "Capitalization" label.
