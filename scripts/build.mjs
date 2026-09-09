import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {esc,attrs,img,icon,link} from '../src/lib/html.mjs';
import renderScienceBlock from '../src/blocks/science.mjs';
import {
  renderFooter as renderInitiativeFooter,
  renderHead as renderInitiativeHead,
  renderHeader as renderInitiativeHeader
} from '../src/initiative/chrome.mjs';

const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const args=process.argv.slice(2);
const out=path.resolve(root,args.includes('--out')?args[args.indexOf('--out')+1]:'dist');
const read=p=>fs.readFile(path.join(root,p),'utf8');
const json=async p=>JSON.parse(await read(p));
const write=async(p,s)=>{const dest=path.join(out,p);await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,s);};
const digest=s=>createHash('sha256').update(s).digest('hex').slice(0,10);

const site=await json('content/site.json');
const header=await json('content/header.json');
const manifest=await json('content/homepage.json');
const species=await json('content/species-details.json');
const labels=await json('content/interface.json');
const scienceData=await json('content/blocks/science.json');
const initiativeManifest=await json('content/initiative/homepage.json');
const initiativeSite=await json('content/initiative/site.json');
const initiativeHeader=await json('content/initiative/header.json');
const initiativeFooter=await json('content/initiative/footer.json');
const pageFiles=(await fs.readdir(path.join(root,'content/pages'))).filter(name=>name.endsWith('.json')).sort();
const pages=await Promise.all(pageFiles.map(name=>json('content/pages/'+name)));

const allowed=['hero','biodiversity','species','science','mission','pillars','story'];
const ids=new Set();
const blocks=[];
const checkData=(d,label)=>{
  if(Array.isArray(d))return d.forEach((v,i)=>checkData(v,`${label}[${i}]`));
  if(d&&typeof d==='object'){
    if('src'in d&&(!('alt'in d)||!Number.isInteger(d.width)||!Number.isInteger(d.height)||d.width<1||d.height<1))throw new Error(`${label}: every image needs alt, width and height`);
    for(const [k,v] of Object.entries(d)){
      if(['href','url','source'].includes(k))attrs({href:v});
      if(k==='src'){
        const local=/^assets\/[a-zA-Z0-9_./-]+$/.test(v);
        const approvedRemote=/^https:\/\/(?:upload|thumb)\.wikimedia\.org\/wikipedia\/commons\//.test(v);
        if(!local&&!approvedRemote)throw new Error(label+': invalid image source');
        if(local&&v.includes('..'))throw new Error('Asset path may not traverse directories');
      }
      checkData(v,`${label}.${k}`);
    }
  }
};

for(const entry of manifest.blocks){
  if(!allowed.includes(entry.type))throw new Error('Unknown block type '+entry.type);
  if(!/^blocks\/[a-z0-9-]+\.json$/.test(entry.file))throw new Error('Invalid content file');
  if(!entry.enabled)continue;
  const d=await json('content/'+entry.file);
  checkData(d,entry.file);
  if(!/^[a-z][a-z0-9-]*$/.test(d.id)||ids.has(d.id))throw new Error('Invalid or duplicate block ID '+d.id);
  ids.add(d.id);
  const {default:render}=await import('../src/blocks/'+entry.type+'.mjs');
  blocks.push({type:entry.type,data:d,html:render(d)});
}

const initiativeAllowed=['hero','challenge','kipling','microcirculation','focus','work','partners'];
const initiativeRequired=['hero','challenge','kipling','microcirculation','focus','work','partners'];
const initiativeIds=new Set();
const initiativeBlocks=[];
for(const entry of initiativeManifest.blocks){
  if(!initiativeAllowed.includes(entry.type))throw new Error('Unknown Initiative block type '+entry.type);
  if(!/^initiative\/blocks\/[a-z0-9-]+\.json$/.test(entry.file))throw new Error('Invalid Initiative content file');
  if(!entry.enabled)continue;
  const data=await json('content/'+entry.file);
  checkData(data,entry.file);
  if(!/^[a-z][a-z0-9-]*$/.test(data.id)||initiativeIds.has(data.id))throw new Error('Invalid or duplicate Initiative block ID '+data.id);
  initiativeIds.add(data.id);
  const {default:render}=await import('../src/initiative/blocks/'+entry.type+'.mjs');
  initiativeBlocks.push({type:entry.type,file:entry.file,data,html:render(data)});
}

