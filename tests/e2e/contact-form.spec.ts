import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('should validate required fields', async ({ page }) => {
    // Try to submit empty form
    await page.click('button[type="submit"]')
    
    // Should show validation errors
    await expect(page.getByText('El nombre debe tener al menos 2 caracteres')).toBeVisible()
    await expect(page.getByText('Ingresa un email válido')).toBeVisible()
    await expect(page.getByText('El mensaje debe tener al menos 10 caracteres')).toBeVisible()
  })

  test('should validate email format', async ({ page }) => {
    await page.fill('input[name="name"]', 'Juan Pérez')
    await page.fill('input[name="email"]', 'invalid-email')
    await page.fill('textarea[name="message"]', 'Este es un mensaje de prueba')
    
    await page.click('button[type="submit"]')
    
    await expect(page.getByText('Ingresa un email válido')).toBeVisible()
  })

  test('should submit form with valid data', async ({ page }) => {
    await page.fill('input[name="name"]', 'Juan Pérez')
    await page.fill('input[name="email"]', 'juan@ejemplo.com')
    await page.fill('textarea[name="message"]', 'Este es un mensaje de prueba válido')
    
    await page.click('button[type="submit"]')
    
    // Should show success message
    await expect(page.getByText('¡Mensaje enviado!')).toBeVisible()
    
    // Form should be cleared
    await expect(page.locator('input[name="name"]')).toHaveValue('')
    await expect(page.locator('input[name="email"]')).toHaveValue('')
    await expect(page.locator('textarea[name="message"]')).toHaveValue('')
  })

  test('should have accessible form labels', async ({ page }) => {
    await expect(page.locator('label[for="name"]')).toBeVisible()
    await expect(page.locator('label[for="email"]')).toBeVisible()
    await expect(page.locator('label[for="message"]')).toBeVisible()
  })

  test('should have working contact links', async ({ page }) => {
    const emailLink = page.locator('a[href^="mailto:"]')
    const whatsappLink = page.locator('a[href^="https://wa.me/"]')
    
    await expect(emailLink).toHaveAttribute('href', 'mailto:juan@zambrano.dev')
    await expect(whatsappLink).toHaveAttribute('target', '_blank')
  })
})