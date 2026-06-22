/**
 * test/helpers.js
 *
 * Module-friendly versions of the page functions for testing.
 * These mirror the logic in the inline <script> of index.html so the
 * functions can be imported and exercised inside jsdom without needing a
 * browser or a real <script> execution context.
 *
 * Each factory accepts DOM element references and a shared state object so
 * tests can inspect / reset state between runs without global pollution.
 */

/** The two animation CSS class names used by triggerAnimation. */
export const ANIMATIONS = ['animate-bounce-puppy', 'animate-wiggle-puppy'];

/**
 * Creates a `showSpeechBubble` function bound to a specific bubble element.
 *
 * @param {HTMLElement} bubbleEl - The #speech-bubble DOM element.
 * @returns {() => void} Idempotent show function — adds `.visible` class if
 *   not already present.
 */
export function makeShowSpeechBubble(bubbleEl) {
  return function showSpeechBubble() {
    if (!bubbleEl.classList.contains('visible')) {
      bubbleEl.classList.add('visible');
    }
  };
}

/**
 * Creates a `triggerAnimation` function bound to a specific image element and
 * a mutable state object.
 *
 * The state object shape:
 *   { isAnimating: boolean, currentAnimClass: string | null }
 *
 * @param {HTMLElement} imgEl - The #puppy-img DOM element.
 * @param {{ isAnimating: boolean, currentAnimClass: string | null }} stateRef
 *   Shared mutable state. Pass the same object reference for both creation and
 *   inspection in tests.
 * @returns {() => void} triggerAnimation function.
 */
export function makeTriggerAnimation(imgEl, stateRef) {
  return function triggerAnimation() {
    const chosen = ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)];

    if (stateRef.isAnimating) {
      // Remove existing class; force reflow (no-op in jsdom, keeps logic accurate)
      imgEl.classList.remove(stateRef.currentAnimClass);
      void imgEl.offsetWidth;
    }

    stateRef.currentAnimClass = chosen;
    stateRef.isAnimating = true;
    imgEl.classList.add(chosen);

    // Capture which class was added so the cleanup only affects this run
    const thisClass = chosen;
    imgEl.addEventListener('animationend', function handler() {
      // Only clean up if this handler belongs to the still-current animation
      if (stateRef.currentAnimClass === thisClass) {
        imgEl.classList.remove(thisClass);
        stateRef.isAnimating = false;
        stateRef.currentAnimClass = null;
      }
      imgEl.removeEventListener('animationend', handler);
    });
  };
}

/**
 * Creates a fresh animation state object.
 * Convenience helper so tests don't have to know the shape.
 *
 * @returns {{ isAnimating: boolean, currentAnimClass: string | null }}
 */
export function makeAnimationState() {
  return { isAnimating: false, currentAnimClass: null };
}
