# Portfolio V2 — Motion System

## Principle
Motion must reinforce comprehension, not delay recruiter scanning.

## Global
- Initial meaningful content visible immediately.
- No loading theatre before hero copy.
- 150–350ms interaction motion.
- Reduced-motion: disable graph physics, decorative parallax and continuous glows.

## Hero
1. Copy fades/slides in within 250ms.
2. Gold edge light reveals subtly.
3. Architecture Lab teaser graph draws 3–5 connections after copy is readable.
4. Red accent pulse only on active/interactive state.

## Case cards
- Hover/focus: +2px lift, gold border intensity, short architecture trace reveal.
- No 3D tilt that harms readability.

## Technical Arsenal
- Node selection: 180–260ms emphasis.
- Non-related nodes fade to 25–35%.
- Related edges animate once.
- Keyboard focus mirrors pointer behavior.

## Architecture Lab
1. Structured requirements accepted.
2. Nodes appear by layer: client → edge → app → async/data → AI.
3. Edges draw left-to-right.
4. Rationale cards reveal after graph is stable.
5. Re-run morphs existing graph rather than full-page reset.

## Performance
- Prefer SVG transforms/opacity.
- Three.js only for decorative background/optional premium effects.
- Never block LCP on WebGL.
