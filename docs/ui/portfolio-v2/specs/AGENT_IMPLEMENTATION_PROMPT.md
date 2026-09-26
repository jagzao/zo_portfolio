# Agent Implementation Prompt — Portfolio V2

Implement issues #2 through #9 on branch derived from `feat/recruiter-first-portfolio-v2`.

## Read first
1. `docs/PRD.md`
2. `docs/ARCHITECTURE.md`
3. `docs/ui/portfolio-v2/README_FIRST.md`
4. approved master board
5. all files under `docs/ui/portfolio-v2/specs/`
6. `design/tokens.json`

## Visual source of truth
`docs/ui/portfolio-v2/approved/00_APPROVED_MASTER_BOARD.svg`

## Invariants
- Recruiter-first scanning beats decoration.
- Black + gold + red premium engineering aesthetic.
- Never expose Zavi/KAB or other private/internal names.
- Do not modify the production second-brain.
- Wondernails and Zo Media Intelligence are public.
- Backend identity includes both .NET and Node.js.
- Architecture Lab core is deterministic.
- Optional LLM can only normalize free text.
- Preserve accessibility and reduced-motion.

## Implementation order
1. data/source cleanup + route model
2. design tokens/layout shell
3. Home
4. Case Studies
5. Experience
6. Technical Arsenal graph
7. Architecture Lab guided deterministic MVP
8. optional LLM normalizer interface (provider disabled by default)
9. SEO/link fixes
10. tests
11. screenshot evidence + visual repair loop

## Gates
Run build, typecheck, lint, unit and e2e.
Capture desktop/mobile screenshots for critical pages.
Compare against approved board.
Do not mark done with green tests alone.