if(!blocks.some(b=>b.type==='hero'))throw new Error('Homepage needs exactly one hero');
if(blocks.filter(b=>b.type==='hero').length!==1)throw new Error('Multiple hero blocks');
for(const type of initiativeAllowed)if(initiativeBlocks.filter(block=>block.type===type).length>1)throw new Error('Initiative homepage may not repeat '+type+' blocks');
for(const type of initiativeRequired)if(initiativeBlocks.filter(block=>block.type===type).length!==1)throw new Error('Initiative homepage needs exactly one '+type+' block');
checkData(site,'site');
checkData(header,'header');
checkData(species,'species');
checkData(scienceData,'science page block');
checkData(initiativeSite,'initiative site');
checkData(initiativeHeader,'initiative header');
checkData(initiativeFooter,'initiative footer');
for(const [i,page] of pages.entries()){
  checkData(page,`pages[${i}]`);
  if(!/^[a-z][a-z0-9-]*$/.test(page.slug))throw new Error('Invalid page slug '+page.slug);
  if(pageFiles[i]!==page.slug+'.json')throw new Error(`Page filename must match slug: ${page.slug}`);
}
for(const type of allowed.filter(type=>type!=='story'))if(blocks.filter(b=>b.type===type).length>1)throw new Error('Only one '+type+' block is supported');

const relativeOut=path.relative(root,out);
if(!['dist','_site'].includes(relativeOut))throw new Error('Build output must be the project dist or _site directory');
const sourceAssets=path.join(root,'assets');
await fs.access(sourceAssets);
await fs.rm(out,{recursive:true,force:true});
await fs.mkdir(out,{recursive:true});
await fs.cp(sourceAssets,path.join(out,'assets'),{recursive:true});

const cssNames=[...new Set(['theme','header',...blocks.map(b=>b.type),'science','pages','dialogs'])];
const cssLinks=[];
for(const name of cssNames){
  const css=await read(`src/styles/${name}.css`);
  await write(`assets/css/${name}.css`,css);
  cssLinks.push(`<link rel="stylesheet" href="./assets/css/${name}.css?v=${digest(css)}">`);
}
const client=await read('src/client/app.js');
await write('app.js',client);

const initiativeStyles=await read('src/initiative/styles.css');
const initiativeClient=await read('src/initiative/app.js');
await write('initiative/styles.css',initiativeStyles);
await write('initiative/app.js',initiativeClient);
const initiativeTemplate=await read('src/initiative/index.html');
const initiativeBody=initiativeBlocks.map(block=>
  '<!-- BLOCK '+block.type+': content/'+block.file+' -->\n'+block.html
).join('\n');
const initiativeSlots={
  '{{LANGUAGE}}':initiativeSite.language,
  '{{HEAD}}':renderInitiativeHead(initiativeSite,digest(initiativeStyles)),
  '{{HEADER}}':renderInitiativeHeader(initiativeHeader),
  '{{BLOCKS}}':initiativeBody,
  '{{FOOTER}}':renderInitiativeFooter(initiativeFooter),
  '{{APP_VERSION}}':digest(initiativeClient)
};
let initiativeDocument=initiativeTemplate;
for(const [slot,value] of Object.entries(initiativeSlots))initiativeDocument=initiativeDocument.replaceAll(slot,value);
if(/\{\{[A-Z_]+\}\}/.test(initiativeDocument))throw new Error('Unresolved Initiative template slot');
if((initiativeDocument.match(/<h1\b/g)||[]).length!==1)throw new Error('initiative/index.html: exactly one H1 required');
await write('initiative/index.html',initiativeDocument);

