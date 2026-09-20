import {action,esc,initiativeIcon,initiativeImage,lines} from '../lib.mjs';

export default function renderMissionPanel(data){
  const features=data.features.map(item=>
    '<article>'+initiativeIcon(item.icon)+'<div><h3>'+esc(item.title)+'</h3><p>'+esc(item.text)+'</p></div></article>'
  ).join('');
  const framework=data.framework?'<article class="framework-context" id="'+esc(data.framework.id)+'" aria-labelledby="framework-context-title">'+
    '<div class="framework-heading"><p class="eyebrow">'+esc(data.framework.eyebrow)+'</p><h3 id="framework-context-title">'+esc(data.framework.title)+'</h3></div>'+
    '<div class="framework-copy">'+data.framework.paragraphs.map(paragraph=>'<p>'+esc(paragraph)+'</p>').join('')+'</div>'+
    '<div class="framework-action">'+action(data.framework.action)+'</div>'+
  '</article>':'';
  return '<section class="mission-panel" id="'+esc(data.id)+'" data-block="mission-panel" aria-labelledby="mission-title">'+
    '<figure class="mission-photo">'+initiativeImage(data.image)+'</figure>'+
    '<div class="mission-copy"><p class="eyebrow">'+esc(data.eyebrow)+'</p><h2 id="mission-title">'+lines(data.titleLines)+'</h2><p>'+esc(data.text)+'</p>'+action(data.action)+'</div>'+
    '<div class="mission-features">'+features+'</div>'+
    framework+
  '</section>';
}
