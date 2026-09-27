import { expect, test } from '@playwright/test'

test('home is recruiter-first', async ({page}) => {
  await page.goto('/')
  await expect(page.getByRole('heading',{name:'Senior Software Engineer'})).toBeVisible()
  await expect(page.getByText('.NET, Node.js, Distributed Systems & Applied AI')).toBeVisible()
  await expect(page.getByRole('link',{name:/View Case Studies/i})).toBeVisible()
  await expect(page.getByRole('link',{name:/Download CV/i})).toBeVisible()
})

test('case studies expose public products', async ({page}) => {
  await page.goto('/case-studies')
  await expect(page.getByRole('heading',{name:'Case Studies'})).toBeVisible()
  await expect(page.getByText('Wondernails — Multi-tenant SaaS')).toBeVisible()
  await expect(page.getByText('Zo Media Intelligence')).toBeVisible()
})

test('technical arsenal supports .NET and Node evidence', async ({page}) => {
  await page.goto('/technical-arsenal')
  await expect(page.getByText('.NET / C#',{exact:true}).first()).toBeVisible()
  await expect(page.getByText('Node.js / NestJS',{exact:true}).first()).toBeVisible()
})

test('architecture lab is deterministic across same selections', async ({page}) => {
  await page.goto('/architecture-lab')
  const hashes = page.getByText(/hash:/)
  const first = await hashes.first().textContent()
  await page.getByLabel('Backend preference').selectOption('node')
  await page.getByLabel('Backend preference').selectOption('dotnet')
  await expect(hashes.first()).toHaveText(first ?? '')
})

test('legacy routes redirect', async ({page}) => {
  await page.goto('/projects')
  await expect(page).toHaveURL(/\/case-studies$/)
  await page.goto('/skills')
  await expect(page).toHaveURL(/\/technical-arsenal$/)
})

test('resume endpoint is reachable', async ({request}) => {
  const response = await request.get('/cv/JuanZambrano_ATS_Final.pdf')
  expect(response.ok()).toBeTruthy()
})