const absolute=p=>new URL(p,site.canonical).href;
const imageMime=src=>src.endsWith('.png')?'image/png':src.endsWith('.webp')?'image/webp':'image/jpeg';
const personId=site.canonical+'#archil-jaliashvili';
const orgId=site.canonical+'#organization';
const webId=site.canonical+'#website';
const hero=blocks.find(b=>b.type==='hero').data;
const safeJSON=d=>JSON.stringify(d).replace(/</g,'\\u003c');
const seoTerms=meta=>[
  meta.seo?.primaryKeyword,
  ...(meta.seo?.secondaryKeywords||[]),
  ...(meta.seo?.supportingTerms||[])
].filter(Boolean);
const pageTopics=meta=>[...new Set([...seoTerms(meta),...(meta===site?site.topics:[])])];
const organizationLogo={
  '@type':'ImageObject',
  '@id':site.canonical+'#organization-logo',
  url:absolute(site.organizationLogo.src),
  contentUrl:absolute(site.organizationLogo.src),
  caption:site.organizationLogo.alt,
  width:site.organizationLogo.width,
  height:site.organizationLogo.height
};
const graphFor=(meta,pagePath,isHome=false)=>({'@context':'https://schema.org','@graph':[
  {'@type':'Organization','@id':orgId,name:site.name,alternateName:site.alternateNames,url:site.canonical,description:site.description,email:site.contactEmail,logo:organizationLogo,contactPoint:{'@type':'ContactPoint',email:site.contactEmail,contactType:'research inquiries',availableLanguage:['English']},parentOrganization:{'@type':'Organization',...site.parent},sameAs:site.sameAs},
  {'@type':'Person','@id':personId,...site.author,sameAs:[site.author.url],affiliation:{'@id':orgId},knowsAbout:site.topics},
  {'@type':'WebSite','@id':webId,name:site.name,alternateName:site.alternateNames,url:site.canonical,description:site.description,inLanguage:site.language,datePublished:site.publication.firstPublished,dateModified:site.updated,keywords:seoTerms(site).join(', '),publisher:{'@id':orgId},creator:{'@id':personId}},
  ...(isHome?[{'@type':'ImageObject','@id':site.canonical+'#hero-image',contentUrl:absolute(hero.image.src),caption:hero.image.alt,width:hero.image.width,height:hero.image.height,representativeOfPage:true}]:[]),
  {'@type':meta.schemaType||'WebPage','@id':absolute(pagePath)+'#webpage',url:absolute(pagePath),name:meta.title,description:meta.description,isPartOf:{'@id':webId},inLanguage:site.language,datePublished:site.publication.firstPublished,dateModified:site.updated,author:{'@id':personId},creator:{'@id':personId},publisher:{'@id':orgId},about:pageTopics(meta).map(name=>({'@type':'Thing',name})),keywords:seoTerms(meta).join(', '),...(isHome?{primaryImageOfPage:{'@id':site.canonical+'#hero-image'}}:{})}
]});

const dialogNames=(await fs.readdir(path.join(root,'content/dialogs'))).filter(name=>name.endsWith('.html')).sort();
const dialogHTML=await Promise.all(dialogNames.map(name=>read('content/dialogs/'+name)));
const extras=`<dialog id="species-dialog" aria-labelledby="species-detail-heading"><button class="dialog-close" aria-label="Close species details">×</button><span class="eyebrow">${esc(labels.speciesEyebrow)}</span><div id="species-detail"></div></dialog><dialog id="all-species-dialog" aria-labelledby="all-species-heading"><button class="dialog-close" aria-label="Close all species">×</button><span id="all-species" class="eyebrow">Explore species</span><h2 id="all-species-heading">${esc(labels.allSpeciesTitle)}</h2><p>${esc(labels.allSpeciesIntro)}</p><div class="all-species-grid"></div><p class="small-copy">${esc(labels.allSpeciesNote)}</p></dialog><dialog id="search-dialog" aria-labelledby="search-heading"><button class="dialog-close" aria-label="Close search">×</button><h2 id="search-heading">${esc(labels.searchHeading)}</h2><label for="site-search">${esc(labels.searchLabel)}</label><input id="site-search" type="search" placeholder="${esc(labels.searchPlaceholder)}" autocomplete="off"><p class="sr-only" id="search-status" aria-live="polite"></p><div id="search-results"></div></dialog>`;
const visibleSearchText=value=>JSON.stringify(value,function(key,item){
  if(key==='seo')return undefined;
  return item;
});

