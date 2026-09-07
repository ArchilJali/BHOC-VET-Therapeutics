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
| Science, Applications, Publications, News and Contact pages | `content/pages/*.json` |
| Supporting About dialog text | `content/dialogs/about-dialog.html` |
| Search and interface labels | `content/interface.json` |
| Shared colors, typography and spacing | `src/styles/theme.css` |
| Layout for one block | `src/blocks/<type>.mjs`, `src/styles/<type>.css` |
| Layout for one inner page | `src/pages/<page>.mjs`, `src/styles/pages.css` |

## Build

Node 22 or later. The static generator has no npm runtime dependencies.

```sh
node scripts/build.mjs --out dist
node scripts/check-site.mjs dist
```

The public repository keeps assets in `assets/` and source in `content/`, `src/`, `scripts/`. A GitHub Pages workflow generates the deployable HTML. Root `index.html` is a compiled fallback, not the editing source. The Work checkout keeps deployable assets under `dist/assets/`, uses the same generator, and retains private art references separately.

The homepage and five inner pages are present in HTML before JavaScript. Small client code adds navigation, dialogs, search, the contact-email handoff and carousels. No external font request, framework hydration or content API is required.

The build checks image descriptions/dimensions, local and cross-page links, unique block IDs and a single H1 on every page. The static gate also checks six distinct canonical pages, titles, descriptions and social previews. Unknown blocks and links to removed sections fail with a clear message. Existing singleton sections may appear once; `story` blocks can repeat with different IDs.

## Website roles

- [BHOC Veterinary](https://bhocvet.com/) is the main public veterinary website.
- [BHOC VET-platform](https://archiljali.github.io/BHOC-VET-platform/) is the guided veterinary evidence map.
- [BHOC Platform Veterinary](https://archiljali.github.io/BHOC-platform/veterinary/Vet-index.html) is the full bibliography and regulatory source library.
- [BHOC Therapeutics](https://bhoctherapeutics.com/) is the corporate parent website.

Each level links to the next level and back to BHOC Veterinary so visitors do not need to infer the relationship from similar project names.

## Artwork

Animals and initiative artwork are exported from the supplied mockup. A bounded sky cleanup removes raster interface text only. Do not regenerate the scene to change copy, links or typography. A tightly bounded image correction is permitted only when Archil explicitly requests it, and must preserve the approved faces and the rest of the composition. Original animal photographs and authoring files are private and are not included in the public repository.

## Scientific and search identity

Primary: **BHOC Veterinary**. Alternate names: **BHOC Vet**, **BHOC Veterinary Therapeutics**. BHOC: **Biological Hemoglobin Oxygen Carrier**. Public footer: **Project lead: BHOC Team**. Author and creator metadata: **Archil Jaliashvili**.

Keyword authority remains [BHOC-Therapeutics/seo/BHOC-SEO-Keywords.md](https://github.com/ArchilJali/BHOC-Therapeutics/blob/main/seo/BHOC-SEO-Keywords.md). This repository does not maintain a competing keyword master.

Scientific and regulatory references describe their original products, species and contexts. Science, Applications, Publications, News and Contact are maintained as ordinary inner pages rather than modal windows.
