import {esc,attrs,img} from '../lib/html.mjs';

export default page=>`<main id="main" class="subpage-main crada-news">
<style>
.crada-news{max-width:1160px;margin:auto;padding:24px var(--gutter) 36px}.crada-news .page-eyebrow{font-size:12px}.crada-news h1{max-width:960px;font-size:clamp(29px,4vw,47px);line-height:1.1;margin:10px 0 14px}.crada-news .lead{max-width:920px;font-size:17px;line-height:1.6}.crada-news .article-meta{font-size:12px;color:var(--muted);margin:12px 0 20px}.crada-news figure{margin:0 0 22px}.crada-news figure img{display:block;width:100%;height:auto;border:1px solid var(--line);border-radius:12px}.crada-news figcaption{font-size:12px;color:var(--muted);line-height:1.5;margin-top:8px}.crada-news .article-copy{max-width:850px}.crada-news h2{font-size:25px;line-height:1.2;margin:24px 0 12px}.crada-news p,.crada-news li{font-size:16px;line-height:1.7}.crada-news ul{padding-left:22px;columns:1}.crada-news li{margin:4px 0}.crada-news .research-note{font-size:13px;color:var(--muted)}.crada-news .article-links{display:flex;flex-wrap:wrap;gap:14px 22px;margin-top:24px;padding-top:18px;border-top:1px solid var(--line)}.crada-news .article-links a{font-size:14px}.crada-news .contact-link{display:inline-block;font-weight:700;margin:4px 0 8px;overflow-wrap:anywhere}@media(max-width:600px){.crada-news{padding-top:18px}.crada-news .lead,.crada-news p,.crada-news li{font-size:15px}.crada-news .article-links{display:grid;gap:10px}}
</style>
<article aria-labelledby="crada-heading">
  <header><span class="page-eyebrow">${esc(page.eyebrow)}</span><h1 id="crada-heading">${esc(page.heading)}</h1><p class="lead">${esc(page.lead)}</p><p class="article-meta"><time datetime="${esc(page.datePublished)}">${esc(page.dateLabel)}</time> · By ${esc(page.authorName)}</p></header>
  <figure><a href="./${esc(page.socialImage.src)}" target="_blank" rel="noopener noreferrer" aria-label="View the BHOC CRADA research-partner banner at full size">${img(page.image,'fetchpriority="high"')}</a><figcaption>${esc(page.imageCaption)}</figcaption></figure>
  <div class="article-copy">
    <p>${esc(page.introduction)}</p><p>${esc(page.principle)}</p>
    <section aria-labelledby="research-areas"><h2 id="research-areas">${esc(page.areasHeading)}</h2><ul>${page.researchAreas.map(text=>`<li>${esc(text)}</li>`).join('')}</ul><p>${esc(page.otherAreas)}</p></section>
    <section aria-labelledby="join-research"><h2 id="join-research">${esc(page.invitationHeading)}</h2><p>${esc(page.invitation)}</p><p>${esc(page.contactText)}</p><a class="contact-link" ${attrs(page.contactLink)}>${esc(page.contactLink.label)}</a></section>
    <p class="research-note">${esc(page.researchNote)}</p>
  </div>
  <nav class="article-links" aria-label="Related BHOC resources">${page.relatedLinks.map(item=>`<a ${attrs(item)}>${esc(item.label)}</a>`).join('')}</nav>
</article>
</main>`;
