---
slug: hyundai-capital-ai-playground
title: 사내 LLM 플랫폼 0→1 구축
subtitle: 권한 거버넌스부터 챗봇 마켓플레이스까지, AWS Serverless 풀스택
company: 현대캐피탈 AI Playground (AWS Korea 수행 · 아이티센피앤에스 소속)
role: AI/Backend Engineer (프리랜서, 책임)
period: 2025.06 – 2025.09
duration: 3 months
domain: Enterprise AI Platform / Financial Services
status: Shipped — 현대캐피탈 전사 대상 운영
tldr: AWS GenAI LLM Chatbot 솔루션 위에 RAG 문서별 권한 모델, AI Market(사내 챗봇 마켓플레이스), MCP Tool 연동을 3개월 안에 풀스택으로 구축.
stack:
  llm: [Amazon Bedrock, LangChain, MCP]
  backend: [AWS Lambda, AppSync (GraphQL/WebSocket), DynamoDB, OpenSearch, Cognito, Step Functions, SageMaker, CloudWatch]
  data: [S3, Aurora, Kendra]
  language: [Python, TypeScript]
---

## TL;DR

현대캐피탈 임직원 전체가 쓰는 사내 LLM 챗봇 플랫폼을 AWS Serverless 풀스택으로 0→1 구축. AWS의 오픈소스 솔루션(GenAI LLM Chatbot) 위에 **HC 전용 3가지 핵심 기능**을 얹는 게 미션이었습니다:

- **RAG 문서별 권한 모델** (광역·조직·사용자 OR 결합 + DRM 직교 플래그)
- **AI Market** (사내 챗봇 마켓플레이스 — 즐겨찾기·리뷰·승인·공유)
- **MCP Tool 연동** (사내 도구 동적 등록)

3개월 안에 documents.py에만 **26개 커밋**을 쌓으며 RAG 권한 로직을 처음부터 끝까지 책임졌습니다.

## Problem — 사내 ChatGPT는 왜 직접 만드는가

현대캐피탈은 이미 AWS 위에서 운영되는 회사. 임직원이 ChatGPT 같은 외부 SaaS를 쓰면 *사내 데이터·금융 도메인 컴플라이언스*가 부서지고, 그렇다고 외부 LLM을 막으면 *생산성 격차*가 벌어집니다.

해답은 사내 LLM 플랫폼. 다만 단순 챗봇이 아니라:

- **AI 개발자가 사내 챗봇을 자기 손으로 만들고 공유**할 수 있는 마켓
- **부서/사용자 단위로 다른 RAG 답변**이 나오는 권한 거버넌스
- **사내 시스템·도구를 챗봇 도구로 동적 등록**하는 확장성

이 세 가지가 *기성 SaaS로는 풀 수 없는 부분*. 그래서 직접 만들었습니다.

## Approach — 오픈소스를 받아서 어디를 뜯어고쳤나

