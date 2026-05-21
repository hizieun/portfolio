# 강지은 — 면접 답변 스크립트 (STAR)

> 각 프로젝트를 STAR(Situation · Task · Action · Result)로 정리. 면접관 질문에 맞춰 *해당 블록을 꺼내 쓰는 식*으로 활용.
> 답변은 1-2분 길이로 압축할 수 있는 분량 기준.

---

## 🎯 자주 받는 질문 → 어떤 프로젝트로 답할지

| 질문 유형 | 1순위 카드 | 2순위 카드 |
|---|---|---|
| "가장 임팩트 컸던 프로젝트" | NeuroCore RAG Agent | 현대캐피탈 AI Playground |
| "기술적으로 가장 어려웠던 문제" | NeuroCore (암묵지 구조화) | 현대캐피탈 (RAG 권한 모델) |
| "팀 협업 / 리딩 경험" | NeuroCore (3인 팀 리딩) | 진학사 (3인 TF 딥러닝 리더) |
| "수동 작업을 자동화한 경험" | KB증권 (법령 PDF → API) | NeuroCore (컨설턴트 노동 자동화) |
| "다시 한다면 무엇을 바꾸겠나" | 현대캐피탈 (메타데이터+API 하이브리드 권한) | NeuroCore (평가셋 확장 + LLM-as-Judge) |
| "트레이드오프 의사결정 / 제약하에서의 선택" | NeuroCore (GPU 없는 환경에서 OpenAI Fine-tuning 채택) | 현대캐피탈 (3개월 프리랜서 스코프) |
| "운영 / 안정성 / 거버넌스 경험" | KB증권 (state DB · 로그 표준화) | 현대캐피탈 (RAG 권한·승인 플로우) |
| "0→1 / 신규 시스템 구축" | 현대캐피탈 (3개월 0→1) | 노포지도 (사이드, 풀스택 0→1) |
| "최신 기술 빠른 도입 경험" | 현대캐피탈 (MCP 6개월 만에) | my-arxiv (Gemini 2.5 Flash) |
| "평가 / 검증 / 품질 관리" | NeuroCore (Ragas 학습 데이터 + 사람 평가셋 + train/test split) | 자이플래닛 (SL vs SSL 비교 실험) |
| "도메인 전문가와의 협업" | NeuroCore (제조 컨설턴트) | KB증권 (법무·금융 컴플) |
| "사이드 프로젝트 / 자기학습" | 노포지도 (end-to-end 풀스택) | my-arxiv (최신 스택 + LLM 활용) |

---

## 📌 프로젝트 #1 — KB증권 깨비AI · RAG 데이터 파이프라인

**컨텍스트**: 페르소나에이아이 소속 프리랜서 · 데이터팀 대리 · 2025.12 – 현재 (진행 중) · 고객사 KB증권

### Situation
KB증권 사내 AI 플랫폼 *깨비AI*는 4종 Agent(법무검토·고객상담·약정체크·코딩도움)를 운영 중이고, 그 백본이 되는 RAG 파이프라인이 이미 돌고 있었습니다. 다만 데이터가 늘면서 배치 처리 시간이 길어지고 있었고, 법무검토 Agent용 신규 use case(법령·판례) 추가가 필요한 상태였어요. 운영자가 매번 PDF를 수동으로 받아오는 구간도 남아있었고요.

### Task
*처음부터 만들기*가 아니라 *운영하면서 시스템 자체를 고도화*하는 게 미션. 구체적으로 (a) 배치 병목 해결, (b) 법령·판례 파이프라인 신규 구축, (c) 운영 안정성 향상 세 가지.

