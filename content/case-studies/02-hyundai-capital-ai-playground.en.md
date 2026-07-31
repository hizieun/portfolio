
## TL;DR

Built the internal LLM chatbot platform used by all Hyundai Capital employees, 0→1, full-stack on AWS Serverless. The mission was to layer **three HC-specific capabilities** on top of an AWS open-source solution (GenAI LLM Chatbot):

- **Per-document RAG permissions** (broad · org · user, OR-combined + an orthogonal DRM flag)
- **AI Market** (an internal chatbot marketplace — bookmarks, reviews, approvals, sharing)
- **MCP tool integration** (dynamic registration of internal tools)

In three months I owned the RAG permission logic end to end, with **26 commits in documents.py** alone.

## Problem — Why build your own internal ChatGPT

Hyundai Capital already runs on AWS. If employees use an external SaaS like ChatGPT, *internal data and financial-domain compliance* break down; if you block external LLMs outright, a *productivity gap* opens up instead.

The answer was an internal LLM platform — but not just a chatbot:

- a **marketplace where AI developers build and share their own internal chatbots**
- **permission governance** so RAG answers differ by department and by user
- **extensibility** to register internal systems and tools as chatbot tools on the fly

Those three are exactly what an off-the-shelf SaaS can't do. Hence building it.

## Approach — What we took from open source, and what we tore up

