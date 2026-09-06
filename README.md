# BHOC Veterinary

Editable, independent homepage blocks for [bhocvet.com](https://bhocvet.com/), based on Archil's supplied wildlife mockup.

**Start with [EDITING.md](EDITING.md).** Content and layout are separate. A wording change belongs in one content file, not in a screenshot or a page-sized image.

## Source map

| What changes | Source |
| --- | --- |
| Name, alternate names, author, SEO, footer | `content/site.json` |
| Navigation and top button | `content/header.json` |
| Section order and visibility | `content/homepage.json` |
| Hero text, image, initiative, buttons | `content/blocks/hero.json` |
| Biodiversity counts and source links | `content/blocks/biodiversity.json` |
| Species portraits, ALT, labels and links | `content/blocks/species.json` |
| Science introduction and Discover slides | `content/blocks/science.json` |
| Lower landscape and call to action | `content/blocks/mission.json` |
| Four initiative priorities | `content/blocks/pillars.json` |
| Species information and references | `content/species-details.json` |
| Supporting dialog text | `content/dialogs/*.html` |
| Search and interface labels | `content/interface.json` |
| Shared colors, typography and spacing | `src/styles/theme.css` |
| Layout for one block | `src/blocks/<type>.mjs`, `src/styles/<type>.css` |

## Build

Node 22 or later. The static generator has no npm runtime dependencies.

```sh
node scripts/build.mjs --out dist
node scripts/check-site.mjs dist
```

The public repository keeps assets in `assets/` and source in `content/`, `src/`, `scripts/`. A GitHub Pages workflow generates the deployable HTML. Root `index.html` is a compiled fallback, not the editing source. The Work checkout keeps deployable assets under `dist/assets/`, uses the same generator, and retains private art references separately.

The full homepage is present in HTML before JavaScript. Small client code adds navigation, dialogs, search and carousels. No external font request, framework hydration or content API is required.

The build checks image descriptions/dimensions, links, unique block IDs and a single H1. Unknown blocks and links to removed sections fail with a clear message. Existing singleton sections may appear once; `story` blocks can repeat with different IDs.

## Artwork

Animals and initiative artwork are exported from the supplied mockup. A bounded sky cleanup removes raster interface text only. Do not regenerate the scene to change copy, links, typography or one small detail. Original animal photographs and authoring files are private and are not included in the public repository.

## Scientific and search identity

Primary: **BHOC Veterinary**. Alternate names: **BHOC Vet**, **BHOC Veterinary Therapeutics**. BHOC: **Biological Hemoglobin Oxygen Carrier**. Project lead: **Archil Jaliashvili**.

Keyword authority remains [BHOC-Therapeutics/seo/BHOC-SEO-Keywords.md](https://github.com/ArchilJali/BHOC-Therapeutics/blob/main/seo/BHOC-SEO-Keywords.md). This repository does not maintain a competing keyword master.

Scientific and regulatory references describe their original products, species and contexts. Individual inner pages are the next content phase.