### Action
- **OpenSearch Bulk Insert로 마이그레이션** — 배치 사이즈 튜닝, partial retry 로직(일부 실패해도 전체 롤백 안 되게), CloudWatch 메트릭으로 batch 단위 throughput 가시화
- **법령·판례 파이프라인 신규 구축**
  - 수동 PDF 다운로드 → Open API 자동 적재 (인증/Rate limit/스키마 매핑을 어댑터 레이어로 격리)
  - 개정감지 (Revision Detection) — 해시·버전 비교로 변경된 조항만 incremental embedding
  - 기존 비표준 인덱스를 다른 코퍼스(KMS, 펀드/ELS)와 동일한 스키마로 통합
- **RDS PostgreSQL 기반 파이프라인 state 관리 설계** — 개정감지·수집·파싱·청킹·임베딩 적재까지 각 단계를 별도 테이블/필드로 추적. *어디서 멈췄는지, 왜 멈췄는지*를 즉시 확인 가능. 같은 항목 여러 번 처리해도 idempotent
- **로그 표준화 + trace_id** 파이프라인 전체에 흘려보내기 → CloudWatch Insights로 배치 실패 케이스 일괄 추출 가능

### Result
- 배치 처리 시간 단축, 자정-새벽 윈도우 안에서 안전하게 끝나는 안정성 확보
- 법무검토 Agent용 신규 코퍼스 자동 갱신 가능해짐
- 장애 대응 시 *원인 모듈 식별 시간* 축소
- 교훈: "**기능을 추가하는 것보다 운영을 안정시키는 게 더 큰 임팩트일 때가 있다.**" 또한 *"운영 중인 시스템을 고도화하는 일이 처음부터 만드는 것보다 어려울 때가 있다"* — 사용자가 이미 있는 상태에서 안전하게 개선하는 감각을 키움

### 이 프로젝트로 답할 수 있는 질문
- "현재 무슨 일을 하고 계세요?" → 도입부
- "수동 작업을 자동화한 경험" → 법령 파이프라인 Open API 전환
- "운영 안정성 끌어올린 경험" → 로그 표준화 + state DB
- "법무·금융 같은 규제 도메인 RAG 경험" → 컴플라이언스 추적, 개정감지

---

## 📌 프로젝트 #2 — 현대캐피탈 AI Playground · 사내 LLM 플랫폼 0→1

**컨텍스트**: 아이티센피앤에스 소속 프리랜서 · 책임 · 2025.06 – 2025.09 (3개월) · 고객사 현대캐피탈 (수행사 AWS Korea)

### Situation
현대캐피탈은 이미 AWS 환경에서 운영되는 회사. 임직원이 외부 ChatGPT 같은 SaaS를 쓰면 *사내 데이터·금융 컴플라이언스*가 무너지고, 그렇다고 외부 LLM을 막으면 *생산성 격차*가 생기는 딜레마였습니다.

### Task
3개월 안에 AWS GenAI LLM Chatbot 오픈소스 솔루션을 베이스로, HC 전용 3가지 핵심 기능을 처음부터 만드는 일. (a) RAG 문서별 권한 모델, (b) AI Market(사내 챗봇 마켓플레이스), (c) MCP Tool 연동.

### Action
- **RAG 권한 모델 설계** — DynamoDB Documents 테이블에 `accessRules` 필드 추가
  - `{ allowAll: boolean, organizations: string[], users: string[], drm: boolean }`
  - **3축 OR 결합**: `allowAll`·`organizations`·`users` 중 *하나라도 만족*하면 접근 허용. `allowAll: false`일 때 두 배열이 동시에 비어있으면 거절 (invariant)
  - **DRM은 직교 플래그**: 접근 결정과 별개로 다운로드 차단·인용 메타 표시·감사 로깅 트리거. *볼 수 있는가*는 3축이, *어떻게 보여줄까*는 DRM이 결정
  - **effective user 구성**: Cognito JWT(`sub`, `cognito:groups`) + DynamoDB `Users` 테이블(조직 멤버십) + `Organizations` 테이블(부서 계층). *Users/Organizations 스키마 초기 설계는 동료 작업, 본인은 조회 패턴·소비 측면에서 협력*
  - `has_access(user, document)` 검증 함수를 API 호출 시점에 실행 (post-retrieval filter). documents.py에 26개 커밋을 쌓으며 엣지 케이스를 메움
