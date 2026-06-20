import { test, expect } from '@playwright/test';

test.describe('Video Presentation (VideoShowcase) - Tier 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  });

  test('T9.2.1: Verify Video Showcase section layout on Galaxy Fold (280px width)', async ({ page }) => {
    await page.setViewportSize({ width: 280, height: 653 });
    const section = page.locator('section#video-showcase');
    await expect(section).toBeVisible();
    
    // Grid/stack shouldn't overflow 280px viewport
    const boundingBox = await section.boundingBox();
    expect(boundingBox?.width).toBeLessThanOrEqual(280);
  });

  test('T9.2.2: Verify Video Showcase section respects max-width on 4K screen (3840x2160)', async ({ page }) => {
    await page.setViewportSize({ width: 3840, height: 2160 });
    const section = page.locator('section#video-showcase');
    await expect(section).toBeVisible();
    
    const glassContainer = section.locator('.glass').first();
    const width = await glassContainer.evaluate((el) => el.clientWidth);
    expect(width).toBeLessThanOrEqual(1280);
  });

  test('T9.2.3: Verify the video container maintains a proper 16:9 aspect ratio', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    const container = page.locator('section#video-showcase [data-testid="video-container"], section#video-showcase .video-container');
    await expect(container).toBeVisible();
    
    const box = await container.boundingBox();
    expect(box).not.toBeNull();
    const ratio = box!.width / box!.height;
    // 16 / 9 = 1.777...
    expect(ratio).toBeCloseTo(1.777, 1);
  });

  test('T9.2.4: Verify the glassmorphism card has correct backdrop-filter styling', async ({ page }) => {
    const glassCard = page.locator('section#video-showcase .glass').first();
    await expect(glassCard).toBeVisible();
    
    const backdropFilter = await glassCard.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.backdropFilter || style.webkitBackdropFilter;
    });
    expect(backdropFilter).toContain('blur');
  });

  test('T9.2.5: Verify no horizontal scrollbar is introduced when Video Showcase is hovered', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const section = page.locator('section#video-showcase');
    await section.scrollIntoViewIfNeeded();
    await section.hover();
    
    const hasScrollbar = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasScrollbar).toBeFalsy();
  });
});
