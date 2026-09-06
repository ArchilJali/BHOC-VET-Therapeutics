import {esc,img,button,section} from '../lib/html.mjs';
// Reusable independent block for a photograph, project update or news item.
export default d=>section(d,'story',`${d.image?`<figure>${img(d.image,'loading="lazy"')}${d.caption?`<figcaption>${esc(d.caption)}</figcaption>`:''}</figure>`:''}<div>${d.eyebrow?`<p class="eyebrow">${esc(d.eyebrow)}</p>`:''}<h2 id="${d.id}-heading">${esc(d.heading)}</h2>${d.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}${d.link?button(d.link):''}</div>`);
