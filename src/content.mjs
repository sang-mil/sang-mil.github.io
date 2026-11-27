const gh = (account, repo) => ({ label: 'GitHub', url: `https://github.com/${account}/${repo}` });

export const content = {
  hero: {
    name: '조상혁',
    affiliation: '국민대학교 소프트웨어학과 2학년',
    tagline: '새로운 소식을 빠르게 접하고 무엇이든 만들어보는 사람',
    sub: '2023년부터 계속 만들고 있어요',
  },

  erp: {
    title: '기업용 ERP 외주 개발',
    period: '2026년 7월 ~ 현재',
    status: '테스트 배포 중 · 피드백 수집 후 완성 예정',
    role: '디자인 · 프론트엔드 · 백엔드 전 과정을 혼자 담당',
    features: ['재고 관리', 'A/S 관리', '이슈 관리', '문자 발송 관리'],
    stack: ['Next.js', 'Flask', 'MySQL'],
    note: '고객사 프로젝트라 코드는 비공개',
  },

  projects: [
    {
      id: 'mwomeog',
      title: 'mwomeog',
      summary: '뭐 먹을지 지도를 보고 결정하는 맛집 선택 서비스.',
      stack: ['Next.js', 'TypeScript'],
      links: [{ label: '라이브', url: 'https://mwomeog.vercel.app' }, gh('sang-mil', 'mwomeog')],
    },
    {
      id: 'sugerRush',
      title: 'Sugar Rush',
      summary: '디저트 파이터가 싸우는 실시간 PvP 아케이드 게임. 캐릭터 4종, AI 봇, 온라인 모드.',
      stack: ['React', 'TypeScript', 'Vite', 'Canvas', 'WebSocket'],
      links: [{ label: '플레이', url: 'https://suger-rush.vercel.app' }, gh('sang-mil', 'sugerRush')],
    },
    {
      id: 'career-tactics',
      title: 'Career Tactics',
      summary: 'KIT 바이브코딩 공모전 출품작. Gemini가 만든 세계관 속 퀘스트로 성향을 분석하고 직업을 추천하는 진로 탐색 앱.',
      stack: ['React', 'TypeScript', 'Gemini API', 'Firebase'],
      links: [{ label: '라이브', url: 'https://career-tactics.vercel.app' }, gh('sang-mil', 'career-tactics')],
    },
    {
      id: 'notion_travel_bridge',
      title: 'Notion Travel Bridge',
      summary: 'Notion에 적은 여행 계획을 Gemini로 구조화해 Google 지도 핀으로 만들고, 지도 링크를 다시 Notion에 기록하는 Windows 자동화 도구.',
      stack: ['Python', 'Gemini API', 'Notion API', 'Playwright'],
      links: [gh('sang-mil', 'notion_travel_bridge')],
    },
  ],

  more: [
    {
      id: 'news-for-me',
      title: 'News for Me',
      summary: '관심 주제의 뉴스를 모아 AI로 요약하고 개인 아카이브와 이메일 브리핑으로 보여 주는 뉴스룸.',
      stack: ['React', 'TypeScript', 'Cloudflare Workers', 'Gemini API'],
      links: [gh('sang-mil', 'news-for-me')],
    },
    {
      id: 'event-aware-maps',
      title: 'Event-aware Maps',
      summary: '잠실·올림픽공원에 행사가 겹치는 날, 어느 역과 노선으로 언제 이동하면 덜 붐비는지 알려 주는 이동 안내 서비스.',
      stack: ['Python', '정적 웹'],
      links: [gh('sang-mil', 'event-aware-maps')],
    },
    {
      id: 'prompt_up',
      title: 'prompt_up',
      summary: '바이브코딩을 하기 위해 바이브코딩으로 만든 도구.',
      stack: ['TypeScript'],
      links: [{ label: '라이브', url: 'https://prompt-up-beta.vercel.app' }, gh('p0tat019', 'prompt_up')],
    },
    {
      id: 'simulator',
      title: 'simulator',
      summary: '팀 시뮬레이터 게임. 무료로 운영하려고 바이브코딩으로 만들었어요.',
      stack: ['TypeScript'],
      links: [{ label: '플레이', url: 'https://simulator-taupe-seven.vercel.app' }, gh('p0tat019', 'simulator')],
    },
    {
      id: 'OnEat',
      title: 'OnEat',
      summary: '바이브코딩으로 만든 프로젝트.',
      stack: ['TypeScript'],
      links: [{ label: '라이브', url: 'https://on-eat.vercel.app' }, gh('p0tat019', 'OnEat')],
    },
  ],

  timeline: [
    { year: '2023', items: ['Arduino', '일기 프로젝트', '파이썬 알고리즘 공부'] },
    { year: '2024', items: ['C++ 스네이크 게임', 'SNS 프로젝트', '지역 도시재생 프로젝트'] },
    { year: '2025', items: ['바이브코딩 도구 만들기: prompt_up, simulator, OnEat, PC_Ai'] },
    {
      year: '2026',
      items: [
        'mwomeog, Sugar Rush, Career Tactics, Notion Travel Bridge',
        'News for Me, Event-aware Maps',
        '기업용 ERP 외주 (7월~)',
      ],
    },
  ],

  contact: {
    email: 'sangmil6369@gmail.com',
    links: [
      { label: 'GitHub · sang-mil', url: 'https://github.com/sang-mil' },
      { label: 'GitHub · p0tat019', url: 'https://github.com/p0tat019' },
    ],
  },
};
