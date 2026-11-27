import { test } from 'node:test';
import assert from 'node:assert/strict';
import { content } from '../src/content.mjs';
import { buildHtml } from '../scripts/build.mjs';

const html = buildHtml(content);

test('document declares Korean and a viewport', () => {
  assert.ok(html.includes('<html lang="ko">'));
  assert.ok(html.includes('<meta name="viewport" content="width=device-width, initial-scale=1">'));
});

test('description meta contains the tagline', () => {
  assert.match(html, /<meta name="description" content="[^"]*새로운 소식을 빠르게 접하고 무엇이든 만들어보는 사람[^"]*">/);
});

test('markup contains the name and tagline without running JS', () => {
  assert.ok(html.includes('<h1>조상혁</h1>'));
  assert.ok(html.includes('새로운 소식을 빠르게 접하고 무엇이든 만들어보는 사람</p>'));
});

test('page has no script tag', () => {
  assert.ok(!html.includes('<script'));
});

test('page links style.css', () => {
  assert.ok(html.includes('<link rel="stylesheet" href="/style.css">'));
});

test('title is exact', () => {
  assert.ok(html.includes('<title>조상혁 | 포트폴리오</title>'));
});

test('open graph title and description are present', () => {
  assert.ok(html.includes('property="og:title"'));
  assert.ok(html.includes('property="og:description"'));
});

import { buildBlogPages } from '../scripts/build.mjs';

test('top nav links to the portfolio and the blog', () => {
  assert.ok(html.includes('<a href="/">포트폴리오</a>'));
  assert.ok(html.includes('<a href="/blog/">블로그</a>'));
});

test('buildBlogPages always writes the index and one page per post', () => {
  const empty = buildBlogPages([]);
  assert.deepEqual(Object.keys(empty), ['blog/index.html']);
  const one = buildBlogPages([{ slug: 'hi', title: 'T', date: '2026-11-28', summary: 's', html: '<p>x</p>' }]);
  assert.deepEqual(Object.keys(one).sort(), ['blog/hi/index.html', 'blog/index.html']);
  assert.ok(one['blog/hi/index.html'].includes('<title>T | 조상혁</title>'));
});
