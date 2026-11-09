// Tell the CSS that JavaScript is running.
// (The sprout starts hidden only when JS works, so it never just disappears.)
document.documentElement.classList.add('js');

// ---------- Mobile menu ----------
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

// Close the menu after tapping a link
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  });
});

// ---------- Grow the sprout when "Currently building" scrolls into view ----------
const nowSection = document.querySelector('#now');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        nowSection.classList.add('is-growing');
        observer.disconnect(); // grow once, then just keep swaying
      }
    });
  }, { threshold: 0.4 }); // start when 40% of the section is visible

  observer.observe(nowSection);
} else {
  // Very old browsers: just show it grown
  nowSection.classList.add('is-growing');
}

// ---------- Click the hero garden to pause / resume the breeze ----------
const garden = document.querySelector('.hero-scene');

function toggleBreeze() {
  const paused = garden.classList.toggle('paused');
  garden.setAttribute('aria-pressed', paused);
  garden.setAttribute('aria-label', paused ? 'Resume the garden breeze' : 'Pause the garden breeze');
  garden.title = paused ? 'Click to resume the breeze' : 'Click to pause the breeze';
}

garden.addEventListener('click', toggleBreeze);

// Keyboard: Enter or Space works like a click, same as a real button
garden.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault(); // stops Space from scrolling the page
    toggleBreeze();
  }
});

// ---------- Click the sprout to make it grow again ----------
const pot = document.querySelector('.sprout-pot');

function regrow() {
  nowSection.classList.remove('is-growing');
  void pot.offsetWidth; // forces the browser to notice the removal before re-adding
  nowSection.classList.add('is-growing');
}

pot.addEventListener('click', regrow);

pot.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    regrow();
  }
});

const logo = document.querySelector('.logo');
const plants = ['#sprig-lavender', '#sprig-sunflower', '#sprig-broccoli', '#sprig-rose'];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const SVG_NS = 'http://www.w3.org/2000/svg';

function dropPlants() {
  // Skip for people who turned off motion, and don't pile up if someone clicks a lot
  if (reduceMotion.matches) return;
  if (document.querySelectorAll('.falling-plant').length > 36) return;

  for (let i = 0; i < 14; i++) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'falling-plant');
    svg.setAttribute('aria-hidden', 'true');

    const use = document.createElementNS(SVG_NS, 'use');
    use.setAttribute('href', plants[i % plants.length]); // cycles through all four plants
    svg.appendChild(use);

    // Each one its own size, starting spot, speed, drift and tilt
    const size = 16 + Math.random() * 12;
    svg.style.width = size + 'px';
    svg.style.height = size * 2 + 'px';
    svg.style.left = Math.random() * 100 + 'vw';
    svg.style.animationDuration = 3 + Math.random() * 2.5 + 's';
    svg.style.animationDelay = Math.random() * 0.8 + 's';
    svg.style.setProperty('--drift', Math.random() * 80 - 40 + 'px');
    svg.style.setProperty('--spin', Math.random() * 60 - 30 + 'deg');

    document.body.appendChild(svg);
    svg.addEventListener('animationend', () => svg.remove()); // clean up after landing
  }
}

logo.addEventListener('click', dropPlants);