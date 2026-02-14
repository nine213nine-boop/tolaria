import { test } from '@playwright/test'

test('capture app screenshot for review', async ({ page }) => {
  await page.goto('/')
  // Wait for mock data to load
  await page.waitForTimeout(500)
  await page.screenshot({ path: 'test-results/app-screenshot.png', fullPage: true })
})
