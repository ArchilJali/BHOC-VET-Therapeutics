# BHOC Veterinary visual editing rules

## Species row

Archil has explicitly identified the dog in `assets/reference-dog-pencil.webp` as **Rem** and approved that exact face as the canonical identity for this row. Do not replace it with another dachshund, Eva, an older photo or a generated interpretation. Keep the original asset unchanged as the reference.

The six portraits are independent assets. On 6 September 2026 Archil requested them at 85% of their previous displayed dimensions, with unchanged labels, font sizes and links. A later instruction on the same date removes the descriptions beneath the names, using `showDescriptions: false`. Only peripheral pencil strokes may be loosened. Preserve the eyes, nose, muzzle and expression in every portrait, especially Rem's wiry beard and face.

The size adjustment belongs exclusively to the species block stylesheet. Content and links stay in `content/blocks/species.json`. Do not regenerate the whole row or the homepage, and do not resize the card or its text to shrink an animal.

## Scope and technical advice

For each new request, identify the content block, explain the practical implementation if helpful, and preserve everything outside it. Text and links are native editable content. Main hero artwork is a separate asset. A request concerning the species row does not authorize changes to the hero, logo, statistics or scientific content.

Describe concrete tradeoffs before undertaking a materially different approach. Do not silently substitute a new visual reference or say an unverified likeness is exact.

## Current hero and carousel

The immutable supplied hero source is `assets/bhoc-wildlife-rainbow-20260906.png`. The current approved display asset is `assets/bhoc-wildlife-rainbow-20260906-v2.png`. It changes only the details Archil requested on 6 September 2026: Eva's and the foreground cat's visible paws and legs are slightly larger, while the small hidden Rem is dimmer and blends into the foliage. Preserve every animal's face, the composition, rainbow, birds and landscape. Do not make any broader redraw or substitution without a new explicit request. The heading is Precision Oxygen Therapeutics, followed by Biological Hemoglobin Oxygen Carrier BHOC. Text is placed below the scene to keep the flying bird and other animals visible. The initiative image keeps its 318:317 aspect ratio, with height automatic at every viewport.

The species row uses original independent portrait nodes, circular arrow/dot selection and native touch scrolling. Dots are generated from the content item count. Keep the six approved sketches and Rem's identity intact.
