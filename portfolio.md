# 강지은 포트폴리오

데이터의 가치를 구현하는 AI 엔지니어 — LLM 시스템을 production까지 책임지는 6년차. RAG·Agent·MLOps를 금융·교육·의료 도메인에서 deploy한 경험.

- 경력: 6년차
- Production AI 프로젝트: 5+
- 국제 학술지 게재: 2편

---

## 소개

AI 스타트업에서 커리어를 시작해, 컴퓨터 비전(OCR·의료영상)부터 생성형 AI(RAG·Agent)까지 폭넓게 다뤄왔습니다.

단순히 모델을 만드는 게 아니라 production에 올리고 운영하는 일에 강합니다 — 평가 자동화, 권한 거버넌스, 운영 안정성까지.

최근에는 금융 도메인에서 사내 LLM 플랫폼 0→1 구축, 증권사 RAG 파이프라인 운영을 담당하고 있어요.

### 핵심 강점

- LLM / RAG / Agent: GPT-4o · Bedrock · LangChain · LangGraph · MCP · Ragas
- Python 백엔드: FastAPI · Flask · 비동기 처리 · 마이크로서비스
- AWS Serverless: Lambda · AppSync · DynamoDB · OpenSearch · SageMaker · Bedrock
- Computer Vision: PyTorch · TensorFlow · OCR · Object Detection · SSL

---

## 보유 기술

### AI / ML
- Amazon Bedrock
- GPT-4o
- LangChain
- LangGraph
- MCP
- OpenAI Assistants API
- PyTorch
- Ragas
- TensorFlow
- Titan Embeddings v2

### Vision / NLP
- DenseNet · WideResNet · LaplaceNet
- Function Calling
- KoBERTSum
- OCR (marker, Surya, GCP Vision)
- RAG / Vector Search
- YOLO · EfficientDet

### Backend & Data
- Aurora · Kendra
- AWS Glue
- DynamoDB
- OpenSearch
- PostgreSQL · MySQL · MSSQL · Teradata
- Python (FastAPI, Flask)
- TypeScript / Node.js

### Cloud & MLOps
- AWS AppSync (GraphQL)
- AWS Cognito · Step Functions
- AWS Lambda
- AWS SageMaker
- CloudWatch
- Docker
- MLflow
- Ray

---

## 프로젝트

### 1) KB증권 깨비AI · RAG 데이터 파이프라인 운영 & 고도화
2025.12 – 현재 (진행 중) · 페르소나에이아이 소속 · 프리랜서 · 대리

- 설명: KB증권 사내 AI 플랫폼 "깨비AI"의 다중 Agent 시스템(법무검토 · 고객상담 · 약정체크 · 코딩도움)을 받쳐주는 RAG 데이터 백본. 세 갈래 파이프라인을 운영·고도화.
  - 사내 운영지원 KMS (고객상담 Agent backbone)
  - 펀드 / ELS 상품 임베딩 (고객상담 Agent 금융상품 도메인)
  - 법령 / 판례 (법무검토 Agent backbone)
- 사용 기술: Python, Amazon Bedrock, Titan Embeddings v2, LangChain, OpenSearch, AWS RDS (PostgreSQL), Teradata, S3, AWS SageMaker, AWS Glue, CloudWatch, marker/Surya OCR
- 역할: 데이터팀 대리. 이미 운영 중인 시스템을 깨뜨리지 않으면서 성능과 안정성을 끌어올리는 작업.
- 성과 / 배운점:
  - OpenSearch Bulk Insert 도입으로 임베딩 배치 처리 시간 단축, 운영 윈도우 안정화
  - 법령·판례 파이프라인의 수동 PDF 다운로드를 Open API + 개정감지 자동화로 전환
  - 변경된 조항만 incremental embedding하는 revision detection 구현
  - RDS PostgreSQL 기반 파이프라인 state 관리 설계 — 단계별(개정감지·수집·파싱·청킹·임베딩) 라이프사이클 추적, 재실행 가능한 idempotent 구조
  - 로그 표준화 + trace_id 흘려보내기로 장애 원인 모듈 식별 시간 축소
  - 교훈: "기능을 추가하는 것보다 운영을 안정시키는 게 더 큰 임팩트일 때가 있다"

