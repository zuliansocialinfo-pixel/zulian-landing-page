# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier3/cross-feature.spec.ts >> Cross-Feature Combination Tests - Tier 3 >> T3.2: Mobile menu overlay open state vs calendar iframe overlay layout
- Location: e2e-tests/tier3/cross-feature.spec.ts:25:3

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
  3  | test.describe('Cross-Feature Combination Tests - Tier 3', () => {
  4  |   test('T3.1: Theme interactions with services and process cards during scroll and reload', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
  7  |     await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  8  |     
  9  |     // Simulate scroll down to cards
  10 |     const card = page.locator('section#servizi .glass').first();
  11 |     await card.scrollIntoViewIfNeeded();
  12 |     await page.waitForTimeout(300);
  13 |     
  14 |     // Verify theme style is maintained (dark background, gold borders/accent colors)
  15 |     const bgColor = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
  16 |     expect(bgColor).toBe('rgb(13, 13, 13)');
  17 |     
  18 |     // Hover on services card triggers hover border styling
  19 |     await card.hover();
  20 |     const borderColor = await card.evaluate((el) => window.getComputedStyle(el).borderColor);
  21 |     // Gold/champagne accent is rgb(212, 175, 55)
  22 |     expect(borderColor).toBe('rgb(212, 175, 55)');
  23 |   });
  24 | 
  25 |   test('T3.2: Mobile menu overlay open state vs calendar iframe overlay layout', async ({ page }) => {
  26 |     await page.setViewportSize({ width: 375, height: 667 });
> 27 |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5173/
  28 |     const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
  29 |     await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  30 | 
  31 |     // Open mobile menu
  32 |     const hamburger = page.locator('header button, header [aria-label="Menu"]').first();
  33 |     await hamburger.click();
  34 |     
  35 |     const menuOverlay = page.locator('header nav, .mobile-menu').first();
  36 |     await expect(menuOverlay).toBeVisible();
  37 | 
  38 |     // Verify z-index of mobile menu is higher than iframe calendar container
  39 |     const menuZIndex = await menuOverlay.evaluate((el) => window.getComputedStyle(el).zIndex);
  40 |     const iframeSection = page.locator('iframe').first();
  41 |     const iframeContainer = iframeSection.locator('..');
  42 |     const iframeZIndex = await iframeContainer.evaluate((el) => window.getComputedStyle(el).zIndex);
  43 | 
  44 |     expect(Number(menuZIndex)).toBeGreaterThan(Number(iframeZIndex || 0));
  45 |   });
  46 | 
  47 |   test('T3.3: Resizing viewport during preloader fadeout adapts layout successfully', async ({ page }) => {
  48 |     await page.setViewportSize({ width: 1024, height: 768 });
  49 |     await page.goto('/');
  50 |     
  51 |     const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
  52 |     await expect(preloader).toBeVisible();
  53 |     
  54 |     // Resize viewport during preloader active phase
  55 |     await page.setViewportSize({ width: 375, height: 667 });
  56 |     
  57 |     // Ensure preloader still covers the screen
  58 |     const box = await preloader.boundingBox();
  59 |     expect(box?.width).toBe(375);
  60 |     expect(box?.height).toBe(667);
  61 |     
  62 |     // Wait for preloader fadeout
  63 |     await expect(preloader).toBeHidden({ timeout: 10000 });
  64 |     
  65 |     // Mobile toggle hamburger should now be visible instead of desktop nav
  66 |     const hamburger = page.locator('header button, header [aria-label="Menu"]').first();
  67 |     await expect(hamburger).toBeVisible();
  68 |   });
  69 | 
  70 |   test('T3.4: Footer contacts are obscured or not primary click target while mobile menu overlay is active', async ({ page }) => {
  71 |     await page.setViewportSize({ width: 375, height: 667 });
  72 |     await page.goto('/');
  73 |     const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
  74 |     await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  75 | 
  76 |     // Open mobile menu
  77 |     const hamburger = page.locator('header button, header [aria-label="Menu"]').first();
  78 |     await hamburger.click();
  79 |     
  80 |     const menuOverlay = page.locator('header nav, .mobile-menu').first();
  81 |     await expect(menuOverlay).toBeVisible();
  82 |     
  83 |     // Attempting to click footer link should be prevented or the link should be outside viewport / overlay should cover events
  84 |     const footerLink = page.locator('footer a[href*="wa.me"]').first();
  85 |     
  86 |     // Check if the menu overlay has a backdrop-filter or covers viewport
  87 |     const menuBox = await menuOverlay.boundingBox();
  88 |     const footerBox = await footerLink.boundingBox();
  89 |     
  90 |     if (menuBox && footerBox) {
  91 |       // If menu covers the full screen (bottom=667), it will overlap/obscure the footer
  92 |       const overlaps = menuBox.y + menuBox.height >= footerBox.y;
  93 |       expect(overlaps).toBeTruthy();
  94 |     }
  95 |   });
  96 | });
  97 | 
```