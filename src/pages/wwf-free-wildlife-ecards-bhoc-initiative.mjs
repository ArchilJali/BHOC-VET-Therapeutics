import {esc,attrs,img} from '../lib/html.mjs';

export default page=>`<style>
.wwf-article .page-hero{display:block;min-height:0;padding:24px var(--gutter) 18px}
.wwf-article .page-hero::after{display:none}
.wwf-article .page-hero>div{max-width:1160px;margin:auto}
.wwf-article h1{max-width:1040px;margin:8px 0 10px;font-size:clamp(30px,4vw,48px);line-height:1.1;letter-spacing:-.7px}
.wwf-article .page-hero p{max-width:940px;margin:0;font-size:16px;line-height:1.55}
.wwf-article-meta{margin-top:12px;color:var(--muted);font-size:13px}
.wwf-article-body{width:min(calc(100% - 2 * var(--gutter)),1160px);margin:0 auto;padding-bottom:32px}
.wwf-article-card{margin:0 0 22px;background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden}
.wwf-article-card>a{display:block}.wwf-article-card img{display:block;width:100%;height:auto;object-fit:contain}
.wwf-article-card figcaption{padding:9px 14px;font-size:12px;line-height:1.4;color:var(--muted)}
.wwf-article-card figcaption a,.wwf-article-source a,.wwf-article-bottom a{color:var(--teal)}
.wwf-article-section{margin:0 0 22px}.wwf-article-section h2{margin:0 0 10px;font-size:clamp(24px,2.5vw,31px);line-height:1.2}
.wwf-article-section p{max-width:1050px;margin:0 0 12px;font-size:16px;line-height:1.65;color:var(--muted)}
.wwf-article-links{display:flex;gap:12px 20px;flex-wrap:wrap;margin-top:12px}.wwf-article-links a{color:var(--teal);font-size:15px;font-weight:750}
.wwf-article-note{margin:0 0 18px;padding:12px 15px;border-left:3px solid #4e8b70;background:#f5f8f5;color:var(--muted);font-size:13px;line-height:1.5}
.wwf-article-bottom{display:flex;gap:12px 24px;justify-content:space-between;flex-wrap:wrap;padding-top:15px;border-top:1px solid var(--line);font-size:14px}
@media(max-width:700px){.wwf-article .page-hero{padding:20px 14px 15px}.wwf-article-body{width:calc(100% - 28px)}.wwf-article-card{border-radius:10px}.wwf-article h1{font-size:31px}.wwf-article-section p{font-size:15px}.wwf-article-links{display:grid;gap:10px}}
</style>
<main id="main" class="subpage-main wwf-article">
<article aria-labelledby="wwf-article-heading">
<header class="page-hero"><div><span class="page-eyebrow">${esc(page.eyebrow)}</span><h1 id="wwf-article-heading">${esc(page.heading)}</h1><p>${esc(page.lead)}</p><div class="wwf-article-meta">By ${esc(page.author)} · BHOC Veterinary · <time datetime="${esc(page.datePublished)}">${esc(page.dateLabel)}</time></div></div></header>
<div class="wwf-article-body">
<figure class="wwf-article-card"><a ${attrs(page.imageLink)} target="_blank" rel="noopener noreferrer" aria-label="View the complete elephant card">${img(page.image,'loading="eager" fetchpriority="high"')}</a><figcaption><a ${attrs(page.imageLink)}>View the complete card</a></figcaption></figure>
${page.sections.map(section=>`<section class="wwf-article-section" id="${esc(section.id)}" aria-labelledby="${esc(section.id)}-heading"><h2 id="${esc(section.id)}-heading">${esc(section.heading)}</h2>${section.paragraphs.map(text=>`<p>${esc(text)}</p>`).join('')}<nav class="wwf-article-links" aria-label="${esc(section.heading)} links">${section.links.map(item=>`<a ${attrs(item)}>${esc(item.label)}</a>`).join('')}</nav></section>`).join('')}
<p class="wwf-article-note">${esc(page.supportNote)}</p>
<footer class="wwf-article-bottom"><a ${attrs(page.returnLink)}>${esc(page.returnLink.label)}</a><a ${attrs(page.sourceLink)}>${esc(page.sourceLink.label)}</a></footer>
</div></article></main>`;
