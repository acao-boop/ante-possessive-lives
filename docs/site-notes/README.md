# Ante-Possessive Lives in the Americas

This repository contains the public website for *Ante-Possessive Lives in the Americas*, a collaborative digital humanities project directed by David Kazanjian at the University of Pennsylvania. The project places the histories of Adam Saffin in colonial New England and Juan Patricio in colonial Yucatán in conversation with a theory of dispossession, possession, and ante-possession.

The expected GitHub Pages address is:

<https://davidkazanjian.github.io/dispossession/>

## Current release

Public release **1.0.0** corresponds to the final internal editorial build, **V26.4**, completed in August 2026. It consolidates the revised prose, responsive layouts, theory diagrams, case-study figures, citations, interactive comparison slider, and Knight Lab StoryMap embeds.

## Project team

- David Kazanjian, project director and faculty mentor
- Andrew Cao, theory research and writing, primary web design, site integration, and site-wide editorial refinement
- Braden Lipman, Adam Saffin research, writing, archival work, and StoryMap development
- Gabriela Chavez Hernandez, Juan Patricio research, writing, transcription, and StoryMap development
- Stella Jingyi Li and Lizbeth Luevano, contributors to the project’s earlier Stanford iteration

Full roles and institutional affiliations appear on `credits.html`.

## Repository contents

- `index.html`: landing page and project index
- `theory.html`: Theory & Method
- `adam.html`: Adam Saffin case study
- `juan-patricio.html`: Juan Patricio case study
- `bibliography.html`: sources and bibliography
- `credits.html`: project description, contributors, and credits
- `styles.css`: the complete responsive design system
- `script.js`: navigation behavior, deferred StoryMap loading, and the Juan Patricio comparison slider
- image files: locally hosted figures, maps, portraits, and page artwork
- `MAINTENANCE.md`: editing, testing, and release instructions
- `ASSET-CREDITS.md`: source and rights notes for locally hosted images
- `ARCHIVE-MIGRATION.md`: instructions for preserving earlier drafts outside the production branch
- `CHANGELOG.md`: public release history

The site uses plain HTML, CSS, and JavaScript. It has no build step or package dependencies.

## Run locally

From the repository root, start a local server:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. A local server is preferable to opening the HTML files directly because it more closely reproduces GitHub Pages behavior.

## Deploy through GitHub Pages

1. Open the repository’s **Settings**.
2. Select **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder.
5. Save and wait for GitHub Pages to report a successful deployment.

Before replacing earlier repository contents, preserve them using the process in `ARCHIVE-MIGRATION.md`.

## Maintenance

Begin with `MAINTENANCE.md`. Future editors should preserve source credit, descriptive alternative text, responsive behavior, and the distinction between original case-study authorship and later site-wide editing.

