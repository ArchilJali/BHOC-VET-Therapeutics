import {esc, img, link} from '../lib/html.mjs';

const paragraphs = items => items.map(text => `<p>${esc(text)}</p>`).join('\n');

export default page => `<main id="main" class="subpage-main">
  <article class="page-section" style="max-width:800px;margin-inline:auto" aria-labelledby="clementi-heading">
    <header class="section-heading">
      <h1 id="clementi-heading">${esc(page.heading)}</h1>
      <p><em>${esc(page.lead)}</em></p>
      <time datetime="${esc(page.datePublished)}">${esc(page.dateLabel)}</time>
    </header>
    <figure style="margin:0 0 24px">
      ${img(page.image, 'fetchpriority="high" style="display:block;max-width:100%;height:auto;border-radius:8px"')}
    </figure>
    <div class="section-copy">
      ${paragraphs(page.paragraphs)}
      ${page.sections.map(section => `<section>
        <h2>${esc(section.title)}</h2>
        ${paragraphs(section.paragraphs)}
      </section>`).join('\n')}
      <p>${link(page.sourceLink)}</p>
    </div>
  </article>
</main>`;
