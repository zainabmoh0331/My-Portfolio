// Skill bars: fill when scrolled into view
const fillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.w + '%';
      fillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.fill').forEach((el) => fillObserver.observe(el));

// Sections: fade in on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Mobile menu
const burger = document.getElementById('burger');
const links = document.getElementById('links');
function toggleMenu(open) {
  links.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
}
burger.addEventListener('click', () => toggleMenu(!links.classList.contains('open')));
links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggleMenu(false)));

// Contact form -> opens the email app
document.getElementById('fb').addEventListener('click', () => {
  const name = document.getElementById('fn').value.trim();
  const email = document.getElementById('fe').value.trim();
  const subject = document.getElementById('fs').value.trim();
  const message = document.getElementById('fm').value.trim();
  const note = document.getElementById('fnote');

  if (!name || !email || !message) {
    note.textContent = 'Please fill in your name, email and message.';
    note.style.color = '#c0392b';
    return;
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    note.textContent = 'Please enter a valid email address.';
    note.style.color = '#c0392b';
    return;
  }

  const mailto = 'mailto:zainabmoh0331@gmail.com'
    + '?subject=' + encodeURIComponent(subject || 'Portfolio message from ' + name)
    + '&body=' + encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');

  window.location.href = mailto;
  note.textContent = 'Opening your email app... if nothing opens, email zainabmoh0331@gmail.com directly.';
  note.style.color = '';
});