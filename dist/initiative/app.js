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
