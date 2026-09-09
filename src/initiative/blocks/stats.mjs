import {esc,lines,linkAttrs} from '../lib.mjs';

export default function renderStats(data){
  const metrics=data.metrics.map(item=>
    '<div class="stat"><strong>'+esc(item.value)+'</strong><span>'+lines(item.labelLines)+'</span></div>'
  ).join('');
  const sources=data.sources.map(item=>
    '<a '+linkAttrs(item)+'><strong>'+esc(item.labelLines[0])+'</strong>'+
      (item.labelLines.length>1?'<span>'+lines(item.labelLines.slice(1))+'</span>':'')+'</a>'
  ).join('');
  return '<section class="stats-strip" id="'+esc(data.id)+'" data-block="stats" aria-labelledby="stats-title">'+
    '<div class="shell stats-inner">'+
      '<div class="stats-copy"><p class="eyebrow" id="stats-title">'+esc(data.eyebrow)+'</p><div class="stats-grid">'+metrics+'<p class="stats-promise">'+lines(data.promiseLines)+'</p></div></div>'+
      '<div class="stats-sources"><span>'+esc(data.sourcesLabel)+'</span><div>'+sources+'</div></div>'+
    '</div>'+
  '</section>';
}
