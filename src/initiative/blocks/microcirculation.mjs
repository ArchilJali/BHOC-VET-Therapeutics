import {esc,initiativeImage} from '../lib.mjs';

export default function renderMicrocirculation(data){
  const nodes=data.nodes.map((node,index)=>{
    const arrow=index<data.nodes.length-1?'<span class="micro-arrow" aria-hidden="true">→</span>':'';
    return '<div class="micro-node">'+
      initiativeImage(node.image)+
      '<div><strong>'+esc(node.title)+'</strong><span>'+esc(node.text)+'</span></div>'+
      '</div>'+arrow;
  }).join('');
  return [
    '<figure class="microcirculation" id="'+esc(data.id)+'" data-block="microcirculation" aria-label="'+esc(data.ariaLabel)+'">',
    '  <div class="shell microcirculation-inner">',
    '    <div class="micro-copy">',
    '      <strong>'+esc(data.title)+'</strong>',
    '      <span>'+esc(data.text)+'</span>',
    '    </div>',
    '    <div class="micro-flow" role="group" aria-label="'+esc(data.ariaLabel)+'">',
    '      '+nodes,
    '    </div>',
    '  </div>',
    '  <figcaption class="visually-hidden">'+esc(data.caption)+'</figcaption>',
    '</figure>'
  ].join('\n');
}
