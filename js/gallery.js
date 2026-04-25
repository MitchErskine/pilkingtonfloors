/**
 * Pilkington Floors — Gallery, Filtering & Lightbox
 * Portfolio gallery with category filtering, hover overlays,
 * full-screen lightbox with keyboard navigation and focus trap.
 */

/* ============================================================
   Project Data
   ============================================================ */

export const projects = [
  {
    id: 1,
    src: 'images/project-01.jpeg',
    thumb: 'images/project-01.jpeg',
    alt: 'Amtico herringbone flooring installation in a spacious living room',
    category: ['amtico', 'residential'],
    title: 'Herringbone Living Room',
    description: 'Amtico Signature herringbone pattern in a modern living space.'
  },
  {
    id: 2,
    src: 'images/project-02.jpeg',
    thumb: 'images/project-02.jpeg',
    alt: 'Hardwood flooring fitted in an open-plan kitchen and dining area',
    category: ['hardwood', 'residential'],
    title: 'Open-Plan Kitchen',
    description: 'Engineered oak hardwood throughout a bright kitchen-diner.'
  },
  {
    id: 3,
    src: 'images/project-03.jpeg',
    thumb: 'images/project-03.jpeg',
    alt: 'Laminate flooring in a contemporary hallway with natural light',
    category: ['laminate', 'residential'],
    title: 'Contemporary Hallway',
    description: 'Durable laminate with a realistic wood-grain finish.'
  },
  {
    id: 4,
    src: 'images/project-04.jpeg',
    thumb: 'images/project-04.jpeg',
    alt: 'Luxury vinyl tile flooring in a modern bathroom',
    category: ['vinyl', 'residential'],
    title: 'Modern Bathroom',
    description: 'Waterproof luxury vinyl tiles in a stone-effect design.'
  },
  {
    id: 5,
    src: 'images/project-05.jpeg',
    thumb: 'images/project-05.jpeg',
    alt: 'Commercial flooring installation in a busy retail space',
    category: ['vinyl', 'commercial'],
    title: 'Retail Space',
    description: 'Hard-wearing commercial vinyl for high foot traffic.'
  },
  {
    id: 6,
    src: 'images/project-06.jpeg',
    thumb: 'images/project-06.jpeg',
    alt: 'Carpet fitting in a cosy bedroom with soft neutral tones',
    category: ['carpet', 'residential'],
    title: 'Cosy Bedroom',
    description: 'Plush carpet in a warm neutral tone for ultimate comfort.'
  },
  {
    id: 7,
    src: 'images/project-07.jpeg',
    thumb: 'images/project-07.jpeg',
    alt: 'Amtico flooring with decorative border in a dining room',
    category: ['amtico', 'residential'],
    title: 'Dining Room Feature',
    description: 'Amtico with a custom decorative border detail.'
  },
  {
    id: 8,
    src: 'images/project-08.jpeg',
    thumb: 'images/project-08.jpeg',
    alt: 'Hardwood flooring renovation in a period property hallway',
    category: ['hardwood', 'residential'],
    title: 'Period Property Hallway',
    description: 'Restored hardwood flooring in a character-filled entrance.'
  },
  {
    id: 9,
    src: 'images/project-09.jpeg',
    thumb: 'images/project-09.jpeg',
    alt: 'Laminate flooring installed in a bright office space',
    category: ['laminate', 'commercial'],
    title: 'Office Refurbishment',
    description: 'Commercial-grade laminate for a professional workspace.'
  },
  {
    id: 10,
    src: 'images/project-10.jpeg',
    thumb: 'images/project-10.jpeg',
    alt: 'Amtico luxury vinyl flooring in a stylish kitchen',
    category: ['amtico', 'residential'],
    title: 'Stylish Kitchen',
    description: 'Amtico Form stone-effect tiles in a contemporary kitchen.'
  },
  {
    id: 11,
    src: 'images/project-11.jpeg',
    thumb: 'images/project-11.jpeg',
    alt: 'Carpet tiles fitted in a commercial conference room',
    category: ['carpet', 'commercial'],
    title: 'Conference Room',
    description: 'Carpet tiles in a modern commercial meeting space.'
  },
  {
    id: 12,
    src: 'images/project-12.jpeg',
    thumb: 'images/project-12.jpeg',
    alt: 'Vinyl plank flooring in an open-plan apartment living area',
    category: ['vinyl', 'residential'],
    title: 'Apartment Living Area',
    description: 'Vinyl plank flooring with a warm oak finish throughout.'
  }
];

