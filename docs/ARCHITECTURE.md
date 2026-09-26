# ARCHITECTURE — Portfolio V2

## Frontend
Existing stack is retained:
- React 18 + TypeScript + Vite
- Tailwind
- GSAP
- Three.js / React Three Fiber where it adds value
- Vitest/RTL + Playwright
- React Router

## Architectural principle
The portfolio is **content/data driven**. Pages render from explicit public data models; they do not query or mutate the production second-brain at runtime.

## Feature modules
```text
src/
  features/
    home/
    case-studies/
    experience/
    technical-arsenal/
    architecture-lab/
    contact/
  data/
    public-profile/
    case-studies/
    technology-graph/
    architecture-knowledge/
  components/
    layout/
    visual/
    ui/
```

## Public data boundary
Create a sanitized public knowledge package inside the portfolio repo.

Allowed:
- public technologies
- public reusable architecture patterns
- sanitized trade-offs
- public case-study mappings

Forbidden:
- internal prompts
- private project names
- credentials
- Zavi/KAB data
- production second-brain writes

## Technical Arsenal model
Recommended entities:
- `TechnologyNode`
- `TechnologyEdge`
- `EvidenceRef`
- `CaseStudyRef`
- `CapabilityDomain`

Graph renderer is a presentation concern; evidence mapping is data.

## Architecture Lab
### Components
1. ProblemInput
2. RequirementNormalizer
3. RequirementSchema (Zod)
4. RuleEngine / JEV adapter
5. ArchitectureCatalog
6. ArchitectureComposer
7. GraphModel
8. GraphRenderer
9. ExplanationBuilder
10. OptionalLlmNormalizer

### Deterministic contract
For the same normalized requirements + catalog version + rule version, output must be reproducible.

### Optional LLM boundary
The LLM is never the architect in MVP.
It may only:
- parse free text
- map intent to enums/booleans/constraints
- return schema-valid normalized requirements

If unavailable, guided inputs provide full functionality.

### Requirement schema (MVP)
- useCase
- backendPreference: dotnet | node | hybrid | agnostic
- scale: small | medium | high
- tenancy: single | multi
- auth: none | basic | enterprise
- asyncProcessing: boolean
- realtime: boolean
- auditLevel: low | medium | high
- compliance: string[]
- ai: none | rag | agent | multimodal
- data: relational | document | cache | vector | mixed
- deployment: cloud | hybrid | localFirst
- availability: standard | high

### Output schema
- components[]
- connections[]
- decisions[]
- tradeoffs[]
- risks[]
- simplerAlternative
- enterpriseAlternative
- metadata: catalogVersion, rulesVersion, deterministicHash

## Architecture catalog
Sanitized, versioned, read-only data:
- component definitions
- compatibility
- triggers
- exclusions
- cost/complexity bands
- trade-offs
- related patterns

No training is required. It is curated rule/catalog data derived from public, reusable knowledge.

## Rendering
Use SVG/Canvas for graphs first; Three.js only if it improves comprehension without hurting performance/accessibility.

## Nonfunctional
- English default
- reduced-motion
- keyboard navigation
- lazy-load heavy visual modules
- static/public pages remain fast without Architecture Lab JS
- Architecture Lab LLM adapter disabled by default
