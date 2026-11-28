import { writeFileSync, readFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { content } from '../src/content.mjs';
import { renderBody, escapeHtml } from '../src/render.mjs';
import { parsePost, renderBlogIndex, renderPost } from '../src/blog.mjs';

const e = escapeHtml;

export function layout({ title, description, body, name = content.hero.name }) {
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(title)}</title>
<meta name="description" content="${e(description)}">
<meta property="og:title" content="${e(title)}">
<meta property="og:description" content="${e(description)}">
<meta property="og:type" content="website">
<link rel="stylesheet" href="/style.css">
<script>document.documentElement.classList.add('js')</script>
<script src="/enhance.js" defer></script>
</head>
<body>
<div class="progress" aria-hidden="true"></div>
<header class="topnav">
  <nav><a href="/">포트폴리오</a><a href="/blog/">블로그</a></nav>
</header>
<main>
${body}
</main>
<footer><p>© ${e(name)}</p></footer>
</body>
</html>
`;
}

export function buildHtml(c) {
  return layout({
    title: `${c.hero.name} | 포트폴리오`,
    description: `${c.hero.name} · ${c.hero.affiliation}. ${c.hero.tagline}.`,
    body: renderBody(c),
    name: c.hero.name,
  });
}

export function buildBlogPages(posts) {
  const name = content.hero.name;
  const pages = {
    'blog/index.html': layout({
      title: `블로그 | ${name}`,
      description: `${name}의 블로그`,
      body: renderBlogIndex(posts),
    }),
  };
  for (const p of posts) {
    pages[`blog/${p.slug}/index.html`] = layout({
      title: `${p.title} | ${name}`,
      description: p.summary || p.title,
      body: renderPost(p),
    });
  }
  return pages;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const postsDir = path.join(root, 'posts');
  const posts = existsSync(postsDir)
    ? readdirSync(postsDir)
        .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
        .map((f) => parsePost(f, readFileSync(path.join(postsDir, f), 'utf8')))
    : [];
  const files = { 'index.html': buildHtml(content), ...buildBlogPages(posts) };
  for (const [rel, html] of Object.entries(files)) {
    const out = path.join(root, rel);
    mkdirSync(path.dirname(out), { recursive: true });
    writeFileSync(out, html);
  }
  writeFileSync(path.join(root, '.nojekyll'), '');
  console.log(`wrote ${Object.keys(files).join(', ')}`);
}
