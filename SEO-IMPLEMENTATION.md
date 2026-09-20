# BHOC Veterinary SEO implementation

Audited 13 September 2026 against current Google Search guidance and the corporate keyword authority. The implementation keeps search language natural and page-specific; it does not add the obsolete `meta keywords` tag or invisible keyword lists.

## Identity

- Primary site name: `BHOC Veterinary`.
- Alternate names, in preferred order: `BHOC Vet`, `BHOC Veterinary Therapeutics`.
- Canonical origin: `https://bhocvet.com/`.
- Author and creator: `Archil Jaliashvili`, retained in author metadata and schema.org `Person`, `WebSite` and page records.
- Public footer responsibility line: `Project lead: BHOC Team`.
- Parent organization: `BHOC Therapeutics`.
- Canonical veterinary evidence architecture: `Vet Real-World Evidence & Cases` at `https://archiljali.github.io/BHOC-platform/veterinary/Vet-index.html`.

## Page ownership

| Page | Primary search topic | Schema type |
| --- | --- | --- |
| Home | Precision Oxygen Therapeutics | WebPage |
| Product | Biological Hemoglobin Oxygen Carrier product | WebPage |
| Applications | veterinary oxygen carrier applications | WebPage |
| Science | Biological Hemoglobin Oxygen Carrier science | WebPage |
| Initiative overview | BHOC Species and Biodiversity Protection Initiative | WebPage |
| Related Information | related veterinary oxygen information | CollectionPage |
| News | BHOC Veterinary news | CollectionPage |
| Contact | Contact BHOC Veterinary | ContactPage |
| Full Initiative `/initiative/` | wildlife, conservation medicine, species protection and global biodiversity goals | WebPage |

Veterinary publications, regulatory records and documented real-world cases are intentionally maintained once in **Vet Real-World Evidence & Cases** rather than duplicated as a BHOC Veterinary Evidence page. The historical `evidence.html` and `publications.html` URLs are `noindex,follow` migration redirects directly to that canonical veterinary library.

Each BHOC Veterinary content file owns one primary phrase, three to five secondary phrases and a bounded set of supporting semantic terms. Titles, descriptions and H1 headings are unique. Legacy terms such as `hemoglobin-based oxygen carrier` and `HBOC` appear where they clarify scientific or historical context; regulatory names remain tied to source-linked records.

The full Initiative page contains a visible, source-linked statement on the `Kunming-Montreal Global Biodiversity Framework`. It describes independent alignment with wider biodiversity goals and explicitly excludes any claim of formal partnership or endorsement by the Convention on Biological Diversity. The News page provides one dated entry point to that existing Initiative section rather than creating a duplicate article URL.

The homepage uses the natural-language terms `animal blood types`, `blood-group systems`, `cross-species oxygen carrier`, `donor-independent oxygen carrier` and `room-temperature shelf life` in visible, relevant copy and structured topics. Its veterinary evidence CTA links directly to Vet Real-World Evidence & Cases and keeps product- and species-specific evidence boundaries explicit; no hidden keyword list or unsupported universal efficacy claim is used.

## Technical coverage

- Static English HTML, one H1 per indexed page and crawlable descriptive links.
- Eight core BHOC Veterinary pages plus the full Initiative homepage are indexable. `evidence.html` and `publications.html` are `noindex,follow` migration redirects and are excluded from the sitemap.
- The two migration URLs redirect directly to `https://archiljali.github.io/BHOC-platform/veterinary/Vet-index.html` and use that destination as their canonical URL; no indexed BHOC Veterinary page links back to the retired local Evidence URL.
- Canonical URL, `index,follow` controls, Open Graph and X/Twitter large-image metadata on every indexed BHOC Veterinary page.
- `WebSite`, `Organization`, `Person`, `WebPage`, `CollectionPage`, `ContactPage` and `ImageObject` JSON-LD as appropriate.
- A crawlable organization logo and consistent `name` / `alternateName` values.
- XML sitemap with all current indexable BHOC Veterinary URLs and relevant images; migration redirects are omitted.
- `robots.txt` points to the sitemap; the custom 404 page remains `noindex`.
- Descriptive ALT text on informative images. Decorative artwork retains empty ALT where appropriate.
- Image dimensions are explicit to reduce layout shift. Secondary images use lazy loading where appropriate.
- Site navigation, homepage CTA, Product boundary, News context and Initiative footer all route veterinary evidence users to the single Vet Real-World Evidence & Cases architecture.

The vocabulary source of truth remains [BHOC-Therapeutics/seo/BHOC-SEO-Keywords.md](https://github.com/ArchilJali/BHOC-Therapeutics/blob/main/seo/BHOC-SEO-Keywords.md); this repository does not create a competing master list.

References: [Google title links](https://developers.google.com/search/docs/appearance/title-link), [snippets and descriptions](https://developers.google.com/search/docs/appearance/snippet), [site names](https://developers.google.com/search/docs/appearance/site-names), [organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization), [image SEO](https://developers.google.com/search/docs/appearance/google-images).

This provides technical search readiness, not a ranking guarantee. Indexing, Google's displayed title/site name and social-platform cache refresh remain controlled by the respective services.
