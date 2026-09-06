# BHOC Veterinary current work state

Updated 6 September 2026 after completing the requested local repair and browser checks. This replaces all earlier hero rollback notes.

## Current repaired scene

Archil requested the defects be fixed and the finished result published. Current scene: `dist/assets/bhoc-veterinary-scene-repaired.webp`, 1122 by 488 pixels, SHA-256 `41dc70f42d8dfaf4d38213f763608f7e1b56af3335482bf8d3ecbc825636b690`. It is a complete image with the original initiative logo included. The logo's link is transparent HTML over its original location, not a second pasted image. All interface text and buttons remain native HTML.

`scripts/compose-scene-repair.cjs` deterministically integrates two isolated ImageGen outputs: Eva's silhouette and the sky behind the native heading. The rest of the scene stays pixel-identical to the retained composition. Two tiny remnants of the mockup's old header were also removed outside animal regions. Do not use the old whole-page mockup as the current hero. Source and generated local regions are retained in `design/repairs/`.

Browser checks covered the complete desktop page and responsive frames at widths 390, 768 and 1122 pixels. Their actual content widths were 375, 753 and 1107 pixels after scrollbars; each document width matched its viewport. The phone screenshot confirmed readable copy and statistics. The initiative logo opened its dialog. No physical-device test is claimed. An independent asset review confirmed no visible dog patch or sky rectangle at export size and unchanged surrounding animal faces.

Future workflow: agree a mockup, keep one immutable artwork file, implement native text and controls separately, make only explicitly bounded artwork edits, inspect likeness close up, and compare the rendered page before publishing. File identity alone does not establish visual quality. See `AGENTS.md`.

## Latest visual rejection and diagnosis

Archil reported that Eva's eyes look misplaced, her face and fur do not match, and a strange rectangular window appears in the main picture. The homepage is not visually accepted. Do not describe the retained mockup as a verified final reference merely because its bytes match the exported asset.

Browser inspection of the live checkout confirmed the hard rectangular transition at the upper right of the hero. The CSS clip removes the mockup's text area and exposes a flat gradient beside the illustrated sky. The separate logo crop also creates a visible rectangular surface. This is a layout defect, not an unexplained browser or cache problem.

The central dog's shortened muzzle, fluffy crown and bow-like red tag are already present in the generated reference. The original photos show wirehaired dachshunds with longer muzzles, dropped ears and wiry beards. Exact export checks do not establish likeness. Preserve composition, animals' positions and sizes, muted palette, panda and distant rainbow while correcting only the defective regions. Do not regenerate the whole scene or silently choose an earlier whole-page version as a rollback.

Original uploaded photographs are retained as `design/references/dogs-snow-original.jpg` and `design/references/dogs-portrait-original.jpg`. The larger foreground dog in the portrait provides the clearest face and red bone-shaped tag. The images themselves are unlabeled. Earlier conversation treated this foreground dog as Eva and the other dog in clothing as Rem; this was an assistant assumption, not a photograph label. Do not reverse their identities or invent certainty.

The previous diagnostic turn changed only documentation and preview setup. This subsequent repair supersedes that diagnostic state.

## User authorization and next scope

Archil explicitly approved the final muted pencil mockup and requested publishing the homepage with SEO, ALT, alternate naming and Archil Jaliashvili metadata. Develop individual inner pages in a later step. Existing on-page dialogs and links remain functional; no empty inner pages have been created.

## Retained composition reference with known likeness defects

Source: `design/approved-homepage-muted-pencil-2026-09-06.png`
SHA-256: `436b8e444fd83bda4f89ac65b9cd1f7fd5017e032e88667d032505303e352552`
Dimensions: 1122 by 1402 pixels.

This file records the composition and proportions discussed before the latest rejection. Its central dog likeness is defective and must not be treated as correct. Preserve positions, sizes, fine pencil hatching, muted colors, authentic initiative logo, foreground Eva, tiny Rem in grass, panda and distant rainbow. Never regenerate the scene to alter a small detail. Never place a separate Rem patch over it.

Species portraits remain exact exports of the composition reference. The repaired main scene now uses one continuous image without polygon clipping. Its logo remains within that image. All page copy, controls and science diagrams are separate HTML/SVG for accessibility and responsive behavior.

Six initial species: Dog, Cat, Camel, Orangutan, Giant Panda, Marine Turtle. Retain the existing additional horse, elephant and lion entries after these six. Portraits and labels have independent sizes.

Headline: Different Species. One Shared Tomorrow.
Science heading: Nature kept the core. Bioengineers build on that foundation.
Only science introduction: Across vertebrate species, oxygen transport shares a common molecular foundation in hemoglobin.
Discover is a general content carousel. Its first slide displays chlorophyll and heme together. Future slides may be photographs, news or other relevant material, not only chemistry.

Editorial rule: no long or short dash separators, decorative quotation marks or ornamental symbols in prose. Functional control icons and punctuation required in technical URLs/code are exempt. Keep copy brief, natural and accurate.

## Publication identity

Public canonical: https://bhocvet.com/
GitHub: https://github.com/ArchilJali/BHOC-VET-Therapeutics
The public repo uses root-level static files. The Work source checkout keeps those files in `dist/`. Preserve the existing Pages branch workflow and domain. Preserve the same Work Site identity in `.openai/hosting.json` and its current audience.

## Search identity

Site: BHOC Veterinary. Alternative names: BHOC Vet, BHOC Veterinary Therapeutics.
Person: Archil Jaliashvili, visibly identified as project lead in the footer and linked to his supplied LinkedIn profile. Do not imply he is depicted in the animal artwork. His name appears in author metadata and Person/WebSite structured data.
BHOC means Biological Hemoglobin Oxygen Carrier. HBOC, Oxyglobin, Hemopure and Biopure are science/history terms, not aliases for the veterinary organization.
Master vocabulary remains `BHOC-Therapeutics/seo/BHOC-SEO-Keywords.md`; do not create a competing keyword list.

## Checks and limits

The initial publication received static checks only. The subsequent repair received the browser and asset checks recorded above. Verify every new rendered correction against source photographs and the composition reference before calling it complete. Image hashes only establish file identity.
No rankings, indexing or search result appearance are guaranteed. No recurring automation or Search Console submission has been created.
