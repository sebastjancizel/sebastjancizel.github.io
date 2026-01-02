/**
 * Minimal JavaScript for subtle interactions
 */

(function() {
  'use strict';

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

})();
