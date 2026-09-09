import {action,esc,initiativeImage,lines,linkAttrs} from '../lib.mjs';

export default function renderScienceBridge(data){
  const statements=data.statements.map(statement=>'<li>'+esc(statement)+'</li>').join('');
  return '<section class="science-bridge" id="'+esc(data.id)+'" data-block="science-bridge" aria-labelledby="science-title">'+
    '<div class="shell science-grid">'+
      '<div class="science-copy"><p class="eyebrow">'+esc(data.eyebrow)+'</p><h2 id="science-title">'+lines(data.titleLines)+'</h2><p>'+esc(data.text)+'</p>'+action(data.action)+'</div>'+
      '<figure class="science-photo">'+initiativeImage(data.image)+'<figcaption>Photo: <a '+linkAttrs({href:data.image.source})+'>'+esc(data.image.credit)+'</a>, '+esc(data.image.license)+'</figcaption></figure>'+
      '<div class="science-claim"><figure class="science-claim-graphic">'+initiativeImage(data.comparisonGraphic)+'<figcaption class="visually-hidden">'+esc(data.comparisonGraphic.caption)+'</figcaption></figure><div class="science-claim-content"><ul>'+statements+'</ul><p>'+esc(data.caption)+'</p></div></div>'+
    '</div>'+
  '</section>';
}
