/**
 * test/setup.js
 *
 * Shared DOM setup helper for tests that need the full index.html structure
 * loaded into jsdom.
 *
 * Usage inside a test file:
 *   import { loadDOM, getElements } from './setup.js'
 *
 *   beforeEach(() => loadDOM())
 *
 *   it('should ...', () => {
 *     const { bubble, img, btn } = getElements()
 *     // ... assertions
 *   })
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const HTML_PATH = resolve(__dirname, '..', 'index.html')

/**
 * Reads index.html and sets up jsdom's document with its full HTML content.
 * Call this inside `beforeEach` (or `beforeAll`) in test files that need the
 * real DOM structure.
 *
 * Note: The inline <script> block is NOT executed automatically by jsdom when
 * setting innerHTML — use test/helpers.js factories to instantiate the JS
 * functions instead.
 */
export function loadDOM() {
  const html = readFileSync(HTML_PATH, 'utf-8')
  document.documentElement.innerHTML = html
}

/**
 * Returns references to the key DOM elements after `loadDOM()` has been called.
 *
 * @returns {{
 *   bubble: HTMLElement,
 *   img: HTMLImageElement,
 *   btn: HTMLButtonElement
 * }}
 */
export function getElements() {
  return {
    bubble: document.getElementById('speech-bubble'),
    img: document.getElementById('puppy-img'),
    btn: document.getElementById('greet-btn'),
  }
}
