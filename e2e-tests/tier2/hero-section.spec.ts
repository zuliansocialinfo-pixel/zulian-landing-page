import { test, expect } from '@playwright/test';

test.describe('Hero Section & CTA - Tier 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  });

  test('T2.2.1: Verify Hero headings do not cause horizontal layout overflow on 280px screen', async ({ page }) => {
    await page.setViewportSize({ width: 280, height: 653 });
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(280);
  });

  test('T2.2.2: Verify Hero layout structure and CTA visibility on 4K resolution (3840x2160)', async ({ page }) => {
    await page.setViewportSize({ width: 3840, height: 2160 });
    const cta = page.locator('a:has-text("Prenota una Consulenza"), button:has-text("Prenota una Consulenza")').first();
    await expect(cta).toBeVisible();
    const box = await cta.boundingBox();
    expect(box?.y).toBeLessThan(1500); // Should be in the upper/middle half of a 4K display
  });

  test('T2.2.3: Verify CTA calendar button query parameters match standard schedule settings', async ({ page }) => {
    const cta = page.locator('a:has-text("Prenota una Consulenza"), button:has-text("Prenota una Consulenza")').first();
    const href = await cta.getAttribute('href');
    expect(href).not.toBeNull();
    const url = new URL(href!);
    expect(url.searchParams.get('gv')).toBe('true');
  });

  test('T2.2.4: Verify the CTA button handles double-click or rapid clicks safely', async ({ page }) => {
    const cta = page.locator('a:has-text("Prenota una Consulenza"), button:has-text("Prenota una Consulenza")').first();
    await cta.hover();
    // Verify rapid double click is supported
    await cta.click({ clickCount: 2 });
  });

  test('T2.2.5: Verify Hero CTA button goes out of viewport when user scrolls down to Chi Sono', async ({ page }) => {
    const cta = page.locator('a:has-text("Prenota una Consulenza"), button:has-text("Prenota una Consulenza")').first();
    const chiSono = page.locator('#chi-sono');
    await chiSono.scrollIntoViewIfNeeded();
    
    // Check that the Hero CTA is no longer visible in the current viewport
    const isVisible = await cta.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    });
    expect(isVisible).toBeFalsy();
  });

  test('T2.2.6: Verify the Hero logo displays prominently and meets size requirements (>= 100px)', async ({ page }) => {
    const logo = page.locator('.hero-logo');
    await expect(logo).toBeVisible({ timeout: 10000 });
    
    const box = await logo.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(100);
    expect(box!.height).toBeGreaterThanOrEqual(100);
  });

  test('T2.2.7: Verify the Hero logo animates into view after the preloader completes', async ({ page }) => {
    // Reload page to catch preloader
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeVisible();
    
    const logo = page.locator('.hero-logo');
    // While preloader is active, the Hero logo should be hidden or have opacity 0
    await expect(logo).toBeHidden();
    
    // Wait for preloader to complete and Hero content to fade in
    await expect(preloader).toBeHidden({ timeout: 10000 });
    await expect(logo).toBeVisible({ timeout: 10000 });
  });
});
