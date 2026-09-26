import {esc,attrs,icon} from '../lib/html.mjs';

const canonicalNewsURL='https://bhocvet.com/news.html';
const absoluteURL=value=>/^https:\/\//.test(value)?value:new URL(value,'https://bhocvet.com/').href;
const safeJSON=value=>JSON.stringify(value).replace(/</g,'\\u003c');
const saxonVisual={
  url:'assets/news/k9-saxon-oxyglobin-biopure-annual-report-2002.webp',
  alt:'Historical panel from the 2002 Biopure Annual Report showing Fresno Police K-9 Saxon and the Oxyglobin treatment account after catastrophic line-of-duty injuries.',
  width:2048,
  height:682,
  variant:'document'
};
const saxonFeature={
  dateLabel:'13 Sep 2026 · Historical feature · 25 years after 9/11 · Saxon case: 22 Aug 2002',
  region:'United States · New York / Fresno, California',
  category:'Historical feature · K-9 / working-dog emergency medicine',
  title:'25 years after 9/11: who helps the K-9s who help us? The Saxon Oxyglobin case.',
  text:"Twenty-five years after 9/11, BHOC Veterinary remembers the search-and-rescue K-9 teams who worked beside first responders at the World Trade Center. On September 19, 2001, HHS reported as many as 300 rescue dogs at the site and 13 Veterinary Medical Assistance Team veterinarians providing emergency care. The documented 9/11 response includes veterinary treatment for fatigue, lacerations, smoke and dust inhalation, eye irritation, dehydration and exhaustion, but we have not identified a primary record confirming Oxyglobin use at Ground Zero. Less than a year later, on August 22, 2002, Fresno Police K-9 Saxon became a documented Oxyglobin real-world case after catastrophic gunshot trauma. In Biopure's 2002 Annual Report, Police Chief Jerry Dyer wrote that discussions with veterinarian Dr. Roger Gfeller left no doubt, in their view, about the pivotal role Oxyglobin played in saving Saxon's life. Fresno Police later established the Saxon Award in his honor.",
  why:'Working K-9s help protect human lives. Saxon’s documented Oxyglobin case shows why emergency oxygen-delivery tools for police and search-and-rescue dogs remain clinically relevant.',
  sourceName:'Historical feature · HHS 9/11 veterinary response + Vet Real-World Evidence & Cases',
  contextLink:{label:'9/11 veterinary response source',href:'https://avalon.law.yale.edu/sept11/hhs_012.asp'},
  keywords:[
    'September 11 K-9','9/11 rescue dogs','World Trade Center search dogs','Ground Zero rescue dogs','search-and-rescue dogs','SAR dogs','K-9','K9','working dogs','working K-9','police dogs','police K-9','police service animal','veterinary disaster response','Veterinary Medical Assistance Team','VMAT','K-9 Saxon','Saxon Award','Oxyglobin','HBOC','hemoglobin-based oxygen carrier','BHOC','Biological Hemoglobin Oxygen Carrier','veterinary real-world evidence','working-dog trauma','veterinary emergency medicine','veterinary critical care','oxygen delivery','Fresno Police Department','Jerry Dyer','Roger Gfeller','United States'
  ]
};
const kakarikiStory={
  id:'kakariki-karaka-nelson-recovery-2026',
  date:'2026-09-17',
  dateLabel:'17 Sep 2026',
  region:'New Zealand · Nelson',
  category:'Critically endangered species · Recovery milestone',
  title:'Kākāriki karaka recovery reaches a new scale in Nelson.',
  text:'New Zealand’s Department of Conservation reports that a joint annual survey counted more than 285 kākāriki karaka/orange-fronted parakeets at Brook Waimārama Sanctuary on one survey day and 229 on the next, almost 100 more than last year. The critically endangered species has around 450 birds remaining overall, and the sanctuary now supports the world’s largest population. The birds were first introduced there in 2021, making the new count a measurable recovery outcome rather than a simple release milestone.',
  why:'Top-tier recovery outcome: reintroduction → sustained breeding → major population growth → world’s largest secure population.',
  image:{
    url:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Cyanoramphus_malherbi.jpg?width=900',
    alt:'Kākāriki karaka or orange-fronted parakeet, a critically endangered New Zealand species whose Nelson sanctuary population has grown strongly',
    width:800,
    height:600
  },
  credit:{
    label:'Photo: Jon Sullivan / Wikimedia Commons · CC BY 2.0',
    href:'https://commons.wikimedia.org/wiki/File:Cyanoramphus_malherbi.jpg'
  },
  sourceName:'New Zealand Department of Conservation · Brook Waimārama Sanctuary · Kākāriki Karaka Recovery Programme',
  link:{
    label:'Read primary source',
    href:'https://www.doc.govt.nz/news/media-releases/2026-media-releases/new-zealands-rarest-parakeet-numbers-soar-in-nelson/'
  },
  keywords:[
    'kākāriki karaka','orange-fronted parakeet','Cyanoramphus malherbi','critically endangered species','species recovery','reintroduction','Brook Waimārama Sanctuary','Kākāriki Karaka Recovery Programme','New Zealand Department of Conservation','Te Rūnanga o Ngāi Tahu','Nelson','New Zealand'
  ]
};
const istanbulOxyglobinStory={
  id:'istanbul-university-oxyglobin-fluid-therapy-textbook',
  date:'2026-09-26',
  dateLabel:'26 Sep 2026',
  region:'Türkiye · Istanbul',
  category:'Historical veterinary education · HBOC · Oxyglobin',
  title:'From research to the veterinary textbook: Oxyglobin and HBOCs in fluid therapy.',
  text:'Sıvı Sağaltımı [Fluid Therapy] by Prof. Dr. Tarık Bilal includes a dedicated section on hemoglobin-based oxygen carriers (HBOCs), discussing Oxyglobin in veterinary fluid therapy, including anemia, acute intravascular volume loss and hemorrhagic shock. Its inclusion in a university veterinary textbook is a useful historical marker: oxygen-carrier technology had moved beyond experimental literature into formal veterinary education.',
  why:'Volume replacement ≠ oxygen transport. Restoring circulating volume and restoring oxygen-carrying capacity are different therapeutic functions. The textbook also reports strong quantitative comparisons with blood; BHOC Veterinary has flagged those statements for primary-source verification before treating them as efficacy evidence.',
  image:{
    url:'assets/news/istanbul-university-oxyglobin-hboc-veterinary-fluid-therapy.webp',
    alt:'Main gate of Istanbul University, illustrating historical veterinary education on Oxyglobin and hemoglobin-based oxygen carriers in fluid therapy.',
    width:900,
    height:600
  },
  credit:{label:'Photo: Istanbul University · official university source',href:'https://kalite.istanbul.edu.tr/tr/haber/universitemiz-2021-yili-qs-alan-bazli-dunya-universiteleri-siralamasinda-basaris-2D006F00690059004D002D005200580069007700500039007900700046006200610041004F003200370077003200'},
  sourceName:'Istanbul University · Sıvı Sağaltımı [Fluid Therapy] · Prof. Dr. Tarık Bilal',
  link:{label:'Read the BHOC VET evidence note',href:'https://archiljali.github.io/BHOC-VET-platform/related-evidence.html#bilal-fluid-therapy-oxyglobin'},
  contextLink:{label:'University digital copy',href:'https://nek.istanbul.edu.tr/ekos/KITAP/2011-19495.pdf'},
  keywords:['Oxyglobin','HBOC','hemoglobin-based oxygen carrier','veterinary fluid therapy','veterinary oxygen transport','hemorrhagic shock','veterinary anemia','Istanbul University','Tarık Bilal','oxygen-carrying capacity','BHOC Veterinary','Precision Oxygen Therapeutics']
};
const enrichPage=page=>({...page,stories:[istanbulOxyglobinStory,kakarikiStory,...page.stories.map(story=>story.id==='k9-saxon-oxyglobin-2002'?{...story,...saxonFeature,image:saxonVisual,credit:null}:story)].sort((a,b)=>b.date.localeCompare(a.date))});

