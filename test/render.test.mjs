import { test } from 'node:test';
import assert from 'node:assert/strict';
import { content } from '../src/content.mjs';
import {
  escapeHtml,
  renderErp,
  renderProjects,
  renderBody,
} from '../src/render.mjs';

test('escapeHtml escapes tags, quotes, and ampersands', () => {
  assert.equal(
    escapeHtml('<a href="x">&</a>'),
    '&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;',
  );
});

test('renderProjects escapes a script in the summary', () => {
  const html = renderProjects('t', [
    { id: 'x', title: 'X', summary: '<script>alert(1)</script>', stack: ['A'], links: [{ label: 'GitHub', url: 'https://github.com/a/x' }] },
  ]);
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&lt;script&gt;'));
});

test('renderProjects with only a repo link emits exactly one anchor', () => {
  const html = renderProjects('t', [
    { id: 'x', title: 'X', summary: 's', stack: ['A'], links: [{ label: 'GitHub', url: 'https://github.com/a/x' }] },
  ]);
  assert.equal((html.match(/<a /g) || []).length, 1);
});

test('every target=_blank link carries rel noopener noreferrer', () => {
  const html = renderBody(content);
  const anchors = html.match(/<a [^>]*>/g) || [];
  const external = anchors.filter((a) => a.includes('target="_blank"'));
  assert.ok(external.length > 0);
  for (const a of external) assert.ok(a.includes('rel="noopener noreferrer"'), a);
});

test('renderErp shows the confidentiality note and the stack', () => {
  const html = renderErp(content.erp);
  assert.ok(html.includes('코드는 비공개'));
  assert.ok(html.includes('Next.js'));
});

test('renderBody orders the sections', () => {
  const html = renderBody(content);
  const ids = ['hero', 'erp', 'projects', 'more', 'timeline', 'contact'];
  const pos = ids.map((id) => html.indexOf(`id="${id}"`));
  for (const p of pos) assert.ok(p >= 0);
  for (let i = 1; i < pos.length; i++) assert.ok(pos[i] > pos[i - 1], ids[i]);
});
