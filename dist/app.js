(() => {
  'use strict';
  const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
  const data=JSON.parse($('#site-data').textContent);
  const motion=()=>matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth';
  const menu=$('.menu-toggle'),nav=$('#primary-nav');
  const closeMenu=()=>{nav?.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Open navigation');};
  menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('is-open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
  nav?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
  matchMedia('(min-width: 1261px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
  const heroCarousel=$('.hero-carousel');
  if(heroCarousel){
    const slides=$$('[data-hero-slide]',heroCarousel),dots=$$('[data-hero-dot]',heroCarousel),prev=$('.hero-prev',heroCarousel),next=$('.hero-next',heroCarousel),announcement=$('#hero-announcement');
    const delay=Math.max(0,Number(heroCarousel.dataset.autoplayMs)||0),reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
    let index=0,timer=null,touchStart=null,hovering=false,focusWithin=false;
    const stop=()=>{if(timer!==null){clearTimeout(timer);timer=null;}};
    const schedule=()=>{stop();if(delay&&slides.length>1&&!reducedMotion.matches&&!document.hidden&&!hovering&&!focusWithin)timer=setTimeout(()=>select(index+1,false),delay);};
    const select=(nextIndex,announce=true)=>{
      index=(nextIndex+slides.length)%slides.length;
      slides.forEach((slide,i)=>{slide.hidden=i!==index;});
      dots.forEach((dot,i)=>{if(i===index)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current');});
      if(announce&&announcement)announcement.textContent=`Hero image: ${slides[index].dataset.slideLabel}`;
      schedule();
    };
    prev?.addEventListener('click',()=>select(index-1));
    next?.addEventListener('click',()=>select(index+1));
    dots.forEach(dot=>dot.addEventListener('click',()=>select(Number(dot.dataset.heroDot))));
    heroCarousel.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();select(e.key==='Home'?0:e.key==='End'?slides.length-1:index+(e.key==='ArrowRight'?1:-1));}});
    heroCarousel.addEventListener('touchstart',e=>{touchStart=e.changedTouches[0];},{passive:true});
    heroCarousel.addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart.clientX,dy=e.changedTouches[0].clientY-touchStart.clientY;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)select(index+(dx<0?1:-1));touchStart=null;},{passive:true});
    heroCarousel.addEventListener('mouseenter',()=>{hovering=true;stop();});
    heroCarousel.addEventListener('mouseleave',()=>{hovering=false;schedule();});
    heroCarousel.addEventListener('focusin',()=>{focusWithin=true;stop();});
    heroCarousel.addEventListener('focusout',e=>{if(!heroCarousel.contains(e.relatedTarget)){focusWithin=false;schedule();}});
    document.addEventListener('visibilitychange',schedule);
    reducedMotion.addEventListener('change',schedule);
    select(0,false);
  }
  const bridgeCarousel=$('[data-bridge-carousel]');
  if(bridgeCarousel){
    const slides=$$('[data-bridge-slide]',bridgeCarousel),dots=$$('[data-bridge-dot]',bridgeCarousel),prev=$('.science-bridge-prev',bridgeCarousel),next=$('.science-bridge-next',bridgeCarousel),announcement=$('[data-bridge-announcement]',bridgeCarousel);
    const delay=Math.max(0,Number(bridgeCarousel.dataset.autoplayMs)||0),reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
    let index=0,timer=null,touchStart=null,hovering=false,focusWithin=false;
    const stop=()=>{if(timer!==null){clearTimeout(timer);timer=null;}};
    const schedule=()=>{stop();if(delay&&slides.length>1&&!reducedMotion.matches&&!document.hidden&&!hovering&&!focusWithin)timer=setTimeout(()=>select(index+1,false),delay);};
    const select=(nextIndex,announce=true)=>{
      if(!slides.length)return;
      index=(nextIndex+slides.length)%slides.length;
      slides.forEach((slide,i)=>{slide.hidden=i!==index;});
      dots.forEach((dot,i)=>{if(i===index)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current');});
      if(announce&&announcement)announcement.textContent=`Science Bridge visual: ${slides[index].dataset.slideLabel}`;
      schedule();
    };
    prev?.addEventListener('click',()=>select(index-1));
    next?.addEventListener('click',()=>select(index+1));
    dots.forEach(dot=>dot.addEventListener('click',()=>select(Number(dot.dataset.bridgeDot))));
    bridgeCarousel.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();select(e.key==='Home'?0:e.key==='End'?slides.length-1:index+(e.key==='ArrowRight'?1:-1));}});
    bridgeCarousel.addEventListener('touchstart',e=>{touchStart=e.changedTouches[0];},{passive:true});
    bridgeCarousel.addEventListener('touchend',e=>{if(!touchStart)return;const dx=e.changedTouches[0].clientX-touchStart.clientX,dy=e.changedTouches[0].clientY-touchStart.clientY;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)select(index+(dx<0?1:-1));touchStart=null;},{passive:true});
    bridgeCarousel.addEventListener('mouseenter',()=>{hovering=true;stop();});
    bridgeCarousel.addEventListener('mouseleave',()=>{hovering=false;schedule();});
    bridgeCarousel.addEventListener('focusin',()=>{focusWithin=true;stop();});
    bridgeCarousel.addEventListener('focusout',e=>{if(!bridgeCarousel.contains(e.relatedTarget)){focusWithin=false;schedule();}});
    document.addEventListener('visibilitychange',schedule);
    reducedMotion.addEventListener('change',schedule);
    select(0,false);
  }
  let returnFocus=null;
  function openDialog(id,opener){
    const dialog=document.getElementById(id);if(!dialog)return;
    const previous=$('dialog[open]');if(!previous)returnFocus=opener||document.activeElement;
    previous?.close();closeMenu();dialog.showModal();
    if(id==='search-dialog'){renderSearch('');$('#site-search').value='';$('#site-search').focus();}else $('.dialog-close',dialog)?.focus();
  }
  $$('dialog').forEach(dialog=>{
    $('.dialog-close',dialog)?.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{const b=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom))dialog.close();});
    dialog.addEventListener('close',()=>{if(!$('dialog[open]')&&returnFocus?.isConnected)returnFocus.focus({preventScroll:true});});
  });
  function showSpecies(key,opener){
    const s=data.species[key],container=$('#species-detail');if(!s||!container)return;
    container.replaceChildren();
    const portrait=$(`.species-card[data-species="${key}"] .portrait`);
    if(portrait){const image=document.createElement('div');image.className='species-detail-visual';image.append(portrait.cloneNode(true));container.append(image);}
    for(const [tag,text,cls] of [['h2',s.name,''],['p',s.sub,'small-copy'],['p',s.text,''],['p',s.context,'']]){const el=document.createElement(tag);el.textContent=text;el.className=cls;if(tag==='h2')el.id='species-detail-heading';container.append(el);}
    const a=document.createElement('a');a.href=s.source;a.textContent=s.sourceLabel;a.target='_blank';a.rel='noopener noreferrer';container.append(a);openDialog('species-dialog',opener);
  }
  const allGrid=$('.all-species-grid');
  if(allGrid)Object.entries(data.species).forEach(([key,s])=>{const b=document.createElement('button');b.dataset.species=key;b.textContent=s.name;allGrid.append(b);});
  document.addEventListener('click',e=>{const s=e.target.closest('[data-species]');if(s){e.preventDefault();showSpecies(s.dataset.species,s);return;}const trigger=e.target.closest('[data-open]');if(trigger){e.preventDefault();openDialog(trigger.dataset.open,trigger);}});
  const track=$('#species-track');
  if(track){
    const cards=$$('.species-card',track),dots=$$('[data-species-start]'),prev=$('.species-prev'),next=$('.species-next');
    let baseIndex=0,activeIndex=0,lastWidth=0,announceTimer;
    const wrap=n=>(n+cards.length)%cards.length;
    const step=()=>cards[0]?.getBoundingClientRect().width+(parseFloat(getComputedStyle(track).gap)||0);
    const current=()=>wrap(baseIndex+Math.round(track.scrollLeft/step()));
    const update=()=>{if(!cards.length)return;activeIndex=current();dots.forEach((dot,i)=>{if(i===activeIndex)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current');});};
    const announce=()=>{if(cards.length)$('#species-announcement').textContent='Row starts with '+$('h3',cards[activeIndex]).textContent;};
    const select=(index,shouldAnnounce=true)=>{
      if(!cards.length)return;
      const focused=track.contains(document.activeElement)?document.activeElement:null;
      baseIndex=wrap(index);
      // Reuse the original links, preserving every portrait and its destination.
      track.append(...cards.slice(baseIndex),...cards.slice(0,baseIndex));
      track.scrollLeft=0;if(focused&&focused!==track)focused.focus({preventScroll:true});
      update();if(shouldAnnounce)announce();
    };
    prev.disabled=next.disabled=cards.length<2;
    prev.addEventListener('click',()=>select(current()-1));next.addEventListener('click',()=>select(current()+1));
    dots.forEach((dot,i)=>dot.addEventListener('click',()=>select(i)));
    track.addEventListener('scroll',()=>{update();clearTimeout(announceTimer);announceTimer=setTimeout(announce,160);},{passive:true});
    track.addEventListener('keydown',e=>{if(cards.length&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){
      e.preventDefault();const focusCard=e.target!==track;
      select(e.key==='Home'?0:e.key==='End'?cards.length-1:current()+(e.key==='ArrowRight'?1:-1));
      if(focusCard)cards[activeIndex].focus({preventScroll:true});
    }});
    new ResizeObserver(()=>{const width=Math.round(track.clientWidth);if(width!==lastWidth){lastWidth=width;select(activeIndex,false);}}).observe(track);
    update();
  }
  const carousel=$('.science-carousel');
  if(carousel){
    const panels=$$('.science-panel',carousel),dots=$$('[data-slide]',carousel);let index=0;
    const select=(n,focus=false)=>{index=(n+panels.length)%panels.length;panels.forEach((p,i)=>p.hidden=i!==index);dots.forEach((d,i)=>{d.classList.toggle('selected',i===index);if(i===index)d.setAttribute('aria-current','true');else d.removeAttribute('aria-current');});$('#discover-announcement').textContent=panels[index].getAttribute('aria-label');if(focus)panels[index].focus({preventScroll:true});};
    dots.forEach(d=>d.addEventListener('click',()=>select(Number(d.dataset.slide))));
    $('.science-prev',carousel).addEventListener('click',()=>select(index-1));$('.science-next',carousel).addEventListener('click',()=>select(index+1));
    carousel.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();select(e.key==='Home'?0:e.key==='End'?panels.length-1:index+(e.key==='ArrowRight'?1:-1),true);}});
    let start=null;carousel.addEventListener('touchstart',e=>{start=e.changedTouches[0];},{passive:true});carousel.addEventListener('touchend',e=>{if(!start)return;const dx=e.changedTouches[0].clientX-start.clientX,dy=e.changedTouches[0].clientY-start.clientY;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)select(index+(dx<0?1:-1));start=null;},{passive:true});
  }
  function renderSearch(query){
    const tokens=query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean),results=data.search.filter(s=>tokens.every(t=>`${s.title} ${s.text}`.toLocaleLowerCase().includes(t)));
    const list=$('#search-results');if(!list)return;list.replaceChildren();$('#search-status').textContent=`${results.length} results`;
    if(!results.length){const p=document.createElement('p');p.textContent=data.labels.noSearchResults;list.append(p);}
    results.forEach(s=>{const b=document.createElement('button'),name=document.createElement('span'),category=document.createElement('small');name.textContent=s.title;category.textContent=s.category;b.append(name,category);b.addEventListener('click',()=>{if(s.species)showSpecies(s.species,b);else if(s.dialog)openDialog(s.dialog,b);else if(s.href)location.href=s.href;else{const target=document.querySelector(s.anchor);if(target){$('#search-dialog').close();target.scrollIntoView({behavior:motion()});target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}}});list.append(b);});
  }
  $('#site-search')?.addEventListener('input',e=>renderSearch(e.target.value));
  const hashes={'#about':'about-dialog','#initiative':'about-dialog','#all-species':'all-species-dialog'};
  const legacyPages={'#contact':'contact.html','#applications':'applications.html','#references':'publications.html','#oxygen-science':'science.html'};
  function openHash(){if(document.body.dataset.page==='home'&&legacyPages[location.hash]){location.replace(legacyPages[location.hash]);return;}if(hashes[location.hash])openDialog(hashes[location.hash]);else if(location.hash.startsWith('#species-'))showSpecies(location.hash.slice(9));}
  openHash();window.addEventListener('hashchange',openHash);
  const contactForm=$('.contact-form');
  contactForm?.addEventListener('submit',e=>{e.preventDefault();const form=new FormData(contactForm),email=contactForm.dataset.contactEmail,subject=`BHOC Veterinary enquiry: ${form.get('area')||'General'}`,body=[`Name: ${form.get('name')||''}`,`Email: ${form.get('email')||''}`,`Organisation: ${form.get('organisation')||''}`,`Area: ${form.get('area')||''}`,'',String(form.get('message')||'')].join('\n');$('.form-status').textContent='Your email application is opening. Review the message and press Send.';location.href=`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;});
  if('IntersectionObserver'in window&&document.body.dataset.page==='home'){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)$$('a',nav).forEach(a=>a.classList.toggle('active',(a.getAttribute('href')||'').endsWith('#'+entry.target.id)));}),{rootMargin:'-15% 0px -55% 0px'});$$('main>section[id]').forEach(s=>observer.observe(s));}
})();