const itemListSchema=page=>safeJSON({
  '@context':'https://schema.org',
  '@type':'ItemList',
  '@id':canonicalNewsURL+'#news-feed',
  name:page.heading,
  url:canonicalNewsURL,
  numberOfItems:page.stories.length,
  itemListOrder:'https://schema.org/ItemListOrderDescending',
  itemListElement:page.stories.map((story,index)=>({
    '@type':'ListItem',
    position:index+1,
    item:{
      '@type':'WebPageElement',
      '@id':canonicalNewsURL+'#'+story.id,
      url:canonicalNewsURL+'#'+story.id,
      name:story.title,
      description:story.text,
      datePublished:story.date,
      inLanguage:'en',
      ...(story.image?{image:{
        '@type':'ImageObject',
        url:absoluteURL(story.image.url),
        caption:story.image.alt,
        ...(story.image.width?{width:story.image.width}:{}),
        ...(story.image.height?{height:story.image.height}:{})
      }}:{}),
      citation:story.contextLink?[story.link.href,story.contextLink.href]:story.link.href,
      keywords:(story.keywords||[]).join(', '),
      about:(story.keywords||[]).map(name=>({'@type':'Thing',name}))
    }
  }))
});

const contextLinkHTML=item=>`<a class="seo-context-link" ${attrs(item)}>${esc(item.label)} ${icon('arrow')}</a>`;
const storyMedia=story=>story.image?`<figure class="story-media${story.image.variant==='logo'?' story-media-logo':story.image.variant==='portrait'?' story-media-portrait':story.image.variant==='document'?' story-media-document':''}"><img src="${esc(story.image.url)}" alt="${esc(story.image.alt)}" width="${story.image.width||900}" height="${story.image.height||600}" loading="lazy" decoding="async">${story.credit?`<a class="story-credit" ${attrs(story.credit)}>${esc(story.credit.label)}</a>`:''}</figure>`:'';

