/* ============================================================
   Sweet Eats Bakery — main.js
   Handles: navbar scroll, mobile menu, scroll animations
   ============================================================ */

(function () {
  'use strict';

  /* ── Navbar: add 'scrolled' class on scroll ── */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run on load

  /* ── Mobile Menu Toggle ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', String(!isOpen));
      // Prevent body scroll when menu open
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll-triggered entrance animations ── */
  const scrollElements = document.querySelectorAll('[data-scroll]');

  if (scrollElements.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve once visible so it doesn't re-trigger
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    scrollElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── Smooth active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveNavLink() {
    const scrollY = window.scrollY;
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('nav-active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('nav-active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  /* ── Close mobile menu on outside click ── */
  document.addEventListener('click', function (e) {
    if (
      mobileMenu &&
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* ── Gallery card stagger animation on reveal ── */
  const galleryCards = document.querySelectorAll('.gallery-card');
  galleryCards.forEach(function (card, index) {
    card.style.transitionDelay = (index * 0.07) + 's';
  });

  /* ── Service cards stagger ── */
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(function (card, index) {
    card.style.transitionDelay = (index * 0.12) + 's';
  });

  /* ── Video: ensure autoplay on mobile ── */
  const heroVideo = document.querySelector('.video-section video');
  if (heroVideo) {
    heroVideo.play().catch(function () {
      // Autoplay blocked — fine, poster shows
    });
  }

})();
