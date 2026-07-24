import type { Lang } from "@/lib/i18n";

// ── Language-invariant facts (single source — never diverge by locale) ──
const contact = {
  name: "강지은",
  nameEn: "Ji-Eun Kang",
  location: "서울 성북구",
  locationEn: "Seongbuk-gu, Seoul",
  email: "zieun.kang@gmail.com",
  phone: "+82 10-6244-5650",
  github: "https://github.com/hizieun",
  resumeNotion:
    "https://happy-pin-84f.notion.site/_-117d7bc68dc38049a200dff74caeacf0",
};

// Strengths labels/details are already English-native — shared verbatim.
const strengths = [
  { label: "LLM / RAG / Agent", detail: "GPT-4o · Bedrock · LangChain · LangGraph · MCP · Ragas" },
  { label: "Python 백엔드 / Backend", detail: "FastAPI · Flask · async · microservices" },
  { label: "AWS Serverless", detail: "Lambda · AppSync · DynamoDB · OpenSearch · SageMaker · Bedrock" },
  { label: "Computer Vision", detail: "PyTorch · TensorFlow · OCR · Object Detection · SSL" },
];

// Skills are technology names — shared verbatim across locales.
const skills = {
  "AI / ML": [
    "Amazon Bedrock",
    "GPT-4o",
    "LangChain",
    "LangGraph",
    "MCP",
    "OpenAI Assistants API",
    "PyTorch",
    "Ragas",
    "TensorFlow",
    "Titan Embeddings v2",
  ],
  "Vision / NLP": [
    "DenseNet · WideResNet · LaplaceNet",
    "Function Calling",
    "KoBERTSum",
    "OCR (marker, Surya, GCP Vision)",
    "RAG / Vector Search",
    "YOLO · EfficientDet",
  ],
  "Backend & Data": [
    "Aurora · Kendra",
    "AWS Glue",
    "DynamoDB",
    "OpenSearch",
    "PostgreSQL · MySQL · MSSQL · Teradata",
    "Python (FastAPI, Flask)",
    "TypeScript / Node.js",
  ],
  "Cloud & MLOps": [
    "AWS AppSync (GraphQL)",
    "AWS Cognito · Step Functions",
    "AWS Lambda",
    "AWS SageMaker",
    "CloudWatch",
    "Docker",
    "MLflow",
    "Ray",
  ],
};

// Shared side-project facts (names, links, stacks). Only copy is localized.
const sideProjectsBase = {
  myArxiv: {
    image: "/sideprojects/my-arxiv.png" as string | null,
    placeholderGradient: null as string | null,
    placeholderEmoji: null as string | null,
    live: "https://my-arxiv.vercel.app/" as string | null,
    repo: "https://github.com/hizieun/my-arxiv",
    released: "2026.05 –",
    status: "Currently building",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "Gemini 2.5 Flash",
      "arXiv Atom API",
      "HuggingFace API",
      "Docker",
      "GHCR",
    ],
  },
  noodle: {
    image: "/sideprojects/noodle.png" as string | null,
    placeholderGradient: null as string | null,
    placeholderEmoji: null as string | null,
    live: "https://frontend-kappa-six-36.vercel.app/" as string | null,
    repo: "https://github.com/hizieun/noodle-app",
    released: "2026.03 (v1.0.0)",
    status: "Currently building",
    stack: [
      "React 19",
      "Vite 7",
      "Leaflet",
      "Python",
      "Selenium",
      "SQLite",
      "Gemini 3.6 Flash",
      "Workbox PWA",
      "GitHub Actions",
    ],
  },
};

// Shared publication facts. Only summary/role are localized.
const pubBase = {
  bmc: {
    title:
      "Application of entire dental panorama image data in artificial intelligence model for age estimation",
    venue: "BMC Oral Health",
    date: "2023.12.15",
    url: "https://link.springer.com/article/10.1186/s12903-023-03745-x",
    caseStudySlug: "dental-panorama-ai",
  },
  dmfr: {
    title:
      "The efficacy of supervised learning and semi-supervised learning in diagnosis of impacted third molar on panoramic radiographs through artificial intelligence model",
    venue: "DMFR (Dentomaxillofacial Radiology)",
    date: "2023.05.16",
    url: "https://doi.org/10.1259/dmfr.20230030",
    caseStudySlug: "dental-panorama-ai",
  },
};

