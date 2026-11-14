import {esc, attrs, img, link} from '../lib/html.mjs';

export default page => `<main id="main" class="subpage-main">
  <style>
    .vet-partnership{max-width:1160px;margin:auto}
    .vet-partnership h1{font-size:clamp(28px,4vw,46px);line-height:1.15}
    .vet-partnership .article-meta{font-size:13px;color:var(--muted)}
    .vet-partnership-grid{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,3fr);gap:clamp(20px,4vw,48px);align-items:start}
    .vet-partnership-grid figure{margin:0;max-width:440px}
    .vet-partnership-grid img{display:block;width:100%;height:auto;border:1px solid var(--line);border-radius:12px}
    .vet-partnership-grid figcaption{margin-top:8px;font-size:13px;line-height:1.5;color:var(--muted)}
    .vet-partnership-grid .section-copy p:first-child{margin-top:0}
    .vet-partnership-links{display:flex;flex-wrap:wrap;gap:12px 24px;margin-top:24px;font-size:14px}
    @media(max-width:760px){.vet-partnership-grid{grid-template-columns:minmax(0,1fr)}}
  </style>
  <article class="page-section vet-partnership" aria-labelledby="partnership-heading">
    <header class="section-heading">
      <span class="page-eyebrow">${esc(page.eyebrow)}</span>
      <h1 id="partnership-heading">${esc(page.heading)}</h1>
      <p>${esc(page.lead)}</p>
      <p class="article-meta"><time datetime="${esc(page.datePublished)}">${esc(page.dateLabel)}</time> · By ${esc(page.authorName)}</p>
    </header>
    <div class="vet-partnership-grid">
      <figure>
        <a ${attrs({href: './' + page.image.src})}>${img(page.image, 'fetchpriority="high"')}</a>
        <figcaption>${esc(page.imageCaption)}</figcaption>
      </figure>
      <div class="section-copy">
        ${page.paragraphs.map(paragraph => `<p>${esc(paragraph)}</p>`).join('\n        ')}
        <nav class="vet-partnership-links" aria-label="Related veterinary news">
          ${[page.sourceLink, ...page.relatedLinks].map(item => link(item)).join('\n          ')}
        </nav>
      </div>
    </div>
  </article>
</main>`;
