import {esc,initiativeImage} from '../lib.mjs';

export default function renderMicrocirculation(data){
  return [
    '<figure class="microcirculation" id="'+esc(data.id)+'" data-block="microcirculation" aria-label="'+esc(data.ariaLabel)+'">',
    '  <div class="micro-mobile-copy">',
    '    <strong>'+esc(data.title)+'</strong>',
    '    <span>'+esc(data.text)+'</span>',
    '  </div>',
    '  '+initiativeImage(data.image),
    '  <figcaption class="visually-hidden">'+esc(data.caption)+'</figcaption>',
    '</figure>'
  ].join('\n');
}
