# BHOC Veterinary SEO implementation

Audited 7 September 2026 against current Google Search guidance and the corporate keyword authority. The implementation keeps search language natural and page-specific; it does not add the obsolete `meta keywords` tag or invisible keyword lists.

## Identity

- Primary site name: `BHOC Veterinary`.
- Alternate names, in preferred order: `BHOC Vet`, `BHOC Veterinary Therapeutics`.
- Canonical origin: `https://bhocvet.com/`.
- Author and creator: `Archil Jaliashvili`, retained in author metadata and schema.org `Person`, `WebSite` and page records.
- Public footer responsibility line: `Project lead: BHOC Team`.
- Parent organization: `BHOC Therapeutics`.

## Page ownership

| Page | Primary search topic | Schema type |
| --- | --- | --- |
| Home | Precision Oxygen Therapeutics | WebPage |
| Product | Biological Hemoglobin Oxygen Carrier product | WebPage |
| Applications | veterinary oxygen carrier applications | WebPage |
| Evidence | veterinary oxygen carrier evidence | CollectionPage |
| Science | Biological Hemoglobin Oxygen Carrier science | WebPage |
| Initiative | BHOC Species and Biodiversity Protection Initiative | WebPage |
| Related Information | related veterinary oxygen information | CollectionPage |
| News | BHOC Veterinary news | CollectionPage |
| Contact | Contact BHOC Veterinary | ContactPage |

Each content file owns one primary phrase, three to five secondary phrases and a bounded set of supporting semantic terms. Titles, descriptions and H1 headings are unique. Legacy terms such as `hemoglobin-based oxygen carrier` and `HBOC` appear only where they clarify scientific or historical context; competitor and regulatory names remain tied to source-linked evidence.

The homepage now uses the natural-language terms `animal blood types`, `blood-group systems`, `cross-species oxygen carrier`, `donor-independent oxygen carrier` and `room-temperature shelf life` in visible, relevant copy and structured topics. The message links directly to Evidence and explicitly keeps product and species evidence boundaries; no hidden keyword list or unsupported universal efficacy claim is used.

## Technical coverage

- Static English HTML, one H1 per page and crawlable descriptive internal links.
- Unique title and description for all nine indexable pages. The legacy `publications.html` URL is a `noindex,follow` redirect canonically consolidated into Evidence.
- Canonical URL, `index,follow` controls, Open Graph and X/Twitter large-image metadata on every page.
- `WebSite`, `Organization`, `Person`, `WebPage`, `CollectionPage`, `ContactPage` and `ImageObject` JSON-LD as appropriate.
- A crawlable 512 × 512 organization logo and consistent `name` / `alternateName` values.
- XML sitemap with all current indexable pages, organization logo, optimized hero, original social image, initiative mark and species images; the legacy redirect is omitted.
- `robots.txt` points to the sitemap; the custom 404 page remains `noindex`.
- Descriptive ALT text on informative images. The lower landscape keeps an empty ALT inside `aria-hidden="true"` because it is decorative.
- The displayed hero is a 1672 × 941 WebP of about 139 KB with priority loading. The approved 1672 × 941 PNG remains the Open Graph image for WhatsApp and other link previews.
- Image dimensions are explicit to reduce layout shift. Secondary images use lazy loading.

The vocabulary source of truth remains [BHOC-Therapeutics/seo/BHOC-SEO-Keywords.md](https://github.com/ArchilJali/BHOC-Therapeutics/blob/main/seo/BHOC-SEO-Keywords.md); this repository does not create a competing master list.

References: [Google title links](https://developers.google.com/search/docs/appearance/title-link), [snippets and descriptions](https://developers.google.com/search/docs/appearance/snippet), [site names](https://developers.google.com/search/docs/appearance/site-names), [organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization), [image SEO](https://developers.google.com/search/docs/appearance/google-images).

This provides technical search readiness, not a ranking guarantee. Indexing, Google's displayed title/site name and social-platform cache refresh remain controlled by the respective services.
