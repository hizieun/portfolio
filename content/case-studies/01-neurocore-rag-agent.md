---
slug: rag-agent-manufacturing
title: 공장 데이터를 묻는 RAG Agent
subtitle: 컨설턴트의 multi-factor 판단을 RAG + OpenAI Q&A Fine-tuning hybrid로 자동화
company: NeuroCore
role: Lead AI Engineer (3인 팀)
period: 2024.03 – 2025.03
duration: 13 months
domain: Manufacturing / Production Planning
status: Shipped — 국내 대기업 3개사 시연 완료
tldr: GPT-4o + LangGraph 기반 RAG Agent에 OpenAI Q&A Fine-tuning을 병행해 도메인 특화. 베테랑 컨설턴트의 판단 노동을 자동화. Prototype validation 응답 정확도 +30% (10개 평가셋, 컨설턴트 합의 채점), Ragas 학습 데이터 생성으로 처리 효율 +40%.
metrics:
  - { label: "응답 정확도 향상", value: "+30%", detail: "10개 평가셋 · 컨설턴트 합의 채점 (prototype validation)" }
  - { label: "QA 학습데이터 처리 효율", value: "+40%", detail: "Ragas 자동 생성 + 컨설턴트 검수 vs 전수 수작업" }
  - { label: "자동 응답 KPI", value: "10+" }
  - { label: "고객사 시연", value: "3개사" }
stack:
  llm: [GPT-4o, OpenAI Q&A Fine-tuning, LangChain, LangGraph, OpenAI Assistants API, Ragas]
  backend: [FastAPI, Flask → FastAPI 마이그레이션, MySQL]
  tooling: [Python, GitHub, Postman, Dooray]
---

## TL;DR

NeuroCore의 생산 시뮬레이션 엔진이 만들어내는 거대한 결과 데이터를, 자연어 질문 한 줄로 분석할 수 있는 **RAG Agent + 도메인 Fine-tuned LLM hybrid**를 GPT-4o 기반으로 설계했습니다. 단순 SQL 질의응답을 넘어 *베테랑 컨설턴트가 동시에 보는 여러 신호를 종합 판단*하는 흐름을 시스템화한 것이 핵심.

**Prototype validation 응답 정확도 +30%** (10개 평가셋, 컨설턴트와 합의 채점), **QA 학습 데이터 처리 효율 +40%** (Ragas 자동 생성 파이프라인), **국내 대기업 3개사 시연 완료**.

## Problem — 컨설턴트의 시간을 어떻게 자동화할까

NeuroCore의 시뮬레이션 엔진은 공장 생산 계획을 돌리고 나면 거대한 결과 데이터를 남깁니다. 하지만 *데이터 그 자체가 답은 아닙니다.*

기존 운영 방식은 이랬어요: 시뮬레이션 결과가 나오면 **사내 컨설턴트가 직접 분석**해서 고객사에 최적 생산계획을 자문. 이 분석 노동이 매번 컨설턴트의 시간을 소비하는 구조였습니다.

문제의 본질은 *질문의 종류는 정해져 있다는 점*이었어요. "공정 A가 오늘 병목인가?" 같은 질문에 답하려면 베테랑이 동시에 보는 신호들:

- 해당 라인의 `setup time change rate`
- 전체 설비 이용률
- 납기율 (on-time / late / short)
- 최근 7일 추세
- 유사 제품 코드의 과거 이력

5개 신호를 종합해 *판단을 내리는 것*이 컨설팅의 본질. 데이터팀 SQL이나 BI 대시보드로는 잡을 수 없는 영역입니다.

**프로젝트의 미션은 명확했습니다 — 이 판단 노동을 LLM Agent로 옮기는 것.**

## Approach — 암묵지를 명시지로

가장 어려웠던 건 모델링이 아니라 *답변 설계*였습니다. 처음 몇 달은 "어떻게 답하지?"보다 **"무엇을 보고 답하지?"** 를 푸는 데 썼어요. 4가지 레이어를 동시에 쌓아 올렸습니다:

