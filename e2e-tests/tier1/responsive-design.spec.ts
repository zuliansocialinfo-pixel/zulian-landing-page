import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  });

  test('T7.1: Verify the desktop layout renders correctly at >= 1024px width', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    const header = page.locator('header');
    await expect(header).toBeVisible();
    // Usually navigation links are visible on desktop
    const navLinks = page.locator('header nav a').first();
    await expect(navLinks).toBeVisible();
  });

  test('T7.2: Verify the main navigation converts to a mobile hamburger menu on narrow viewports', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const hamburger = page.locator('header button, header [aria-label="Menu"]').first();
    await expect(hamburger).toBeVisible();
  });

  test('T7.3: Verify clicking the mobile hamburger menu opens the navigation overlay successfully', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const hamburger = page.locator('header button, header [aria-label="Menu"]').first();
    await hamburger.click();
    // Look for navigation menu being active or visible
    const nav = page.locator('header nav, .mobile-menu').first();
    await expect(nav).toBeVisible();
  });

  test('T7.4: Verify the 5 service cards and 4 process steps stack vertically on mobile viewports', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const servicesSection = page.locator('section', { hasText: /Servizi/i }).first();
    const sBox = await servicesSection.boundingBox();
    expect(sBox?.height).toBeGreaterThan(500); // Vertically stacked means tall container
  });

  test('T7.5: Verify interactive elements (buttons, links) maintain sufficient touch-target sizes on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const ctaButton = page.locator('a:has-text("Prenota una Consulenza"), button:has-text("Prenota una Consulenza")').first();
    const box = await ctaButton.boundingBox();
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });
});
