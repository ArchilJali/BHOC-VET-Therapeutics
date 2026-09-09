import {esc,initiativeImage,lines,linkAttrs} from '../lib.mjs';

export default function renderFocus(data){
  const intro=data.intro?'<p>'+esc(data.intro)+'</p>':'';
  const cards=data.cards.map(card=>{
    return '<article class="focus-card">'+
      '<a class="focus-card-main" '+linkAttrs(card)+'>'+
        initiativeImage(card.image)+
        '<span class="focus-card-copy">'+
          '<h3>'+lines(card.titleLines)+'</h3>'+
          '<p>'+esc(card.text)+'</p>'+
        '</span>'+
      '</a>'+
    '</article>';
  }).join('');
  return '<section class="focus compact-section" id="'+esc(data.id)+'" data-block="focus" aria-labelledby="focus-title">'+
    '<div class="shell">'+
      '<header class="section-heading inline-heading">'+
        '<div><p class="eyebrow">'+esc(data.title)+'</p><h2 id="focus-title" class="visually-hidden">'+esc(data.title)+'</h2>'+intro+'</div>'+
        '<a class="focus-more" '+linkAttrs(data.moreLink)+'>'+esc(data.moreLink.label)+' <span aria-hidden="true">→</span></a>'+
      '</header>'+
      '<div class="focus-grid">'+cards+'</div>'+
    '</div>'+
  '</section>';
}
