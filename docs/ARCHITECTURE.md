# ARCHITECTURE — Portafolio

## Stack
- React (Vite+TS)
- Tailwind + shadcn/ui + Radix
- GSAP + Three.js
- Vitest/RTL + Playwright

## Rutas
- /, /projects, /projects/:slug, /experience, /skills, /contact, 404

## Carpetas
/src/components, /src/pages, /src/data, /styles, /lib (gsap.ts, three.ts, a11y.ts, seo.ts)

/public/cv/JuanZambrano_ATS_Final.pdf

## Componentes clave
AnimatedLogo, CircuitBackground, ProjectCard, Timeline, ContactForm, Footer

## Animaciones
- tlIntro
- tlLogoHover
- rayTo(target)
- menuHover
- ScrollTrigger reveals
- reducedMotion guard

## Tokens
/design/tokens.json → colores, espaciados, sombras, easings

## SEO
lib/seo.ts con meta, OG/Twitter, JSON-LD Person/Project

## Performance
Code-splitting GSAP/Three, imágenes AVIF/WebP, lazy load, Lighthouse CI

## Workflow
MCP: design → implement → tests → merge