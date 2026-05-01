# Implementation Plan: Pilkington Floors Portfolio Website

## Overview

Build a multi-page static portfolio website for Pilkington Floors using vanilla HTML5, CSS3, and JavaScript. The site is deployed to GitHub Pages with no build tools or server-side runtime. Form handling uses Formspree. Testing uses Vitest with fast-check for property-based tests and jsdom for DOM simulation.

## Tasks

- [x] 1. Set up project structure, CSS foundation, and test framework
  - [x] 1.1 Create `css/styles.css` with CSS custom properties (colour palette derived from logo, typography using Inter font, spacing scale, component tokens for radius/shadow/transition), CSS reset, and base responsive layout rules (mobile-first, breakpoints at 768px, 1024px, 1440px)
    - Define `:root` variables for `--color-primary`, `--color-primary-dark`, `--color-primary-light`, neutrals, typography, spacing, and component tokens as specified in the design
    - Include base element styles (body, headings, links, buttons, images) and utility classes
    - _Requirements: 13.1, 13.2, 13.5, 12.1_

  - [x] 1.2 Create `vitest.config.js` with jsdom environment and `tests/` include pattern; create `package.json` with Vitest, fast-check, and jsdom as dev dependencies
    - Configure `{ test: { environment: 'jsdom', include: ['tests/**/*.test.js'] } }`
    - _Requirements: Testing infrastructure_

  - [x] 1.3 Create `js/main.js` with shared utilities: `initStickyHeader()` (sticky header with scroll shadow, hamburger toggle, mobile menu open/close, nav link click closes menu), scroll animation via IntersectionObserver for `[data-animate]` elements, and FAQ accordion with single-open behaviour using `aria-expanded`/`aria-controls`
    - Sticky header: attach scroll listener to add/remove shadow class; hamburger button toggles `.menu-open` class; clicking a nav link calls `closeMobileMenu()`
    - Scroll animations: observe `[data-animate]` elements, add `.animate-in` class on intersection, unobserve after triggering
    - FAQ accordion: clicking a question expands its answer and collapses all others; clicking an already-expanded item collapses it; use `aria-expanded` and `aria-controls` attributes
    - Export functions for testability: `toggleMobileMenu`, `closeMobileMenu`, `initFAQAccordion`, `initScrollAnimations`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 13.3, 11.1, 11.2, 11.3_

- [x] 2. Implement Home page and shared page structure
  - [x] 2.1 Create `index.html` with full semantic HTML5 structure: sticky header (logo, nav links, "Get a Free Quote" CTA), hero section (headline, supporting text, CTA button, background image), services summary section with links to Services page, featured portfolio images linking to Portfolio page, testimonials selection, trust indicators (years of experience, completed projects, certifications), FAQ section with minimum 5 questions, footer with contact info and social links, skip navigation link, ARIA landmarks (`role` attributes for header, nav, main, footer), JSON-LD structured data for `HomeAndConstructionBusiness`, unique `<title>` and `<meta name="description">`, Open Graph meta tags
    - Hero CTA button links to `contact.html#quote-form`
    - Include `<link rel="stylesheet" href="css/styles.css">` and script tags for `js/main.js`
    - Add `loading="lazy"` to images below the fold
    - All asset paths must be relative
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 1.1, 1.2, 1.3, 11.1, 11.4, 14.1, 14.2, 14.3, 14.4, 14.5, 14.7, 15.1, 15.2, 15.3, 15.6, 15.7, 16.1, 16.4_

  - [x] 2.2 Create `about.html` with company story, years of experience, core values, Amtico specialisation section, certifications/accreditations section, CTA linking to Contact page, unique meta title/description, Open Graph tags, semantic HTML5, ARIA landmarks, skip nav link
    - All asset paths must be relative
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 14.1, 14.2, 14.3, 14.4, 15.6, 15.7, 16.4_

  - [x] 2.3 Create `services.html` with service cards for Amtico, hardwood, laminate, vinyl, carpet, and commercial flooring; each card has icon/image, title, description, and CTA linking to Quote Form; distinguish residential vs commercial; jargon-free language; unique meta title/description, Open Graph tags, semantic HTML5, ARIA landmarks, skip nav link
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 14.1, 14.2, 14.3, 14.4, 15.6, 15.7, 16.4_

