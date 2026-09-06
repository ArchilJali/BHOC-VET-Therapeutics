# BHOC Veterinary

Responsive production implementation of the approved 6 September 2026 visual. The orange/cream palette, initiative mark, pencil animal portraits, composition, biodiversity statistics and scientific carousel follow the supplied visual. Do not redesign without Archil's instruction.

## Website

The complete static website is published at the GitHub repository root through the existing Pages branch deployment. The Work checkout keeps these same public files in `dist/`. No framework runtime, dependency installation or build is required. The public canonical domain is `https://bhocvet.com/`.

`dist/index.html` contains the page, accessible dialogs and SEO metadata; `styles.css` controls responsive layouts; `app.js` implements navigation, species exploration, scientific tabs and search. Main breakpoints: 1250, 1050, 860, 540 and 370 px. Native horizontal scrolling and reduced-motion support are included. Text is HTML, never baked into a screenshot except for the preserved initiative logo artwork.

## Design assets

- `approved-visual.webp`: optimized approved source image. CSS windows preserve the exact supplied initiative logo, species portraits and botanical art.
- `animal-hero.webp`: production artwork extracted from the approved hero concept, with website text removed for responsive HTML typesetting.
- `heme.svg`, `chlorophyll.svg`: molecular structures from ChEBI, EMBL-EBI (see `SOURCES.md`).

## Editorial rules

Use “Precision Oxygen Therapeutics”. Keep clinical/regulatory evidence species-specific. Preserve the distinct roles of hemoglobin and heme. Do not present heme and chlorophyll as identical molecules, or infer product approval from common biology. The featured species are biodiversity examples, not a list of approved indications.

The animal count is from Catalogue of Life. IUCN assessed/threatened counts span taxonomic groups. Dates and source links are embedded on the site. The website does not claim Google ranking, product approval, affiliation with cited organizations or treatment outcomes.

No cookies, analytics tags, external fonts, third-party scripts or personal-data collection forms are included. Contact opens the visitor's email application.
