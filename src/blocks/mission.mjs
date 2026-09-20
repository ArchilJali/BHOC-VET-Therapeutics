import {attrs,esc,img,button,icon} from '../lib/html.mjs';

const hotspotStyle=hotspot=>[
  `--hotspot-left:${Number(hotspot.left)}%`,
  `--hotspot-top:${Number(hotspot.top)}%`,
  `--hotspot-width:${Number(hotspot.width)}%`,
  `--hotspot-height:${Number(hotspot.height)}%`
].join(';');

export default d=>`<section id="${esc(d.id)}" class="block-mission" data-block="mission" data-block-number="${esc(d.number)}" aria-labelledby="${esc(d.id)}-heading">
  <h2 id="${esc(d.id)}-heading" class="sr-only">${esc(d.heading[0])}</h2>
  <div class="mission-carousel" data-mission-carousel data-autoplay-ms="${Number(d.rotationMs)||0}" tabindex="0">
    <div class="mission-slides">${d.images.map((image,index)=>`<figure class="mission-banner" data-mission-slide data-slide-label="${esc(image.label)}" role="group" aria-roledescription="slide" aria-label="${index+1} of ${d.images.length}: ${esc(image.label)}"${index?' hidden':''}>${img(image,index?'loading="lazy" decoding="async"':'fetchpriority="high" decoding="async"')}${(image.hotspots||[]).map(hotspot=>`<a class="mission-hotspot${hotspot.visible?' mission-hotspot-visible':''}" ${attrs(hotspot)} style="${hotspotStyle(hotspot)}" aria-label="${esc(hotspot.label)}"><span${hotspot.visible?'':' class="sr-only"'}>${esc(hotspot.label)}</span></a>`).join('')}</figure>`).join('')}</div>
    <div class="mission-controls" role="group" aria-label="Choose wildlife landscape">
      <button class="mission-prev" type="button" aria-label="Previous wildlife landscape">${icon('chevron')}</button>
      <div class="mission-dots">${d.images.map((image,index)=>`<button type="button" data-mission-dot="${index}" aria-label="Show ${esc(image.label)}"${index?'':' aria-current="true"'}></button>`).join('')}</div>
      <button class="mission-next" type="button" aria-label="Next wildlife landscape">${icon('chevron')}</button>
    </div>
    <p class="sr-only" data-mission-announcement aria-live="polite"></p>
  </div>
  <div class="mission-bottom">
    <p>${esc(d.description)}</p>
    ${button(d.button)}
  </div>
</section>`;
