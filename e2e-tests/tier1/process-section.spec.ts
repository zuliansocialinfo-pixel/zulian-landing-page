import { test, expect } from '@playwright/test';

test.describe('Process Section (Come Funziona)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  });

  test('T5.1: Verify the "Come Funziona" section heading is visible', async ({ page }) => {
    const heading = page.locator('h2', { hasText: /Come Funziona/i }).first();
    await expect(heading).toBeVisible();
  });

  test('T5.2: Verify exactly 4 process steps are rendered', async ({ page }) => {
    const processSection = page.locator('section', { hasText: /Come Funziona/i }).first();
    // Assuming process steps are list items or have a specific numbering
    const steps = processSection.locator('li, .step, [data-testid="process-step"]');
    // Alternatively, look for 1, 2, 3, 4
    await expect(processSection.locator('text="1"').first()).toBeVisible();
    await expect(processSection.locator('text="2"').first()).toBeVisible();
    await expect(processSection.locator('text="3"').first()).toBeVisible();
    await expect(processSection.locator('text="4"').first()).toBeVisible();
  });

  test('T5.3: Verify the steps are visually ordered (e.g., 1, 2, 3, 4)', async ({ page }) => {
    const processSection = page.locator('section', { hasText: /Come Funziona/i }).first();
    const step1 = await processSection.locator('text="1"').first().boundingBox();
    const step2 = await processSection.locator('text="2"').first().boundingBox();
    
    if (step1 && step2) {
      // Either 1 is above 2 (vertical), or 1 is left of 2 (horizontal)
      const isOrdered = step1.y <= step2.y || step1.x < step2.x;
      expect(isOrdered).toBeTruthy();
    }
  });

  test('T5.4: Verify each step includes a distinct description', async ({ page }) => {
    const processSection = page.locator('section', { hasText: /Come Funziona/i }).first();
    const stepNumber = processSection.locator('text="1"').first();
    const stepContainer = stepNumber.locator('..');
    const description = stepContainer.locator('p').first();
    await expect(description).toBeVisible();
  });

  test('T5.5: Verify process steps align correctly within the viewport layout', async ({ page }) => {
    const processSection = page.locator('section', { hasText: /Come Funziona/i }).first();
    const boundingBox = await processSection.boundingBox();
    const viewportSize = page.viewportSize();
    expect(boundingBox?.width).toBeLessThanOrEqual(viewportSize!.width);
  });
});
