# 조상혁 Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A one-page Korean portfolio at `https://sang-mil.github.io` that shows 조상혁 as "a person who keeps building", for internship and contest applications.

**Architecture:** Content lives in one data module (`src/content.mjs`). Pure render functions (`src/render.mjs`) turn it into HTML strings. A zero-dependency Node script (`scripts/build.mjs`) writes the static `index.html` at the repo root, so the deployed site is plain HTML + one CSS file and needs no JS to read. Tests use Node's built-in `node:test`.

**Tech Stack:** Node 22 (build and tests only, no npm packages), plain HTML/CSS, GitHub Pages.

**Spec:** Approved design in the conversation of 2026-11-27 (no separate spec file). Summarized in "Global Constraints".

## Global Constraints

- Language: Korean (`<html lang="ko">`). Font stack: `"Pretendard", -apple-system, "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif`. No webfont download.
- Style: white background, one accent color (`#2563eb`), no mascot, no gradients/shadows/emoji clutter. Dark mode via `prefers-color-scheme`.
- Layout: designed for 380px first; no horizontal scroll at 380px or 1280px; content column max 720px.
- Identity text, verbatim: name `조상혁`; affiliation `국민대학교 소프트웨어학과 2학년`; tagline `새로운 소식을 빠르게 접하고 무엇이든 만들어보는 사람`; sub line `2023년부터 계속 만들고 있어요`; email `sangmil6369@gmail.com`.
- Section order: Hero → 외주 경험 → 대표 프로젝트 (4) → 더 보기 → 타임라인 → 연락처.
- 외주 card, reported by the owner (not verifiable): 기업용 ERP, 2026년 7월~현재, 테스트 배포 중(피드백 수집 후 완성 예정), 재고·A/S·이슈·문자 발송 관리, 디자인·프론트엔드·백엔드 전부 혼자 담당, Next.js · Flask · MySQL, `고객사 프로젝트라 코드는 비공개`. Never write 납품 완료, 사용자 수, or any metric. Client name is not shown.
- 대표 프로젝트 4, in this order: `mwomeog`, `sugerRush`, `career-tactics`, `notion_travel_bridge`. Live links: `https://mwomeog.vercel.app`, `https://suger-rush.vercel.app`, `https://career-tactics.vercel.app`; every project also links its repo `https://github.com/sang-mil/<name>`.
- 더 보기: `news-for-me`, `event-aware-maps` (sang-mil) and `prompt_up`, `simulator`, `OnEat` (account `p0tat019`, stated by the owner as their own).
- Timeline: 2023 Arduino·diary·파이썬 알고리즘 공부 / 2024 C++ 스네이크 게임·SNS 프로젝트·지역 도시재생 프로젝트 / 2025 바이브코딩 도구(`prompt_up`, `simulator`, `OnEat`, `PC_Ai`) / 2026 `mwomeog`·`sugerRush`·`career-tactics`·`notion_travel_bridge`·`news-for-me`·`event-aware-maps`, ERP 외주.
- Facts allowed come only from the repo READMEs/descriptions read on 2026-11-27 or from the owner. No invented numbers, no star/repo counts.
- External links: `target="_blank" rel="noopener noreferrer"`.

## Review Focus

- Text containing `<`, `&`, `"` in any content field must render escaped, never as markup.
- A project with no live link must render only its repo link, with no empty `<a>`.
- At 380px wide there is no horizontal scrollbar (long stack lists and URLs wrap).
- Link previews and crawlers see the real content: `index.html` contains the name, tagline, and a `<meta name="description">` without running JS.
- `index.html` has no `<script>` tag; the page works with JS disabled.

---

### Task 1: Content module

**Files:**
- Create: `src/content.mjs`
- Test: `test/content.test.mjs`

**Interfaces:**
- Produces: `export const content` with shape
  `{ hero:{name,affiliation,tagline,sub}, erp:{title,period,status,role,features:string[],stack:string[],note}, projects:Project[], more:Project[], timeline:{year:string,items:string[]}[], contact:{email:string, links:{label,url}[]} }`
  where `Project = { id:string, title:string, summary:string, stack:string[], links:{label:string,url:string}[] }`.