- **AI Market 백엔드 — Applications 단일 테이블 디자인(STD)**
  - `APP#{id}` PK + SK 3종 (`METADATA`, `BOOKMARK#{userId}#{appId}`, `REVIEW#{userId}#{appId}`)
  - GSI 3개 (`byUserId`, `byChatType`, `bySharedApp`) → *내가 만든 챗봇*, *카테고리별 마켓*, *공유 챗봇 검색* 모두 단일 쿼리
  - 승인 플로우: `approveApplication()` mutation으로 PENDING → APPROVED/REJECTED
  - 부서별 가시성: Cognito groups × Application.Roles 교집합
- **MCP Tool 연동** — Tools 테이블에 transport/URL/description 저장 → `ToolManager.get_mcp_tools()`가 LangChain `StructuredTool`로 변환 → Bedrock 호출 시 동적 로드. 2024년 말 발표된 MCP를 2025년 중반 사내 플랫폼에 도입

### Result
- 현대캐피탈 전사 대상 운영 출시
- RAG 권한 로직 documents.py **26 커밋** 직접 주도. 커밋 메시지 예: *"[BE] has_access 사용자 기준 권한 검증 로직 추가"*
- AI Market — Applications STD로 메타데이터/즐겨찾기/리뷰/승인 단일 테이블 처리, GSI 3개로 모든 access pattern 커버
- MCP 표준 발표 6개월 만에 사내 플랫폼 통합
- **다시 한다면**: 현재 권한은 API 계층(Lambda)에서만 evaluation하는 single-layer. 처음엔 *"OpenSearch 인덱스로 내리면 된다"*고 생각했지만, **인덱스 메타데이터는 즉시 갱신이 어려워 권한 회수가 분/시간 지연** — 퇴사·직무 이동 같은 실시간 변경을 인덱스 필터에만 맡길 수 없음. 그래서 **하이브리드 + 역할 분리**가 정답: *1차 메타데이터 pre-filter (95% 케이스 비용 최적화) + 2차 API post-filter (시간 민감한 5% 안전장치)*. 비용은 데이터 계층, 실시간성은 애플리케이션 계층
- 교훈: "**권한 모델은 데이터 계층까지 내려야 한다**" — 짧은 3개월 프리랜서에서 가장 크게 배운 것

### 이 프로젝트로 답할 수 있는 질문
- "0→1 신규 시스템 구축" → 3개월 안에 3개 핵심 기능 풀스택
- "오픈소스 기반 커스터마이징 경험" → AWS reference solution 위에 HC 전용 기능
- "DynamoDB 단일 테이블 디자인 경험" → AI Market Applications
- "RAG 거버넌스 / 권한 관리" → `accessRules` 모델 (광역·조직·사용자 OR + DRM 직교)
- "최신 기술 빠른 도입" → MCP 도입 시점
- "다시 한다면" → 메타데이터 pre-filter + API post-filter 하이브리드 (비용·실시간성 역할 분리) — 단순 "인덱스로 내림"보다 한 단계 위 답

---

## 📌 프로젝트 #3 — NeuroCore RAG Agent · 공장 데이터를 묻는 챗봇

**컨텍스트**: 뉴로코어 정규직 · 선임연구원 · 2024.03 – 2025.03 (13개월) · 3인 팀 리딩

### Situation
뉴로코어의 시뮬레이션 엔진은 공장 생산 계획을 돌리고 나면 *거대한 결과 데이터*를 남깁니다. 하지만 데이터 자체가 답이 아니에요. 베테랑 컨설턴트가 매번 *여러 신호를 종합*해서 답하는 구조였습니다. 예: "공정 A가 오늘 병목인가?" 답하려면 *setup time change rate · 설비 이용률 · 납기율 · 추세 · 유사 제품 이력* 5개 신호를 동시에 봐야 함. 데이터팀 SQL이나 BI로는 못 잡는 영역.

