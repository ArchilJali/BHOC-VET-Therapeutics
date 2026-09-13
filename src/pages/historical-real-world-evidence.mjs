import {esc,attrs,icon} from '../lib/html.mjs';

const classification=item=>`<article class="hrwe-class"><h3>${esc(item.label)}</h3><p>${esc(item.text)}</p></article>`;
const textLink=item=>`<a class="text-link" ${attrs(item)}${/^https:\/\//.test(item.href)?' target="_blank" rel="noopener noreferrer"':''}>${esc(item.label)} ${icon('arrow')}</a>`;

export default page=>`<style>
.hrwe-page .page-hero{padding-top:42px;padding-bottom:38px}.hrwe-page .page-hero h1{max-width:980px;font-size:clamp(39px,4.8vw,64px)}.hrwe-page .page-hero p{max-width:900px;font-size:17px;line-height:1.55}
.hrwe-principle{display:grid;grid-template-columns:minmax(220px,.75fr) minmax(0,1.25fr);gap:42px;align-items:start;padding-top:42px;padding-bottom:42px}.hrwe-principle h2{margin:0;font-size:clamp(30px,3vw,44px);line-height:1.12;letter-spacing:-.5px}.hrwe-principle p{margin:0;color:var(--muted);font-size:16px;line-height:1.65}
.hrwe-classes{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}.hrwe-class{padding:20px;border:1px solid var(--line);border-radius:15px;background:#fff}.hrwe-class h3{margin:0;font-size:17px;line-height:1.25}.hrwe-class p{margin:9px 0 0;color:var(--muted);font-size:13px;line-height:1.5}
.hrwe-first{margin-top:40px;padding:34px;border:1px solid #d8e4de;border-radius:18px;background:#f6f9f7}.hrwe-first h2{margin:8px 0 12px;font-size:clamp(30px,3.2vw,44px);line-height:1.12}.hrwe-first>p{max-width:900px;margin:0;color:var(--muted);font-size:16px;line-height:1.6}.hrwe-status{display:inline-block;margin-top:17px;padding:7px 10px;border-radius:999px;background:#e7f0eb;color:#315d4b;font-size:12px;font-weight:800;letter-spacing:.04em;text-transform:uppercase}.hrwe-links{display:flex;flex-wrap:wrap;gap:12px 24px;margin-top:24px}.hrwe-note{margin:32px 0 0;padding:16px 18px;border-left:3px solid #4e8b70;background:#f5f8f5;color:var(--muted);font-size:13px;line-height:1.6}
@media(max-width:1000px){.hrwe-classes{grid-template-columns:repeat(2,minmax(0,1fr))}.hrwe-class:last-child{grid-column:1/-1}.hrwe-principle{grid-template-columns:1fr;gap:16px}}
@media(max-width:650px){.hrwe-page .page-hero{padding-top:30px;padding-bottom:28px}.hrwe-classes{grid-template-columns:1fr}.hrwe-class:last-child{grid-column:auto}.hrwe-first{padding:24px 20px}.hrwe-links{display:grid;gap:10px}}
</style><main id="main" class="subpage-main hrwe-page">
  <section class="page-hero" aria-labelledby="hrwe-page-heading"><div><span class="page-eyebrow">${esc(page.eyebrow)}</span><h1 id="hrwe-page-heading">${esc(page.heading)}</h1><p>${esc(page.lead)}</p></div></section>
  <section class="page-section hrwe-principle" aria-labelledby="hrwe-principle-heading"><h2 id="hrwe-principle-heading">${esc(page.principle.heading)}</h2><p>${esc(page.principle.text)}</p></section>
  <section class="page-section" aria-labelledby="hrwe-classes-heading"><div class="section-heading"><span class="page-eyebrow">Evidence classification</span><h2 id="hrwe-classes-heading">Source type stays visible.</h2><p>Historical use, clinical evidence and regulatory evidence are related, but they are not interchangeable.</p></div><div class="hrwe-classes">${page.classes.map(classification).join('')}</div>
    <article class="hrwe-first"><span class="page-eyebrow">${esc(page.firstCase.eyebrow)}</span><h2>${esc(page.firstCase.title)}</h2><p>${esc(page.firstCase.text)}</p><span class="hrwe-status">${esc(page.firstCase.status)}</span><div class="hrwe-links">${page.links.map(textLink).join('')}</div></article>
    <p class="hrwe-note">${esc(page.note)}</p>
  </section>
</main>`;
