export type TechDomain = 'Backend & Distributed Systems' | 'Frontend Engineering' | 'Cloud & Data' | 'Applied AI & Automation'

export interface TechnologyNode {
  id: string
  label: string
  domain: TechDomain
  core: boolean
  related: string[]
  projects: string[]
  evidence: string
}

export const technologyNodes: TechnologyNode[] = [
  { id: 'dotnet', label: '.NET / C#', domain: 'Backend & Distributed Systems', core: true, related: ['aspnet','ef','microservices','messaging','azure','sqlserver','redis'], projects: ['ey-enterprise-rbac','chevron-platform-modernization'], evidence: 'Enterprise APIs, authorization services, cloud workloads and integration systems.' },
  { id: 'node', label: 'Node.js / NestJS', domain: 'Backend & Distributed Systems', core: true, related: ['typescript','microservices','postgres','redis','rest'], projects: ['grupo-cosmic-hr','wondernails','zo-media-intelligence'], evidence: 'Production backend work across HR systems, SaaS products and current product engineering.' },
  { id: 'aspnet', label: 'ASP.NET Core', domain: 'Backend & Distributed Systems', core: true, related: ['dotnet','rest','ef','azure'], projects: ['ey-enterprise-rbac'], evidence: 'Secure enterprise APIs and distributed service development.' },
  { id: 'ef', label: 'Entity Framework Core', domain: 'Backend & Distributed Systems', core: false, related: ['dotnet','sqlserver','postgres'], projects: [], evidence: 'ORM, change tracking, transactions and data access patterns.' },
  { id: 'microservices', label: 'Microservices', domain: 'Backend & Distributed Systems', core: true, related: ['dotnet','node','messaging','observability'], projects: ['ey-enterprise-rbac','chevron-platform-modernization'], evidence: 'Distributed enterprise platforms and service boundaries.' },
  { id: 'messaging', label: 'Messaging / Outbox', domain: 'Backend & Distributed Systems', core: true, related: ['microservices','redis','observability'], projects: [], evidence: 'At-least-once processing, idempotency, retry/backoff and transactional outbox patterns.' },
  { id: 'rest', label: 'REST APIs', domain: 'Backend & Distributed Systems', core: true, related: ['dotnet','node','aspnet'], projects: ['ey-enterprise-rbac','wondernails'], evidence: 'API design and integrations across enterprise and SaaS systems.' },
  { id: 'react', label: 'React', domain: 'Frontend Engineering', core: true, related: ['typescript','reactnative'], projects: ['ey-enterprise-rbac','wondernails'], evidence: 'Enterprise micro-frontends and product UI.' },
  { id: 'vue', label: 'Vue', domain: 'Frontend Engineering', core: true, related: ['typescript'], projects: [], evidence: 'Enterprise and product frontend delivery.' },
  { id: 'typescript', label: 'TypeScript', domain: 'Frontend Engineering', core: true, related: ['react','vue','node'], projects: ['wondernails'], evidence: 'Frontend and backend product engineering.' },
  { id: 'reactnative', label: 'React Native', domain: 'Frontend Engineering', core: false, related: ['react','typescript'], projects: [], evidence: 'Published mobile applications.' },
  { id: 'azure', label: 'Azure', domain: 'Cloud & Data', core: true, related: ['dotnet','apim','monitor','adf'], projects: ['ey-enterprise-rbac','chevron-platform-modernization'], evidence: 'API Management, monitoring, application workloads and data integration.' },
  { id: 'apim', label: 'API Management', domain: 'Cloud & Data', core: false, related: ['azure','aspnet'], projects: ['ey-enterprise-rbac'], evidence: 'Enterprise API boundary and policy enforcement.' },
  { id: 'monitor', label: 'Azure Monitor', domain: 'Cloud & Data', core: false, related: ['azure','observability'], projects: ['chevron-platform-modernization'], evidence: 'Operational diagnostics and integration troubleshooting.' },
  { id: 'adf', label: 'Azure Data Factory', domain: 'Cloud & Data', core: false, related: ['azure','sqlserver'], projects: ['chevron-platform-modernization'], evidence: 'Incremental copy and resilient data integration.' },
  { id: 'sqlserver', label: 'SQL Server', domain: 'Cloud & Data', core: true, related: ['dotnet','ef'], projects: ['grupo-cosmic-hr'], evidence: 'Long-running enterprise relational database experience.' },
  { id: 'postgres', label: 'PostgreSQL', domain: 'Cloud & Data', core: true, related: ['node','ef','rag'], projects: ['wondernails'], evidence: 'Transactional product and service workloads.' },
  { id: 'redis', label: 'Redis', domain: 'Cloud & Data', core: false, related: ['dotnet','node','messaging'], projects: ['wondernails'], evidence: 'Caching, distributed coordination and performance patterns.' },
  { id: 'observability', label: 'Observability', domain: 'Cloud & Data', core: true, related: ['monitor','microservices','messaging'], projects: ['chevron-platform-modernization'], evidence: 'P95/error-rate/resource saturation and correlation-driven diagnostics.' },
  { id: 'rag', label: 'RAG', domain: 'Applied AI & Automation', core: true, related: ['agents','vector','python','postgres'], projects: ['wondernails','zo-media-intelligence'], evidence: 'Retrieval-grounded product workflows and knowledge systems.' },
  { id: 'agents', label: 'AI Agents', domain: 'Applied AI & Automation', core: true, related: ['rag','mcp','python'], projects: ['wondernails'], evidence: 'Controlled agent workflows for product automation.' },
  { id: 'mcp', label: 'MCP', domain: 'Applied AI & Automation', core: false, related: ['agents','python'], projects: [], evidence: 'Tool-oriented AI integration patterns.' },
  { id: 'python', label: 'Python', domain: 'Applied AI & Automation', core: true, related: ['rag','agents','vector'], projects: ['zo-media-intelligence'], evidence: 'AI/media processing and automation.' },
  { id: 'vector', label: 'Vector Search', domain: 'Applied AI & Automation', core: false, related: ['rag','postgres'], projects: ['wondernails','zo-media-intelligence'], evidence: 'Retrieval and semantic knowledge indexing.' }
]

export const techDomains: TechDomain[] = [
  'Backend & Distributed Systems',
  'Frontend Engineering',
  'Cloud & Data',
  'Applied AI & Automation'
]
