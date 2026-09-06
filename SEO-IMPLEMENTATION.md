# Homepage search implementation

6 September 2026. Implementation notes, not a replacement keyword dictionary.

The vocabulary authority remains [BHOC-SEO-Keywords.md](https://github.com/ArchilJali/BHOC-Therapeutics/blob/main/seo/BHOC-SEO-Keywords.md). Use relevant terms naturally. The veterinary homepage owns animal health and biodiversity context; human application and evidence pages retain their separate purposes.

- One descriptive title and one visible H1. Unique concise meta description.
- Self-canonical https://bhocvet.com/. Existing GitHub Pages aliases point to this canonical.
- Crawlable robots and a one-page sitemap matching the current published scope. 404 remains noindex.
- Organization, WebSite, WebPage, Person and ImageObject JSON-LD reflect visible content.
- Recognizable alternate site names: BHOC Vet and BHOC Veterinary Therapeutics. Do not use historical product names as organization aliases.
- Archil Jaliashvili appears in a small visible project-lead attribution, author metadata, Person and WebSite data, with the supplied LinkedIn URL.
- Actual picture descriptions in ALT, empty ALT for decorative landscapes, semantic captions for the molecule pair. No personal name or search term stuffing in animal ALT.
- Open Graph and Twitter use the approved initiative logo already displayed in the page. No separately generated social card.
- Locally hosted images, lossless approved artwork, explicit dimensions, eager hero and lazy below-fold portraits. No external font dependency.
- Sitemap carries the actual edit date, not a recurring artificial freshness change.
- Work audience remains restricted. Canonical is a duplicate-content signal, not an access control.
- No meta-keywords tag, invisible SEO keyword blocks, fabricated reviews, unsupported medical claims or ranking guarantees.

Primary guidance:
https://developers.google.com/search/docs/appearance/google-images
https://developers.google.com/search/docs/appearance/site-names
https://developers.google.com/search/docs/appearance/structured-data/organization
https://developers.google.com/search/docs/appearance/structured-data/sd-policies
https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

Search Console verification, inspection and submission are not represented as performed without account access. Individual pages will receive their own metadata as they are developed.
