import { marked } from 'marked';
import { escapeHtml as e } from './render.mjs';

export function parsePost(filename, text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta = {};
  if (m) {
    for (const line of m[1].split(/\r?\n/)) {
      const i = line.indexOf(':');
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  if (!meta.title) throw new Error(`title missing in front matter: ${filename}`);
  const base = filename.replace(/\.md$/, '');
  const slug = base.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  if (!slug || /[\/\\]|\.\./.test(slug)) throw new Error(`bad slug in filename: ${filename}`);
  const date = meta.date || (base.match(/^\d{4}-\d{2}-\d{2}/) || [''])[0];
  return {
    slug,
    title: meta.title,
    date,
    summary: meta.summary || '',
    html: marked.parse(m ? m[2] : text),
  };
}

export function renderBlogIndex(posts) {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const items = sorted.length
    ? sorted
        .map(
          (p) => `<article class="card reveal">
    <h3><a href="/blog/${e(p.slug)}/">${e(p.title)}</a></h3>
    <p class="meta">${e(p.date)}</p>
    ${p.summary ? `<p>${e(p.summary)}</p>` : ''}
  </article>`,
        )
        .join('\n  ')
    : '<p class="meta">아직 글이 없어요. 곧 올릴게요.</p>';
  return `<section id="blog">
  <h1 class="page-title">블로그</h1>
  ${items}
</section>`;
}

export function renderPost(post) {
  return `<section id="post">
  <p><a href="/blog/">← 블로그</a></p>
  <h1 class="page-title">${e(post.title)}</h1>
  <p class="meta">${e(post.date)}</p>
  <div class="post-body">${post.html}</div>
</section>`;
}
