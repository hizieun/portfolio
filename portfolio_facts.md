# 강지은 — 경력 사실 시트

> 면접 직전 5분 안에 다시 보는 *사실 모음*. 스토리는 portfolio_stories.md 참고.

## 인적사항

- 이름: 강지은 (Ji-Eun Kang)
- 경력: 6년 3개월 (정규직 3곳 + 프리랜서 2곳)
- 이메일: zieun.kang@gmail.com
- 전화: +82 10-6244-5650
- 위치: 서울 성북구
- GitHub: https://github.com/hizieun
- 노션 이력서: https://happy-pin-84f.notion.site/_-117d7bc68dc38049a200dff74caeacf0

---

## 경력 (5곳)

| 기간 | 회사 / 고용형태 | 직책 / 소속 | 고객사 | 한 줄 |
|---|---|---|---|---|
| 2025.12 – 현재 | 페르소나에이아이 / 프리랜서 | 데이터팀 · 대리 | KB증권 | 증권사 RAG 데이터 파이프라인 운영·고도화 |
| 2025.06 – 2025.09 | 아이티센피앤에스 / 프리랜서 | 보안컨설팅팀 · 책임 | 현대캐피탈 (수행: AWS Korea) | 사내 LLM 챗봇 플랫폼 0→1 |
| 2024.01 – 2025.03 | 뉴로코어 / 정규직 | 생성형 A.I. 파트 · 선임연구원 | 자체 product | GPT-4o RAG + OpenAI Q&A Fine-tuning hybrid 프로젝트 리딩 |
| 2022.05 – 2023.07 | 진학사 / 정규직 | 솔루션사업팀 · PD | 자체 product | 대학 입학전형 OCR 시스템 |
| 2020.04 – 2022.05 | 자이플래닛 / 정규직 | AI사업본부 · 주임연구원 | 다도메인 | 의료영상 SSL 연구 + 다도메인 CV 프로젝트 |

---

## 프로젝트 (5)

### 1. KB증권 깨비AI · RAG 데이터 파이프라인
- 기간: 2025.12 – 현재 (진행 중)
- 회사: 페르소나에이아이 (프리랜서)
- 역할: AI/Backend Engineer · 대리 (데이터팀)
- 팀: 데이터팀
- 도메인: 금융 / 증권 / 법무
- 3개 파이프라인: 사내 운영지원 KMS, 펀드/ELS, 법령/판례
- 4개 Agent 백본: 법무검토 · 고객상담 · 약정체크 · 코딩도움
- 핵심 기술: Python, Amazon Bedrock, Titan Embeddings v2, LangChain, OpenSearch, AWS RDS(PostgreSQL), Teradata, S3, AWS SageMaker, AWS Glue, CloudWatch, marker/Surya OCR
- 지표: OpenSearch Bulk Insert 마이그레이션, 수동 PDF → Open API 자동화, revision detection 적용, PostgreSQL state 관리 설계

### 2. 현대캐피탈 AI Playground · 사내 LLM 플랫폼 0→1
- 기간: 2025.06 – 2025.09 (3개월)
- 회사: 아이티센피앤에스 (프리랜서, AWS Korea 수행)
- 역할: AI/Backend Engineer · 책임
- 팀: 다인 팀, 본인 백엔드/RAGOps 풀스택 담당
- 도메인: 금융 (캐피탈), 사내 플랫폼
- 베이스: aws-samples/aws-genai-llm-chatbot 오픈소스 솔루션
- 핵심 기능 (HC 전용): RAG 문서별 권한 모델 (광역·조직·사용자 OR + DRM 직교 플래그), AI Market (사내 챗봇 마켓), MCP Tool 연동
- 핵심 기술: Python, TypeScript, LangChain, MCP, AWS Lambda · AppSync(GraphQL/WebSocket) · DynamoDB · OpenSearch · Cognito · Step Functions · SageMaker · Bedrock · S3 · Aurora · Kendra
- 지표: 현대캐피탈 전사 출시. documents.py 26 커밋 직접 주도

### 3. NeuroCore RAG Agent · 공장 데이터 챗봇
- 기간: 2024.03 – 2025.03 (13개월)
- 회사: 뉴로코어 (정규직)
- 역할: Lead AI Engineer · 선임연구원
- 팀: 3인 (리딩)
- 도메인: 제조 / 생산계획
- 접근: **RAG + OpenAI Q&A Fine-tuning hybrid** (GPU 없는 환경에서의 도메인 특화 트레이드오프 결정)
- 핵심 기술: GPT-4o, **OpenAI Q&A Fine-tuning**, LangChain, LangGraph, OpenAI Assistants API, Ragas, FastAPI (Flask → 마이그레이션), MySQL, Python
- 지표:
  - 응답 정확도 +30% (**10개 평가셋, 컨설턴트 합의 채점 — prototype validation, 통계적 의미는 제한적**)
  - **학습** 데이터 처리 효율 +40% (Ragas로 100개 Q&A 자동 생성 + 컨설턴트 검수 vs 전수 수작업)
  - 10+ KPI 자동 응답 시나리오
  - 국내 대기업 3개사(제조·유통·통신) 시연 성공
  - 특허 출원 1건 참여

