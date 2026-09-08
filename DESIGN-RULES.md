# BHOC Veterinary visual editing rules

## Veterinary BHOC identity

Across all BHOC Veterinary surfaces, the `O` in `BHOC` uses the veterinary Zoetis-orange token `#f65c00`. The `O` must remain a full-size capital letter on the same baseline and at the same typographic scale as `B`, `H` and `C`. Never render it as a small dot, superscript, subscript or reduced glyph. Browser/favicon identity uses a compact `BHOC` mark with `VET` beneath it; the `O` remains full-size and orange.

## Species row

Archil has explicitly identified the dog in `assets/reference-dog-pencil.webp` as **Rem** and approved that exact face as the canonical identity for this row. Do not replace it with another dachshund, Eva, an older photo or a generated interpretation. Keep the original asset unchanged as the reference.

The six portraits are independent assets. On 6 September 2026 Archil requested them at 85% of their previous displayed dimensions, with unchanged labels, font sizes and links. A later instruction on the same date removes the descriptions beneath the names, using `showDescriptions: false`. Only peripheral pencil strokes may be loosened. Preserve the eyes, nose, muzzle and expression in every portrait, especially Rem's wiry beard and face.

The size adjustment belongs exclusively to the species block stylesheet. Content and links stay in `content/blocks/species.json`. Do not regenerate the whole row or the homepage, and do not resize the card or its text to shrink an animal.

## Scope and technical advice

For each new request, identify the content block, explain the practical implementation if helpful, and preserve everything outside it. Text and links are native editable content. Main hero artwork is a separate asset. A request concerning the species row does not authorize changes to the hero, logo, statistics or scientific content.

Describe concrete tradeoffs before undertaking a materially different approach. Do not silently substitute a new visual reference or say an unverified likeness is exact.

## Current hero and carousel

The current approved homepage carousel uses exactly three optimized assets: `assets/bhoc-initiative-land-hero.webp`, `assets/bhoc-initiative-winter-hero.webp` and `assets/bhoc-initiative-ocean-hero-v2.webp`, in that order. `assets/bhoc-initiative-land-social.jpg` is a format-optimized, uncropped copy of the exact Land hero for Open Graph and WhatsApp sharing. Preserve every animal, the approved composition and the original proportions. Do not make a broader redraw or substitution without a new explicit request. The heading is Precision Oxygen Therapeutics, followed by BHOC - Biological Hemoglobin Oxygen Carrier. The initiative image keeps its 318:317 aspect ratio, with height automatic at every viewport.

Preserve the carousel structure and bottom navigation controls. Adding or replacing a slide must not require redesigning the hero copy or navigation.

The species row uses original independent portrait nodes, circular arrow/dot selection and native touch scrolling. Dots are generated from the content item count. Keep the six approved sketches and Rem's identity intact.

## Inner pages and linked platforms

Product, Application, Evidence, Science, Initiative, Related Information, News and Contact are ordinary HTML pages using the same wordmark, navigation, BHOC network bar and footer. Keep internal page links in the same browser tab. External scientific and corporate links may open a separate tab and must be labelled by destination rather than with an ambiguous generic action.

Preserve the visitor path: BHOC Veterinary is the public veterinary website, BHOC VET-platform is the guided evidence map, and BHOC Platform Veterinary is the full source library. Evidence and Related Information separate scientific publications, regulatory records, professional publications and conservation databases.
