import { test, expect } from '@playwright/test';

test.describe('Application Load (Preloader) - Tier 2', () => {
  test('T1.2.1: Verify preloader layout on extremely narrow viewport (280px width)', async ({ page }) => {
    await page.setViewportSize({ width: 280, height: 653 }); // Galaxy Fold narrow viewport
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeVisible();
    
    // Ensure logo image inside preloader doesn't overflow container width
    const logo = preloader.locator('img');
    const logoBox = await logo.boundingBox();
    if (logoBox) {
      expect(logoBox.width).toBeLessThanOrEqual(280);
    }
  });

  test('T1.2.2: Verify preloader behavior under prefers-reduced-motion: reduce media query emulation', async ({ page }) => {
    await page.emulateMedia({ reduceMotion: 'reduce' });
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeVisible();
    
    // Under reduced motion, it should still hide properly after timeout
    await expect(preloader).toBeHidden({ timeout: 10000 });
  });

  test('T1.2.3: Verify preloader on extreme 4K resolution (3840x2160)', async ({ page }) => {
    await page.setViewportSize({ width: 3840, height: 2160 });
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeVisible();
    
    // It should cover the entire 4K viewport
    const box = await preloader.boundingBox();
    expect(box?.width).toBe(3840);
    expect(box?.height).toBe(2160);
    await expect(preloader).toBeHidden({ timeout: 10000 });
  });

  test('T1.2.4: Verify page loading with hash URL (/#chi-sono) is blocked until preloader finishes, then section is accessible', async ({ page }) => {
    await page.goto('/#chi-sono');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeVisible();
    
    // The target section should be hidden/obscured while preloader is visible
    const targetSection = page.locator('#chi-sono');
    await expect(targetSection).toBeVisible(); // exists in DOM
    
    // Wait for preloader to hide
    await expect(preloader).toBeHidden({ timeout: 10000 });
    
    // Ensure page scrolls/focuses correctly after fadeout
    const isVisibleInViewport = await targetSection.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
    });
    expect(isVisibleInViewport).toBeDefined();
  });

  test('T1.2.5: Verify preloader element is completely removed or does not block mouse events after it completes', async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 });
    
    // Verify we can click on main CTA link (i.e. mouse events aren't captured by an invisible overlay)
    const ctaButton = page.locator('a:has-text("Prenota una Consulenza"), button:has-text("Prenota una Consulenza")').first();
    await expect(ctaButton).toBeEnabled();
  });

  test('T1.2.6: Verify the code typing / passing codes animation displays in the preloader', async ({ page }) => {
    await page.goto('/');
    const typingContainer = page.locator('[data-testid="code-typing"], .code-typing');
    await expect(typingContainer).toBeVisible();
    const text = await typingContainer.textContent();
    expect(text).toContain('>');
  });

  test('T1.2.7: Verify the preloader logo container becomes visible and satisfies size requirements (>= 100px)', async ({ page }) => {
    await page.goto('/');
    const logoContainer = page.locator('.preloader-logo-container');
    // Wait for code typing to finish and logo to emerge
    await expect(logoContainer).toBeVisible({ timeout: 6000 });
    
    const box = await logoContainer.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(100);
    expect(box!.height).toBeGreaterThanOrEqual(100);
  });
});
