import {esc,initiativeImage,lines} from '../lib.mjs';

export default function renderChallenge(data){
  const cards=data.cards.map(card=>[
    '<article class="challenge-card">',
    '  '+initiativeImage(card.image),
    '  <div><h3>'+esc(card.title)+'</h3><p>'+esc(card.text)+'</p></div>',
    '</article>'
  ].join('\n')).join('\n');
  return [
    '<section class="challenge compact-section" id="'+esc(data.id)+'" data-block="challenge" aria-labelledby="challenge-title">',
    '  <div class="shell">',
    '    <header class="section-heading challenge-heading">',
    '      <h2 id="challenge-title">'+esc(data.title)+'</h2>',
    '      <p>'+esc(data.intro)+'</p>',
    '    </header>',
    '',
    '    <div class="challenge-grid">',
    cards,
    '      <blockquote class="challenge-quote">',
    '        <span aria-hidden="true">“</span>',
    '        '+lines(data.quoteLines),
    '      </blockquote>',
    '    </div>',
    '  </div>',
    '</section>'
  ].join('\n');
}
