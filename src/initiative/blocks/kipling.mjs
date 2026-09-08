import {esc} from '../lib.mjs';

export default function renderKipling(data){
  return [
    '<section class="kipling" id="'+esc(data.id)+'" data-block="kipling" aria-label="'+esc(data.ariaLabel)+'">',
    '  <div class="shell">',
    '    <blockquote>“'+esc(data.quote)+'”</blockquote>',
    '    <cite>'+esc(data.author)+', <em>'+esc(data.work)+'</em></cite>',
    '  </div>',
    '</section>'
  ].join('\n');
}