// ── Korean profile ─────────────────────────────────────────────────────
const profileKo = {
  ...contact,
  tagline: "데이터의 가치를 구현하는 AI 엔지니어",
  subtagline:
    "LLM 시스템을 production까지 책임지는 6년차 AI 엔지니어. RAG·Agent·MLOps를 금융·교육·의료 도메인에서 deploy한 경험.",

  stats: [
    { label: "경력", value: "6년차" },
    { label: "Production AI 프로젝트", value: "5+" },
    { label: "국제 학술지 게재", value: "2편" },
  ],

  about: [
    "AI 스타트업에서 커리어를 시작해, 컴퓨터 비전(OCR·의료영상)부터 생성형 AI(RAG·Agent)까지 폭넓게 다뤄왔습니다.",
    "단순히 모델을 만드는 게 아니라 production에 올리고 운영하는 일에 강합니다 — 평가 자동화, 권한 거버넌스, 운영 안정성까지.",
    "최근에는 금융 도메인에서 사내 LLM 플랫폼 0→1 구축, 증권사 RAG 파이프라인 운영을 담당하고 있어요.",
  ],

  strengths,
  skills,

  sideProjects: [
    {
      ...sideProjectsBase.myArxiv,
      name: "my-arxiv 📰",
      tagline: "관심 분야의 신규 논문을 한 곳에서 — Gemini로 한국어 요약까지",
      description:
        "arXiv + HuggingFace Daily Papers를 통합 피드로 머지하고, Gemini 2.5 Flash로 abstract를 한국어 요약. 카테고리 토글·통합 검색·노트·읽음 기록까지 자체 디스커버리 워크플로우.",
      highlights: [
        "arXiv + HF 통합 피드",
        "Gemini 한국어 요약",
        "Notes & 읽음 추적",
        "Bio · 뇌과학 포함",
      ],
    },
    {
      ...sideProjectsBase.noodle,
      name: "노포지도 🍜",
      tagline: "서울 노포·야장 800여 곳을 한 지도에서 — AI 맛집 추천까지",
      description:
        "본인 취미(맛집 지도 정리)를 product로 만든 사이드 프로젝트. Selenium 크롤러 → SQLite → React + Leaflet 풀스택을 end-to-end로 직접 구축하고 PWA + GitHub Actions 주간 자동 크롤링까지 운영. Gemini 3.6 Flash 챗봇이 노포지도 데이터에 grounding해 실재하는 식당만 조건별로 추천 (\"비 오는 날 종로구 노포 술집 추천해줘\" 등).",
      highlights: [
        "800+ restaurants",
        "AI 맛집 추천 챗봇",
        "PWA · Offline cache",
        "Weekly GHA cron",
      ],
    },
  ],

  publications: [
    {
      ...pubBase.bmc,
      summary:
        "WideResNet + DenseNet 지도학습에 휴리스틱 그룹화(±3년 편차)를 적용해 예측 정확도를 향상. 전체 영상 활용 방식이 기존 대비 더 효과적임을 입증.",
      role: "공동저자 · 데이터 처리 및 모델 실험 총괄",
    },
    {
      ...pubBase.dmfr,
      summary:
        "WideResNet(SL) vs LaplaceNet(SSL) 비교 — SSL이 소량 라벨링 데이터로도 SL과 유사한 80%+ 정확도를 유지함을 입증. 의료 영상 분석에서 SSL의 실용 가능성 제시.",
      role: "공동저자 · LaplaceNet SSL 실험 설계 및 실행",
    },
  ],

  education: [
    {
      school: "한국외국어대학교 글로벌캠퍼스",
      degree: "산업경영공학 학사",
      period: "2015.03 – 2018.08",
      status: "졸업",
    },
    {
      school: "남서울대학교",
      degree: "산업경영공학",
      period: "2013.03 – 2015.02",
      status: "수료",
    },
  ],

  certifications: [
    { name: "정보처리기사", issuer: "산업인력공단", date: "2021.06.02" },
  ],

  training: [
    {
      name: "트랜스포머 기반 한-영 번역 AI 제작 교육",
      issuer: "한국메타버스산업협회",
      period: "2023.09",
    },
    {
      name: "빅데이터 분석(R)을 위한 자바 개발자 과정",
      issuer: "더조은IT아카데미",
      period: "2019.08 – 2019.12",
    },
  ],

  experience: [
    {
      company: "페르소나에이아이",
      role: "데이터팀 · 대리 (프리랜서)",
      period: "2025.12 – 현재",
      client: "KB증권" as string | null,
      highlight: "증권사 RAG 데이터 파이프라인 운영 및 고도화",
      current: true,
    },
    {
      company: "아이티센피앤에스",
      role: "보안컨설팅팀 · 책임 (프리랜서)",
      period: "2025.06 – 2025.09",
      client: "현대캐피탈 (수행: AWS Korea)" as string | null,
      highlight: "사내 LLM 챗봇 플랫폼 0→1 — RAG 권한·AI Market·MCP",
      current: false,
    },
    {
      company: "뉴로코어",
      role: "생성형 A.I. 파트 · 선임연구원 (정규직)",
      period: "2024.01 – 2025.03",
      client: null as string | null,
      highlight: "GPT-4o RAG Agent 리딩 — 정확도 +30%, 평가효율 +40%, 3사 시연",
      current: false,
    },
    {
      company: "진학사",
      role: "솔루션사업팀 · PD (정규직)",
      period: "2022.05 – 2023.07",
      client: null as string | null,
      highlight: "대학 입학전형 OCR 시스템 — 수작업 대비 40% 단축, 특허 1건",
      current: false,
    },
    {
      company: "자이플래닛",
      role: "AI사업본부 · 주임연구원 (정규직)",
      period: "2020.04 – 2022.05",
      client: null as string | null,
      highlight: "치과 영상 AI — SSL 80%+ 정확도, 국제 학술지 2편 publish",
      current: false,
    },
  ],
};

