import {attrs,esc} from '../lib/html.mjs';

export default page=>`<main id="main" class="subpage-main">
  <article class="page-section" aria-labelledby="edinburgh-feline-heading">
    <header class="section-heading">
      <span class="page-eyebrow">${esc(page.eyebrow)}</span>
      <h1 id="edinburgh-feline-heading">${esc(page.heading)}</h1>
      <p>${esc(page.lead)}</p>
      <p><time datetime="${esc(page.datePublished)}">${esc(page.dateLabel)}</time> · BHOC Veterinary</p>
    </header>
    <div class="section-copy">
      ${page.paragraphs.map(text=>`<p>${esc(text)}</p>`).join('\n      ')}
      <h2>Original report and photograph</h2>
      <p>${esc(page.photoCaption)}</p>
      <ul>
        ${[page.sourceLink,page.photoLink].map(item=>`<li><a class="text-link" ${attrs(item)}>${esc(item.label)}</a></li>`).join('\n        ')}
      </ul>
      <h2>Related reading</h2>
      <ul>
        ${page.relatedLinks.map(item=>`<li><a class="text-link" ${attrs(item)}>${esc(item.label)}</a></li>`).join('\n        ')}
      </ul>
    </div>
  </article>
</main>`;
