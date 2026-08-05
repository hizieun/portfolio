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
      // `bullets` are résumé-only detail (the site shows `highlight`).
      // Standalone-readable: a recruiter who never opens the URL still
      // gets the depth.
      bullets: [
        "사내 AI 플랫폼 '깨비AI'의 4개 Agent(법무검토·고객상담·약정체크·코딩도움)를 받치는 3개 RAG 파이프라인(사내 KMS·펀드/ELS 상품·법령/판례) 운영·고도화",
        "법령 수집을 수동 PDF 다운로드 → Open API 자동 적재로 전환하고, 해시·버전 기반 개정감지로 변경 조항만 incremental 재임베딩 (전체 재인덱싱 제거)",
        "OpenSearch Bulk Insert 마이그레이션(배치 사이즈 튜닝·partial retry·throughput 계측)으로 배치 시간 단축, 야간 윈도우 내 안정 완료",
        "RDS PostgreSQL 파이프라인 state 스키마 설계 — 개정감지→수집→파싱→청킹→적재 5단계 추적으로 재실행 지점 특정 및 idempotent 보장",
        "marker/Surya OCR·LangChain 청킹·Titan Embeddings v2(Bedrock) 기반 적재, trace_id 로그 표준화로 장애 원인 모듈 식별 시간 단축",
      ],
      current: true,
    },
    {
      company: "아이티센피앤에스",
      role: "보안컨설팅팀 · 책임 (프리랜서)",
      period: "2025.06 – 2025.09",
      client: "현대캐피탈 (수행: AWS Korea)" as string | null,
      highlight: "사내 LLM 챗봇 플랫폼 0→1 — RAG 권한·AI Market·MCP",
      bullets: [
        "전 임직원 대상 사내 LLM 챗봇 플랫폼을 AWS Serverless(Lambda·AppSync GraphQL/WebSocket·DynamoDB·Bedrock·OpenSearch·Cognito·Step Functions)로 0→1 구축",
        "RAG 문서별 권한 모델 설계 — accessRules(광역·조직·사용자 OR 결합 + DRM 직교 플래그) 스키마와 has_access 평가 로직, documents.py 26 커밋",
        "AI Market(사내 챗봇 마켓플레이스) 백엔드 — DynamoDB 단일 테이블 설계로 메타데이터·즐겨찾기·리뷰·승인 통합, GSI 3개로 전 access pattern 단일 쿼리화",
        "MCP 표준 발표 6개월 만에 사내 플랫폼에 도입 — Tools 테이블 → LangChain StructuredTool 동적 로딩으로 Bedrock 추론 파이프라인에 통합",
      ],
      current: false,
    },
    {
      company: "뉴로코어",
      role: "생성형 A.I. 파트 · 선임연구원 (정규직)",
      period: "2024.01 – 2025.03",
      client: null as string | null,
      highlight: "GPT-4o RAG Agent 리딩 — 정확도 +30%, 평가효율 +40%, 3사 시연",
      bullets: [
        "3인 팀 리딩 — 제조 생산 시뮬레이션 데이터를 자연어로 분석하는 RAG Agent(GPT-4o·LangGraph·Function Calling) 설계 및 응답 흐름 기획 주도",
        "도메인 컨설턴트의 암묵지를 신호 트리·분석 함수·판단 매뉴얼 RAG·Instruction 4개 레이어로 구조화, 납기율·병목공정 등 10+ KPI 자동 응답 구현",
        "GPU 없는 환경에서 OpenAI Q&A Fine-tuning + RAG 하이브리드 채택 — 응답 정확도 +30% (10문항 평가셋·컨설턴트 합의 채점, prototype 검증)",
        "Ragas 기반 학습 QA 100건 자동 생성 + 컨설턴트 전수 검수 체계로 데이터 처리 효율 +40%, 평가셋은 leakage 방지 위해 별도 수작성",
        "Flask → FastAPI 비동기 전환으로 Function Calling 동시 호출 latency 개선, 국내 대기업 3사 시연 및 특허 기획 참여",
      ],
      current: false,
    },
    {
      company: "진학사",
      role: "솔루션사업팀 · PD (정규직)",
      period: "2022.05 – 2023.07",
      client: null as string | null,
      highlight: "대학 입학전형 OCR 시스템 — 수작업 대비 40% 단축, 특허 1건",
      bullets: [
        "3인 TF 딥러닝 리더 — 대학별로 양식이 다른 모집요강·학생부를 자동 인식·구조화하는 OCR 파이프라인 개발, 수작업 대비 입력 시간 40% 단축",
        "한글 특화 OCR 모델 비교 실험 후 텍스트 정규화·키워드 추출 후처리 설계로 양식 편차 흡수, 모집단위·전형명 등 주요 필드 영역 인식 구조 구현",
        "Flask 웹 프로토타입까지 직접 구현해 프론트엔드 연동 검증, 딥러닝 기반 OCR 특허 출원 1건 참여 (기술 문서 작성)",
        "사내 딥러닝(CV) 스터디 팀장 및 기술 블로그 딥러닝 파트 담당",
      ],
      current: false,
    },
    {
      company: "자이플래닛",
      role: "AI사업본부 · 주임연구원 (정규직)",
      period: "2020.04 – 2022.05",
      client: null as string | null,
      highlight: "치과 영상 AI — SSL 80%+ 정확도, 국제 학술지 2편 publish",
      bullets: [
        "4인 연구팀에서 데이터 처리·모델 실험 총괄 — 치과 파노라마 영상 기반 연령 예측 및 매복치 발치 난이도 판정 모델 개발 (병원 공동 연구)",
        "LaplaceNet 기반 반지도학습 vs 지도학습 비교 실험 설계 — 소량 라벨만으로 지도학습 수준 80%+ 정확도 입증, 국제 학술지 2편 공동저자 (BMC Oral Health·DMFR 2023)",
        "PyTorch 구현 + Ray 기반 하이퍼파라미터 탐색 자동화, ±3년 휴리스틱 그룹화로 임상 활용 가능한 정확도 범위 검증",
        "YOLOv4 공사장 안전장비 탐지(NIPA), EfficientDet 치과질환 추론 API(NIA), KoBERTSum 문서 요약(행안부) 등 CV·NLP 다도메인 과제 수행",
      ],
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
      bullets: [
        "Operate and scale three RAG pipelines (internal-ops KMS, fund/ELS products, law/precedent) that serve as the data backbone for four agents on KB's internal AI platform",
        "Replaced manual PDF downloads with Open API ingestion plus hash/version revision detection, so only amended provisions are re-embedded instead of full re-indexing",
        "Migrated embedding loads to the OpenSearch Bulk API (batch-size tuning, partial retry, throughput metrics), cutting batch runtime to finish safely inside the nightly window",
        "Designed the RDS PostgreSQL pipeline-state schema tracking five stages (revision detection → ingestion → parsing → chunking → load) for exact resume points and idempotent re-runs",
        "Built ingestion on marker/Surya OCR, LangChain chunking, and Titan Embeddings v2 (Bedrock); standardized logs with a trace_id to cut incident triage time",
      ],
      current: true,
    },
    {
      company: "ITCEN P&S",
      role: "AI / Backend Engineer (Contract)",
      period: "Jun 2025 – Sep 2025",
      client: "Hyundai Capital (via AWS Korea)",
      highlight:
        "Built an internal LLM platform 0→1 — RAG document permissions, an in-house chatbot marketplace, and MCP tool integration",
      bullets: [
        "Built a company-wide internal LLM chatbot platform 0→1 on AWS Serverless (Lambda, AppSync GraphQL/WebSocket, DynamoDB, Bedrock, OpenSearch, Cognito, Step Functions)",
        "Designed the per-document RAG permission model — an accessRules schema (broad · org · user OR-combined, plus an orthogonal DRM flag) and the has_access evaluation logic, 26 commits in documents.py",
        "Owned the AI Market backend — a DynamoDB single-table design unifying metadata, bookmarks, reviews, and approvals, with 3 GSIs turning every access pattern into a single query",
        "Adopted MCP six months after the standard shipped — Tools table → LangChain StructuredTool dynamic loading, wired into the Bedrock inference pipeline",
      ],
      current: false,
    },
    {
      company: "NeuroCore",
      role: "Lead AI Engineer",
      period: "Jan 2024 – Mar 2025",
      client: null,
      highlight:
        "Led a GPT-4o RAG agent — +30% answer accuracy, +40% eval throughput, demoed to 3 enterprises",
      bullets: [
        "Led a 3-person team building a RAG agent (GPT-4o, LangGraph, Function Calling) that answers natural-language questions over manufacturing simulation data",
        "Structured consultants' tacit judgment into four layers — signal trees, analysis functions, heuristic-manual RAG, and instructions — covering 10+ auto-answered KPIs including on-time rate and bottleneck process",
        "Chose an OpenAI Q&A fine-tuning + RAG hybrid under a no-GPU constraint, reaching +30% answer accuracy (10-question eval set, consensus-scored with consultants; prototype validation)",
        "Built a Ragas pipeline generating 100 training QA pairs with full consultant review for +40% data-prep throughput, keeping the eval set hand-written to prevent leakage",
        "Migrated Flask → async FastAPI to cut latency under concurrent Function Calling; demoed to 3 large Korean enterprises and contributed to patent planning",
      ],
      current: false,
    },
    {
      company: "Jinhak",
      role: "Deep Learning Engineer",
      period: "May 2022 – Jul 2023",
      client: null,
      highlight:
        "Built an admissions-document OCR system — cut manual entry time 40%, 1 patent filed",
      bullets: [
        "Deep-learning lead in a 3-person task force building an OCR pipeline that recognizes and structures admissions documents across school-specific formats, cutting manual entry time 40%",
        "Benchmarked Korean-specialized OCR models, then designed text normalization and keyword-extraction post-processing to absorb format variance, plus region recognition for key fields",
        "Built the Flask web prototype and validated frontend integration; contributed to one patent filing for the DL-based OCR system",
        "Led the internal deep-learning (CV) study group and owned the DL section of the company tech blog",
      ],
      current: false,
    },
    {
      company: "Xaiplanet",
      role: "AI Engineer",
      period: "Apr 2020 – May 2022",
      client: null,
      highlight:
        "Dental-imaging AI — held 80%+ accuracy with SSL, 2 papers published in international journals",
      bullets: [
        "Led data processing and model experimentation in a 4-person research team building age-estimation and impacted-tooth difficulty models from dental panoramic radiographs (hospital collaboration)",
        "Designed the LaplaceNet SSL vs. supervised comparison, showing 80%+ supervised-level accuracy from a small labeled set — co-author on 2 international journal papers (BMC Oral Health, DMFR 2023)",
        "Implemented models in PyTorch with Ray-automated hyperparameter search; validated a clinically usable accuracy band via ±3-year heuristic grouping",
        "Delivered multi-domain CV/NLP projects: YOLOv4 construction-site safety-gear detection (NIPA), EfficientDet dental-disease inference API (NIA), KoBERTSum document summarization (MOIS)",
      ],
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
