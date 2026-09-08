import {action,esc,initiativeImage,lines,linkAttrs} from '../lib.mjs';

export default function renderScienceBridge(data){
  const comparison=data.comparison.map(item=>
    '<div class="science-comparison-item">'+initiativeImage(item.image)+'<span><strong>'+esc(item.label)+'</strong><small>'+esc(item.detail)+'</small></span></div>'
  ).join('');
  return '<section class="science-bridge" id="'+esc(data.id)+'" data-block="science-bridge" aria-labelledby="science-title">'+
    '<div class="shell science-grid">'+
      '<div class="science-copy"><p class="eyebrow">'+esc(data.eyebrow)+'</p><h2 id="science-title">'+lines(data.titleLines)+'</h2><p>'+esc(data.text)+'</p>'+action(data.action)+'</div>'+
      '<figure class="science-photo">'+initiativeImage(data.image)+'<figcaption>Photo: <a '+linkAttrs({href:data.image.source})+'>'+esc(data.image.credit)+'</a>, '+esc(data.image.license)+'</figcaption></figure>'+
      '<div class="science-claim"><strong>'+lines(data.claimLines)+'</strong><div class="science-comparison">'+comparison+'</div><p>'+esc(data.caption)+'</p></div>'+
    '</div>'+
  '</section>';
}
