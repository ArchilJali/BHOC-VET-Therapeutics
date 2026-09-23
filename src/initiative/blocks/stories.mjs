import {esc,initiativeImage,linkAttrs} from '../lib.mjs';

export default function renderStories(data){
  const cards=data.cards.map(card=>
    '<article class="story-card">'+
      '<a class="story-card-link" '+linkAttrs(card)+'>'+
        '<figure class="story-card-image">'+initiativeImage(card.image)+'</figure>'+
        '<div class="story-card-copy">'+
          '<span class="story-card-overline">'+esc(card.overline)+'</span>'+
          '<h3>'+esc(card.title)+'</h3>'+
          '<p>'+esc(card.text)+'</p>'+
          '<span class="story-card-action">'+esc(card.actionLabel)+' <span aria-hidden="true">→</span></span>'+
        '</div>'+
      '</a>'+
    '</article>'
  ).join('');
  return '<section class="stories-matter" id="'+esc(data.id)+'" data-block="stories" aria-labelledby="stories-title">'+
    '<div class="shell stories-matter-inner">'+
      '<header class="stories-matter-heading">'+
        '<div><p class="eyebrow">'+esc(data.eyebrow)+'</p><h2 id="stories-title">'+esc(data.title)+'</h2></div>'+
        '<p>'+esc(data.intro)+'</p>'+
      '</header>'+
      '<div class="stories-track" role="list">'+cards+'</div>'+
    '</div>'+
  '</section>';
}
