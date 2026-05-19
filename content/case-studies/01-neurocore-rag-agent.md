---
slug: rag-agent-manufacturing
title: 공장 데이터를 묻는 RAG Agent
subtitle: 컨설턴트의 multi-factor 판단을 LLM Agent로 자동화
company: NeuroCore
role: Lead AI Engineer (3인 팀)
period: 2024.03 – 2025.03
duration: 13 months
domain: Manufacturing / Production Planning
status: Shipped — 국내 대기업 3개사 시연 완료
tldr: GPT-4o + LangGraph + Function Calling으로 베테랑 컨설턴트의 판단 노동을 자동화. 응답 정확도 +30%, 평가 효율 +40%.
metrics:
  - { label: "응답 정확도 향상", value: "+30%", detail: "도메인 컨설턴트 정성 평가" }
  - { label: "QA 평가 효율 향상", value: "+40%", detail: "Ragas 기반 자동 데이터셋 생성" }
  - { label: "자동 응답 KPI", value: "10+" }
  - { label: "고객사 시연", value: "3개사" }
stack:
  llm: [GPT-4o, LangChain, LangGraph, OpenAI Assistants API, Ragas]
  backend: [FastAPI, Flask → FastAPI 마이그레이션, MySQL]
  tooling: [Python, GitHub, Postman, Dooray]
---

## TL;DR

NeuroCore의 생산 시뮬레이션 엔진이 만들어내는 거대한 결과 데이터를, 자연어 질문 한 줄로 분석할 수 있는 **RAG Agent**를 GPT-4o + LangGraph 기반으로 설계했습니다. 단순 SQL 질의응답을 넘어 *베테랑 컨설턴트가 동시에 보는 여러 신호를 종합 판단*하는 흐름을 시스템화한 것이 핵심.

**응답 정확도 +30%**, **QA 평가 효율 +40%**, **국내 대기업 3개사 시연 완료**.

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
- **평가 데이터셋 자동 생성** — Knowledge 기반으로 **Ragas로 평가 질문 수십 개를 자동 생성**, 기획 참여 컨설턴트가 정성 평가. 사람의 시간을 *데이터 생성*이 아닌 *기준 정의*에만 쓰는 구조.

## Results

| 지표 | 결과 |
|---|---|
| 챗봇 응답 정확도 (컨설턴트 정성 평가) | baseline 대비 **+30%** |
| QA 데이터셋 생성 & 평가 효율 | baseline 대비 **+40%** |
| 자동 응답 가능 KPI 유형 | **10+** |
| 고객사 시연 | 국내 대기업 3개사 (제조/유통/통신) |

특히 **LangChain + Ragas 자동 QA 파이프라인**은 평가 부담 자체를 낮춰, 모델·프롬프트를 빠르게 iterate할 수 있게 만든 게 진짜 성과.

## What I'd do differently — LLM-as-Judge 하이브리드

당시엔 모든 평가를 *컨설턴트 정성 평가*에 의존했습니다. 일관성은 높았지만 매번 사람의 시간을 썼고 iteration cycle이 느렸어요.

지금이라면 **LLM-as-Judge로 70%를 자동화하고, 사람은 edge case와 judgment 분기점만** 보게 했을 것입니다. 평가 한 사이클이 *일주일 → 하루*로 줄었을 거예요.

> **평가 자체가 제품의 일부다** — 이 프로젝트가 가르쳐준 가장 큰 교훈.

## Role

3인 팀에서 **프롬프트 설계 · 쿼리 기반 시나리오 작성 · 챗봇 응답 흐름 기획**을 주도. RAG Agent 아키텍처 설계, Function Calling 구조 설계, Instruction/Knowledge 문서 작성, Ragas 기반 평가 기준 설계까지 담당. 특허 기획 단계 참여.
