import {esc,initiativeImage,lines,linkAttrs} from '../lib.mjs';

export default function renderOxygenPlatform(data){
  const evidence='<a '+linkAttrs(data.evidenceLink)+'>'+esc(data.evidenceLink.label)+'</a>';
  const steps=data.steps.map((step,index)=>{
    const className='pathway-step'+(step.className?' '+esc(step.className):'');
    return '<article class="'+className+'">'+
      '<span class="pathway-stage"><b>'+String(index+1).padStart(2,'0')+'</b>'+esc(step.stage)+'</span>'+
      initiativeImage(step.image)+
      '<h3>'+esc(step.title)+'</h3>'+
      '<p>'+esc(step.text)+'</p>'+
      '</article>';
  }).join('');
  return '<section class="oxygen-platform compact-section" id="'+esc(data.id)+'" data-block="oxygen-platform" aria-labelledby="oxygen-title">'+
    '<div class="shell">'+
      '<header class="section-heading oxygen-heading">'+
        '<h2 id="oxygen-title">'+esc(data.title)+'</h2>'+
        '<p>'+esc(data.intro)+' '+evidence+'.</p>'+
      '</header>'+
      '<div class="pathway" aria-label="'+esc(data.pathwayLabel)+'">'+
        '<div class="pathway-intro">'+
          '<strong>'+lines(data.pathwayIntro.titleLines)+'</strong>'+
          '<em>'+lines(data.pathwayIntro.subtitleLines)+'</em>'+
        '</div>'+
        steps+
        '<aside class="science-script">'+lines(data.scienceScriptLines)+'</aside>'+
      '</div>'+
      '<p class="evidence-boundary"><strong>'+esc(data.evidenceBoundary.label)+'</strong> '+esc(data.evidenceBoundary.text)+'</p>'+
    '</div>'+
  '</section>';
}
