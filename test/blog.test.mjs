import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parsePost, renderBlogIndex, renderPost } from '../src/blog.mjs';

const sample = `---
title: 첫 글
date: 2026-11-28
summary: 블로그를 열었어요
---
# 안녕

본문이에요.
`;

test('parsePost reads front matter, slug, and converts markdown', () => {
  const p = parsePost('2026-11-28-hello-world.md', sample);
  assert.equal(p.slug, 'hello-world');
  assert.equal(p.title, '첫 글');
  assert.equal(p.date, '2026-11-28');
  assert.equal(p.summary, '블로그를 열었어요');
  assert.ok(p.html.includes('<h1>안녕</h1>'));
});

test('parsePost throws when title is missing', () => {
  assert.throws(() => parsePost('2026-11-28-x.md', '---\ndate: 2026-11-28\n---\nbody'), /title/);
});

test('renderBlogIndex with no posts shows the empty message', () => {
  assert.ok(renderBlogIndex([]).includes('아직 글이 없어요'));
});

test('renderBlogIndex lists newest first with slug links and escapes titles', () => {
  const posts = [
    { slug: 'old', title: '옛날 글', date: '2026-01-01', summary: 's', html: '' },
    { slug: 'new', title: '<b>새 글</b>', date: '2026-02-01', summary: 's', html: '' },
  ];
  const html = renderBlogIndex(posts);
  assert.ok(html.indexOf('/blog/new/') < html.indexOf('/blog/old/'));
  assert.ok(!html.includes('<b>새 글</b>'));
  assert.ok(html.includes('&lt;b&gt;새 글&lt;/b&gt;'));
});

test('renderPost contains the body and a link back to /blog/', () => {
  const html = renderPost(parsePost('2026-11-28-hello-world.md', sample));
  assert.ok(html.includes('<h1>안녕</h1>'));
  assert.ok(html.includes('href="/blog/"'));
});
