import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out=path.resolve(root,process.argv[2]||'dist');
const site=JSON.parse(await fs.readFile(path.join(root,'content/site.json'),'utf8'));
const vetRWE='https://archiljali.github.io/BHOC-platform/veterinary/Vet-index.html';
const vetSearch='https://archiljali.github.io/BHOC-platform/veterinary/Vet-search.html';
const re=s=>String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const htmlText=s=>String(s).replaceAll('&','&amp;');

const expectedPages=[
  'index.html',
  'product.html',
  'applications.html',
  'science.html',
  'initiative.html',
  'related-information.html',
  'news.html',
  'contact.html'
];
const expectedSchemaTypes={
  'index.html':'WebPage',
  'product.html':'WebPage',
  'applications.html':'WebPage',
  'science.html':'WebPage',
  'initiative.html':'WebPage',
  'related-information.html':'CollectionPage',
  'news.html':'CollectionPage',
  'contact.html':'ContactPage'
};
const htmlByPage=new Map(await Promise.all(expectedPages.map(async name=>[name,await fs.readFile(path.join(out,name),'utf8')])));
const titles=new Set();
const descriptions=new Set();

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

  const structured=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const graph=structured['@graph'];
  const website=graph.find(x=>x['@type']==='WebSite');
  const person=graph.find(x=>x['@type']==='Person');
  const organization=graph.find(x=>x['@type']==='Organization');
  const webPage=graph.find(x=>x['@type']===expectedSchemaTypes[name]);
  assert.equal(website.name,'BHOC Veterinary',`${name}: website identity`);
  assert.deepEqual(website.alternateName,['BHOC Vet','BHOC Veterinary Therapeutics'],`${name}: alternate names`);
  assert.equal(person.name,'Archil Jaliashvili',`${name}: author identity`);
  assert.equal(person.jobTitle,'Project Lead, BHOC Veterinary',`${name}: author role`);
  assert.equal(person.url,'https://bhoctherapeutics.com/archil-jaliashvili/',`${name}: author canonical profile`);
  assert.deepEqual(person.sameAs,['https://www.linkedin.com/in/archil-jaliashvili-bhoc/'],`${name}: author LinkedIn identity`);
  assert.equal(organization.email,'info@bhoctherapeutics.com',`${name}: organization contact`);
  assert.equal(organization.logo['@type'],'ImageObject',`${name}: organization logo object`);
  assert.ok(webPage,`${name}: expected page schema`);
  assert.equal(webPage.author['@id'],'https://bhocvet.com/#archil-jaliashvili',`${name}: page author`);
  assert.ok(webPage.about.length>=8,`${name}: semantic topic coverage`);

  const canonical=name==='index.html'?'https://bhocvet.com/':`https://bhocvet.com/${name}`;
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`),`${name}: canonical`);
  const title=html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description=html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title&&description,`${name}: title and description`);
  assert.ok(title.length>=20&&title.length<=70,`${name}: title length`);
  assert.ok(description.length>=90&&description.length<=180,`${name}: description length`);
  assert.ok(!titles.has(title),`${name}: unique title`); titles.add(title);
  assert.ok(!descriptions.has(description),`${name}: unique description`); descriptions.add(description);
  assert.match(html,/<meta name="author" content="Archil Jaliashvili">/,`${name}: author metadata`);
  assert.match(html,/property="og:image" content="https:\/\/bhocvet\.com\/assets\/bhoc-initiative-land-social\.jpg"/,`${name}: social image`);
  assert.match(html,/name="twitter:card" content="summary_large_image"/,`${name}: social card`);
  assert.doesNotMatch(html,/<meta name="keywords"/,`${name}: no obsolete keyword meta`);
  assert.doesNotMatch(html,/https?:\/\/localhost|http:\/\/[^"<\s]*(?:\.css|\.js|\.webp)/,`${name}: no development URLs`);
  assert.doesNotMatch(html,/href="(?:\.\.\/)?evidence\.html(?:[#?"][^>]*)?"/i,`${name}: no links to retired local Evidence page`);
  assert.doesNotMatch(html,/https:\/\/bhocvet\.com\/evidence\.html/i,`${name}: no absolute retired Evidence URL`);
  assert.doesNotMatch(html,/hbo2therapeutics\.com\/our-product/i,`${name}: forbidden corporate link absent`);

  const network=html.match(/<nav class="site-network-bar"[\s\S]*?<\/nav>/)?.[0]||'';
  assert.equal((network.match(/class="network-link network-link-enabled"/g)||[]).length,2,`${name}: two active network links`);
  assert.equal((network.match(/class="network-link network-link-disabled"/g)||[]).length,1,`${name}: one future sister-site label`);
  assert.match(network,new RegExp(`href="${re(vetRWE)}"[^>]*>[\\s\\S]*Vet Real-World Evidence &amp; Cases ↗`),`${name}: Vet RWE is primary network evidence route`);
  assert.match(network,/href="https:\/\/bhoctherapeutics\.com\/"[^>]*>[\s\S]*BHOC Therapeutics ↗/,`${name}: corporate link`);
  assert.match(network,/aria-disabled="true"[^>]*>[\s\S]*BHOC Transplant · coming soon/,`${name}: transplant remains inactive`);

  const footer=html.match(/<footer class="site-footer">[\s\S]*?<\/footer>/)?.[0]||'';
  assert.equal((footer.match(/class="footer-column"/g)||[]).length,5,`${name}: five footer groups`);
  for(const heading of ['Product','Application','Real-World Evidence &amp; Cases','Initiative','Information'])assert.ok(footer.includes(`<h2>${heading}</h2>`),`${name}: footer group ${heading}`);
  assert.match(footer,new RegExp(`href="${re(vetRWE)}"[^>]*>[\\s\\S]*Vet Real-World Evidence &amp; Cases`),`${name}: footer primary RWE route`);
  assert.match(footer,new RegExp(`href="${re(vetSearch)}"[^>]*>Search veterinary publications`),`${name}: footer publication-search route`);
  assert.match(footer,/href="https:\/\/www\.linkedin\.com\/company\/bhoc-therapeutics\/"/,`${name}: footer LinkedIn route`);
  const footerHrefs=[...footer.matchAll(/href="([^"]+)"/g)].map(match=>match[1]);
  assert.equal(new Set(footerHrefs).size,footerHrefs.length,`${name}: footer destinations are unique`);
  const published=site.publication;
  const displayDate=iso=>{const [year,month,day]=iso.split('-');return `${day} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][Number(month)-1]} ${year}`;};
  assert.match(footer,new RegExp(`First published <time datetime="${re(published.firstPublished)}">${re(displayDate(published.firstPublished))}<\\/time>.*${published.updates} updates.*Last updated <time datetime="${re(published.lastUpdated)}">${re(displayDate(published.lastUpdated))}<\\/time>.*Version ${re(published.version)}`),`${name}: publication history`);
}

const home=htmlByPage.get('index.html');
const primaryNav=home.match(/<nav id="primary-nav"[\s\S]*?<\/nav>/)?.[0]||'';
assert.match(primaryNav,/class="nav-initiative-entry" href="\.\/initiative\/"/,'Initiative remains first navigation entry');
for(const [href,label] of [
  ['product.html','Product'],
  ['applications.html','Application'],
  [vetRWE,'Vet Real-World Evidence & Cases'],
  ['science.html','Science'],
  ['related-information.html','Related Information'],
  ['news.html','News']
])assert.match(primaryNav,new RegExp(`href="${re(href)}"[^>]*>${htmlText(label)}<\\/a>`),`Primary navigation keeps ${label}`);
assert.match(home,new RegExp(`href="${re(vetRWE)}"[^>]*>Vet Real-World Evidence &amp; Cases`),'Homepage biodiversity CTA opens Vet RWE & Cases');
assert.match(home,/<h1 id="home-heading">Precision Oxygen Therapeutics<\/h1>/,'Homepage H1 preserved');
assert.equal((home.match(/data-hero-slide/g)||[]).length,3,'Three hero slides preserved');
assert.match(home,/We be of one blood, ye and I\./,'Kipling quotation preserved');

const product=htmlByPage.get('product.html');
assert.match(product,/Product objectives are not regulatory approval\./,'Product boundary preserved');
assert.ok(product.includes(`href="${vetRWE}"`),'Product routes to Vet RWE & Cases URL');
assert.match(product,/Open Vet Real-World Evidence (?:&amp;|&) Cases/,'Product keeps the Vet RWE & Cases label');

const news=htmlByPage.get('news.html');
assert.match(news,/Vet Real-World Evidence & Cases/,'News identifies the canonical veterinary RWE library');
assert.match(news,new RegExp(`href="${re(vetRWE)}"`),'News routes directly to Vet RWE & Cases');
assert.doesNotMatch(news,/evidence directory/i,'News no longer describes a duplicate evidence directory');
assert.match(news,/BHOC reviews its Initiative in relation to the Kunming-Montreal Global Biodiversity Framework\./,'News contains the dated global biodiversity position');
const frameworkStory=news.match(/<article class="[^"]*" id="bhoc-kunming-montreal-global-biodiversity-framework-2026">[\s\S]*?<\/article>/)?.[0]||'';
assert.ok(frameworkStory,'News renders the global biodiversity position as a distinct story');
assert.match(frameworkStory,/src="assets\/news\/kunming-montreal-global-biodiversity-framework\.png"/,'Framework story uses the supplied GBF visual identity instead of the BHOC Initiative mark');
assert.match(frameworkStory,/alt="Kunming-Montreal Global Biodiversity Framework visual identity, shown for informational context only"/,'Framework visual has precise non-affiliation ALT text');
assert.doesNotMatch(frameworkStory,/assets\/reference-initiative-mark\.webp/,'Framework story does not display the BHOC Initiative mark');
const frameworkNewsLink=news.match(/<a class="story-link" href="\.\/initiative\/#global-biodiversity-framework"[^>]*>/)?.[0]||'';
assert.ok(frameworkNewsLink,'News routes to the existing Initiative framework section');
assert.doesNotMatch(frameworkNewsLink,/target="_blank"/,'Internal Initiative position link stays in the same tab');

assert.match(htmlByPage.get('science.html'),new RegExp(re(vetRWE)),'Science routes to Vet RWE');
assert.match(htmlByPage.get('applications.html'),/Vet-search\.html/,'Applications routes into veterinary source search');
assert.match(htmlByPage.get('related-information.html'),/>Professional publications</,'Related Information preserved');
assert.match(htmlByPage.get('contact.html'),/data-contact-email="info@bhoctherapeutics\.com"/,'Contact preserved');

const initiativeHomePath=path.join(out,'initiative','index.html');
const initiativeHome=await fs.readFile(initiativeHomePath,'utf8');
assert.equal((initiativeHome.match(/<h1\b/g)||[]).length,1,'initiative/index.html: exactly one H1');
const initiativeStructured=JSON.parse(initiativeHome.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
const initiativePage=initiativeStructured['@graph'].find(item=>item['@type']==='WebPage');
assert.equal(initiativePage.author.url,'https://bhoctherapeutics.com/archil-jaliashvili/','Initiative author canonical profile');
assert.deepEqual(initiativePage.author.sameAs,['https://www.linkedin.com/in/archil-jaliashvili-bhoc/'],'Initiative author LinkedIn identity');
const initiativeBlockNames=[...initiativeHome.matchAll(/<!-- BLOCK ([a-z-]+): content\/initiative\/blocks\/[a-z-]+\.json -->/g)].map(match=>match[1]);
assert.deepEqual(initiativeBlockNames,['hero','stats','mission-panel','focus','science-bridge'],'Initiative modular block order');
assert.match(initiativeHome,/rel="canonical" href="https:\/\/bhocvet\.com\/initiative\/"/,'Initiative canonical');
assert.equal((initiativeHome.match(/class="hero-photo hero-photo-/g)||[]).length,6,'Initiative hero keeps six photographs');
assert.equal((initiativeHome.match(/class="focus-card"/g)||[]).length,7,'Initiative keeps seven focus cards');
assert.match(initiativeHome,new RegExp(`href="${re(vetRWE)}"[\\s\\S]*Vet Real-World Evidence &amp; Cases`),'Initiative links to Vet RWE & Cases');
assert.match(initiativeHome,new RegExp(`href="${re(vetSearch)}"[\\s\\S]*Search veterinary publications`),'Initiative has distinct publication search route');
assert.match(initiativeHome,/id="global-biodiversity-framework"/,'Initiative contains the anchored global biodiversity framework statement');
assert.match(initiativeHome,/Kunming-Montreal Global Biodiversity Framework/,'Initiative names the global framework in visible copy');
assert.match(initiativeHome,/This does not imply a formal partnership or endorsement by the Convention on Biological Diversity\./,'Initiative preserves the non-affiliation boundary');
assert.match(initiativeHome,/href="https:\/\/www\.cbd\.int\/gbf\/goals"/,'Initiative links to the official framework goals');
assert.doesNotMatch(initiativeHome,/href="\.\.\/evidence\.html"/,'Initiative no longer links to retired Evidence page');
assert.doesNotMatch(initiativeHome,/https:\/\/bhocvet\.com\/evidence\.html/,'Initiative has no absolute retired Evidence URL');
assert.doesNotMatch(initiativeHome,/hbo2therapeutics\.com\/our-product/i,'Initiative forbidden corporate link absent');

const initiativeRights=await fs.readFile(path.join(out,'initiative','image-rights.html'),'utf8');
assert.match(initiativeRights,/<meta name="robots" content="noindex,follow">/,'Image-rights register remains noindex');
assert.doesNotMatch(initiativeRights,/href="\.\.\/evidence\.html"/,'Image-rights page has no retired Evidence link');

for(const redirectName of ['evidence.html','publications.html']){
  const redirect=await fs.readFile(path.join(out,redirectName),'utf8');
  assert.match(redirect,/<meta name="robots" content="noindex,follow">/,`${redirectName}: noindex migration redirect`);
  assert.ok(redirect.includes(`content="0;url=${vetRWE}"`),`${redirectName}: direct migration redirect`);
  assert.ok(redirect.includes(`rel="canonical" href="${vetRWE}"`),`${redirectName}: canonical points to Vet RWE`);
  assert.ok(redirect.includes(`href="${vetRWE}"`),`${redirectName}: accessible fallback link`);
  assert.doesNotMatch(redirect,/bhocvet\.com\/evidence\.html/,`${redirectName}: no self-canonical old Evidence URL`);
}

const sitemap=await fs.readFile(path.join(out,'sitemap.xml'),'utf8');
const sitemapParse=spawnSync('python3',['-c','import sys, xml.etree.ElementTree as ET; ET.parse(sys.argv[1])',path.join(out,'sitemap.xml')],{encoding:'utf8'});
assert.equal(sitemapParse.status,0,`Sitemap is well-formed XML: ${sitemapParse.stderr.trim()}`);
for(const page of ['product.html','applications.html','science.html','initiative.html','related-information.html','news.html','contact.html'])assert.match(sitemap,new RegExp(`https:\/\/bhocvet\\.com\/${page.replace('.','\\.')}`),`Sitemap includes ${page}`);
assert.match(sitemap,/https:\/\/bhocvet\.com\/initiative\//,'Sitemap includes full Initiative');
assert.doesNotMatch(sitemap,/https:\/\/bhocvet\.com\/evidence\.html/,'Sitemap excludes retired Evidence page');
assert.doesNotMatch(sitemap,/publications\.html/,'Sitemap excludes legacy publications redirect');

const robots=await fs.readFile(path.join(out,'robots.txt'),'utf8');
assert.match(robots,/Sitemap: https:\/\/bhocvet\.com\/sitemap\.xml/,'robots points to sitemap');
const cname=(await fs.readFile(path.join(out,'CNAME'),'utf8')).trim();
assert.equal(cname,'bhocvet.com','CNAME preserved');
const notFound=await fs.readFile(path.join(out,'404.html'),'utf8');
assert.match(notFound,/<meta name="robots" content="noindex">/,'404 stays noindex');

const generatedHtml=[];
async function collectHtml(directory){
  for(const entry of await fs.readdir(directory,{withFileTypes:true})){
    const absolute=path.join(directory,entry.name);
    if(entry.isDirectory())await collectHtml(absolute);
    else if(entry.isFile()&&/\.html?$/i.test(entry.name))generatedHtml.push(absolute);
  }
}
await collectHtml(out);
for(const absolute of generatedHtml){
  const relative=path.relative(out,absolute);
  const html=await fs.readFile(absolute,'utf8');
  const directives=[...html.matchAll(/<meta\b(?=[^>]*\bname=["']yandex["'])(?=[^>]*\bcontent=["']noindex["'])[^>]*>/gi)];
  assert.equal(directives.length,1,`${relative}: exactly one Yandex-only noindex directive required`);
}

console.log(`Passed: ${expectedPages.length} indexed BHOC Veterinary pages, Initiative, migration redirects, ${generatedHtml.length} Yandex-blocked HTML files, schema, links, sitemap and retired-Evidence cleanup.`);
