# Architecture Lab — Technical MVP

## Objective
A public didactic tool that demonstrates architecture knowledge by turning a software problem into a professional, explainable architecture graph.

## Key decision
**No LLM is required for the architecture engine.**

### V1 modes
1. **Guided mode (zero LLM):** visitor selects requirements.
2. **Free-text mode (optional low-cost LLM):** text is normalized into the exact same schema; deterministic engine takes over.

## Pipeline
```text
Problem
  ↓
RequirementSchema (Zod)
  ↓
Normalizer
  ├─ GuidedNormalizer (default)
  └─ OptionalLlmNormalizer
  ↓
Rule facts
  ↓
JEV / deterministic rule evaluation
  ↓
ArchitectureComposer
  ↓
GraphModel + DecisionLog
  ↓
SVG graph + rationale + trade-offs + alternatives
```

## Does it require training?
No. This is not a trained model.

It requires a curated catalog:
- components
- patterns
- triggers
- incompatibilities
- trade-offs
- complexity/cost bands
- technology mappings
- explanation templates

The initial catalog can be curated from sanitized, reusable knowledge already present in the second-brain, **without changing the second-brain**. The public copy is a derived read-only artifact committed to this repo after review.

## Example rules
- multiTenant + relational → tenant isolation strategy required
- highAudit → immutable audit log / append-only evidence
- asyncProcessing → queue/broker + idempotent consumer
- publicApi + enterpriseAuth → gateway + OIDC/JWT
- highAvailability → stateless services + replicated data strategy + health/observability
- rag → vector/search layer + retrieval boundary + grounding/evidence policy
- localFirst → local storage/processing prioritized; cloud sync optional
- node preference → Node/NestJS templates first
- dotnet preference → ASP.NET Core templates first
- hybrid → choose per workload, not random mixing

## JEV
Treat JEV as a rule evaluator/decision layer. Keep rule syntax behind an adapter so the domain model is not coupled to one library.

```ts
interface RuleEvaluator {
  evaluate(input: ArchitectureRequirements, catalog: Catalog): RuleDecision[]
}
```

## Optional LLM
Purpose: intent parsing only.

Contract:
```text
free text → strict JSON matching ArchitectureRequirements
```

Safeguards:
- schema validation
- no direct component generation
- no unbounded prompt context
- no private second-brain access from client
- provider can be disabled
- usage/cost logged

## UI wow factor
- animated layered graph
- deterministic build animation
- nodes grouped by Client / Edge / Services / Async / Data / AI / Observability
- selecting a node explains why it exists
- “Why?” trace back to triggering requirement/rule
- switch between .NET / Node.js / Hybrid
- compare Simple vs Enterprise architecture
- export PNG/SVG/JSON can be post-MVP

## MVP catalog scope
Start with 6 scenarios:
1. multi-tenant SaaS
2. internal enterprise application
3. event-driven integration
4. high-audit financial workflow
5. RAG application
6. local-first media intelligence

## Definition of done
- same input produces same graph hash
- every node has at least one decision reason
- every decision can link to a rule
- no private data in public catalog
- guided mode works with zero external cost
