import { z } from 'zod'

export const architectureRequirementsSchema = z.object({
  useCase: z.enum(['saas','enterprise','integration','financial','rag','media']),
  backendPreference: z.enum(['dotnet','node','hybrid','agnostic']),
  scale: z.enum(['small','medium','high']),
  tenancy: z.enum(['single','multi']),
  auth: z.enum(['basic','enterprise']),
  asyncProcessing: z.boolean(),
  realtime: z.boolean(),
  auditLevel: z.enum(['low','medium','high']),
  ai: z.enum(['none','rag','agent','multimodal']),
  data: z.enum(['relational','document','mixed']),
  deployment: z.enum(['cloud','hybrid','localFirst']),
  availability: z.enum(['standard','high'])
})

export type ArchitectureRequirements = z.infer<typeof architectureRequirementsSchema>

export interface ArchitectureNode {
  id: string
  label: string
  layer: 'Client'|'Edge'|'Services'|'Async'|'Data'|'AI'|'Observability'
  tech?: string
  reason: string
}

export interface ArchitectureEdge {
  from: string
  to: string
  kind: 'sync'|'async'|'data'|'observe'
}

export interface ArchitectureResult {
  nodes: ArchitectureNode[]
  edges: ArchitectureEdge[]
  decisions: string[]
  tradeoffs: string[]
  risks: string[]
  simplerAlternative: string
  enterpriseAlternative: string
  metadata: { catalogVersion: string; rulesVersion: string; deterministicHash: string }
}

const hash = (input: string) => {
  let value = 2166136261
  for (let i = 0; i < input.length; i++) {
    value ^= input.charCodeAt(i)
    value = Math.imul(value, 16777619)
  }
  return (value >>> 0).toString(16).padStart(8, '0')
}

export function generateArchitecture(raw: ArchitectureRequirements): ArchitectureResult {
  const input = architectureRequirementsSchema.parse(raw)
  const nodes: ArchitectureNode[] = [
    { id: 'client', label: input.useCase === 'media' ? 'Desktop / Capture Client' : 'Web / Mobile Client', layer: 'Client', reason: 'Primary user entry point.' }
  ]
  const edges: ArchitectureEdge[] = []
  const decisions: string[] = []
  const tradeoffs: string[] = []
  const risks: string[] = []

  if (input.auth === 'enterprise' || input.scale === 'high') {
    nodes.push({ id:'gateway', label:'API Gateway', layer:'Edge', tech:'API Management / gateway', reason:'Centralize routing, policy, auth and rate controls.' })
    edges.push({ from:'client', to:'gateway', kind:'sync' })
    decisions.push('Gateway added for enterprise policy and scalable API boundary.')
  }

  const serviceTech =
    input.backendPreference === 'node' ? 'Node.js / NestJS' :
    input.backendPreference === 'hybrid' ? '.NET + Node.js by workload' :
    'ASP.NET Core'

  nodes.push({ id:'service', label: input.useCase === 'saas' ? 'Tenant-aware Application Services' : 'Application Services', layer:'Services', tech:serviceTech, reason:'Core business capabilities and API orchestration.' })
  edges.push({ from: nodes.some(n=>n.id==='gateway') ? 'gateway' : 'client', to:'service', kind:'sync' })

  if (input.tenancy === 'multi') {
    nodes.push({ id:'tenant', label:'Tenant Context & Policy', layer:'Services', tech:'Tenant isolation', reason:'Multi-tenant input requires explicit tenant resolution and isolation.' })
    edges.push({ from:'service', to:'tenant', kind:'sync' })
    decisions.push('Tenant isolation is explicit rather than implicit.')
    risks.push('Tenant context leakage must be prevented at every data boundary.')
  }

  if (input.asyncProcessing) {
    nodes.push({ id:'broker', label:'Message Broker', layer:'Async', tech:'Queue / Service Bus', reason:'Async work requires decoupling, retries and back-pressure.' })
    nodes.push({ id:'worker', label:'Idempotent Worker', layer:'Async', tech:'Retry + DLQ + idempotency', reason:'At-least-once delivery requires duplicate-safe processing.' })
    edges.push({ from:'service', to:'broker', kind:'async' }, { from:'broker', to:'worker', kind:'async' })
    decisions.push('Async path uses broker + idempotent consumer.')
    tradeoffs.push('Messaging improves resilience but adds operational complexity and eventual consistency.')
  }

  nodes.push({ id:'db', label:'Primary Data Store', layer:'Data', tech: input.data === 'document' ? 'Document DB' : 'PostgreSQL / SQL Server', reason:'System-of-record persistence.' })
  edges.push({ from:'service', to:'db', kind:'data' })

  if (input.scale === 'high' || input.realtime) {
    nodes.push({ id:'cache', label:'Distributed Cache', layer:'Data', tech:'Redis', reason:'Reduce hot-path latency and protect the primary store.' })
    edges.push({ from:'service', to:'cache', kind:'data' })
    tradeoffs.push('Caching requires invalidation strategy and stampede protection.')
  }

  if (input.ai !== 'none') {
    const aiLabel = input.ai === 'multimodal' ? 'Multimodal Intelligence' : input.ai === 'agent' ? 'Controlled Agent Layer' : 'RAG Retrieval Layer'
    nodes.push({ id:'ai', label:aiLabel, layer:'AI', tech: input.ai === 'rag' ? 'Retrieval + grounding' : 'Model/tool boundary', reason:'AI requirement is isolated behind an explicit boundary.' })
    edges.push({ from:'service', to:'ai', kind:'sync' })
    if (input.ai === 'rag' || input.ai === 'agent' || input.ai === 'multimodal') {
      nodes.push({ id:'knowledge', label:'Evidence / Knowledge Index', layer:'AI', tech:'Vector/search index', reason:'Ground outputs in retrievable evidence.' })
      edges.push({ from:'ai', to:'knowledge', kind:'data' })
      decisions.push('AI output is grounded in an evidence/knowledge layer.')
      risks.push('Model output must never bypass authorization or business invariants.')
    }
  }

  if (input.auditLevel === 'high' || input.useCase === 'financial') {
    nodes.push({ id:'audit', label:'Immutable Audit Evidence', layer:'Data', tech:'Append-only audit log', reason:'High audit requirements need traceable state transitions.' })
    edges.push({ from:'service', to:'audit', kind:'data' })
    decisions.push('High-audit workflow keeps append-only evidence.')
  }

  nodes.push({ id:'obs', label:'Observability', layer:'Observability', tech:'Logs + metrics + traces', reason:'Production architecture needs measurable failure and latency signals.' })
  edges.push({ from:'service', to:'obs', kind:'observe' })
  if (input.asyncProcessing) edges.push({ from:'worker', to:'obs', kind:'observe' })

  if (input.availability === 'high') {
    decisions.push('Services should be stateless and horizontally scalable.')
    tradeoffs.push('High availability increases deployment and data replication complexity.')
  }

  if (input.deployment === 'localFirst') {
    decisions.push('Local processing/storage is primary; cloud sync is optional and explicit.')
    tradeoffs.push('Local-first improves privacy/resilience but makes synchronization a first-class concern.')
  }

  const canonical = JSON.stringify(input)
  return {
    nodes,
    edges,
    decisions,
    tradeoffs,
    risks,
    simplerAlternative: 'Start as a modular monolith with one relational store and add async/AI boundaries only when the workload requires them.',
    enterpriseAlternative: 'Add dedicated gateway policies, broker/DLQ, distributed cache, full observability, stronger audit evidence and independent service scaling.',
    metadata: { catalogVersion:'1.0.0', rulesVersion:'1.0.0', deterministicHash:hash(canonical) }
  }
}

