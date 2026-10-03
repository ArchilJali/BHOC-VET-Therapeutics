import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {esc,attrs,img,icon,link} from '../src/lib/html.mjs';
import renderScienceBlock from '../src/blocks/science.mjs';
import {
  renderFooter as renderInitiativeFooter,
  renderHead as renderInitiativeHead,
  renderHeader as renderInitiativeHeader,
  renderRightsHead as renderInitiativeRightsHead,
  renderStoryHead as renderInitiativeStoryHead,
  renderStoryLocation as renderInitiativeStoryLocation,
  renderStoriesHead as renderInitiativeStoriesHead,
  renderStoriesLocation as renderInitiativeStoriesLocation
} from '../src/initiative/chrome.mjs';
import renderInitiativeImageRights from '../src/initiative/image-rights.mjs';
import renderInitiativeStory from '../src/initiative/story.mjs';
import renderInitiativeStoriesIndex from '../src/initiative/stories-index.mjs';

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
const initiativeStoriesIndex=await json('content/initiative/stories-index.json');
const initiativeImageProvenance=await json('content/initiative/image-provenance.json');
const initiativeStoryFiles=(await fs.readdir(path.join(root,'content/initiative/stories'))).filter(name=>name.endsWith('.json')).sort();
const initiativeStories=await Promise.all(initiativeStoryFiles.map(name=>json('content/initiative/stories/'+name)));
const pageFiles=(await fs.readdir(path.join(root,'content/pages'))).filter(name=>name.endsWith('.json')).sort();
const pages=await Promise.all(pageFiles.map(name=>json('content/pages/'+name)));

const allowed=['hero','audience','initiative-intro','companion','science-bridge','biodiversity','species','science','mission','pillars','story'];
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

const initiativeAllowed=['hero','stats','mission-panel','focus','stories','science-bridge'];
const initiativeRequired=['hero','stats','mission-panel','focus','science-bridge'];
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
checkData(initiativeImageProvenance,'initiative image provenance');
for(const [i,story] of initiativeStories.entries()){
  checkData(story,`initiative stories[${i}]`);
  if(!/^[a-z][a-z0-9-]*$/.test(story.slug))throw new Error('Invalid Initiative story slug '+story.slug);
  if(initiativeStoryFiles[i]!==story.slug+'.json')throw new Error('Initiative story filename must match slug: '+story.slug);
  if(story.canonical!=='https://bhocvet.com/initiative/'+story.slug+'.html')throw new Error('Initiative story canonical mismatch: '+story.slug);
}
const provenanceRecords=[...initiativeImageProvenance.records,...initiativeImageProvenance.projectAssets];
for(const record of provenanceRecords){
  if(!/^[a-z][a-z0-9-]*$/.test(record.id))throw new Error('Invalid Initiative provenance record ID '+record.id);
  if(!Array.isArray(record.localFiles)||record.localFiles.length<1)throw new Error('Initiative provenance record needs local files: '+record.id);
  for(const file of record.localFiles){
    if(!/^assets\/[a-zA-Z0-9_./-]+$/.test(file.path)||file.path.includes('..'))throw new Error('Invalid Initiative provenance asset path '+file.path);
    if(!/^[a-f0-9]{64}$/.test(file.sha256))throw new Error('Invalid Initiative provenance SHA-256 for '+file.path);
    const bytes=await fs.readFile(path.join(root,file.path));
    const actual=createHash('sha256').update(bytes).digest('hex');
    if(actual!==file.sha256)throw new Error('Initiative provenance SHA-256 mismatch for '+file.path);
  }
}
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
await fs.rm(path.join(out,'assets/css'),{recursive:true,force:true});
if(site.indexNow){
  if(!/^[a-f0-9]{32}$/.test(site.indexNow.key))throw new Error('Invalid IndexNow ownership key');
  await write(site.indexNow.key+'.txt',site.indexNow.key+'\n');
}

