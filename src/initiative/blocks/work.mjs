import {esc,linkAttrs} from '../lib.mjs';

export default function renderWork(data){
  const cards=data.cards.map(card=>{
    const body='<span class="work-icon" aria-hidden="true">'+esc(card.symbol)+'</span>'+
      '<h3>'+esc(card.title)+'</h3>'+
      '<p>'+esc(card.text)+'</p>';
    return card.href?'<a class="work-card" '+linkAttrs(card)+'>'+body+'</a>':'<article class="work-card">'+body+'</article>';
  }).join('');
  return '<section class="work compact-section" id="'+esc(data.id)+'" data-block="work" aria-labelledby="work-title">'+
    '<div class="shell">'+
      '<h2 id="work-title">'+esc(data.title)+'</h2>'+
      '<div class="work-grid">'+cards+'</div>'+
    '</div>'+
  '</section>';
}
