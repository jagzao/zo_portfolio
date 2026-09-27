export type CaseCategory = 'Enterprise' | 'SaaS' | 'AI' | 'Backend' | 'Frontend' | 'Mobile'

export interface CaseStudy {
  slug: string
  title: string
  group: 'Enterprise Work' | 'Products I Built'
  categories: CaseCategory[]
  summary: string
  problem: string
  outcome: string
  role: string
  technologies: string[]
  architecture: string[]
  challenge: string
  solution: string
  results: string[]
  live?: string
  github?: string
  featured?: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ey-enterprise-rbac',
    title: 'EY — Enterprise RBAC Platform',
    group: 'Enterprise Work',
    categories: ['Enterprise', 'Backend', 'Frontend'],
    summary: 'Distributed authorization across React micro-frontends and .NET services on Azure.',
    problem: 'Enterprise applications needed consistent, policy-driven access control across multiple systems.',
    outcome: 'A reusable authorization layer with centralized policy decisions and secure API boundaries.',
    role: 'Senior Software Engineer — full-stack ownership across authorization flows, APIs and UI integration.',
    technologies: ['C#', '.NET', 'React', 'Azure', 'API Management', 'JWT', 'PlainID', 'Docker'],
    architecture: ['Micro-frontends', '.NET services', 'API gateway', 'Policy decision point', 'JWT/claims'],
    challenge: 'Keep authorization consistent across distributed applications without duplicating rules in every frontend and service.',
    solution: 'Centralized policy evaluation, claims-aware APIs and reusable frontend integration patterns behind an API management boundary.',
    results: ['Consistent authorization model', 'Reduced policy duplication', 'Clearer security boundaries'],
    featured: true
  },
  {
    slug: 'chevron-platform-modernization',
    title: 'Chevron — Platform & Data Modernization',
    group: 'Enterprise Work',
    categories: ['Enterprise', 'Backend'],
    summary: 'Operational tooling and resilient data integration for enterprise workflows.',
    problem: 'Operational teams needed reliable incremental processing and better diagnostics for integration workloads.',
    outcome: 'More observable and resilient processing with incremental copy, retries and monitoring.',
    role: 'Senior Software Engineer working across platform integration, diagnostics and reliability.',
    technologies: ['.NET', 'Azure', 'ADF', 'Azure Monitor', 'REST APIs', 'Retry policies'],
    architecture: ['Incremental data flows', 'Monitoring', 'Retry/backoff', 'Operational tooling'],
    challenge: 'Improve reliability without turning transient integration failures into manual operational work.',
    solution: 'Used incremental processing, explicit retry policies and telemetry-driven diagnostics.',
    results: ['Improved operational visibility', 'Resilient integration behavior', 'Lower manual recovery burden'],
    featured: true
  },
  {
    slug: 'grupo-cosmic-hr',
    title: 'Grupo Cosmic — HR & Operations Platform',
    group: 'Enterprise Work',
    categories: ['Enterprise', 'Backend'],
    summary: 'High-volume HR workflows and internal operational systems.',
    problem: 'HR operations required dependable processing at high daily volume and integration with internal systems.',
    outcome: 'Automated workflows supporting more than 1,500 hires/terminations per day.',
    role: 'Full-Stack Engineer responsible for backend, integrations and product delivery.',
    technologies: ['Node.js', 'NestJS', '.NET', 'SQL Server', 'React', 'Vue'],
    architecture: ['Operational services', 'HR workflows', 'Integrations', 'SQL data layer'],
    challenge: 'Keep operational HR processing reliable while replacing manual steps.',
    solution: 'Built internal services and workflows around validated business rules and repeatable integrations.',
    results: ['1,500+ daily HR operations supported', 'Reduced manual work', 'Reusable internal tooling'],
    featured: true
  },
  {
    slug: 'wondernails',
    title: 'Wondernails — Multi-tenant SaaS',
    group: 'Products I Built',
    categories: ['SaaS', 'AI', 'Backend', 'Frontend'],
    summary: 'Multi-tenant beauty-business SaaS with tenant-aware automation and AI-assisted workflows.',
    problem: 'Beauty businesses need booking, customer operations and intelligent assistance without losing tenant isolation.',
    outcome: 'A configurable SaaS foundation for appointments, reminders, quoting and business knowledge.',
    role: 'Founder & Engineer — product, architecture, implementation and deployment.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'RAG', 'Redis', 'Supabase'],
    architecture: ['Multi-tenant application', 'Tenant-aware data access', 'RAG knowledge layer', 'Agent workflows', 'Notifications'],
    challenge: 'Provide intelligent quoting, reminders and support while keeping each tenant’s context isolated.',
    solution: 'Combine multi-tenant boundaries with curated tenant knowledge, RAG retrieval and controlled agent actions.',
    results: ['Tenant-aware product foundation', 'RAG-ready knowledge workflows', 'Automation surface for quoting and reminders'],
    live: 'https://sass-store-web.vercel.app/t/wondernails',
    featured: true
  },
  {
    slug: 'zo-media-intelligence',
    title: 'Zo Media Intelligence',
    group: 'Products I Built',
    categories: ['AI', 'Backend'],
    summary: 'Local-first multimodal media intelligence that turns screen recordings into evidence-grounded documentation and AI-ready knowledge.',
    problem: 'Screen recordings contain valuable operational evidence but are difficult to search, summarize and reuse.',
    outcome: 'A local-first pipeline that converts recorded media into structured, evidence-grounded knowledge.',
    role: 'Founder & Engineer — product architecture, processing pipeline and knowledge model.',
    technologies: ['Python', 'Node.js', 'Multimodal AI', 'Transcription', 'RAG', 'Local-first processing'],
    architecture: ['Media ingestion', 'Transcription', 'Evidence extraction', 'Structured documentation', 'Knowledge indexing'],
    challenge: 'Extract useful knowledge from media while preserving traceability back to evidence.',
    solution: 'Process media locally where possible, attach generated knowledge to source evidence and prepare structured outputs for retrieval.',
    results: ['Evidence-grounded documentation model', 'AI-ready knowledge output', 'Local-first privacy posture'],
    featured: true
  }
]

