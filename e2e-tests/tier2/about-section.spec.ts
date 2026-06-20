import { test, expect } from '@playwright/test';

test.describe('About Section (Chi Sono) - Tier 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  });

  test('T3.2.1: Verify Chi Sono section layout on Galaxy Fold (280px width)', async ({ page }) => {
    await page.setViewportSize({ width: 280, height: 653 });
    const section = page.locator('#chi-sono');
    await expect(section).toBeVisible();
    
    // Check that the parent grid/flex container wraps elements correctly
    const container = section.locator('.container');
    const width = await container.evaluate((el) => el.clientWidth);
    expect(width).toBeLessThanOrEqual(280);
  });

  test('T3.2.2: Verify Chi Sono section layout on 4K resolution (3840x2160)', async ({ page }) => {
    await page.setViewportSize({ width: 3840, height: 2160 });
    const section = page.locator('#chi-sono');
    await expect(section).toBeVisible();
    
    // Verify that the card does not expand to cover the whole screen width (should respect max-width container)
    const container = section.locator('.container');
    const width = await container.evaluate((el) => el.clientWidth);
    expect(width).toBeLessThanOrEqual(1280); // max-width container should clamp it
  });

  test('T3.2.3: Verify the biography profile image source returns 200 OK status', async ({ page }) => {
    const img = page.locator('#chi-sono img').first();
    await expect(img).toBeVisible();
    
    const imgSrc = await img.getAttribute('src');
    expect(imgSrc).not.toBeNull();
    
    // Verify the URL resolves correctly
    const response = await page.request.get(imgSrc!);
    expect(response.status()).toBe(200);
  });

  test('T3.2.4: Verify the glassmorphism card has correct CSS backdrop-filter styling for premium UI contrast', async ({ page }) => {
    const glassCard = page.locator('#chi-sono .glass').first();
    await expect(glassCard).toBeVisible();
    
    const backdropFilter = await glassCard.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.backdropFilter || style.webkitBackdropFilter;
    });
    expect(backdropFilter).toContain('blur');
  });

  test('T3.2.5: Verify no horizontal scrollbar is triggered when biography card is hovered or resized', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const glassCard = page.locator('#chi-sono .glass').first();
    await glassCard.hover();
    
    const hasScrollbar = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasScrollbar).toBeFalsy();
  });
});
