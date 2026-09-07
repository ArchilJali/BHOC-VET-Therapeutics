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
- Species row: `rem-wirehaired-dachshund-sketch.webp`, `cat-loose-pencil-sketch.webp`, `camel-loose-pencil-sketch.webp`, `orangutan-loose-pencil-sketch.webp`, `marine-turtle-loose-pencil-sketch.webp` and `panda-loose-pencil-sketch.webp`.
- Rem identity reference: `assets/reference-dog-pencil.webp`. Preserve the face, expression and wiry beard.
- Molecular structures: `assets/chlorophyll.svg` and `assets/heme.svg`.
- Lower landscape: `assets/bhoc-mountain-landscape-pencil.webp`.

Do not substitute earlier hero, logo or portrait variants. Text, links, buttons and molecular labels remain native HTML/SVG and must not be baked into raster artwork.

## Pages and URL continuity

The indexed pages are `index.html`, `product.html`, `applications.html`, `evidence.html`, `science.html`, `initiative.html`, `related-information.html`, `news.html` and `contact.html`.

`publications.html` is intentionally retained as a `noindex,follow` redirect to `evidence.html`. Keep it so historical links continue to work. `404.html`, `CNAME`, `robots.txt` and `sitemap.xml` are also required.

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

Publication line: `First published 07 Sep 2026 · 7 updates · Last updated 07 Sep 2026 · Version 26.09.07`. Increment `publication.updates` for each future public release.

## Editing and verification

Edit only `content/` and `src/`. Generate deployable output with:

```sh
node scripts/build.mjs --out dist
node scripts/check-site.mjs dist
```

The public repository retains both `dist/` for the Sites project and compiled root files for the existing GitHub Pages configuration. Do not edit generated HTML directly. Do not commit private photos, temporary image-generation output or a new `design/` archive.