const search=[
  ...Object.entries(species).map(([key,s])=>({title:s.name,category:'Species',text:`${s.text} ${s.context}`,species:key})),
  ...blocks.filter(b=>b.type!=='pillars').map(b=>({title:b.data.title||(Array.isArray(b.data.heading)?b.data.heading.join(' '):b.data.heading)||'Our initiative',category:'Homepage',text:visibleSearchText(b.data),href:'index.html#'+b.data.id})),
  ...initiativeBlocks.map(block=>({
    title:block.data.title||(Array.isArray(block.data.headingLines)?block.data.headingLines.join(' '):'BHOC Initiative'),
    category:'Initiative',
    text:visibleSearchText(block.data),
    href:'./initiative/#'+block.data.id
  })),
  ...pages.map(page=>({title:page.navLabel,category:'Page',text:visibleSearchText(page),href:page.slug+'.html'})),
  ...dialogHTML.map((html,i)=>({title:html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1].replace(/<[^>]*>/g,' ')||dialogNames[i],category:'Information',text:html.replace(/<[^>]*>/g,' '),dialog:dialogNames[i].replace('.html','')}))
];
const siteData=safeJSON({species,search,labels});

const networkHTML=`<nav class="site-network-bar" aria-label="BHOC websites"><span class="network-title">BHOC network</span><div class="network-links">${header.networkLinks.map(item=>item.enabled?`<a class="network-link network-link-enabled" ${attrs(item)} aria-label="Open ${esc(item.label)}">${icon('globe')}<span class="network-label-wide">${esc(item.label)}</span><span class="network-label-compact">${esc(item.compactLabel||item.label)}</span></a>`:`<span class="network-link network-link-disabled" aria-disabled="true" title="Coming soon">${icon('globe')}<span class="network-label-wide">${esc(item.label)}</span><span class="network-label-compact">${esc(item.compactLabel||item.label)}</span></span>`).join('')}</div></nav>`;
const navigationLogo=item=>`<svg class="nav-initiative-logo" viewBox="145 35 965 805" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet"><image href="./${esc(item.logo.src)}" width="1254" height="1254" /></svg>`;
const renderNavigationItem=(item,active)=>item.role==='initiative'
  ?`<a class="nav-initiative-entry${item.href===active?' active':''}" ${attrs(item)}>${navigationLogo(item)}<span>${esc(item.label)}</span></a>`
  :link(item,item.href===active?'active':'');
const renderHeader=active=>`<header class="site-header"><a class="wordmark" href="index.html#home" aria-label="${esc(site.name)} home"><span class="wordmark-top">${[...header.wordmark.letters].map((c,i)=>i===header.wordmark.accentIndex?`<em>${esc(c)}</em>`:esc(c)).join('')}</span><span class="wordmark-meta"><span class="wordmark-division">${esc(header.wordmark.subtitle)}</span><span class="wordmark-expansion">${esc(header.wordmark.expansion)}</span></span></a><nav id="primary-nav" class="primary-nav" aria-label="Main navigation">${header.navigation.map(item=>renderNavigationItem(item,active)).join('')}</nav><button class="icon-button search-toggle" data-open="search-dialog" aria-label="Search this website">${icon('search')}</button><button class="menu-toggle icon-button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span><span></span></button></header>${networkHTML}`;
const formatDate=iso=>{const [year,month,day]=iso.split('-');return `${day} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][Number(month)-1]} ${year}`};
const footerWordmark=[...header.wordmark.letters].map((letter,index)=>index===header.wordmark.accentIndex?`<span class="oxygen-initial">${esc(letter)}</span>`:esc(letter)).join('');
const renderFooter=()=>{const publication=site.publication;const updateLabel=publication.updates===1?'update':'updates';return `<footer class="site-footer"><div class="footer-primary"><div class="footer-brand"><strong class="footer-wordmark" aria-label="BHOC Veterinary"><span class="footer-bhoc">${footerWordmark}</span><span class="footer-veterinary">VETERINARY</span></strong><span class="footer-expansion">${esc(header.wordmark.expansion)}</span></div><nav class="footer-directory" aria-label="Footer navigation">${site.footer.groups.map(group=>`<div class="footer-column"><h2>${esc(group.title)}</h2>${group.links.map(item=>`<a ${attrs(item)}>${esc(item.label)}</a>`).join('')}</div>`).join('')}</nav></div><div class="footer-secondary"><div class="footer-project"><p class="project-attribution">Project lead: <strong>${esc(site.footer.projectLead)}</strong>.</p><p class="footer-note">${esc(site.footer.note)}</p></div><nav class="footer-links" aria-label="Footer links">${site.footer.links.map(item=>`<a class="footer-link" ${attrs(item)}>${item.icon?icon(item.icon):''}<span>${esc(item.label)}</span></a>`).join('')}</nav><p class="footer-publication">First published <time datetime="${esc(publication.firstPublished)}">${formatDate(publication.firstPublished)}</time><span class="footer-separator" aria-hidden="true"> · </span>${publication.updates} ${updateLabel}<span class="footer-separator" aria-hidden="true"> · </span>Last updated <time datetime="${esc(publication.lastUpdated)}">${formatDate(publication.lastUpdated)}</time><span class="footer-separator" aria-hidden="true"> · </span>Version ${esc(publication.version)}</p><p class="footer-copyright">© ${site.updated.slice(0,4)} ${esc(site.footer.copyright)}</p></div></footer>`};
const commonEnd=`${dialogHTML.join('\n')}${extras}<noscript><p class="noscript-note">Interactive search requires JavaScript. The main pages and source links remain available.</p><style>dialog{display:block;position:relative;margin:2rem auto}dialog .dialog-close,#search-dialog,#species-dialog,#all-species-dialog{display:none}.menu-toggle,.search-toggle,.round-control,.carousel-dots,.species-dots,.hero-control,.hero-dots{display:none}.primary-nav{display:flex;position:static}.science-panel[hidden]{display:block!important}</style></noscript>`;
const initiativeSlashRedirect='<script>if(location.pathname.endsWith("/initiative"))location.replace(location.pathname+"/"+location.search+location.hash)</script>';

