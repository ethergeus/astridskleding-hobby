const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) closeMenu();
});
const galleryItems = document.querySelectorAll('.gallery-item');
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(filter => {
      filter.classList.toggle('active', filter === button);
      filter.setAttribute('aria-pressed', String(filter === button));
    });
    galleryItems.forEach(item => {
      item.hidden = button.dataset.filter !== 'all' && item.dataset.category !== button.dataset.filter;
    });
  });
});
const lightbox = document.querySelector('.lightbox');
galleryItems.forEach(item => item.addEventListener('click', () => {
  lightbox.querySelector('img').src = item.dataset.image;
  lightbox.querySelector('img').alt = item.querySelector('img').alt;
  lightbox.querySelector('p').textContent = item.dataset.caption;
  lightbox.showModal();
  document.body.style.overflow = 'hidden';
}));
lightbox.querySelector('.close-dialog').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  const bounds = lightbox.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) lightbox.close();
});
lightbox.addEventListener('close', () => { document.body.style.overflow = ''; });
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.animated-detail').forEach(img => { img.dataset.animation = img.getAttribute('src'); });
function updateMotion() {
  document.querySelectorAll('.animated-detail').forEach(img => {
    img.src = reducedMotion.matches ? img.dataset.still : img.dataset.animation;
  });
}
updateMotion();
reducedMotion.addEventListener('change', updateMotion);
document.querySelector('#year').textContent = new Date().getFullYear();
