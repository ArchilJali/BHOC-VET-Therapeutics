import {esc,attrs,icon} from '../lib/html.mjs';

const safeJSON=value=>JSON.stringify(value).replace(/</g,'\\u003c');
const fact=item=>`<div class="saxon-fact"><span>${esc(item.label)}</span><strong>${esc(item.value)}</strong></div>`;
const source=item=>`<article class="saxon-source"><span class="page-eyebrow">${esc(item.type)}</span><h3>${esc(item.label)}</h3><p>${esc(item.detail)}</p><a class="text-link" ${attrs(item)} target="_blank" rel="noopener noreferrer">Open source ${icon('arrow')}</a></article>`;
const navLink=item=>`<a class="text-link" ${attrs(item)}>${esc(item.label)} ${icon('arrow')}</a>`;

export default page=>{const articleSchema=safeJSON({
  '@context':'https://schema.org',
  '@type':'Article',
  '@id':'https://bhocvet.com/k9-saxon-oxyglobin-real-world-evidence.html#article',
  headline:page.heading,
  description:page.description,
  url:'https://bhocvet.com/k9-saxon-oxyglobin-real-world-evidence.html',
  datePublished:page.published,
  dateModified:page.published,
  inLanguage:'en',
  image:{
    '@type':'ImageObject',
    url:'https://bhocvet.com/'+page.image.src,
    contentUrl:'https://bhocvet.com/'+page.image.src,
    caption:page.image.caption,
    width:page.image.width,
    height:page.image.height
  },
  author:{'@type':'Person',name:'Archil Jaliashvili',url:'https://www.linkedin.com/in/archil-jaliashvili-bhoc/'},
  publisher:{'@type':'Organization',name:'BHOC Veterinary',url:'https://bhocvet.com/'},
  about:['K-9 Saxon','Oxyglobin','Saxon Award','Fresno Police Department','hemoglobin-based oxygen carrier','veterinary emergency medicine','working dog trauma','oxygen delivery'],
  citation:page.sources.map(item=>item.href),
  mainEntityOfPage:'https://bhocvet.com/k9-saxon-oxyglobin-real-world-evidence.html'
});
return `<style>
.saxon-page .page-hero{padding-top:42px;padding-bottom:34px}.saxon-page .saxon-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(160px,230px);gap:clamp(28px,5vw,72px);align-items:center}.saxon-page .page-hero h1{max-width:1020px;font-size:clamp(39px,4.8vw,64px)}.saxon-page .page-hero p{max-width:960px;font-size:17px;line-height:1.58}
.saxon-portrait{margin:0;justify-self:end;width:min(100%,210px)}.saxon-portrait img{display:block;width:100%;height:auto;aspect-ratio:111/141;object-fit:cover;border-radius:15px;box-shadow:0 13px 34px rgba(16,47,73,.14);image-rendering:auto}.saxon-portrait figcaption{margin-top:9px;color:var(--muted);font-size:11px;line-height:1.42}.saxon-image-credit{display:inline-block;margin-top:6px;color:var(--teal);font-size:11px;font-weight:750;text-decoration:none}.saxon-image-credit:hover{text-decoration:underline}
.saxon-classification{display:grid;grid-template-columns:minmax(190px,.45fr) minmax(0,1.55fr);gap:28px;align-items:start;padding:22px 24px;border:1px solid #d8e4de;border-radius:16px;background:#f6f9f7}.saxon-classification strong{display:block;font-size:22px;line-height:1.2;color:var(--ink)}.saxon-classification p{margin:6px 0 0;color:var(--muted);font-size:14px;line-height:1.55}
.saxon-facts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:18px}.saxon-fact{padding:17px 18px;border:1px solid var(--line);border-radius:14px;background:#fff}.saxon-fact span{display:block;color:var(--muted);font-size:11px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}.saxon-fact strong{display:block;margin-top:7px;font-size:15px;line-height:1.4}
.saxon-story{display:grid;gap:0;margin-top:34px}.saxon-section{display:grid;grid-template-columns:minmax(180px,.42fr) minmax(0,1.58fr);gap:34px;padding:34px 0;border-top:1px solid var(--line)}.saxon-section h2{margin:7px 0 0;font-size:clamp(28px,3vw,42px);line-height:1.13;letter-spacing:-.45px}.saxon-copy p{margin:0;color:var(--muted);font-size:16px;line-height:1.67}.saxon-copy p+p{margin-top:14px}
.saxon-sources{padding-top:38px!important}.saxon-source-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.saxon-source{display:flex;flex-direction:column;align-items:flex-start;padding:23px;border:1px solid var(--line);border-radius:16px;background:#fff}.saxon-source h3{margin:7px 0 10px;font-size:19px;line-height:1.28}.saxon-source p{margin:0 0 18px;color:var(--muted);font-size:13px;line-height:1.55}.saxon-source .text-link{margin-top:auto}.saxon-boundary{margin-top:24px;padding:16px 18px;border-left:3px solid #4e8b70;background:#f5f8f5;color:var(--muted);font-size:13px;line-height:1.6}.saxon-nav{display:flex;flex-wrap:wrap;gap:14px 26px;margin-top:22px}
@media(max-width:850px){.saxon-page .saxon-hero{grid-template-columns:1fr}.saxon-portrait{justify-self:start;width:160px}.saxon-facts{grid-template-columns:repeat(2,minmax(0,1fr))}.saxon-source-grid{grid-template-columns:1fr}.saxon-section,.saxon-classification{grid-template-columns:1fr;gap:13px}}
@media(max-width:600px){.saxon-page .page-hero{padding-top:30px;padding-bottom:28px}.saxon-facts{grid-template-columns:1fr}.saxon-section{padding:27px 0}.saxon-nav{display:grid;gap:10px}}
</style><main id="main" class="subpage-main saxon-page">
  <section class="page-hero saxon-hero" aria-labelledby="saxon-page-heading"><div><span class="page-eyebrow">${esc(page.eyebrow)}</span><h1 id="saxon-page-heading">${esc(page.heading)}</h1><p>${esc(page.lead)}</p></div><figure class="saxon-portrait"><img src="./${esc(page.image.src)}" alt="${esc(page.image.alt)}" width="${Number(page.image.width)}" height="${Number(page.image.height)}" loading="eager" decoding="async"><figcaption>${esc(page.image.caption)}</figcaption><a class="saxon-image-credit" ${attrs(page.image.credit)} target="_blank" rel="noopener noreferrer">${esc(page.image.credit.label)} ↗</a></figure></section>
  <section class="page-section" aria-label="K-9 Saxon case classification"><div class="saxon-classification"><span class="page-eyebrow">${esc(page.classification.label)}</span><div><strong>${esc(page.classification.value)}</strong><p>${esc(page.classification.detail)}</p></div></div><div class="saxon-facts">${page.facts.map(fact).join('')}</div>
    <div class="saxon-story">${page.sections.map(section=>`<section id="${esc(section.id)}" class="saxon-section" aria-labelledby="${esc(section.id)}-heading"><div><span class="page-eyebrow">${esc(section.eyebrow)}</span><h2 id="${esc(section.id)}-heading">${esc(section.title)}</h2></div><div class="saxon-copy">${section.paragraphs.map(paragraph=>`<p>${esc(paragraph)}</p>`).join('')}</div></section>`).join('')}</div>
  </section>
  <section class="page-section saxon-sources" aria-labelledby="saxon-sources-heading"><div class="section-heading"><span class="page-eyebrow">Evidence trail</span><h2 id="saxon-sources-heading">Three records. Three different roles.</h2><p>The historical treatment account, official Saxon Award policy and FDA regulatory record support different parts of this case and are kept separate.</p></div><div class="saxon-source-grid">${page.sources.map(source).join('')}</div><p class="saxon-boundary">${esc(page.note)}</p><nav class="saxon-nav" aria-label="Related BHOC Veterinary pages">${page.navigation.map(navLink).join('')}</nav></section>
</main><script type="application/ld+json">${articleSchema}</script>`;};