### 2) 현대캐피탈 AI Playground · 사내 LLM 플랫폼 0→1 구축
2025.06 – 2025.09 · 아이티센피앤에스 소속 · 프리랜서 · 책임 (AWS Korea 수행)

- 설명: 현대캐피탈 전 임직원이 쓰는 사내 LLM 챗봇 플랫폼을 AWS Serverless 풀스택으로 0→1 구축. AWS GenAI LLM Chatbot 오픈소스 솔루션 위에 HC 전용 3가지 핵심 기능을 얹음.
  - RAG 문서별 권한 모델 (광역·조직·사용자 OR 결합 + DRM 직교 플래그)
  - AI Market (사내 챗봇 마켓플레이스 — 즐겨찾기·리뷰·승인·공유)
  - MCP Tool 연동 (사내 도구 동적 등록)
- 사용 기술: Python, TypeScript, LangChain, MCP, AWS Lambda, AppSync (GraphQL/WebSocket), DynamoDB, OpenSearch, Cognito, Step Functions, SageMaker, Amazon Bedrock, S3, Aurora, Kendra
- 역할: AI/Backend Engineer. HC 전용 기능 3개의 백엔드를 처음부터 직접 구현.
- 성과 / 배운점:
  - 현대캐피탈 전사 대상 운영 진입
  - RAG 권한 로직(documents.py)에 26개 커밋 — `accessRules` 스키마 (`allowAll`·`organizations`·`users` OR + `drm` 플래그) + `has_access` 평가 로직 직접 설계. effective user는 Cognito JWT + DDB `Users`·`Organizations` 조합
  - AI Market — Applications 단일 테이블 디자인(STD) + GSI 3개로 모든 access pattern 단일 쿼리 커버
  - 승인 플로우(PENDING → APPROVED/REJECTED) + Cognito groups × Application.Roles 교집합 가시성
  - MCP 표준 도입 (발표 6개월 만에 사내 플랫폼 통합)
  - "다시 한다면": **메타데이터 pre-filter + API post-filter 하이브리드**. 처음엔 인덱스로 내리는 게 답이라고 봤지만, 권한 변경(퇴사·직무 이동) 실시간 반영이 어려운 메타데이터의 약점을 고려해 *비용은 인덱스 계층 / 실시간성은 API 계층*으로 역할 분리
  - 교훈: "권한 모델은 데이터 계층까지 내려야 한다"

### 3) NeuroCore RAG Agent · 공장 데이터를 묻는 챗봇
2024.01 – 2025.03 · 뉴로코어 · 정규직 · 선임연구원 (3인 팀 리딩)

- 설명: 제조 현장 생산 시뮬레이션 데이터를 자연어 질문으로 분석하는 RAG Agent. 베테랑 컨설턴트의 multi-factor 판단(setup time change rate · 설비 이용률 · 납기율 · 추세 · 유사 제품 이력)을 LLM Agent 흐름으로 시스템화.
- 사용 기술: GPT-4o, LangChain, LangGraph, OpenAI Assistants API, Ragas, FastAPI (Flask에서 마이그레이션), MySQL, Python
- 역할: 3인 팀에서 프롬프트 설계 · 시나리오 작성 · 챗봇 응답 흐름 기획 주도. RAG Agent 아키텍처, Function Calling 구조, Instruction/Knowledge 문서, Ragas 평가 기준까지.
- 성과 / 배운점:
  - 응답 정확도 +30% (도메인 컨설턴트 정성 평가 기준)
  - LangChain + Ragas 자동 QA 데이터셋 생성 파이프라인 — 평가 효율 +40%
  - 10+ KPI 자동 응답 시나리오 구현
  - 국내 대기업 3개사(제조·유통·통신) 시연 성공
  - 특허 출원 1건 참여 (LLM 활용 공급망 분석)
  - Flask → FastAPI 마이그레이션으로 동시 외부 호출 처리 개선
  - "다시 한다면": LLM-as-Judge로 70% 자동화하고 사람은 edge case·judgment 분기점만 보게 — 평가 사이클을 일주일 → 하루로
  - 교훈: "평가 자체가 제품의 일부다"