const renderHead=(meta,pagePath,isHome=false)=>`<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#f65c00">
<title>${esc(meta.title)}</title><meta name="description" content="${esc(meta.description)}"><meta name="author" content="${esc(site.author.name)}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><link rel="canonical" href="${esc(absolute(pagePath))}">
<meta property="og:type" content="website"><meta property="og:locale" content="en_US"><meta property="og:site_name" content="${esc(site.name)}"><meta property="og:title" content="${esc(meta.title)}"><meta property="og:description" content="${esc(meta.description)}"><meta property="og:url" content="${esc(absolute(pagePath))}"><meta property="og:image" content="${absolute(site.socialImage.src)}"><meta property="og:image:secure_url" content="${absolute(site.socialImage.src)}"><meta property="og:image:type" content="${imageMime(site.socialImage.src)}"><meta property="og:image:width" content="${site.socialImage.width}"><meta property="og:image:height" content="${site.socialImage.height}"><meta property="og:image:alt" content="${esc(site.socialImage.alt)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(meta.title)}"><meta name="twitter:description" content="${esc(meta.description)}"><meta name="twitter:image" content="${absolute(site.socialImage.src)}"><meta name="twitter:image:alt" content="${esc(site.socialImage.alt)}">
<link rel="icon" href="./assets/favicon.svg" type="image/svg+xml"><link rel="sitemap" type="application/xml" href="${esc(absolute('sitemap.xml'))}">${isHome?`<link rel="preload" as="image" href="./${esc(hero.image.src)}" type="${imageMime(hero.image.src)}" fetchpriority="high">`:''}
${cssLinks.join('\n')}
<script type="application/ld+json">${safeJSON(graphFor(meta,pagePath,isHome))}</script><script id="site-data" type="application/json">${siteData}</script><script src="./app.js?v=${digest(client)}" defer></script>
</head>`;

const documents=new Map();
const homeMeta={title:site.title,description:site.description,schemaType:'WebPage',seo:site.seo};
documents.set('index.html',`<!doctype html><html lang="${esc(site.language)}">${renderHead(homeMeta,'',true)}<body data-page="home"><a class="skip-link" href="#main">Skip to content</a>${await read('src/icons.html')}<div class="site-shell">${renderHeader('index.html#home')}<main id="main">\n${blocks.map(b=>`<!-- BLOCK ${b.type}: content/blocks/${b.type}.json -->\n${b.html}`).join('\n')}\n</main>${renderFooter()}</div>${commonEnd}</body></html>\n`);

