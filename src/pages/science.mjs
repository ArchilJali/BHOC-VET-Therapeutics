import {esc,attrs,icon} from '../lib/html.mjs';

const sourceLink=item=>`<a class="source-card" ${attrs(item)}><span><strong>${esc(item.label)}</strong><small>${esc(item.detail)}</small></span>${icon('arrow')}</a>`;

export default (page,scienceHTML)=>`<main id="main" class="subpage-main science-page">
  <section class="page-hero" aria-labelledby="science-page-heading">
    <div><span class="page-eyebrow">${esc(page.eyebrow)}</span><h1 id="science-page-heading">${esc(page.heading)}</h1><p>${esc(page.lead)}</p></div>
    <nav class="page-index" aria-label="Science page sections"><a href="#science">Discover</a><a href="#foundation">Foundation</a><a href="#evidence-platform">Evidence platform</a><a href="#science-sources">Sources</a></nav>
  </section>
  ${scienceHTML}
  <section id="foundation" class="page-section foundation-layout" aria-labelledby="foundation-heading">
    <div class="section-copy"><span class="page-eyebrow">${esc(page.foundation.eyebrow)}</span><h2 id="foundation-heading">${esc(page.foundation.title)}</h2>${page.foundation.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}</div>
    <div class="insight-stack"><article class="insight-card"><span class="insight-icon">${icon('leaf')}</span><h3>${esc(page.nature.title)}</h3><p>${esc(page.nature.text)}</p></article><article class="insight-card warm"><span class="insight-icon">${icon('molecule')}</span><h3>${esc(page.chemistry.title)}</h3><p>${esc(page.chemistry.text)}</p></article></div>
  </section>
  <section id="evidence-platform" class="platform-band" aria-labelledby="evidence-platform-heading">
    <div><span class="page-eyebrow">${esc(page.platform.eyebrow)}</span><h2 id="evidence-platform-heading">${esc(page.platform.title)}</h2><p>${esc(page.platform.text)}</p></div>
    <div class="platform-actions"><a class="button" ${attrs(page.platform.link)}><span>${esc(page.platform.link.label)}</span>${icon('arrow')}</a><a class="platform-library-link" ${attrs(page.platform.library)}><span>${esc(page.platform.library.label)}</span>${icon('arrow')}</a><a class="text-link light-link" ${attrs(page.platform.github)}>${icon('github')}<span>${esc(page.platform.github.label)}</span></a></div>
  </section>
  <section id="science-sources" class="page-section source-section" aria-labelledby="science-sources-heading"><div class="section-heading"><span class="page-eyebrow">Source links</span><h2 id="science-sources-heading">Scientific context.</h2></div><div class="source-grid">${page.references.map(sourceLink).join('')}</div></section>
</main>`;
