import {action,esc,initiativeIcon,initiativeImage,lines} from '../lib.mjs';

export default function renderHero(data){
  const actions=data.actions.map(action).join('\n            ');
  const principles=data.principles.map(item=>
    '<div class="hero-principle">'+initiativeIcon(item.icon)+'<span>'+lines(item.labelLines)+'</span></div>'
  ).join('');
  const slides=data.slides.filter(slide=>slide.enabled).map((slide,index)=>{
    const images=slide.images.map((image,imageIndex)=>
      '<figure class="hero-photo hero-photo-'+esc(image.role)+'">'+
        initiativeImage(image,{priority:index===0&&imageIndex===0,lazy:false})+
      '</figure>'
    ).join('');
    return '<div class="hero-slide'+(index===0?' is-active':'')+'" id="hero-slide-'+esc(slide.id)+'" data-hero-slide="'+esc(slide.id)+'"'+(index===0?'':' hidden')+'>'+images+
      '<span class="visually-hidden">'+esc(slide.label)+'</span>'+
    '</div>';
  }).join('');
  const controls=data.controls.map((item,index)=>{
    const usable=item.enabled&&item.slideId;
    return '<button class="hero-dot'+(index===0&&usable?' is-active':'')+'" type="button"'+
      (usable?' data-hero-target="'+esc(item.slideId)+'"':' disabled aria-disabled="true"')+
      ' aria-label="'+esc(item.label)+'"'+(usable?' aria-pressed="'+String(index===0)+'"':'')+'><span></span></button>';
  }).join('');
  return [
    '<section class="hero" id="'+esc(data.id)+'" data-block="hero" data-hero-carousel aria-labelledby="hero-title">',
    '  <div class="shell hero-grid">',
    '    <div class="hero-copy">',
    '      <h1 id="hero-title">'+lines(data.headingLines)+'</h1>',
    '      <p class="hero-tagline">'+esc(data.tagline)+'</p>',
    '      <p class="hero-lead">'+esc(data.lead)+'</p>',
    '      <div class="hero-actions">',
    '        '+actions,
    '      </div>',
    '      <div class="hero-principles" aria-label="Initiative priorities">'+principles+'</div>',
    '    </div>',
    '',
    '    <div class="hero-art" aria-live="polite">',
    '      <p class="hero-promise">'+lines(data.promiseLines)+'</p>',
    '      '+slides,
    '      <p class="hero-closing">'+lines(data.closingLines)+'</p>',
    '    </div>',
    '    <div class="hero-pagination" aria-label="Hero slides">'+controls+'</div>',
    '  </div>',
    '</section>'
  ].join('\n');
}
