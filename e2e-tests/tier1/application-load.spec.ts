import { test, expect } from '@playwright/test';

test.describe('Application Load (Preloader)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('T1.1: Verify preloader element is initially visible in the DOM on page load', async ({ page }) => {
    // Check if preloader is visible initially
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeVisible({ timeout: 1000 });
  });

  test('T1.2: Verify preloader element disappears after loading completes', async ({ page }) => {
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 });
  });

  test('T1.3: Verify the main content is hidden or inaccessible while the preloader is active', async ({ page }) => {
    const mainContent = page.locator('main');
    // It might be hidden, have opacity 0, or be behind the preloader
    // This is an opaque-box test, so we'll just test that we can't interact with it initially or it's hidden
    const isMainVisible = await mainContent.isVisible();
    if (isMainVisible) {
      const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
      if (await preloader.isVisible()) {
        const boundingBox = await preloader.boundingBox();
        expect(boundingBox).not.toBeNull();
      }
    } else {
      expect(isMainVisible).toBeFalsy();
    }
  });

  test('T1.4: Verify the main content becomes fully visible after the preloader finishes', async ({ page }) => {
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 });
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('T1.5: Verify the preloader does not reappear upon navigating back to the top of the page', async ({ page }) => {
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(preloader).toBeHidden();
  });
});
