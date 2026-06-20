import { test, expect } from '@playwright/test';

test.describe('Cross-Feature Combination Tests - Tier 3', () => {
  test('T3.1: Theme interactions with services and process cards during scroll and reload', async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
    
    // Simulate scroll down to cards
    const card = page.locator('section#servizi .glass').first();
    await card.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    
    // Verify theme style is maintained (dark background, gold borders/accent colors)
    const bgColor = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    expect(bgColor).toBe('rgb(13, 13, 13)');
    
    // Hover on services card triggers hover border styling
    await card.hover();
    const borderColor = await card.evaluate((el) => window.getComputedStyle(el).borderColor);
    // Gold/champagne accent is rgb(212, 175, 55)
    expect(borderColor).toBe('rgb(212, 175, 55)');
  });

  test('T3.2: Mobile menu overlay open state vs calendar iframe overlay layout', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});

    // Open mobile menu
    const hamburger = page.locator('header button, header [aria-label="Menu"]').first();
    await hamburger.click();
    
    const menuOverlay = page.locator('header nav, .mobile-menu').first();
    await expect(menuOverlay).toBeVisible();

    // Verify z-index of mobile menu is higher than iframe calendar container
    const menuZIndex = await menuOverlay.evaluate((el) => window.getComputedStyle(el).zIndex);
    const iframeSection = page.locator('iframe').first();
    const iframeContainer = iframeSection.locator('..');
    const iframeZIndex = await iframeContainer.evaluate((el) => window.getComputedStyle(el).zIndex);

    expect(Number(menuZIndex)).toBeGreaterThan(Number(iframeZIndex || 0));
  });

  test('T3.3: Resizing viewport during preloader fadeout adapts layout successfully', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto('/');
    
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeVisible();
    
    // Resize viewport during preloader active phase
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Ensure preloader still covers the screen
    const box = await preloader.boundingBox();
    expect(box?.width).toBe(375);
    expect(box?.height).toBe(667);
    
    // Wait for preloader fadeout
    await expect(preloader).toBeHidden({ timeout: 10000 });
    
    // Mobile toggle hamburger should now be visible instead of desktop nav
    const hamburger = page.locator('header button, header [aria-label="Menu"]').first();
    await expect(hamburger).toBeVisible();
  });

  test('T3.4: Footer contacts are obscured or not primary click target while mobile menu overlay is active', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});

    // Open mobile menu
    const hamburger = page.locator('header button, header [aria-label="Menu"]').first();
    await hamburger.click();
    
    const menuOverlay = page.locator('header nav, .mobile-menu').first();
    await expect(menuOverlay).toBeVisible();
    
    // Attempting to click footer link should be prevented or the link should be outside viewport / overlay should cover events
    const footerLink = page.locator('footer a[href*="wa.me"]').first();
    
    // Check if the menu overlay has a backdrop-filter or covers viewport
    const menuBox = await menuOverlay.boundingBox();
    const footerBox = await footerLink.boundingBox();
    
    if (menuBox && footerBox) {
      // If menu covers the full screen (bottom=667), it will overlap/obscure the footer
      const overlaps = menuBox.y + menuBox.height >= footerBox.y;
      expect(overlaps).toBeTruthy();
    }
  });
});