### 4) 진학사 · 대학 입학전형 OCR 자동화 시스템
2022.05 – 2023.07 · 진학사 · 정규직 · PD (3인 TF 딥러닝 리더)

- 설명: 대학 입학전형 자료(모집요강·학생부) 자동 인식·정리 OCR 딥러닝 시스템. 한글 특화 OCR 모델 비교, 다양한 양식 대응 텍스트 정규화·키워드 추출 로직 설계, Flask 기반 웹 프로토타입 개발.
- 사용 기술: TensorFlow, Flask, Google Cloud Vision API, Python, JavaScript, GitHub, Figma, Notion, Dooray
- 역할: 3인 TF에서 딥러닝 모델 개발 및 프로토타입 구현 담당. 특허 TF 참여(기술 문서·기획).
- 성과 / 배운점:
  - 수작업 대비 입력 시간 40% 단축
  - 다양한 양식에 대응 가능한 OCR 전처리 로직 확보
  - 특허 출원 1건 참여 (딥러닝 기반 OCR 시스템)
  - Flask 기반 웹 프로토타입 개발 + 프론트엔드 연동 테스트 완료

### 5) 자이플래닛 · 치과 파노라마 AI (연령 예측 & 매복치 분석)
2021.10 – 2022.04 · 자이플래닛 · 정규직 · 주임연구원 (4인 연구팀)

- 설명: 치과 파노라마 X-ray 기반 환자 연령 예측 + 매복 사랑니 발치 난이도 판단 AI 모델. 지도학습(SL) vs 반지도학습(SSL) 비교 연구.
- 사용 기술: PyTorch, Ray, DenseNet, WideResNet, LaplaceNet, Python, Jupyter, Pandas, Matplotlib, Seaborn
- 역할: 4인 연구팀에서 데이터 처리 및 모델 실험 총괄. 논문 Figure / 결과 정리, 공동저자.
- 성과 / 배운점:
  - LaplaceNet 기반 SSL로 지도학습 수준 80%+ 정확도 확보 — 소량 라벨 데이터로도 임상 수준 정확도 입증
  - Heuristic grouping(±3년 편차) 적용으로 예측 정확도 향상
  - Ray + Grid Search로 하이퍼파라미터 튜닝 자동화
  - 국제 학술지 2편 publish (BMC Oral Health 2023, DMFR 2023)

---

## 사이드 프로젝트

### my-arxiv · 관심 분야 신규 논문을 한 곳에서, Gemini 한국어 요약까지
2026.05 – 진행 중

- 설명: arXiv + HuggingFace Daily Papers를 통합 피드로 머지하고, Gemini 2.5 Flash로 abstract를 한국어 요약. 카테고리 토글·통합 검색·노트·읽음 기록까지 자체 디스커버리 워크플로우.
- 사용 기술: Next.js 16, React 19, TypeScript, Tailwind v4, Gemini 2.5 Flash, arXiv Atom API, HuggingFace API, Docker, GHCR
- 하이라이트: arXiv + HF 통합 피드 · Gemini 한국어 요약 · Notes & 읽음 추적 · Bio·뇌과학 포함
- 라이브: https://my-arxiv.vercel.app/
- 소스: https://github.com/hizieun/my-arxiv

### 노포지도 · 서울 노포·야장 705곳을 한 지도에서
2026.03.06 v1.0.0 출시 · 진행 중

