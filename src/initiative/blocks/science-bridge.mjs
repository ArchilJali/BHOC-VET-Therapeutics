import {action,esc,initiativeImage,lines,linkAttrs} from '../lib.mjs';

export default function renderScienceBridge(data){
  const statements=data.statements.map(statement=>'<li>'+esc(statement)+'</li>').join('');
  const relatedLinks=data.relatedLinks.map(item=>'<a '+linkAttrs(item)+'><span>'+esc(item.description)+'</span><strong>'+esc(item.label)+'</strong><i aria-hidden="true">→</i></a>').join('');
  const images=data.images||[data.image];
  const slides=images.map((image,index)=>'<figure class="science-photo-slide'+(index===0?' is-active':'')+'" data-science-photo-slide data-slide-label="'+esc(image.label||image.alt)+'" role="group" aria-roledescription="slide" aria-label="'+(index+1)+' of '+images.length+': '+esc(image.label||image.alt)+'"'+(index===0?'':' hidden')+'>'+initiativeImage(image)+'</figure>').join('');
  const controls=images.length>1?'<div class="science-photo-controls" role="group" aria-label="Choose wildlife photograph"><button class="science-photo-arrow science-photo-prev" type="button" aria-label="Previous wildlife photograph">‹</button><div class="science-photo-dots">'+images.map((image,index)=>'<button type="button" data-science-photo-dot="'+index+'" aria-label="Show '+esc(image.label||image.alt)+'"'+(index===0?' aria-current="true"':'')+'></button>').join('')+'</div><button class="science-photo-arrow science-photo-next" type="button" aria-label="Next wildlife photograph">›</button></div>':'';
  return '<section class="science-bridge" id="'+esc(data.id)+'" data-block="science-bridge" aria-labelledby="science-title">'+
    '<div class="shell science-grid">'+
      '<div class="science-copy"><p class="eyebrow">'+esc(data.eyebrow)+'</p><h2 id="science-title">'+lines(data.titleLines)+'</h2><p>'+esc(data.text)+'</p>'+action(data.action)+'</div>'+
      '<div class="science-photo" data-science-photo-carousel data-autoplay-ms="'+(Number(data.rotationMs)||0)+'" tabindex="0">'+slides+controls+'<p class="visually-hidden" data-science-photo-announcement aria-live="polite"></p></div>'+
      '<div class="science-claim"><figure class="science-claim-graphic">'+initiativeImage(data.comparisonGraphic)+'<figcaption class="visually-hidden">'+esc(data.comparisonGraphic.caption)+'</figcaption></figure><div class="science-claim-content"><ul>'+statements+'</ul>'+(data.boundary?'<p class="science-boundary">'+esc(data.boundary)+'</p>':'')+'<p>'+esc(data.caption)+'</p><nav class="science-related-links" aria-label="Explore the BHOC network">'+relatedLinks+'</nav></div></div>'+
    '</div>'+
  '</section>';
}