// The old hero is retained in content/ for reference, but is not displayed.
const visibleBlocks=blocks.filter(block=>block.type!=='hero');
const cssNames=[...new Set(['theme','header',...visibleBlocks.map(b=>b.type),'science','pages','dialogs'])];
const siteStyles=(await Promise.all(cssNames.map(name=>read(`src/styles/${name}.css`)))).join('\n');
await write('assets/css/site.css',siteStyles);
const cssLinks=[`<link rel="stylesheet" href="./assets/css/site.css?v=${digest(siteStyles)}">`];
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

const routeToInitiativeHome=item=>({...item,href:String(item.href).startsWith('#')?'./'+item.href:item.href});
const imageRightsHeader=structuredClone(initiativeHeader);
imageRightsHeader.brand.href='./';
imageRightsHeader.navigation=imageRightsHeader.navigation.map(routeToInitiativeHome);
const imageRightsFooter=structuredClone(initiativeFooter);
imageRightsFooter.groups=imageRightsFooter.groups.map(group=>({...group,links:group.links.map(routeToInitiativeHome)}));
const imageRightsTemplate=await read('src/initiative/image-rights.html');
const imageRightsSlots={
  '{{LANGUAGE}}':initiativeSite.language,
  '{{HEAD}}':renderInitiativeRightsHead(initiativeSite,initiativeImageProvenance,digest(initiativeStyles)),
  '{{HEADER}}':renderInitiativeHeader(imageRightsHeader),
  '{{BODY}}':renderInitiativeImageRights(initiativeImageProvenance),
  '{{FOOTER}}':renderInitiativeFooter(imageRightsFooter),
  '{{APP_VERSION}}':digest(initiativeClient)
};
let imageRightsDocument=imageRightsTemplate;
for(const [slot,value] of Object.entries(imageRightsSlots))imageRightsDocument=imageRightsDocument.replaceAll(slot,value);
if(/\{\{[A-Z_]+\}\}/.test(imageRightsDocument))throw new Error('Unresolved Initiative image-rights template slot');
if((imageRightsDocument.match(/<h1\b/g)||[]).length!==1)throw new Error('initiative/image-rights.html: exactly one H1 required');
await write('initiative/image-rights.html',imageRightsDocument);

const storyTemplate=await read('src/initiative/story.html');
const storiesData=initiativeBlocks.find(block=>block.type==='stories').data;
const storiesIndexSlots={
  '{{STORY_LOCATION}}':renderInitiativeStoriesLocation(initiativeSite),
  '{{LANGUAGE}}':initiativeSite.language,
  '{{HEAD}}':renderInitiativeStoriesHead(initiativeSite,initiativeStoriesIndex,storiesData.cards,digest(initiativeStyles)),
  '{{HEADER}}':renderInitiativeHeader(imageRightsHeader),
  '{{BODY}}':renderInitiativeStoriesIndex(initiativeStoriesIndex,storiesData),
  '{{FOOTER}}':renderInitiativeFooter(imageRightsFooter),
  '{{APP_VERSION}}':digest(initiativeClient)
};
let storiesIndexDocument=storyTemplate;
for(const [slot,value] of Object.entries(storiesIndexSlots))storiesIndexDocument=storiesIndexDocument.replaceAll(slot,value);
if(/\{\{[A-Z_]+\}\}/.test(storiesIndexDocument))throw new Error('Unresolved Initiative stories index slot');
if((storiesIndexDocument.match(/<h1\b/g)||[]).length!==1)throw new Error('initiative/stories.html: exactly one H1 required');
await write('initiative/stories.html',storiesIndexDocument);
for(const story of initiativeStories){
  const storySlots={
    '{{STORY_LOCATION}}':renderInitiativeStoryLocation(initiativeSite,story),
    '{{LANGUAGE}}':initiativeSite.language,
    '{{HEAD}}':renderInitiativeStoryHead(initiativeSite,story,digest(initiativeStyles)),
    '{{HEADER}}':renderInitiativeHeader(imageRightsHeader),
    '{{BODY}}':renderInitiativeStory(story),
    '{{FOOTER}}':renderInitiativeFooter(imageRightsFooter),
    '{{APP_VERSION}}':digest(initiativeClient)
  };
  let storyDocument=storyTemplate;
  for(const [slot,value] of Object.entries(storySlots))storyDocument=storyDocument.replaceAll(slot,value);
  if(/\{\{[A-Z_]+\}\}/.test(storyDocument))throw new Error('Unresolved Initiative story template slot');
  if((storyDocument.match(/<h1\b/g)||[]).length!==1)throw new Error('initiative/'+story.slug+'.html: exactly one H1 required');
  await write('initiative/'+story.slug+'.html',storyDocument);
}