- 설명: 본인 취미(맛집 지도 정리)를 product로 만든 사이드 프로젝트. Selenium 크롤러 → SQLite → React + Leaflet 풀스택을 end-to-end로 직접 구축. PWA + GitHub Actions 주간 자동 크롤링까지 운영.
- 사용 기술: React 19, Vite 7, Leaflet, Python, Selenium, SQLite, Workbox PWA, GitHub Actions
- 하이라이트: 705 restaurants · 25 districts · PWA & Offline cache · Weekly GHA cron
- 라이브: https://frontend-kappa-six-36.vercel.app/
- 소스: https://github.com/hizieun/noodle-app

---

## 논문

### Application of entire dental panorama image data in artificial intelligence model for age estimation
BMC Oral Health, 2023.12.15

- 요약: WideResNet + DenseNet 지도학습에 휴리스틱 그룹화(±3년 편차)를 적용해 예측 정확도를 향상. 전체 영상 활용 방식이 기존 대비 더 효과적임을 입증.
- 역할: 공동저자 · 데이터 처리 및 모델 실험 총괄
- 링크: https://link.springer.com/article/10.1186/s12903-023-03745-x

### The efficacy of supervised learning and semi-supervised learning in diagnosis of impacted third molar on panoramic radiographs through artificial intelligence model
DMFR (Dentomaxillofacial Radiology), 2023.05.16

- 요약: WideResNet(SL) vs LaplaceNet(SSL) 비교 — SSL이 소량 라벨링 데이터로도 SL과 유사한 80%+ 정확도를 유지함을 입증. 의료 영상 분석에서 SSL의 실용 가능성 제시.
- 역할: 공동저자 · LaplaceNet SSL 실험 설계 및 실행
- 링크: https://doi.org/10.1259/dmfr.20230030

---

## 경력

총 5년 3개월 · 정규직 3곳, 프리랜서 2곳

### 페르소나에이아이 · 데이터팀 대리 (프리랜서)
2025.12 – 현재 · 고객사: KB증권

증권사 RAG 데이터 파이프라인 운영 및 고도화 — 사내 KMS · 펀드/ELS 상품 · 법령/판례 세 갈래.

### 아이티센피앤에스 · 보안컨설팅팀 책임 (프리랜서)
2025.06 – 2025.09 · 고객사: 현대캐피탈 (수행: AWS Korea)

사내 LLM 챗봇 플랫폼 0→1 구축 — RAG 권한 모델 · AI Market · MCP Tool 연동.

### 뉴로코어 · 생성형 A.I. 파트 선임연구원 (정규직)
2024.01 – 2025.03

GPT-4o 기반 RAG Agent 프로젝트 리딩 — 응답 정확도 +30%, 평가 효율 +40%, 국내 3개사 시연.

### 진학사 · 솔루션사업팀 PD (정규직)
2022.05 – 2023.07

대학 입학전형 OCR 시스템 — 수작업 대비 40% 단축, 특허 1건 참여. 3인 TF 딥러닝 리더.

### 자이플래닛 · AI사업본부 주임연구원 (정규직)
2020.04 – 2022.05

치과 영상 AI — SSL 80%+ 정확도, 국제 학술지 2편 publish. 한국어 문서 요약(KoBertSum), 공사장 안전 모니터링(YOLOv4), 치과 질환 데이터 구축(EfficientDet) 등 다도메인 프로젝트.

---

## 학력

- 한국외국어대학교 글로벌캠퍼스 · 산업경영공학 학사 (2015.03 – 2018.08, 졸업)
- 남서울대학교 · 산업경영공학 (2013.03 – 2015.02, 수료)

## 자격증

- 정보처리기사 · 산업인력공단 · 2021.06.02

## 교육 수료

- 트랜스포머 기반 한-영 번역 AI 제작 교육 · 한국메타버스산업협회 · 2023.09.18 – 2023.09.22
- 빅데이터 분석(R)을 위한 자바 개발자 과정 · 더조은IT아카데미 · 2019.08.16 – 2019.12.24

---

## 연락처

- 이메일: zieun.kang@gmail.com
- 전화: +82 10-6244-5650
- 위치: 서울 성북구
- GitHub: https://github.com/hizieun
- 노션 이력서: https://happy-pin-84f.notion.site/_-117d7bc68dc38049a200dff74caeacf0
