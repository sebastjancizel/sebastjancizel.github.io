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
      const response = await fetch('/data/resume.json');
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
          <span class="${cssPrefix}__date">${exp.startDate} – ${exp.endDate}</span>
        </div>
        <p class="${cssPrefix}__org">${exp.org}</p>
        <p class="${cssPrefix}__description">${exp.description}</p>
      </div>
    `).join('');
  }

  // Initialize resume data on pages that need it
  async function initResumeData() {
    const indexContainer = document.getElementById('experience-container');
    const resumeContainer = document.getElementById('resume-experience-container');

    if (!indexContainer && !resumeContainer) return;

    const data = await loadResumeData();
    if (!data) return;

    if (indexContainer) {
      renderExperience(data.experience, indexContainer, 'work-item', 2);
    }

    if (resumeContainer) {
      renderExperience(data.experience, resumeContainer, 'resume-item');
    }
  }

  initResumeData();

})();