- [x] 3. Checkpoint
  - Ensure the home page, about page, and services page render correctly with shared CSS and sticky header. Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement Portfolio page with gallery, lightbox, and before/after slider
  - [x] 4.1 Create `js/gallery.js` with project data array, `initGallery()` to render responsive thumbnail grid, `filterGallery(category)` to show/hide items with CSS fade/scale transition, filter buttons (All, Hardwood, Laminate, Vinyl, Amtico, Carpet, Commercial, Residential), hover overlay showing project title and category, and `openLightbox(projectId)` / `closeLightbox()` / `navigateLightbox(direction)` for full-screen modal with keyboard support (Escape closes, Left/Right arrows navigate), focus trap, click-outside-to-close, and focus restore on close
    - Lightbox uses `role="dialog"` and `aria-modal="true"` with close button having `aria-label="Close lightbox"`
    - Navigation wraps around: forward from last goes to first, backward from first goes to last
    - Export functions for testability: `filterGallery`, `openLightbox`, `closeLightbox`, `navigateLightbox`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 15.2, 15.3, 15.5_

  - [ ]* 4.2 Write property test for gallery filter correctness
    - **Property 1: Gallery filter returns only matching projects**
    - Generate arbitrary arrays of projects with random category tags and a random filter category; verify filtered results contain only matching projects and no matching project is excluded; verify "All" returns every project
    - **Validates: Requirements 5.4, 5.5**

  - [ ]* 4.3 Write property test for lightbox navigation bounds
    - **Property 2: Lightbox navigation stays within bounds**
    - Generate arbitrary gallery sizes N ≥ 1 and arbitrary current indices; verify forward/backward navigation wraps correctly and result index is always in [0, N-1]
    - **Validates: Requirements 6.6**

  - [x] 4.4 Create `js/slider.js` with `initBeforeAfterSliders()` that finds all `[data-before-after]` elements and attaches pointer event handlers (`pointerdown`, `pointermove`, `pointerup`) to adjust CSS `clip-path` on the before image proportionally to pointer position; compute clip as `clamp(0, X / W, 1)`; support mouse and touch
    - Export the clip computation function for testability
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 12.5_

  - [ ]* 4.5 Write property test for slider clip position
    - **Property 3: Before/After slider clip position is proportional**
    - Generate arbitrary container widths W > 0 and pointer positions X; verify computed clip equals `clamp(0, X / W, 1)`
    - **Validates: Requirements 7.3**

  - [x] 4.6 Create `portfolio.html` with gallery grid, filter controls, at least one before/after slider component, unique meta title/description, Open Graph tags, semantic HTML5, ARIA landmarks, skip nav link, lazy-loaded images with alt text
    - Include script tags for `js/gallery.js` and `js/slider.js`
    - All asset paths must be relative
    - _Requirements: 5.1, 5.2, 5.3, 7.1, 7.5, 14.1, 14.2, 14.3, 14.4, 14.5, 15.6, 15.7, 16.4_

- [x] 5. Checkpoint
  - Ensure gallery filtering, lightbox, and before/after slider work correctly. Run all property tests. Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement Testimonials, Blog, and FAQ pages
  - [x] 6.1 Create `testimonials.html` with minimum 3 testimonial cards (reviewer name, star rating out of 5, review text), structured for future Google Reviews integration, CTA encouraging quote request, unique meta title/description, Open Graph tags, semantic HTML5, ARIA landmarks, skip nav link
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 14.1, 14.2, 14.3, 14.4, 15.6, 15.7, 16.4_

  - [x] 6.2 Create `blog.html` with blog post preview cards (title, excerpt, date, "Read More" link) displayed in reverse chronological order; create `blog/post-1.html` and `blog/post-2.html` as sample blog posts with full content, CTA linking to Quote Form, unique meta title/description, Open Graph tags, semantic HTML5, ARIA landmarks, skip nav link
    - Blog listing sorts posts by date descending
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 14.1, 14.2, 14.3, 14.4, 15.6, 15.7, 16.4_

  - [ ]* 6.3 Write property test for blog post ordering
    - **Property 6: Blog posts are ordered reverse chronologically**
    - Generate arbitrary arrays of blog posts with random date fields; verify after sorting each post's date ≥ the next post's date; verify stable ordering for identical dates
    - **Validates: Requirements 10.4**

  - [ ]* 6.4 Write property test for FAQ single-open invariant
    - **Property 7: FAQ accordion maintains single-open invariant**
    - Generate arbitrary FAQ sections with N ≥ 1 items and arbitrary sequences of clicks; verify after each click at most one item is expanded; verify clicking an expanded item collapses it
    - **Validates: Requirements 11.2, 11.3**

