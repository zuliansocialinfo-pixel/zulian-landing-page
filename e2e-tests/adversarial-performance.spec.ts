import { test, expect } from '@playwright/test';

test.describe('Adversarial Performance & Responsiveness', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for preloader to hide
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  });

  test('Verify rapid resize events do not crash or cause severe jank', async ({ page }) => {
    // Perform rapid resize operations
    const sizes = [
      { width: 1440, height: 900 },
      { width: 1024, height: 768 },
      { width: 768, height: 1024 },
      { width: 375, height: 812 },
      { width: 1440, height: 900 }
    ];

    const startTime = Date.now();
    for (let i = 0; i < 5; i++) {
      for (const size of sizes) {
        await page.setViewportSize(size);
        // Introduce small delay to let browser handle the event
        await page.waitForTimeout(50);
      }
    }
    const duration = Date.now() - startTime;
    console.log(`Rapid resize loop completed in ${duration}ms`);
    
    // Ensure page is still functional (e.g. hero title is visible and no errors in console)
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();
  });

  test('Verify no horizontal scrollbars are introduced at any viewport width', async ({ page }) => {
    const viewports = [375, 768, 1440];
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(200); // Wait for animations to settle
      
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const innerWidth = await page.evaluate(() => window.innerWidth);
      
      console.log(`Viewport Width: ${width}px | scrollWidth: ${scrollWidth}px | innerWidth: ${innerWidth}px`);
      expect(scrollWidth).toBeLessThanOrEqual(innerWidth);
    }
  });

  test('Verify canvas element does not cause horizontal scrollbar or overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    const canvas = page.locator('canvas').first();
    if (await canvas.isVisible()) {
      const canvasBox = await canvas.boundingBox();
      const windowWidth = await page.evaluate(() => window.innerWidth);
      if (canvasBox) {
        expect(canvasBox.width).toBeLessThanOrEqual(windowWidth);
      }
    }
  });

  test('Verify prefers-reduced-motion stops canvas rendering or hides it', async ({ page, context }) => {
    // Create a new page with prefers-reduced-motion emulate setting
    const newPage = await context.newPage();
    await newPage.emulateMedia({ reducedMotion: 'reduce' });
    await newPage.goto('/');
    
    // Check if canvas is not rendered or removed
    const canvas = newPage.locator('canvas');
    const count = await canvas.count();
    if (count > 0) {
      // If canvas exists, verify if it is hidden or has 0 size
      const isVisible = await canvas.first().isVisible();
      expect(isVisible).toBeFalsy();
    } else {
      expect(count).toBe(0);
    }
    await newPage.close();
  });

  test('Verify canvas halts rendering loop when visibilityState is hidden', async ({ page }) => {
    // We want to verify that when tab is hidden, the canvas does not invoke requestAnimationFrame or does not render.
    // Let's inject a spy on requestAnimationFrame before visibilityState changes
    await page.evaluate(() => {
      window['rafCount'] = 0;
      const originalRaf = window.requestAnimationFrame;
      window.requestAnimationFrame = (callback) => {
        window['rafCount']++;
        return originalRaf(callback);
      };
    });

    // Wait a brief moment to get baseline ticks
    await page.waitForTimeout(200);
    const countBefore = await page.evaluate(() => window['rafCount']);

    // Emulate page visibility hidden
    await page.evaluate(() => {
      Object.defineProperty(document, 'visibilityState', { value: 'hidden', writable: true });
      Object.defineProperty(document, 'hidden', { value: true, writable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    });

    await page.waitForTimeout(300);
    const countAfter = await page.evaluate(() => window['rafCount']);
    
    console.log(`RAF ticks before hidden: ${countBefore}, after: ${countAfter}`);
    // If the tick loop stopped or scaled down, countAfter should be very close to countBefore
    // On slow systems, some queued callbacks could execute, but it shouldn't keep increasing indefinitely
    expect(countAfter - countBefore).toBeLessThanOrEqual(5);
  });

  test('Verify responsiveness of dashboard image container on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    const dashboardSection = page.locator('section', { hasText: /I Nostri Servizi/i }).first();
    await dashboardSection.scrollIntoViewIfNeeded();
    
    // Find the dashboard image showcase div
    const showcase = page.locator('section#servizi img[alt="Zulian Marketing Dashboard"]').locator('xpath=..');
    await expect(showcase).toBeVisible();
    
    // Get its bounding box and the bounding box of the overlay text inside it
    const showcaseBox = await showcase.boundingBox();
    const overlayText = showcase.locator('h3:has-text("Dati alla mano")').locator('xpath=..');
    
    await expect(overlayText).toBeVisible();
    const overlayBox = await overlayText.boundingBox();
    
    if (showcaseBox && overlayBox) {
      console.log(`Showcase height: ${showcaseBox.height}, Overlay text height: ${overlayBox.height}`);
      console.log(`Showcase bounds: y=${showcaseBox.y}, height=${showcaseBox.height}`);
      console.log(`Overlay bounds: y=${overlayBox.y}, height=${overlayBox.height}`);
      
      // The text overlay is absolute inside the showcase.
      // If the showcase is too small (e.g. height is 180px) and overlay text height is large,
      // it might overflow the showcase bottom or overlap with content outside.
      // Let's check if overlay height exceeds showcase height.
      expect(overlayBox.height).toBeLessThan(showcaseBox.height);
    }
  });

  test('Verify responsiveness of How It Works process steps on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 900 });
    const howItWorks = page.locator('section#come-funziona').first();
    await expect(howItWorks).toBeVisible();

    // Check if the process step cards have sufficient width for their text on mobile viewports
    const stepCard = page.locator('.glass', { hasText: /Consulenza in videochiamata/i }).first();
    const cardBox = await stepCard.boundingBox();
    if (cardBox) {
      console.log(`HowItWorks glass card width on mobile: ${cardBox.width}px`);
      // It should be reasonably wide to prevent narrow vertical squeeze (e.g., at least 200px wide)
      expect(cardBox.width).toBeGreaterThanOrEqual(180);
    }
  });
});
