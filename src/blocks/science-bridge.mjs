import {attrs,esc,icon,img} from '../lib/html.mjs';

const renderSlide=(slide,index,total)=>`<article class="science-bridge-slide" data-bridge-slide data-slide-label="${esc(slide.label)}" role="group" aria-roledescription="slide" aria-label="${index+1} of ${total}: ${esc(slide.label)}"${index?' hidden':''}>
  <div class="science-bridge-copy">
    <p class="science-bridge-eyebrow">${esc(slide.eyebrow)}</p>
    <h2 id="science-bridge-${esc(slide.id)}-heading">${slide.heading.map(esc).join('<br>')}</h2>
    <p class="science-bridge-description">${esc(slide.description)}</p>
    <a class="science-bridge-action" ${attrs(slide.action)}><span>${esc(slide.action.label)}</span>${icon('arrow')}</a>
  </div>
  <figure class="science-bridge-photo">${img(slide.photo,'loading="lazy" decoding="async"')}</figure>
  <div class="science-bridge-side">
    <figure class="science-bridge-comparison">${img(slide.comparison,'loading="lazy" decoding="async"')}</figure>
    <div class="science-bridge-claims"><ul>${slide.benefits.map(item=>`<li>${esc(item)}</li>`).join('')}</ul><p>${esc(slide.closing)}</p></div>
  </div>
</article>`;

export default d=>{
  const controls=d.slides.length>1?`<div class="science-bridge-controls" role="group" aria-label="Choose Science Bridge visual"><button class="science-bridge-prev" type="button" aria-label="Previous Science Bridge visual">${icon('chevron')}</button><div class="science-bridge-dots">${d.slides.map((slide,index)=>`<button type="button" data-bridge-dot="${index}" aria-label="Show ${esc(slide.label)}"${index?'':' aria-current="true"'}></button>`).join('')}</div><button class="science-bridge-next" type="button" aria-label="Next Science Bridge visual">${icon('chevron')}</button></div>`:'';
  return `<section id="${esc(d.id)}" class="block-science-bridge" data-block="science-bridge" data-block-number="${esc(d.number)}" aria-label="${esc(d.label)}"><div class="science-bridge-carousel" data-bridge-carousel data-autoplay-ms="${Number(d.rotationMs)||0}" tabindex="0">${d.slides.map((slide,index)=>renderSlide(slide,index,d.slides.length)).join('')}${controls}<p class="sr-only" data-bridge-announcement aria-live="polite"></p></div></section>`;
};
