
## TL;DR

When I joined KB Securities the RAG pipeline was already running. The mission wasn't *building from scratch* — it was **scaling the pipeline while operating it**: finding bottlenecks in a live system, raising operational stability, and *automating manual work*.

Four streams:
- **Internal-ops KMS** — so employees can find work manuals and policies fast
- **Fund / ELS product embeddings** — the RAG corpus used to *explain products* to customers
- **Law / precedent / administrative rules (legal-review agent)** — *periodically amended* regulatory data, tracked and re-embedded automatically. **Owned end to end — analysis, design, build, operation**
- **Global interest rates (investment-analysis agent)** — long/short-term rates for 20 countries across three cycles from the Bank of Korea's ECOS API: a **structured time-series** pipeline, also **owned end to end**

The first three are *unstructured documents → embeddings*; the fourth is *structured statistics → relational loads*, a different kind of design problem. Each stream differs in data shape, refresh cadence, and accuracy requirement — and because it's *securities*, the compliance bar differs from ordinary RAG.

## Product Context — The data backbone behind Kkaebi AI

These pipelines feed **"Kkaebi AI," KB Securities' internal AI platform**. My work supplies the *data those answers rest on* to the multi-agent system employees use (legal review, customer consultation, agreement checking, coding assistance, investment analysis, and more) — unstructured documents as RAG corpora, market statistics as structured tables.

For those product-level agents to answer meaningfully, the *data has to be well-organized and current*. This case study is about the **data infrastructure that quietly holds the product features up**.

## Problem — Re-examining a pipeline that's already running

Scaling a *live* system is sometimes harder than building a new one:

- **There are already users** — one bad deploy means downtime, which means business impact
- **Traces of prior decisions** — you have to understand *why* the current structure exists before touching it
- **Prioritization** — you can't rewrite everything, so *where to start* is the first decision

The first thing I did was **read the pipeline's signals** — batch duration, failure rates, log patterns, alarm frequency — and pick the point where improvement would pay off most.

## Approach — Four data pipelines

### 1) Internal-ops KMS · *customer-consultation agent backbone*

For employees; work manuals and policy documents are the primary data. The refresh cadence is *continuous* — a policy change must land immediately. This is the corpus the **customer-consultation agent** uses for account opening, fees, service procedures, and similar knowledge.

### 2) Fund / ELS product embeddings · *customer-consultation agent (financial products)*

Customer-facing product explanations. Mostly *structured and semi-structured PDFs* — fund terms, ELS product disclosures. Dense with tables, footnotes, and disclaimers, so *preserving document structure* matters far more than plain text extraction. Powers fund, bond, pension, and futures questions in the **customer-consultation agent**.

### 3) Law / precedent / administrative rules · *legal-review agent backbone* — sole ownership

A new use case, and the one stream of the three I owned **from data analysis and index design through build and operation**. It *periodically refreshes* the regulatory corpus behind the **legal-review agent** (contract review, KO↔EN translation, finance/legal Q&A).

It started with statutes and precedent, then **expanded to administrative rules** (directives, established rules, public notices). Financial practice rests as much on regulator-issued administrative rules as on statute text, so a statute-only corpus leaves gaps exactly where a legal-review answer needs grounding.

Three things set it apart from the existing systems:

- **Manual PDF downloads → automated Open API ingestion** — someone used to fetch PDFs from a site and index them by hand every cycle; that's now an API call. Human time narrows from *repetitive work* to *exception handling*
- **Revision detection** — laws change often. Logic that picks out only amended provisions for incremental update, cutting full-reprocessing cost
- **Index standardization** — the legacy law index diverged from the standard schema, making search and maintenance painful; unified it with the same structure as the other corpora
- **A new administrative-rules pipeline** — different issuing bodies, amendment cadence, and document structure from statutes, so it needed its own ingestion adapter and chunking strategy, landed on the same index schema

### 4) Global interest rates · *investment-analysis agent backbone* — sole ownership

