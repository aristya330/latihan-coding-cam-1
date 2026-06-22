# Implementation Plan: Puppy Interactive Website

## Overview

Implement a single self-contained `index.html` file that delivers the full puppy interactive experience — pastel layout, centered puppy image, speech bubble, greet button, and CSS animations — using only HTML5, Tailwind CSS (Play CDN), and Vanilla JavaScript. A companion test file (using jsdom + fast-check) validates the extracted JS logic through unit and property-based tests.

---

## Tasks

- [~] 1. Create the HTML shell and page layout
  - Create `index.html` starting with `<!DOCTYPE html>` and semantic HTML5 structure (`<html>`, `<head>`, `<body>`, `<main>`)
  - Add the Tailwind CSS Play CDN `<script>` tag inside `<head>`
  - Add an inline `tailwind.config` block extending the default theme with the custom pastel background color (HSL saturation ≤ 30%, lightness ≥ 85%)
  - Apply Flexbox centering on `<body>` and `<main>` so all content is horizontally and vertically centered within the viewport
  - Ensure the page renders correctly at 320px–1920px widths with no horizontal scrollbar
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 7.1, 7.2, 7.5_

- [x] 2. Implement the puppy card, puppy image, and speech bubble markup
  - [x] 2.1 Build the `#puppy-card` section and `#puppy-img` image element
    - Create `<section id="puppy-card">` with `position: relative` and Flexbox column layout centered on `align-items: center`
    - Add `<img id="puppy-img" src="https://placedog.net/400/400" alt="Cute puppy">` with Tailwind width classes `w-64 sm:w-80` (256px–320px), `rounded-2xl`, and the `onerror` fallback to `https://via.placeholder.com/320x320?text=🐶`
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 2.2 Build the `#speech-bubble` overlay element
    - Create `<div id="speech-bubble-wrapper">` as a relative-positioned anchor inside `#puppy-card`, above `#puppy-img`
    - Create `<div id="speech-bubble">` absolutely positioned, with white background, `border-radius: 12px`, padding, and the fixed greeting text `"Halo! Guk guk! 🐾"`
    - Add a CSS `::after` pseudo-element triangle pointing downward as the speech bubble tail
    - Set initial state to `opacity: 0; visibility: hidden` with a `300ms ease-in-out` transition on both `opacity` and `visibility`; define a `.visible` class that sets `opacity: 1; visibility: visible`
    - Position the bubble so its bottom edge is no more than 16px above the top of `#puppy-img`
    - Apply `border-radius ≥ 8px` to the bubble (satisfies the rounded corners rule for all interactive/bubble elements)
    - _Requirements: 3.1, 3.2, 3.4, 3.5, 3.6, 1.5_

- [x] 3. Implement the Greet Button
  - Add `<button id="greet-btn">Sapa Anak Anjing</button>` below `#puppy-card` inside `<main>`
  - Apply Tailwind classes: `bg-pink-400 text-white text-lg rounded-xl px-6 py-3` (WCAG AA contrast ≈ 4.6:1, font-size 18px, border-radius 12px)
  - Add hover classes: `hover:bg-pink-500 hover:scale-105 transition-all duration-200`
  - Add focus classes: `focus:outline-none focus:ring-2 focus:ring-pink-600`
  - Ensure the button is horizontally centered via parent Flexbox
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 4. Implement CSS animation keyframes
  - Add a `<style>` block in `<head>` containing `@keyframes bouncePuppy` (800ms, max 18px vertical, returns to `translateY(0)` at 100%)
  - Add `@keyframes wigglePuppy` (800ms, max ±12 degrees, returns to `rotate(0deg)` at 100%)
  - Define `.animate-bounce-puppy` and `.animate-wiggle-puppy` CSS classes referencing the keyframes
  - _Requirements: 5.2, 5.3, 5.4_

