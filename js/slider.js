/**
 * Pilkington Floors — Before/After Slider
 * Interactive image comparison component with drag and touch support.
 * Uses pointer events for unified mouse + touch handling.
 */

/* ============================================================
   Pure Helpers (exported for testability)
   ============================================================ */

/**
 * Computes the clip percentage for the before/after slider.
 * @param {number} pointerX - The pointer X position (clientX)
 * @param {number} containerLeft - The left edge of the container (getBoundingClientRect().left)
 * @param {number} containerWidth - The width of the container
 * @returns {number} A value clamped to [0, 1] representing the proportion
 */
export function computeClipPercentage(pointerX, containerLeft, containerWidth) {
  if (containerWidth <= 0) return 0;
  const x = pointerX - containerLeft;
  return Math.min(1, Math.max(0, x / containerWidth));
}

/* ============================================================
   Slider Initialisation
   ============================================================ */

/**
 * Finds all elements with [data-before-after] and attaches
 * pointer event handlers to enable drag-to-compare behaviour.
 */
export function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll('[data-before-after]');

  sliders.forEach(function (slider) {
    let isDragging = false;

    const beforeImg = slider.querySelector('.before-img');
    const handle = slider.querySelector('.slider-handle');

    if (!beforeImg || !handle) return;

    /**
     * Updates the slider position based on a percentage [0, 1].
     * @param {number} percentage
     */
    function updateSlider(percentage) {
      const clipRight = (1 - percentage) * 100;
      beforeImg.style.clipPath = 'inset(0 ' + clipRight + '% 0 0)';
      handle.style.left = percentage * 100 + '%';
    }

    /**
     * Handles pointer movement to reposition the slider.
     * @param {PointerEvent} e
     */
    function onPointerMove(e) {
      if (!isDragging) return;
      e.preventDefault();

      const rect = slider.getBoundingClientRect();
      const percentage = computeClipPercentage(e.clientX, rect.left, rect.width);
      updateSlider(percentage);
    }

    /**
     * Ends the drag interaction.
     * @param {PointerEvent} e
     */
    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      slider.releasePointerCapture(e.pointerId);
    }

    // Attach pointer events to the slider container
    slider.addEventListener('pointerdown', function (e) {
      isDragging = true;
      slider.setPointerCapture(e.pointerId);

      // Immediately update position on click/tap
      const rect = slider.getBoundingClientRect();
      const percentage = computeClipPercentage(e.clientX, rect.left, rect.width);
      updateSlider(percentage);
    });

    slider.addEventListener('pointermove', onPointerMove);
    slider.addEventListener('pointerup', onPointerUp);
  });
}

/* ============================================================
   Initialisation
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  initBeforeAfterSliders();
});
