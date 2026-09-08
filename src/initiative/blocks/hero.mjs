import {action,esc,initiativeImage,lines} from '../lib.mjs';

export default function renderHero(data){
  const actions=data.actions.map(action).join('\n            ');
  const principles=data.principles.map(item=>'<span><b aria-hidden="true">'+esc(item.symbol)+'</b> '+lines(item.lines)+'</span>').join('\n          ');
  return [
    '<section class="hero" id="'+esc(data.id)+'" data-block="hero" aria-labelledby="hero-title">',
    '  <div class="shell hero-grid">',
    '    <div class="hero-copy">',
    '      <h1 id="hero-title">'+lines(data.headingLines)+'</h1>',
    '      <p class="hero-name">'+esc(data.name)+'</p>',
    '      <p class="hero-tagline">'+esc(data.tagline)+'</p>',
    '      <p class="hero-lead">'+esc(data.lead)+'</p>',
    '      <div class="hero-actions">',
    '        '+actions,
    '      </div>',
    '    </div>',
    '',
    '    <figure class="hero-art">',
    '      '+initiativeImage(data.image,{priority:true,lazy:false}),
    '      <figcaption class="visually-hidden">'+esc(data.caption)+'</figcaption>',
    '    </figure>',
    '',
    '    <div class="hero-principles" aria-label="'+esc(data.principlesLabel)+'">',
    '      '+principles,
    '    </div>',
    '  </div>',
    '</section>'
  ].join('\n');
}