const absolute=p=>new URL(p,site.canonical).href;
const imageMime=src=>src.endsWith('.png')?'image/png':src.endsWith('.webp')?'image/webp':'image/jpeg';
const personId='https://bhoctherapeutics.com/#archil-jaliashvili';
const orgId='https://bhoctherapeutics.com/#organization';
const webId=site.canonical+'#website';
const hero=blocks.find(b=>b.type==='hero').data;
const openingImage=blocks.find(b=>b.type==='audience').data.slides[0].image;
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
  {'@type':'Organization','@id':orgId,name:'BHOC Therapeutics',url:'https://bhoctherapeutics.com/',description:'BHOC Therapeutics connects hemoglobin biology, oxygen delivery and source-linked research across human, veterinary and transplant applications within Precision Oxygen Therapeutics.',email:site.contactEmail,logo:'https://bhoctherapeutics.com/assets/bhoc-biodiversity-logo.png',sameAs:['https://www.linkedin.com/company/bhoc-therapeutics/','https://www.youtube.com/@BHOCTherapeutics','https://bhocvet.com/','https://bhoctransplant.com/']},
  {'@type':'Person','@id':personId,...site.author,affiliation:{'@id':orgId},knowsAbout:site.topics},
  {'@type':'WebSite','@id':webId,name:'BHOC Therapeutics',alternateName:[site.name,...site.alternateNames],url:site.canonical,description:site.description,inLanguage:site.language,datePublished:site.publication.firstPublished,dateModified:site.updated,keywords:seoTerms(site).join(', '),publisher:{'@id':orgId},creator:{'@id':personId}},
  ...(isHome?[{'@type':'ImageObject','@id':site.canonical+'#hero-image',contentUrl:absolute(openingImage.src),caption:openingImage.alt,width:openingImage.width,height:openingImage.height,representativeOfPage:true}]:[]),
  {'@type':meta.schemaType||'WebPage','@id':absolute(pagePath)+'#webpage',url:absolute(pagePath),name:meta.title,description:meta.description,isPartOf:{'@id':webId},inLanguage:site.language,datePublished:meta.datePublished||site.publication.firstPublished,dateModified:meta.dateModified||site.updated,author:{'@id':personId},creator:{'@id':personId},publisher:{'@id':orgId},about:pageTopics(meta).map(name=>({'@type':'Thing',name})),keywords:seoTerms(meta).join(', '),...(meta.schemaType==='Article'?{headline:meta.heading,articleSection:meta.articleSection,mainEntityOfPage:{'@type':'WebPage','@id':absolute(pagePath)},image:absolute(meta.image.src),citation:[meta.sourceLink.href,...meta.referenceGroups.flatMap(group=>group.links.map(item=>item.href))]}:{}),...(isHome?{primaryImageOfPage:{'@id':site.canonical+'#hero-image'}}:{breadcrumb:{'@id':absolute(pagePath)+'#breadcrumb'}})},
  ...(!isHome?[{'@type':'BreadcrumbList','@id':absolute(pagePath)+'#breadcrumb',itemListElement:[{name:meta.breadcrumbs?'BHOC Veterinary':'BHOC Therapeutics',item:site.canonical},...(meta.breadcrumbs||[]).map(item=>({name:item.label,item:absolute(item.href)})),{name:meta.breadcrumbs?meta.navLabel:meta.title,item:absolute(pagePath)}].map((item,index)=>({'@type':'ListItem',position:index+1,...item}))}]:[])
]});

