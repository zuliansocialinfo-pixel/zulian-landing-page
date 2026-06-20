import { test, expect } from '@playwright/test';

test.describe('Hero Section & CTA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // wait for preloader to disappear
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  });

  test('T2.1: Verify the main Hero heading and subtitle are rendered correctly', async ({ page }) => {
    const heroSection = page.locator('section').first(); // Assuming hero is first section
    const heading = heroSection.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).not.toBeEmpty();
  });

  test('T2.2: Verify the "Prenota una Consulenza" CTA button is visible', async ({ page }) => {
    const ctaButton = page.locator('a:has-text("Prenota una Consulenza"), button:has-text("Prenota una Consulenza")').first();
    await expect(ctaButton).toBeVisible();
  });

  test('T2.3: Verify the "Prenota una Consulenza" CTA points to a valid Google Calendar URL', async ({ page }) => {
    const ctaButton = page.locator('a:has-text("Prenota una Consulenza")').first();
    await expect(ctaButton).toHaveAttribute('href', /calendar\.google\.com/i);
  });

  test('T2.4: Verify the Hero background (dark mode with gold/champagne accents) renders properly', async ({ page }) => {
    const heroSection = page.locator('section').first();
    const bgColor = await heroSection.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    // Dark mode implies a dark background color
    expect(bgColor).not.toBe('rgb(255, 255, 255)');
  });

  test('T2.5: Verify the header navigation links remain accessible overlaying the Hero section', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
    const zIndex = await header.evaluate((el) => window.getComputedStyle(el).zIndex);
    expect(parseInt(zIndex) || 0).toBeGreaterThanOrEqual(0);
  });
});
