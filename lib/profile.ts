export const profile = {
  name: "강지은",
  nameEn: "Ji-Eun Kang",
  tagline: "데이터의 가치를 구현하는 AI 엔지니어",
  subtagline:
    "LLM 시스템을 production까지 책임지는 6년차 AI 엔지니어. RAG·Agent·MLOps를 금융·교육·의료 도메인에서 deploy한 경험.",
  location: "서울 성북구",
  email: "zieun.kang@gmail.com",
  phone: "+82 10-6244-5650",
  github: "https://github.com/hizieun",
  resumeNotion:
    "https://happy-pin-84f.notion.site/_-117d7bc68dc38049a200dff74caeacf0",

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

  strengths: [
    { label: "LLM / RAG / Agent", detail: "GPT-4o · Bedrock · LangChain · LangGraph · MCP · Ragas" },
    { label: "Python 백엔드", detail: "FastAPI · Flask · 비동기 처리 · 마이크로서비스" },
    { label: "AWS Serverless", detail: "Lambda · AppSync · DynamoDB · OpenSearch · SageMaker · Bedrock" },
    { label: "Computer Vision", detail: "PyTorch · TensorFlow · OCR · Object Detection · SSL" },
  ],

  skills: {
    "AI / ML": [
      "Amazon Bedrock",
      "GPT-4o",
      "LangChain",
      "LangGraph",
      "MCP",
      "OpenAI Assistants API",
      "OpenAI Q&A Fine-tuning",
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
  } satisfies Record<string, string[]>,

  sideProjects: [
    {
      name: "my-arxiv 📰",
      tagline: "관심 분야의 신규 논문을 한 곳에서 — Gemini로 한국어 요약까지",
      description:
        "arXiv + HuggingFace Daily Papers를 통합 피드로 머지하고, Gemini 2.5 Flash로 abstract를 한국어 요약. 카테고리 토글·통합 검색·노트·읽음 기록까지 자체 디스커버리 워크플로우.",
      image: "/sideprojects/my-arxiv.png" as string | null,
      placeholderGradient: null,
      placeholderEmoji: null,
      live: "https://my-arxiv.vercel.app/" as string | null,
      repo: "https://github.com/hizieun/my-arxiv",
      released: "2026.05 – 진행 중",
      status: "Currently building",
      highlights: [
        "arXiv + HF 통합 피드",
        "Gemini 한국어 요약",
        "Notes & 읽음 추적",
        "Bio · 뇌과학 포함",
      ],
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
    {
      name: "노포지도 🍜",
      tagline: "서울 노포·야장 705곳을 한 지도에서",
      description:
        "본인 취미(맛집 지도 정리)를 product로 만든 사이드 프로젝트. Selenium 크롤러 → SQLite → React + Leaflet 풀스택을 end-to-end로 직접 구축하고 PWA + GitHub Actions 주간 자동 크롤링까지 운영.",
      image: "/sideprojects/noodle.png" as string | null,
      placeholderGradient: null,
      placeholderEmoji: null,
      live: "https://frontend-kappa-six-36.vercel.app/" as string | null,
      repo: "https://github.com/hizieun/noodle-app",
      released: "2026.03.06 (v1.0.0)",
      status: "Currently building",
      highlights: [
        "705 restaurants",
        "25 districts",
        "PWA · Offline cache",
        "Weekly GHA cron",
      ],
      stack: [
        "React 19",
        "Vite 7",
        "Leaflet",
        "Python",
        "Selenium",
        "SQLite",
        "Workbox PWA",
        "GitHub Actions",
      ],
    },
  ],

  publications: [
    {
      title:
        "Application of entire dental panorama image data in artificial intelligence model for age estimation",
      venue: "BMC Oral Health",
      date: "2023.12.15",
      url: "https://link.springer.com/article/10.1186/s12903-023-03745-x",
      summary:
        "WideResNet + DenseNet 지도학습에 휴리스틱 그룹화(±3년 편차)를 적용해 예측 정확도를 향상. 전체 영상 활용 방식이 기존 대비 더 효과적임을 입증.",
      role: "공동저자 · 데이터 처리 및 모델 실험 총괄",
      caseStudySlug: "dental-panorama-ai",
    },
    {
      title:
        "The efficacy of supervised learning and semi-supervised learning in diagnosis of impacted third molar on panoramic radiographs through artificial intelligence model",
      venue: "DMFR (Dentomaxillofacial Radiology)",
      date: "2023.05.16",
      url: "https://doi.org/10.1259/dmfr.20230030",
      summary:
        "WideResNet(SL) vs LaplaceNet(SSL) 비교 — SSL이 소량 라벨링 데이터로도 SL과 유사한 80%+ 정확도를 유지함을 입증. 의료 영상 분석에서 SSL의 실용 가능성 제시.",
      role: "공동저자 · LaplaceNet SSL 실험 설계 및 실행",
      caseStudySlug: "dental-panorama-ai",
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
    {
      name: "정보처리기사",
      issuer: "산업인력공단",
      date: "2021.06.02",
    },
  ],

  training: [
    {
      name: "트랜스포머 기반 한-영 번역 AI 제작 교육",
      issuer: "한국메타버스산업협회",
      period: "2023.09.18 – 2023.09.22",
    },
    {
      name: "빅데이터 분석(R)을 위한 자바 개발자 과정",
      issuer: "더조은IT아카데미",
      period: "2019.08.16 – 2019.12.24",
    },
  ],

  experience: [
    {
      company: "페르소나에이아이",
      role: "데이터팀 · 대리 (프리랜서)",
      period: "2025.12 – 현재",
      client: "KB증권",
      highlight: "증권사 RAG 데이터 파이프라인 운영 및 고도화",
    },
    {
      company: "아이티센피앤에스",
      role: "보안컨설팅팀 · 책임 (프리랜서)",
      period: "2025.06 – 2025.09",
      client: "현대캐피탈 (수행: AWS Korea)",
      highlight: "사내 LLM 챗봇 플랫폼 0→1 — RAG 권한·AI Market·MCP",
    },
    {
      company: "뉴로코어",
      role: "생성형 A.I. 파트 · 선임연구원 (정규직)",
      period: "2024.01 – 2025.03",
      highlight: "GPT-4o RAG Agent 리딩 — 정확도 +30%, 평가효율 +40%, 3사 시연",
    },
    {
      company: "진학사",
      role: "솔루션사업팀 · PD (정규직)",
      period: "2022.05 – 2023.07",
      highlight: "대학 입학전형 OCR 시스템 — 수작업 대비 40% 단축, 특허 1건",
    },
    {
      company: "자이플래닛",
      role: "AI사업본부 · 주임연구원 (정규직)",
      period: "2020.04 – 2022.05",
      highlight: "치과 영상 AI — SSL 80%+ 정확도, 국제 학술지 2편 publish",
    },
  ],
};
