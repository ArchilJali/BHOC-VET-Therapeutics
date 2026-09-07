# Current BHOC Veterinary work state

7 September 2026. The current source is a Zoetis-inspired BHOC Veterinary redesign. It retains every approved animal and initiative asset unchanged while reorganising navigation, product positioning, evidence and footer content. The sections below this current-state summary record earlier decisions and remain historical unless the current summary says otherwise.

## Current visual system and header

The interface now uses a consistent Zoetis-inspired palette: primary orange `#f65c00`, soft orange and peach tints, white content surfaces and dark charcoal information bands. This is a visual reference only and does not imply affiliation with Zoetis. The BHOC wordmark keeps its own navy letters and red O.

The header colour extends across the full viewport. Beneath the editable `BHOC` wordmark are `VETERINARY` and `Biological Hemoglobin Oxygen Carrier`. The primary navigation is exactly `Product · Application · Evidence · Science · Initiative · Related Information · News`. The logo returns home; Contact remains available in the footer and search rather than competing in the primary row. At 1080 px and below, navigation moves into the menu. At 600 px and below, BHOC and its explanatory text form a compact horizontal row with Search and Menu still visible.

The compact network bar contains the two other BHOC destinations: active `www.bhoctherapeutics.com` and visibly inactive future `www.bhoctransplant.com`. Mobile labels omit only `www.`.

## Current homepage and data sources

The hero remains a modern two-column composition: scientific copy on the left and the approved wildlife image in a contained panel on the right. Desktop shows `Precision Oxygen Therapeutics` on two balanced lines. Beneath it, `BHOC - Biological Hemoglobin Oxygen Carrier` emphasises the B, H, O and C initials. The product intent and target profile are explicitly framed as development objectives; the evidence note keeps species-specific dosing, safety and efficacy separate from positioning. The actions are `Product` and `Application`.

On phones the order is copy, full-width wildlife image, then the compact initiative strip. The approved wildlife illustration, initiative mark and species portraits have not been regenerated or modified in this release.

In Biodiversity context, the paw, globe and leaf appear above the figures. Only those three icons are active source links; the numeric and explanatory text is intentionally not linked. The former generic healthy-species manifesto is replaced by `How many species? How many blood-group systems?`, a concise development-positioning statement, an internal Evidence link and the verified Kipling line `We be of one blood, ye and I.` The first descriptive source is the IUCN Red List of Threatened Species, followed by the Catalogue of Life global species catalogue. The scope note retains the 9 July 2026 IUCN 2026-1 release date and the all-assessed-groups boundary.

## Current pages, routes and footer

The indexed inner pages are Product, Application, Evidence, Science, Initiative, Related Information, News and Contact. Product separates product identity, target-development objectives and the regulatory boundary. Evidence contains Scientific publications and Regulatory records. Related Information contains Professional publications, Related scientific information and Conservation databases. Initiative holds the full species and biodiversity material.

The old `publications.html` route is retained only as a `noindex,follow` redirect with canonical destination `evidence.html`, so old links remain useful without creating a duplicate search page. Internal routes open in the same tab; external corporate and source links remain labelled and open separately.

The footer follows the corporate information architecture in five compact columns: Product, Application, Evidence & Science, Initiative and Information. It keeps two distinct external actions, LinkedIn and the full VET Evidence Platform at `BHOC-platform/veterinary/Vet-index.html`. No footer destination is duplicated. The visible attribution is `Project lead: BHOC Team`; Archil Jaliashvili remains embedded in author, creator and structured-data metadata.

The prepared revision line is `First published 07 Sep 2026 · 5 updates · Last updated 07 Sep 2026 · Version 26.09.07`. Each future public release must increment `publication.updates`, set `publication.lastUpdated`, and update the version in `content/site.json`.

## Current verification

Static checks cover nine indexed pages plus the legacy redirect, unique titles and descriptions, one H1 per page, duplicate IDs, all image ALT/dimensions, canonical URLs, schema types, Open Graph/X metadata, the sitemap, exact navigation order, source-link ownership and unique footer destinations. The approved 1672 × 941 PNG remains the WhatsApp/Open Graph image while the optimised WebP remains the visual hero.

Browser QA covered the 1363 px homepage and Product page, all eight inner-page routes, a 390 px phone frame and a 320 px narrow-phone frame. Navigation collapses correctly, the wordmark becomes horizontal, the hero image follows the copy, the mobile menu opens, statistics and footer reflow, and all measured document widths have no horizontal overflow. A 320 px overlap between the first two biodiversity counts was found and corrected with a narrow-only number size.

The narrow manifesto rail and the decorative orange rule above the hero lion have been removed. The hero asset itself remains byte-identical. The new biodiversity message is a fourth column on wide screens, a readable horizontal panel at intermediate widths and a compact stacked panel on phones. Initiative language now follows the same logic: many species and blood systems, one evidence standard.