A new pipeline I designed and shipped in September 2026. It ingests the Bank of Korea **ECOS Open API**'s global market rates (table 902Y023, OECD-basis): **long-term (IRLT, 10-year sovereign) and short-term (IR3TIB, 3-month CD/interbank) × 20 countries × annual, quarterly, and monthly cycles**.

Unlike the other three, this is *structured statistics → relational loads* rather than *documents → embeddings*, so the design judgments ran differently.

**Design decisions grounded in verification, not assumption**

Before fixing the structure I checked the data. "Just collect monthly and derive the rest" is the natural assumption — and it doesn't hold:

| Hypothesis tested | Result |
|---|---|
| annual = December value | mismatch |
| quarterly = quarter-end month | mismatch |
| quarterly = 3-month average | mismatch |

→ **Derivation is impossible**, so annual, quarterly, and monthly are each collected directly. Without that check the pipeline would have shipped on a "collect monthly, compute the rest" design and quietly produced wrong values.

Next I ran a **multithreaded completeness scan across every country × rate type × cycle combination**, finding 10 gaps in three categories — *never published* (Brazil short-term, entire history), *halted or delayed* (Indonesia after 2024-12), and *mid-series gaps* (Mexico long-term, 142 points). Categories matter because they demand different responses: what should page someone versus what is simply normal.

I also sized the load up front: **3,610 rows initially** (400 annual · 802 quarterly · 2,408 monthly), **760 rows per daily batch**.

**Reading the API response shape → 20× fewer calls**

Calling without an item code returns *both rate types across all countries in a single response*. That let me drop the per-country loop and collect everything in **one call per cycle**.

**A load strategy built around revisions**

ECOS revises provisional figures into final ones after the fact (e.g. US long-term for 2025-12: 4.02 → 4.05) and **doesn't expose when a value changed**. With no way to select only the deltas, I chose **DELETE + INSERT re-loading**, with the daily batch re-fetching **the trailing 12 months** to absorb revisions and late publications.

- One new table, `frgn_itrst_info`, holding **all three cycles** — composite PK `(cycle, reference period, rate type, country)` for uniqueness
- Unified reference-period format: `YYYY` / `YYYYQn` / `YYYYMM`
- Countries keep the API's 3-letter codes (KOR, USA…); unpublished combinations produce **no row at all** rather than an empty one
- Rate type and cycle defined as new shared code values

**Operations**

- **AWS Glue daily batch**, API key loaded from **Secrets Manager**
- Since ECOS publishes no revision history, corrections are tracked via a **PK-keyed snapshot diff** (changed / new / deleted)
- Per-response-code handling: `INFO-200` (no data) → skip and log, `INFO-100` auth error, `INFO-300` (row limit exceeded) → paginate
- Batch history lands in the existing `metrics_log_mgmt`; **raw API JSON is archived to S3** so gaps can be re-examined after the fact

**Extending the shared module** — the existing collector in `utils/bok_api_itrst.py` assumed *domestic, daily, single item*, which doesn't fit monthly/quarterly/annual data keyed on two axes, so I added a dedicated collection method.

### The tools behind it

- **OCR / parsing**: marker, Surya — open-source pipelines that preserve PDF layout, tables, and formulas
- **Chunking**: LangChain splitters + token-based chunking — chunk size and overlap tuned per document type
- **Embedding**: **Titan Embeddings v2** (Bedrock) — embedding stays inside AWS, lowering external-exposure risk
- **Vector store**: OpenSearch — strong metadata filtering, so *product type* or *revision date* work as filter dimensions
- **Metadata DB**: PostgreSQL / Teradata — links structured data to embedding metadata

## Engineering Highlights

### Migrating to OpenSearch bulk insert

The first bottleneck I noticed in operation: **embedding batches were getting longer.** As data grew, the existing insert approach was showing its ceiling.

