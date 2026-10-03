import {esc,attrs,img,icon} from '../lib/html.mjs';

export default page=>`<main id="main" class="subpage-main feline-article-page">
  <article aria-labelledby="feline-article-heading">
    <header class="page-hero feline-article-hero"><div>
      <span class="page-eyebrow">${esc(page.eyebrow)}</span>
      <h1 id="feline-article-heading">${esc(page.heading)}</h1>
      <p>${esc(page.lead)}</p>
      <div class="feline-article-meta">BHOC Veterinary · <time datetime="${esc(page.datePublished)}">${esc(page.dateLabel)}</time></div>
    </div></header>
    <div class="feline-article-body">
      ${page.sections.map(section=>`<section id="${esc(section.id)}" aria-labelledby="${esc(section.id)}-heading">
        <h2 id="${esc(section.id)}-heading">${esc(section.heading)}</h2>
        ${section.paragraphs.map(text=>`<p>${esc(text)}</p>`).join('')}
        <p class="feline-article-sources">${section.sourceLinks.map(item=>`<a ${attrs(item)}>${esc(item.label)} ${icon('arrow')}</a>`).join('')}</p>
      </section>`).join('')}
      <figure class="feline-article-document">
        <a href="./${esc(page.image.src)}" target="_blank" rel="noopener noreferrer" aria-label="Open the original EveryCat source screenshot">${img(page.image,'loading="lazy"')}</a>
        <figcaption><a ${attrs(page.credit)}>${esc(page.credit.label)}</a></figcaption>
      </figure>
      <aside class="feline-article-context" aria-labelledby="feline-context-heading"><h2 id="feline-context-heading">Why this matters</h2><p>${esc(page.why)}</p></aside>
      <section class="feline-article-references" aria-labelledby="feline-references-heading">
        <h2 id="feline-references-heading">Sources and publications</h2>
        <p><a ${attrs(page.sourceLink)}>${esc(page.sourceLink.label)} ${icon('arrow')}</a></p>
        ${page.referenceGroups.map(group=>`<h3>${esc(group.heading)}</h3><ul>${group.links.map(item=>`<li><a ${attrs(item)}>${esc(item.label)}</a></li>`).join('')}</ul>`).join('')}
      </section>
      <nav class="feline-article-return" aria-label="Article navigation"><a class="text-link" href="news.html#cats-blood-compatibility-oxyglobin">Back to News ${icon('arrow')}</a><a class="text-link" ${attrs(page.contextLink)}>${esc(page.contextLink.label)} ${icon('arrow')}</a></nav>
    </div>
  </article>
</main>`;
