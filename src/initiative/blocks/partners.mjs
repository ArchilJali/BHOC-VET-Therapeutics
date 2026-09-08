import {esc} from '../lib.mjs';

export default function renderPartners(data){
  const cards=data.items.map(item=>
    '<article>'+
      '<span aria-hidden="true">'+esc(item.symbol)+'</span>'+
      '<div><h3>'+esc(item.title)+'</h3><p>'+esc(item.text)+'</p></div>'+
    '</article>'
  ).join('');
  return '<section class="partners compact-section" id="'+esc(data.id)+'" data-block="partners" aria-labelledby="partners-title">'+
    '<div class="shell partners-layout">'+
      '<div class="partners-content">'+
        '<h2 id="partners-title">'+esc(data.title)+'</h2>'+
        '<div class="partner-grid">'+cards+'</div>'+
      '</div>'+
      '<aside class="partners-callout">'+
        '<strong>'+esc(data.callout.title)+'</strong>'+
        '<p>'+esc(data.callout.text)+'</p>'+
      '</aside>'+
    '</div>'+
  '</section>';
}