### Task
사내 컨설턴트의 *판단 노동*을 LLM Agent로 자동화. 3인 팀에서 프롬프트 설계·시나리오 작성·응답 흐름 기획을 주도.

### Action
처음 몇 달은 *"어떻게 답하지?"* 보다 **"무엇을 보고 답하지?"**를 푸는 데 썼음. 4가지 레이어를 동시에 쌓음:

- **신호 트리화** — 도메인 컨설턴트와 함께 10개 이상 질문 유형마다 "베테랑이 보는 신호"를 의사결정 트리로 정리
- **분석 함수 모듈화** — 각 신호를 계산하는 Python 함수를 Function Calling 도구로 노출 (`setup_time_anomaly()`, `utilization_by_line()` 등)
- **판단 매뉴얼 RAG** — 컨설턴트의 휴리스틱·SOP를 문서화해 RAG 코퍼스로 적재
- **LLM Instruction & Knowledge 문서** — Agent가 *어떤 신호를 어떤 순서로* 종합해야 하는지 system prompt + few-shot으로 명시

추가로:
- **Flask → FastAPI 마이그레이션** — Function Calling 동시 호출 늘면서 동기 Flask로는 한계, async로 전환
- **OpenAI Q&A Fine-tuning 병행** — RAG 4-layer로도 *도메인 화법·판단 패턴*은 base GPT-4o가 못 따라감. GPU 없는 환경 제약 + 3개월짜리 빠른 검증 필요 → 자체 모델 학습 대신 OpenAI Fine-tuning API를 *현실적 최적해*로 채택. RAG는 *최신 데이터*, Fine-tuned 모델은 *도메인 화법*으로 역할 분리
- **학습/평가 데이터 분리 설계**
  - 학습셋: Knowledge corpus 기반으로 **Ragas가 100개 Q&A 자동 생성** → 컨설턴트와 함께 전수 품질 검수
  - 평가셋: **사람이 직접 작성한 10개 질문** (학습셋과 중복 없음, data leakage 방지)
  - 채점: 컨설턴트와 *합의 채점* (base GPT-4o vs Fine-tuned 모델 비교)
- 도메인 컨설턴트와 주 1회 review session 운영 — 매주 prompt/knowledge 업데이트 (AI 엔지니어를 넘어 PM 역할까지)

### Result
- **응답 정확도 +30%** (10개 평가셋, 컨설턴트와 합의 채점 — *prototype validation, 통계적 의미는 제한적*)
- **학습 데이터 처리 효율 +40%** (Ragas로 100개 Q&A 자동 생성 + 컨설턴트 검수 vs 전수 수작업)
- 납기율·병목공정 등 **10+ KPI** 자동 응답 시나리오
- 국내 대기업 3개사(C·L·S, 제조·유통·통신) 시연 성공
- **특허 출원 1건 참여** (LLM 활용 공급망 분석, 본인 퇴사로 이름 빠짐)
- **다시 한다면 (두 단계 진화)**:
  1. **평가셋 50+ 확장 + LLM-as-Judge 병행** — 10개 평가셋은 prototype 가능성 검증엔 충분했지만 운영 단계 신뢰도엔 부족 (한두 문제만 갈려도 ±10%p 출렁). Faithfulness · Answer Relevancy · Context Precision/Recall로 70% 자동 채점, 사람은 judgment 분기점·edge case만 → 평가 사이클 일주일 → 하루
  2. **RAG와 Fine-tuning 기여도 분리 측정** — *RAG retrieval 자체 품질* (Context Precision/Recall) vs *Fine-tuned 모델 generation 품질* (Faithfulness · Answer Relevancy) 분리. 어디서 성능이 나오는지 명확히
