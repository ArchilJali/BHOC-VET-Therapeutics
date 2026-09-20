import {attrs,esc,icon,img,section} from '../lib/html.mjs';

export default d=>section(d,'companion',`
  <div class="companion-stage">
    <figure class="companion-banner">
      <picture><source media="(max-width: 640px)" srcset="./${esc(d.mobileImage.src)}">${img(d.image,'loading="lazy" decoding="async" class="companion-banner-art"')}</picture>
    </figure>
    <div class="companion-fade" aria-hidden="true"></div>
    <div class="companion-copy">
      <h2 id="${esc(d.id)}-heading">${esc(d.title)}</h2>
      <p class="companion-subtitle">${esc(d.subtitle)}</p>
      <p class="companion-supporting">${esc(d.supporting)}</p>
      <nav class="companion-links" aria-label="Companion Animals routes">${d.links.map(link=>`<a ${attrs(link)}><span>${esc(link.label)}</span>${icon('arrow')}</a>`).join('')}</nav>
    </div>
    <div class="companion-signature">
      ${img(d.signature,'loading="lazy" decoding="async" class="companion-signature-mark"')}
      <p>${esc(d.signature.text)}</p>
    </div>
    <blockquote class="companion-quote">
      <p>“${esc(d.quote.text)}”</p>
      <cite>— ${esc(d.quote.attribution)}</cite>
    </blockquote>
  </div>`);
