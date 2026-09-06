(() => {
  'use strict';
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const scrollBehavior = () => reducedMotion.matches ? 'instant' : 'smooth';
  const nav = $('#primary-nav');
  const menu = $('.menu-toggle');
  function closeMenu() { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); }
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); nav.classList.toggle('is-open', open); });
  $$('a', nav).forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  window.matchMedia('(min-width: 861px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  let dialogReturnFocus = null;
  function openDialog(id, opener) {
    const target = document.getElementById(id);
    if (!target) return;
    const alreadyOpen = $('dialog[open]');
    if (!alreadyOpen) dialogReturnFocus = opener || document.activeElement;
    if (alreadyOpen) alreadyOpen.close();
    closeMenu();
    target.showModal();
    if (id === 'search-dialog') { renderSearch(''); $('#site-search').value = ''; $('#site-search').focus(); }
    else $('.dialog-close', target)?.focus();
  }
  $$('dialog').forEach(dialog => {
    $('.dialog-close', dialog)?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { const bounds = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close(); });
    dialog.addEventListener('close', () => { if (!$('dialog[open]') && dialogReturnFocus?.isConnected) dialogReturnFocus.focus({ preventScroll: true }); });
  });
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-open]');
    if (trigger) { event.preventDefault(); openDialog(trigger.dataset.open, trigger); }
  });

  const species = {
    dog: { name: 'Dog', sub: 'Companion animals. Comparative biology', text: 'Dogs have multiple blood group antigens. DEA 1 is a key blood group in canine transfusion medicine, alongside other antigen systems. Blood typing and compatibility testing support donor selection.', context: 'Oxyglobin has an FDA approval history for anemia in dogs. This product specific precedent helps frame veterinary oxygen carrier research.', source: 'https://eclinpath.com/hemostasis/transfusion-medicine/blood-types/', sourceLabel: 'Cornell eClinPath: blood types' },
    cat: { name: 'Cat', sub: 'Companion animals. Comparative biology', text: 'The feline AB blood group system includes types A, B and AB. Cats also have other red cell antigens, so AB typing alone does not establish complete transfusion compatibility.', context: 'Shared hemoglobin chemistry coexists with species specific compatibility and clinical requirements.', source: 'https://eclinpath.com/hemostasis/transfusion-medicine/blood-types/', sourceLabel: 'Cornell eClinPath: blood types' },
    camel: { name: 'Camel', sub: 'Adaptation. Comparative biology', text: 'Camels illustrate how mammals adapt to demanding environments while retaining the core hemoglobin based mechanism of oxygen transport.', context: 'Comparative biology helps us ask better research questions. Shared physiology does not establish common dosing, safety or treatment efficacy.', source: 'https://bhoctherapeutics.com/science/', sourceLabel: 'Explore BHOC oxygen delivery science' },
    orangutan: { name: 'Orangutan', sub: 'Forest biodiversity. Conservation', text: 'Orangutans are Critically Endangered. Protecting these great apes connects habitat conservation, animal health and the future of forest ecosystems.', context: 'The BHOC initiative brings species protection into the conversation about future animal health research. This is a conservation focus, not a therapeutic approval claim.', source: 'https://iucn.org/story/202510/move-or-not-move-new-iucn-ssc-guidelines-follow-precautionary-principle-and-prioritise', sourceLabel: 'IUCN: orangutan conservation' },
    panda: { name: 'Giant Panda', sub: 'Species conservation. Biodiversity protection', text: 'The giant panda represents the connection between animal health, habitat protection and the future of biodiversity.', context: 'Different species share a biological need for oxygen. Their physiology and conservation needs guide our research questions.', source: 'https://www.iucnredlist.org/', sourceLabel: 'Explore the IUCN Red List' },
    turtle: { name: 'Marine Turtle', sub: 'Marine biodiversity. Conservation', text: 'Marine turtles face species specific conservation threats. The hawksbill turtle is classified globally as Critically Endangered by the IUCN Red List.', context: 'Marine turtle imagery represents a broader biodiversity mission. Conservation status varies by species and population.', source: 'https://iucn.org/story/202603/guardians-reef-protecting-hawksbill-turtle-arnavon', sourceLabel: 'IUCN: protecting the hawksbill turtle' },
    horse: { name: 'Horse', sub: 'Equine health. Comparative biology', text: 'Horses have distinct red cell blood groups and transfusion requirements. The underlying hemoglobin based transport of oxygen is shared with other mammals.', context: 'Comparative physiology provides a research foundation; each veterinary application still needs its own evidence.', source: 'https://eclinpath.com/hemostasis/transfusion-medicine/blood-types/', sourceLabel: 'Cornell eClinPath: blood types' },
    elephant: { name: 'Elephant', sub: 'Wildlife health. Conservation', text: 'Elephants bring together extraordinary mammalian biology and complex animal health and conservation needs.', context: 'The initiative explores the connection between future veterinary science and species protection, without implying an approved treatment for elephants.', source: 'https://www.iucnredlist.org/', sourceLabel: 'Explore the IUCN Red List' },
    lion: { name: 'Lion', sub: 'Wildlife health. Shared habitats', text: 'Lions illustrate the connection between wildlife health, functioning habitats and the wider web of biodiversity.', context: 'A shared biological need for oxygen inspires comparative research. It does not remove the need for species specific safety and efficacy studies.', source: 'https://www.iucnredlist.org/', sourceLabel: 'Explore the IUCN Red List' }
  };
  function showSpecies(key, opener) {
    const entry = species[key];
    if (!entry) return;
    const content = $('#species-detail');
    content.replaceChildren();
    const original = $(`.species-card[data-species="${key}"] .art-crop, .species-card[data-species="${key}"] .portrait`);
    if (original) { const image = original.cloneNode(true); const visual = document.createElement('div'); visual.className = 'species-detail-visual'; visual.append(image); content.append(visual); }
    const heading = document.createElement('h2'); heading.id = 'species-detail-heading'; heading.textContent = entry.name;
    const sub = document.createElement('p'); sub.className = 'small-copy'; sub.textContent = entry.sub;
    const body = document.createElement('p'); body.textContent = entry.text;
    const context = document.createElement('p'); context.textContent = entry.context;
    const source = document.createElement('a'); source.href = entry.source; source.target = '_blank'; source.rel = 'noopener noreferrer'; source.textContent = `${entry.sourceLabel}`;
    content.append(heading, sub, body, context, source);
    openDialog('species-dialog', opener);
  }
  Object.entries(species).forEach(([key, value]) => { const button = document.createElement('button'); button.textContent = value.name; button.dataset.species = key; $('.all-species-grid').append(button); });
  document.addEventListener('click', event => { const trigger = event.target.closest('[data-species]'); if (trigger) { event.preventDefault(); showSpecies(trigger.dataset.species, trigger); } });

  const track = $('#species-track');
  const prevSpecies = $('.species-prev');
  const nextSpecies = $('.species-next');
  function updateSpeciesControls() {
    const max = track.scrollWidth - track.clientWidth;
    prevSpecies.disabled = track.scrollLeft < 4;
    nextSpecies.disabled = track.scrollLeft >= max - 4;
  }
  function moveSpecies(direction) {
    const card = $('.species-card', track);
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    track.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: scrollBehavior() });
  }
  prevSpecies.addEventListener('click', () => moveSpecies(-1));
  nextSpecies.addEventListener('click', () => moveSpecies(1));
  track.addEventListener('scroll', updateSpeciesControls, { passive: true });
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); moveSpecies(event.key === 'ArrowRight' ? 1 : -1); }
    if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); track.scrollTo({ left: event.key === 'Home' ? 0 : track.scrollWidth, behavior: scrollBehavior() }); }
  });
  track.addEventListener('scrollend', () => { const cards = $$('.species-card', track); const index = Math.round(track.scrollLeft / (cards[0].offsetWidth + (parseFloat(getComputedStyle(track).gap) || 0))); $('#species-announcement').textContent = `${species[cards[Math.min(index, cards.length - 1)].dataset.species].name} and following species`; });
  new ResizeObserver(updateSpeciesControls).observe(track);
  updateSpeciesControls();

  const sciencePanels = $$('.science-panel');
  let scienceIndex = 0;
  function selectScience(index, focus = false) {
    scienceIndex = (index + sciencePanels.length) % sciencePanels.length;
    sciencePanels.forEach((panel, i) => { panel.hidden = i !== scienceIndex; });
    $$('[data-slide]').forEach((dot, i) => { const selected = i === scienceIndex; dot.classList.toggle('selected', selected); if (selected) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current'); });
    $('#discover-announcement').textContent = sciencePanels[scienceIndex].getAttribute('aria-label');
    if (focus) sciencePanels[scienceIndex].focus({ preventScroll: true });
  }
  $$('[data-slide]').forEach(dot => dot.addEventListener('click', () => selectScience(Number(dot.dataset.slide))));
  $('.science-prev').addEventListener('click', () => selectScience(scienceIndex - 1));
  $('.science-next').addEventListener('click', () => selectScience(scienceIndex + 1));
  $('.science-carousel').addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    selectScience(event.key === 'Home' ? 0 : event.key === 'End' ? sciencePanels.length - 1 : scienceIndex + (event.key === 'ArrowRight' ? 1 : -1), true);
  });
  let touchStartX = null;
  let touchStartY = null;
  $('.science-carousel').addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].clientX; touchStartY = event.changedTouches[0].clientY; }, { passive: true });
  $('.science-carousel').addEventListener('touchend', event => { if (touchStartX === null) return; const dx = event.changedTouches[0].clientX - touchStartX; const dy = event.changedTouches[0].clientY - touchStartY; if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) selectScience(scienceIndex + (dx < 0 ? 1 : -1)); touchStartX = null; }, { passive: true });

  const searchIndex = [
    ...Object.entries(species).map(([key, s]) => ({ title: s.name, category: 'Species', text: `${s.name} ${s.text} ${s.context}`, species: key })),
    { title: 'Heme & Chlorophyll', category: 'Science', text: 'heme hemoglobin chlorophyll magnesium iron Fe Mg tetrapyrrole photosynthesis', anchor: '#science' },
    { title: 'Oxygen therapeutics', category: 'Science', text: 'BHOC HBOC Biological Hemoglobin Oxygen Carrier oxygen delivery science tissue microcirculation', dialog: 'science-dialog' },
    { title: 'Veterinary applications & Oxyglobin', category: 'Research', text: 'FDA Oxyglobin dog anemia HBOC approval emergency veterinary applications', dialog: 'applications-dialog' },
    { title: 'Biodiversity context', category: 'Initiative', text: 'biodiversity species statistics conservation IUCN Red List Catalogue Life threatened extinction', anchor: '#biodiversity' },
    { title: 'Our mission', category: 'Initiative', text: 'species biodiversity protection initiative mission one health helping animals nature tomorrow', anchor: '#mission' },
    { title: 'Scientific references', category: 'Evidence', text: 'sources citations scientific references research evidence', dialog: 'references-dialog' },
    { title: 'Contact BHOC Veterinary', category: 'Contact', text: 'contact email collaboration partner investment research company Archil Jaliashvili', dialog: 'contact-dialog' }
  ];
  function renderSearch(query) {
    const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const results = searchIndex.filter(item => tokens.every(token => `${item.title} ${item.text}`.toLowerCase().includes(token)));
    const container = $('#search-results'); container.replaceChildren();
    $('#search-status').textContent = `${results.length} results`;
    if (!results.length) { const p = document.createElement('p'); p.textContent = 'No matches yet. Try oxygen, species or contact.'; container.append(p); return; }
    results.forEach(item => { const button = document.createElement('button'); const name = document.createElement('span'); name.textContent = item.title; const tag = document.createElement('small'); tag.textContent = item.category; button.append(name, tag); button.addEventListener('click', () => { if (item.species) showSpecies(item.species, button); else if (item.dialog) openDialog(item.dialog, button); else { $('#search-dialog').close(); const target = $(item.anchor); target.scrollIntoView({ behavior: scrollBehavior() }); target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); } }); container.append(button); });
  }
  $('#site-search').addEventListener('input', event => renderSearch(event.target.value));

  const hashDialogs = { '#contact': 'contact-dialog', '#about': 'about-dialog', '#initiative': 'about-dialog', '#all-species': 'all-species-dialog', '#applications': 'applications-dialog', '#references': 'references-dialog', '#oxygen-science': 'science-dialog' };
  if (hashDialogs[location.hash]) openDialog(hashDialogs[location.hash]);
  else if (location.hash.startsWith('#species-')) showSpecies(location.hash.slice(9));
  if ('IntersectionObserver' in window) { const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { $$('a', nav).forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)); } }); }, { rootMargin: '-15% 0px -55% 0px' }); ['home', 'science', 'species', 'biodiversity'].forEach(id => observer.observe(document.getElementById(id))); }
})();