1. **신호 트리화** — 도메인 컨설턴트와 함께 10개 이상 질문 유형마다 "베테랑이 보는 신호"를 의사결정 트리로 정리
2. **분석 함수 모듈화** — 각 신호를 계산하는 Python 함수를 Function Calling 도구로 노출 (`setup_time_anomaly()`, `utilization_by_line()` 등)
3. **판단 매뉴얼 RAG** — 컨설턴트의 휴리스틱·SOP를 문서화해 RAG 코퍼스로 적재
4. **LLM Instruction & Knowledge** — Agent가 *어떤 신호를 어떤 순서로* 종합해야 하는지 system prompt + few-shot knowledge로 명시

**왜 4개를 다 했나** — Function Calling만 쓰면 추론 흐름을 제어 못 하고, RAG만 쓰면 계산이 약하고, Instruction만 쓰면 데이터를 못 잡습니다. 각 레이어가 서로의 약점을 보완하는 구조가 필요했어요.

### + Fine-tuning 병행 — RAG vs Fine-tuning이 아니라 RAG + Fine-tuning

RAG 4-layer로도 응답 품질이 부족했습니다. 도메인 컨설턴트가 쓰는 *말투·표현·판단 패턴*은 RAG context가 아무리 좋아도 base GPT-4o가 자연스럽게 따라가지 못해요. *모델 자체*가 도메인에 특화되어야 했습니다.

다만 **GPU 인프라가 없는 환경** — 자체 모델 학습은 비용·시간 모두 무리. 그래서 **OpenAI Q&A Fine-tuning API**를 선택했습니다. 트레이드오프 결정:

| 선택지 | 채택 여부 | 이유 |
|---|---|---|
| Self-hosted LLM 학습 | ❌ | GPU 없음, 3개월짜리 빠른 검증 필요 |
| RAG 만으로 해결 | ❌ | 도메인 화법·판단 패턴이 base 모델로는 부족 |
| **OpenAI Q&A Fine-tuning + RAG** | ✅ | *현실적 최적해* |

결합 구조:
- **RAG** = *최신 시뮬레이션 데이터*·*휴리스틱 SOP* 공급 (Fine-tuning이 다룰 수 없는 영역)
- **Fine-tuned model** = *도메인 화법·신호 종합 판단 패턴*을 모델 weights에 박음

## Architecture

```
        ┌─────────────────────────────────────┐
        │ Question (자연어)                    │
        └──────────────┬──────────────────────┘
                       ▼
        ┌─────────────────────────────────────┐
        │ Agent (LangGraph state machine)     │
        └──┬───────┬───────┬───────┬──────────┘
           ▼       ▼       ▼       ▼
        ┌─────┐ ┌─────┐ ┌──────┐ ┌────────┐
        │ RAG │ │ Web │ │ SQL  │ │ Python │
        │     │ │     │ │ (DB) │ │ Func   │
        └──┬──┘ └──┬──┘ └──┬───┘ └───┬────┘
           └───────┴───────┴─────────┘
                       ▼
        ┌─────────────────────────────────────┐
        │ LLM 종합 (GPT-4o + Knowledge)        │
        └──────────────┬──────────────────────┘
                       ▼
        ┌─────────────────────────────────────┐
        │ Answer + KPI 테이블 + 후속 액션 버튼  │
        └─────────────────────────────────────┘
```

답변은 자연어 리포트로 끝나지 않고, *"가장 낮은 납기율을 보인 제품의 세부 이유를 알고 싶어"* 같은 **후속 액션 버튼**까지 제안 — 컨설턴트의 *대화 흐름* 자체를 모사한 UX.

## Implementation Highlights

- **Flask → FastAPI 마이그레이션** — Function Calling 도입 후 동시 외부 호출이 늘면서 동기 Flask로는 latency 한계. async FastAPI로 전환.
- **Knowledge 문서 작성을 직접 주도** — 도메인 컨설턴트와 주 1회 review session을 두고 매주 prompt/knowledge 업데이트. AI 엔지니어를 넘어 *제품 PM 역할*까지.

### 평가 인프라 — 학습 데이터 자동 생성 vs 평가 데이터 사람 작성

Ragas의 역할을 정확히 짚어두면:

