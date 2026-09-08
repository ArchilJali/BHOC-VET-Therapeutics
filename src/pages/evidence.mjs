import {esc,attrs,icon} from '../lib/html.mjs';

const itemLink=item=>`<a class="publication-link" ${attrs(item)}><span><strong>${esc(item.label)}</strong><small>${esc(item.detail)}</small></span>${icon('arrow')}</a>`;
const inlineLink=item=>`<a class="text-link" ${attrs(item)}>${esc(item.label)} ${icon('arrow')}</a>`;
const metric=item=>`<article class="application-card"><h3>${esc(item.value)}</h3><p>${esc(item.label)}</p></article>`;
const spotlightVisual=image=>image?`<figure class="fda-trial-visual"><img src="./${esc(image.src)}" alt="${esc(image.alt)}" title="${esc(image.title)}" width="${Number(image.width)}" height="${Number(image.height)}" loading="lazy" decoding="async"></figure>`:'';

const compactStyles=`<style>
.evidence-page .page-hero{padding-top:34px;padding-bottom:30px;gap:34px}
.evidence-page .page-hero h1{font-size:clamp(38px,4.6vw,62px)}
.evidence-page .page-hero p{margin-top:14px;font-size:17px;line-height:1.48}
.evidence-page .page-index a{padding:9px 4px}
.evidence-page .evidence-spotlight{grid-template-columns:minmax(170px,250px) minmax(0,1fr);gap:clamp(24px,4vw,52px);align-items:center;padding:30px var(--gutter) 32px}
.evidence-page .fda-trial-visual{margin:0;display:flex;align-items:center;justify-content:center}
.evidence-page .fda-trial-visual img{display:block;width:min(100%,240px);height:auto;border-radius:18px;box-shadow:0 10px 28px #a9490d12}
.evidence-page .regulatory-copy{max-width:940px}
.evidence-page .regulatory-copy .page-eyebrow{margin-bottom:9px}
.evidence-page .regulatory-copy h2{font-size:clamp(31px,3.6vw,48px)}
.evidence-page .regulatory-copy>p{margin-top:10px;font-size:15px;line-height:1.52}
.evidence-page .inline-actions{margin-top:17px;gap:12px 22px}
.evidence-page #evidence-library{padding-top:34px;padding-bottom:36px}
.evidence-page #evidence-library .section-heading{margin-bottom:18px}
.evidence-page #evidence-library .section-heading h2{font-size:clamp(31px,3.6vw,48px)}
.evidence-page #evidence-library .application-grid{gap:10px}
.evidence-page #evidence-library .application-card{padding:17px 18px}
.evidence-page #evidence-library .application-card h3{font-size:25px}
.evidence-page #evidence-library .application-card p{margin-top:6px;font-size:13px;line-height:1.35}
.evidence-page #evidence-library .section-copy p{margin-top:16px;font-size:14px;line-height:1.5;max-width:none}
.evidence-page .publication-group{padding:34px 0;gap:34px}
.evidence-page .publication-group h2{font-size:clamp(28px,3vw,40px)}
.evidence-page .publication-group header p{margin-top:10px;line-height:1.52;font-size:14px}
.evidence-page .publication-links{gap:8px}
.evidence-page .publication-link{padding:15px 17px}
.evidence-page .publication-link small{margin-top:5px;line-height:1.38}
.evidence-page .evidence-note{padding-top:20px;padding-bottom:34px}
@media(max-width:900px){.evidence-page .evidence-spotlight{grid-template-columns:170px 1fr;gap:20px}.evidence-page .fda-trial-visual img{width:170px}}
@media(max-width:650px){.evidence-page .evidence-spotlight{grid-template-columns:1fr;padding-top:24px}.evidence-page .fda-trial-visual{justify-content:flex-start}.evidence-page .fda-trial-visual img{width:150px}.evidence-page .page-hero{padding-top:30px;padding-bottom:26px}}
</style>`;

export default page=>`${compactStyles}<main id="main" class="subpage-main publications-page evidence-page">
  <section class="page-hero" aria-labelledby="evidence-page-heading"><div><span class="page-eyebrow">${esc(page.eyebrow)}</span><h1 id="evidence-page-heading">${esc(page.heading)}</h1><p>${esc(page.lead)}</p></div><nav class="page-index" aria-label="Evidence sections"><a href="#fda-field-trial"><span>01</span>FDA field trial</a><a href="https://archiljali.github.io/BHOC-platform/veterinary/Vet-search.html" target="_blank" rel="noopener noreferrer"><span>02</span>Evidence library</a><a href="#regulatory-evidence"><span>03</span>Regulatory records</a></nav></section>

  <section id="fda-field-trial" class="regulatory-feature evidence-spotlight" aria-labelledby="fda-field-trial-heading">${spotlightVisual(page.spotlight.image)}<div class="regulatory-copy"><span class="page-eyebrow">${esc(page.spotlight.eyebrow)}</span><h2 id="fda-field-trial-heading">${esc(page.spotlight.title)}</h2><p><strong>${esc(page.spotlight.detail)}</strong></p><p>${esc(page.spotlight.secondary)}</p><p>${esc(page.spotlight.endpoint)}</p><p>${esc(page.spotlight.trial)}</p><div class="inline-actions">${page.spotlight.links.map(inlineLink).join('')}</div></div></section>

  <section id="evidence-library" class="page-section product-objectives" aria-labelledby="evidence-library-heading"><div class="section-heading"><span class="page-eyebrow">${esc(page.snapshot.eyebrow)}</span><h2 id="evidence-library-heading">${esc(page.snapshot.title)}</h2><p>${esc(page.snapshot.text)}</p></div><div class="application-grid product-objective-grid">${page.snapshot.metrics.map(metric).join('')}</div><div class="section-copy"><p>${esc(page.snapshot.scope)}</p></div></section>

  <div class="publication-groups">${page.groups.map(group=>`<section id="${esc(group.id)}" class="publication-group" aria-labelledby="${esc(group.id)}-heading"><header><span class="group-number">${esc(group.number)}</span><div><h2 id="${esc(group.id)}-heading">${esc(group.title)}</h2><p>${esc(group.description)}</p></div></header><div class="publication-links">${group.items.map(itemLink).join('')}</div></section>`).join('')}</div>
  <p class="evidence-note">${esc(page.note)}</p>
</main>`;
