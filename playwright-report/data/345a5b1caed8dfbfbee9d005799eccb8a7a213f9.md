# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier2/video-showcase.spec.ts >> Video Presentation (VideoShowcase) - Tier 2 >> T9.2.4: Verify the glassmorphism card has correct backdrop-filter styling
- Location: e2e-tests/tier2/video-showcase.spec.ts:42:3

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/
Call log:
  - navigating to "http://localhost:5173/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Video Presentation (VideoShowcase) - Tier 2', () => {
  4  |   test.beforeEach(async ({ page }) => {
> 5  |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/
  6  |     const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
  7  |     await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  8  |   });
  9  | 
  10 |   test('T9.2.1: Verify Video Showcase section layout on Galaxy Fold (280px width)', async ({ page }) => {
  11 |     await page.setViewportSize({ width: 280, height: 653 });
  12 |     const section = page.locator('section#video-showcase');
  13 |     await expect(section).toBeVisible();
  14 |     
  15 |     // Grid/stack shouldn't overflow 280px viewport
  16 |     const boundingBox = await section.boundingBox();
  17 |     expect(boundingBox?.width).toBeLessThanOrEqual(280);
  18 |   });
  19 | 
  20 |   test('T9.2.2: Verify Video Showcase section respects max-width on 4K screen (3840x2160)', async ({ page }) => {
  21 |     await page.setViewportSize({ width: 3840, height: 2160 });
  22 |     const section = page.locator('section#video-showcase');
  23 |     await expect(section).toBeVisible();
  24 |     
  25 |     const glassContainer = section.locator('.glass').first();
  26 |     const width = await glassContainer.evaluate((el) => el.clientWidth);
  27 |     expect(width).toBeLessThanOrEqual(1280);
  28 |   });
  29 | 
  30 |   test('T9.2.3: Verify the video container maintains a proper 16:9 aspect ratio', async ({ page }) => {
  31 |     await page.setViewportSize({ width: 1024, height: 768 });
  32 |     const container = page.locator('section#video-showcase [data-testid="video-container"], section#video-showcase .video-container');
  33 |     await expect(container).toBeVisible();
  34 |     
  35 |     const box = await container.boundingBox();
  36 |     expect(box).not.toBeNull();
  37 |     const ratio = box!.width / box!.height;
  38 |     // 16 / 9 = 1.777...
  39 |     expect(ratio).toBeCloseTo(1.777, 1);
  40 |   });
  41 | 
  42 |   test('T9.2.4: Verify the glassmorphism card has correct backdrop-filter styling', async ({ page }) => {
  43 |     const glassCard = page.locator('section#video-showcase .glass').first();
  44 |     await expect(glassCard).toBeVisible();
  45 |     
  46 |     const backdropFilter = await glassCard.evaluate((el) => {
  47 |       const style = window.getComputedStyle(el);
  48 |       return style.backdropFilter || style.webkitBackdropFilter;
  49 |     });
  50 |     expect(backdropFilter).toContain('blur');
  51 |   });
  52 | 
  53 |   test('T9.2.5: Verify no horizontal scrollbar is introduced when Video Showcase is hovered', async ({ page }) => {
  54 |     await page.setViewportSize({ width: 375, height: 667 });
  55 |     const section = page.locator('section#video-showcase');
  56 |     await section.scrollIntoViewIfNeeded();
  57 |     await section.hover();
  58 |     
  59 |     const hasScrollbar = await page.evaluate(() => {
  60 |       return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  61 |     });
  62 |     expect(hasScrollbar).toBeFalsy();
  63 |   });
  64 | });
  65 | 
```