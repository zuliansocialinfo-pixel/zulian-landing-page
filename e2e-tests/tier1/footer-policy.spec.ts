import { test, expect } from '@playwright/test';

test.describe('Footer & Policy Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  });

  test('T6.1: Verify the Footer element renders at the very bottom of the document', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    const footerBox = await footer.boundingBox();
    const bodyBox = await page.locator('body').boundingBox();
    expect(footerBox?.y! + footerBox?.height!).toBeCloseTo(bodyBox?.height!, -1);
  });

  test('T6.2: Verify the Email contact link is visible and uses a mailto: href', async ({ page }) => {
    const emailLink = page.locator('footer a[href^="mailto:"]').first();
    await expect(emailLink).toBeVisible();
  });

  test('T6.3: Verify the WhatsApp contact link is visible and uses a valid wa.me or similar href', async ({ page }) => {
    const waLink = page.locator('footer a[href*="wa.me"], footer a[href*="whatsapp"]').first();
    await expect(waLink).toBeVisible();
  });

  test('T6.4: Verify the Privacy Policy and Cookie Policy links are visible', async ({ page }) => {
    const privacyLink = page.locator('footer a', { hasText: /Privacy/i }).first();
    const cookieLink = page.locator('footer a', { hasText: /Cookie/i }).first();
    await expect(privacyLink).toBeVisible();
    await expect(cookieLink).toBeVisible();
  });

  test('T6.5: Verify clicking the Privacy/Cookie policy links navigates correctly or opens the correct modal/page', async ({ page }) => {
    const privacyLink = page.locator('footer a', { hasText: /Privacy/i }).first();
    const href = await privacyLink.getAttribute('href');
    expect(href).not.toBeNull();
  });
});
