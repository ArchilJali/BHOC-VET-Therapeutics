import {esc,attrs,icon} from '../lib/html.mjs';

const logoMarkup=logo=>logo?`<span class="publication-logo-wrap" aria-hidden="true"><img class="publication-logo" src="${esc(logo.src)}" alt="" width="${Number(logo.width||80)}" height="${Number(logo.height||40)}" loading="lazy" decoding="async"></span>`:'';
const itemLink=item=>`<a class="publication-link${item.logo?' has-resource-logo':''}" ${attrs(item)}>${logoMarkup(item.logo)}<span class="publication-link-copy"><strong>${esc(item.label)}</strong><small>${esc(item.detail)}</small></span>${icon('arrow')}</a>`;

const resourceStyles=`<style>
.publication-link.has-resource-logo{align-items:center;justify-content:flex-start}
.publication-link.has-resource-logo>.publication-link-copy{min-width:0;flex:1}
.publication-link.has-resource-logo>svg{flex:none;margin-left:auto}
.publication-logo-wrap{display:flex;align-items:center;justify-content:center;flex:0 0 86px;min-height:52px;padding:4px 8px;border-right:1px solid var(--line)}
.publication-logo{display:block;max-width:76px;max-height:42px;width:auto;height:auto;object-fit:contain}
@media(max-width:650px){.publication-logo-wrap{flex-basis:72px;min-height:46px;padding-left:2px}.publication-logo{max-width:64px;max-height:36px}}
</style>`;

export default page=>`${resourceStyles}<main id="main" class="subpage-main publications-page">
  <section class="page-hero" aria-labelledby="publications-page-heading"><div><span class="page-eyebrow">${esc(page.eyebrow)}</span><h1 id="publications-page-heading">${esc(page.heading)}</h1><p>${esc(page.lead)}</p></div><nav class="page-index" aria-label="Publication groups">${page.groups.map(group=>`<a href="#${esc(group.id)}"><span>${esc(group.number)}</span>${esc(group.title)}</a>`).join('')}</nav></section>
  <div class="publication-groups">${page.groups.map(group=>`<section id="${esc(group.id)}" class="publication-group" aria-labelledby="${esc(group.id)}-heading"><header><span class="group-number">${esc(group.number)}</span><div><h2 id="${esc(group.id)}-heading">${esc(group.title)}</h2><p>${esc(group.description)}</p></div></header><div class="publication-links">${group.items.map(itemLink).join('')}</div></section>`).join('')}</div>
  <p class="evidence-note">${esc(page.note)}</p>
</main>`;
