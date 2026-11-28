import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { content } from '../src/content.mjs';
import { renderBody } from '../src/render.mjs';

const css = readFileSync(new URL('../style.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('../enhance.js', import.meta.url), 'utf8');

test('cards, timeline rows, and sections carry the reveal class', () => {
  const html = renderBody(content);
  const cards = html.match(/<article class="card[^"]*"/g) || [];
  assert.ok(cards.length >= 9);
  for (const c of cards) assert.ok(c.includes('reveal'), c);
  assert.ok(html.includes('<li class="reveal">'));
});

test('reveal hides content only when the js class is present', () => {
  assert.match(css, /\.js \.reveal\s*\{[^}]*opacity:\s*0/);
  assert.ok(!/^\.reveal\s*\{[^}]*opacity:\s*0/m.test(css));
});

test('motion is switched off for prefers-reduced-motion', () => {
  const block = css.match(/@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*?\n\}/);
  assert.ok(block, 'reduced-motion block exists');
  assert.ok(block[0].includes('transition: none') || block[0].includes('animation: none'));
  assert.ok(block[0].includes('.js .reveal'));
});

test('enhance.js reveals on scroll, shows everything without IntersectionObserver, and honors reduced motion', () => {
  assert.ok(js.includes('IntersectionObserver'));
  assert.ok(js.includes("classList.add('in')"));
  assert.ok(js.includes('prefers-reduced-motion'));
  assert.ok(js.includes("!('IntersectionObserver' in window)"));
});

test('the 2.5s safety reveal applies only when enhance.js never ran', () => {
  assert.match(css, /\.js:not\(\.js-ready\) \.reveal\s*\{[^}]*animation:\s*show/);
  assert.ok(js.includes("classList.add('js-ready')"));
  assert.ok(!/\.js \.reveal\s*\{[^}]*animation/.test(css));
});

test('scroll progress bar element exists in the layout', async () => {
  const { buildHtml } = await import('../scripts/build.mjs');
  assert.ok(buildHtml(content).includes('<div class="progress" aria-hidden="true"></div>'));
});
