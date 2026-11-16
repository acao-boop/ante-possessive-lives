# Preview of unpublished changes

The live site is the published version. During a session, edits to `site/` are reviewed in Claude's built-in browser before anything is published.

1. From the repository root: `python3 tools/preview/make_preview.py` (compares `site/` with the `published` tag).
2. Open https://acao-boop.github.io/ante-possessive-lives/ in the browser and run `tools/preview/preview.js` in that page.
3. The edited site appears over the live page, marked "Preview · unpublished". Page links inside it stay in the preview.

Limits: images, PDFs and other binary files come from the live site, so new or replaced images appear only after publishing. A preview frame cannot change the browser's address bar, so links copied from the preview point at the live page.

After publishing, move the tag: `git tag -f published`.