- 교훈: "**평가 자체가 제품의 일부다**" + "*프로토타입 단계의 숫자는 가능성의 증거이지 운영 단계의 결과는 아니다*"

### 이 프로젝트로 답할 수 있는 질문
- "가장 임팩트 컸던 프로젝트" → 핵심 카드
- "기술적으로 가장 어려웠던 문제" → "답변 설계가 어려웠다 — 암묵지를 명시지로"
- "RAG vs Fine-tuning 선택" / "왜 Fine-tuning까지?" → GPU 없는 환경 + 도메인 화법 요구 → OpenAI Q&A Fine-tuning이 현실적 최적해
- "트레이드오프 의사결정" → Self-hosted ❌(GPU 없음) / RAG만 ❌(도메인 화법 부족) / RAG + OpenAI Fine-tuning ✅
- "Ragas 어떻게 썼나?" → *평가가 아닌 학습 데이터 생성*. 100개 자동 생성 + 컨설턴트 검수. 평가셋은 사람이 직접 작성 (train/test split)
- "+30% 신뢰도?" → 정직하게 *10개 평가셋 prototype validation 한계* 인정 + 다음 단계 보강 계획 (50+ 평가셋 + LLM-as-Judge) 같이 제시
- "도메인 전문가와의 협업" → 컨설턴트와 주 1회 review session + 학습 데이터 검수
- "RAG vs Function Calling vs 기존 BI" → 왜 4개 레이어를 합쳤는가
- "팀 리딩" → 3인 팀 + PM 역할까지
- "다시 한다면" → 평가셋 확장 + LLM-as-Judge + RAG/Fine-tuning 기여도 분리 측정

---

## 📌 프로젝트 #4 — 진학사 OCR · 대학 입학전형 자동화

**컨텍스트**: 진학사 정규직 · 솔루션사업팀 PD · 2022.05 – 2023.07 (1년 3개월) · 3인 TF 딥러닝 리더

### Situation
대학 입학전형 자료(모집요강·학생부)는 학교마다 양식이 다르고, 학생부 스캔본에는 표·텍스트가 혼재. 수작업 입력에 막대한 비용이 들고 있었습니다.

### Task
다양한 양식에 대응 가능한 OCR 딥러닝 시스템 개발 + 실서비스용 프로토타입까지. 3인 TF에서 딥러닝 모델 + 프로토타입 담당.

### Action
- **한글 특화 OCR 모델 비교 실험** — Google Cloud Vision API 포함 여러 옵션 평가
- **양식 다양성 대응 후처리** — 텍스트 정규화 + 키워드 추출 로직으로 학교 양식 차이를 흡수
- **영역 인식 구조** — 모집단위/전형명/전형요소 같은 *구조적 필드*에 대해 영역 인식 설계
- **Flask 기반 웹 프로토타입** — 모델만 만들고 끝내지 않고 프론트엔드 연동까지 직접 구현
- **특허 TF 참여** — 기술 개요와 구현 방식을 정리해 특허 명세서 작성에 기여

### Result
- **수작업 대비 입력 시간 40% 단축**
- 다양한 양식 대응 OCR 전처리 로직 확보
- **특허 출원 1건** (딥러닝 기반 OCR 시스템)
- 사내 활동: 딥러닝(CV) 스터디 팀장 (주 1회), 기술 블로그 딥러닝 파트 담당

### 이 프로젝트로 답할 수 있는 질문
- "OCR 경험" → 한글 특화 모델 비교 + 후처리 로직
- "사람의 노동을 줄인 프로젝트" → 입력 시간 40% 단축
- "팀 리딩 경험" → 3인 TF 딥러닝 리더
- "지식재산권 / 특허" → 특허 TF 참여, 명세서 작성

---

## 📌 프로젝트 #5 — 자이플래닛 · 치과 파노라마 AI

**컨텍스트**: 자이플래닛 정규직 · 주임연구원 · 2021.10 – 2022.04 (7개월 주력) · 4인 연구팀 데이터·실험 총괄

