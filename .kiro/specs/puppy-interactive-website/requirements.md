# Requirements Document

## Introduction

This feature is a single-page interactive puppy website designed for children and animal lovers. The page presents a cute puppy illustration centered on screen with a playful, child-friendly design using soft pastel colors. Users can interact with the puppy via a "Sapa Anak Anjing" (Greet the Puppy) button, which triggers an animated speech bubble and a fun puppy animation. The entire application is delivered as a single, self-contained HTML file using HTML5, Tailwind CSS (via CDN), and Vanilla JavaScript — no build tools or server required.

## Glossary

- **Page**: The single HTML file that constitutes the entire application.
- **Puppy_Image**: The centered puppy illustration or placeholder image displayed on the Page.
- **Speech_Bubble**: The tooltip-style overlay element positioned above the Puppy_Image that displays a greeting message.
- **Greet_Button**: The styled button labeled "Sapa Anak Anjing" that the user clicks to trigger interactions.
- **Bounce_Animation**: A gentle, repeating vertical motion applied to the Puppy_Image to convey playfulness.
- **Wiggle_Animation**: A subtle rotational shake animation applied to the Puppy_Image as an alternative to Bounce_Animation.
- **Greeting_Message**: The text displayed inside the Speech_Bubble, e.g. "Halo! Guk guk! 🐾".
- **Tailwind_CDN**: The Tailwind CSS stylesheet loaded from a CDN link within the HTML `<head>`.

---

## Requirements

### Requirement 1: Page Layout and Visual Design

**User Story:** As a child or animal lover, I want to see a cute, cheerful page with a centered puppy illustration, so that the experience feels welcoming and fun from the moment I open it.

#### Acceptance Criteria

1. THE Page SHALL use a soft pastel background color defined as a hue with saturation ≤ 30% and lightness ≥ 85% (e.g., cream, light yellow, or light blue) — no hex code is prescribed, but the color must satisfy these measurable bounds.
2. THE Page SHALL load the Tailwind CSS stylesheet exclusively via a CDN `<link>` or `<script>` tag — no local Tailwind installation or build artifact is permitted.
3. THE Page SHALL display the Puppy_Image horizontally centered and vertically centered within the viewport, such that the image's bounding box center is within 10px of the viewport's geometric center on all supported screen widths.
4. THE Page SHALL render correctly on viewport widths between 320px and 1920px without a horizontal scrollbar appearing.
5. THE Page SHALL apply a border-radius of at least 8px to every interactive and bubble element (buttons and speech bubbles) to produce rounded corners.

---

### Requirement 2: Puppy Image Display

**User Story:** As a user, I want to see a clear, appealing puppy image in the center of the page, so that the subject of the page is immediately obvious and delightful.

#### Acceptance Criteria

1. THE Page SHALL embed the Puppy_Image using an `<img>` element with a `src` attribute pointing to a reliable external URL (e.g., an Unsplash photo URL or a placeholder service URL such as `https://placedog.net/400/400`).
2. THE Puppy_Image SHALL have a CSS-rendered width between 200px and 400px on all supported viewport widths to ensure consistent display across devices.
3. THE Puppy_Image SHALL include a non-empty `alt` attribute describing the image content (e.g., `alt="Cute puppy"`).
4. IF the Puppy_Image fails to load, THEN THE Page SHALL display the `alt` text in its place and all other page elements SHALL remain fully visible and correctly positioned.

---

### Requirement 3: Speech Bubble

**User Story:** As a user, I want a speech bubble to appear above the puppy with a fun greeting, so that the puppy feels alive and interactive.

#### Acceptance Criteria

1. THE Speech_Bubble SHALL be hidden (CSS `display: none` or `visibility: hidden` with `opacity: 0`) and SHALL NOT occupy layout space when the Page first loads.
2. THE Speech_Bubble SHALL be positioned such that its bottom edge is no more than 16px above the top edge of the Puppy_Image at all supported viewport widths.
3. WHEN the Greet_Button is clicked while the Speech_Bubble is hidden, THE Speech_Bubble SHALL become visible and display the Greeting_Message.
4. THE Speech_Bubble SHALL display exactly one of the following Greeting_Messages: `"Halo! Guk guk! 🐾"` or `"Say Hi! 🐾"`.
5. THE Speech_Bubble SHALL have a background color visually distinct from the page background, a border-radius of at least 8px, and a downward-pointing tail or arrow element pointing toward the Puppy_Image.
6. WHEN the Speech_Bubble transitions from hidden to visible, THE Speech_Bubble SHALL appear via a CSS transition with a duration between 150ms and 400ms (e.g., fade-in via `opacity` or scale-in via `transform`).
7. WHEN the Greet_Button is clicked while the Speech_Bubble is already visible, THE Speech_Bubble SHALL remain visible and the Greeting_Message SHALL remain unchanged.

