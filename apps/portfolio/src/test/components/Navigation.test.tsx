import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Navigation } from '@/components/Navigation'

// Mock the i18n hook
vi.mock('@/hooks/useI18n', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'nav.projects': 'Projects',
        'nav.skills': 'Skills',
        'nav.experience': 'Experience',
        'nav.contact': 'Contact',
        'social.github': 'GitHub',
        'social.linkedin': 'LinkedIn',
        'social.phone': 'Phone',
        'social.email': 'Email',
      }
      return translations[key] || key
    },
    language: 'en',
  }),
}))

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    })),
    set: vi.fn(),
    to: vi.fn(),
    context: vi.fn((callback) => {
      callback()
      return { revert: vi.fn() }
    }),
  },
}))

// Mock three.js ray renderer
vi.mock('@/lib/three', () => ({
  getRayRenderer: vi.fn(() => ({
    rayTo: vi.fn(),
  })),
}))

// Mock utils
vi.mock('@/lib/utils', () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
  getReducedMotionPreference: vi.fn(() => false),
}))

const renderNavigation = () => {
  return render(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  )
}

describe('Navigation Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all navigation menu items', () => {
    renderNavigation()

    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders social links', () => {
    renderNavigation()

    // Check for social links by aria-label
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('has correct social media URLs', () => {
    renderNavigation()

    const githubLink = screen.getByLabelText('GitHub')
    const linkedinLink = screen.getByLabelText('LinkedIn')

    expect(githubLink).toHaveAttribute('href', 'https://github.com/jagzao')
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/jagzao/')
  })

  it('social links open in new tab', () => {
    renderNavigation()

    const githubLink = screen.getByLabelText('GitHub')

    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('menu items have correct paths', () => {
    renderNavigation()

    const projectsLink = screen.getByText('Projects').closest('a')
    const skillsLink = screen.getByText('Skills').closest('a')
    const experienceLink = screen.getByText('Experience').closest('a')
    const contactLink = screen.getByText('Contact').closest('a')

    expect(projectsLink).toHaveAttribute('href', '/projects')
    expect(skillsLink).toHaveAttribute('href', '/skills')
    expect(experienceLink).toHaveAttribute('href', '/experience')
    expect(contactLink).toHaveAttribute('href', '/contact')
  })

  it('applies hidden class for mobile breakpoint', () => {
    const { container } = renderNavigation()

    // Navigation should have hidden sm:block classes
    const nav = container.querySelector('.hidden.sm\\:block')
    expect(nav).toBeInTheDocument()
  })

  it('menu items are keyboard accessible', () => {
    renderNavigation()

    const projectsLink = screen.getByText('Projects').closest('a')

    // Should be focusable
    expect(projectsLink).toHaveAttribute('href')

    // Simulate keyboard navigation
    projectsLink?.focus()
    expect(document.activeElement).toBe(projectsLink)
  })

  it('has proper ARIA labels for accessibility', () => {
    renderNavigation()

    // Social links should have aria-label
    const socialLinks = [
      screen.getByLabelText('GitHub'),
      screen.getByLabelText('LinkedIn'),
      screen.getByLabelText('Phone'),
      screen.getByLabelText('Email'),
    ]

    socialLinks.forEach(link => {
      expect(link).toBeInTheDocument()
    })
  })

  it('menu items have data-menu-id attributes', () => {
    renderNavigation()

    const projectsLink = screen.getByText('Projects').closest('a')
    expect(projectsLink).toHaveAttribute('data-menu-id', 'projects')
  })

  it('handles mouse events on menu items', () => {
    renderNavigation()

    const projectsLink = screen.getByText('Projects').closest('a')

    // Should not throw when hovering
    expect(() => {
      if (projectsLink) {
        fireEvent.mouseEnter(projectsLink)
        fireEvent.mouseLeave(projectsLink)
      }
    }).not.toThrow()
  })
})