- [ ] **Step 1: Write the failing test** in `test/content.test.mjs`:
  - `hero fields match the verbatim identity text` (name, affiliation, tagline, sub, `contact.email`).
  - `projects are the four featured ids in order` → `['mwomeog','sugerRush','career-tactics','notion_travel_bridge']`.
  - `more lists the five ids` → `['news-for-me','event-aware-maps','prompt_up','simulator','OnEat']`.
  - `every project has summary, non-empty stack, and a repo link starting with https://github.com/`.
  - `every link url starts with https://`.
  - `erp.note === '고객사 프로젝트라 코드는 비공개'` and `erp.status` does not contain `납품`.
  - `timeline years are ['2023','2024','2025','2026']`.
- [ ] **Step 2: Run** `node --test test/content.test.mjs` — Expected: FAIL (module not found).
- [ ] **Step 3: Implement `content` in `src/content.mjs`** with the values in Global Constraints. Project summaries: one Korean sentence each, restating the README's own description (mwomeog: 뭐 먹을지 지도 보고 결정하는 서비스; sugerRush: 실시간 디저트 PvP 아케이드 게임, 캐릭터 4종·AI 봇·온라인 모드; career-tactics: Gemini로 세계관을 만들어 RIASEC 성향과 직업을 추천하는 진로 탐색 앱, KIT 바이브코딩 공모전; notion_travel_bridge: Notion 여행 계획을 Gemini로 구조화해 Google My Maps 핀과 Notion 링크로 돌려주는 Windows 자동화 도구). Stacks come from the READMEs (sugerRush: React·TypeScript·Vite·Canvas·WebSocket; career-tactics: React·TypeScript·Gemini API·Firebase; notion_travel_bridge: Python·Gemini API·Notion API·Playwright; mwomeog: Next.js·TypeScript). Summaries for the `more` entries come from the repo `description` fields read on 2026-11-27; if one is empty, write a neutral one-line description of the name only, no claims.
- [ ] **Step 4: Run** `node --test test/content.test.mjs` — Expected: all PASS.
- [ ] **Step 5: Commit** `git add src/content.mjs test/content.test.mjs && git commit -m "feat: portfolio content data"` (run `git init` first if the folder is not a repo).

### Task 2: Render functions

**Files:**
- Create: `src/render.mjs`
- Test: `test/render.test.mjs`

**Interfaces:**
- Consumes: `content` shape from Task 1.
- Produces: `escapeHtml(s:string):string`, `renderHero(hero)`, `renderErp(erp)`, `renderProjects(title:string, list:Project[])`, `renderTimeline(timeline)`, `renderContact(contact)` — each returns an HTML string for one `<section>`; and `renderBody(content):string` returning all sections joined in the Global Constraints order. Links use `target="_blank" rel="noopener noreferrer"`.

- [ ] **Step 1: Write the failing tests** in `test/render.test.mjs`:
  - `escapeHtml('<a href="x">&</a>') === '&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;'`.
  - `renderProjects escapes summary` using a project whose summary is `<script>alert(1)</script>`; output must not contain `<script>`.
  - `renderProjects with only a repo link emits exactly one <a>` for that project card.
  - `external links carry rel="noopener noreferrer"` (every `target="_blank"` has the rel).
  - `renderErp contains 코드는 비공개 and Next.js`.
  - `renderBody orders sections` : indexes of `id="erp"`, `id="projects"`, `id="more"`, `id="timeline"`, `id="contact"` are strictly increasing, after `id="hero"`.
- [ ] **Step 2: Run** `node --test test/render.test.mjs` — Expected: FAIL.
- [ ] **Step 3: Implement the functions in `src/render.mjs`.** Every dynamic string goes through `escapeHtml`; sections get the ids above; project cards are `<article class="card">`; stack renders as `<ul class="tags">`; contact renders `mailto:` link plus GitHub links (my call: plain mailto, no obfuscation).
- [ ] **Step 4: Run** `node --test` — Expected: all PASS.
- [ ] **Step 5: Commit** `git add src/render.mjs test/render.test.mjs && git commit -m "feat: section render functions"`.

### Task 3: Build script, styles, visual check

**Files:**
- Create: `scripts/build.mjs`, `style.css`
- Generate: `index.html`, `.nojekyll`
- Test: `test/build.test.mjs`

**Interfaces:**
- Consumes: `renderBody(content)` from Task 2, `content` from Task 1.
- Produces: `export function buildHtml(content):string` in `scripts/build.mjs` (full document); running `node scripts/build.mjs` writes `index.html` at the repo root.

