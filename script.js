const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
menu?.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('is-open', !expanded);
});
document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open'); menu?.setAttribute('aria-expanded', 'false');
}));

const billingButtons = document.querySelectorAll('.billing-switch button');
billingButtons.forEach((button) => button.addEventListener('click', () => {
  billingButtons.forEach((item) => item.classList.toggle('active', item === button));
  const annual = button.dataset.rate === 'annual';
  document.querySelectorAll('[data-month]').forEach((price) => { price.textContent = annual ? price.dataset.year : price.dataset.month; });
}));

document.querySelector('.login-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const field = document.querySelector('#email');
  const status = document.querySelector('.form-status');
  if (!field.value || !field.checkValidity()) { status.textContent = 'Digite um e-mail válido para visualizar o fluxo.'; field.focus(); return; }
  status.textContent = 'Tudo certo — esta é uma prévia, então nenhum dado foi enviado.';
});
