# TESTING — Estrategia

## Objetivos
- Confiabilidad, accesibilidad, performance
- Cobertura ≥80%

## Herramientas
- Unit: Vitest + RTL
- E2E: Playwright
- Perf: Lighthouse/Playwright traces
- Lint: ESLint + TS

## Scope
Unit: componentes aislados
Integración: pages
E2E: flujos críticos

## Flujos e2e
- Navegación Home → Projects
- Hover logo → ramas + rayTo
- Descargar CV
- Buscar proyecto
- Contact form submit

## A11y
- Focus rings visibles
- Roles ARIA
- Validación accesible

## Performance Budget
- LCP ≤ 2.5s
- CLS < 0.1
- TBT < 200ms

## CI
- npm run test --coverage
- npx playwright test
- Reports HTML + traces

## Self-healing
- Si falla test/build: crear ticket auto-heal, delta design+implement, reintento ≤3
- Report en /reports/self-healing/{timestamp}.md