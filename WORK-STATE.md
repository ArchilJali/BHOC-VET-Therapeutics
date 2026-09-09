# Current BHOC Veterinary work state

9 September 2026. This file records only the current implementation. Earlier experiments and authoring archives are intentionally excluded from the public repository.

## Identity and navigation

- Public website: `https://bhocvet.com/`.
- Primary name: `BHOC Veterinary`; alternate names: `BHOC Vet` and `BHOC Veterinary Therapeutics`.
- BHOC expands to `Biological Hemoglobin Oxygen Carrier`.
- Main navigation starts with a visually distinct `Species & Biodiversity Protection` entry carrying the Initiative logo, followed by `Product · Application · Evidence · Science · Related Information · News`.
- The header links to active `www.bhoctherapeutics.com`; `www.bhoctransplant.com` remains visibly inactive until launch.
- Contact is available in the footer and search.

## Current visual authority

- Current desktop/mobile hero carousel: `assets/bhoc-initiative-land-hero-v2.webp`, `assets/bhoc-initiative-winter-hero.webp` and `assets/bhoc-initiative-ocean-hero-v2.webp`, in Land, Winter, Ocean order. The Land artwork has no baked-in carousel indicators; all three slides use only the live accessible controls.
- Directly below that hero, the BHOC Veterinary homepage has two independently editable blocks: the Initiative introduction strip and the Science Bridge carousel. The Science Bridge uses `assets/science-bridge-reference.png`; its wolf credit is not overlaid on the image, while the full creator, source, licence, verification and file-history record is preserved under `gray-wolf` in `content/initiative/image-provenance.json` and `initiative/image-rights.html`.
- Current Open Graph and WhatsApp image: `assets/bhoc-initiative-land-social.jpg` (1200 × 463), an uncropped copy of the approved Land hero.
- Initiative mark: `assets/reference-initiative-mark.webp`.
- The same Initiative mark is used across the site; shared CSS masking prevents its square raster backing from showing against the cream/white layouts.
- The full Initiative homepage header shows one canonical Initiative logo and a slim, explicit `Back to BHOC Veterinary` return bar above the Initiative navigation. Its navigation collapses into the same menu on narrow screens.
- The Initiative homepage has its own conservation palette: white and near-black forest green, one vivid emerald action accent, oxygen teal reserved for the Science Bridge and red reserved for the RBC/BHOC comparison.
- The canonical Initiative mark is also the page favicon and the `Organization.logo` ImageObject in structured data; preserve its current file, dimensions, ALT text and identity.
- The Initiative hero is a modular six-photo wildlife composition. Every photograph remains independently editable in `content/initiative/blocks/hero.json`; its full legal source record is also preserved in `content/initiative/image-provenance.json`.
- The Initiative hero renders three lower controls. The first gallery is active; controls two and three remain visibly reserved and disabled until approved slides are supplied.
- The evidence statistics strip pairs `A world worth protecting` with a small canonical Initiative mark. The Kipling quotation `We be of one blood, ye and I.` sits in its own centered, lightly offset editorial line below, with its author and *The Jungle Book* attribution underneath.
- Focus-area wildlife photographs are local, optimized WebP assets. Photo-credit overlays are intentionally absent from the main Initiative composition. Creator, source, licence, verification date, processing history, purpose and file hash remain preserved in `content/initiative/image-provenance.json` and the separate `noindex` page at `initiative/image-rights.html`.
- The tiger, elephant and turtle 960 × 960 WebP crops remain sourced from public-domain or attribution-compatible USFWS and NOAA photographs. Their current uses and exact source data are stored in the active Initiative block JSON.
- The Science Bridge shows the complete user-supplied `BHOC vs RBC >400× smaller` comparison as an independent optimized image. The compatibility and room-temperature shelf-life statements remain separate native text below it, followed by public links to BHOC Veterinary, BHOC Therapeutics and the full VET Evidence Library.
- The Initiative footer has its own four-part navigation directory, BHOC network links and publication details. Its legal notice is now a compact warning line; `Legal details` opens a small accessible dialog containing the full protected-content terms, third-party image boundary, image-rights register link and permission contact.
- Species row: `rem-wirehaired-dachshund-sketch.webp`, `cat-loose-pencil-sketch.webp`, `camel-loose-pencil-sketch.webp`, `orangutan-loose-pencil-sketch.webp`, `marine-turtle-loose-pencil-sketch.webp` and `panda-loose-pencil-sketch.webp`.
- Rem identity reference: `assets/reference-dog-pencil.webp`. Preserve the face, expression and wiry beard.
- Molecular structures: `assets/chlorophyll.svg` and `assets/heme.svg`.
- Lower landscape: `assets/bhoc-mountain-landscape-pencil.webp`.

Do not substitute earlier hero, logo or portrait variants. Superseded and unused public assets have been removed. Text, links, buttons and molecular labels remain native HTML/SVG and must not be baked into raster artwork.

## Pages and URL continuity

The indexed pages are `index.html`, `product.html`, `applications.html`, `evidence.html`, `science.html`, `initiative.html`, `initiative/`, `related-information.html`, `news.html` and `contact.html`.

`initiative/` is the full BHOC Species & Biodiversity Protection Initiative homepage based on the approved visual. The earlier `initiative.html` overview remains available and links to the full page. Source files live in `src/initiative/`; page-specific image assets live in `assets/initiative/`. Internal BHOC Veterinary routes stay in the same browser tab.

`initiative/image-rights.html` is a separate `noindex,follow` image-rights and provenance register. It is generated from `content/initiative/image-provenance.json`, is linked only from the Initiative protected-content notice and must not be replaced by visible per-photo captions on the main Initiative page.

`publications.html` is intentionally retained as a `noindex,follow` redirect to `evidence.html`. Keep it so historical links continue to work. `404.html`, `CNAME`, `robots.txt` and `sitemap.xml` are also required.

The full Initiative homepage uses five independent blocks: hero, evidence statistics, conservation mission, focus areas and science bridge. Section order and visibility live in `content/initiative/homepage.json`; each section has its own JSON data file and renderer. Main Initiative entry points open `/initiative/` directly, while the earlier overview remains available at `/initiative.html`.

## Responsive behavior

- At 1080 px and below, primary navigation moves into the menu.
- The Initiative hero keeps its copy, six licensed photographs and slide controls as separate responsive layers.
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

Publication line: `First published 07 Sep 2026 · 18 updates · Last updated 09 Sep 2026 · Version 26.09.09`. Increment `publication.updates` only when the shared BHOC Veterinary pages are intentionally republished.

## Editing and verification

Edit only `content/` and `src/`. Generate deployable output with:

```sh
node scripts/build.mjs --out dist
node scripts/check-site.mjs dist
```

The public repository retains both `dist/` for the Sites project and compiled root files for the existing GitHub Pages configuration. Do not edit generated HTML directly. Do not commit private photos, temporary image-generation output or a new `design/` archive.
