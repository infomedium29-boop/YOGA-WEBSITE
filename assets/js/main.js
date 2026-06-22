const toggle = document.querySelector('.menu-toggle');
const links = document.querySelectorAll('.nav-links a');
const closeMenu = () => {
  document.body.classList.remove('menu-open');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
};
if (toggle) {
  toggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  links.forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1180) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('[data-nav]').forEach(link => {
  const href = link.getAttribute('href');
  if (href === path || (path === '' && href === 'index.html')) link.classList.add('active');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const cookie = document.querySelector('.cookie');
const accept = document.querySelector('[data-cookie-accept]');
const reject = document.querySelector('[data-cookie-reject]');
if (cookie && !localStorage.getItem('yoga_cookie_choice')) {
  setTimeout(() => cookie.classList.add('show'), 800);
}
[accept, reject].forEach(btn => {
  if (!btn) return;
  btn.addEventListener('click', () => {
    localStorage.setItem('yoga_cookie_choice', btn.hasAttribute('data-cookie-accept') ? 'accepted' : 'rejected');
    cookie.classList.remove('show');
  });
});

const form = document.querySelector('[data-contact-form]');
if (form) {
  form.addEventListener('submit', () => {
    const submit = form.querySelector('button[type="submit"]');
    if (submit) submit.textContent = 'Otvaram e-mail aplikaciju...';
  });
}
