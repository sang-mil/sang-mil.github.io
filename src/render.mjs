export function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const e = escapeHtml;

const link = (l) =>
  `<a href="${e(l.url)}" target="_blank" rel="noopener noreferrer">${e(l.label)}</a>`;

const tags = (items) =>
  `<ul class="tags">${items.map((t) => `<li>${e(t)}</li>`).join('')}</ul>`;

export function renderHero(hero) {
  return `<section id="hero">
  <h1>${e(hero.name)}</h1>
  <p class="affiliation">${e(hero.affiliation)}</p>
  <p class="tagline">${e(hero.tagline)}</p>
  <p class="sub">${e(hero.sub)}</p>
</section>`;
}

export function renderErp(erp) {
  return `<section id="erp">
  <h2>외주 경험</h2>
  <article class="card card-feature reveal">
    <h3>${e(erp.title)}</h3>
    <p class="meta"><span class="dot" aria-hidden="true"></span>${e(erp.period)} · ${e(erp.status)}</p>
    <p>${e(erp.role)}</p>
    <ul class="features">${erp.features.map((f) => `<li>${e(f)}</li>`).join('')}</ul>
    ${tags(erp.stack)}
    <p class="note">🔒 ${e(erp.note)}</p>
  </article>
</section>`;
}

export function renderProjects(title, list, id = 'projects') {
  const cards = list
    .map(
      (p) => `<article class="card reveal">
    <h3>${e(p.title)}</h3>
    <p>${e(p.summary)}</p>
    ${tags(p.stack)}
    <p class="links">${p.links.map(link).join(' · ')}</p>
  </article>`,
    )
    .join('\n  ');
  return `<section id="${e(id)}">
  <h2>${e(title)}</h2>
  ${cards}
</section>`;
}

export function renderTimeline(timeline) {
  const rows = timeline
    .map(
      (t) => `<li class="reveal"><span class="year">${e(t.year)}</span><ul>${t.items
        .map((i) => `<li>${e(i)}</li>`)
        .join('')}</ul></li>`,
    )
    .join('\n    ');
  return `<section id="timeline">
  <h2>만들어 온 순서</h2>
  <ol class="timeline">
    ${rows}
  </ol>
</section>`;
}

export function renderContact(contact) {
  return `<section id="contact">
  <h2>연락처</h2>
  <p><a href="mailto:${e(contact.email)}">${e(contact.email)}</a></p>
  <p class="links">${contact.links.map(link).join(' · ')}</p>
</section>`;
}

export function renderBody(c) {
  return [
    renderHero(c.hero),
    renderErp(c.erp),
    renderProjects('대표 프로젝트', c.projects, 'projects'),
    renderProjects('더 보기', c.more, 'more'),
    renderTimeline(c.timeline),
    renderContact(c.contact),
  ].join('\n');
}
