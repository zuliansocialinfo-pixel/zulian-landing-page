import { test, expect } from '@playwright/test';

test.describe('Responsive Design - Tier 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  });

  test('T7.2.1: Verify responsive header menu behaves on 280px screen width', async ({ page }) => {
    await page.setViewportSize({ width: 280, height: 653 });
    const hamburger = page.locator('header button, header [aria-label="Menu"]').first();
    await expect(hamburger).toBeVisible();
    
    // Header should fit within 280px width
    const header = page.locator('header');
    const box = await header.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(280);
  });

  test('T7.2.2: Verify mobile menu overlay shows on click and hides when clicked again', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const hamburger = page.locator('header button, header [aria-label="Menu"]').first();
    await expect(hamburger).toBeVisible();
    
    // Toggle open
    await hamburger.click();
    const navOverlay = page.locator('header nav, .mobile-menu').first();
    await expect(navOverlay).toBeVisible();
    
    // Toggle close
    await hamburger.click();
    await expect(navOverlay).toBeHidden();
  });

  test('T7.2.3: Verify clicking a navigation overlay link automatically closes the mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const hamburger = page.locator('header button, header [aria-label="Menu"]').first();
    await hamburger.click();
    
    const navOverlay = page.locator('header nav, .mobile-menu').first();
    await expect(navOverlay).toBeVisible();
    
    // Click on "Chi Sono"
    const link = navOverlay.locator('a[href="#chi-sono"]').first();
    await link.click();
    
    // Overlay should automatically close
    await expect(navOverlay).toBeHidden();
  });

  test('T7.2.4: Verify services cards stack vertically on extremely narrow devices (280px width)', async ({ page }) => {
    await page.setViewportSize({ width: 280, height: 653 });
    const section = page.locator('section#servizi');
    const sBox = await section.boundingBox();
    expect(sBox?.height).toBeGreaterThan(1000); // Stacking means very high combined height
  });

  test('T7.2.5: Verify responsive font size scaling for primary headings (h1, h2) between desktop and mobile', async ({ page }) => {
    // Desktop size check
    await page.setViewportSize({ width: 1440, height: 900 });
    const heading = page.locator('h1').first();
    const desktopSize = await heading.evaluate((el) => window.getComputedStyle(el).fontSize);
    
    // Mobile size check
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileSize = await heading.evaluate((el) => window.getComputedStyle(el).fontSize);
    
    expect(parseFloat(mobileSize)).toBeLessThan(parseFloat(desktopSize));
  });
});
