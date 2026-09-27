# PRD — Portfolio V2 (Recruiter First)

## Product goal
Convert the portfolio into a recruiter-first proof system: a recruiter must understand Juan's profile, specialization, credibility and next action in <=20 seconds, while technical visitors can go deeper.

## Positioning
**Senior Software Engineer — .NET, Node.js, Distributed Systems & Applied AI**

## Public portfolio rules
- English is the recruiter-facing default. Do not expose an incomplete locale switch.
- Never expose private/internal project names or secrets.
- PRIVATE_INTERNAL_PROJECTS are excluded from UI, metadata, source copy and generated assets.
- Wondernails and Zo Media Intelligence are public showcase products.
- Second-brain production data is read-only; the portfolio never mutates it.
- Only verified metrics and claims may be published.

## IA / routes
- `/` Home
- `/case-studies` Case Studies index
- `/case-studies/:slug` Case Study detail
- `/experience` Experience
- `/technical-arsenal` Interactive Technical Arsenal
- `/architecture-lab` Architecture Lab
- `/contact` Contact
- `*` 404

## Home order
1. Hero: identity + positioning + CTA
2. Trusted experience
3. Measurable impact
4. Featured case studies
5. Core expertise
6. Architecture Lab teaser
7. Selected experience
8. Final CTA

### Hero requirements
- H1: Senior Software Engineer
- Supporting line: .NET, Node.js, Distributed Systems & Applied AI
- Problem/value statement, not a technology inventory
- CTA: View Case Studies
- CTA: Download CV
- LinkedIn/Contact visible
- Architecture Lab teaser may appear as a compact animated slide/card, never as the dominant message

## Case Studies
### Index
- 4–6 featured items before the fold
- Filters: Enterprise, SaaS, AI, Backend, Frontend, Mobile
- Groups: Enterprise Work / Products I Built
- Cards lead with problem, role, result and concise stack

### Required public products
#### Wondernails
Multi-tenant SaaS. Public story may include RAG/agent use cases for quoting, reminders, support and tenant-aware business knowledge.

#### Zo Media Intelligence
**Local-first multimodal media intelligence that turns screen recordings into evidence-grounded documentation and AI-ready knowledge.**

### Detail template
Overview → Challenge → Solution → Architecture → Results → My Role → Tech Stack → Related work.

## Experience
- Company, role, dates, work mode and 1–3 impact bullets visible without click.
- Earlier experience secondary/collapsible.
- Dates reconciled against canonical CV/source before release.

## Technical Arsenal
Four domains:
1. Backend & Distributed Systems
2. Frontend Engineering
3. Cloud & Data
4. Applied AI & Automation

Backend must visibly include both:
- .NET / C# / ASP.NET Core
- Node.js / NestJS

Graph interaction:
- click/focus a technology
- highlight related technologies
- show public projects where used
- show evidence/experience context
- provide keyboard-accessible list fallback

## Architecture Lab
Visitor describes a problem and receives a professional architecture graph with rationale and trade-offs.

Core path:
`input → structured requirements → deterministic rules/JEV → architecture model → graph + explanation`

LLM is optional and may only normalize free text into the same structured schema. Architecture selection remains deterministic.

## Visual direction
- Premium engineering lab / executive-tech
- Black canvas
- Gold primary accent
- Red secondary/action accent
- High readability white/gray typography
- Impressive, but not gaming/cyberpunk and not generic SaaS

## Release gates
- Recruiter scan test <=20s
- CV/download and external links work
- WCAG-oriented keyboard/focus/contrast
- reduced-motion support
- build/typecheck/lint/unit/e2e pass
- visual comparison against approved board
- 0 BLOCKER/HIGH visual defects
- secret-name scan passes
