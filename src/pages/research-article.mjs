import {esc,attrs} from '../lib/html.mjs';
const sourceHref=url=>url.startsWith('https://bhocvet.com/')?url.slice('https://bhocvet.com/'.length):url;

const paragraph=(text,sources)=>esc(text).replace(/\[([0-9,]+)\]/g,(match,group)=>{
  const numbers=group.split(',');
  if(!numbers.every(number=>sources[Number(number)-1]))return match;
  return '['+numbers.map(number=>`<a href="#source-${number}" aria-label="Source ${number}">${number}</a>`).join(', ')+']';
});

export default page=>`<main id="main" class="subpage-main topic-shell research-article-page">
  <article aria-labelledby="research-article-heading">
    <header class="research-article-hero"><div class="research-article-intro"><span class="topic-kicker">${esc(page.eyebrow)}</span><h1 id="research-article-heading">${esc(page.heading)}</h1><p class="topic-lead">${esc(page.lead)}</p><p class="feline-article-meta">By <a href="https://orcid.org/0009-0006-4712-4942">Archil Jaliashvili</a> · <time datetime="${esc(page.datePublished)}">${esc(page.dateLabel)}</time></p></div>${page.keyFinding?`<aside class="evidence-result" aria-label="Key study result"><span class="evidence-result-label">${esc(page.keyFinding.label)}</span><strong class="evidence-result-value">${esc(page.keyFinding.value)}</strong><p>${esc(page.keyFinding.sentence)}</p><a ${attrs({href:page.keyFinding.sourceUrl})}>${esc(page.keyFinding.sourceLabel)} ↗</a></aside>`:''}</header>
    <nav class="topic-toc" aria-label="On this page">${page.sections.map(section=>`<a href="#${esc(section.id)}">${esc(section.title)}</a>`).join('')}</nav>
    ${page.sections.map(section=>`<section class="topic-section" id="${esc(section.id)}" aria-labelledby="${esc(section.id)}-heading"><h2 id="${esc(section.id)}-heading">${esc(section.title)}</h2>${section.paragraphs.map(text=>`<p>${paragraph(text,page.sources)}</p>`).join('')}</section>`).join('')}
    <section class="topic-section" id="sources" aria-labelledby="sources-heading"><h2 id="sources-heading">Sources</h2><ol>${page.sources.map((source,index)=>`<li id="source-${index+1}"><a ${attrs({href:sourceHref(source.url)})}>${esc(source.title.replace(/^\[\d+\]\s*/,''))}</a>${source.doi?` · <a ${attrs({href:'https://doi.org/'+source.doi})}>DOI</a>`:''}</li>`).join('')}</ol></section>
    <section class="topic-section" id="related-resources" aria-labelledby="related-resources-heading"><h2 id="related-resources-heading">Related BHOC resources</h2><div class="topic-source-list">${page.internalLinks.map(item=>`<a ${attrs(item)}><strong>${esc(item.label)}</strong></a>`).join('')}</div></section>
    <nav class="topic-source-list" aria-label="Article navigation"><a href="news.html"><strong>Back to Veterinary News</strong></a><a href="topics.html"><strong>All veterinary research topics</strong></a></nav>
  </article>
</main>`;
