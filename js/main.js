/**
 * Pilkington Floors — Shared Utilities
 * Sticky header, mobile menu, scroll animations, FAQ accordion
 */

/* ============================================================
   Sticky Header
   ============================================================ */

/**
 * Initialises the sticky header behaviour:
 * - Adds/removes `.scrolled` shadow class on scroll
 * - Hamburger button toggles mobile menu
 * - Nav link clicks close the mobile menu
 */
export function initStickyHeader() {
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.mobile-menu-overlay');

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      toggleMobileMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function () {
      closeMobileMenu();
    });
  }

  // Close mobile menu when a nav link is clicked
  const navLinks = document.querySelectorAll('.site-header__nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileMenu();
    });
  });
}

/**
 * Toggles the mobile menu open/closed state.
 * Adds/removes `.menu-open` on nav and body, `.active` on hamburger,
 * and `.active` on the overlay.
 */
export function toggleMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.site-header__nav');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const body = document.body;

  if (!nav) return;

  const isOpen = nav.classList.contains('menu-open');

  if (isOpen) {
    closeMobileMenu();
  } else {
    nav.classList.add('menu-open');
    body.classList.add('menu-open');
    if (hamburger) hamburger.classList.add('active');
    if (overlay) overlay.classList.add('active');
  }
}

/**
 * Closes the mobile menu.
 * Removes `.menu-open` from nav and body, `.active` from hamburger and overlay.
 */
export function closeMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.site-header__nav');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const body = document.body;

  if (nav) nav.classList.remove('menu-open');
  if (body) body.classList.remove('menu-open');
  if (hamburger) hamburger.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
}

/* ============================================================
   Scroll Animations
   ============================================================ */

/**
 * Initialises scroll-triggered animations using IntersectionObserver.
 * Observes elements with `[data-animate]` and `[data-animate-stagger]`.
 * Adds `.animate-in` class when the element enters the viewport,
 * then unobserves it so the animation only fires once.
 */
export function initScrollAnimations() {
  if (typeof IntersectionObserver === 'undefined') return;

  const animateElements = document.querySelectorAll('[data-animate]');
  const staggerElements = document.querySelectorAll('[data-animate-stagger]');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(function (el) {
    observer.observe(el);
  });

  staggerElements.forEach(function (el) {
    observer.observe(el);
  });
}

/* ============================================================
   FAQ Accordion
   ============================================================ */

/**
 * Initialises the FAQ accordion with single-open behaviour.
 * Clicking a question expands its answer and collapses all others.
 * Clicking an already-expanded question collapses it.
 * Uses `aria-expanded` and `aria-controls` attributes for accessibility.
 */
export function initFAQAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      const answerId = question.getAttribute('aria-controls');
      const answer = answerId ? document.getElementById(answerId) : null;

      // Collapse all other FAQ items
      faqQuestions.forEach(function (otherQuestion) {
        if (otherQuestion !== question) {
          otherQuestion.setAttribute('aria-expanded', 'false');
          const otherAnswerId = otherQuestion.getAttribute('aria-controls');
          const otherAnswer = otherAnswerId ? document.getElementById(otherAnswerId) : null;
          if (otherAnswer) {
            otherAnswer.classList.remove('open');
          }
        }
      });

      // Toggle the clicked item
      if (isExpanded) {
        question.setAttribute('aria-expanded', 'false');
        if (answer) answer.classList.remove('open');
      } else {
        question.setAttribute('aria-expanded', 'true');
        if (answer) answer.classList.add('open');
      }
    });
  });
}

/* ============================================================
   Initialisation
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  initStickyHeader();
  initScrollAnimations();
  initFAQAccordion();
});