export const experience = [
  {
    company: 'Enterprise consulting',
    role: 'Senior Software Engineer',
    period: 'Recent',
    mode: 'Remote / distributed teams',
    impact: 'Built secure distributed applications, authorization flows, integrations and cloud workloads for enterprise clients.',
    technologies: ['.NET', 'React', 'Azure', 'SQL', 'Distributed Systems']
  },
  {
    company: 'Apex Systems',
    role: 'Full-Stack Developer',
    period: '2024 — 2025',
    mode: 'Remote, Mexico',
    impact: 'Delivered React/Vue and Node/.NET features, integration work and maintainability improvements.',
    technologies: ['.NET', 'Node.js', 'React', 'Vue', 'PostgreSQL']
  },
  {
    company: 'DaCodes',
    role: 'Software Developer',
    period: '2022 — 2024',
    mode: 'Mexico',
    impact: 'Built responsive applications, REST APIs and third-party integrations across multiple products.',
    technologies: ['Node.js', '.NET', 'React', 'Vue', 'PostgreSQL']
  },
  {
    company: 'Grupo Cosmic',
    role: 'Full-Stack Developer',
    period: '2017 — 2020',
    mode: 'Mexico',
    impact: 'Built HR and operations systems, automation and integrations; supported high-volume daily workflows.',
    technologies: ['Node.js', 'NestJS', '.NET', 'SQL Server', 'React']
  },
  {
    company: 'Earlier consulting',
    role: 'Software Engineer / Consultant',
    period: '2010 — 2017',
    mode: 'Mexico',
    impact: 'Delivered enterprise software, ERP integrations and business applications across several industries.',
    technologies: ['C#', '.NET', 'SQL', 'JavaScript', 'ERP integrations']
  }
]

export const capabilityCards = [
  { title: 'Enterprise Security', description: 'Authorization, identity, policy enforcement and secure API boundaries.' },
  { title: 'Distributed Systems', description: 'Reliable services, messaging, idempotency, retries and observability.' },
  { title: 'Cloud & Data', description: 'Azure workloads, SQL platforms, integrations, caching and data pipelines.' },
  { title: 'Applied AI', description: 'RAG, agents, multimodal workflows and deterministic AI-assisted systems.' }
]