- **학습셋 (Fine-tuning용)**: Knowledge corpus 기반으로 **Ragas가 100개 Q&A를 자동 생성** → 컨설턴트와 함께 *전수 품질 검수*. 자동 생성된 정답이 도메인 기준에서도 정답인지 확인하는 단계가 핵심
- **평가셋 (검증용)**: **사람이 직접 작성한 10개 질문** — *학습셋과 중복되지 않게* 분리 (data leakage 방지)
- **채점**: 컨설턴트와 *합의 채점*. base GPT-4o vs OpenAI Q&A Fine-tuned 모델을 같은 10개 질문에 대해 정성 평가

이 구조 덕분에 *학습 데이터 100% 수작업* 대비 **데이터 처리 효율 ~40% 향상**. 사람의 시간을 *데이터 생성*에서 *기준 정의·검수*로 옮긴 게 본질.

## Results

| 지표 | 결과 | 근거 |
|---|---|---|
| 챗봇 응답 정확도 | baseline GPT-4o 대비 **+30%** | 10개 평가셋, 컨설턴트 합의 채점 *(prototype validation — 통계적 의미는 제한적)* |
| QA 학습 데이터 처리 효율 | 100% 수작업 대비 **+40%** | Ragas 자동 생성 100개 + 컨설턴트 검수 |
| 자동 응답 가능 KPI 유형 | **10+** | 납기율·병목 공정·설비 이용률 등 |
| 고객사 시연 | **3개사** | 국내 대기업 (제조·유통·통신) |

특히 **Ragas 학습 데이터 자동 생성 + 컨설턴트 검수** 구조는 데이터 작업의 *지속가능성*을 만들어줬고, *RAG + Fine-tuning hybrid*는 RAG만으로 안 잡히던 도메인 화법을 모델에 박는 트레이드오프 결정의 결과예요.

## What I'd do differently — 평가 인프라 두 단계 진화

### 1. 평가셋 규모 + LLM-as-Judge 병행 (가장 큰 회고)

Prototype 검증의 +30%는 *10개 평가셋 기준*입니다. 정직하게 말하면 **통계적 의미는 약합니다** — 한두 문제만 갈려도 결과가 ±10%p 출렁이는 규모예요. 가능성 입증에는 충분했지만 *운영 단계 신뢰도*는 별도 영역입니다. 다음 단계에서 반드시 보강해야 할 두 가지:

- 평가셋을 **50개 이상으로 확장** (학습셋과의 leakage 방지 유지)
- **LLM-as-Judge + 컨설턴트 정성 평가 병행** — Ragas 자동 metric(Faithfulness, Answer Relevancy, Context Precision/Recall)으로 70% 자동화, 사람은 *judgment 분기점·edge case*만. 평가 한 사이클이 *일주일 → 하루*로 줄었을 것

### 2. RAG와 Fine-tuning 기여도 분리 측정

지금은 *전체 시스템 정확도*만 측정. 다시 한다면:
- **RAG retrieval 자체 품질** — Context Precision · Context Recall
- **Fine-tuned 모델의 generation 품질** — Faithfulness · Answer Relevancy

두 축을 분리해 *성능이 어디서 나오는지*를 명확히 보일 것. *프로토타입 단계엔 빠르게 가는 게 우선이라 합쳐서 봤지만*, 운영 단계에선 어느 쪽을 더 투자할지 의사결정의 근거가 됩니다.

> **평가 자체가 제품의 일부다** — 이 프로젝트가 가르쳐준 가장 큰 교훈. 그리고 *프로토타입 단계의 숫자는 가능성의 증거이지 운영 단계의 결과는 아니라는 것*도.

## Role

3인 팀에서 **프롬프트 설계 · 쿼리 기반 시나리오 작성 · 챗봇 응답 흐름 기획**을 주도. RAG Agent 아키텍처 설계, Function Calling 구조 설계, Instruction/Knowledge 문서 작성, **OpenAI Q&A Fine-tuning 학습 데이터 설계·검수 (Ragas 자동 생성 + 컨설턴트 합의)**, 평가 인프라 설계까지 담당. 특허 기획 단계 참여.
