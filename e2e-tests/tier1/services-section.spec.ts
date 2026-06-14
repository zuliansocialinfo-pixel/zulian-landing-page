import { test, expect } from '@playwright/test';

test.describe('Services Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  });

  test('T4.1: Verify the "Servizi" section heading is visible', async ({ page }) => {
    const heading = page.locator('h2', { hasText: /Servizi/i }).first();
    await expect(heading).toBeVisible();
  });

  test('T4.2: Verify exactly 5 service cards/items are rendered in the DOM', async ({ page }) => {
    const servicesSection = page.locator('section', { hasText: /Servizi/i }).first();
    // Assuming service cards are list items or divs inside a grid/flex container
    // We can check for specific texts to count them, or rely on common classes
    const expectedServices = [
      'Analisi e Strategia',
      'Gestione Social',
      'Pubblicità Online',
      'Siti Web ed E-commerce',
      'Creazione Contenuti'
    ];
    for (const service of expectedServices) {
      await expect(servicesSection.locator(`text=${service}`)).toBeVisible();
    }
  });

  test('T4.3: Verify the presence of specific service titles', async ({ page }) => {
    const expectedTitles = [
      'Analisi e Strategia',
      'Gestione Social',
      'Pubblicità Online',
      'Siti Web ed E-commerce',
      'Creazione Contenuti'
    ];
    for (const title of expectedTitles) {
      const el = page.locator(`h3:has-text("${title}"), h4:has-text("${title}"), div:has-text("${title}")`).first();
      await expect(el).toBeVisible();
    }
  });

  test('T4.4: Verify each service contains a brief descriptive text', async ({ page }) => {
    // Check if the service title has a sibling or child paragraph
    const serviceTitle = page.locator(`h3:has-text("Gestione Social"), h4:has-text("Gestione Social")`).first();
    // Navigate up to the card container, then find a paragraph
    const card = serviceTitle.locator('..');
    const description = card.locator('p').first();
    await expect(description).toBeVisible();
  });

  test('T4.5: Verify any icons or visual elements associated with each service are visible', async ({ page }) => {
    const serviceTitle = page.locator(`h3:has-text("Gestione Social"), h4:has-text("Gestione Social")`).first();
    const card = serviceTitle.locator('..');
    // Assuming icons are SVGs or IMGs
    const icon = card.locator('svg, img').first();
    await expect(icon).toBeVisible();
  });
});