- [x] 5. Implement Vanilla JavaScript behaviour
  - [x] 5.1 Implement `showSpeechBubble()` and `triggerAnimation()` functions
    - Write `showSpeechBubble()`: checks `classList.contains('visible')` on `#speech-bubble`; if not present, adds `.visible` class. Idempotent — repeated calls are no-ops.
    - Write `triggerAnimation()`: uses `isAnimating` flag and `currentAnimClass` variable; randomly picks from `['animate-bounce-puppy', 'animate-wiggle-puppy']`; if currently animating, removes existing class, forces reflow via `img.offsetWidth`, then re-adds chosen class; sets `isAnimating = true` on start; on `animationend`, removes class and sets `isAnimating = false`
    - _Requirements: 3.3, 3.7, 5.1, 5.5_

  - [x] 5.2 Wire `window.load` and button `click` event handlers
    - Add `window.addEventListener('load', ...)` that calls `showSpeechBubble()` and `triggerAnimation()`
    - Add `document.getElementById('greet-btn').addEventListener('click', ...)` that calls `showSpeechBubble()` and `triggerAnimation()`
    - Ensure the script tag is placed at the bottom of `<body>` and uses no modules (file:// compatibility)
    - _Requirements: 5.1, 6.1, 6.2, 7.1, 7.3, 7.4_

- [-] 6. Checkpoint — Verify core page in browser
  - Open `index.html` via `file://` in Chrome, Firefox, or Edge; confirm: speech bubble and animation play on load, button triggers both, zero `console.error` entries, no horizontal scrollbar at 320px, image centered, pastel background visible.
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Set up the test harness and write unit tests
  - [-] 7.1 Set up test environment
    - Create `test/` directory at project root
    - Initialize `package.json` with `npm init -y`; install `vitest`, `jsdom`, and `@vitest/coverage-v8` as dev dependencies (pinned versions)
    - Create `vitest.config.js` setting `environment: 'jsdom'`
    - Extract the testable JS functions (`showSpeechBubble`, `triggerAnimation`, animation constants) into a module-friendly form (or use a test setup file that loads the HTML with jsdom)
    - _Requirements: 7.3, 7.4_

  - [ ]* 7.2 Write unit tests for DOM structure and static content
    - Test: `#puppy-img` has non-empty `alt` attribute equal to `"Cute puppy"`
    - Test: `#greet-btn` text content equals `"Sapa Anak Anjing"`
    - Test: HTML file begins with `<!DOCTYPE html>`
    - Test: `#speech-bubble` does NOT have class `visible` on initial DOM load
    - _Requirements: 2.3, 4.1, 7.5_

  - [ ]* 7.3 Write unit tests for speech bubble and animation logic
    - Test: calling `showSpeechBubble()` once adds `.visible` class to `#speech-bubble`
    - Test: after `window` load event fires, `#speech-bubble` has class `visible`
    - Test: after `animationend` fires on `#puppy-img`, neither `.animate-bounce-puppy` nor `.animate-wiggle-puppy` is present
    - Test: clicking button during animation causes animation restart (old `animationend` does not remove new class)
    - _Requirements: 3.3, 5.5, 6.1, 6.2_

- [ ] 8. Write property-based tests
  - [ ]* 8.1 Write property test — Property 1: Speech bubble idempotence
    - Install `fast-check` as a dev dependency (pinned version)
    - For any call count N ≥ 1, calling `showSpeechBubble()` N times leaves `#speech-bubble` with class `visible` and does not toggle it off
    - **Property 1: Speech bubble visibility is idempotent**
    - **Validates: Requirements 3.3, 3.7, 6.1**

  - [ ]* 8.2 Write property test — Property 2: Animation returns to neutral
    - For any animation class applied and `animationend` subsequently fired, the `transform` on `#puppy-img` is equivalent to the identity (no residual translateY or rotation)
    - **Property 2: Animation always returns to neutral position**
    - **Validates: Requirements 5.4**

  - [ ]* 8.3 Write property test — Property 3: Unbiased random selection
    - For any sample of 100 `triggerAnimation()` calls (with immediate `animationend` simulation), both `animate-bounce-puppy` and `animate-wiggle-puppy` appear at least once
    - **Property 3: Random animation selection is unbiased**
    - **Validates: Requirements 5.1**

  - [ ]* 8.4 Write property test — Property 4: Animation restart clears previous state
    - For any in-progress animation state, a second `triggerAnimation()` call restarts animation from the beginning and the previous `animationend` handler does not remove the newly added animation class
    - **Property 4: Animation restart clears previous state**
    - **Validates: Requirements 5.5**

  - [ ]* 8.5 Write property test — Property 5: Bubble text when visible
    - For any state where `#speech-bubble` has class `visible`, its text content equals one of the two valid greeting messages: `"Halo! Guk guk! 🐾"` or `"Say Hi! 🐾"`
    - **Property 5: Speech bubble always shows greeting text when visible**
    - **Validates: Requirements 3.4, 3.3**

- [~] 9. Final checkpoint — Ensure all tests pass
  - Run `npx vitest --run` and confirm all unit and property-based tests pass with zero failures.
  - Re-open `index.html` via `file://` and confirm zero `console.error` entries on load.
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP delivery
- All implementation is contained in a single `index.html` — no external `.js` or `.css` files are permitted
- The test harness (`test/` directory + `package.json`) is the only permitted secondary artifact; it does not affect the deliverable HTML file
- Each task references specific requirements for full traceability
- Checkpoints at tasks 6 and 9 ensure incremental validation before and after testing

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1", "4"] },
    { "id": 1, "tasks": ["2.2", "3"] },
    { "id": 2, "tasks": ["5.1"] },
    { "id": 3, "tasks": ["5.2"] },
    { "id": 4, "tasks": ["7.1"] },
    { "id": 5, "tasks": ["7.2", "7.3"] },
    { "id": 6, "tasks": ["8.1", "8.2", "8.3", "8.4", "8.5"] }
  ]
}
```