// ── English profile (big-tech résumé convention: verb-led, quantified) ──
// Same facts as profileKo (numbers, dates, companies must match the KO
// source). Titles drop Korean ranks (대리/책임) in favor of role-function,
// which reads stronger in English. `typeof profileKo` enforces shape parity.
const profileEn: typeof profileKo = {
  ...contact,
  tagline: "AI Engineer shipping LLM systems to production",
  subtagline:
    "6+ years taking RAG, agents, and MLOps from prototype to production — across finance, edtech, and healthcare.",

  stats: [
    { label: "Experience", value: "6+ yrs" },
    { label: "Production AI projects", value: "5+" },
    { label: "Papers published", value: "2" },
  ],

  about: [
    "Started my career at an AI startup and have worked across the stack — from computer vision (OCR, medical imaging) to generative AI (RAG, agents).",
    "I'm strong at the unglamorous part: getting models into production and keeping them there — eval automation, access governance, operational stability.",
    "Lately I've been in fintech — standing up an internal LLM platform 0→1 and operating a securities-domain RAG pipeline.",
  ],

  strengths,
  skills,

  sideProjects: [
    {
      ...sideProjectsBase.myArxiv,
      name: "my-arxiv 📰",
      tagline: "New papers in your fields, in one feed — Korean summaries via Gemini",
      description:
        "Merges arXiv + HuggingFace Daily Papers into one feed and summarizes abstracts in Korean with Gemini 2.5 Flash. A personal discovery workflow with category toggles, unified search, notes, and read-tracking.",
      highlights: [
        "arXiv + HF feed",
        "Gemini KO summary",
        "Notes & read-tracking",
        "incl. bio · neuro",
      ],
    },
    {
      ...sideProjectsBase.noodle,
      name: "Nopo Map 🍜",
      tagline: "800+ of Seoul's old-school & street-food spots on one map — with AI recommendations",
      description:
        "Turned a personal hobby (mapping restaurants) into a product. Built the full stack end-to-end — Selenium crawler → SQLite → React + Leaflet — plus a PWA offline cache and a weekly GitHub Actions crawl. A Gemini 3.6 Flash chatbot, grounded on the Nopo Map dataset, recommends only real spots by free-form criteria (e.g. \"a cozy place near Jongno for a rainy day\").",
      highlights: [
        "800+ restaurants",
        "AI recommendation chatbot",
        "PWA · offline cache",
        "Weekly GHA cron",
      ],
    },
  ],

  publications: [
    {
      ...pubBase.bmc,
      summary:
        "Improved age-estimation accuracy by applying heuristic grouping (±3-year tolerance) on WideResNet + DenseNet supervised models; showed full-panorama input outperforms cropped regions.",
      role: "Co-author · led data processing and model experiments",
    },
    {
      ...pubBase.dmfr,
      summary:
        "Compared WideResNet (SL) vs LaplaceNet (SSL) — SSL held 80%+ accuracy with far fewer labels, demonstrating SSL's practicality for medical imaging.",
      role: "Co-author · designed and ran the LaplaceNet SSL experiments",
    },
  ],

  education: [
    {
      school: "Hankuk Univ. of Foreign Studies (Global Campus)",
      degree: "B.S., Industrial & Management Engineering",
      period: "Mar 2015 – Aug 2018",
      status: "Graduated",
    },
    {
      school: "Namseoul University",
      degree: "Industrial & Management Engineering",
      period: "Mar 2013 – Feb 2015",
      status: "Completed",
    },
  ],

  certifications: [
    {
      name: "Engineer Information Processing",
      issuer: "HRD Korea",
      date: "Jun 2021",
    },
  ],

  training: [
    {
      name: "Transformer-based KO–EN Translation AI",
      issuer: "Korea Metaverse Industry Assoc.",
      period: "Sep 2023",
    },
    {
      name: "Big Data Analytics (R) & Java Developer Course",
      issuer: "TheJoeun IT Academy",
      period: "Aug 2019 – Dec 2019",
    },
  ],

  experience: [
    {
      company: "PersonaAI",
      role: "AI / Backend Engineer (Contract)",
      period: "Dec 2025 – Present",
      client: "KB Securities",
      highlight:
        "Operating and scaling a securities-domain RAG data pipeline backing KB's in-house AI agent suite",
      current: true,
    },
    {
      company: "ITCEN P&S",
      role: "AI / Backend Engineer (Contract)",
      period: "Jun 2025 – Sep 2025",
      client: "Hyundai Capital (via AWS Korea)",
      highlight:
        "Built an internal LLM platform 0→1 — RAG document permissions, an in-house chatbot marketplace, and MCP tool integration",
      current: false,
    },
    {
      company: "NeuroCore",
      role: "Lead AI Engineer",
      period: "Jan 2024 – Mar 2025",
      client: null,
      highlight:
        "Led a GPT-4o RAG agent — +30% answer accuracy, +40% eval throughput, demoed to 3 enterprises",
      current: false,
    },
    {
      company: "Jinhak",
      role: "Deep Learning Engineer",
      period: "May 2022 – Jul 2023",
      client: null,
      highlight:
        "Built an admissions-document OCR system — cut manual entry time 40%, 1 patent filed",
      current: false,
    },
    {
      company: "Xaiplanet",
      role: "AI Engineer",
      period: "Apr 2020 – May 2022",
      client: null,
      highlight:
        "Dental-imaging AI — held 80%+ accuracy with SSL, 2 papers published in international journals",
      current: false,
    },
  ],
};

export function getProfile(lang: Lang) {
  return lang === "en" ? profileEn : profileKo;
}

// Back-compat default export (Korean) for components that only need
// language-invariant facts like the name.
export const profile = profileKo;
