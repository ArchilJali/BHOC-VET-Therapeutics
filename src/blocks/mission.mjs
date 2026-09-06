import {esc,lines,img,button,section} from '../lib/html.mjs';
export default d=>section(d,'mission',`<div class="landscape" aria-hidden="true">${img(d.image,'loading="lazy"')}</div><div class="mission-copy"><h2 id="${d.id}-heading">${lines(d.heading)}</h2><p>${esc(d.description)}</p></div>${button(d.button)}`);