const dialogNames=(await fs.readdir(path.join(root,'content/dialogs'))).filter(name=>name.endsWith('.html')).sort();
const dialogHTML=await Promise.all(dialogNames.map(name=>read('content/dialogs/'+name)));
const extras=`<dialog id="species-dialog" aria-labelledby="species-detail-heading"><button class="dialog-close" aria-label="Close species details">×</button><span class="eyebrow">${esc(labels.speciesEyebrow)}</span><div id="species-detail"></div></dialog><dialog id="all-species-dialog" aria-labelledby="all-species-heading"><button class="dialog-close" aria-label="Close all species">×</button><span id="all-species" class="eyebrow">Explore species</span><h2 id="all-species-heading">${esc(labels.allSpeciesTitle)}</h2><p>${esc(labels.allSpeciesIntro)}</p><div class="all-species-grid"></div><p class="small-copy">${esc(labels.allSpeciesNote)}</p></dialog><dialog id="search-dialog" aria-labelledby="search-heading"><button class="dialog-close" aria-label="Close search">×</button><h2 id="search-heading">${esc(labels.searchHeading)}</h2><label for="site-search">${esc(labels.searchLabel)}</label><input id="site-search" type="search" placeholder="${esc(labels.searchPlaceholder)}" autocomplete="off"><p class="sr-only" id="search-status" aria-live="polite"></p><div id="search-results"></div></dialog>`;
const visibleSearchText=value=>JSON.stringify(value,function(key,item){
  if(key==='seo'||key==='brandMark')return undefined;
  return item;
});

const search=[
  ...Object.entries(species).map(([key,s])=>({title:s.name,category:'Species',text:`${s.text} ${s.context}`,species:key})),
  ...visibleBlocks.filter(b=>b.type!=='pillars').map(b=>({title:b.data.title||(Array.isArray(b.data.heading)?b.data.heading.join(' '):b.data.heading)||'Our initiative',category:'Homepage',text:visibleSearchText(b.data),href:'index.html#'+b.data.id})),
  ...initiativeBlocks.map(block=>({
    title:block.data.title||(Array.isArray(block.data.headingLines)?block.data.headingLines.join(' '):'BHOC Initiative'),
    category:'Initiative',
    text:visibleSearchText(block.data),
    href:'./initiative/#'+block.data.id
  })),
  ...initiativeStories.map(story=>({
    title:story.title,
    category:'Initiative story',
    text:visibleSearchText(story),
    href:'./initiative/'+story.slug+'.html'
  })),
  {title:initiativeStoriesIndex.title,category:'Initiative',text:initiativeStoriesIndex.description,href:'./initiative/stories.html'},
  ...pages.map(page=>({title:page.navLabel,category:'Page',text:visibleSearchText(page),href:page.slug+'.html'})),
  ...dialogHTML.map((html,i)=>({title:html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1].replace(/<[^>]*>/g,' ')||dialogNames[i],category:'Information',text:html.replace(/<[^>]*>/g,' '),dialog:dialogNames[i].replace('.html','')}))
];
const searchData=safeJSON(search);
await write('search-data.json',searchData);
const siteData=safeJSON({species,labels});