## Latest header and science update

The thin network bar above the main header now presents `www.bhoctherapeutics.com` as an active external link and `www.bhoctransplant.com` as a visibly inactive future link. Both use the native globe icon. On phone widths the labels omit only `www.` to fit cleanly without horizontal overflow.

At 520 px and below, the editable BHOC Veterinary wordmark changes from stacked to horizontal: BHOC and VETERINARY remain proportionally sized in one row. The search and menu controls remain available.

The Discover comparison now gives the chlorophyll tetrapyrrole core the same apparent scale as heme. The underlying chlorophyll SVG paths remain intact while its displayed viewBox focuses the shared core. Central Mg is green and central Fe is red. Desktop plus 390 px and 320 px narrow viewports were visually checked; both molecule boxes remain equal, the network link states are correct and document width has no overflow.

The large Species & Biodiversity Protection Initiative mark remains beside the wildlife scene while there is enough room. At 720 px and below, before its minimum text sizes can distort the composition, the complete initiative block moves below the hero content as its own centred row. This behavior is separate from the compact horizontal BHOC Veterinary header wordmark. The transition was checked on both sides at 721 px and 720 px, then at 390 px and 320 px phone widths; the hero copy stays full width and no horizontal overflow appears.

The initiative artwork and its editable native copy are now separate layout elements. Desktop keeps the approved stacked presentation. At 720 px and below, the mark sits to the left and the title, tagline, promise and link sit in a readable text column to its right. The 720 px, 390 px and 320 px layouts were visually inspected and measured without horizontal overflow.

Initiative copy now follows the shared BHOC identity: `BHOC Species & Biodiversity Protection Initiative`, `One Oxygen. One Biology. One BHOC System.`, and `For Every Species. Wherever Life Is at Risk.` The CTA is `Explore the BHOC Initiative`. This replaces the more generic living-planet and safeguard-biodiversity lines beside the mark.

The sharing preview now uses the current approved 1672 × 941 wildlife hero instead of the narrow 325 × 408 initiative-logo image. Open Graph carries the canonical `https://bhocvet.com/` URL, the image's exact dimensions and descriptive ALT text; the X/Twitter card uses the large-image format. This is the metadata surface used by WhatsApp-style link previews.

## Latest hero and carousel update

Archil supplied a standalone 1672 by 941 wildlife PNG and requested it as the main illustration. The page now displays the visually equivalent 139 KB `dist/assets/bhoc-wildlife-rainbow-20260906-v2.webp`; the exact approved PNG remains the Open Graph and WhatsApp preview image at `dist/assets/bhoc-wildlife-rainbow-20260906-v2.png`, and the original remains at `dist/assets/bhoc-wildlife-rainbow-20260906.png`. Private source and issue screenshot are in `design/hero-carousel-20260906/`. This supersedes the old composite hero only; the initiative mark and six species sketches remain their existing separate assets.

The current v2 hero changes only three local details: the foreground cat and Eva have slightly longer, more proportionate front legs and paws while Eva keeps natural dachshund proportions; the small hidden Rem has lower contrast and blends more softly into the bushes. Their faces, positions and expressions remain unchanged, as do the other animals, landscape, birds and rainbow.

H1 is Precision Oxygen Therapeutics. Smaller subtitle is Biological Hemoglobin Oxygen Carrier BHOC, with bold initials and red O. Previous introductory and research-intent lines are removed. The two existing action links remain. Native copy is now beneath the full illustration so the falcon, camel and other animals are unobstructed. Logo aspect ratio is explicit and its dimensions scale together. At tablet width, native taglines scale with the mark to reduce a tall wrapping column.

Species descriptions are hidden via `showDescriptions: false`. Names, portrait size and faces remain. Always-visible arrows and item-count-driven dots rotate the same original card nodes. Six cards fit desktop, four tablet and two phone. Native horizontal touch scrolling and keyboard navigation remain. New items produce their own dots automatically. The shared line-break helper now includes a real space so text does not join when responsive CSS removes a break.

Verified build and existing static gates; exact attachment bytes; existing portrait hashes unchanged; desktop next/previous, Panda dot, Dog detail link; phone dot and keyboard navigation; phone/tablet document width and proportional mark. Hero and carousel were visually checked at desktop, tablet and phone sizes.

## Previous species-row edit

Archil requests only the Explore Species block: all six animal images 15% smaller, labels and descriptions unchanged, looser unfinished pencil strokes around the portraits, and no change to faces. The dog in this row is explicitly identified by Archil as Rem and its existing face is canonical. This overrides any earlier inferred animal identity for this row. Preserve `assets/reference-dog-pencil.webp` as the immutable identity source. Main hero and initiative logo are outside this task.

