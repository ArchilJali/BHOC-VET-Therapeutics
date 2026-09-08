import {esc,initiativeImage,lines,linkAttrs} from '../lib.mjs';

export default function renderFocus(data){
  const cards=data.cards.map(card=>{
    const credit=card.credit?
      '<small class="photo-credit">Photo: <a '+linkAttrs(card.credit)+'>'+esc(card.credit.label)+'</a><span aria-hidden="true"> · </span><a '+linkAttrs({href:card.credit.licenseHref})+'>'+esc(card.credit.license)+'</a></small>':'';
    return '<article class="focus-card">'+
      '<a class="focus-card-main" '+linkAttrs(card)+'>'+
        initiativeImage(card.image)+
        '<span class="focus-card-copy">'+
          '<h3>'+lines(card.titleLines)+'</h3>'+
          '<p>'+esc(card.text)+'</p>'+
        '</span>'+
      '</a>'+credit+
    '</article>';
  }).join('');
  return '<section class="focus compact-section" id="'+esc(data.id)+'" data-block="focus" aria-labelledby="focus-title">'+
    '<div class="shell">'+
      '<header class="section-heading inline-heading">'+
        '<div><p class="eyebrow">'+esc(data.title)+'</p><h2 id="focus-title" class="visually-hidden">'+esc(data.title)+'</h2><p>'+esc(data.intro)+'</p></div>'+
        '<a class="focus-more" '+linkAttrs(data.moreLink)+'>'+esc(data.moreLink.label)+' <span aria-hidden="true">→</span></a>'+
      '</header>'+
      '<div class="focus-grid">'+cards+'</div>'+
    '</div>'+
  '</section>';
}
