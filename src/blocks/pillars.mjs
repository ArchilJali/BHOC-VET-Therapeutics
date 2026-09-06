import {esc,attrs,icon} from '../lib/html.mjs';
export default d=>`<div id="${esc(d.id)}" class="block-pillars" data-block="pillars" aria-label="Our initiative priorities">${d.items.map(p=>`<a ${attrs(p)}><span class="pillar-icon">${icon(p.icon)}</span><span><strong>${esc(p.title)}</strong><small>${esc(p.text)}</small></span></a>`).join('')}</div>`;