const networkHTML=`<nav class="site-network-bar" aria-label="BHOC websites"><span class="network-title">BHOC network</span><div class="network-links">${header.networkLinks.map(item=>item.enabled?`<a class="network-link network-link-enabled" ${attrs(item)} aria-label="Open ${esc(item.label)}">${icon('globe')}<span class="network-label-wide">${esc(item.label)}</span><span class="network-label-compact">${esc(item.compactLabel||item.label)}</span></a>`:`<span class="network-link network-link-disabled" aria-disabled="true" title="Coming soon">${icon('globe')}<span class="network-label-wide">${esc(item.label)}</span><span class="network-label-compact">${esc(item.compactLabel||item.label)}</span></span>`).join('')}</div></nav>`;
const navigationLogo=item=>`<svg class="nav-initiative-logo" viewBox="145 35 965 805" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet"><image href="./${esc(item.logo.src)}" width="1254" height="1254" /></svg>`;
const renderNavigationItem=(item,active)=>{
  const isActive=item.href===active||(item.role==='initiative'&&active==='initiative.html');
  return item.role==='initiative'
    ?`<a class="nav-initiative-entry${isActive?' active':''}" ${attrs(item)}${isActive?' aria-current="page"':''}>${navigationLogo(item)}<span>${esc(item.label)}</span></a>`
    :`<a class="${isActive?'active':'text-link'}" ${attrs(item)}${isActive?' aria-current="page"':''}>${esc(item.label)}</a>`;
};
const renderHeader=active=>`<header class="site-header"><a class="wordmark" href="index.html#home" aria-label="${esc(site.name)} home"><span class="wordmark-top">${[...header.wordmark.letters].map((c,i)=>i===header.wordmark.accentIndex?`<em>${esc(c)}</em>`:esc(c)).join('')}</span><span class="wordmark-meta"><span class="wordmark-division">${esc(header.wordmark.subtitle)}</span><span class="wordmark-expansion">${esc(header.wordmark.expansion)}</span></span></a><nav id="primary-nav" class="primary-nav" aria-label="Main navigation">${header.navigation.map(item=>renderNavigationItem(item,active)).join('')}</nav><button class="icon-button search-toggle" data-open="search-dialog" aria-label="Search this website">${icon('search')}</button><button class="menu-toggle icon-button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span><span></span></button></header>${networkHTML}`;
const renderPageRoute=(label,isHome=false,breadcrumbs=[])=>`<nav class="page-route" aria-label="Current location">${isHome?'':`<a href="index.html">BHOC Veterinary</a><span aria-hidden="true">›</span>`}${breadcrumbs.map(item=>`<a ${attrs(item)}>${esc(item.label)}</a><span aria-hidden="true">›</span>`).join('')}<span aria-current="page">${esc(label)}</span></nav>`;
const formatDate=iso=>{const [year,month,day]=iso.split('-');return `${day} ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][Number(month)-1]} ${year}`};
const footerWordmark=[...header.wordmark.letters].map((letter,index)=>index===header.wordmark.accentIndex?`<span class="oxygen-initial">${esc(letter)}</span>`:esc(letter)).join('');
const renderFooter=()=>{
  const publication=site.publication;
  const updateLabel=publication.updates===1?'update':'updates';
  const socialLinks=site.footer.links.filter(item=>item.icon==='linkedin'||item.icon==='youtube');
  const utilityLinks=site.footer.links.filter(item=>!socialLinks.includes(item));
  const inlineSocials=socialLinks.length?`<span class="footer-inline-socials" role="group" aria-label="BHOC social media">${socialLinks.map(item=>`<a class="footer-inline-social footer-inline-${esc(item.icon)}" ${attrs(item)} aria-label="${esc(item.label)}" title="${esc(item.label)}">${icon(item.icon)}</a>`).join('')}</span>`:'';
  return `<footer class="site-footer"><div class="footer-primary"><div class="footer-brand"><div class="footer-brand-heading"><strong class="footer-wordmark" aria-label="BHOC Veterinary"><span class="footer-bhoc">${footerWordmark}</span><span class="footer-veterinary">VETERINARY</span></strong><span class="footer-expansion">${esc(header.wordmark.expansion)}</span></div>${inlineSocials}</div><nav class="footer-directory" aria-label="Footer navigation">${site.footer.groups.map(group=>`<div class="footer-column"><h2>${esc(group.title)}</h2>${group.links.map(item=>`<a ${attrs(item)}>${esc(item.label)}</a>`).join('')}</div>`).join('')}</nav></div><div class="footer-secondary"><div class="footer-project"><p class="project-attribution">Project lead: <strong>${esc(site.footer.projectLead)}</strong>.</p><p class="footer-note">${esc(site.footer.note)}</p></div><nav class="footer-links" aria-label="Footer links">${utilityLinks.map(item=>`<a class="footer-link" ${attrs(item)}>${item.icon?icon(item.icon):''}<span>${esc(item.label)}</span></a>`).join('')}</nav><p class="footer-publication">First published <time datetime="${esc(publication.firstPublished)}">${formatDate(publication.firstPublished)}</time><span class="footer-separator" aria-hidden="true"> · </span>${publication.updates} ${updateLabel}<span class="footer-separator" aria-hidden="true"> · </span>Last updated <time datetime="${esc(publication.lastUpdated)}">${formatDate(publication.lastUpdated)}</time><span class="footer-separator" aria-hidden="true"> · </span>Version ${esc(publication.version)}</p><p class="footer-copyright">© ${site.updated.slice(0,4)} ${esc(site.footer.copyright)}</p></div></footer>`;
};
const commonEnd=`${dialogHTML.join('\n')}${extras}<noscript><p class="noscript-note">Interactive search requires JavaScript. The main pages and source links remain available.</p><style>dialog{display:block;position:relative;margin:2rem auto}dialog .dialog-close,#search-dialog,#species-dialog,#all-species-dialog{display:none}.menu-toggle,.search-toggle,.round-control,.carousel-dots,.species-dots,.hero-control,.hero-dots{display:none}.primary-nav{display:flex;position:static}.science-panel[hidden]{display:block!important}</style></noscript>`;
const initiativeSlashRedirect='<script>if(location.pathname.endsWith("/initiative"))location.replace(location.pathname+"/"+location.search+location.hash)</script>';

