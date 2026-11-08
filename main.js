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
