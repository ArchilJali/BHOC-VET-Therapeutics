import {esc,attrs,icon} from '../lib/html.mjs';

const itemLink=item=>`<a class="publication-link" ${attrs(item)}><span><strong>${esc(item.label)}</strong><small>${esc(item.detail)}</small></span>${icon('arrow')}</a>`;
const inlineLink=item=>`<a class="text-link" ${attrs(item)}>${esc(item.label)} ${icon('arrow')}</a>`;
const metric=item=>`<article class="application-card"><h3>${esc(item.value)}</h3><p>${esc(item.label)}</p></article>`;
const spotlightVisual=image=>image?`<figure class="fda-trial-visual"><img src="./${esc(image.src)}" alt="${esc(image.alt)}" title="${esc(image.title)}" width="${Number(image.width)}" height="${Number(image.height)}" loading="lazy" decoding="async"></figure>`:'';

export default page=>`<main id="main" class="subpage-main publications-page evidence-page">
  <section class="page-hero" aria-labelledby="evidence-page-heading"><div><span class="page-eyebrow">${esc(page.eyebrow)}</span><h1 id="evidence-page-heading">${esc(page.heading)}</h1><p>${esc(page.lead)}</p></div><nav class="page-index" aria-label="Evidence sections"><a href="#fda-field-trial"><span>01</span>FDA field trial</a><a href="#evidence-library"><span>02</span>Evidence library</a><a href="#regulatory-evidence"><span>03</span>Regulatory records</a></nav></section>

  <section id="fda-field-trial" class="regulatory-feature evidence-spotlight" aria-labelledby="fda-field-trial-heading">${spotlightVisual(page.spotlight.image)}<div class="regulatory-copy"><span class="page-eyebrow">${esc(page.spotlight.eyebrow)}</span><h2 id="fda-field-trial-heading">${esc(page.spotlight.title)}</h2><p><strong>${esc(page.spotlight.detail)}</strong></p><p>${esc(page.spotlight.secondary)}</p><p>${esc(page.spotlight.endpoint)}</p><p>${esc(page.spotlight.trial)}</p><div class="inline-actions">${page.spotlight.links.map(inlineLink).join('')}</div></div></section>

  <section id="evidence-library" class="page-section product-objectives" aria-labelledby="evidence-library-heading"><div class="section-heading"><span class="page-eyebrow">${esc(page.snapshot.eyebrow)}</span><h2 id="evidence-library-heading">${esc(page.snapshot.title)}</h2><p>${esc(page.snapshot.text)}</p></div><div class="application-grid product-objective-grid">${page.snapshot.metrics.map(metric).join('')}</div><div class="section-copy"><p>${esc(page.snapshot.scope)}</p></div></section>

  <div class="publication-groups">${page.groups.map(group=>`<section id="${esc(group.id)}" class="publication-group" aria-labelledby="${esc(group.id)}-heading"><header><span class="group-number">${esc(group.number)}</span><div><h2 id="${esc(group.id)}-heading">${esc(group.title)}</h2><p>${esc(group.description)}</p></div></header><div class="publication-links">${group.items.map(itemLink).join('')}</div></section>`).join('')}</div>
  <p class="evidence-note">${esc(page.note)}</p>
</main>`;
