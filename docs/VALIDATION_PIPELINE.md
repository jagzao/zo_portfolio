# Deterministic Validation Pipeline

The portfolio must be validated primarily with tools, not with an LLM.

## Local / repository gate

```bash
cd apps/portfolio
npm install
npm run validate
npx playwright install chromium
npm run e2e -- --project=chromium
```

`npm run validate` runs:

1. TypeScript typecheck
2. ESLint
3. Vitest
4. production build

Playwright then exercises recruiter-facing routes and Architecture Lab behavior.

## Durable CI

The repo contains two orchestration options:

### GitHub Actions
`.github/workflows/portfolio-v2.yml`

No external infrastructure is required.

### Jenkins
`Jenkinsfile`

Jenkins executes deterministic stages and can preserve reports even if an interactive coding agent crashes.

## SonarQube

`sonar-project.properties` is included for installations where SonarQube/SonarScanner already exists.

The Jenkins Sonar stage is optional and runs only when `SONAR_HOST_URL` is configured.

SonarQube is supplementary static analysis; it is not allowed to replace unit, build or Playwright gates.

## Private-data gate

The public repo contains an allowlist test for public case studies.

For a private denylist without exposing private identifiers in Git, configure the GitHub Actions secret:

`PORTFOLIO_PRIVATE_DENYLIST`

as a comma-separated private list. The workflow scans the public application using that secret without storing identifiers in the repository.

## LLM role

An LLM may help with:
- initial planning
- diagnosing a difficult failure after deterministic evidence exists
- optional final visual/semantic audit

An LLM is **not** a build, test, architecture or release gate.