### Situation
의료 영상(치과 파노라마 X-ray)은 전문가 라벨링 비용이 매우 높습니다. 충분한 라벨 데이터 없이 임상 수준의 정확도를 낼 수 있는가? — 학술적으로도 실용적으로도 중요한 질문이었어요. 은평성모병원과의 공동 연구.

### Task
환자 연령 예측 + 매복 사랑니 발치 난이도 판정 AI를 *지도학습(SL) vs 반지도학습(SSL)* 비교 연구로 진행. 4인 연구팀에서 데이터·실험 총괄.

### Action
- **Baseline 구축** — DenseNet/WideResNet 지도학습 모델
- **SSL 실험 설계** — LaplaceNet 기반 SSL 모델 실험 설계 및 실행
- **Heuristic grouping** — ±3년 편차 그룹화 적용으로 예측 정확도 향상
- **하이퍼파라미터 튜닝 자동화** — Ray + Grid Search
- **논문 작업** — Figure / 결과 정리, 공동저자 참여
- **데이터 운영** — 서울성모병원 Docker 환경 내 의료 데이터 추출 작업

### Result
- **LaplaceNet SSL이 SL과 비슷한 80%+ 정확도** 달성 — 소량 라벨로도 임상 수준 정확도 입증
- **국제 학술지 2편 publish**
  - BMC Oral Health 2023.12 (연령 예측, Heuristic grouping)
  - DMFR 2023.05 (SL vs SSL 비교, SSL의 의료영상 실용 가능성)
- 자이플래닛 시기 병행 프로젝트 (다도메인 CV 경험)
  - 한국어 문서 요약 (행안부 KoBertSum)
  - 공사장 안전 모니터링 (NIPA YOLOv4)
  - 치과 질환 데이터 구축 (NIA EfficientDet)

### 이 프로젝트로 답할 수 있는 질문
- "학술 / 연구 경험" → 국제 학술지 2편
- "Semi-supervised learning 경험" → LaplaceNet 비교 실험 설계
- "의료 / 헬스케어 AI 경험" → 치과 영상 임상 협업
- "데이터가 부족한 상황에서의 ML" → SSL로 80%+ 정확도
- "Computer Vision 베이스" → DenseNet/WideResNet/EfficientDet/YOLO 모두 경험

---

## 📌 사이드 프로젝트 #1 — my-arxiv · 논문 디스커버리 워크플로우

**컨텍스트**: 개인 사이드 · 2026.05 – 진행 중 · 1인 풀스택

### Situation
AI/ML 신규 논문이 매일 쏟아지는 환경. arXiv와 HuggingFace Daily Papers를 따로 보면 효율이 떨어지고, 영어 abstract만 보는 것도 비효율적이라 *자체 디스커버리 도구*가 필요했어요.

### Task
arXiv + HF 통합 피드 + Gemini 한국어 요약 + 노트·읽음 기록을 가진 *개인용 논문 디스커버리 워크플로우* 1인 풀스택 구축.

### Action
- **스택 선택** — Next.js 16 + React 19 + TypeScript + Tailwind v4 (최신 메이저 버전 실험)
- **통합 피드 머지** — arXiv Atom API + HuggingFace API의 두 소스를 카테고리 토글 + 기간 필터로 통합
- **Gemini 2.5 Flash 한국어 요약** — abstract → 한국어 요약. 비용·latency 트레이드오프 고려
- **개인화** — 노트, 읽음 추적, 통합 검색
- **컨테이너화 + 배포** — Docker + GHCR + Vercel

### Result
- 라이브 운영: https://my-arxiv.vercel.app/
- 본인 매일 사용 (논문 추적 워크플로우 정착)
- 최신 메이저 스택(Next.js 16, React 19, Tailwind v4) 직접 다뤄본 경험

