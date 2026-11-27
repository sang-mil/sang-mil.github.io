import { test } from 'node:test';
import assert from 'node:assert/strict';
import { content } from '../src/content.mjs';

test('hero and contact carry the verbatim identity text', () => {
  assert.equal(content.hero.name, '조상혁');
  assert.equal(content.hero.affiliation, '국민대학교 소프트웨어학과 2학년');
  assert.equal(content.hero.tagline, '새로운 소식을 빠르게 접하고 무엇이든 만들어보는 사람');
  assert.equal(content.hero.sub, '2023년부터 계속 만들고 있어요');
  assert.equal(content.contact.email, 'sangmil6369@gmail.com');
});

test('featured projects are the four ids in order', () => {
  assert.deepEqual(
    content.projects.map((p) => p.id),
    ['mwomeog', 'sugerRush', 'career-tactics', 'notion_travel_bridge'],
  );
});

test('more lists the five ids in order', () => {
  assert.deepEqual(
    content.more.map((p) => p.id),
    ['news-for-me', 'event-aware-maps', 'prompt_up', 'simulator', 'OnEat'],
  );
});

test('every project has a summary, a stack, and a github repo link', () => {
  for (const p of [...content.projects, ...content.more]) {
    assert.ok(p.summary && p.summary.length > 0, `${p.id} summary`);
    assert.ok(p.stack.length > 0, `${p.id} stack`);
    assert.ok(
      p.links.some((l) => l.url.startsWith('https://github.com/')),
      `${p.id} repo link`,
    );
  }
});

test('every link url is https', () => {
  const links = [
    ...content.projects.flatMap((p) => p.links),
    ...content.more.flatMap((p) => p.links),
    ...content.contact.links,
  ];
  for (const l of links) assert.ok(l.url.startsWith('https://'), l.url);
});

test('erp keeps the confidentiality note and never claims delivery', () => {
  assert.equal(content.erp.note, '고객사 프로젝트라 코드는 비공개');
  assert.ok(!content.erp.status.includes('납품'));
  assert.deepEqual(content.erp.stack, ['Next.js', 'Flask', 'MySQL']);
});

test('timeline covers 2023 to 2026', () => {
  assert.deepEqual(
    content.timeline.map((t) => t.year),
    ['2023', '2024', '2025', '2026'],
  );
});
