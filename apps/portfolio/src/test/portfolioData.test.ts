import { describe, expect, it } from 'vitest'
import { caseStudies } from '@/data/portfolio'

const approvedPublicSlugs = [
  'ey-enterprise-rbac',
  'chevron-platform-modernization',
  'grupo-cosmic-hr',
  'wondernails',
  'zo-media-intelligence'
].sort()

describe('public portfolio data boundary', () => {
  it('contains the approved public case studies only', () => {
    expect(caseStudies.map(item => item.slug).sort()).toEqual(approvedPublicSlugs)
  })

  it('contains the approved public products', () => {
    expect(caseStudies.some(item => item.slug === 'wondernails')).toBe(true)
    expect(caseStudies.some(item => item.slug === 'zo-media-intelligence')).toBe(true)
  })
})