베이스: [aws-samples/aws-genai-llm-chatbot](https://github.com/aws-samples/aws-genai-llm-chatbot) (MIT-0 라이선스 AWS 참조 솔루션). AppSync GraphQL Subscription으로 LLM 스트리밍 응답을 받는 패턴이 이 솔루션의 핵심이라 그대로 활용.

HC 전용 3가지 기능은 처음부터 만들어야 했습니다:

### 1) RAG 문서별 권한 모델

가장 어려운 영역. 같은 RAG 코퍼스에서 *사용자마다 다른 답*이 나와야 합니다. 영업팀은 영업 매뉴얼만, 리스크팀은 리스크 정책만 — 동시에 부서장은 더 넓은 권한.

**설계**: DynamoDB Documents 테이블에 `accessRules` 필드 추가.

```typescript
accessRules: {
  allowAll: boolean,           // 광역 (binary)
  organizations: string[],     // 부서 기반 축
  users: string[],             // 개인 기반 축
  drm: boolean                 // 부가 처리 플래그 (접근 결정과 직교)
}
```

**3축 OR 결합**: `allowAll`·`organizations`·`users` 중 *하나라도 만족*하면 접근 허용. `allowAll: false`일 때 두 배열이 *동시에 비어있을 수 없게* invariant 검증 — *아무도 못 보는 문서가 인덱스에 살아있는 상태*를 방지.

**DRM은 직교 플래그**: 접근 결정과 별개로 *다운로드 차단·인용 메타 표시·감사 로깅 강화* 같은 사후 처리를 트리거. *볼 수 있는가*는 3축이, *어떻게 보여줄까*는 DRM이 결정.

검증은 `has_access(user, document)` 함수로 API 호출 시점에 실행 (post-retrieval filter). effective user는 Cognito JWT(`sub`·`groups`) + DynamoDB `Users`(조직 멤버십) + `Organizations`(부서 계층)로 구성. 이 권한 로직과 주변 함수에 **26개 커밋**을 쌓으며 엣지 케이스를 메웠습니다.

### 2) AI Market — Applications Single-Table Design

사용자 생성 챗봇의 메타데이터·즐겨찾기·리뷰·승인 상태를 한 테이블에서 다 다루기 위해 **단일 테이블 디자인(STD)**:

```
PK              SK
APP#{id}        METADATA                  ← 챗봇 본체
APP#{id}        BOOKMARK#{userId}#{appId} ← 즐겨찾기
APP#{id}        REVIEW#{userId}#{appId}   ← 리뷰
```

GSI 3개 (`byUserId`, `byChatType`, `bySharedApp`)로 *내가 만든 챗봇*, *카테고리별 마켓 목록*, *공유된 챗봇 검색*을 모두 단일 쿼리로.

승인 플로우: `approveApplication()` mutation으로 PENDING → APPROVED/REJECTED 상태 전이. 마켓 노출은 *Cognito groups × Application.Roles* 교집합으로 결정 — 부서별 마켓을 따로 들지 않아도 자연스럽게 분리.

### 3) MCP Tool 연동

Tools 테이블에 transport·URL·description을 저장 → `ToolManager.get_mcp_tools()`가 LangChain `StructuredTool`로 변환 → Bedrock 호출 시점에 동적으로 로드. 2024년 말 발표된 MCP 표준을 2025년 중반 사내 플랫폼에 일찍 도입한 케이스.

## Architecture

```
사용자 → ClientVPN → AppSync (GraphQL/WebSocket)
                       ├─→ send-query-resolver → SNS → SQS (LangChain/Multimodal 분기) → 추론 핸들러
                       │                                      ├─→ Bedrock Runtime (Claude/Nova)
                       │                                      └─→ SageMaker Endpoint (SLM)
                       │                                            ↓
                       │                                     Tool Manager (MCP/Function)
                       ├─→ subscription-resolver (WebSocket) ← OutgoingMessage Lambda
                       └─→ proxyResolverFunction (REST-like routes)
                              ├─→ APISessions (DDB)
                              ├─→ APIApplications (DDB STD) ← AI Market
                              └─→ RagWorkspaces / RagDocuments (DDB)
                                     ↓
                              RAG 문서 배치 (SQS → Lambda → Step Functions)
                                     ↓
                              Isolate Subnet: OpenSearch / Aurora / Kendra
```

핵심 디자인 결정:
- **WebSocket Subscription** — 스트리밍 응답을 위해 REST가 아닌 GraphQL
- **Isolate Subnet** — 임베딩 저장소(OpenSearch/Aurora/Kendra)를 격리망에 격리
- **이중 추론 경로** — 일반 채팅은 Bedrock, 사내 호스팅 SLM은 SageMaker

## Results

| 결과 | 상세 |
|---|---|
| **전사 출시** | 현대캐피탈 전 임직원 대상 운영 |
| **RAG 권한 로직** | `accessRules` 모델 설계 (광역·조직·사용자 OR + DRM 직교) — documents.py 26 커밋 |
| **AI Market** | Applications STD로 메타데이터/즐겨찾기/리뷰/승인까지 단일 테이블에서 처리. GSI 3개로 모든 access pattern 커버 |
| **MCP 표준 도입** | 발표 6개월 만에 사내 플랫폼 도입, Bedrock 추론 파이프라인에 통합 |
| **본인 기여** | documents.py 26 / documents route 20 / applications.py 15 / ai_market.py 12 커밋 |

## What I'd do differently — 메타데이터 pre-filter + API post-filter 하이브리드

현재 `accessRules` 검증은 **API 계층(Lambda)에서만** 일어납니다. OpenSearch가 *전체 코퍼스*에서 벡터 검색하고, Lambda가 권한 없는 결과를 *후필터*로 제거하는 single-layer 구조.

이 방식의 약점 두 가지:
1. **불필요한 retrieval 비용** — 어차피 못 볼 문서까지 벡터 검색에 포함
2. **누락 위험** — 후필터에 결함이 생기면 권한 없는 문서가 노출될 가능성

처음엔 "권한을 OpenSearch 인덱스로 내리면 다 풀린다"고 생각했어요. 하지만 *실시간 권한 변경* 요구사항을 고려하면 그 답은 부족합니다. **인덱스 메타데이터는 즉시 갱신이 어렵습니다** — 재인덱싱 파이프라인을 거쳐야 해서 권한 회수/부여가 분 단위·시간 단위 지연이 생겨요. 금융 도메인에서 *바로 회수가 필요한* 권한 변경(퇴사·직무 이동)을 인덱스 필터에만 맡길 수 없습니다.

그래서 다시 한다면 **하이브리드 + 역할 분리**:

| 계층 | 역할 | 무엇을 잡나 |
|---|---|---|
| **1차: OpenSearch 메타데이터 pre-filter** | 비용 최적화 | *명백히 권한 없는* 대다수 문서를 검색 단계에서 컷 |
| **2차: Lambda API post-filter** | 최종 안전장치 | 인덱스에 아직 반영 안 된 *실시간 권한 변경* 회수 |

각 계층이 *서로의 약점을 보완*하는 구조. 메타데이터는 95% 케이스의 비용을 줄이고, API는 *시간 민감한 마지막 5%*를 책임집니다. 인덱스만 쓰면 *실시간성*이 무너지고, API만 쓰면 *비용·도구화*가 비효율적이에요.

> **권한은 한 계층에서 끝낼 수 없다** — *비용은 데이터 계층*에서, *실시간성은 애플리케이션 계층*에서. 3개월 프리랜서로 들어간 프로젝트에서 가장 크게 배운 것.

## Role

프리랜서로 들어가 **RAG 권한 모델 설계 + AI Market 백엔드 + MCP Tool 연동**의 백엔드 풀스택을 담당. 코드 베이스는 AWS 오픈소스 솔루션 위에 올라갔고, HC 전용 기능 3개의 백엔드는 처음부터 만들었습니다.

대표 모듈 / 커밋:
- `src/lambda/python-sdk/python/genai_core/documents.py` — RAG 권한 (26 커밋)
- `src/lambda/chatbot-api/.../routes/ai_market.py` — AI Market API (12 커밋)
- 실제 커밋 메시지 예: *"[BE] has_access 사용자 기준 권한 검증 로직 추가"*
