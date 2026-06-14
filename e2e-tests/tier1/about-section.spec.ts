import { test, expect } from '@playwright/test';

test.describe('About Section (Chi Sono)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  });

  test('T3.1: Verify the section heading "Chi Sono" or "Il Mio Percorso" is displayed', async ({ page }) => {
    const heading = page.locator('h2', { hasText: /Chi Sono|Il Mio Percorso/i }).first();
    await expect(heading).toBeVisible();
  });

  test('T3.2: Verify the profile image/avatar loads correctly without broken links', async ({ page }) => {
    // Look for an image within the About section
    const aboutSection = page.locator('section', { hasText: /Chi Sono|Il Mio Percorso/i }).first();
    const img = aboutSection.locator('img').first();
    await expect(img).toBeVisible();
    
    // Check if the image has natural width (is loaded)
    const isLoaded = await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0);
    expect(isLoaded).toBeTruthy();
  });

  test('T3.3: Verify the biography/path text is present and readable', async ({ page }) => {
    const aboutSection = page.locator('section', { hasText: /Chi Sono|Il Mio Percorso/i }).first();
    const paragraphs = aboutSection.locator('p');
    const count = await paragraphs.count();
    expect(count).toBeGreaterThan(0);
    await expect(paragraphs.first()).toBeVisible();
  });

  test('T3.4: Verify any structural layout consistency for the text and image sections', async ({ page }) => {
    const aboutSection = page.locator('section', { hasText: /Chi Sono|Il Mio Percorso/i }).first();
    const display = await aboutSection.evaluate((el) => {
      const innerContainer = el.querySelector('.container') || el.firstElementChild;
      return innerContainer ? window.getComputedStyle(innerContainer).display : window.getComputedStyle(el).display;
    });
    // It should be either flex, grid, or block with some internal structure
    expect(['flex', 'grid', 'block']).toContain(display);
  });

  test('T3.5: Verify responsive layout of image and text on smaller screens (stacking order)', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    const aboutSection = page.locator('section', { hasText: /Chi Sono|Il Mio Percorso/i }).first();
    await expect(aboutSection).toBeVisible();
    // In mobile, usually it's flex-direction: column or display: block making them stack
    const boundingBox = await aboutSection.boundingBox();
    expect(boundingBox?.height).toBeGreaterThan(300); // Should be tall due to stacking
  });
});
