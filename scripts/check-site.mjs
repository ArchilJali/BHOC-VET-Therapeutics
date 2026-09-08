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
  assert.match(html,/property="og:image" content="https:\/\/bhocvet\.com\/assets\/bhoc-wildlife-rainbow-20260906-v2\.png"/,`${name}: share image`);
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
  assert.match(footer,/First published <time datetime=\"2026-09-07\">07 Sep 2026<\\/time>.*11 updates.*Last updated <time datetime=\"2026-09-08\">08 Sep 2026<\\/time>.*Version 26\\.09\\.08/,`${name}: publication history`);
}

const home=htmlByPage.get('index.html');
assert.match(home,/<link rel="preload" as="image" href="\.\/assets\/bhoc-wildlife-rainbow-20260906-v2\.webp" type="image\/webp" fetchpriority="high">/);
assert.match(home,/<img src="\.\/assets\/bhoc-wildlife-rainbow-20260906-v2\.webp"[^>]*fetchpriority="high"/);
assert.match(home,/<div class="landscape" aria-hidden="true"><img [^>]*alt=""/,`Decorative landscape keeps an intentionally empty ALT`);
assert.match(home,/class="wordmark-expansion">Biological Hemoglobin Oxygen Carrier<\/span>/,`Header expands BHOC`);

const primaryNav=home.match(/<nav id="primary-nav"[\s\S]*?<\/nav>/)?.[0]||'';
const navItems=[...primaryNav.matchAll(/href="([^"]+)">([^<]+)<\/a>/g)].map(match=>[match[1],match[2]]);
assert.deepEqual(navItems,[
  ['product.html','Product'],
  ['applications.html','Application'],
  ['evidence.html','Evidence'],
  ['science.html','Science'],
  ['initiative.html','Initiative'],
  ['related-information.html','Related Information'],
  ['news.html','News']
],`Primary navigation order and labels`);

assert.match(home,/<h1 id="home-heading">Precision Oxygen Therapeutics<\/h1>/);
assert.match(home,/BH<span class="oxygen-initial">O<\/span>C/);
for(const word of ['Biological','Hemoglobin','Oxygen','Carrier'])assert.match(home,new RegExp(`<strong>${word[0]}</strong>${word.slice(1)}`),`BHOC initials are emphasized`);
assert.match(home,/For immediate, controlled microvascular and tissue-level oxygenation while endogenous erythropoiesis recovers\./);
assert.match(home,/>Product<\/span>.*href="applications\.html"><span>Application<\/span>/s);

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
assert.match(home,/One BHOC System\.<\/span> <span class="initiative-promise">For Every Species\./);
assert.match(home,/Nature kept the core\./);
assert.match(home,/href="science\.html#foundation"/);
assert.doesNotMatch(home,/Healthy species|Healthy ecosystems|A healthier tomorrow/);

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
assert.match(htmlByPage.get('contact.html'),/data-contact-email="info@bhoctherapeutics\.com"/);

const redirect=await fs.readFile(path.join(out,'publications.html'),'utf8');
assert.match(redirect,/<meta name="robots" content="noindex,follow">/,`Legacy publications route is excluded from indexing`);
assert.match(redirect,/http-equiv="refresh" content="0;url=evidence\.html"/,`Legacy publications route redirects to Evidence`);
assert.match(redirect,/rel="canonical" href="https:\/\/bhocvet\.com\/evidence\.html"/,`Legacy publications canonical points to Evidence`);

const sitemap=await fs.readFile(path.join(out,'sitemap.xml'),'utf8');
assert.match(sitemap,/bhoc-veterinary-organization-logo\.svg/,`Sitemap contains organization logo`);
assert.match(sitemap,/bhoc-wildlife-rainbow-20260906-v2\.png/,`Sitemap contains social image`);
assert.match(sitemap,/bhoc-wildlife-rainbow-20260906-v2\.webp/,`Sitemap contains optimized hero`);
assert.match(sitemap,/https:\/\/bhocvet\.com\/product\.html/);
assert.match(sitemap,/https:\/\/bhocvet\.com\/evidence\.html/);
assert.match(sitemap,/https:\/\/bhocvet\.com\/initiative\.html/);
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
for(const item of rendered.filter(item=>item!==target))assert.equal(item.render(item.data),item.html,`Editing mission leaves ${item.block.type} unchanged`);

const {default:story}=await import('../src/blocks/story.mjs');
const storyHTML=story({id:'research-update',heading:'A new update',paragraphs:['Text <script>alert(1)</script>'],link:{label:'Read more',href:'https://bhoctherapeutics.com/'}});
assert.match(storyHTML,/A new update/);
assert.doesNotMatch(storyHTML,/<script>/);
assert.match(storyHTML,/&lt;script&gt;/);

console.log(`Passed: ${expectedPages.length} indexed pages, legacy redirect, semantic HTML, assets, schema, social previews, navigation and independent content rendering.`);
