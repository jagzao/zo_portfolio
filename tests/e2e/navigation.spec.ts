import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should navigate to all main pages', async ({ page }) => {
    // Test home page loads
    await expect(page.getByRole('heading', { name: /Juan German/i })).toBeVisible()
    
    // Test navigation to Projects
    await page.click('text=Proyectos')
    await expect(page).toHaveURL('/projects')
    await expect(page.getByRole('heading', { name: /Mis Proyectos/i })).toBeVisible()
    
    // Test navigation to Experience
    await page.click('text=Experiencia')
    await expect(page).toHaveURL('/experience')
    await expect(page.getByRole('heading', { name: /Mi Experiencia/i })).toBeVisible()
    
    // Test navigation to Skills
    await page.click('text=Skills')
    await expect(page).toHaveURL('/skills')
    await expect(page.getByRole('heading', { name: /Mis Skills/i })).toBeVisible()
    
    // Test navigation to Contact
    await page.click('text=Contacto')
    await expect(page).toHaveURL('/contact')
    await expect(page.getByRole('heading', { name: /Trabajemos Juntos/i })).toBeVisible()
  })

  test('should show 404 page for invalid routes', async ({ page }) => {
    await page.goto('/invalid-route')
    await expect(page.getByText('404')).toBeVisible()
    await expect(page.getByText('Página no encontrada')).toBeVisible()
    
    // Test back to home button
    await page.click('text=Volver al inicio')
    await expect(page).toHaveURL('/')
  })

  test('should have working social links', async ({ page }) => {
    const githubLink = page.locator('a[href*="github.com"]').first()
    const linkedinLink = page.locator('a[href*="linkedin.com"]').first()
    
    await expect(githubLink).toHaveAttribute('target', '_blank')
    await expect(linkedinLink).toHaveAttribute('target', '_blank')
  })
})