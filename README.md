# BHOC Veterinary

The approved 6 September 2026 muted pencil homepage, published at https://bhocvet.com/.

The active design and editorial constraints are in `WORK-STATE.md`. The approved reference is retained under `design/`. Do not substitute an older hero or regenerate artwork during implementation.

Public source lives in `dist/`. `index.html` is semantic page content, `styles.css` retains the existing interface behavior styles, and `approved-homepage.css` implements the approved visual and responsive layouts. `app.js` provides navigation, species details, search and the general Discover carousel. Molecular SVGs are sourced from ChEBI.

`prepare-approved-assets.cjs` makes exact lossless crops of the approved reference using Sharp. It is an authoring tool, not a website runtime dependency. Deploy the contents of `dist/` at the GitHub repository root. The same `dist/` is packaged for the existing Work Site.

Species labels, initiative mark and Biodiversity context are active on-page links. Their existing information is available in accessible dialogs while individual inner pages await the next development phase.

See `SEO-IMPLEMENTATION.md` for metadata decisions and `SOURCES.md` for source attribution. Retain older assets for existing published references, but do not use them as the current homepage artwork.
