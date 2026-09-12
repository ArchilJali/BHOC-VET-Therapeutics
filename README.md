# BHOC Veterinary

Editable website pages and independent homepage blocks for [bhocvet.com](https://bhocvet.com/), based on Archil's supplied wildlife mockup.

**Start with [EDITING.md](EDITING.md).** Visual identity rules, including Rem’s canonical face, are in [DESIGN-RULES.md](DESIGN-RULES.md). Content and layout are separate. A wording change belongs in one content file, not in a screenshot or a page-sized image.

## Source map

| What changes | Source |
| --- | --- |
| Name, alternate names, author, SEO, footer | `content/site.json` |
| Navigation and BHOC network links | `content/header.json` |
| Section order and visibility | `content/homepage.json` |
| Hero text, image, initiative, buttons | `content/blocks/hero.json` |
| Biodiversity counts and source links | `content/blocks/biodiversity.json` |
| Species portraits, ALT, labels and links | `content/blocks/species.json` |
| Science introduction and Discover slides | `content/blocks/science.json` |
| Lower landscape and call to action | `content/blocks/mission.json` |
| Four initiative priorities | `content/blocks/pillars.json` |
| Species information and references | `content/species-details.json` |
| Product, Application, Evidence, Science, Initiative, Related Information, News and Contact pages | `content/pages/*.json` |
| Supporting About dialog text | `content/dialogs/about-dialog.html` |
| Search and interface labels | `content/interface.json` |
| Shared colors, typography and spacing | `src/styles/theme.css` |
| Layout for one block | `src/blocks/<type>.mjs`, `src/styles/<type>.css` |
| Layout for one inner page | `src/pages/<page>.mjs`, `src/styles/pages.css` |

## Initiative block architecture

The full Initiative homepage at /initiative/ is assembled from the ordered manifest in [content/initiative/homepage.json](content/initiative/homepage.json). Each visible section has its own content file in [content/initiative/blocks](content/initiative/blocks) and its own renderer in [src/initiative/blocks](src/initiative/blocks). Header, footer and SEO data are separate files in [content/initiative](content/initiative). The Initiative stylesheet remains shared, while every section and every Focus card can be developed or replaced without rewriting the page. Photo credits and licenses travel with each Focus card in its content data.

The historical overview page at /initiative.html remains part of the site. Primary Initiative navigation opens /initiative/ directly.

## Build

Node 22 or later. The static generator has no npm runtime dependencies.

```sh
node scripts/build.mjs --out dist
node scripts/check-site.mjs dist
```

The public repository keeps only current assets in `assets/` and source in `content/`, `src/`, `scripts/`. A GitHub Pages workflow generates the deployable HTML. Root `index.html` is a compiled fallback, not the editing source. The Work checkout keeps deployable output under `dist/`. Private photographs and intermediate art files are excluded.

The homepage and eight inner pages are present in HTML before JavaScript. Small client code adds navigation, dialogs, search, the contact-email handoff and carousels. No external font request, framework hydration or content API is required.

The build checks image descriptions/dimensions, local and cross-page links, unique block IDs and a single H1 on every page. The static gate checks nine indexed pages, unique titles and descriptions, social previews and the legacy Publications redirect. Unknown blocks and links to removed sections fail with a clear message. Existing singleton sections may appear once; `story` blocks can repeat with different IDs.

## Website roles

- [BHOC Veterinary](https://bhocvet.com/) is the main public veterinary website.
- [BHOC VET-platform](https://evidence.bhocvet.com/) is the guided veterinary evidence map.
- [BHOC Platform Veterinary](https://evidence.bhoctherapeutics.com/veterinary/Vet-index.html) is the full bibliography and regulatory source library.
- [BHOC Therapeutics](https://bhoctherapeutics.com/) is the corporate parent website.

Each level links to the next level and back to BHOC Veterinary so visitors do not need to infer the relationship from similar project names.

## Artwork

The main BHOC Veterinary wildlife artwork remains the approved asset exported from the supplied mockup. Do not regenerate that scene to change copy, links or typography. The Initiative homepage uses its separately approved graphite wildlife study and independently sourced Focus photographs. Do not replace either visual system without a new explicit request.

## Scientific and search identity

Primary: **BHOC Veterinary**. Alternate names: **BHOC Vet**, **BHOC Veterinary Therapeutics**. BHOC: **Biological Hemoglobin Oxygen Carrier**. Public footer: **Project lead: BHOC Team**. Author and creator metadata: **Archil Jaliashvili**.

Keyword authority remains [BHOC-Therapeutics/seo/BHOC-SEO-Keywords.md](https://github.com/ArchilJali/BHOC-Therapeutics/blob/main/seo/BHOC-SEO-Keywords.md). This repository does not maintain a competing keyword master.

Scientific and regulatory references describe their original products, species and contexts. Product, Application, Evidence, Science, Initiative, Related Information, News and Contact are maintained as ordinary inner pages rather than modal windows.