### 이 프로젝트로 답할 수 있는 질문
- "최신 기술 학습 / 자기 주도성" → Next.js 16 + Gemini 같은 최신 스택
- "LLM 활용해서 만든 도구" → Gemini 한국어 요약
- "사이드 프로젝트 / 개인 시간 코드" → 매일 쓸 도구를 직접

---

## 📌 사이드 프로젝트 #2 — 노포지도 · 서울 노포·야장 705곳

**컨텍스트**: 개인 사이드 · 2026.03 v1.0.0 출시 후 운영 중 · 1인 풀스택

### Situation
본인 취미가 *맛집을 지도에 저장·정리하는 것*. 엑셀로 모아둔 데이터가 있었지만 활용성이 떨어지고 공유도 어려웠어요.

### Task
705곳 노포·야장 데이터를 인터랙티브 웹앱으로 시각화. 크롤러부터 PWA까지 end-to-end 풀스택을 직접 구축.

### Action
- **데이터 수집** — Python + Selenium 카카오맵 크롤러
- **데이터 처리** — SQLite → JSON 변환 파이프라인 (`sync_data.py` 자동화)
- **프론트엔드** — React 19 + Vite 7 + Leaflet
  - 카테고리(노포/야장) · 지역(25개 구) · 검색 · 평점/거리/이름 정렬
  - GPS 기반 거리순 + 반경 필터 (1/3/5km)
  - 즐겨찾기·방문 기록·랜덤 뽑기 (localStorage 기반 개인화)
- **PWA** — Workbox로 오프라인 캐시, 홈화면 추가 지원
- **자동화** — GitHub Actions로 매주 월요일 03:00 KST 자동 크롤링 + 배포

### Result
- 2026.03.06 v1.0.0 출시, 라이브 운영
- 705 식당 / 서울 25개 구 커버
- 본인 + 지인 실제 사용
- 풀스택(크롤러·DB·프론트·PWA·DevOps) 전 영역 1인 책임 경험

### 이 프로젝트로 답할 수 있는 질문
- "end-to-end 풀스택 경험" → 크롤러부터 PWA·DevOps까지 1인
- "취미를 product로" → 본인 hobby가 실제 도구가 됨
- "DevOps / 자동화 경험" → GitHub Actions cron + 자동 배포
- "프론트엔드 가능?" → React + Vite + Leaflet 직접 구축

---

## 🛡️ 면접 직전 점검 — 자주 묻는 후속 질문

- **"왜 그 기술/접근을 골랐나?"** 항상 *대안과의 비교*를 함께. 예: "Function Calling만 쓰면 RAG가 약하고, RAG만 쓰면 계산이 약해서 4개 레이어를 다 썼다"
- **"비용 / latency 영향은?"** 가능한 만큼 *측정 도구 이름까지* — CloudWatch, Ragas, 정성 평가 등
- **"NDA 범위는?"** 회사명·데이터 종류는 OK, 구체 아키텍처·정량 수치·코드는 NDA. 인터뷰 자리에서 *적절한 범위 안에서* 추가 공유
- **"왜 프리랜서로 전향?"** 다양한 도메인·아키텍처를 빠르게 경험. 한 회사 정규직보다 *짧은 사이클로 깊이 들어가는 일*에 강점을 키우는 중
- **"왜 이직?"** (정규직 지원이면) ○○○ — *각 회사 지원 동기에 맞춰 작성 필요*
- **"직접 설계한 부분 vs 인접하게 만진 부분"** 면접관이 깊게 파고들 때 *솔직하게* 구분. 본인 직접 설계: HC `accessRules` 스키마·`has_access` 평가 로직, AI Market Applications STD + GSI 3개. 인접 협업: HC `Users`/`Organizations` 스키마 초기 설계 (동료), 부서장 권한 확장의 최종 출시 형태, DRM audit 로깅 destination (인프라 동료). *기억 흐릿한 영역은 "코드 보면 5분 안에 확인 가능합니다"로 마무리*