- [ ] **Step 1: Write the failing tests** in `test/build.test.mjs`:
  - `buildHtml has lang ko, viewport meta, and a description meta containing the tagline`.
  - `buildHtml contains 조상혁 and the tagline in the markup`.
  - `buildHtml has no <script tag`.
  - `buildHtml links style.css`.
  - `title is "조상혁 | 포트폴리오"`.
- [ ] **Step 2: Run** `node --test test/build.test.mjs` — Expected: FAIL.
- [ ] **Step 3: Implement `buildHtml` and the file-writing entry in `scripts/build.mjs`** (write only when run as main; also write an empty `.nojekyll`). Add Open Graph `og:title` and `og:description` meta.
- [ ] **Step 4: Write `style.css`** per Global Constraints: CSS variables for light/dark, 720px column, cards as 1px bordered boxes, tags as small outlined pills, `overflow-wrap:anywhere` on links and tags, timeline as a left rule with year labels, 외주 card visually first (accent-colored left border), `a:focus-visible` outline, base font 16px, line-height 1.7.
- [ ] **Step 5: Run** `node --test` — Expected: all PASS; then `node scripts/build.mjs` — Expected: `index.html` exists.
- [ ] **Step 6: Visual check.** Open `index.html` through the browser tool at 380px and 1280px widths; confirm no horizontal scrollbar, ERP card first, all four project cards and links visible, dark mode readable. Fix CSS until it holds, then show the person the screenshots.
- [ ] **Step 7: Commit** `git add -A && git commit -m "feat: static build, styles, generated index.html"`.

### Task 4: Deploy to GitHub Pages (needs the person's yes)

**Files:**
- Modify (remote): repo `sang-mil/sang-mil.github.io`, branch `main` — replace the Chirpy blog template with this project's files.

**Interfaces:**
- Consumes: the committed files from Task 3 (`index.html`, `style.css`, `.nojekyll`, `src/`, `scripts/`, `test/`, `docs/`).

- [ ] **Step 1: Ask the person to confirm** replacing the existing Chirpy template files in `sang-mil.github.io` (state: all template files will be removed, the repo history keeps them). Do nothing remote until a clear yes.
- [ ] **Step 2: Check the Pages source setting** with `gh api repos/sang-mil/sang-mil.github.io/pages` (or ask the person to read Settings → Pages). If it is "GitHub Actions", also add `.github/workflows/pages.yml` that uploads the repo root with `actions/upload-pages-artifact` and deploys with `actions/deploy-pages`; if it is "Deploy from a branch / main / root", no workflow is needed and the template's old workflow must be deleted.
- [ ] **Step 3: Replace the files.** Prefer `git clone` + commit + push via the preconfigured proxy; if push is refused, use the GitHub tools (`push_files` for additions, `delete_file` for each template file).
- [ ] **Step 4: Verify live.** Fetch `https://sang-mil.github.io` (allow a few minutes) and confirm it shows 조상혁 and the ERP card; if it shows the old blog or 404, re-check Step 2.
- [ ] **Step 5: Tell the person** the URL and what to edit later (`src/content.mjs`, then `node scripts/build.mjs`).

## Self-review notes

- Coverage: hero, ERP, 4 projects, more, timeline, contact, style, no-JS, deploy are each owned by a task above.
- Names checked: `content`, `renderBody`, `buildHtml`, `escapeHtml` are used identically in every task.
- Open calls I made (for the person to veto): plain `mailto:` email; generated static HTML instead of client-side rendering; accent `#2563eb`.

## Amendment 2026-11-27 (after plan approval): add /blog

The person asked to merge the old blog with the portfolio. Chosen structure: `/` = portfolio, `/blog/` = post list, `/blog/<slug>/` = a post. Replaces the Chirpy template entirely (also approved). Added **Task 3b** before deploy:

- Posts are Markdown files `posts/YYYY-MM-DD-slug.md` with front matter `title`, `date`, `summary`; `parsePost(filename, text): {slug,title,date,summary,html}` (missing title throws); Markdown → HTML with the `marked` npm package (build-time dev dependency; output is committed static HTML).
- `renderBlogIndex(posts): string` (newest first; empty list shows `아직 글이 없어요`), `renderPost(post): string`; shared `layout({title,description,body})` in `scripts/build.mjs` adds a top nav `포트폴리오` (`/`) and `블로그` (`/blog/`); asset URLs become absolute (`/style.css`).
- No starter post is invented; the blog starts empty.
- Task 4 deploy also adds `.github/workflows/pages.yml` (static upload) because the old workflow is Chirpy/Jekyll.
