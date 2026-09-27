import { describe, expect, it } from 'vitest'
import { defaultArchitectureRequirements, generateArchitecture, inferRequirementsFromText } from '@/lib/architectureLab'

describe('Architecture Lab deterministic engine', () => {
  it('produces the same hash and graph for the same requirements', () => {
    const first = generateArchitecture(defaultArchitectureRequirements)
    const second = generateArchitecture({...defaultArchitectureRequirements})
    expect(second.metadata.deterministicHash).toBe(first.metadata.deterministicHash)
    expect(second.nodes).toEqual(first.nodes)
    expect(second.edges).toEqual(first.edges)
  })

  it('uses Node/NestJS when Node is preferred', () => {
    const result = generateArchitecture({...defaultArchitectureRequirements, backendPreference:'node'})
    expect(result.nodes.find(n=>n.id==='service')?.tech).toContain('Node.js')
  })

  it('adds explicit tenant isolation for multi-tenant systems', () => {
    const result = generateArchitecture({...defaultArchitectureRequirements, tenancy:'multi'})
    expect(result.nodes.some(n=>n.id==='tenant')).toBe(true)
  })

  it('adds broker and idempotent worker for async processing', () => {
    const result = generateArchitecture({...defaultArchitectureRequirements, asyncProcessing:true})
    expect(result.nodes.some(n=>n.id==='broker')).toBe(true)
    expect(result.nodes.some(n=>n.id==='worker')).toBe(true)
  })

  it('adds evidence index for RAG', () => {
    const result = generateArchitecture({...defaultArchitectureRequirements, ai:'rag'})
    expect(result.nodes.some(n=>n.id==='knowledge')).toBe(true)
  })

  it('adds immutable audit evidence for high audit', () => {
    const result = generateArchitecture({...defaultArchitectureRequirements, auditLevel:'high'})
    expect(result.nodes.some(n=>n.id==='audit')).toBe(true)
  })
  it('deterministically infers structured requirements from free text', () => {
    const input = 'Build a multi-tenant Node.js SaaS with SSO, queues, PostgreSQL, RAG and high availability'
    const first = inferRequirementsFromText(input)
    const second = inferRequirementsFromText(input)
    expect(second).toEqual(first)
    expect(first.backendPreference).toBe('node')
    expect(first.tenancy).toBe('multi')
    expect(first.auth).toBe('enterprise')
    expect(first.asyncProcessing).toBe(true)
    expect(first.ai).toBe('rag')
    expect(first.availability).toBe('high')
  })
})
