import {esc,linkAttrs} from './lib.mjs';

const formatDate=value=>{
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return esc(value);
  const [year,month,day]=value.split('-');
  return day+' '+['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][Number(month)-1]+' '+year;
};

const dated=value=>/^\d{4}-\d{2}-\d{2}$/.test(value)
  ?'<time datetime="'+esc(value)+'">'+formatDate(value)+'</time>'
  :esc(value);

const localFiles=files=>'<details class="rights-technical"><summary>Local file verification</summary><ul>'+files.map(file=>
  '<li><code>'+esc(file.path)+'</code><span>Introduced '+dated(file.introducedOn)+'</span><span>SHA-256: <code>'+esc(file.sha256)+'</code></span></li>'
).join('')+'</ul></details>';

const recordCard=record=>'<article class="rights-record" id="'+esc(record.id)+'">'+
  '<header><p class="rights-subject">'+esc(record.subject)+'</p><h2>'+esc(record.title)+'</h2></header>'+
  '<dl>'+[
    ['Creator',esc(record.creator)],
    ['Original date',dated(record.originalDate)],
    ['Licence','<a '+linkAttrs({href:record.licenseUrl})+'>'+esc(record.license)+'</a>'],
    ['Source','<a '+linkAttrs({href:record.source})+'>'+esc(record.sourceLabel)+'</a>'],
    ['Source status',esc(record.sourceStatus)],
    ['Verified',dated(record.verifiedOn)],
    ['Used in',esc(record.usedIn.join(' · '))],
    ['Why selected',esc(record.reason)],
    ['Processing',esc(record.modifications)],
    ['Reuse boundary',esc(record.reuse)]
  ].map(([term,value])=>'<div><dt>'+term+'</dt><dd>'+value+'</dd></div>').join('')+'</dl>'+localFiles(record.localFiles)+
'</article>';

const projectCard=record=>'<article class="rights-record rights-project-record" id="'+esc(record.id)+'">'+
  '<header><p class="rights-subject">BHOC project asset</p><h2>'+esc(record.title)+'</h2></header>'+
  '<dl>'+[
    ['Provided by',esc(record.provider)],
    ['Provided',dated(record.providedOn)],
    ['Rights status',esc(record.rightsStatus)],
    ['Why selected',esc(record.reason)],
    ['Processing',esc(record.modifications)]
  ].map(([term,value])=>'<div><dt>'+term+'</dt><dd>'+value+'</dd></div>').join('')+'</dl>'+localFiles(record.localFiles)+
'</article>';

export default function renderImageRights(data){
  return [
    '<main class="rights-page" id="main">',
    '  <section class="rights-intro">',
    '    <div class="shell rights-intro-inner">',
    '      <p class="eyebrow">Legal record</p>',
    '      <h1>'+esc(data.title)+'</h1>',
    '      <p class="rights-deck">'+esc(data.description)+'</p>',
    '      <p>'+esc(data.policy)+'</p>',
    '      <aside class="rights-boundary"><strong>Rights boundary</strong><p>'+esc(data.rightsBoundary)+'</p></aside>',
    '      <p class="rights-updated">Register verified <time datetime="'+esc(data.verifiedOn)+'">'+formatDate(data.verifiedOn)+'</time>.</p>',
    '      <a class="rights-back" href="./">← Return to the Initiative</a>',
    '    </div>',
    '  </section>',
    '  <section class="rights-register" aria-labelledby="third-party-images">',
    '    <div class="shell">',
    '      <header class="rights-section-heading"><p class="eyebrow">Third-party sources</p><h2 id="third-party-images">Photographs</h2></header>',
    '      <div class="rights-grid">'+data.records.map(recordCard).join('')+'</div>',
    '    </div>',
    '  </section>',
    '  <section class="rights-register rights-project-assets" aria-labelledby="project-assets">',
    '    <div class="shell">',
    '      <header class="rights-section-heading"><p class="eyebrow">BHOC-controlled materials</p><h2 id="project-assets">Project assets</h2></header>',
    '      <div class="rights-grid">'+data.projectAssets.map(projectCard).join('')+'</div>',
    '    </div>',
    '  </section>',
    '</main>'
  ].join('\n');
}