Base: [aws-samples/aws-genai-llm-chatbot](https://github.com/aws-samples/aws-genai-llm-chatbot) (an MIT-0 AWS reference solution). Its core pattern — streaming LLM responses over AppSync GraphQL subscriptions — we kept as-is.

The three HC-specific features had to be built from scratch:

### 1) Per-document RAG permissions

The hardest part. The *same* RAG corpus must yield *different answers per user*: sales sees sales manuals, risk sees risk policy — while a department head gets broader access.

**Design**: an `accessRules` field on the DynamoDB Documents table.

```typescript
accessRules: {
  allowAll: boolean,           // broad (binary)
  organizations: string[],     // department axis
  users: string[],             // individual axis
  drm: boolean                 // post-decision flag (orthogonal to access)
}
```

**Three axes, OR-combined**: access is granted if *any* of `allowAll`, `organizations`, or `users` matches. When `allowAll` is `false`, an invariant check forbids *both arrays being empty at once* — preventing a document that lives in the index but nobody can ever see.

**DRM is an orthogonal flag**: separate from the access decision, it triggers post-processing such as *blocking downloads, showing citation metadata, and stricter audit logging*. The three axes decide *whether you can see it*; DRM decides *how it's shown*.

Evaluation runs in `has_access(user, document)` at API-call time (a post-retrieval filter). The effective user is assembled from the Cognito JWT (`sub`, `groups`) plus DynamoDB `Users` (org membership) and `Organizations` (department hierarchy). I put **26 commits** into this logic and its surrounding functions, closing edge cases.

### 2) AI Market — Applications single-table design

To keep metadata, bookmarks, reviews, and approval state for user-created chatbots in one table, I used a **single-table design (STD)**:

```
PK              SK
APP#{id}        METADATA                  ← the chatbot itself
APP#{id}        BOOKMARK#{userId}#{appId} ← bookmark
APP#{id}        REVIEW#{userId}#{appId}   ← review
```

Three GSIs (`byUserId`, `byChatType`, `bySharedApp`) make *my chatbots*, *the marketplace list by category*, and *shared-chatbot search* each a single query.

Approval flow: an `approveApplication()` mutation moves state PENDING → APPROVED/REJECTED. Marketplace visibility is the intersection of *Cognito groups × Application.Roles* — so per-department marketplaces fall out naturally without maintaining separate ones.

### 3) MCP tool integration

Transport, URL, and description live in a Tools table → `ToolManager.get_mcp_tools()` converts them into LangChain `StructuredTool`s → loaded dynamically at Bedrock invocation time. An early adoption: MCP was announced in late 2024 and was running on an internal platform by mid-2025.

## Architecture

```
User → ClientVPN → AppSync (GraphQL/WebSocket)
                     ├─→ send-query-resolver → SNS → SQS (LangChain/multimodal split) → inference handler
                     │                                    ├─→ Bedrock Runtime (Claude/Nova)
                     │                                    └─→ SageMaker Endpoint (SLM)
                     │                                          ↓
                     │                                   Tool Manager (MCP/Function)
                     ├─→ subscription-resolver (WebSocket) ← OutgoingMessage Lambda
                     └─→ proxyResolverFunction (REST-like routes)
                            ├─→ APISessions (DDB)
                            ├─→ APIApplications (DDB STD) ← AI Market
                            └─→ RagWorkspaces / RagDocuments (DDB)
                                   ↓
                            RAG document batch (SQS → Lambda → Step Functions)
                                   ↓
                            Isolated subnet: OpenSearch / Aurora / Kendra
```

Key design decisions:
- **WebSocket subscriptions** — GraphQL rather than REST, for streaming responses
- **Isolated subnet** — embedding stores (OpenSearch/Aurora/Kendra) sit in a walled-off network
- **Dual inference paths** — Bedrock for general chat, SageMaker for internally hosted SLMs

## Results

| Result | Detail |
|---|---|
| **Company-wide launch** | In production for all Hyundai Capital employees |
| **RAG permission logic** | Designed the `accessRules` model (broad · org · user OR + orthogonal DRM) — 26 commits in documents.py |
| **AI Market** | Applications STD handles metadata / bookmarks / reviews / approvals in one table; 3 GSIs cover every access pattern |
| **MCP adoption** | On an internal platform 6 months after the standard was announced, wired into the Bedrock inference pipeline |
| **My contribution** | documents.py 26 · documents route 20 · applications.py 15 · ai_market.py 12 commits |

## What I'd do differently — hybrid metadata pre-filter + API post-filter

Today `accessRules` is evaluated **only in the API layer (Lambda)**: OpenSearch runs vector search over the *entire corpus*, then Lambda strips unauthorized results as a *post-filter*. A single-layer design.

Two weaknesses:
1. **Wasted retrieval cost** — documents the user can never see still enter the vector search
2. **Leak risk** — if the post-filter develops a defect, unauthorized documents can surface

My first instinct was "push permissions down into the OpenSearch index and it's solved." But that answer falls short once *real-time permission changes* matter. **Index metadata can't be updated instantly** — it goes through a re-indexing pipeline, so granting or revoking access lags by minutes or hours. In a financial domain you can't leave *revocations that must take effect immediately* (offboarding, role changes) to an index filter alone.

So, given another pass: **a hybrid with separated roles**.

| Layer | Role | What it catches |
|---|---|---|
| **1st: OpenSearch metadata pre-filter** | Cost optimization | Cuts the *clearly unauthorized* majority at search time |
| **2nd: Lambda API post-filter** | Final safeguard | Revokes *real-time permission changes* the index hasn't absorbed yet |

Each layer covers the other's weakness. Metadata removes the cost of the ~95% stable case; the API owns the *time-sensitive last 5%*. Index-only breaks *freshness*; API-only is inefficient on *cost*.

> **Permissions can't end at one layer** — *cost belongs to the data layer, freshness to the application layer.* The biggest lesson from a 3-month contract engagement.

## Role

Joined as a contractor owning the backend full-stack for **RAG permission modeling + AI Market backend + MCP tool integration**. The codebase sits on top of the AWS open-source solution; the backend for all three HC-specific features was built from scratch.

Representative modules / commits:
- `src/lambda/python-sdk/python/genai_core/documents.py` — RAG permissions (26 commits)
- `src/lambda/chatbot-api/.../routes/ai_market.py` — AI Market API (12 commits)
- An actual commit message: *"[BE] add has_access user-level permission verification logic"*
