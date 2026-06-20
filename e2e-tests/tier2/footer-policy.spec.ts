import { test, expect } from '@playwright/test';

test.describe('Footer & Policy Links - Tier 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  });

  test('T6.2.1: Verify footer layout does not break on Galaxy Fold (280px width)', async ({ page }) => {
    await page.setViewportSize({ width: 280, height: 653 });
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    const box = await footer.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(280);
  });

  test('T6.2.2: Verify footer layout constraints on 4K screen (3840x2160)', async ({ page }) => {
    await page.setViewportSize({ width: 3840, height: 2160 });
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    const container = footer.locator('.container');
    const width = await container.evaluate((el) => el.clientWidth);
    expect(width).toBeLessThanOrEqual(1280);
  });

  test('T6.2.3: Verify Privacy Policy and Cookie Policy links have valid anchors or paths', async ({ page }) => {
    const footer = page.locator('footer');
    const privacy = footer.locator('a', { hasText: /Privacy/i }).first();
    const cookie = footer.locator('a', { hasText: /Cookie/i }).first();
    
    const privacyHref = await privacy.getAttribute('href');
    const cookieHref = await cookie.getAttribute('href');
    
    expect(privacyHref).not.toBeNull();
    expect(cookieHref).not.toBeNull();
    expect(privacyHref?.length).toBeGreaterThan(0);
    expect(cookieHref?.length).toBeGreaterThan(0);
  });

  test('T6.2.4: Verify WhatsApp contact link uses HTTPS and targets wa.me domain', async ({ page }) => {
    const footer = page.locator('footer');
    const waLink = footer.locator('a[href*="wa.me"]').first();
    await expect(waLink).toBeVisible();
    
    const href = await waLink.getAttribute('href');
    expect(href).not.toBeNull();
    expect(href?.startsWith('https://wa.me/')).toBeTruthy();
  });

  test('T6.2.5: Verify email link uses mailto schema targeting correct domain', async ({ page }) => {
    const footer = page.locator('footer');
    const emailLink = footer.locator('a[href^="mailto:"]').first();
    await expect(emailLink).toBeVisible();
    
    const href = await emailLink.getAttribute('href');
    expect(href).not.toBeNull();
    expect(href?.startsWith('mailto:zuliansocial.info@gmail.com')).toBeTruthy();
  });
});
