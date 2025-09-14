# PRD — Portafolio Juan German Zambrano Ortega

## Objetivo
Mostrar experiencia y proyectos de forma impactante, con diseño animado y accesible.

## Casos de uso y criterios de aceptación

### 1. Home
- Hero fullscreen con logo animado (circuitos + dragón).
- Menús en 4 esquinas.
- CTA primario Contacto, secundario Descargar CV.
- Hover logo → foto + ramas + rayo eléctrico.
**Criterios**: GSAP/Three activos, reduced-motion guard.

### 2. Projects
- Grid responsivo (3 desktop, 1 mobile).
- Filtros por categoría, búsqueda.
- Tarjetas con cover, stack, KPIs, links.

### 3. Project Detail
- Breadcrumbs.
- KPIs destacados.
- Secciones Contexto, Solución, Resultados, Rol, Tecnologías.
- Galería + "Siguientes proyectos".

### 4. Experience
- Timeline vertical.
- Logos empresas.
- Logros cuantitativos.

### 5. Skills
- Categorías Core + Arquitectura.
- Bloque "Cómo trabajo".
- Badges y snippet.

### 6. Contact
- Formulario accesible (nombre, email, mensaje).
- Validación zod.
- Toast de confirmación.
- Links externos (GitHub, LinkedIn, WhatsApp, Email).

### 7. 404
- Mensaje claro + botón Volver al inicio.

### Reglas globales
- Accesibilidad: focus, ARIA, reduced-motion.
- Perf: LCP ≤2.5s, imágenes AVIF/WebP.
- Tests: unit + e2e, cobertura ≥80%.
- SEO: meta, OG/Twitter, JSON-LD.
- Self-healing: tickets + reports automáticos.