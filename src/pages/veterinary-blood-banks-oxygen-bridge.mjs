import {esc,attrs,img} from '../lib/html.mjs';

const paragraph=p=>`<p>${p.emphasis?'<strong>':''}${esc(p.text)}${p.emphasis?'</strong>':''}${(p.references??[]).map(n=>`<a class="source-ref" href="#source-${n}" aria-label="Source ${n}">[${n}]</a>`).join('')}</p>`;

export default page=>`<main id="main" class="subpage-main blood-bank-news">
<style>
.blood-bank-news{max-width:1160px;margin:auto;padding:24px var(--gutter) 36px}.blood-bank-news h1{font-size:clamp(29px,3.6vw,44px);line-height:1.14;max-width:1040px;margin:10px 0 12px}.blood-bank-news .lead{font-size:17px;line-height:1.6;max-width:960px}.blood-bank-news .article-meta{font-size:12px;color:var(--muted);margin:12px 0 20px}.blood-bank-opening{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);gap:28px;align-items:start}.blood-bank-news figure{margin:0}.blood-bank-news figure img{display:block;width:100%;height:auto;border-radius:12px;border:1px solid var(--line)}.blood-bank-news figcaption{font-size:12px;line-height:1.5;color:var(--muted);margin-top:7px}.blood-bank-news .article-copy p{font-size:16px;line-height:1.65;margin:0 0 15px}.blood-bank-news .source-ref{font-size:11px;white-space:nowrap;margin-left:4px}.blood-bank-news .article-actions{display:flex;flex-wrap:wrap;gap:10px 22px;margin:8px 0 20px;font-size:14px;font-weight:700}.blood-bank-news .article-sources{border-top:1px solid var(--line);padding-top:18px;margin-top:22px}.blood-bank-news h2{font-size:21px;margin:0 0 12px}.blood-bank-news .article-sources ol{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 30px;margin:0;padding-left:20px}.blood-bank-news .article-sources li{font-size:13px;line-height:1.55;overflow-wrap:anywhere}.blood-bank-news .article-links{display:flex;flex-wrap:wrap;gap:12px 22px;margin-top:22px;padding-top:16px;border-top:1px solid var(--line);font-size:14px}.blood-bank-news a{overflow-wrap:anywhere}@media(max-width:800px){.blood-bank-opening{grid-template-columns:1fr;gap:20px}.blood-bank-news figure{max-width:680px}.blood-bank-news .article-sources ol{grid-template-columns:1fr}.blood-bank-news h1{font-size:32px}}@media(max-width:480px){.blood-bank-news{padding-top:18px}.blood-bank-news .lead,.blood-bank-news .article-copy p{font-size:15px}.blood-bank-news .article-actions{display:grid}}
</style>
<article aria-labelledby="blood-bank-news-heading"><header>
<span class="page-eyebrow">${esc(page.eyebrow)}</span>
<h1 id="blood-bank-news-heading">${esc(page.heading)}</h1>
<p class="lead">${esc(page.lead)}</p>
<p class="article-meta"><time datetime="${esc(page.datePublished)}">${esc(page.dateLabel)}</time> · By ${esc(page.authorName)}</p>
</header>
<div class="blood-bank-opening"><figure>${img(page.image,'fetchpriority="high"')}<figcaption>${esc(page.imageCaption)}</figcaption></figure>
<div class="article-copy">${page.paragraphs.slice(0,3).map(paragraph).join('')}</div></div>
<div class="article-copy" style="margin-top:20px">${page.paragraphs.slice(3).map(paragraph).join('')}<nav class="article-actions" aria-label="Cooperation actions">${page.actions.map(l=>`<a ${attrs(l)}>${esc(l.label)}</a>`).join('')}</nav></div>
<aside class="article-sources" aria-label="Article sources"><h2>Sources and context</h2><ol>${page.references.map((r,i)=>`<li id="source-${i+1}"><a ${attrs(r)}>${esc(r.label)}</a>${r.detail?`<br>${esc(r.detail)}`:''}</li>`).join('')}</ol></aside>
<nav class="article-links" aria-label="Related veterinary resources">${page.relatedLinks.map(l=>`<a ${attrs(l)}>${esc(l.label)}</a>`).join('')}</nav>
</article></main>`;