- [x] 7. Implement Contact page with forms and validation
  - [x] 7.1 Create `js/form.js` with `initForms()`, `validateForm(formElement)` returning `{ valid, errors }`, `submitForm(formElement, formspreeUrl)` using `fetch()` POST, `showValidationErrors()`, `clearValidationErrors()`, `showConfirmation()`; validation rules: name required, email required with regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`, phone optional, flooringType required, description required, messageText required; handle Formspree network errors, 429, and 5xx responses with user-friendly messages
    - Export `validateForm` and email validation function for testability
    - _Requirements: 9.3, 9.4, 9.5, 9.6_

  - [ ]* 7.2 Write property test for form validation of required fields
    - **Property 4: Form validation rejects incomplete required fields**
    - Generate arbitrary combinations of form field values where at least one required field is empty/whitespace; verify `validateForm` returns `valid: false` with errors for every empty required field and no errors for correctly filled fields
    - **Validates: Requirements 9.4**

  - [ ]* 7.3 Write property test for email validation
    - **Property 5: Email validation correctly classifies email formats**
    - Generate arbitrary strings; verify the email validation function accepts if and only if the string matches `^[^\s@]+@[^\s@]+\.[^\s@]+$`
    - **Validates: Requirements 9.5**

  - [x] 7.4 Create `contact.html` with Quote Form (name, email, phone, flooring type select, project description, submit button), Contact Form (name, email, message, submit button), phone number, email address, service area info, embedded Google Maps iframe, Instagram link to `https://www.instagram.com/pilkington_floors/`, unique meta title/description, Open Graph tags, semantic HTML5, ARIA landmarks, skip nav link; all form fields have associated `<label>` elements; all asset paths relative
    - Form `action` attributes point to Formspree endpoint
    - Include `_subject` and `_replyto` hidden fields for Formspree
    - Include script tag for `js/form.js`
    - _Requirements: 9.1, 9.2, 9.7, 9.8, 14.1, 14.2, 14.3, 14.4, 15.4, 15.6, 15.7, 16.3, 16.4_

- [x] 8. Checkpoint
  - Ensure form validation, submission flow, and all page content render correctly. Run all property tests. Ensure all tests pass, ask the user if questions arise.

- [x] 9. Implement remaining correctness property tests and unit tests
  - [ ]* 9.1 Write property test for unique meta titles and descriptions
    - **Property 8: Each page has unique meta title and description**
    - Collect `<title>` and `<meta name="description">` from all HTML pages; verify no two pages share the same title or description
    - **Validates: Requirements 14.2**

  - [ ]* 9.2 Write property test for image alt text
    - **Property 9: All images have non-empty alt text**
    - Parse all `<img>` elements across all pages; verify each has a present, non-empty, non-whitespace-only `alt` attribute
    - **Validates: Requirements 14.4**

  - [ ]* 9.3 Write property test for form field labels
    - **Property 10: All form fields have associated labels**
    - Parse all `<input>`, `<select>`, `<textarea>` elements across all pages; verify each has an associated `<label>` via `for`/`id` pair or by being a descendant of a `<label>`
    - **Validates: Requirements 15.4**

  - [ ]* 9.4 Write property test for relative asset paths
    - **Property 11: All internal asset paths are relative**
    - Parse all `src` and `href` attributes on `<img>`, `<script>`, `<link>`, and internal `<a>` elements across all pages; verify paths are relative (not starting with `/` or `http://`/`https://`), excluding intentional external URLs (Formspree, Google Maps, Instagram, Google Fonts CDN)
    - **Validates: Requirements 16.4**

  - [ ]* 9.5 Write unit tests for sticky header behaviour
    - Test that header contains logo, all 7 nav links, and CTA button; test hamburger toggle opens/closes mobile menu; test nav link click closes mobile menu
    - _Requirements: 1.1, 1.4, 1.5, 1.6_

  - [ ]* 9.6 Write unit tests for gallery, lightbox, and slider edge cases
    - Test specific filter selections return correct projects; test lightbox open/close, Escape key, click outside, focus trap and restore; test slider boundary positions (0%, 100%); test empty gallery state
    - _Requirements: 5.4, 6.1, 6.4, 6.5, 7.3_

  - [ ]* 9.7 Write unit tests for form validation edge cases
    - Test specific valid/invalid inputs; test phone number is optional; test confirmation message display; test Formspree error handling (network error, 429, 5xx)
    - _Requirements: 9.4, 9.5, 9.6_

- [x] 10. SEO assets, responsive polish, and final wiring
  - [x] 10.1 Create `sitemap.xml` listing all pages (index.html, about.html, services.html, portfolio.html, testimonials.html, blog.html, blog/post-1.html, blog/post-2.html, contact.html) and `robots.txt` with crawl directives
    - _Requirements: 14.8_

  - [x] 10.2 Create `README.md` with GitHub Pages deployment instructions including how to enable Pages in repo settings, expected URL structure, and Formspree configuration steps
    - _Requirements: 16.5_

  - [x] 10.3 Review and ensure all pages have consistent responsive behaviour: no horizontal scrolling at any width from 320px to 2560px, gallery grid adjusts columns by screen width, forms stack vertically at ≤768px, CTA buttons have minimum 44px touch targets, all hover effects and animations are consistent across pages
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.6, 13.3, 13.4, 13.5_

- [x] 11. Final checkpoint
  - Run all tests (property-based and unit). Verify all HTML pages have correct semantic structure, unique meta tags, alt text on all images, associated labels on all form fields, and relative asset paths. Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate the 11 universal correctness properties defined in the design document
- Unit tests validate specific examples and edge cases
- All JavaScript modules export key functions for testability
- Vitest with jsdom environment is used for all tests; fast-check for property-based tests with minimum 100 iterations per property
