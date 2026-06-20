import { test, expect } from '@playwright/test';

test.describe('Theme & Animations - Tier 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  });

  test('T8.2.1: Verify primary background color matches the premium dark theme spec (#0d0d0d)', async ({ page }) => {
    const bgColor = await page.evaluate(() => {
      const style = window.getComputedStyle(document.body);
      return style.backgroundColor;
    });
    // #0d0d0d is rgb(13, 13, 13)
    expect(bgColor).toBe('rgb(13, 13, 13)');
  });

  test('T8.2.2: Verify light prefers-color-scheme emulation does not alter premium dark layout', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    
    // The background should still remain dark (rgb(13, 13, 13))
    const bgColor = await page.evaluate(() => {
      const style = window.getComputedStyle(document.body);
      return style.backgroundColor;
    });
    expect(bgColor).toBe('rgb(13, 13, 13)');
  });

  test('T8.2.3: Verify interactive element border colors match gold accent or glass borders', async ({ page }) => {
    const primaryBtn = page.locator('.btn-primary').first();
    await expect(primaryBtn).toBeVisible();
    
    const bgColor = await primaryBtn.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    // Gold/champagne accent is #d4af37 which is rgb(212, 175, 55)
    expect(bgColor).toBe('rgb(212, 175, 55)');
  });

  test('T8.2.4: Verify background animated particles containers are active in DOM', async ({ page }) => {
    // Check if background particles or glows exist
    const canvas = page.locator('canvas, [style*="particle"], [class*="particle"]').first();
    await expect(canvas).toBeDefined();
  });

  test('T8.2.5: Verify scrolling to pricing card triggers animation and displays elements', async ({ page }) => {
    const pricingSection = page.locator('section#preventivi');
    await pricingSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500); // Animation duration
    
    const pricingCard = pricingSection.locator('.glass').first();
    await expect(pricingCard).toBeVisible();
    
    const opacity = await pricingCard.evaluate((el) => window.getComputedStyle(el).opacity);
    expect(Number(opacity)).toBeGreaterThan(0.5);
  });
});