const storyHTML=(story,index)=>`<article class="conservation-story${index===0?' conservation-story-featured':''}${story.image?'':' conservation-story-no-media'}${story.image?.variant==='document'?' conservation-story-document':''}" id="${esc(story.id)}">
  ${storyMedia(story)}
  <div class="story-copy">
    <div class="story-meta">${index===0?'<span class="story-latest">Latest</span>':''}<time datetime="${esc(story.date)}">${esc(story.dateLabel)}</time><span>${esc(story.region)}</span><span>${esc(story.category)}</span></div>
    <h3>${esc(story.title)}</h3>
    <p>${esc(story.text)}</p>
    <div class="story-why"><strong>Why it matters</strong><span>${esc(story.why)}</span></div>
    <div class="story-footer"><a class="story-link" ${attrs(story.link)}>${esc(story.link.label)} <span aria-hidden="true">${story.link.href.startsWith('https://')?'↗':'→'}</span></a>${story.contextLink?`<a class="story-source-link" ${attrs(story.contextLink)}>${esc(story.contextLink.label)} <span aria-hidden="true">${story.contextLink.href.startsWith('https://')?'↗':'→'}</span></a>`:''}</div>
  </div>
</article>`;

export default rawPage=>{const page=enrichPage(rawPage);return `<style>
.news-page .page-hero{display:block;padding:24px var(--gutter) 20px;min-height:0}
.news-page .page-hero::after{opacity:.3;transform:scale(.68);transform-origin:top right}
.news-page .page-hero>div{display:block;max-width:1160px;margin:0 auto;white-space:normal}
.news-page .page-hero .page-eyebrow{display:block;margin:0 0 7px;font-size:12px;letter-spacing:.085em}
.news-page .page-hero h1{display:block;max-width:980px;margin:0;font-size:clamp(34px,4.1vw,58px);line-height:1;letter-spacing:-1.2px;white-space:normal}
.news-page .page-hero p{display:block;max-width:790px;margin:12px 0 0;font-size:15px;line-height:1.55;color:var(--muted);white-space:normal}
.intelligence-section{padding-top:20px!important;padding-bottom:32px!important}
.intelligence-inner{width:min(calc(100% - (2 * var(--gutter))),1160px);margin:0 auto}
.intelligence-head{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--line)}
.intelligence-status{color:var(--muted);font-size:12px;line-height:1.4;letter-spacing:.045em;text-transform:uppercase}.intelligence-status strong{color:var(--ink);font-size:13px;margin-right:8px}.scroll-cue{margin-left:9px;color:var(--accent-strong);font-weight:800}
.seo-context{display:grid;grid-template-columns:minmax(150px,190px) minmax(0,1fr) auto;align-items:start;gap:20px;margin:20px 0 0;padding:20px 22px;border:1px solid #d9e4de;border-radius:15px;background:#f5f8f5}.seo-context .page-eyebrow{margin-top:3px;font-size:12px}.seo-context-copy h2{margin:0 0 7px;font-size:20px;line-height:1.18;letter-spacing:-.2px;color:var(--ink)}.seo-context-copy p{margin:0;max-width:710px;color:var(--muted);font-size:13px;line-height:1.55}.seo-context-links{display:grid;justify-items:start;gap:7px;min-width:190px}.seo-context-link{display:inline-flex;align-items:center;gap:5px;color:var(--teal);font-size:13px;font-weight:800;text-decoration:none}.seo-context-link svg{width:14px;height:14px}.seo-context-link:hover{text-decoration:underline}
.feed-window{position:relative;background:transparent}
.conservation-feed{display:grid;gap:22px;height:auto;min-height:0;overflow:visible}
.conservation-story{display:grid;grid-template-columns:minmax(250px,31%) minmax(0,1fr);background:#fff;border:1px solid var(--line);border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(16,47,73,.06)}
.conservation-story-featured{grid-template-columns:minmax(250px,31%) minmax(0,1fr);border-color:#d9c1b1;box-shadow:0 16px 42px rgba(16,47,73,.09)}
.conservation-story-document,.conservation-story-featured.conservation-story-document{grid-template-columns:minmax(250px,31%) minmax(0,1fr);border-color:#d9c1b1}
.conservation-story-no-media,.conservation-story-featured.conservation-story-no-media{grid-template-columns:1fr;border-left:6px solid var(--accent)}.conservation-story-no-media .story-copy{max-width:920px;padding:36px 38px}.conservation-story-no-media .story-copy h3{max-width:850px}
.story-media{position:relative;display:block;min-height:260px;overflow:hidden;background:#edf2ef;margin:0}.story-media img{width:100%;height:100%;min-height:260px;object-fit:contain;display:block;transition:none}.conservation-story-featured .story-media,.conservation-story-featured .story-media img{min-height:260px}.conservation-story:hover .story-media img{transform:none}
.story-media-logo{display:flex;align-items:center;justify-content:center;padding:38px;background:#fff}.story-media-logo img{width:100%;height:auto;min-height:0;max-height:180px;object-fit:contain!important;transform:none!important}.conservation-story:hover .story-media-logo img{transform:none}
.story-media-portrait{display:flex;align-items:center;justify-content:center;padding:32px;background:#fff7ef}.story-media-portrait img,.conservation-story-featured .story-media-portrait img{width:auto;height:auto;min-height:0;max-width:100%;max-height:330px;object-fit:contain;box-shadow:0 10px 28px rgba(16,47,73,.14)}.conservation-story:hover .story-media-portrait img{transform:none}
.story-media-document,.conservation-story-featured .story-media-document{display:block;min-height:0;background:#f5a915}.story-media-document img,.conservation-story-featured .story-media-document img{display:block;width:100%;height:auto;min-height:0;max-height:none;aspect-ratio:auto;object-fit:contain;transform:none!important}.conservation-story-document .story-copy{padding:28px 32px 32px}.conservation-story:hover .story-media-document img{transform:none}
#wodan-penn-vet-oxyglobin-k19 .story-media-document{width:min(calc(100% - 32px),210px);justify-self:center;margin:22px auto 0;border-radius:8px;overflow:hidden;background:#f6f4f1}
#wodan-penn-vet-oxyglobin-k19 .story-media-document img,#wodan-penn-vet-oxyglobin-k19.conservation-story-featured .story-media-document img{display:block;width:100%;height:auto;min-height:0;max-height:none;aspect-ratio:auto;object-fit:contain}
#wodan-penn-vet-oxyglobin-k19 .story-credit{left:6px;right:6px;bottom:6px;max-width:none;padding:4px 5px;font-size:9px}
.story-credit{position:absolute;left:10px;bottom:10px;max-width:calc(100% - 20px);padding:5px 7px;border-radius:5px;background:rgba(7,31,38,.76);color:#fff;font-size:11px;line-height:1.2;text-decoration:none}
.story-copy{padding:28px 30px;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;min-width:0}
.story-meta{display:flex;flex-wrap:wrap;align-items:center;gap:6px 13px;margin-bottom:12px;color:#617173;font-size:12px;font-weight:750;line-height:1.35;letter-spacing:.055em;text-transform:uppercase}.story-meta time{color:#a9470d}.story-latest{padding:4px 8px;border-radius:999px;background:var(--accent);color:#fff;font-size:12px;letter-spacing:.07em}
.story-copy h3{margin:0 0 12px;font-size:clamp(23px,2vw,29px);line-height:1.16;letter-spacing:-.35px;color:var(--ink)}.conservation-story-featured .story-copy h3{font-size:clamp(28px,2.7vw,38px);line-height:1.09}
.story-copy>p{margin:0;color:var(--muted);font-size:16px;line-height:1.6}
.story-why{display:grid;gap:2px;width:100%;margin-top:18px;padding:12px 14px;border-left:3px solid #4e8b70;background:#f5f8f5;color:#596966;font-size:13px;line-height:1.45}.story-why strong{color:#315d4b;font-size:12px;letter-spacing:.07em;text-transform:uppercase}.story-why span{display:block}
.story-footer{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:20px}.story-link{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:44px;padding:11px 18px;border:1px solid var(--accent);border-radius:999px;background:var(--accent);color:#fff;font-size:14px;font-weight:800;line-height:1.25;text-decoration:none}.story-link:hover{border-color:var(--accent-strong);background:var(--accent-strong);text-decoration:none}.story-source-link{display:inline-flex;align-items:center;gap:6px;color:var(--teal);font-size:12px;font-weight:800;text-decoration:none}.story-source-link:hover{text-decoration:underline}
.intelligence-note{margin:20px 0 0;padding:13px 15px;border-left:3px solid #4e8b70;background:#f5f8f5;color:var(--muted);font-size:12px;line-height:1.55}
.channels-compact{margin-top:8px;padding-top:26px!important;border-top:1px solid var(--line)}.channels-compact .section-heading{margin-bottom:18px}.channels-compact .news-grid{gap:14px}.channels-compact .news-card{padding:20px;min-height:0}.channels-compact .news-card p{font-size:13px}.channels-compact .news-card .text-link{padding-top:14px}
@media(max-width:920px){.seo-context{grid-template-columns:145px minmax(0,1fr)}.seo-context-links{grid-column:2;display:flex;flex-wrap:wrap;column-gap:18px}.conservation-story,.conservation-story-featured,.conservation-story-document,.conservation-story-featured.conservation-story-document{grid-template-columns:minmax(225px,35%) minmax(0,1fr)}.conservation-story-no-media,.conservation-story-featured.conservation-story-no-media{grid-template-columns:1fr}.conservation-story-featured .story-media,.conservation-story-featured .story-media img{min-height:260px}.conservation-story-featured .story-media-portrait img{min-height:0}.conservation-story-featured .story-media-document,.conservation-story-featured .story-media-document img{min-height:0}.story-copy{padding:24px}.conservation-story-featured .story-copy h3{font-size:30px}}
@media(max-width:700px){.news-page .page-hero{padding:18px var(--gutter) 15px}.news-page .page-hero h1{font-size:clamp(29px,9vw,39px)}.news-page .page-hero p{margin-top:9px;font-size:14px;line-height:1.48}.intelligence-inner{width:min(calc(100% - 28px),1160px)}.intelligence-head{align-items:flex-start;margin-bottom:12px}.intelligence-status{font-size:12px}.intelligence-status strong,.scroll-cue{display:block;margin:0}.scroll-cue{margin-top:3px}.seo-context{display:block;margin-top:16px;padding:17px}.seo-context .page-eyebrow{display:block;margin:0 0 7px}.seo-context-copy h2{font-size:18px}.seo-context-copy p{font-size:13px}.seo-context-links{display:grid;margin-top:12px}.conservation-feed{gap:16px}.conservation-story,.conservation-story-featured{grid-template-columns:1fr;border-radius:15px}.conservation-story-no-media .story-copy{padding:25px 20px}.story-media,.story-media img,.conservation-story-featured .story-media,.conservation-story-featured .story-media img{min-height:0;aspect-ratio:16/9}.story-media-document,.story-media-document img,.conservation-story-featured .story-media-document,.conservation-story-featured .story-media-document img{min-height:0;aspect-ratio:auto}.story-media-portrait{min-height:260px;aspect-ratio:auto;padding:26px}.story-media-portrait img,.conservation-story-featured .story-media-portrait img{aspect-ratio:auto;max-height:250px}.story-media-logo{min-height:190px;aspect-ratio:auto;padding:34px}.story-media-logo img{aspect-ratio:auto!important;max-height:120px}.story-copy,.conservation-story-document .story-copy{padding:21px 20px 23px}.story-meta{gap:5px 9px;margin-bottom:10px;font-size:12px}.story-copy h3,.conservation-story-featured .story-copy h3{font-size:24px;line-height:1.14}.story-copy>p{font-size:16px;line-height:1.58}.story-why{margin-top:15px;font-size:13px}.story-footer{width:100%;margin-top:17px}.story-link{width:100%;font-size:14px}.story-source-link{width:100%;justify-content:center;font-size:12px}.story-credit{font-size:10px}.intelligence-note{font-size:12px}.channels-compact .news-grid{grid-template-columns:1fr}}
</style>
<main id="main" class="subpage-main news-page">
  <section class="page-hero" aria-labelledby="news-page-heading"><div><span class="page-eyebrow">${esc(page.eyebrow)}</span><h1 id="news-page-heading">${esc(page.heading)}</h1><p>${esc(page.lead)}</p></div></section>
  <section class="page-section intelligence-section" aria-label="Wildlife and species conservation news"><div class="intelligence-inner">
    <div class="intelligence-head"><div class="intelligence-status"><strong>Updated ${esc(page.updated)}</strong>Global · newest first<span class="scroll-cue">Scroll news ↓</span></div></div>
    <div class="feed-window"><div class="conservation-feed">${page.stories.map(storyHTML).join('')}</div></div>
    <p class="intelligence-note"><strong>BHOC Initiative Scout method:</strong> ${esc(page.feedNote)}</p>
    <aside class="seo-context" aria-labelledby="seo-context-heading"><span class="page-eyebrow">${esc(page.seoContext.eyebrow)}</span><div class="seo-context-copy"><h2 id="seo-context-heading">${esc(page.seoContext.heading)}</h2><p>${esc(page.seoContext.text)}</p></div><nav class="seo-context-links" aria-label="BHOC evidence links">${page.seoContext.links.map(contextLinkHTML).join('')}</nav></aside>
  </div></section>
  <section class="page-section channels-compact" aria-labelledby="news-channels-heading"><div class="section-heading"><span class="page-eyebrow">BHOC channels</span><h2 id="news-channels-heading">Evidence and professional discussion.</h2></div><div class="news-grid">${page.channels.map(channel=>`<article class="news-card"><span class="news-icon">${icon(channel.icon)}</span><h3>${esc(channel.title)}</h3><p>${esc(channel.text)}</p><a class="text-link" ${attrs(channel.link)}>${esc(channel.link.label)} ${icon('arrow')}</a></article>`).join('')}</div></section>
</main><script type="application/ld+json">${itemListSchema(page)}</script>`;};
