---
slug: kb-securities-rag-pipeline
title: 증권사 RAG 데이터 파이프라인 운영 & 고도화
subtitle: 사내 KMS + 금융상품 임베딩 두 갈래를 안정적으로 굴리기
company: KB증권 (페르소나에이아이 소속, 프리랜서)
role: AI/Backend Engineer (대리, 데이터팀)
period: 2025.12 – 현재 (Currently Shipping)
duration: ongoing
domain: Financial Services / Securities
status: 🚧 Currently Shipping
tldr: KB증권 사내 운영지원 KMS와 고객 대상 펀드/ELS 상품 설명 두 갈래의 RAG 데이터 파이프라인을 운영·고도화. OpenSearch Bulk Insert 도입으로 배치 처리 개선, 로그 표준화로 운영 안정성 향상.
stack:
  llm: [Amazon Bedrock, Titan Embeddings v2, LangChain]
  ingestion: [marker, Surya OCR, LangChain Splitter, Token chunking]
  search: [OpenSearch]
  data: [PostgreSQL, Teradata, S3]
  ops: [AWS SageMaker, AWS Glue, CloudWatch]
  language: [Python]
---

## TL;DR

KB증권에 들어갔을 땐 RAG 파이프라인이 이미 돌고 있었습니다. 미션은 *처음부터 만들기*가 아니라 **운영하면서 파이프라인 자체를 고도화**하는 것 — 이미 돌아가는 시스템의 병목을 식별하고, 운영 안정성을 끌어올리는 작업입니다.

두 갈래로 흐릅니다:
- **사내 운영지원 KMS** — 내부 임직원이 업무 매뉴얼·정책을 빠르게 찾을 수 있게
- **펀드 / ELS 상품 임베딩** — 고객에게 *상품을 설명*하기 위한 RAG 코퍼스

각 갈래마다 데이터 특성·갱신 주기·정확도 요구가 다르고, *증권 도메인*이라 컴플라이언스 기준이 일반 RAG와 다릅니다.

## Problem — "이미 돌고 있는 파이프라인"을 다시 보는 일

처음부터 만드는 시스템보다 *운영 중인 시스템을 고도화하는 일*이 더 어려울 때가 있어요. 이유:

- **이미 사용자가 있다** — 배포 한 번 잘못하면 다운타임이 곧 비즈니스 영향
- **기존 의사결정의 흔적** — 왜 지금 구조인지 *맥락*부터 파악해야 함
- **개선의 우선순위** — 모든 걸 다 뜯어고칠 수 없으니 *어디부터 손댈지*가 첫 번째 결정

들어가서 가장 먼저 한 일은 **현재 파이프라인의 신호를 읽는 것** — 배치 처리 시간, 실패율, 로그 패턴, 알람 빈도. 그 신호들 안에서 *고도화가 가장 효과적인 지점*을 골랐습니다.

## Approach — 두 갈래의 임베딩 배치

### 1) 사내 운영지원 KMS

내부 임직원용. 업무 매뉴얼·정책 문서가 주 데이터. 갱신 주기는 *상시* — 정책이 바뀌면 즉시 반영돼야 합니다.

### 2) 펀드 / ELS 상품 임베딩

고객 대상 상품 설명용. 펀드 약관, ELS 상품설명서 등 *PDF로 내려오는 정형/반정형 문서*가 대부분. 표·각주·면책조항이 많아 일반 텍스트 추출보다 *문서 구조 보존*이 중요합니다.

### 이걸 푸는 도구들

- **OCR/Parser**: marker, Surya — PDF 레이아웃·표·수식을 보존하는 오픈소스 파이프라인
- **Chunking**: LangChain의 Splitter + Token-based chunking — 문서 종류별로 청크 크기·overlap 조정
- **Embedding**: **Titan Embeddings v2** (Bedrock) — AWS 인프라 안에서 임베딩까지 닫힘, 데이터 외부 유출 위험 ↓
- **Vector store**: OpenSearch — 메타데이터 필터링이 강력해 *상품 유형·갱신 일자* 같은 차원으로 후필터 가능
- **Metadata DB**: PostgreSQL / Teradata — 정형 데이터와 임베딩 메타 연결

## Engineering Highlights

### OpenSearch Bulk Insert로의 마이그레이션

운영 중 인지한 첫 번째 병목: **임베딩 배치가 점점 길어지고 있었습니다.** 데이터가 늘면서 기존 인서트 방식의 한계가 보이는 신호였어요.

대응으로 **OpenSearch Bulk API**로 마이그레이션. 단순한 API 교체가 아니라:
- 배치 사이즈 튜닝 (너무 크면 메모리 압박, 너무 작으면 효과 없음)
- 실패 시 partial retry 로직 (Bulk가 일부 실패해도 전체 롤백되지 않게)
- CloudWatch 메트릭으로 *배치 단위 throughput* 가시화

결과는 **배치 처리 시간 단축**과 *운영 중 자정-새벽 윈도우 안에서 안전하게 끝나는 안정성*.

### 로그 표준화로 운영 안정성 향상

운영을 받아보니 *로그 패턴이 모듈마다 제각각*이었습니다. 장애가 생기면 어디부터 봐야 할지 매번 다시 찾아야 했어요.

로그 포맷을 표준화하고 *추적 가능한 trace_id*를 파이프라인 전체에 흘려보내는 구조로 정리. 결과적으로:
- 장애 대응 시 *원인 모듈 식별 시간* 축소
- CloudWatch Insights 쿼리로 *배치 실패 케이스 일괄 추출* 가능

> "*기능을 추가하는 것보다 운영을 안정시키는 게 더 큰 임팩트일 때가 있다*"

## What's Next

현재 진행 중. 앞으로의 방향은:

- **임베딩 갱신 주기 자동화** — 현재는 배치 기반, 변경 감지 기반 increment update로 전환
- **평가 파이프라인 정착** — 펀드/ELS 답변의 정확도를 *상품 전문가가 검수*하는 사이클을 자동화 데이터셋과 결합 (NeuroCore에서 배운 LLM-as-Judge 하이브리드 패턴 적용 가능)
- **컴플라이언스 추적** — RAG 응답에 *어떤 문서의 어떤 청크가 인용됐는지* 감사 추적 강화

## Role

페르소나에이아이 소속 프리랜서로 KB증권에 파견. **데이터팀 대리**로 RAG 데이터 파이프라인의 **운영 + 고도화**를 담당. 이미 배포된 시스템을 *깨뜨리지 않으면서* 성능과 안정성을 끌어올리는 게 본질.

> *"안 돌고 있는 시스템을 만드는 것보다, 돌고 있는 시스템을 더 잘 돌게 만드는 것이 어려울 때가 있다."*

## Note

본 케이스 스터디는 NDA 범위 안에서 작성됨. 회사명·다루는 데이터 종류까지는 공개 가능하나 구체적인 아키텍처·정량 수치·코드 디테일은 비공개. 인터뷰 자리에서 *적절한 범위 안에서* 추가 공유 가능합니다.
