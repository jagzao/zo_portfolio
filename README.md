# Juan Zambrano — Portfolio V2

**Senior Software Engineer — .NET, Node.js, Distributed Systems & Applied AI**

Recruiter-first professional portfolio focused on evidence, real systems and technical depth on demand.

**Live:** https://zo-portfolio.pages.dev/

## Portfolio V2

The V2 information architecture is intentionally simple to scan:

- **Home** — positioning, credibility, measurable impact and clear CTAs
- **Case Studies** — enterprise work and products I built
- **Experience** — direct recruiter-readable chronology and impact
- **Technical Arsenal** — interactive technology/evidence graph
- **Architecture Lab** — deterministic architecture generator
- **Contact** — direct professional channels

### Public products

**Wondernails** — multi-tenant SaaS with tenant-aware automation, RAG and controlled agent workflows.

**Zo Media Intelligence** — local-first multimodal media intelligence that turns screen recordings into evidence-grounded documentation and AI-ready knowledge.

## Architecture Lab

The Architecture Lab does **not** require an LLM.

```text
Problem description / guided constraints
        ↓
deterministic requirement normalization
        ↓
rules
        ↓
architecture model
        ↓
SVG graph + rationale + trade-offs + risks
```

The same normalized requirements and rule version produce the same deterministic hash.

An optional LLM normalizer can be added later for richer natural-language parsing, but the LLM must never be the architecture decision engine.

## Technical stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- Zod
- Playwright
- Vitest
- GSAP / Three.js retained for selected visual effects
- Cloudflare Pages / PWA support

## Design

V2 visual direction:

- deep black canvas
- gold primary accent
- controlled red emphasis
- premium engineering-lab aesthetic
- recruiter readability before decoration
- reduced-motion support
- keyboard-accessible interactive graphs

The approved visual source is:

`docs/ui/portfolio-v2/approved/00_APPROVED_MASTER_BOARD.svg`

## Run locally

```bash
git fetch origin
git switch feat/portfolio-v2-completion

cd apps/portfolio
npm install
npm run typecheck
npm run lint
npm run test
npm run dev
```

Open:

`http://localhost:3000`

### Browser E2E

```bash
npx playwright install chromium
npm run e2e -- --project=chromium
```

## Deterministic release gates

The repo defines gates for:

- TypeScript
- ESLint
- Vitest
- production build
- Playwright Chromium
- public private-name scan

See:

- `docs/PORTFOLIO_V2_COMPLETION_AUDIT.md`
- `docs/ui/portfolio-v2/README_FIRST.md`

## Branch policy

The final implementation is developed on:

`feat/portfolio-v2-completion`

Do not merge to `master` until owner visual/local validation.
