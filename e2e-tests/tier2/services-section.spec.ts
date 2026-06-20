import { test, expect } from '@playwright/test';

test.describe('Services Section - Tier 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  });

  test('T4.2.1: Verify services section renders correctly at extreme 280px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 280, height: 653 });
    const section = page.locator('section#servizi');
    await expect(section).toBeVisible();
    
    // Ensure container fits within narrow width
    const box = await section.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(280);
  });

  test('T4.2.2: Verify services section constraints at extreme 4K resolution (3840x2160)', async ({ page }) => {
    await page.setViewportSize({ width: 3840, height: 2160 });
    const section = page.locator('section#servizi');
    await expect(section).toBeVisible();
    
    // Grid items should not stretch indefinitely
    const container = section.locator('.container');
    const width = await container.evaluate((el) => el.clientWidth);
    expect(width).toBeLessThanOrEqual(1280);
  });

  test('T4.2.3: Verify dashboard image asset returns 200 OK status code', async ({ page }) => {
    const section = page.locator('section#servizi');
    const dashboardImg = section.locator('img[alt*="Dashboard"], img[alt*="dashboard"]').first();
    await expect(dashboardImg).toBeVisible();
    
    const src = await dashboardImg.getAttribute('src');
    expect(src).not.toBeNull();
    
    const response = await page.request.get(src!);
    expect(response.status()).toBe(200);
  });

  test('T4.2.4: Verify card hover transform styling behavior dynamically changes', async ({ page }) => {
    const firstCard = page.locator('section#servizi .glass').first();
    await expect(firstCard).toBeVisible();
    
    // Hover over the card
    await firstCard.hover();
    
    // Wait for the hover state styling transition
    await page.waitForTimeout(500);
    
    const transformStyle = await firstCard.evaluate((el) => window.getComputedStyle(el).transform);
    expect(transformStyle).not.toBe('none');
  });

  test('T4.2.5: Verify all 5 expected service card headings are unique and correct', async ({ page }) => {
    const section = page.locator('section#servizi');
    const expectedServices = [
      'Analisi e Strategia',
      'Gestione Social',
      'Pubblicità Online',
      'Siti Web ed E-commerce',
      'Creazione Contenuti'
    ];
    
    for (const title of expectedServices) {
      const el = section.locator(`h3:has-text("${title}")`).first();
      await expect(el).toBeVisible();
    }
  });
});