/* ============================================================
   Filter Categories
   ============================================================ */

const FILTER_CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Hardwood', value: 'hardwood' },
  { label: 'Laminate', value: 'laminate' },
  { label: 'Vinyl', value: 'vinyl' },
  { label: 'Amtico', value: 'amtico' },
  { label: 'Carpet', value: 'carpet' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Residential', value: 'residential' }
];

/* ============================================================
   State
   ============================================================ */

let currentFilter = 'all';
let currentLightboxIndex = -1;
let filteredProjects = [...projects];
let triggerElement = null;

/* ============================================================
   Pure Helpers (exported for testability)
   ============================================================ */

/**
 * Computes the navigation index with wrapping.
 * @param {number} currentIndex - Current index in the array
 * @param {number} direction - +1 for next, -1 for previous
 * @param {number} total - Total number of items
 * @returns {number} New index in [0, total - 1]
 */
export function navigateIndex(currentIndex, direction, total) {
  if (total <= 0) return 0;
  return ((currentIndex + direction) % total + total) % total;
}

/* ============================================================
   Gallery Rendering
   ============================================================ */

/**
 * Initialises the gallery: renders filter buttons, thumbnail grid,
 * and lightbox container. Attaches all event listeners.
 */
export function initGallery() {
  const gallerySection = document.querySelector('.gallery-section');
  if (!gallerySection) return;

  const filterContainer = gallerySection.querySelector('.filter-bar');
  const gridContainer = gallerySection.querySelector('.gallery-grid');

  if (filterContainer) {
    renderFilterButtons(filterContainer);
  }

  if (gridContainer) {
    renderGalleryItems(gridContainer);
  }

  createLightboxElement();
}

/**
 * Renders filter buttons into the given container.
 * @param {HTMLElement} container
 */
function renderFilterButtons(container) {
  container.innerHTML = '';

  FILTER_CATEGORIES.forEach(function (cat) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-btn' + (cat.value === 'all' ? ' active' : '');
    btn.textContent = cat.label;
    btn.setAttribute('data-filter', cat.value);
    btn.addEventListener('click', function () {
      filterGallery(cat.value);
    });
    container.appendChild(btn);
  });
}

/**
 * Renders gallery item thumbnails into the given container.
 * @param {HTMLElement} container
 */
function renderGalleryItems(container) {
  container.innerHTML = '';

  projects.forEach(function (project) {
    const item = document.createElement('div');
    item.className = 'gallery-item fade-in';
    item.setAttribute('data-id', project.id);
    item.setAttribute('data-categories', project.category.join(','));
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'View ' + project.title + ' — ' + project.category.join(', '));

    const img = document.createElement('img');
    img.src = project.thumb;
    img.alt = project.alt;
    img.loading = 'lazy';
    img.width = 600;
    img.height = 450;

    const overlay = document.createElement('div');
    overlay.className = 'gallery-item__overlay';

    const title = document.createElement('span');
    title.className = 'gallery-item__title';
    title.textContent = project.title;

    const category = document.createElement('span');
    category.className = 'gallery-item__category';
    category.textContent = project.category.join(', ');

    overlay.appendChild(title);
    overlay.appendChild(category);
    item.appendChild(img);
    item.appendChild(overlay);

    item.addEventListener('click', function () {
      triggerElement = item;
      openLightbox(project.id);
    });

    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerElement = item;
        openLightbox(project.id);
      }
    });

    container.appendChild(item);
  });
}

/* ============================================================
   Gallery Filtering
   ============================================================ */

/**
 * Filters gallery items by category. "all" shows everything.
 * Applies CSS fade/scale transition classes.
 * @param {string} category - The category to filter by (lowercase)
 */
