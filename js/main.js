/**
 * Minimal JavaScript for subtle interactions
 */

(function() {
  'use strict';

  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  function getStoredTheme() {
    return localStorage.getItem('theme');
  }

  function getPreferredTheme() {
    const stored = getStoredTheme();
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // Initialize theme
  setTheme(getPreferredTheme());

  // Toggle handler
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!getStoredTheme()) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Header hide/show on scroll
  const header = document.getElementById('header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeader() {
    const currentScrollY = window.scrollY;

    // Add shadow when scrolled
    if (currentScrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    // Hide/show header on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.classList.add('header--hidden');
    } else {
      header.classList.remove('header--hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add intersection observer for stagger animations
  const staggerElements = document.querySelectorAll('.stagger > *');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    staggerElements.forEach(el => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });
  }

  // Prefetch pages on hover for faster navigation
  const internalLinks = document.querySelectorAll('a[href$=".html"]');
  const prefetched = new Set();

  internalLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const href = this.getAttribute('href');
      if (!prefetched.has(href)) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        document.head.appendChild(prefetchLink);
        prefetched.add(href);
      }
    }, { once: true });
  });

  // Floating nav scroll spy
  const floatingNav = document.querySelector('.floating-nav');
  if (floatingNav) {
    const navLinks = floatingNav.querySelectorAll('.floating-nav__link');
    const sections = [];

    navLinks.forEach(link => {
      const targetId = link.getAttribute('href').slice(1);
      const section = document.getElementById(targetId);
      if (section) {
        sections.push({ id: targetId, element: section, link: link });
      }
    });

    function updateActiveNav() {
      const scrollY = window.scrollY;
      const offset = 150;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isNearBottom = scrollY + windowHeight >= documentHeight - 50;

      let activeSection = sections[0];

      // If near bottom, highlight last section
      if (isNearBottom && sections.length > 0) {
        activeSection = sections[sections.length - 1];
      } else {
        sections.forEach(section => {
          const sectionTop = section.element.offsetTop - offset;
          if (scrollY >= sectionTop) {
            activeSection = section;
          }
        });
      }

      navLinks.forEach(link => link.classList.remove('floating-nav__link--active'));
      if (activeSection) {
        activeSection.link.classList.add('floating-nav__link--active');
      }
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  // Resume data loading and rendering
  async function loadResumeData() {
    try {
      const response = await fetch('data/resume.json');
      if (!response.ok) throw new Error('Failed to load resume data');
      return await response.json();
    } catch (error) {
      console.error('Error loading resume data:', error);
      return null;
    }
  }

  function renderExperience(experiences, container, cssPrefix, limit) {
    if (!container || !experiences) return;

    const items = limit ? experiences.slice(0, limit) : experiences;

    container.innerHTML = items.map(exp => `
      <div class="${cssPrefix}">
        <div class="${cssPrefix}__header">
          <h3 class="${cssPrefix}__title">${exp.title}</h3>
          <span class="${cssPrefix}__${cssPrefix === 'card' ? 'meta' : 'date'}">${exp.startDate} – ${exp.endDate}</span>
        </div>
        <p class="${cssPrefix}__org">${exp.org}</p>
        <p class="${cssPrefix}__description">${exp.description}</p>
      </div>
    `).join('');
  }

  // Initialize resume data on pages that need it
  async function initResumeData() {
    const indexContainer = document.getElementById('index-experience-container');
    const aboutContainer = document.getElementById('experience-container');

    if (!indexContainer && !aboutContainer) return;

    const data = await loadResumeData();
    if (!data) return;

    if (indexContainer) {
      renderExperience(data.experience, indexContainer, 'work-item', 2);
    }

    if (aboutContainer) {
      renderExperience(data.experience, aboutContainer, 'card');
    }
  }

  initResumeData();

  // Decorative SVG highlights (technical-drawing details)
  // Injected here rather than in markup so every page gets them for free and
  // they vanish gracefully without JS. All are aria-hidden, pure decoration.
  function injectDecorations() {
    const make = (markup) => {
      const tpl = document.createElement('template');
      tpl.innerHTML = markup.trim();
      return tpl.content.firstElementChild;
    };

    // Registration crosshair, flush right on every section header
    const crosshair = `
      <svg class="deco deco-crosshair" viewBox="0 0 12 12" aria-hidden="true">
        <circle class="deco-draw" cx="6" cy="6" r="3.25" pathLength="1"/>
        <line class="deco-draw" x1="6" y1="0" x2="6" y2="2.5" pathLength="1"/>
        <line class="deco-draw" x1="9.5" y1="6" x2="12" y2="6" pathLength="1"/>
        <line class="deco-draw" x1="6" y1="9.5" x2="6" y2="12" pathLength="1"/>
        <line class="deco-draw" x1="0" y1="6" x2="2.5" y2="6" pathLength="1"/>
      </svg>`;
    document.querySelectorAll('.section-header, .section__title').forEach(el => {
      el.setAttribute('data-deco', '');
      el.appendChild(make(crosshair));
    });

    // Viewfinder corners over the portrait
    const corners = `
      <svg class="deco deco-corners" viewBox="0 0 100 100" aria-hidden="true">
        <path class="deco-draw c-tl" d="M8 20 V8 H20" pathLength="1"/>
        <path class="deco-draw c-tr" d="M80 8 H92 V20" pathLength="1"/>
        <path class="deco-draw c-br" d="M92 80 V92 H80" pathLength="1"/>
        <path class="deco-draw c-bl" d="M20 92 H8 V80" pathLength="1"/>
      </svg>`;
    document.querySelectorAll('.portrait').forEach(el => {
      el.setAttribute('data-deco', '');
      el.appendChild(make(corners));
    });

    // Bitstream divider above the footer
    const stream = `
      <svg class="deco deco-stream" viewBox="0 0 600 8" preserveAspectRatio="none" aria-hidden="true">
        <line class="deco-stream__bits" x1="0" y1="4" x2="600" y2="4"/>
        <line class="deco-stream__packets" x1="0" y1="4" x2="600" y2="4"/>
      </svg>`;
    document.querySelectorAll('.footer').forEach(el => {
      el.insertBefore(make(stream), el.firstChild);
    });

    // Draw strokes in as their section scrolls into view
    const targets = document.querySelectorAll('[data-deco]');
    if ('IntersectionObserver' in window) {
      const decoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            decoObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      targets.forEach(el => decoObserver.observe(el));
    } else {
      targets.forEach(el => el.classList.add('is-inview'));
    }
  }

  injectDecorations();

})();