`design/species-sketch-20260906/` preserves the user screenshot, six originals, baseline content, bounded ImageGen outputs and the final integration report. The row uses portrait-only CSS scaling to 85% with unchanged text/card geometry. Original central face pixels are protected in each of the six integrated lossless WebP assets; the report confirms zero changed protected pixels. Desktop and a 390 px phone frame were visually checked; the dog details link works. Static validation passes. The hero, logo and other content blocks match the task baseline. The six original reference assets remain byte-identical.

## Current authority

`design/reference-20260906/supplied-mockup.png` is the original layout reference, with the latest hero replacement documented above. Its source is, 1162 × 1353. It supersedes the earlier muted scene and the local Eva repair for this implementation. Do not substitute earlier mockups or original animal photos unless a new task expressly requests a likeness correction. The current task is translating the supplied composition into code.

Hero wildlife is `dist/assets/reference-wildlife-scene.webp`, exported from source x337,y57,w825,h469. The initiative mark is a separate exact crop; taglines and controls are native HTML. The six identity references are exact crops; the current displayed row adds the peripheral sketch treatment documented above, in the requested order: Dog, Cat, Camel, Orangutan, Marine Turtle, Panda. CSS feathers the blank paper edges of the portrait and logo crops. It does not regenerate animals. The header wordmark uses editable native typography.

One narrow ImageGen cleanup removed raster copy and buttons from the right sky. `scripts/extract-reference-assets.cjs` composites only that sky region and removes the tiny mockup header-button remnant above it. Animals and the original initiative drawing are not regenerated. The authoring image, clean sky crop and extraction report are retained privately in `design/reference-20260906/`.

## Editing architecture

Content: `content/site.json`, `content/header.json`, `content/interface.json`, `content/blocks/*.json`, `content/pages/*.json`, `content/species-details.json`, `content/dialogs/about-dialog.html`.

Order: `content/homepage.json`. Components: `src/blocks/*.mjs`. Scoped styles: `src/styles/<block>.css`. Shared theme: `src/styles/theme.css`. Runtime interactions: `src/client/app.js`. Generator: `scripts/build.mjs`.

Run `node scripts/build.mjs --out dist` then `node scripts/check-site.mjs dist`. Generated `dist/index.html` and `dist/assets/css/` are output, not editing authority. A `story` block supports future photos or news and can repeat under a unique ID. Every existing main section is a singleton. Disabling a linked block requires updating dependent links; the generator rejects dead anchors.

The scientific introduction remains one sentence. Discover first shows chlorophyll a and heme b together as exact ChEBI SVG structures. Future slides can be photographs, stories or news. Hero development wording avoids treating the all-species goal as an established universal clinical indication.

Editorial preference: concise natural text, no ornamental dash separators. Preserve image identity, source authority and block ownership. Do not regenerate a page-sized image to edit text.

## SEO

Primary name BHOC Veterinary. Alternate names BHOC Vet and BHOC Veterinary Therapeutics remain ordered consistently. Archil Jaliashvili, given/family names, role and supplied LinkedIn profile remain embedded as author/creator in HTML and schema.org; the visible footer now reads `Project lead: BHOC Team`.

Each of the six pages owns one distinct primary query plus three to five secondary phrases and supporting terms. All have unique title, description and H1, canonical URLs, crawlable static copy, Open Graph/Twitter cards and page-appropriate WebPage, CollectionPage or ContactPage schema. The 512 × 512 organization logo meets the structured-data size requirement. The sitemap includes the logo, exact PNG social image, optimized WebP hero, initiative and species assets. Decorative imagery retains empty ALT only inside an `aria-hidden` container. No keyword stuffing or obsolete meta keywords. Vocabulary authority stays in BHOC-Therapeutics/seo/BHOC-SEO-Keywords.md; `SEO-IMPLEMENTATION.md` records the current page map and checks.

## Publication

Same Work Site project in `.openai/hosting.json`, same private audience. Source checkout has `dist/`. Public repo root contains compiled fallback plus `content/`, `src/`, build/check scripts, required public assets and edit guide. Private art sources, original photos and Work metadata must never be pushed to the public repo.

At task start, public main `ab203aaaf3a6aa51768d39c4c58dd1efcf3a0e00` had an empty tree following Archil's deletions. Preserve history and publish the new implementation as a normal successor; do not force-push or restore the old whole-site tree.

## Verification

Static checks: one H1, no duplicate IDs, local assets present, all images have ALT and dimensions, schema identities/alternatives and canonical correct. An isolated full build with an added story passed. Disabling the linked mission block correctly fails with an actionable missing-target message. A content edit in science renders other blocks byte-identically.

Browser checks: desktop composition and narrow phone arrangement inspected. Mobile menu, search, initiative link and Discover controls exercised. Application logs contain no confirmed app error; unrelated browser extension logs are outside this site. Physical phone testing and Google indexing are not claimed.

Science, Applications, Publications, News and Contact are live inner-page sources. About, species details and search remain dialogs. Species cards use their editable href: changing it to a page address follows that page rather than opening a dialog.
