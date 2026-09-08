import {esc,attrs,icon} from '../lib/html.mjs';

const storyHTML=(story,index)=>`<article class="conservation-story" id="${esc(story.id)}" itemscope itemtype="https://schema.org/NewsArticle">
  <figure class="story-media"><img src="${esc(story.image.url)}" alt="${esc(story.image.alt)}" width="900" height="600" ${index===0?'loading="eager"':'loading="lazy"'} decoding="async" itemprop="image"><a class="story-credit" ${attrs(story.credit)} target="_blank" rel="noopener noreferrer">${esc(story.credit.label)}</a></figure>
  <div class="story-copy"><div class="story-meta"><time datetime="${esc(story.date)}" itemprop="datePublished">${esc(story.dateLabel)}</time><span>${esc(story.region)}</span><span>${esc(story.category)}</span></div><h3 itemprop="headline">${esc(story.title)}</h3><p itemprop="description">${esc(story.text)}</p><div class="story-footer"><a class="story-link" ${attrs(story.link)} target="_blank" rel="noopener noreferrer" itemprop="url">${esc(story.link.label)} →</a><span class="story-why">${esc(story.why)}</span></div></div>
</article>`;

export default page=>`<style>
.news-page .page-hero{display:block;padding:13px var(--gutter) 12px;min-height:0}
.news-page .page-hero::after{opacity:.38;transform:scale(.68);transform-origin:top right}
.news-page .page-hero>div{display:flex;align-items:center;gap:18px;max-width:1180px;margin:0;white-space:nowrap}
.news-page .page-hero .page-eyebrow{flex:0 0 auto;margin:0;font-size:9px;letter-spacing:.085em}
.news-page .page-hero h1{flex:0 1 430px;max-width:430px;margin:0;font-size:clamp(24px,2.5vw,35px);line-height:1.02;letter-spacing:-.7px;white-space:normal}
.news-page .page-hero p{flex:1 1 440px;max-width:500px;margin:0;font-size:11.5px;line-height:1.38;color:var(--muted);white-space:normal}
.intelligence-section{padding-top:10px!important;padding-bottom:18px!important}
.intelligence-inner{width:min(80%,1120px);margin:0}
.intelligence-head{display:flex;align-items:center;justify-content:flex-start;gap:22px;margin-bottom:9px}
.intelligence-head .section-heading{display:flex;align-items:baseline;gap:12px;margin:0;max-width:none;min-width:0}
.intelligence-head .section-heading .page-eyebrow{flex:0 0 auto;margin:0;font-size:8px;letter-spacing:.07em}
.intelligence-head .section-heading h2{flex:0 0 auto;margin:0;font-size:clamp(20px,2vw,27px);line-height:1.05;letter-spacing:-.35px}
.intelligence-head .section-heading p{margin:0;color:var(--muted);font-size:10px;line-height:1.3;max-width:390px}
.intelligence-status{flex:0 0 auto;text-align:left;color:var(--muted);font-size:8.5px;line-height:1.35;letter-spacing:.035em;text-transform:uppercase}.intelligence-status strong{display:inline;color:var(--ink);font-size:9px;margin-right:6px}.scroll-cue{display:inline;margin-left:7px;color:var(--accent-strong);font-weight:700}
.feed-window{position:relative;border:1px solid var(--line);border-radius:16px;background:#f8faf8;padding:10px 8px 10px 10px;box-shadow:0 10px 28px rgba(16,47,73,.045)}
.conservation-feed{display:grid;gap:10px;height:min(81vh,820px);min-height:560px;overflow-y:auto;overflow-x:hidden;padding-right:8px;scrollbar-gutter:stable;overscroll-behavior:contain;scroll-behavior:smooth}
.conservation-feed::-webkit-scrollbar{width:8px}.conservation-feed::-webkit-scrollbar-track{background:#eef1ee;border-radius:8px}.conservation-feed::-webkit-scrollbar-thumb{background:#a7b7ae;border-radius:8px}.conservation-feed::-webkit-scrollbar-thumb:hover{background:#7f9589}
.conservation-story{display:grid;grid-template-columns:minmax(180px,28%) minmax(0,1fr);background:#fff;border:1px solid var(--line);border-radius:12px;overflow:hidden;min-height:154px;box-shadow:0 5px 15px rgba(16,47,73,.035)}
.story-media{position:relative;display:block;min-height:154px;overflow:hidden;background:#edf2ef;margin:0}.story-media img{width:100%;height:100%;min-height:154px;object-fit:cover;display:block;transition:transform .2s ease}.conservation-story:hover .story-media img{transform:scale(1.015)}
.story-credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);padding:3px 5px;border-radius:4px;background:rgba(7,31,38,.74);color:#fff;font-size:7px;line-height:1.2;text-decoration:none}
.story-copy{padding:13px 16px;display:flex;flex-direction:column;justify-content:center;min-width:0}.story-meta{display:flex;flex-wrap:wrap;gap:4px 10px;margin-bottom:5px;color:#617173;font-size:8.5px;font-weight:750;letter-spacing:.065em;text-transform:uppercase}.story-meta time{color:#a9470d}
.story-copy h3{margin:0 0 5px;font-size:clamp(17px,1.6vw,21px);line-height:1.16;letter-spacing:-.25px;color:var(--ink)}.story-copy p{margin:0;color:var(--muted);font-size:11.5px;line-height:1.48}.story-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:8px}.story-link{font-size:10px;font-weight:800;color:var(--teal);text-decoration:none}.story-link:hover{text-decoration:underline}.story-why{font-size:8.5px;color:#738083;text-align:right}
.intelligence-note{margin:9px 0 0;padding:7px 10px;border-left:3px solid #4e8b70;background:#f5f8f5;color:var(--muted);font-size:8.8px;line-height:1.42}
.channels-compact{margin-top:10px;padding-top:18px!important;border-top:1px solid var(--line)}.channels-compact .section-heading{margin-bottom:14px}.channels-compact .news-grid{gap:10px}.channels-compact .news-card{padding:15px;min-height:0}.channels-compact .news-card p{font-size:10.5px}.channels-compact .news-card .text-link{padding-top:12px}
@media(max-width:1050px){.news-page .page-hero>div{gap:12px}.news-page .page-hero p{font-size:10.5px}.intelligence-head .section-heading p{display:none}.intelligence-inner{width:88%}}
@media(max-width:820px){.news-page .page-hero>div{display:grid;grid-template-columns:auto 1fr;gap:5px 12px;white-space:normal}.news-page .page-hero .page-eyebrow{grid-column:1}.news-page .page-hero h1{grid-column:2;max-width:none}.news-page .page-hero p{grid-column:1/-1;max-width:none}.intelligence-inner{width:94%}.intelligence-head{align-items:flex-start;gap:8px}.intelligence-head .section-heading{display:block}.intelligence-head .section-heading .page-eyebrow{margin-bottom:4px}.intelligence-status{text-align:left}.conservation-feed{height:76vh;min-height:500px}.conservation-story{grid-template-columns:175px minmax(0,1fr)}}
@media(max-width:640px){.news-page .page-hero{padding:11px var(--gutter) 9px}.news-page .page-hero>div{display:block}.news-page .page-hero .page-eyebrow{display:block;margin-bottom:3px}.news-page .page-hero h1{font-size:23px}.news-page .page-hero p{display:none}.intelligence-inner{width:100%}.intelligence-head{margin-bottom:7px}.intelligence-head .section-heading h2{font-size:19px}.intelligence-status{font-size:7.5px}.intelligence-status strong{display:block;margin:0}.scroll-cue{display:block;margin:2px 0 0}.conservation-feed{height:74vh;min-height:440px;padding-right:5px}.conservation-story{grid-template-columns:115px minmax(0,1fr);min-height:126px}.story-media,.story-media img{min-height:126px}.story-copy{padding:10px 11px}.story-copy h3{font-size:15px}.story-copy p{font-size:10px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}.story-meta{font-size:7.5px}.story-footer{align-items:flex-start;flex-direction:column;gap:3px}.story-why{text-align:left;font-size:7.5px}.story-credit{font-size:6px}.channels-compact .news-grid{grid-template-columns:1fr}}

/* Compact viewport news layout */
.news-page .page-hero>div{display:block;max-width:1180px;margin:0;white-space:normal}
.news-page .page-hero .page-eyebrow{display:block;margin:0 0 5px;font-size:9px}
.news-page .page-hero h1{display:block;max-width:none;margin:0;font-size:clamp(30px,4vw,52px);line-height:.98;letter-spacing:-1.2px;white-space:nowrap}
.news-page .page-hero p{display:block;max-width:760px;margin:8px 0 0;font-size:11px;line-height:1.35;white-space:normal}
.intelligence-head{justify-content:flex-end;margin-bottom:7px}
.intelligence-head .section-heading{display:none}
.feed-window{height:calc(100dvh - 245px);min-height:430px;max-height:820px;overflow:hidden}
.conservation-feed{height:100%;min-height:0}
.story-byline{display:block;margin:0 0 5px;color:#8b5a3c;font-size:9px;line-height:1.25;font-weight:700}
@media(max-width:820px){.news-page .page-hero h1{font-size:clamp(26px,7vw,38px);line-height:1;white-space:normal}.news-page .page-hero p{display:block;max-width:620px;font-size:10px}.feed-window{height:calc(100dvh - 230px);min-height:390px}.conservation-feed{height:100%;min-height:0}}
@media(max-width:640px){.news-page .page-hero{padding:11px var(--gutter) 8px}.news-page .page-hero h1{font-size:clamp(24px,7.5vw,31px)}.news-page .page-hero p{display:block;margin-top:6px;font-size:9px;line-height:1.35}.intelligence-head{margin-bottom:6px}.intelligence-status{font-size:7.5px}.feed-window{height:calc(100dvh - 205px);min-height:350px;padding:7px 5px 7px 7px}.conservation-feed{height:100%;min-height:0}.story-byline{font-size:8px}}
</style>
<main id="main" class="subpage-main news-page">
  <section class="page-hero" aria-labelledby="news-page-heading"><div><span class="page-eyebrow">${esc(page.eyebrow)}</span><h1 id="news-page-heading">${esc(page.heading)}</h1><p>${esc(page.lead)}</p></div></section>
  <section class="page-section intelligence-section" aria-labelledby="intelligence-heading"><div class="intelligence-inner">
    <div class="intelligence-head"><div class="intelligence-status"><strong>Updated ${esc(page.updated)}</strong>Global · newest first<span class="scroll-cue">Scroll news ↓</span></div></div>
    <div class="feed-window" aria-label="Scrollable wildlife and species conservation news feed"><div class="conservation-feed" tabindex="0">${page.stories.map(storyHTML).join('')}</div></div>
    <p class="intelligence-note"><strong>BHOC Initiative Scout method:</strong> ${esc(page.feedNote)}</p>
  </div></section>
  <section class="page-section channels-compact" aria-labelledby="news-channels-heading"><div class="section-heading"><span class="page-eyebrow">BHOC channels</span><h2 id="news-channels-heading">Evidence and professional discussion.</h2></div><div class="news-grid">${page.channels.map(channel=>`<article class="news-card"><span class="news-icon">${icon(channel.icon)}</span><h3>${esc(channel.title)}</h3><p>${esc(channel.text)}</p><a class="text-link" ${attrs(channel.link)}>${esc(channel.link.label)} ${icon('arrow')}</a></article>`).join('')}</div></section>
</main>`;
