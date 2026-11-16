# Preserving the Earlier Repository

The repository’s earlier files document real project development, including Braden Lipman’s original “Open the Scroll” interface, draft layouts, exported StoryMap material, working prose, and intermediate assets. They should not be discarded. They also should not remain mixed into the production branch, where future editors may mistake them for live dependencies and GitHub Pages may make them publicly addressable.

## Recommended structure

- `main`: only the current public site and its maintenance documentation
- `legacy-archive`: the complete repository as it existed immediately before the V1.0 deployment
- `legacy-pre-redesign`: an immutable Git tag pointing to that same pre-deployment state
- feature branches: future work that is not yet ready for publication

## Safe migration sequence

Perform this sequence from a current local clone of `davidkazanjian/dispossession`.

1. Confirm that the local `main` branch is synchronized with GitHub and that no collaborator has uncommitted work.
2. Create a branch named `legacy-archive` from the current pre-redesign state.
3. Push `legacy-archive` to GitHub and verify that its files can be viewed there.
4. Create and push an annotated tag named `legacy-pre-redesign` on the same commit.
5. Return to `main`.
6. Remove the old draft and experimental files from `main` through a normal Git commit. Because the branch and tag have already been pushed, this removal remains recoverable.
7. Copy the contents of the clean V1.0 deployment package into the repository root.
8. Commit the production replacement with a message such as `Release redesigned site v1.0.0`.
9. Push `main`, configure GitHub Pages to deploy from `main` and `/ (root)`, and inspect the resulting site.
10. After verification, create and push the public release tag `v1.0.0`.

Do not rewrite or squash the older Git history. The commit history itself is part of the development record.

## What belongs in the legacy branch

- original “Open the Scroll” files
- abandoned page structures and navigation experiments
- intermediate V23–V26 scripts and revision notes
- screenshots used only for review
- redundant or superseded image variants
- exported platform files that the final site does not load
- internal presentation drafts and temporary deployment instructions

## What belongs on `main`

- the six public HTML pages
- `styles.css` and `script.js`
- only the image assets referenced by the public pages
- `README.md`
- `MAINTENANCE.md`
- `CHANGELOG.md`
- `ASSET-CREDITS.md`
- `ARCHIVE-MIGRATION.md`
- `.gitignore` and `.nojekyll`

## Materials that require special handling

Do not commit private correspondence, restricted archival scans, unpublished readings, credentials, personal data, or files whose redistribution is prohibited. Git history is not an appropriate secure archive because deleting a file in a later commit does not remove it from earlier commits.

If a large source file is essential to project preservation but not to the public website, store it in the project’s approved institutional archive and record its location in the legacy branch without committing the restricted object itself.

