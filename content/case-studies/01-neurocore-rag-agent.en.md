
## TL;DR

NeuroCore's production-simulation engine leaves behind a mountain of result data. I designed a **RAG agent + domain fine-tuned LLM hybrid** on GPT-4o that lets anyone analyze it with a single natural-language question. The core wasn't SQL-style Q&A — it was systematizing how *a veteran consultant weighs several signals at once* to reach a judgment.

**+30% answer accuracy in prototype validation** (10-question eval set, consensus-scored with consultants), **+40% throughput on QA training-data prep** (Ragas generation pipeline), **demoed to 3 large Korean enterprises**.

## Problem — How do you automate a consultant's time?

Every simulation run produces a large result set. But *the data itself isn't the answer.*

The existing workflow: a simulation finishes, then an **in-house consultant analyzes it by hand** and advises the client on the optimal production plan. That analysis consumed consultant hours on every single run.

The key insight was that *the set of questions is finite*. To answer something like "is process A the bottleneck today?", a veteran looks at several signals simultaneously:

- `setup time change rate` for that line
- overall equipment utilization
- on-time / late / short delivery rates
- the last 7 days of trend
- history for similar product codes

Consulting is the act of *combining those five signals into a judgment*. Neither a data-team SQL query nor a BI dashboard reaches that.

**The mission was clear — move that judgment work into an LLM agent.**

## Approach — Turning tacit knowledge explicit

The hard part wasn't modeling, it was *designing the answer*. For the first few months I worked less on "how do we answer?" and more on **"what do we look at to answer?"** Four layers, built in parallel:

1. **Signal trees** — with domain consultants, mapped "what a veteran looks at" into a decision tree for each of 10+ question types
2. **Modular analysis functions** — exposed the calculation for each signal as a Function Calling tool (`setup_time_anomaly()`, `utilization_by_line()`, …)
3. **Judgment manuals as RAG** — documented consultant heuristics and SOPs into the RAG corpus
4. **LLM instruction & knowledge** — spelled out *which signals in which order* via system prompt plus few-shot knowledge

**Why all four** — Function Calling alone gives no control over the reasoning path; RAG alone is weak at computation; instructions alone can't reach the data. Each layer had to cover another's blind spot.

### Plus fine-tuning — not RAG *vs* fine-tuning, but RAG *+* fine-tuning

Even with the 4-layer RAG setup, answer quality fell short. The *phrasing, vocabulary, and judgment patterns* a domain consultant uses aren't something base GPT-4o picks up naturally, no matter how good the retrieved context is. The *model itself* had to be domain-specialized.

But there was **no GPU infrastructure** — training our own model was out of reach on both cost and time. So I chose the **OpenAI Q&A fine-tuning API**. The trade-off:

| Option | Chosen | Why |
|---|---|---|
| Self-hosted LLM training | ❌ | No GPUs; needed fast validation within ~3 months |
| RAG only | ❌ | Domain phrasing and judgment patterns exceeded the base model |
| **OpenAI Q&A fine-tuning + RAG** | ✅ | *The pragmatic optimum* |

How they split:
- **RAG** supplies *fresh simulation data* and *heuristic SOPs* — things fine-tuning can't hold
- **Fine-tuned model** bakes *domain phrasing and signal-synthesis patterns* into the weights

## Architecture

```
        ┌─────────────────────────────────────┐
        │ Question (natural language)         │
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
        │ LLM synthesis (GPT-4o + Knowledge)  │
        └──────────────┬──────────────────────┘
                       ▼
        ┌─────────────────────────────────────┐
        │ Answer + KPI table + follow-up CTAs │
        └─────────────────────────────────────┘
```

Answers don't stop at a prose report — they propose **follow-up actions** like *"show me why that product had the lowest on-time rate"*, modeling the consultant's *conversational flow* in the UX itself.

## Implementation Highlights

- **Flask → FastAPI migration** — once Function Calling landed, concurrent external calls grew and synchronous Flask hit a latency ceiling. Moved to async FastAPI.
- **Owned the knowledge docs** — ran a weekly review session with domain consultants and shipped prompt/knowledge updates every week. That stretched past AI engineering into *product-PM work*.

### Evaluation infrastructure — generated training data, human-written eval data

To be precise about where Ragas fits:

- **Training set (for fine-tuning)**: **Ragas auto-generated 100 Q&A pairs** from the knowledge corpus → then reviewed *in full* with consultants. That review step is the crux — confirming a generated "answer" is actually correct by domain standards.
- **Eval set (for validation)**: **10 questions written by hand**, deliberately kept disjoint from the training set (no data leakage).
- **Scoring**: *consensus scoring* with consultants — base GPT-4o vs. the OpenAI Q&A fine-tuned model on the same 10 questions.

That structure delivered roughly **+40% data-prep throughput** versus writing all training data by hand. The real shift was moving human time from *producing data* to *defining criteria and reviewing*.

## Results

| Metric | Result | Basis |
|---|---|---|
| Answer accuracy | **+30%** vs. baseline GPT-4o | 10-question eval set, consensus-scored with consultants *(prototype validation — limited statistical power)* |
| QA training-data throughput | **+40%** vs. fully manual | 100 Ragas-generated pairs + consultant review |
| Auto-answerable KPI types | **10+** | on-time rate, bottleneck process, equipment utilization, … |
| Enterprise demos | **3** | large Korean firms (manufacturing, retail, telecom) |

The **Ragas generation + consultant review** loop is what made the data work sustainable, and the *RAG + fine-tuning hybrid* was the trade-off that finally put domain phrasing — which RAG alone never captured — into the model.

## What I'd do differently — two steps for the eval infrastructure

### 1. Bigger eval set + LLM-as-judge in parallel (my biggest retrospective)

That +30% came from a *10-question eval set*. Honestly, **the statistical power is weak** — one or two questions flipping moves the number by ±10pp. It was enough to prove feasibility, but *production-grade confidence is a separate problem*. Two things I'd fix next:

- **Grow the eval set past 50 questions** (keeping it leak-free against the training set)
- **Run LLM-as-judge alongside consultant review** — automate ~70% with Ragas metrics (faithfulness, answer relevancy, context precision/recall) and reserve humans for *judgment calls and edge cases*. An eval cycle would drop from *a week to a day*.

### 2. Measure RAG and fine-tuning contributions separately

Today only *whole-system accuracy* is measured. Next time I'd split:

- **RAG retrieval quality** — context precision, context recall
- **Fine-tuned generation quality** — faithfulness, answer relevancy

That separation shows *where the performance actually comes from*. *At prototype speed, measuring them together was the right call* — but in production it's what tells you which side deserves the next investment.

> **Evaluation is part of the product** — the biggest lesson from this project. And a second one: *prototype numbers are evidence of possibility, not production results.*

## Role

In a 3-person team I led **prompt design, query-based scenario writing, and chatbot response-flow planning**. I owned the RAG agent architecture, the Function Calling structure, the instruction/knowledge docs, **the OpenAI Q&A fine-tuning training-data design and review (Ragas generation + consultant consensus)**, and the evaluation infrastructure. Also contributed to the patent-planning stage.
