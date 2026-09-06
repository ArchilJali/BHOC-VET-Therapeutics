import {esc,attrs,icon} from '../lib/html.mjs';

const itemLink=item=>`<a class="publication-link" ${attrs(item)}><span><strong>${esc(item.label)}</strong><small>${esc(item.detail)}</small></span>${icon('arrow')}</a>`;

export default page=>`<main id="main" class="subpage-main publications-page">
  <section class="page-hero" aria-labelledby="publications-page-heading"><div><span class="page-eyebrow">${esc(page.eyebrow)}</span><h1 id="publications-page-heading">${esc(page.heading)}</h1><p>${esc(page.lead)}</p></div><nav class="page-index" aria-label="Publication groups">${page.groups.map(group=>`<a href="#${esc(group.id)}"><span>${esc(group.number)}</span>${esc(group.title)}</a>`).join('')}</nav></section>
  <div class="publication-groups">${page.groups.map(group=>`<section id="${esc(group.id)}" class="publication-group" aria-labelledby="${esc(group.id)}-heading"><header><span class="group-number">${esc(group.number)}</span><div><h2 id="${esc(group.id)}-heading">${esc(group.title)}</h2><p>${esc(group.description)}</p></div></header><div class="publication-links">${group.items.map(itemLink).join('')}</div></section>`).join('')}</div>
  <p class="evidence-note">${esc(page.note)}</p>
</main>`;