export const defaultArchitectureRequirements: ArchitectureRequirements = {
  useCase:'saas',
  backendPreference:'dotnet',
  scale:'medium',
  tenancy:'multi',
  auth:'enterprise',
  asyncProcessing:true,
  realtime:false,
  auditLevel:'medium',
  ai:'rag',
  data:'relational',
  deployment:'cloud',
  availability:'high'
}


export function inferRequirementsFromText(
  text: string,
  base: ArchitectureRequirements = defaultArchitectureRequirements
): ArchitectureRequirements {
  const value = text.toLowerCase()
  const next: ArchitectureRequirements = { ...base }

  if (/screen|recording|video|media|transcri|multimodal/.test(value)) next.useCase = 'media'
  else if (/financial|finance|payment|payroll|bank|audit|compliance/.test(value)) next.useCase = 'financial'
  else if (/rag|retrieval|knowledge base|semantic search/.test(value)) next.useCase = 'rag'
  else if (/event|webhook|integration|integrate|sync/.test(value)) next.useCase = 'integration'
  else if (/enterprise|internal tool|corporate/.test(value)) next.useCase = 'enterprise'
  else if (/saas|tenant|subscription|booking/.test(value)) next.useCase = 'saas'

  const hasNode = /node\.js|nodejs|nest\.js|nestjs|nest js/.test(value)
  const hasDotnet = /\.net|dotnet|asp\.net|aspnet|c#/.test(value)
  if (hasNode && hasDotnet) next.backendPreference = 'hybrid'
  else if (hasNode) next.backendPreference = 'node'
  else if (hasDotnet) next.backendPreference = 'dotnet'

  if (/multi[- ]?tenant|multiple tenants|tenants/.test(value)) next.tenancy = 'multi'
  if (/single[- ]?tenant|one tenant/.test(value)) next.tenancy = 'single'

  if (/high scale|high traffic|millions|million users|large scale|global/.test(value)) next.scale = 'high'
  else if (/small|prototype|mvp|few users/.test(value)) next.scale = 'small'

  if (/sso|oidc|oauth|jwt|rbac|enterprise auth|identity provider/.test(value)) next.auth = 'enterprise'
  if (/queue|background|async|asynchronous|event[- ]driven|worker|batch/.test(value)) next.asyncProcessing = true
  if (/real[- ]?time|websocket|live update|streaming/.test(value)) next.realtime = true

  if (/audit|compliance|financial|payroll|regulated|traceability/.test(value)) next.auditLevel = 'high'

  if (/multimodal|image|video|audio|screen recording/.test(value)) next.ai = 'multimodal'
  else if (/agent|assistant|tool calling|automation agent/.test(value)) next.ai = 'agent'
  else if (/rag|retrieval|knowledge base|semantic search|grounded/.test(value)) next.ai = 'rag'

  if (/mongo|document db|document database/.test(value)) next.data = 'document'
  else if (/vector.*sql|sql.*vector|mixed data/.test(value)) next.data = 'mixed'
  else if (/postgres|sql server|relational|sql/.test(value)) next.data = 'relational'

  if (/local[- ]?first|offline|on-device|on device|private local/.test(value)) next.deployment = 'localFirst'
  else if (/hybrid cloud|on-prem.*cloud|on prem.*cloud/.test(value)) next.deployment = 'hybrid'
  else if (/cloud|azure|aws|gcp/.test(value)) next.deployment = 'cloud'

  if (/high availability|24\/7|zero downtime|mission critical/.test(value)) next.availability = 'high'

  return architectureRequirementsSchema.parse(next)
}
