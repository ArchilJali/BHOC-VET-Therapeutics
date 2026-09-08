import {esc,initiativeImage,lines,linkAttrs} from '../lib.mjs';

export default function renderFocus(data){
  const cards=data.cards.map(card=>
    '<a class="focus-card" '+linkAttrs(card)+'>'+
      initiativeImage(card.image)+
      '<h3>'+lines(card.titleLines)+'</h3>'+
      '<p>'+esc(card.text)+'</p>'+
    '</a>'
  ).join('');
  return '<section class="focus compact-section" id="'+esc(data.id)+'" data-block="focus" aria-labelledby="focus-title">'+
    '<div class="shell">'+
      '<header class="section-heading inline-heading">'+
        '<h2 id="focus-title">'+esc(data.title)+'</h2>'+
        '<p>'+esc(data.intro)+'</p>'+
      '</header>'+
      '<div class="focus-grid">'+cards+'</div>'+
    '</div>'+
  '</section>';
}