const renderHead=(meta,pagePath,isHome=false)=>{const socialImage=meta.socialImage||site.socialImage;return `<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#f65c00">
<title>${esc(meta.title)}</title><meta name="description" content="${esc(meta.description)}"><meta name="author" content="${esc(site.author.name)}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><meta name="yandex" content="noindex"><link rel="canonical" href="${esc(absolute(pagePath))}">
<meta property="og:type" content="${meta.schemaType==='Article'?'article':'website'}"><meta property="og:locale" content="en_US"><meta property="og:site_name" content="BHOC Therapeutics"><meta property="og:title" content="${esc(meta.title)}"><meta property="og:description" content="${esc(meta.description)}"><meta property="og:url" content="${esc(absolute(pagePath))}"><meta property="og:image" content="${absolute(socialImage.src)}"><meta property="og:image:secure_url" content="${absolute(socialImage.src)}"><meta property="og:image:type" content="${imageMime(socialImage.src)}"><meta property="og:image:width" content="${socialImage.width}"><meta property="og:image:height" content="${socialImage.height}"><meta property="og:image:alt" content="${esc(socialImage.alt)}">${meta.schemaType==='Article'?`<meta property="article:published_time" content="${esc(meta.datePublished)}"><meta property="article:modified_time" content="${esc(meta.dateModified)}">`:''}
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(meta.title)}"><meta name="twitter:description" content="${esc(meta.description)}"><meta name="twitter:image" content="${absolute(socialImage.src)}"><meta name="twitter:image:alt" content="${esc(socialImage.alt)}">
<link rel="icon" href="./assets/favicon.svg" type="image/svg+xml"><link rel="sitemap" type="application/xml" href="${esc(absolute('sitemap.xml'))}">${isHome?`<link rel="preload" as="image" href="./${esc(openingImage.src)}" type="${imageMime(openingImage.src)}" fetchpriority="high">`:''}
${cssLinks.join('\n')}
<script type="application/ld+json">${safeJSON(graphFor(meta,pagePath,isHome))}</script><script src="https://analytics.ahrefs.com/analytics.js" data-key="E4lNjXqYmHxKeKcqEkSgyg" async></script><script src="./assets/ga4.js?v=20260927" defer></script><script id="site-data" type="application/json" data-search-src="./search-data.json?v=${digest(searchData)}">${siteData}</script><script src="./app.js?v=${digest(client)}" defer></script>
</head>`;};

