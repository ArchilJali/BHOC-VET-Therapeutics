import {esc,attrs,img,button,section} from '../lib/html.mjs';

export default d=>section(d,'science',`
  <div class="science-strip-heading">
    <span class="eyebrow">${esc(d.heading[0])}</span>
    <p>${esc(d.description)}</p>
  </div>
  <div class="science-strip-items">
    ${d.items.map(item=>`<a class="science-strip-card" ${attrs(item)}>${img(item.image,'loading="lazy"')}<span><strong>${esc(item.name)}</strong><small>${esc(item.caption)}</small></span></a>`).join('')}
  </div>
  <div class="science-strip-action">${button(d.button)}</div>`);