for(const page of pages){
  const {default:renderPage}=await import('../src/pages/'+page.slug+'.mjs');
  const pageMain=page.slug==='science'?renderPage(page,renderScienceBlock(scienceData)):renderPage(page);
  const routeGuard=page.slug==='initiative'?initiativeSlashRedirect:'';
  documents.set(page.slug+'.html',`<!doctype html><html lang="${esc(site.language)}">${renderHead(page,page.slug+'.html').replace('</head>',routeGuard+'</head>')}<body data-page="${esc(page.slug)}"><a class="skip-link" href="#main">Skip to content</a>${await read('src/icons.html')}<div class="site-shell">${renderHeader(page.slug+'.html')}${pageMain}${renderFooter()}</div>${commonEnd}</body></html>\n`);
}

for(const [name,html] of documents){
  if((html.match(/<h1\b/g)||[]).length!==1)throw new Error(`${name}: exactly one H1 required`);
  await write(name,html);
}

await write('publications.html',`<!doctype html><html lang="${esc(site.language)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0;url=evidence.html"><link rel="canonical" href="${absolute('evidence.html')}"><title>Evidence | BHOC Veterinary</title></head><body><p>Publications are now organised under <a href="evidence.html">BHOC Veterinary Evidence</a>.</p></body></html>\n`);

const specialHashes=new Set(['#about','#initiative','#all-species',...Object.keys(species).map(key=>'#species-'+key)]);
for(const [name,html] of documents){
  const idsInDocument=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]));
  for(const match of html.matchAll(/(?:src|href)="\.\/([^"?#]+)[^"]*"/g))await fs.access(path.join(out,match[1]));
  for(const match of html.matchAll(/href="([^"]+)"/g)){
    const href=match[1];
    if(href.startsWith('#')){
      if(!idsInDocument.has(href.slice(1))&&!specialHashes.has(href))throw new Error(`${name}: missing link target ${href}`);
      continue;
    }
    if(/^(https:|mailto:)/.test(href)||href.startsWith('./'))continue;
    const [file,hash]=href.split('#');
    if(file&&!documents.has(file))throw new Error(`${name}: missing page ${file}`);
    if(hash){
      const targetHTML=documents.get(file||name);
      const targetIds=new Set([...targetHTML.matchAll(/\bid="([^"]+)"/g)].map(item=>item[1]));
      if(!targetIds.has(hash)&&!specialHashes.has('#'+hash))throw new Error(`${name}: missing cross-page target ${href}`);
    }
  }
}

const imageEntries=[...new Map([
  site.organizationLogo,
  site.socialImage,
  hero.image,
  hero.initiative.image,
  ...(header.navigation||[]).map(item=>item.logo).filter(Boolean),
  ...(hero.slides||[]).map(slide=>slide.image),
  ...(blocks.find(b=>b.type==='species')?.data.items||[]).map(item=>item.image)
].map(image=>[image.src,image])).values()];
const initiativeMicrocirculation=initiativeBlocks.find(block=>block.type==='microcirculation').data;
const initiativeImages=[...new Map([
  initiativeHeader.brand.image,
  initiativeBlocks.find(block=>block.type==='hero').data.image,
  ...initiativeMicrocirculation.nodes.map(node=>node.image)
].map(image=>[image.src,image])).values()];
const sitemapUrls=[{path:'',images:imageEntries},...pages.map(page=>({path:page.slug+'.html',images:[]})),{path:'initiative/',images:initiativeImages}];
await write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${sitemapUrls.map(entry=>`<url><loc>${absolute(entry.path)}</loc><lastmod>${site.updated}</lastmod>${entry.images.map(image=>`<image:image><image:loc>${absolute(image.src)}</image:image>`).join('')}</url>`).join('')}</urlset>\n`);
await write('robots.txt',`User-agent: *\nAllow: /\nSitemap: ${absolute('sitemap.xml')}\n`);
await write('CNAME',new URL(site.canonical).hostname+'\n');
await write('.nojekyll','');
await write('404.html',await read('404.html'));
console.log(`Built ${blocks.length} homepage blocks and ${pages.length} inner pages to ${path.relative(root,out)||'.'}.`);
