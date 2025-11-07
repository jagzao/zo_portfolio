# Contributing to Juan Zambrano Portfolio

Thank you for your interest in contributing to this project! This document provides guidelines and information for developers.

## Table of Contents

- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Code Quality](#code-quality)
- [Environment Variables](#environment-variables)
- [Git Workflow](#git-workflow)
- [Testing](#testing)
- [Deployment](#deployment)

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jagzao/zo_portfolio.git
cd zo_portfolio
```

2. Navigate to the portfolio app:
```bash
cd apps/portfolio
```

3. Install dependencies:
```bash
npm install
```

4. Create environment file:
```bash
cp .env.example .env
```

5. Configure your `.env` file with appropriate values

6. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
apps/portfolio/
├── public/              # Static assets
│   ├── cv/             # Resume files
│   └── circuit.svg     # Background pattern
├── src/
│   ├── components/     # Reusable React components
│   │   ├── ui/        # shadcn/ui components
│   │   ├── Analytics.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── ...
│   ├── config/        # Configuration files
│   │   ├── env.ts     # Environment variables
│   │   └── index.ts
│   ├── data/          # JSON data files
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   ├── styles/        # Global styles
│   └── test/          # Test files
├── .env.example       # Environment variables template
├── .eslintrc.cjs      # ESLint configuration
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
└── package.json       # Dependencies and scripts
```

## Code Quality

### TypeScript

This project uses **strict TypeScript** configuration:

```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true
}
```

Before committing, always run:
```bash
npm run typecheck
```

### ESLint

Linting is configured with TypeScript and React rules:

```bash
npm run lint
```

### Code Style Guidelines

1. **Components**
   - Use functional components with hooks
   - Export named components (not default when possible)
   - One component per file
   - Use TypeScript interfaces for props

2. **Naming Conventions**
   - Components: PascalCase (`MyComponent.tsx`)
   - Files: kebab-case or PascalCase
   - Variables/functions: camelCase
   - Constants: UPPER_SNAKE_CASE

3. **Imports**
   - Use absolute imports with `@/` alias
   - Group imports: React → External → Internal → Styles
   - Remove unused imports

Example:
```typescript
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { config } from '@/config'
import './styles.css'
```

## Environment Variables

The project uses Vite's environment variables system. All variables must be prefixed with `VITE_`.

### Configuration

Create a `.env` file based on `.env.example`:

```bash
# Application
VITE_APP_NAME=Juan Zambrano Portfolio
VITE_APP_URL=https://zo-portfolio.pages.dev

# Contact API (optional)
VITE_CONTACT_API_URL=https://api.resend.com/emails
VITE_RESEND_API_KEY=your_api_key_here

# Analytics (optional)
VITE_CLOUDFLARE_ANALYTICS_TOKEN=your_token_here
VITE_ENABLE_ANALYTICS=true

# Sentry (optional)
VITE_SENTRY_DSN=your_sentry_dsn
VITE_SENTRY_ENVIRONMENT=development
VITE_ENABLE_ERROR_TRACKING=false
```

### Accessing Environment Variables

Use the centralized config module:

```typescript
import { config } from '@/config'

// Access variables
const apiUrl = config.contact.apiUrl
const analyticsEnabled = config.analytics.enabled
```

**Never commit** `.env` files to the repository. They are gitignored by default.

## Git Workflow

### Commit Message Convention

This project uses **conventional commits** enforced by Husky hooks:

```
<type>: <description>

[optional body]
[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```bash
git commit -m "feat: Add error boundary component"
git commit -m "fix: Resolve TypeScript strict mode errors"
git commit -m "docs: Update CONTRIBUTING.md with env variables"
```

### Git Hooks

The project uses Husky for git hooks:

- **commit-msg**: Validates commit message format
- Prevents commits with "jagzao and claude" pattern
- Blocks Co-Authored-By lines

### Branching Strategy

- `main`: Production-ready code
- `claude/*`: Feature branches for Claude-assisted development
- Create descriptive branch names: `feature/analytics`, `fix/typescript-errors`

## Testing

### Unit Tests (Vitest)

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# UI mode
npm run test:ui
```

### End-to-End Tests (Playwright)

```bash
# Run e2e tests
npm run e2e

# Interactive UI mode
npm run e2e:ui

# Debug mode
npm run e2e:debug
```

### Writing Tests

Test files should be placed in `src/test/` directory:

```typescript
import { render, screen } from '@testing-library/react'
import { MyComponent } from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

## Deployment

### Build for Production

```bash
npm run build
```

Output will be in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Cloudflare Pages

This project is deployed on Cloudflare Pages:

1. **Build Command**: `npm run build`
2. **Build Output**: `dist`
3. **Node Version**: 18+

### Environment Variables in Production

Set environment variables in Cloudflare Pages dashboard:
- Navigate to Settings → Environment Variables
- Add all `VITE_*` variables
- Redeploy to apply changes

## Features Implemented

### Core Features
- ✅ React 18 with TypeScript
- ✅ Vite for fast development
- ✅ Tailwind CSS with custom design system
- ✅ GSAP animations with reduced-motion support
- ✅ Three.js for 3D effects
- ✅ shadcn/ui components

### Quality & Performance
- ✅ Strict TypeScript configuration
- ✅ ErrorBoundary for error handling
- ✅ Code splitting and lazy loading
- ✅ Responsive design (mobile-first)
- ✅ Accessibility (ARIA, keyboard navigation)
- ✅ SEO optimized with meta tags

### Integrations
- ✅ Cloudflare Web Analytics (privacy-first)
- ✅ Internationalization (English/Spanish)
- ✅ React Query for data fetching
- ✅ Zustand for state management

### Developer Experience
- ✅ Environment variables system
- ✅ ESLint + TypeScript
- ✅ Vitest + Playwright testing
- ✅ Git hooks with Husky
- ✅ Hot Module Replacement (HMR)

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [shadcn/ui](https://ui.shadcn.com/)

## Getting Help

If you encounter issues:

1. Check existing issues on GitHub
2. Read the documentation in `/docs`
3. Contact: [jagzao@gmail.com](mailto:jagzao@gmail.com)

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Thank you for contributing!** 🚀
