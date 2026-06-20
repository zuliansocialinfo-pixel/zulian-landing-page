import { test, expect } from '@playwright/test';

test.describe('Process Section (Come Funziona) - Tier 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  });

  test('T5.2.1: Verify process layout on Galaxy Fold (280px width)', async ({ page }) => {
    await page.setViewportSize({ width: 280, height: 653 });
    const section = page.locator('section#come-funziona');
    await expect(section).toBeVisible();
    
    // Grid/stack shouldn't overflow 280px viewport
    const boundingBox = await section.boundingBox();
    expect(boundingBox?.width).toBeLessThanOrEqual(280);
  });

  test('T5.2.2: Verify process section respects max-width on 4K screen (3840x2160)', async ({ page }) => {
    await page.setViewportSize({ width: 3840, height: 2160 });
    const section = page.locator('section#come-funziona');
    await expect(section).toBeVisible();
    
    const container = section.locator('.container');
    const width = await container.evaluate((el) => el.clientWidth);
    expect(width).toBeLessThanOrEqual(1280);
  });

  test('T5.2.3: Verify process steps are sequential (1 to 4) using step-number class content', async ({ page }) => {
    const section = page.locator('section#come-funziona');
    const stepNumbers = section.locator('span.step-number');
    const count = await stepNumbers.count();
    
    // There are 4 steps, but each step card has 2 span.step-number elements (one transparent and one in h3)
    // Let's verify that we can extract the sequence 1, 2, 3, 4
    const uniqueNumbers = new Set<string>();
    for (let i = 0; i < count; i++) {
      const text = await stepNumbers.nth(i).textContent();
      if (text) {
        uniqueNumbers.add(text.trim());
      }
    }
    
    expect(uniqueNumbers.has('1')).toBeTruthy();
    expect(uniqueNumbers.has('2')).toBeTruthy();
    expect(uniqueNumbers.has('3')).toBeTruthy();
    expect(uniqueNumbers.has('4')).toBeTruthy();
  });

  test('T5.2.4: Verify process section animation under reduced motion does not throw errors', async ({ page }) => {
    await page.emulateMedia({ reduceMotion: 'reduce' });
    await page.goto('/');
    
    const section = page.locator('section#come-funziona');
    await expect(section).toBeVisible();
    
    // Scroll to section triggers animation. Under reduced motion, it should proceed normally
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const opacity = await section.evaluate((el) => window.getComputedStyle(el).opacity);
    expect(Number(opacity)).toBeGreaterThan(0);
  });

  test('T5.2.5: Verify process step boxes have sufficient height and readable font sizes', async ({ page }) => {
    const firstStep = page.locator('section#come-funziona .glass').first();
    await expect(firstStep).toBeVisible();
    
    const box = await firstStep.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(100);
    
    const fontSize = await firstStep.locator('h3').first().evaluate((el) => window.getComputedStyle(el).fontSize);
    expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(14); // Readable heading size
  });
});
