# BHOC Veterinary

The 6 September 2026 muted pencil homepage at https://bhocvet.com/. The central dog's likeness and rectangular hero seams have been repaired locally against the original photographs and checked in the browser. See `WORK-STATE.md` before changing or publishing artwork.

The active design and editorial constraints are in `WORK-STATE.md`. The composition reference and original dog photographs are retained under `design/`. Do not substitute an older whole hero or regenerate the entire scene to fix a detail.

Public source lives in `dist/`. `index.html` is semantic page content, `styles.css` retains the existing interface behavior styles, and `approved-homepage.css` implements the approved visual and responsive layouts. `app.js` provides navigation, species details, search and the general Discover carousel. Molecular SVGs are sourced from ChEBI.

`prepare-approved-assets.cjs` makes exact lossless crops of the retained composition reference using Sharp. `compose-scene-repair.cjs` produces the current hero by integrating only the documented local image edits and checking every unchanged region. These are authoring tools, not website runtime dependencies. Deploy the contents of `dist/` at the GitHub repository root. The same `dist/` is packaged for the existing Work Site.

Species labels, initiative mark and Biodiversity context are active on-page links. Their existing information is available in accessible dialogs while individual inner pages await the next development phase.

See `SEO-IMPLEMENTATION.md` for metadata decisions and `SOURCES.md` for source attribution. Retain older assets for existing published references, but do not use them as the current homepage artwork.

For explicitly requested browser QA, the repository now includes a Vite development setup serving the existing `dist/` unchanged through the supported supervised preview. It does not change the static deployment architecture. Install using the committed npm lockfile. Publishing still uses the authored files in `dist/`; do not run a bundler into that source directory.
