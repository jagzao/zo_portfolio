import { render, screen, fireEvent } from '@testing-library/react'
import { AnimatedLogo } from '@/components/AnimatedLogo'

describe('AnimatedLogo', () => {
  it('renders the logo with default size', () => {
    render(<AnimatedLogo />)
    
    const logoContainer = document.querySelector('.logo-container')
    expect(logoContainer).toBeInTheDocument()
  })
  
  it('renders with custom size', () => {
    const customSize = 200
    render(<AnimatedLogo size={customSize} />)
    
    // The logo should be rendered with correct dimensions
    const logoContainer = document.querySelector('.logo-container')
    expect(logoContainer).toBeInTheDocument()
  })
  
  it('shows photo when showPhoto is true', () => {
    render(<AnimatedLogo showPhoto={true} />)
    
    // Check if photo element exists in DOM
    const photoElement = document.querySelector('.logo-photo')
    expect(photoElement).toBeInTheDocument()
  })
  
  it('hides photo when showPhoto is false', () => {
    render(<AnimatedLogo showPhoto={false} />)
    
    // Check if photo element doesn't exist
    const photoElement = document.querySelector('.logo-photo')
    expect(photoElement).not.toBeInTheDocument()
  })
  
  it('should have red glow effect with data-logo-glow attribute', () => {
    render(<AnimatedLogo />)
    
    const glowElement = document.querySelector('[data-logo-glow="true"]')
    expect(glowElement).toBeInTheDocument()
    
    // Verify red glow styling
    expect(glowElement).toHaveStyle('filter: drop-shadow(0 0 15px rgba(255, 59, 59, 0.3))')
  })
  
  it('should have photo visible attribute when showing photo on hover', () => {
    render(<AnimatedLogo showPhoto={true} />)
    
    const photoElement = document.querySelector('[data-photo-visible="false"]')
    expect(photoElement).toBeInTheDocument()
  })
})