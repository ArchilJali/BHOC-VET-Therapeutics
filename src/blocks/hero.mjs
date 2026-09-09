import {esc,lines,attrs,img,icon,section} from '../lib/html.mjs';

const bhoc=text=>esc(text).replace('O','<span class="oxygen-initial">O</span>');
const expansion=text=>text.split(/\s+/).map(word=>`<span><strong>${esc(word[0])}</strong>${esc(word.slice(1))}</span>`).join(' ');
const hotspotStyle=hotspot=>[
  `--hotspot-left:${Number(hotspot.left)}%`,
  `--hotspot-top:${Number(hotspot.top)}%`,
  `--hotspot-width:${Number(hotspot.width)}%`,
  `--hotspot-height:${Number(hotspot.height)}%`
].join(';');

const renderSlide=(slide,index,total)=>`<figure class="hero-slide" data-hero-slide data-slide-label="${esc(slide.label)}" role="group" aria-roledescription="slide" aria-label="${index+1} of ${total}: ${esc(slide.label)}"${index===0?'':' hidden'}>${img(slide.image,index===0?'fetchpriority="high" class="hero-art"':'loading="lazy" class="hero-art"')}<figcaption class="sr-only">${esc(slide.accessibleText)}</figcaption>${(slide.hotspots||[]).map(hotspot=>`<a class="hero-hotspot" ${attrs(hotspot)} style="${hotspotStyle(hotspot)}" aria-label="${esc(hotspot.label)}"><span class="sr-only">${esc(hotspot.label)}</span></a>`).join('')}</figure>`;

export default d=>section(d,'hero',`<div class="hero-document-copy sr-only"><h1 id="${d.id}-heading">${lines(d.heading)}</h1><p><strong>${bhoc(d.product.name)}</strong> - ${expansion(d.product.expansion)}</p><p>${esc(d.intent)}</p><p>${esc(d.profile)}</p><p>${esc(d.evidenceNote)}</p><p>${esc(d.initiative.title)}. ${esc(d.initiative.tagline)} ${esc(d.initiative.promise)}</p></div><div class="hero-carousel" role="region" aria-roledescription="carousel" aria-label="BHOC Veterinary Land, Winter and Ocean hero" data-autoplay-ms="${Number(d.rotationMs)||0}" tabindex="0"><div class="hero-slides" id="hero-slides">${d.slides.map((slide,index)=>renderSlide(slide,index,d.slides.length)).join('')}</div><button class="hero-control hero-prev" type="button" aria-label="Previous hero image" aria-controls="hero-slides">${icon('chevron')}</button><button class="hero-control hero-next" type="button" aria-label="Next hero image" aria-controls="hero-slides">${icon('chevron')}</button><div class="hero-dots" role="group" aria-label="Choose hero image">${d.slides.map((slide,index)=>`<button type="button" data-hero-dot="${index}" aria-label="Show ${esc(slide.label)} image" aria-controls="hero-slides"${index===0?' aria-current="true"':''}></button>`).join('')}</div><p class="sr-only" id="hero-announcement" aria-live="polite"></p></div>`);
