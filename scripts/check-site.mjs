import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out=path.resolve(root,process.argv[2]||'dist');
const expectedPages=['index.html','science.html','applications.html','publications.html','news.html','contact.html'];
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
  }
  for(const m of html.matchAll(/(?:src|href)="\.\/([^"?#]+)[^"]*"/g))await fs.access(path.join(out,m[1]));
  const structured=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const graph=structured['@graph'];
  assert.equal(graph.find(x=>x['@type']==='WebSite').name,'BHOC Veterinary',`${name}: website identity`);
  assert.equal(graph.find(x=>x['@type']==='Person').name,'Archil Jaliashvili',`${name}: author identity`);
  assert.equal(graph.find(x=>x['@type']==='WebSite').alternateName.length,2,`${name}: alternate names`);
  const canonical=name==='index.html'?'https://bhocvet.com/':`https://bhocvet.com/${name}`;
  assert.ok(html.includes(`rel="canonical" href="${canonical}"`),`${name}: canonical`);
  const title=html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description=html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title&&description,`${name}: title and description`);
  assert.ok(!titles.has(title),`${name}: unique title`);titles.add(title);
  assert.ok(!descriptions.has(description),`${name}: unique description`);descriptions.add(description);
  assert.match(html,/property="og:image" content="https:\/\/bhocvet\.com\/assets\/bhoc-wildlife-rainbow-20260906-v2\.png"/,`${name}: share image`);
  assert.match(html,/name="twitter:card" content="summary_large_image"/,`${name}: large social card`);
  assert.doesNotMatch(html,/<meta name="keywords"/,`${name}: no keyword stuffing`);
  assert.doesNotMatch(html,/https?:\/\/localhost|http:\/\/[^"<\s]*(?:\.css|\.js|\.webp)/,`${name}: no development URLs`);
}

const home=htmlByPage.get('index.html');
assert.match(home,/href="science\.html"/);
assert.match(home,/href="applications\.html"/);
assert.match(home,/href="publications\.html"/);
assert.match(home,/href="news\.html"/);
assert.match(home,/href="contact\.html"/);
assert.match(htmlByPage.get('science.html'),/https:\/\/archiljali\.github\.io\/BHOC-VET-platform\//);
assert.match(htmlByPage.get('science.html'),/https:\/\/archiljali\.github\.io\/BHOC-platform\/veterinary\/Vet-index\.html/);
assert.match(htmlByPage.get('publications.html'),/>Scientific publications</);
assert.match(htmlByPage.get('publications.html'),/>Regulatory records</);
assert.match(htmlByPage.get('publications.html'),/>LinkedIn publications</);
assert.match(htmlByPage.get('publications.html'),/>Related scientific publications</);
assert.match(htmlByPage.get('contact.html'),/data-contact-email="info@bhoctherapeutics\.com"/);

const manifest=JSON.parse(await fs.readFile(path.join(root,'content/homepage.json'),'utf8'));
const rendered=[];
for(const block of manifest.blocks.filter(block=>block.enabled)){
  const data=JSON.parse(await fs.readFile(path.join(root,'content',block.file),'utf8'));
  const {default:render}=await import('../src/blocks/'+block.type+'.mjs');
  rendered.push({block,data,render,html:render(data)});
}
const target=rendered.find(x=>x.block.type==='mission');
assert.ok(target,'Mission block is available for independent-content test');
const edit=structuredClone(target.data);edit.description='An independently updated mission paragraph.';
assert.notEqual(target.render(edit),target.html,'Mission content can change independently');
for(const item of rendered.filter(item=>item!==target))assert.equal(item.render(item.data),item.html,`Editing mission leaves ${item.block.type} unchanged`);

const {default:story}=await import('../src/blocks/story.mjs');
const storyHTML=story({id:'research-update',heading:'A new update',paragraphs:['Text <script>alert(1)</script>'],link:{label:'Read more',href:'https://bhoctherapeutics.com/'}});
assert.match(storyHTML,/A new update/);assert.doesNotMatch(storyHTML,/<script>/);assert.match(storyHTML,/&lt;script&gt;/);

console.log(`Passed: ${expectedPages.length} pages, semantic HTML, assets, schema, canonicals, social previews, navigation and independent content rendering.`);
