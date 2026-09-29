import {attrs,esc,icon,img,section} from '../lib/html.mjs';

const renderCompatibility=(d,c)=>`
  <div class="compatibility-banner" aria-labelledby="${esc(d.id)}-compatibility-heading">
    <div class="compatibility-head">
      <div>
        <p class="compatibility-eyebrow">${esc(c.eyebrow)}</p>
        <h2 id="${esc(d.id)}-compatibility-heading">${esc(c.title)}</h2>
      </div>
      <p class="compatibility-intro">${esc(c.intro)}</p>
    </div>
    <div class="compatibility-rbc">
      <div class="compatibility-rbc-title">${esc(c.rbcLabel)} <span>${esc(c.rbcNote)}</span></div>
      <div class="compatibility-facts">
        ${c.facts.map(f=>`<div class="compatibility-fact"><small>${esc(f.label)}</small><b>${esc(f.value)}</b><strong>${esc(f.title)}</strong><span>${esc(f.note)}</span></div>`).join('')}
      </div>
    </div>
    <div class="compatibility-bhoc">
      <div class="compatibility-bhoc-lead">
        <h3><span>BHOC</span>${esc(c.bhoc.title)}</h3>
        <p class="compatibility-claim">${c.bhoc.claim.map(line=>esc(line)).join('<br>')}</p>
      </div>
      <div>
        <p class="compatibility-body">${esc(c.bhoc.body)}</p>
        <div class="compatibility-bhoc-facts">
          ${c.bhoc.facts.map(f=>`<div class="compatibility-bhoc-fact"><b>${esc(f.title)}</b><span>${esc(f.note)}</span></div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;

export default d=>section(d,'companion',`
  <div class="companion-stage">
    <figure class="companion-banner">
      <picture><source media="(max-width: 640px)" srcset="./${esc(d.mobileImage.src)}">${img(d.image,'loading="lazy" decoding="async" class="companion-banner-art"')}</picture>
    </figure>
    <div class="companion-fade" aria-hidden="true"></div>
    <div class="companion-copy">
      <h2 id="${esc(d.id)}-heading">${esc(d.title)}</h2>
      <p class="companion-subtitle">${esc(d.subtitle)}</p>
      <nav class="companion-links" aria-label="Companion Animals routes">${d.links.map(link=>`<a ${attrs(link)}><span>${esc(link.label)}</span>${icon('arrow')}</a>`).join('')}</nav>
    </div>
    <div class="companion-signature">
      ${img(d.signature,'loading="lazy" decoding="async" class="companion-signature-mark"')}
    </div>
    <blockquote class="companion-quote">
      <p>“${esc(d.quote.text)}”</p>
      <cite>— ${esc(d.quote.attribution)}</cite>
    </blockquote>
  </div>
  ${d.compatibility?renderCompatibility(d,d.compatibility):''}`);
