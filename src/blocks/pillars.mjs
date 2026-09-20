import {esc,attrs,img,icon} from '../lib/html.mjs';

export default d=>`<section id="${esc(d.id)}" class="block-pillars" data-block="pillars" data-block-number="${esc(d.number)}" aria-label="${esc(d.label)}">
  <div class="pillars-label">${esc(d.label)}</div>
  <div class="pillars-grid">
    ${d.items.map(p=>`<a class="pillar-card" ${attrs(p)}>
      <span class="pillar-photo">${img(p.image,'loading="lazy" decoding="async"')}</span>
      <span class="pillar-copy">
        <strong>${esc(p.title)}</strong>
        <small>${esc(p.text)}</small>
      </span>
      <span class="pillar-arrow" aria-hidden="true">${icon('arrow')}</span>
    </a>`).join('')}
  </div>
</section>`;
