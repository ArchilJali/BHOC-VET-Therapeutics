const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.primary-nav');

function setMenu(open) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
}

menuButton?.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

navigation?.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 1120) setMenu(false);
});

const rightsDialog = document.querySelector('[data-rights-dialog]');
const rightsOpen = document.querySelector('[data-rights-open]');

rightsOpen?.addEventListener('click', () => {
  if (!rightsDialog) return;
  if (typeof rightsDialog.showModal === 'function') rightsDialog.showModal();
  else rightsDialog.setAttribute('open', '');
});

rightsDialog?.addEventListener('click', (event) => {
  if (event.target === rightsDialog) rightsDialog.close();
});

document.querySelectorAll('[data-hero-carousel]').forEach((carousel) => {
  const slides = [...carousel.querySelectorAll('[data-hero-slide]')];
  const controls = [...carousel.querySelectorAll('[data-hero-target]:not(:disabled)')];
  const art = carousel.querySelector('.hero-art');
  let touchStart = null;

  function activate(slideId, focusControl = false) {
    const target = slides.find((slide) => slide.dataset.heroSlide === slideId);
    if (!target) return;

    slides.forEach((slide) => {
      const active = slide === target;
      slide.hidden = !active;
      slide.classList.toggle('is-active', active);
    });

    controls.forEach((control) => {
      const active = control.dataset.heroTarget === slideId;
      control.classList.toggle('is-active', active);
      control.setAttribute('aria-pressed', String(active));
      if (active && focusControl) control.focus();
    });
  }

  function move(direction) {
    if (controls.length < 2) return;
    const current = Math.max(0, controls.findIndex((control) => control.classList.contains('is-active')));
    const next = (current + direction + controls.length) % controls.length;
    activate(controls[next].dataset.heroTarget, true);
  }

  controls.forEach((control) => {
    control.addEventListener('click', () => activate(control.dataset.heroTarget));
    control.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        move(-1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        move(1);
      }
    });
  });

  art?.addEventListener('touchstart', (event) => {
    touchStart = event.changedTouches[0]?.clientX ?? null;
  }, { passive: true });

  art?.addEventListener('touchend', (event) => {
    if (touchStart === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStart) - touchStart;
    if (Math.abs(distance) > 48) move(distance > 0 ? -1 : 1);
    touchStart = null;
  }, { passive: true });
});

document.querySelectorAll('[data-science-photo-carousel]').forEach((carousel) => {
  const slides = [...carousel.querySelectorAll('[data-science-photo-slide]')];
  const dots = [...carousel.querySelectorAll('[data-science-photo-dot]')];
  const previous = carousel.querySelector('.science-photo-prev');
  const next = carousel.querySelector('.science-photo-next');
  const announcement = carousel.querySelector('[data-science-photo-announcement]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const delay = Math.max(0, Number(carousel.dataset.autoplayMs) || 0);
  let index = 0;
  let timer = null;
  let touchStart = null;
  let hovering = false;
  let focusWithin = false;

  function stop() {
    if (timer) window.clearTimeout(timer);
    timer = null;
  }

  function schedule() {
    stop();
    if (delay && slides.length > 1 && !reducedMotion.matches && !document.hidden && !hovering && !focusWithin) {
      timer = window.setTimeout(() => select(index + 1), delay);
    }
  }

  function select(nextIndex, announce = true) {
    if (!slides.length) return;
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.hidden = !active;
      slide.classList.toggle('is-active', active);
    });
    dots.forEach((dot, dotIndex) => {
      if (dotIndex === index) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    if (announce && announcement) announcement.textContent = 'Wildlife photograph: ' + slides[index].dataset.slideLabel;
    schedule();
  }

  dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => select(dotIndex)));
  previous?.addEventListener('click', () => select(index - 1));
  next?.addEventListener('click', () => select(index + 1));
  carousel.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    select(event.key === 'Home' ? 0 : event.key === 'End' ? slides.length - 1 : index + (event.key === 'ArrowRight' ? 1 : -1));
  });
  carousel.addEventListener('touchstart', (event) => {
    touchStart = event.changedTouches[0] || null;
  }, { passive: true });
  carousel.addEventListener('touchend', (event) => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart.clientX;
    const dy = event.changedTouches[0].clientY - touchStart.clientY;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) select(index + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, { passive: true });
  carousel.addEventListener('mouseenter', () => { hovering = true; stop(); });
  carousel.addEventListener('mouseleave', () => { hovering = false; schedule(); });
  carousel.addEventListener('focusin', () => { focusWithin = true; stop(); });
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) { focusWithin = false; schedule(); }
  });
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener?.('change', schedule);
  schedule();
});

;(() => {
  if (window.__bhocContextLoader) return;
  window.__bhocContextLoader = true;
  const script = document.createElement('script');
  script.src = '/assets/navigation-context.js?v=20260916';
  script.defer = true;
  document.head.appendChild(script);
})();
