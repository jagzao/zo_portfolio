import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useI18n, useTranslation } from '@/hooks/useI18n'

describe('useI18n Hook', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('returns default language as "en"', () => {
    const { result } = renderHook(() => useI18n())

    expect(result.current.language).toBe('en')
  })

  it('changes language to Spanish', () => {
    const { result } = renderHook(() => useI18n())

    act(() => {
      result.current.setLanguage('es')
    })

    expect(result.current.language).toBe('es')
  })

  it('changes language to English', () => {
    const { result } = renderHook(() => useI18n())

    // First set to Spanish
    act(() => {
      result.current.setLanguage('es')
    })

    expect(result.current.language).toBe('es')

    // Then change back to English
    act(() => {
      result.current.setLanguage('en')
    })

    expect(result.current.language).toBe('en')
  })

  it('persists language preference in localStorage', () => {
    const { result } = renderHook(() => useI18n())

    act(() => {
      result.current.setLanguage('es')
    })

    // Check localStorage
    const stored = localStorage.getItem('portfolio-language')
    expect(stored).toBeTruthy()

    const parsed = JSON.parse(stored!)
    expect(parsed.state.language).toBe('es')
  })

  it('loads persisted language from localStorage', () => {
    // Set language in localStorage
    localStorage.setItem(
      'portfolio-language',
      JSON.stringify({ state: { language: 'es' }, version: 0 })
    )

    const { result } = renderHook(() => useI18n())

    expect(result.current.language).toBe('es')
  })

  it('handles multiple language switches', () => {
    const { result } = renderHook(() => useI18n())

    act(() => {
      result.current.setLanguage('es')
    })
    expect(result.current.language).toBe('es')

    act(() => {
      result.current.setLanguage('en')
    })
    expect(result.current.language).toBe('en')

    act(() => {
      result.current.setLanguage('es')
    })
    expect(result.current.language).toBe('es')
  })
})

describe('useTranslation Hook', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns translation function and language', () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.t).toBeTypeOf('function')
    expect(result.current.language).toBe('en')
  })

  it('translates English keys correctly', () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.t('hero.title')).toBe('Juan German Zambrano Ortega')
    expect(result.current.t('nav.projects')).toBe('Projects')
    expect(result.current.t('nav.skills')).toBe('Skills')
    expect(result.current.t('nav.experience')).toBe('Experience')
    expect(result.current.t('nav.contact')).toBe('Contact')
  })

  it('translates Spanish keys correctly', () => {
    const { result: i18nResult } = renderHook(() => useI18n())

    act(() => {
      i18nResult.current.setLanguage('es')
    })

    const { result } = renderHook(() => useTranslation())

    expect(result.current.t('nav.projects')).toBe('Proyectos')
    expect(result.current.t('nav.skills')).toBe('Habilidades')
    expect(result.current.t('nav.experience')).toBe('Experiencia')
    expect(result.current.t('nav.contact')).toBe('Contacto')
  })

  it('returns key when translation not found', () => {
    const { result } = renderHook(() => useTranslation())

    const unknownKey = 'unknown.key'
    expect(result.current.t(unknownKey)).toBe(unknownKey)
  })

  it('handles missing translations gracefully', () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.t('this.does.not.exist')).toBe('this.does.not.exist')
  })

  it('updates translations when language changes', () => {
    const { result: i18nResult } = renderHook(() => useI18n())
    const { result, rerender } = renderHook(() => useTranslation())

    // Initially English
    expect(result.current.t('nav.projects')).toBe('Projects')

    // Change to Spanish
    act(() => {
      i18nResult.current.setLanguage('es')
    })

    rerender()

    // Should now be Spanish
    expect(result.current.t('nav.projects')).toBe('Proyectos')
  })

  it('translates CTA messages correctly', () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.t('cta.contact')).toBe('Contact')
    expect(result.current.t('cta.download')).toBe('Download CV')
  })

  it('translates contact form validation messages', () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.t('contact.validation.name.min')).toBe('Name must be at least 2 characters')
    expect(result.current.t('contact.validation.email.invalid')).toBe('Please enter a valid email')
    expect(result.current.t('contact.validation.message.min')).toBe('Message must be at least 10 characters')
  })

  it('translates error messages in Spanish', () => {
    const { result: i18nResult } = renderHook(() => useI18n())

    act(() => {
      i18nResult.current.setLanguage('es')
    })

    const { result } = renderHook(() => useTranslation())

    expect(result.current.t('contact.validation.name.min')).toBe('El nombre debe tener al menos 2 caracteres')
    expect(result.current.t('contact.validation.email.invalid')).toBe('Ingresa un email válido')
  })

  it('has consistent key structure', () => {
    const { result } = renderHook(() => useTranslation())

    // Navigation keys
    expect(result.current.t('nav.projects')).toBeTruthy()
    expect(result.current.t('nav.skills')).toBeTruthy()
    expect(result.current.t('nav.experience')).toBeTruthy()
    expect(result.current.t('nav.contact')).toBeTruthy()

    // Social keys
    expect(result.current.t('social.github')).toBeTruthy()
    expect(result.current.t('social.linkedin')).toBeTruthy()

    // Contact keys
    expect(result.current.t('contact.title')).toBeTruthy()
    expect(result.current.t('contact.description')).toBeTruthy()
  })

  it('handles hero section translations', () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.t('hero.title')).toBeTruthy()
    expect(result.current.t('hero.subtitle')).toBeTruthy()
    expect(result.current.t('hero.description')).toBeTruthy()
  })
})