### 4. 진학사 · 대학 입학전형 OCR
- 기간: 2022.05 – 2023.07 (1년 3개월)
- 회사: 진학사 (정규직)
- 역할: Deep Learning Engineer · PD
- 팀: 3인 TF, 본인 딥러닝 리더
- 도메인: EdTech / 문서 인식
- 핵심 기술: TensorFlow, Flask, Google Cloud Vision API, Python, JavaScript
- 지표:
  - 수작업 대비 입력 시간 40% 단축
  - 특허 출원 1건 (딥러닝 기반 OCR)

### 5. 자이플래닛 · 치과 파노라마 AI
- 기간: 2021.10 – 2022.04 (7개월, 자이플래닛 재직 기간 중 주력 프로젝트)
- 회사: 자이플래닛 (정규직)
- 역할: AI Engineer · 주임연구원
- 팀: 4인 연구팀, 본인 데이터·실험 총괄
- 도메인: 의료 / 치과 영상
- 핵심 기술: PyTorch, Ray, DenseNet, WideResNet, LaplaceNet, Python/Jupyter/Pandas/Matplotlib/Seaborn
- 지표:
  - LaplaceNet SSL로 80%+ 정확도 (지도학습 수준 유지)
  - 국제 학술지 2편 publish (BMC Oral Health 2023, DMFR 2023)
- 자이플래닛 시기 다른 프로젝트:
  - 한국어 문서 요약 (행안부, KoBertSum, 2022.01–04)
  - 공사장 안전 모니터링 (NIPA, YOLOv4, 2021.01–10)
  - 치과 질환 데이터 구축 (NIA, EfficientDet, 2020.09–2021.02)
  - 기상예측 데이터 품질검사, 이미지 레이블링 프로그램 등

---

## 사이드 프로젝트 (2)

### my-arxiv
- 기간: 2026.05 – 진행 중
- 라이브: https://my-arxiv.vercel.app/
- 소스: https://github.com/hizieun/my-arxiv
- 핵심 기술: Next.js 16, React 19, TypeScript, Tailwind v4, Gemini 2.5 Flash, arXiv Atom API, HuggingFace API, Docker, GHCR
- 기능: arXiv + HF Daily Papers 통합 피드, Gemini 한국어 요약, 카테고리 토글·통합 검색·노트·읽음 기록

### 노포지도
- 기간: 2026.03.06 v1.0.0 출시, 진행 중
- 라이브: https://frontend-kappa-six-36.vercel.app/
- 소스: https://github.com/hizieun/noodle-app
- 핵심 기술: React 19, Vite 7, Leaflet, Python, Selenium, SQLite, Workbox PWA, GitHub Actions
- 규모: 705 식당 / 서울 25개 구
- 자동화: 매주 월요일 03:00 KST GitHub Actions 자동 크롤링

---

## 논문 (2편)

### BMC Oral Health (2023.12.15)
- 제목: Application of entire dental panorama image data in artificial intelligence model for age estimation
- 역할: 공동저자 · 데이터 처리 및 모델 실험 총괄
- 기술: WideResNet, DenseNet, Heuristic grouping (±3년)
- DOI: https://link.springer.com/article/10.1186/s12903-023-03745-x

### DMFR / Dentomaxillofacial Radiology (2023.05.16)
- 제목: The efficacy of supervised learning and semi-supervised learning in diagnosis of impacted third molar on panoramic radiographs through artificial intelligence model
- 역할: 공동저자 · LaplaceNet SSL 실험 설계 및 실행
- 기술: WideResNet (SL) vs LaplaceNet (SSL) 비교
- DOI: https://doi.org/10.1259/dmfr.20230030

---

## 학력

- 한국외국어대학교 글로벌캠퍼스 · 산업경영공학 학사 (2015.03 – 2018.08, 졸업, 3.14/4.5)
- 남서울대학교 · 산업경영공학 (2013.03 – 2015.02, 수료, 4.08/4.5)
- 숙명여자고등학교 (2010.03 – 2013.02)

## 자격증

- 정보처리기사 · 산업인력공단 · 2021.06.02

## 교육 수료

- 트랜스포머 기반 한-영 번역 AI 제작 교육 · 한국메타버스산업협회 · 2023.09.18 – 2023.09.22
- 빅데이터 분석(R)을 위한 자바 개발자 과정 · 더조은IT아카데미 · 2019.08.16 – 2019.12.24

---

## 기술 스택 (요약)

- AI / ML: Amazon Bedrock, GPT-4o, LangChain, LangGraph, MCP, OpenAI Assistants API, **OpenAI Q&A Fine-tuning**, PyTorch, Ragas, TensorFlow, Titan Embeddings v2
- Vision / NLP: DenseNet · WideResNet · LaplaceNet, Function Calling, KoBERTSum, OCR (marker, Surya, GCP Vision), RAG / Vector Search, YOLO · EfficientDet
- Backend & Data: Aurora · Kendra, AWS Glue, DynamoDB, OpenSearch, PostgreSQL · MySQL · MSSQL · Teradata, Python (FastAPI · Flask), TypeScript / Node.js
- Cloud & MLOps: AWS AppSync (GraphQL), AWS Cognito · Step Functions, AWS Lambda, AWS SageMaker, CloudWatch, Docker, MLflow, Ray