export function filterGallery(category) {
  currentFilter = category;

  // Update active button
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(function (btn) {
    const btnFilter = btn.getAttribute('data-filter');
    if (btnFilter === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update filtered projects list
  if (category === 'all') {
    filteredProjects = [...projects];
  } else {
    filteredProjects = projects.filter(function (p) {
      return p.category.includes(category);
    });
  }

  // Animate gallery items
  const items = document.querySelectorAll('.gallery-item');
  items.forEach(function (item) {
    const categories = (item.getAttribute('data-categories') || '').split(',');
    const matches = category === 'all' || categories.includes(category);

    if (matches) {
      item.classList.remove('hidden', 'fade-out');
      item.classList.add('fade-in');
    } else {
      item.classList.remove('fade-in');
      item.classList.add('fade-out');
      // After transition, hide completely
      setTimeout(function () {
        if (item.classList.contains('fade-out')) {
          item.classList.add('hidden');
        }
      }, 300);
    }
  });
}

/* ============================================================
   Lightbox
   ============================================================ */

/**
 * Creates the lightbox DOM element and appends it to the body.
 */
function createLightboxElement() {
  // Don't create if it already exists
  if (document.querySelector('.lightbox')) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Image lightbox');

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox__close';
  closeBtn.setAttribute('aria-label', 'Close lightbox');
  closeBtn.innerHTML = '&times;';
  closeBtn.addEventListener('click', function () {
    closeLightbox();
  });

  const prevBtn = document.createElement('button');
  prevBtn.className = 'lightbox__nav lightbox__nav--prev';
  prevBtn.setAttribute('aria-label', 'Previous image');
  prevBtn.innerHTML = '&#8249;';
  prevBtn.addEventListener('click', function () {
    navigateLightbox(-1);
  });

  const nextBtn = document.createElement('button');
  nextBtn.className = 'lightbox__nav lightbox__nav--next';
  nextBtn.setAttribute('aria-label', 'Next image');
  nextBtn.innerHTML = '&#8250;';
  nextBtn.addEventListener('click', function () {
    navigateLightbox(1);
  });

  const img = document.createElement('img');
  img.className = 'lightbox__image';
  img.alt = '';

  const caption = document.createElement('div');
  caption.className = 'lightbox__caption';

  lightbox.appendChild(closeBtn);
  lightbox.appendChild(prevBtn);
  lightbox.appendChild(img);
  lightbox.appendChild(nextBtn);
  lightbox.appendChild(caption);

  // Click outside image to close
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.body.appendChild(lightbox);
}

/**
 * Opens the lightbox for the given project ID.
 * @param {number} projectId - The project ID to display
 */
export function openLightbox(projectId) {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  // Find the index in the filtered projects
  const index = filteredProjects.findIndex(function (p) {
    return p.id === projectId;
  });
  if (index === -1) return;

  currentLightboxIndex = index;
  updateLightboxContent();

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Attach keyboard listener
  document.addEventListener('keydown', handleLightboxKeydown);

  // Attach focus trap listener
  document.addEventListener('focusin', handleFocusTrap);

  // Focus the close button
  const closeBtn = lightbox.querySelector('.lightbox__close');
  if (closeBtn) closeBtn.focus();
}

/**
 * Closes the lightbox and restores focus to the triggering thumbnail.
 */
export function closeLightbox() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;

  lightbox.classList.remove('active');
  document.body.style.overflow = '';

  // Remove keyboard listener
  document.removeEventListener('keydown', handleLightboxKeydown);

  // Remove focus trap listener
  document.removeEventListener('focusin', handleFocusTrap);

  // Restore focus to the triggering element
  if (triggerElement) {
    triggerElement.focus();
    triggerElement = null;
  }

  currentLightboxIndex = -1;
}

/**
 * Navigates the lightbox in the given direction with wrapping.
 * @param {number} direction - +1 for next, -1 for previous
 */
export function navigateLightbox(direction) {
  if (filteredProjects.length === 0) return;

  currentLightboxIndex = navigateIndex(currentLightboxIndex, direction, filteredProjects.length);
  updateLightboxContent();
}

/**
 * Updates the lightbox image and caption to match the current index.
 */
function updateLightboxContent() {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox || currentLightboxIndex < 0) return;

  const project = filteredProjects[currentLightboxIndex];
  if (!project) return;

  const img = lightbox.querySelector('.lightbox__image');
  const caption = lightbox.querySelector('.lightbox__caption');

  if (img) {
    img.src = project.src;
    img.alt = project.alt;
  }

  if (caption) {
    caption.textContent = project.title + ' — ' + project.category.join(', ');
  }
}

/**
 * Handles keyboard events while the lightbox is open.
 * @param {KeyboardEvent} e
 */
function handleLightboxKeydown(e) {
  switch (e.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowLeft':
      navigateLightbox(-1);
      break;
    case 'ArrowRight':
      navigateLightbox(1);
      break;
  }
}

/**
 * Focus trap: if focus moves outside the lightbox, pull it back.
 * @param {FocusEvent} e
 */
function handleFocusTrap(e) {
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox || !lightbox.classList.contains('active')) return;

  if (!lightbox.contains(e.target)) {
    // Focus escaped — bring it back to the close button
    const closeBtn = lightbox.querySelector('.lightbox__close');
    if (closeBtn) closeBtn.focus();
  }
}

/* ============================================================
   Initialisation
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  initGallery();
});