---

### Requirement 4: "Sapa Anak Anjing" Greet Button

**User Story:** As a user, I want a clearly labeled, attractive button below the puppy, so that I know exactly how to interact with the page.

#### Acceptance Criteria

1. THE Page SHALL render the Greet_Button below the Puppy_Image with the visible label text `"Sapa Anak Anjing"`.
2. THE Greet_Button SHALL be styled with Tailwind CSS utility classes with a background color that achieves a WCAG AA contrast ratio of at least 4.5:1 against the button label text color, rounded corners (border-radius ≥ 8px), and a font size of at least 16px.
3. THE Greet_Button SHALL be horizontally centered on the Page.
4. WHEN the user hovers over the Greet_Button on a pointer device, THE Greet_Button SHALL change its background color lightness by at least 10% AND scale to between 1.03× and 1.10× its normal size.
5. THE Greet_Button SHALL be keyboard-accessible: it SHALL be reachable via the Tab key, and activatable via the `Enter` or `Space` key when focused, with a visible focus indicator of at least a 2px outline.

---

### Requirement 5: Puppy Animation on Button Click

**User Story:** As a user, I want the puppy to animate when I click the button, so that the interaction feels lively and rewarding.

#### Acceptance Criteria

1. WHEN the Greet_Button is clicked, THE Puppy_Image SHALL play either a Bounce_Animation or a Wiggle_Animation, selected randomly each click.
2. THE Bounce_Animation SHALL consist of a vertical displacement of no more than 20px, repeated between 2 and 4 times, over a total duration between 600ms and 1200ms.
3. THE Wiggle_Animation SHALL consist of a rotational oscillation of no more than ±15 degrees, repeated between 2 and 4 times, over a total duration between 600ms and 1200ms.
4. WHEN the animation completes, THE Puppy_Image SHALL be within 1px of its original vertical position and within 1 degree of its original rotation (i.e., no visible snap or jump).
5. WHEN the Greet_Button is clicked while an animation is already playing, THE Puppy_Image SHALL restart the animation from the beginning rather than stacking or skipping it.

---

### Requirement 6: Initial Page Load Behavior

**User Story:** As a user, I want the page to feel immediately alive when it loads, so that I am engaged from the first second.

#### Acceptance Criteria

1. WHEN the Page load event fires, THE Speech_Bubble SHALL transition from its initial hidden state to visible and SHALL display the Greeting_Message without any user interaction.
2. WHEN the Page load event fires, THE Puppy_Image SHALL play exactly one instance of either the Bounce_Animation or the Wiggle_Animation, and the animation SHALL NOT loop automatically after this initial play.

---

### Requirement 7: Technical Delivery Constraints

**User Story:** As a developer or end user, I want a single HTML file I can open directly in a browser, so that no build step or server is needed.

#### Acceptance Criteria

1. THE Page SHALL be delivered as a single `.html` file containing all HTML structure, the Tailwind CDN reference, and all Vanilla JavaScript either inline or within a `<script>` tag in the same file — no external `.js` or `.css` files are permitted.
2. THE Page SHALL NOT depend on any local Node.js server, build pipeline, or framework runtime; opening the file via `file://` in a browser SHALL produce a fully functional page.
3. THE Page SHALL use only Vanilla JavaScript — no third-party JS libraries (e.g., jQuery, React, Vue) are permitted beyond the Tailwind CSS CDN stylesheet.
4. THE Page SHALL produce zero JavaScript `console.error` or uncaught exception entries on initial load in the latest stable release of Chrome, Firefox, or Edge.
5. THE Page SHALL begin with a `<!DOCTYPE html>` declaration and SHALL use semantic HTML5 elements (`<main>`, `<section>`, `<button>`, etc.) for primary structural regions.
