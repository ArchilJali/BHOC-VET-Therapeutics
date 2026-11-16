import {esc, attrs, img, link} from '../lib/html.mjs';

const figure = (photo, caption, imageAttributes) => `<figure>
  <a ${attrs({href: './' + photo.src})}>${img(photo, imageAttributes)}</a>
  <figcaption>${esc(caption)}</figcaption>
</figure>`;

export default page => `<main id="main" class="subpage-main">
  <style>
    .vet-lecture {max-width:1160px;margin:auto}
    .vet-lecture h1 {font-size:clamp(28px,4vw,46px);line-height:1.15}
    .vet-lecture h2 {font-size:clamp(22px,3vw,30px);line-height:1.2}
    .vet-lecture-meta {font-size:13px;color:var(--muted)}
    .vet-lecture-content {display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(20px,4vw,48px);align-items:start}
    .vet-lecture figure {margin:0}
    .vet-lecture img {display:block;width:100%;height:auto;border:1px solid var(--line);border-radius:12px}
    .vet-lecture figcaption {margin-top:8px;font-size:13px;line-height:1.5;color:var(--muted)}
    .vet-lecture-content h2:first-child {margin-top:0}
    .vet-lecture-gallery {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
    .vet-lecture-links {display:flex;flex-wrap:wrap;gap:12px 24px;margin-top:24px;font-size:14px}
    @media(max-width:760px) {.vet-lecture-content,.vet-lecture-gallery {grid-template-columns:minmax(0,1fr)}}
  </style>
  <article class="page-section vet-lecture" aria-labelledby="vet-lecture-heading">
    <header class="section-heading">
      <span class="page-eyebrow">${esc(page.eyebrow)}</span>
      <h1 id="vet-lecture-heading">${esc(page.heading)}</h1>
      <p>${esc(page.lead)}</p>
      <p class="vet-lecture-meta"><time datetime="${esc(page.datePublished)}">${esc(page.dateLabel)}</time> · By ${esc(page.authorName)}</p>
    </header>
    <div class="vet-lecture-content">
      ${figure(page.image, page.imageCaption, 'fetchpriority="high"')}
      <div class="section-copy">
        ${page.sections.map(section => `<h2>${esc(section.heading)}</h2>
        ${section.paragraphs.map(paragraph => `<p>${esc(paragraph)}</p>`).join('\n        ')}`).join('\n        ')}
      </div>
    </div>
    <section aria-labelledby="vet-lecture-gallery-heading">
      <h2 id="vet-lecture-gallery-heading">Photos from the lecture</h2>
      <div class="vet-lecture-gallery">
        ${page.gallery.map(photo => figure(photo, photo.caption, 'loading="lazy"')).join('\n        ')}
      </div>
    </section>
    <nav class="vet-lecture-links" aria-label="Related veterinary news">
      ${[page.sourceLink, ...page.relatedLinks].map(item => link(item)).join('\n      ')}
    </nav>
  </article>
</main>`;
