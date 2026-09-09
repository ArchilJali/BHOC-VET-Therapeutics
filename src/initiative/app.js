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
