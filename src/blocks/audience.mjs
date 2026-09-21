import {esc,attrs,icon,img,section} from '../lib/html.mjs';

export default d=>{const multiple=d.slides.length>1;const heading=Array.isArray(d.headingLines)&&d.headingLines.length?d.headingLines.map(line=>`<span class="audience-heading-line">${esc(line)}</span>`).join(''):esc(d.heading);return section(d,'audience',`
  <div class="audience-copy">
    <p class="eyebrow">${esc(d.eyebrow)}</p>
    <h2 id="${esc(d.id)}-heading">${heading}</h2>
    <p class="audience-lead">${esc(d.lead)}</p>
    <p class="audience-text">${esc(d.text)}</p>
    <nav class="audience-links" aria-label="Veterinary routes">${d.links.map((link,index)=>`<a class="${index===0?'button':'audience-text-link'}" ${attrs(link)}>${esc(link.label)} ${icon('arrow')}</a>`).join('')}</nav>
    <div class="audience-roles" aria-label="Who BHOC Veterinary is for">${d.roles.map(role=>`<span>${esc(role)}</span>`).join('')}</div>
  </div>
  <div class="audience-carousel${multiple?' is-carousel':''}"${multiple?` data-audience-carousel data-autoplay-ms="${Number(d.rotationMs)||0}" aria-roledescription="carousel" tabindex="0"`:''} role="region" aria-label="Veterinary care illustration">
    <div class="audience-slides">
      ${d.slides.map((slide,index)=>`<figure class="audience-art"${multiple?` data-audience-slide data-slide-label="${esc(slide.label)}" role="group" aria-roledescription="slide" aria-label="${index+1} of ${d.slides.length}: ${esc(slide.label)}"${index?' hidden':''}`:''}>${img(slide.image,index?'loading="lazy"':'loading="eager"')}</figure>`).join('')}
    </div>
    ${multiple?`<div class="audience-dots" role="group" aria-label="Veterinary illustrations">
      ${d.slides.map((slide,i)=>`<button type="button" data-audience-dot="${i}" aria-label="Show ${esc(slide.label)}"${i===0?' aria-current="true"':''}></button>`).join('')}
    </div><p class="sr-only" data-audience-announcement aria-live="polite"></p>`:''}
  </div>`);};
