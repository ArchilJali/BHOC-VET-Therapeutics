import {esc,attrs,icon} from '../lib/html.mjs';

const storyHTML=(story,index)=>`<article class="conservation-story" id="${esc(story.id)}" itemscope itemtype="https://schema.org/NewsArticle">
  <figure class="story-media"><img src="${esc(story.image.url)}" alt="${esc(story.image.alt)}" width="900" height="600" ${index===0?'loading="eager"':'loading="lazy"'} decoding="async" itemprop="image"><a class="story-credit" ${attrs(story.credit)} target="_blank" rel="noopener noreferrer">${esc(story.credit.label)}</a></figure>
  <div class="story-copy"><div class="story-meta"><time datetime="${esc(story.date)}" itemprop="datePublished">${esc(story.dateLabel)}</time><span>${esc(story.region)}</span><span>${esc(story.category)}</span></div><h3 itemprop="headline">${esc(story.title)}</h3><p itemprop="description">${esc(story.text)}</p><div class="story-footer"><a class="story-link" ${attrs(story.link)} target="_blank" rel="noopener noreferrer" itemprop="url">${esc(story.link.label)} →</a><span class="story-why">${esc(story.why)}</span></div></div>
</article>`;

export default page=>`<style>
.news-page .page-hero{padding-top:clamp(30px,4vw,52px);padding-bottom:clamp(22px,3vw,36px);min-height:0}
.news-page .page-hero>div{max-width:880px}.news-page .page-hero h1{margin-bottom:10px}.news-page .page-hero p{max-width:780px;margin-bottom:0}
.intelligence-section{padding-top:18px!important}
.intelligence-inner{width:min(80%,1120px);margin:0 auto}
.intelligence-head{display:flex;align-items:flex-end;justify-content:space-between;gap:28px;margin-bottom:16px}
.intelligence-head .section-heading{margin:0;max-width:760px}.intelligence-head .section-heading h2{margin-bottom:6px}.intelligence-head .section-heading p{margin:0;color:var(--muted);line-height:1.5}
.intelligence-status{flex:0 0 auto;text-align:right;color:var(--muted);font-size:10px;line-height:1.5;letter-spacing:.04em;text-transform:uppercase}.intelligence-status strong{display:block;color:var(--ink);font-size:11px}.scroll-cue{display:block;margin-top:3px;color:var(--accent-strong);font-weight:700}
.feed-window{position:relative;border:1px solid var(--line);border-radius:16px;background:#f8faf8;padding:10px 8px 10px 10px;box-shadow:0 10px 28px rgba(16,47,73,.045)}
.conservation-feed{display:grid;gap:10px;max-height:min(72vh,690px);overflow-y:auto;overflow-x:hidden;padding-right:8px;scrollbar-gutter:stable;overscroll-behavior:contain;scroll-behavior:smooth}
.conservation-feed::-webkit-scrollbar{width:8px}.conservation-feed::-webkit-scrollbar-track{background:#eef1ee;border-radius:8px}.conservation-feed::-webkit-scrollbar-thumb{background:#a7b7ae;border-radius:8px}.conservation-feed::-webkit-scrollbar-thumb:hover{background:#7f9589}
.conservation-story{display:grid;grid-template-columns:minmax(180px,28%) minmax(0,1fr);background:#fff;border:1px solid var(--line);border-radius:12px;overflow:hidden;min-height:154px;box-shadow:0 5px 15px rgba(16,47,73,.035)}
.story-media{position:relative;display:block;min-height:154px;overflow:hidden;background:#edf2ef;margin:0}.story-media img{width:100%;height:100%;min-height:154px;object-fit:cover;display:block;transition:transform .2s ease}.conservation-story:hover .story-media img{transform:scale(1.015)}
.story-credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);padding:3px 5px;border-radius:4px;background:rgba(7,31,38,.74);color:#fff;font-size:7px;line-height:1.2;text-decoration:none}
.story-copy{padding:13px 16px;display:flex;flex-direction:column;justify-content:center;min-width:0}.story-meta{display:flex;flex-wrap:wrap;gap:4px 10px;margin-bottom:5px;color:#617173;font-size:8.5px;font-weight:750;letter-spacing:.065em;text-transform:uppercase}.story-meta time{color:#a9470d}
.story-copy h3{margin:0 0 5px;font-size:clamp(17px,1.6vw,21px);line-height:1.16;letter-spacing:-.25px;color:var(--ink)}.story-copy p{margin:0;color:var(--muted);font-size:11.5px;line-height:1.48}.story-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:8px}.story-link{font-size:10px;font-weight:800;color:var(--teal);text-decoration:none}.story-link:hover{text-decoration:underline}.story-why{font-size:8.5px;color:#738083;text-align:right}
.intelligence-note{margin:12px 0 0;padding:9px 12px;border-left:3px solid #4e8b70;background:#f5f8f5;color:var(--muted);font-size:9.5px;line-height:1.5}
.channels-compact{margin-top:16px;padding-top:22px!important;border-top:1px solid var(--line)}.channels-compact .section-heading{margin-bottom:18px}.channels-compact .news-grid{gap:10px}.channels-compact .news-card{padding:16px;min-height:0}.channels-compact .news-card p{font-size:11px}.channels-compact .news-card .text-link{padding-top:14px}
@media(max-width:950px){.intelligence-inner{width:92%}.intelligence-head{align-items:flex-start;flex-direction:column;gap:8px}.intelligence-status{text-align:left}.conservation-story{grid-template-columns:175px minmax(0,1fr)}}
@media(max-width:640px){.intelligence-inner{width:100%}.conservation-feed{max-height:68vh;padding-right:5px}.conservation-story{grid-template-columns:115px minmax(0,1fr);min-height:126px}.story-media,.story-media img{min-height:126px}.story-copy{padding:10px 11px}.story-copy h3{font-size:15px}.story-copy p{font-size:10px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}.story-meta{font-size:7.5px}.story-footer{align-items:flex-start;flex-direction:column;gap:3px}.story-why{text-align:left;font-size:7.5px}.story-credit{font-size:6px}.channels-compact .news-grid{grid-template-columns:1fr}}
</style>
<main id="main" class="subpage-main news-page">
  <section class="page-hero" aria-labelledby="news-page-heading"><div><span class="page-eyebrow">${esc(page.eyebrow)}</span><h1 id="news-page-heading">${esc(page.heading)}</h1><p>${esc(page.lead)}</p></div></section>
  <section class="page-section intelligence-section" aria-labelledby="intelligence-heading"><div class="intelligence-inner">
    <div class="intelligence-head"><div class="section-heading"><span class="page-eyebrow">${esc(page.feedEyebrow)}</span><h2 id="intelligence-heading">${esc(page.feedHeading)}</h2><p>${esc(page.feedLead)}</p></div><div class="intelligence-status"><strong>Updated ${esc(page.updated)}</strong>Global · newest first<span class="scroll-cue">Scroll news ↓</span></div></div>
    <div class="feed-window" aria-label="Scrollable wildlife and species conservation news feed"><div class="conservation-feed" tabindex="0">${page.stories.map(storyHTML).join('')}</div></div>
    <p class="intelligence-note"><strong>BHOC Initiative Scout method:</strong> ${esc(page.feedNote)}</p>
  </div></section>
  <section class="page-section channels-compact" aria-labelledby="news-channels-heading"><div class="section-heading"><span class="page-eyebrow">BHOC channels</span><h2 id="news-channels-heading">Evidence and professional discussion.</h2></div><div class="news-grid">${page.channels.map(channel=>`<article class="news-card"><span class="news-icon">${icon(channel.icon)}</span><h3>${esc(channel.title)}</h3><p>${esc(channel.text)}</p><a class="text-link" ${attrs(channel.link)}>${esc(channel.link.label)} ${icon('arrow')}</a></article>`).join('')}</div></section>
</main>`;
