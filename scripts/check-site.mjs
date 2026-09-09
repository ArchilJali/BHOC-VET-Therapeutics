import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out=path.resolve(root,process.argv[2]||'dist');
const expectedPages=[
  'index.html',
  'product.html',
  'applications.html',
  'evidence.html',
  'science.html',
  'initiative.html',
  'related-information.html',
  'news.html',
  'contact.html'
];
const htmlByPage=new Map(await Promise.all(expectedPages.map(async name=>[name,await fs.readFile(path.join(out,name),'utf8')])));
const titles=new Set();
const descriptions=new Set();
const expectedSchemaTypes={
  'index.html':'WebPage',
  'product.html':'WebPage',
  'applications.html':'WebPage',
  'evidence.html':'CollectionPage',
  'science.html':'WebPage',
  'initiative.html':'WebPage',
  'related-information.html':'CollectionPage',
  'news.html':'CollectionPage',
  'contact.html':'ContactPage'
};

for(const [name,html] of htmlByPage){
  assert.equal((html.match(/<h1\b/g)||[]).length,1,`${name}: exactly one H1`);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${name}: no duplicate IDs`);

  for(const m of html.matchAll(/<img\b[^>]*>/g)){
    assert.match(m[0],/\balt="/,`${name}: image needs ALT`);
    assert.match(m[0],/\bwidth="\d+"/,`${name}: image needs width`);
    assert.match(m[0],/\bheight="\d+"/,`${name}: image needs height`);
    const alt=m[0].match(/\balt="([^"]*)"/)?.[1]??'';
    assert.ok(alt.length<=220,`${name}: ALT remains concise`);
  }

  for(const m of html.matchAll(/(?:src|href)="\.\/([^"?#]+)[^"]*"/g))await fs.access(path.join(out,m[1]));

  const structured=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const graph=structured['@graph'];
  const website=graph.find(x=>x['@type']==='WebSite');
  const person=graph.find(x=>x['@type']==='Person');
  const organization=graph.find(x=>x['@type']==='Organization');
  const webPage=graph.find(x=>x['@type']===expectedSchemaTypes[name]);
  assert.equal(website.name,'BHOC Veterinary',`${name}: website identity`);
  assert.deepEqual(website.alternateName,['BHOC Vet','BHOC Veterinary Therapeutics'],`${name}: alternate names in preferred order`);
  assert.equal(person.name,'Archil Jaliashvili',`${name}: author identity`);
  assert.equal(person.jobTitle,'Project Lead, BHOC Veterinary',`${name}: author role`);
  assert.equal(organization.logo['@type'],'ImageObject',`${name}: organization logo object`);
  assert.ok(organization.logo.width>=112&&organization.logo.height>=112,`${name}: organization logo dimensions`);
  assert.equal(organization.email,'info@bhoctherapeutics.com',`${name}: organization contact`);
  assert.ok(webPage,`${name}: correct page schema type`);
  assert.equal(webPage.author['@id'],'https://bhocvet.com/#archil-jaliashvili',`${name}: page author identity`);
  assert.ok(webPage.keywords.split(', ').length>=9,`${name}: semantic topic coverage`);
  assert.ok(webPage.about.length>=9,`${name}: page topics`);

  const canonical=name==='index.html'?'https://bhocvet.com/':`https://bhocvet.com/${name}`;
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`),`${name}: canonical`);
  const title=html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description=html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title&&description,`${name}: title and description`);
  assert.ok(title.length>=20&&title.length<=70,`${name}: concise title quality gate`);
  assert.ok(description.length>=90&&description.length<=180,`${name}: useful description quality gate`);
  assert.ok(!titles.has(title),`${name}: unique title`); titles.add(title);
  assert.ok(!descriptions.has(description),`${name}: unique description`); descriptions.add(description);
  assert.match(html,/<meta name="author" content="Archil Jaliashvili">/,`${name}: author metadata`);
  assert.match(html,/property="og:image" content="https:\/\/bhocvet\.com\/assets\/bhoc-initiative-land-social\.jpg"/,`${name}: share image`);
  assert.match(html,/property="og:image:type" content="image\/jpeg"/,`${name}: share image MIME type`);
  assert.match(html,/name="twitter:card" content="summary_large_image"/,`${name}: large social card`);
  assert.doesNotMatch(html,/<meta name="keywords"/,`${name}: no obsolete keyword meta tag`);
  assert.doesNotMatch(html,/https?:\/\/localhost|http:\/\/[^"<\s]*(?:\.css|\.js|\.webp)/,`${name}: no development URLs`);

  const network=html.match(/<nav class="site-network-bar"[\s\S]*?<\/nav>/)?.[0]||'';
  assert.equal((network.match(/class="network-link network-link-enabled"/g)||[]).length,1,`${name}: one active sister-site link`);
  assert.equal((network.match(/class="network-link network-link-disabled"/g)||[]).length,1,`${name}: one future sister-site label`);
  assert.match(network,/href="https:\/\/www\.bhoctherapeutics\.com\/"[^>]*>[\s\S]*www\.bhoctherapeutics\.com/,`${name}: corporate link`);
  assert.match(network,/aria-disabled="true"[^>]*>[\s\S]*www\.bhoctransplant\.com/,`${name}: transplant site remains inactive`);
  assert.doesNotMatch(network,/href="[^"]*bhoctransplant/,`${name}: inactive transplant label is not linked`);

  const footer=html.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0]||'';
  assert.match(footer,/class="footer-bhoc">BH<span class="oxygen-initial">O<\/span>C<\/span>/,`${name}: exact BHOC footer wordmark`);
  assert.equal((footer.match(/class="footer-column"/g)||[]).length,5,`${name}: compact footer directory`);
  for(const heading of ['Product','Application','Evidence &amp; Science','Initiative','Information'])assert.ok(footer.includes(`<h2>${heading}</h2>`),`${name}: footer group ${heading}`);
  assert.equal((footer.match(/class="footer-link"/g)||[]).length,2,`${name}: two distinct external footer actions`);
  assert.match(footer,/href="https:\/\/archiljali\.github\.io\/BHOC-platform\/veterinary\/Vet-index\.html"[^>]*>.*VET Evidence Platform/s,`${name}: footer evidence route`);
  assert.match(footer,/href="https:\/\/www\.linkedin\.com\/company\/bhoc-therapeutics\/"[^>]*>.*LinkedIn/s,`${name}: footer LinkedIn route`);
  const footerHrefs=[...footer.matchAll(/href="([^"]+)"/g)].map(match=>match[1]);
  assert.equal(new Set(footerHrefs).size,footerHrefs.length,`${name}: footer destinations are not duplicated`);
  assert.match(footer,/Project lead: <strong>BHOC Team<\/strong>\./,`${name}: team footer attribution`);
  assert.match(footer,/First published <time datetime="2026-09-07">07 Sep 2026<\/time>.*17 updates.*Last updated <time datetime="2026-09-09">09 Sep 2026<\/time>.*Version 26\.09\.09/,`${name}: publication history`);
  assert.match(footer,/href="\.\/initiative\/">BHOC Initiative<\/a>/,`${name}: full Initiative route`);
  assert.match(footer,/href="initiative\.html">Initiative overview<\/a>/,`${name}: legacy Initiative overview remains linked`);
}

const initiativeHomePath=path.join(out,'initiative','index.html');
const initiativeHome=await fs.readFile(initiativeHomePath,'utf8');
const initiativeCSS=await fs.readFile(path.join(out,'initiative','styles.css'),'utf8');
const initiativeJS=await fs.readFile(path.join(out,'initiative','app.js'),'utf8');
assert.equal((initiativeHome.match(/<h1\b/g)||[]).length,1,'initiative/index.html: exactly one H1');
const initiativeBlockNames=[...initiativeHome.matchAll(/<!-- BLOCK ([a-z-]+): content\/initiative\/blocks\/[a-z-]+\.json -->/g)].map(match=>match[1]);
assert.deepEqual(initiativeBlockNames,['hero','stats','mission-panel','focus','science-bridge'],'initiative/index.html: approved modular block order');
for(const blockName of initiativeBlockNames)assert.match(initiativeHome,new RegExp('data-block="'+blockName+'"'),'initiative/index.html: block marker '+blockName);
assert.match(initiativeHome,/rel="canonical" href="https:\/\/bhocvet\.com\/initiative\/"/);
assert.match(initiativeHome,/property="og:image" content="https:\/\/bhocvet\.com\/assets\/initiative\/challenge-african-elephant-usfws\.webp"/);
assert.match(initiativeHome,/property="og:image:secure_url" content="https:\/\/bhocvet\.com\/assets\/initiative\/challenge-african-elephant-usfws\.webp"/);
assert.match(initiativeHome,/property="og:image:type" content="image\/webp"/);
assert.match(initiativeHome,/name="twitter:card" content="summary_large_image"/);
assert.match(initiativeHome,/<meta name="theme-color" content="#071713">/);
assert.match(initiativeHome,/src="\.\.\/assets\/reference-initiative-mark\.webp"/);
const initiativeSchema=JSON.parse(initiativeHome.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
const initiativeOrganization=initiativeSchema['@graph'].find(item=>item['@type']==='Organization');
const initiativeWebPage=initiativeSchema['@graph'].find(item=>item['@type']==='WebPage');
assert.equal(initiativeOrganization.logo['@type'],'ImageObject','initiative SEO uses the canonical logo as an ImageObject');
assert.equal(initiativeOrganization.logo.contentUrl,'https://bhocvet.com/assets/reference-initiative-mark.webp','initiative SEO keeps the canonical BHOC Initiative logo');
assert.equal(initiativeOrganization.logo.width,318,'initiative logo schema preserves source width');
assert.equal(initiativeOrganization.logo.height,317,'initiative logo schema preserves source height');
assert.equal(initiativeWebPage.publisher['@id'],'https://bhocvet.com/initiative/#initiative','initiative page schema identifies its publisher');
assert.equal(initiativeWebPage.inLanguage,'en','initiative page schema identifies its language');
assert.deepEqual(initiativeWebPage.significantLink,[
  'https://bhocvet.com/',
  'https://bhoctherapeutics.com/',
  'https://archiljali.github.io/BHOC-platform/veterinary/Vet-index.html'
],'initiative page schema identifies the three primary BHOC visitor routes');
const initiativeHeaderHTML=initiativeHome.match(/<header class="site-header"[\s\S]*?<\/header>/)?.[0]||'';
assert.equal((initiativeHeaderHTML.match(/<img\b/g)||[]).length,1,'initiative header uses one canonical logo');
assert.match(initiativeHeaderHTML,/class="initiative-brand-copy">[\s\S]*<strong>BHOC Species &amp; Biodiversity<br>Protection Initiative<\/strong>/,'initiative header retains the canonical BHOC Initiative identity');
assert.match(initiativeHeaderHTML,/class="initiative-return-link" href="\.\.\/index\.html" aria-label="Return to the BHOC Veterinary website">[\s\S]*Back to BHOC Veterinary<\/a>/,'initiative header includes an explicit BHOC Veterinary return bar');
assert.doesNotMatch(initiativeHeaderHTML,/href="\.\.\/index\.html">Home<\/a>/,'initiative navigation does not duplicate the return link');
assert.match(initiativeHeaderHTML,/class="header-action"[^>]*>Support the Initiative/,'initiative header retains the support action');
assert.equal((initiativeHome.match(/class="hero-photo hero-photo-/g)||[]).length,6,'hero uses six independently editable real photographs');
assert.equal((initiativeHome.match(/class="hero-dot/g)||[]).length,3,'hero renders three requested slide controls');
assert.equal((initiativeHome.match(/class="hero-dot[^>]*disabled aria-disabled="true"/g)||[]).length,2,'two future hero slots remain visibly reserved and disabled');
assert.equal((initiativeHome.match(/class="hero-principle"/g)||[]).length,4,'hero renders four initiative principles');
assert.match(initiativeJS,/data-hero-target/,'initiative hero controls are wired for future slides');
assert.match(initiativeJS,/touchstart/,'initiative hero supports touch navigation when more slides are added');
assert.doesNotMatch(initiativeHome,/hero-red-list-pencil/,'initiative hero no longer uses the previous flattened illustration');
assert.doesNotMatch(initiativeHome,/data-block="oxygen-platform"/,'removed Initiative oxygen cascade stays absent');
assert.doesNotMatch(initiativeHome,/class="evidence-boundary"/,'removed Initiative evidence boundary stays absent');
assert.doesNotMatch(initiativeHome,/microcirculation\.webp/,'initiative no longer renders the low-resolution microcirculation banner');
const initiativeFocusHTML=initiativeHome.match(/<section class="focus[\s\S]*?<\/section>/)?.[0]||'';
assert.equal((initiativeFocusHTML.match(/class="focus-card"/g)||[]).length,7,'initiative/index.html: seven independently editable focus cards');
assert.equal((initiativeFocusHTML.match(/class="photo-credit"/g)||[]).length,7,'initiative/index.html: every sourced wildlife photograph has a visible credit');
assert.equal((initiativeFocusHTML.match(/src="\.\.\/assets\/initiative\/focus-[a-z-]+\.webp"/g)||[]).length,7,'initiative/index.html: seven local optimized photographs');
assert.match(initiativeHome,/alt="Hawksbill sea turtle in a remote marine conservation setting"/);
assert.match(initiativeHome,/src="\.\.\/assets\/initiative\/science-gray-wolf-usfws\.webp"/);
assert.match(initiativeHome,/src="\.\.\/assets\/initiative\/bhoc-vs-rbc-400x-comparison\.webp"/);
assert.match(initiativeHome,/alt="Concept illustration comparing a red blood cell and a BHOC molecule, with BHOC shown as more than 400 times smaller"/);
assert.doesNotMatch(initiativeHome,/src="\.\.\/assets\/initiative\/bhoc-carrier-concept\.webp"/);
assert.match(initiativeHome,/Compatible with all blood types for all species\./);
assert.match(initiativeHome,/3\+ year shelf life at room temperature\./);
assert.match(initiativeHome,/A world worth protecting[\s\S]*class="stats-quotation"[\s\S]*We be of one blood, ye and I\.[\s\S]*Rudyard Kipling[\s\S]*The Jungle Book/,'Kipling quotation appears directly beneath the world-worth-protecting heading');
assert.equal((initiativeHome.match(/class="science-related-links"/g)||[]).length,1,'science bridge renders one related-links directory');
assert.equal((initiativeHome.match(/class="science-related-links"[\s\S]*?<\/nav>/)?.[0].match(/<a\b/g)||[]).length,3,'science bridge renders three primary BHOC routes');
assert.match(initiativeHome,/class="science-related-links"[\s\S]*href="\.\.\/index\.html"[\s\S]*BHOC Veterinary/);
assert.match(initiativeHome,/class="science-related-links"[\s\S]*href="https:\/\/bhoctherapeutics\.com\/"[\s\S]*BHOC Therapeutics/);
assert.match(initiativeHome,/class="science-related-links"[\s\S]*href="https:\/\/archiljali\.github\.io\/BHOC-platform\/veterinary\/Vet-index\.html"[\s\S]*VET Evidence Library/);
assert.match(initiativeCSS,/\.focus-grid\s*\{[^}]*grid-template-columns:\s*repeat\(7,/s,'initiative desktop focus grid follows the seven-card reference');
assert.match(initiativeCSS,/--emerald:\s*#16a05d;/,'initiative palette includes one vivid conservation accent');
assert.match(initiativeCSS,/--oxygen:\s*#1cb5ab;/,'initiative palette reserves teal for oxygen science');
assert.match(initiativeCSS,/--red:\s*#8e251f;/,'initiative palette reserves red for the blood comparison');
assert.match(initiativeHome,/A world worth protecting/);
assert.match(initiativeHome,/Endangered Species\.<br>Real Solutions\./);
assert.match(initiativeHome,/Every species is different\.<br>The need for oxygen is universal\./);
assert.equal((initiativeHome.match(/class="science-claim-graphic"/g)||[]).length,1,'science bridge renders the complete supplied BHOC versus RBC comparison once');
const initiativeFooterHTML=initiativeHome.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0]||'';
assert.equal((initiativeFooterHTML.match(/class="footer-group"/g)||[]).length,4,'initiative footer has four dedicated navigation groups');
for(const heading of ['Initiative','Conservation','BHOC Network','Connect'])assert.match(initiativeFooterHTML,new RegExp('<h2>'+heading.replace('&','&amp;')+'<\\/h2>'),'initiative footer group '+heading);
assert.match(initiativeFooterHTML,/class="shell protected-content"[^>]*>[\s\S]*Protected content notice/,'initiative footer includes the requested rights warning');
assert.match(initiativeFooterHTML,/may not be copied, scraped, reproduced, adapted, redistributed or republished/,'initiative footer states the protected-content restrictions');
assert.match(initiativeFooterHTML,/Third-party photographs and source materials remain governed by the credits and licenses/,'initiative footer preserves third-party licensing accuracy');
assert.match(initiativeFooterHTML,/First published <time datetime="2026-09-09">09 Sep 2026<\/time>.*Last updated <time datetime="2026-09-09">09 Sep 2026<\/time>.*Version 26\.09\.09/,'initiative footer carries its publication history');
assert.match(initiativeHome,/href="\.\.\/news\.html">News &amp; Intelligence<\/a>/);
assert.match(initiativeHome,/href="\.\.\/applications\.html"/);
assert.match(initiativeHome,/href="\.\.\/index\.html">BHOC Veterinary<\/a>/);
assert.doesNotMatch(initiativeHome,/bhoc-species-initiative\.archil-jali\.chatgpt\.site/);
assert.doesNotMatch(initiativeHome,/hbo2therapeutics\.com\/our-product/i);
assert.doesNotMatch(initiativeHome,/href="\.\.\/(?:news|contact|applications|index)\.html"[^>]*target="_blank"/);
const initiativeIds=new Set([...initiativeHome.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]));
for(const match of initiativeHome.matchAll(/href="#([^"]+)"/g))assert.ok(initiativeIds.has(match[1]),`initiative/index.html: missing anchor #${match[1]}`);
for(const match of initiativeHome.matchAll(/<(?:img|script|link)\b[^>]*(?:src|href)="([^"]+)"/g)){
  const ref=match[1];
  if(/^(?:https:|mailto:|#)/.test(ref))continue;
  await fs.access(path.resolve(path.dirname(initiativeHomePath),ref.split(/[?#]/)[0]));
}
for(const match of initiativeHome.matchAll(/<a\b[^>]*href="([^"]+)"/g)){
  const ref=match[1];
  if(/^(?:https:|mailto:|#)/.test(ref))continue;
  const clean=ref.split(/[?#]/)[0];
  const target=clean.endsWith('/')?path.join(clean,'index.html'):clean;
  await fs.access(path.resolve(path.dirname(initiativeHomePath),target));
}
for(const match of initiativeHome.matchAll(/<img\b[^>]*>/g)){
  assert.match(match[0],/\balt="/,'initiative/index.html: image needs ALT');
  assert.match(match[0],/\bwidth="\d+"/,'initiative/index.html: image needs width');
  assert.match(match[0],/\bheight="\d+"/,'initiative/index.html: image needs height');
}

const home=htmlByPage.get('index.html');
assert.match(home,/<link rel="preload" as="image" href="\.\/assets\/bhoc-initiative-land-hero-v2\.webp" type="image\/webp" fetchpriority="high">/);
assert.match(home,/<img src="\.\/assets\/bhoc-initiative-land-hero-v2\.webp"[^>]*fetchpriority="high"/);
assert.equal((home.match(/data-hero-slide/g)||[]).length,3,`Three hero slides`);
assert.match(home,/data-slide-label="Land"[\s\S]*data-slide-label="Winter"[\s\S]*data-slide-label="Ocean"/,`Hero order is Land, Winter, Ocean`);
assert.match(home,/data-autoplay-ms="300000"/,`Hero rotates every five minutes`);
assert.equal((home.match(/data-hero-dot=/g)||[]).length,3,`Three hero selection dots`);
assert.match(home,/class="hero-control hero-prev"/);
assert.match(home,/class="hero-control hero-next"/);
assert.match(home,/natural manta ray, seal, walrus, dugong, whale shark/);
assert.match(home,/<div class="landscape" aria-hidden="true"><img [^>]*alt=""/,`Decorative landscape keeps an intentionally empty ALT`);
assert.match(home,/class="wordmark-expansion">Biological Hemoglobin Oxygen Carrier<\/span>/,`Header expands BHOC`);

const primaryNav=home.match(/<nav id="primary-nav"[\s\S]*?<\/nav>/)?.[0]||'';
const navItems=[...primaryNav.matchAll(/href="([^"]+)">([^<]+)<\/a>/g)].map(match=>[match[1],match[2]]);
assert.match(primaryNav,/^<nav[^>]*><a class="nav-initiative-entry" href="\.\/initiative\/">[\s\S]*<span>Species &amp; Biodiversity Protection<\/span><\/a>/,`Species and Biodiversity Protection is the first, distinct navigation entry`);
assert.equal((primaryNav.match(/class="nav-initiative-logo"/g)||[]).length,1,`Primary navigation uses one Initiative logo`);
for(const [href,label] of [
  ['product.html','Product'],
  ['applications.html','Application'],
  ['evidence.html','Evidence'],
  ['science.html','Science'],
  ['related-information.html','Related Information'],
  ['news.html','News']
])assert.match(primaryNav,new RegExp(`href="${href.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}"[^>]*>${label}<\\/a>`),`Primary navigation keeps ${label}`);

assert.match(home,/<h1 id="home-heading">Precision Oxygen Therapeutics<\/h1>/);
assert.equal((home.match(/class="hero-hotspot" href="\.\/initiative\/"[^>]*aria-label="Explore species"/g)||[]).length,2,`Winter and Ocean hero links open the BHOC Initiative`);
assert.doesNotMatch(home,/hero-initiative-brand/,`Hero slides keep their original artwork without an added logo overlay`);
assert.match(home,/class="block-biodiversity"[\s\S]*?href="\.\/initiative\/"/);
assert.match(home,/href="\.\/initiative\/#focus"[\s\S]*?Species preservation/);
assert.match(home,/BH<span class="oxygen-initial">O<\/span>C/);
for(const word of ['Biological','Hemoglobin','Oxygen','Carrier'])assert.match(home,new RegExp(`<strong>${word[0]}</strong>${word.slice(1)}`),`BHOC initials are emphasized`);
assert.match(home,/For immediate, controlled microvascular and tissue-level oxygenation while endogenous erythropoiesis recovers\./);
assert.match(home,/class="hero-hotspot" href="product\.html"[^>]*aria-label="Open Product"/);
assert.match(home,/class="hero-hotspot" href="applications\.html"[^>]*aria-label="Open Application"/);

const statAnchors=[...home.matchAll(/<a class="stat-source"[\s\S]*?<\/a>/g)].map(match=>match[0]);
assert.equal(statAnchors.length,3,`Three linked biodiversity icons`);
for(const anchor of statAnchors)assert.doesNotMatch(anchor,/1,780,634|175,900|49,500/,`Only the icon, not statistic text, is linked`);
assert.match(home,/class="stat-source" href="https:\/\/www\.catalogueoflife\.org\/"[\s\S]*?<use href="#paw"/);
assert.match(home,/class="stat-source" href="https:\/\/www\.iucnredlist\.org\/"[\s\S]*?<use href="#globe"/);
assert.match(home,/class="data-note"[\s\S]*?>IUCN Red List of Threatened Species<\/a>:[\s\S]*?>Catalogue of Life global species catalogue<\/a>/);
assert.match(home,/IUCN Red List 2026-1 figures were released 9 July 2026/);
assert.match(home,/How many species\? How many blood-group systems\?/);
assert.match(home,/Different blood\. One shared need: oxygen\./);
assert.match(home,/donor-independent oxygen carrier/);
assert.match(home,/long room-temperature shelf life/);
assert.match(home,/href="evidence\.html"[^>]*>Explore Evidence/);
assert.match(home,/We be of one blood, ye and I\./);
assert.match(home,/Rudyard Kipling, The Jungle Book/);
assert.match(home,/One BHOC System\. For Every Species\./);
assert.match(home,/Nature kept the core\./);
assert.match(home,/href="science\.html#foundation"/);
const homeHeroSection=home.match(/<section id="home" class="block-hero"[\s\S]*?<\/section>/)?.[0]||'';
assert.doesNotMatch(homeHeroSection,/Healthy species|Healthy ecosystems|A healthier tomorrow/);

assert.match(htmlByPage.get('science.html'),/https:\/\/archiljali\.github\.io\/BHOC-VET-platform\//);
assert.match(htmlByPage.get('science.html'),/https:\/\/archiljali\.github\.io\/BHOC-platform\/veterinary\/Vet-index\.html/);
assert.match(htmlByPage.get('product.html'),/>The intended product profile\./);
assert.match(htmlByPage.get('product.html'),/>Product objectives are not regulatory approval\./);
assert.match(htmlByPage.get('evidence.html'),/>Scientific publications</);
assert.match(htmlByPage.get('evidence.html'),/>Regulatory records</);
assert.match(htmlByPage.get('related-information.html'),/>Professional publications</);
assert.match(htmlByPage.get('related-information.html'),/>Related scientific information</);
assert.match(htmlByPage.get('related-information.html'),/>Conservation databases</);
assert.match(htmlByPage.get('initiative.html'),/>Many species\. Blood group systems, known and unknown\. One BHOC system\. One core design engineered by nature\./);
assert.match(htmlByPage.get('initiative.html'),/href="\.\/initiative\/"><span>Open Full Initiative<\/span>/);
assert.match(htmlByPage.get('initiative.html'),/if\(location\.pathname\.endsWith\("\/initiative"\)\)location\.replace\(location\.pathname\+"\/"\+location\.search\+location\.hash\)/,'Extensionless Initiative route redirects to the full Initiative homepage');
assert.match(htmlByPage.get('contact.html'),/data-contact-email="info@bhoctherapeutics\.com"/);

const redirect=await fs.readFile(path.join(out,'publications.html'),'utf8');
assert.match(redirect,/<meta name="robots" content="noindex,follow">/,`Legacy publications route is excluded from indexing`);
assert.match(redirect,/http-equiv="refresh" content="0;url=evidence\.html"/,`Legacy publications route redirects to Evidence`);
assert.match(redirect,/rel="canonical" href="https:\/\/bhocvet\.com\/evidence\.html"/,`Legacy publications canonical points to Evidence`);

const sitemap=await fs.readFile(path.join(out,'sitemap.xml'),'utf8');
assert.match(sitemap,/bhoc-veterinary-organization-logo\.svg/,`Sitemap contains organization logo`);
assert.match(sitemap,/bhoc-initiative-land-social\.jpg/,`Sitemap contains social image`);
assert.match(sitemap,/bhoc-initiative-land-hero-v2\.webp/,`Sitemap contains Land hero`);
assert.match(sitemap,/bhoc-initiative-winter-hero\.webp/,`Sitemap contains Winter hero`);
assert.match(sitemap,/bhoc-initiative-ocean-hero-v2\.webp/,`Sitemap contains Ocean hero`);
for(const heroAsset of ['bhoc-initiative-land-hero-v2.webp','bhoc-initiative-winter-hero.webp','bhoc-initiative-ocean-hero-v2.webp']){
  const {size}=await fs.stat(path.join(out,'assets',heroAsset));
  assert.ok(size<400_000,`${heroAsset}: optimized hero asset stays below 400 KB`);
}
assert.match(sitemap,/https:\/\/bhocvet\.com\/product\.html/);
assert.match(sitemap,/https:\/\/bhocvet\.com\/evidence\.html/);
assert.match(sitemap,/https:\/\/bhocvet\.com\/initiative\.html/);
assert.match(sitemap,/https:\/\/bhocvet\.com\/initiative\//);
assert.match(sitemap,/https:\/\/bhocvet\.com\/assets\/initiative\/challenge-african-elephant-usfws\.webp/);
assert.match(sitemap,/https:\/\/bhocvet\.com\/related-information\.html/);
assert.doesNotMatch(sitemap,/publications\.html/,`Legacy redirect is omitted from sitemap`);

const notFound=await fs.readFile(path.join(out,'404.html'),'utf8');
assert.match(notFound,/<meta name="robots" content="noindex">/,`404 page stays out of search results`);

const manifest=JSON.parse(await fs.readFile(path.join(root,'content/homepage.json'),'utf8'));
const rendered=[];
for(const block of manifest.blocks.filter(block=>block.enabled)){
  const data=JSON.parse(await fs.readFile(path.join(root,'content',block.file),'utf8'));
  const {default:render}=await import('../src/blocks/'+block.type+'.mjs');
  rendered.push({block,data,render,html:render(data)});
}
const target=rendered.find(x=>x.block.type==='mission');
assert.ok(target,'Mission block is available for independent-content test');
const edit=structuredClone(target.data);
edit.description='An independently updated mission paragraph.';
assert.notEqual(target.render(edit),target.html,'Mission content can change independently');

const initiativeManifestSource=JSON.parse(await fs.readFile(path.join(root,'content/initiative/homepage.json'),'utf8'));
const renderedInitiative=[];
for(const block of initiativeManifestSource.blocks.filter(block=>block.enabled)){
  const data=JSON.parse(await fs.readFile(path.join(root,'content',block.file),'utf8'));
  const {default:render}=await import('../src/initiative/blocks/'+block.type+'.mjs');
  renderedInitiative.push({block,data,render,html:render(data)});
}
assert.equal(renderedInitiative.length,5,'Initiative homepage has five independently rendered blocks');
const initiativeFocus=renderedInitiative.find(item=>item.block.type==='focus');
assert.equal(initiativeFocus.data.cards.length,7,'Initiative Focus keeps seven independently editable cards');
for(const card of initiativeFocus.data.cards){
  assert.ok(card.image.alt.trim(),'Initiative Focus image has descriptive ALT');
  assert.ok(card.credit?.label&&card.credit?.href&&card.credit?.license&&card.credit?.licenseHref,'Initiative Focus photograph keeps source and license data');
}
const initiativeTarget=renderedInitiative.find(item=>item.block.type==='mission-panel');
assert.ok(initiativeTarget,'Initiative mission panel is independently editable');
const initiativeEdit=structuredClone(initiativeTarget.data);
initiativeEdit.text='An independently updated Initiative paragraph.';
assert.notEqual(initiativeTarget.render(initiativeEdit),initiativeTarget.html,'Initiative block content can change independently');
for(const item of renderedInitiative.filter(item=>item!==initiativeTarget))assert.equal(item.render(item.data),item.html,'Editing Initiative mission leaves '+item.block.type+' unchanged');
const initiativeTemplateSource=await fs.readFile(path.join(root,'src/initiative/index.html'),'utf8');
for(const slot of ['{{HEAD}}','{{HEADER}}','{{BLOCKS}}','{{FOOTER}}'])assert.ok(initiativeTemplateSource.includes(slot),'Initiative template keeps modular slot '+slot);
for(const item of rendered.filter(item=>item!==target))assert.equal(item.render(item.data),item.html,`Editing mission leaves ${item.block.type} unchanged`);

const {default:story}=await import('../src/blocks/story.mjs');
const storyHTML=story({id:'research-update',heading:'A new update',paragraphs:['Text <script>alert(1)</script>'],link:{label:'Read more',href:'https://bhoctherapeutics.com/'}});
assert.match(storyHTML,/A new update/);
assert.doesNotMatch(storyHTML,/<script>/);
assert.match(storyHTML,/&lt;script&gt;/);

console.log(`Passed: ${expectedPages.length} core pages plus the BHOC Initiative homepage, legacy redirect, semantic HTML, assets, schema, social previews, navigation and independent content rendering.`);