const documents=new Map();
const homeMeta={title:site.title,description:site.description,schemaType:'WebPage',seo:site.seo};
documents.set('index.html',`<!doctype html><html lang="${esc(site.language)}">${renderHead(homeMeta,'',true)}<body data-page="home"><a class="skip-link" href="#main">Skip to content</a>${await read('src/icons.html')}<div class="site-shell" id="home">${renderHeader('index.html#home')}${renderPageRoute('Home',true)}<main id="main">\n${visibleBlocks.map(b=>`<!-- BLOCK ${b.type}: content/blocks/${b.type}.json -->\n${b.html}`).join('\n')}\n</main>${renderFooter()}</div>${commonEnd}</body></html>\n`);

for(const page of pages){
  const {default:renderPage}=await import('../src/pages/'+page.slug+'.mjs');
  const pageMain=page.slug==='science'?renderPage(page,renderScienceBlock(scienceData)):renderPage(page);
  const routeGuard=page.slug==='initiative'?initiativeSlashRedirect:'';
  documents.set(page.slug+'.html',`<!doctype html><html lang="${esc(site.language)}">${renderHead(page,page.slug+'.html').replace('</head>',routeGuard+'</head>')}<body data-page="${esc(page.slug)}"><a class="skip-link" href="#main">Skip to content</a>${await read('src/icons.html')}<div class="site-shell">${renderHeader(page.navActive||page.slug+'.html')}${renderPageRoute(page.navLabel,false,page.breadcrumbs)}${pageMain}${renderFooter()}</div>${commonEnd}</body></html>\n`);
}

for(const [name,html] of documents){
  if((html.match(/<h1\b/g)||[]).length!==1)throw new Error(`${name}: exactly one H1 required`);
  await write(name,html);
}

for(const name of ['evidence.html','publications.html']){
  await write(name,await read(`content/redirects/${name}`));
}

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
const initiativeHero=initiativeBlocks.find(block=>block.type==='hero').data;
const initiativeMission=initiativeBlocks.find(block=>block.type==='mission-panel').data;
const initiativeFocus=initiativeBlocks.find(block=>block.type==='focus').data;
const initiativeScience=initiativeBlocks.find(block=>block.type==='science-bridge').data;
const initiativeStoriesBlock=initiativeBlocks.find(block=>block.type==='stories')?.data;
const initiativeImages=[...new Map([
  initiativeHeader.brand.image,
  ...initiativeHero.slides.flatMap(slide=>slide.images),
  initiativeMission.image,
  ...initiativeFocus.cards.map(card=>card.image),
  ...(initiativeStoriesBlock?.cards||[]).map(card=>card.image),
  ...(initiativeScience.images||[initiativeScience.image]).filter(Boolean),
  initiativeScience.comparisonGraphic
].map(image=>[image.src,image])).values()];
const registeredInitiativeAssets=new Set(provenanceRecords.flatMap(record=>record.localFiles.map(file=>file.path)));
for(const image of initiativeImages){
  if(!String(image.src).startsWith('assets/'))continue;
  if(!registeredInitiativeAssets.has(image.src))throw new Error('Displayed Initiative image is missing from the provenance register: '+image.src);
}
const sitemapUrls=[
  {path:'',images:imageEntries},
  ...pages.map(page=>({path:page.slug+'.html',images:page.image?[page.image]:[]})),
  {path:'initiative/',images:initiativeImages},
  {path:'initiative/stories.html',images:storiesData.cards.map(card=>card.image)},
  ...initiativeStories.map(story=>({path:'initiative/'+story.slug+'.html',images:story.images}))
];
await write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${sitemapUrls.map(entry=>`<url><loc>${absolute(entry.path)}</loc><lastmod>${site.updated}</lastmod>${entry.images.map(image=>`<image:image><image:loc>${absolute(image.src)}</image:loc></image:image>`).join('')}</url>`).join('')}</urlset>\n`);
await write('robots.txt',`User-agent: *\nAllow: /\nSitemap: ${absolute('sitemap.xml')}\n`);
await write('CNAME',new URL(site.canonical).hostname+'\n');
await write('.nojekyll','');
await write('404.html',await read('404.html'));
console.log(`Built ${blocks.length} homepage blocks, ${pages.length} inner pages and ${initiativeStories.length} Initiative stories to ${path.relative(root,out)||'.'}.`);
