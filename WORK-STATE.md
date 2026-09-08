# Current BHOC Veterinary work state

7 September 2026. This file records only the current implementation. Earlier experiments and authoring archives are intentionally excluded from the public repository.

## Identity and navigation

- Public website: `https://bhocvet.com/`.
- Primary name: `BHOC Veterinary`; alternate names: `BHOC Vet` and `BHOC Veterinary Therapeutics`.
- BHOC expands to `Biological Hemoglobin Oxygen Carrier`.
- Main navigation: `Product · Application · Evidence · Science · Initiative · Related Information · News`.
- The header links to active `www.bhoctherapeutics.com`; `www.bhoctransplant.com` remains visibly inactive until launch.
- Contact is available in the footer and search.

## Current visual authority

- Current desktop/mobile hero: `assets/bhoc-wildlife-rainbow-20260906-v2.webp`.
- Current Open Graph and WhatsApp image: `assets/bhoc-wildlife-rainbow-20260906-v2.png` (1672 × 941).
- Initiative mark: `assets/reference-initiative-mark.webp`.
- The same Initiative mark is used across the site; shared CSS masking prevents its square raster backing from showing against the cream/white layouts.
- The full Initiative homepage header shows one canonical Initiative logo. BHOC Therapeutics remains a clearly labelled text link, without a second logo.
- The Initiative header includes a visible return link to the BHOC Veterinary homepage. The responsive navigation menu repeats it as the first return action.
- The Initiative homepage palette uses forest green with a warm sunrise accent. The oxygen cascade and microcirculation concepts use crisp monochrome SVG symbols with warm sunrise connectors.
- Focus-area wildlife photographs are local, optimized 640 × 480 WebP assets with visible Wikimedia Commons credits and licenses. They render as equal compact thumbnails on desktop, tablet and mobile.
- The oxygen-delivery cascade follows the biological order Lungs → Blood → Organ → Cell → Mitochondrion. Each stage is a separate content item with a crisp monochrome SVG symbol and native HTML text.
- The earlier 1198 × 112 microcirculation raster is no longer rendered. The section now uses a responsive three-node vector schematic for erythrocytes, BHOC in plasma and microvascular tissue focus.
- Lung, blood-cell, organ and cell symbols are adapted from the CC0 Health Icons outline set. Asset provenance is recorded in assets/initiative/DIAGRAM-SOURCES.md.
- Species row: `rem-wirehaired-dachshund-sketch.webp`, `cat-loose-pencil-sketch.webp`, `camel-loose-pencil-sketch.webp`, `orangutan-loose-pencil-sketch.webp`, `marine-turtle-loose-pencil-sketch.webp` and `panda-loose-pencil-sketch.webp`.
- Rem identity reference: `assets/reference-dog-pencil.webp`. Preserve the face, expression and wiry beard.
- Molecular structures: `assets/chlorophyll.svg` and `assets/heme.svg`.
- Lower landscape: `assets/bhoc-mountain-landscape-pencil.webp`.

Do not substitute earlier hero, logo or portrait variants. Text, links, buttons and molecular labels remain native HTML/SVG and must not be baked into raster artwork.

## Pages and URL continuity

The indexed pages are `index.html`, `product.html`, `applications.html`, `evidence.html`, `science.html`, `initiative.html`, `initiative/`, `related-information.html`, `news.html` and `contact.html`.

`initiative/` is the full BHOC Species & Biodiversity Protection Initiative homepage based on the approved visual. The earlier `initiative.html` overview remains available and links to the full page. Source files live in `src/initiative/`; page-specific image assets live in `assets/initiative/`. Internal BHOC Veterinary routes stay in the same browser tab.

`publications.html` is intentionally retained as a `noindex,follow` redirect to `evidence.html`. Keep it so historical links continue to work. `404.html`, `CNAME`, `robots.txt` and `sitemap.xml` are also required.

The full Initiative homepage now uses the same independent-block architecture as the BHOC Veterinary homepage. Section order and visibility live in content/initiative/homepage.json; each section has its own JSON data file and renderer. The Initiative layout is compact and editorial, with a four-plus-three desktop focus grid, two columns on tablet and one column on phone. Main Initiative entry points open /initiative/ directly, while the earlier overview remains available at /initiative.html.

## Responsive behavior

- At 1080 px and below, primary navigation moves into the menu.
- At 600 px and below, the BHOC Veterinary wordmark becomes a compact horizontal row.
- At 720 px and below, the initiative mark and copy move below the hero as a readable row.
- On phones the order is hero copy, full-width wildlife image and initiative strip.
- The species carousel shows six cards on desktop, four on tablet and two on phone, with generated dots, arrows, touch scrolling and keyboard navigation.
- The homepage Science/Discover block is active and its molecular/story carousel remains touch-, keyboard- and control-navigable.

## Content and SEO

- Hero heading: `Precision Oxygen Therapeutics`.
- Product expansion: `BHOC - Biological Hemoglobin Oxygen Carrier`, with B, H, O and C emphasised and O in red.
- Initiative priority line: `Many species. Blood group systems, known and unknown. One BHOC system. One core design engineered by nature.`
- Science block heading: `Nature kept the core. Bioengineers build on that foundation.`
- Public attribution: `Project lead: BHOC Team`.
- Author and structured-data creator: `Archil Jaliashvili`.
- Canonical URL, Open Graph, X/Twitter metadata, schema, descriptive ALT text and sitemap entries must remain intact.
- The footer keeps LinkedIn and the full VET Evidence Platform as distinct destinations.

Publication line: `First published 07 Sep 2026 · 15 updates · Last updated 08 Sep 2026 · Version 26.09.08`. Increment `publication.updates` only when the shared BHOC Veterinary pages are intentionally republished.

## Editing and verification

Edit only `content/` and `src/`. Generate deployable output with:

```sh
node scripts/build.mjs --out dist
node scripts/check-site.mjs dist
```

The public repository retains both `dist/` for the Sites project and compiled root files for the existing GitHub Pages configuration. Do not edit generated HTML directly. Do not commit private photos, temporary image-generation output or a new `design/` archive.