I migrated to the **OpenSearch Bulk API** — not a bare API swap, but:
- batch-size tuning (too large pressures memory, too small gains nothing)
- partial-retry logic on failure (a partly failed bulk shouldn't roll back everything)
- CloudWatch metrics to make *per-batch throughput* visible

The result: **shorter batch runs**, and the stability of *finishing safely inside the midnight-to-dawn window*.

### Log standardization for operational stability

Taking over operations, *log patterns differed per module*. Every incident meant re-discovering where to look first.

I standardized the log format and threaded a *traceable `trace_id`* through the whole pipeline. As a result:
- less time to *identify the failing module* during an incident
- CloudWatch Insights queries can *pull all failed batch cases at once*

> "*Sometimes stabilizing operations has more impact than adding features.*"

### Manual work → API automation + revision detection

The clearest signal when I picked up the law/precedent pipeline: **a person was downloading PDFs every cycle.** That was where automation was worth the most.

Three things solved together:

- **Open API adapter**: site download → API call, with auth, rate limits, error handling, and schema mapping isolated in an adapter layer
- **Revision detection**: hash/version comparison → *only changed provisions* get re-embedded incrementally, instead of full re-indexing every run
- **Unified standard index**: aligned the non-standard legacy index with the other RAG corpora (KMS, fund/ELS), so the search layer runs one code path

### Pipeline state management on RDS PostgreSQL

For a *periodic, multi-stage* pipeline like law/precedent, **knowing how far each item got _is_ the operational problem**. Plain logs weren't enough — I needed *re-runnable state*.

I designed the RDS PostgreSQL schema to track each item's lifecycle stage by stage:

| Stage | Tracked |
|---|---|
| **Revision detection** | changed/new/deleted flags, previous & current hash, detection time |
| **Ingestion** | Open API fetch success/failure, response metadata |
| **Parsing** | PDF/HTML parse result, failure reason |
| **Chunking** | chunk count, split-strategy metadata |
| **Embedding load** | OpenSearch load status, per-chunk doc_id |

Operational payoff:
- after an incident, immediately know *which stage to resume from*
- per-stage duration and failure rate become *metrics* → bottlenecks visible
- *re-run safety* — processing the same item repeatedly is idempotent

## What's Next

In progress. Where it's heading:

- **Stabilize the legal-review agent pipeline** — settle the law / precedent / administrative-rules automation into steady-state operation
- **Observe the interest-rate pipeline** — freshly shipped, so revision frequency and gap behaviour are still being watched. The accumulating snapshot diffs will tell me whether the 12-month re-load window is too wide or too narrow
- **Extend revision detection to other corpora** — apply the same incremental-update pattern to fund/ELS terms (currently full reprocessing)
- **Establish an evaluation pipeline** — combine *domain-expert review* of fund/ELS and legal answers with automated datasets (the LLM-as-judge hybrid pattern I learned at NeuroCore applies directly)
- **Compliance traceability** — strengthen audit trails for *which chunk of which document* a RAG answer cited
- **Platform V2 migration** — Kkaebi AI is evolving toward a next-generation architecture, and the data backbone will move with it (details to share once it's further along)

## Role

Contracting through PersonaAI, embedded at KB Securities. As a **data-team engineer** I own **operating and scaling** the RAG data pipelines — raising performance and stability *without breaking* an already-deployed system.

Scope differs by stream:
- **KMS · fund/ELS** — operating pipelines that were already running, and improving their performance and stability
- **Law · precedent · administrative rules** — **sole ownership across every stage**: data analysis → index design → build → operation. The Open-API ingestion, revision detection, PostgreSQL state schema, and the administrative-rules expansion all came out of that scope.
- **Global interest rates** — **sole ownership across every stage**: data verification → schema and load-strategy design → build → batch operation (shipped September 2026)

> *"Making a running system run better is sometimes harder than building one that isn't running yet."*

## Note

Written within NDA limits. Company name and data categories are shareable; specific architecture, quantitative figures, and code details are not. Happy to go further *within appropriate bounds* in an interview.
