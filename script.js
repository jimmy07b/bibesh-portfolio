/* ══════════════════════════════════════════
   PREMIUM PORTFOLIO — BIBESH ROY
   Clean, Modern, Production-Ready JavaScript
   ══════════════════════════════════════════ */

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── NAVIGATION SCROLL EFFECT ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  // Show/hide scroll to top
  const scrollTop = document.getElementById('scrollTop');
  if (window.scrollY > 500) {
    scrollTop.classList.add('visible');
  } else {
    scrollTop.classList.remove('visible');
  }
});

// ── SECTION REVEAL ANIMATION ──
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealElements = document.querySelectorAll('.reveal');

if (prefersReducedMotion) {
  revealElements.forEach(el => el.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

// ── HERO TERMINAL TYPER ──
function initTerminalTyper() {
  const output = document.getElementById('terminalOutput');
  if (!output) return;

  const reduceMotion = prefersReducedMotion;

  const lines = [
    { prefix: 'root@bibesh:~$ ', prefixClass: 'terminal-card__prompt', value: 'scanning...' },
    { prefix: 'status: ', prefixClass: 'terminal-card__key', value: 'active', valueClass: 'terminal-card__value terminal-card__value--good' },
    { prefix: 'ai: ', prefixClass: 'terminal-card__key', value: 'models synced', valueClass: 'terminal-card__value' },
    { prefix: 'next: ', prefixClass: 'terminal-card__key', value: 'view projects →', valueClass: 'terminal-card__value terminal-card__value--accent' },
  ];

  const cursor = document.createElement('span');
  cursor.className = 'terminal-card__cursor';
  cursor.setAttribute('aria-hidden', 'true');

  function createLine({ prefix, prefixClass, valueClass }) {
    const lineEl = document.createElement('div');
    lineEl.className = 'terminal-card__line';

    const prefixEl = document.createElement('span');
    prefixEl.className = prefixClass;
    prefixEl.textContent = prefix;

    const valueEl = document.createElement('span');
    valueEl.className = valueClass || '';

    lineEl.append(prefixEl, valueEl);
    output.insertBefore(lineEl, cursor);
    return valueEl;
  }

  function resetOutput() {
    output.replaceChildren();
    output.append(cursor);
  }

  function renderStatic() {
    resetOutput();
    lines.forEach(line => {
      const valueEl = createLine(line);
      valueEl.textContent = line.value;
    });
  }

  if (reduceMotion) {
    renderStatic();
    return;
  }

  let lineIndex = 0;

  function typeNextLine() {
    if (lineIndex >= lines.length) {
      window.setTimeout(() => {
        lineIndex = 0;
        resetOutput();
        typeNextLine();
      }, 1600);
      return;
    }

    const line = lines[lineIndex];
    const valueEl = createLine(line);
    const text = line.value;
    let charIndex = 0;

    function typeChar() {
      valueEl.textContent = text.slice(0, charIndex + 1);
      charIndex += 1;

      if (charIndex < text.length) {
        window.setTimeout(typeChar, 26 + Math.random() * 24);
        return;
      }

      lineIndex += 1;
      window.setTimeout(typeNextLine, 360);
    }

    typeChar();
  }

  resetOutput();
  window.setTimeout(typeNextLine, 300);
}

// Trigger hero reveals immediately
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach(el => {
    el.classList.add('visible');
  });

  initTerminalTyper();
});

// ── ACTIVE NAV LINK ──
const navLinks = document.querySelectorAll('.nav__links a');
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => navObserver.observe(section));

// ── MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
let mobileMenu = null;

function createMobileMenu() {
  if (mobileMenu) return;
  
  mobileMenu = document.createElement('div');
  mobileMenu.id = 'mobileMenu';
  mobileMenu.className = 'mobile-menu';
  mobileMenu.setAttribute('role', 'dialog');
  mobileMenu.setAttribute('aria-modal', 'true');
  mobileMenu.setAttribute('aria-label', 'Mobile menu');
  mobileMenu.innerHTML = `
    <button class="mobile-menu__close" type="button" aria-label="Close menu" data-close-menu="true">✕</button>
    <a href="#about" data-close-menu="true">About</a>
    <a href="#what-i-do" data-close-menu="true">Services</a>
    <a href="#experience" data-close-menu="true">Experience</a>
    <a href="#projects" data-close-menu="true">Projects</a>
    <a href="#certs" data-close-menu="true">Certifications</a>
    <a href="#contact" data-close-menu="true">Contact</a>
  `;
  
  document.body.appendChild(mobileMenu);

  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMobileMenu();
    if (e.target && e.target.closest('[data-close-menu="true"]')) closeMobileMenu();
  });
}

function closeMobileMenu() {
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
  }
}

function openMobileMenu() {
  createMobileMenu();
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.querySelector('.mobile-menu__close')?.focus();
}

hamburger.addEventListener('click', openMobileMenu);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileMenu();
});

// ── CONTACT FORM HANDLER ──
function handleContactSubmit(button) {
  const originalHTML = button.innerHTML;
  button.textContent = '✓ Message Sent!';
  button.disabled = true;
  button.style.opacity = '0.7';

  setTimeout(() => {
    button.innerHTML = originalHTML;
    button.disabled = false;
    button.style.opacity = '1';
  }, 3000);
}

// ── SCROLL TO TOP BUTTON ──
const scrollTopBtn = document.getElementById('scrollTop');
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
