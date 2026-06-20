import { test, expect } from '@playwright/test';

test.describe('Video Presentation (VideoShowcase) - Tier 1', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  });

  test('T9.1: Verify the Video Presentation section is present and visible in the DOM', async ({ page }) => {
    const section = page.locator('section#video-showcase');
    await expect(section).toBeVisible();
  });

  test('T9.2: Verify the section heading "Presentazione Video" is visible and not empty', async ({ page }) => {
    const heading = page.locator('section#video-showcase h2');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(/Presentazione Video/i);
  });

  test('T9.3: Verify the video container placeholder element is present', async ({ page }) => {
    const videoContainer = page.locator('section#video-showcase [data-testid="video-container"], section#video-showcase .video-container');
    await expect(videoContainer).toBeVisible();
  });

  test('T9.4: Verify the video player iframe element is present and visible', async ({ page }) => {
    const iframe = page.locator('section#video-showcase iframe');
    await expect(iframe).toBeVisible();
  });

  test('T9.5: Verify the video player source points to a valid YouTube/Vimeo embed URL', async ({ page }) => {
    const iframe = page.locator('section#video-showcase iframe');
    const src = await iframe.getAttribute('src');
    expect(src).not.toBeNull();
    expect(src).toMatch(/youtube\.com|vimeo\.com/i);
  });
});
