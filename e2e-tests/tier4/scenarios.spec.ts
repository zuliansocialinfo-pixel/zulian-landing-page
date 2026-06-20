import { test, expect } from '@playwright/test';

test.describe('Real-World Application Scenarios - Tier 4', () => {
  // Scenario 1: User explores services and books a consultation
  test('S1: User explores services and books a consultation', async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});

    // Inspect Hero section CTA and click to discover services
    const discoverBtn = page.locator('a:has-text("Scopri i servizi")').first();
    await expect(discoverBtn).toBeVisible();
    await discoverBtn.click();
    
    // Services section should be in view
    const servicesSection = page.locator('section#servizi');
    await expect(servicesSection).toBeVisible();

    // Verify first service is "Analisi e Strategia"
    const serviceCard = servicesSection.locator('h3:has-text("Analisi e Strategia")').first();
    await expect(serviceCard).toBeVisible();

    // The user decides to book a consultation
    const bookCta = page.locator('a:has-text("Prenota una Consulenza")').first();
    await expect(bookCta).toBeVisible();
    
    const href = await bookCta.getAttribute('href');
    expect(href).toContain('calendar.google.com');
  });

  // Scenario 2: User navigates from About to Process, then to Footer
  test('S2: User navigates from About to Process, then to Footer', async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});

    // Navigates to About (Chi Sono)
    const aboutSection = page.locator('#chi-sono');
    await aboutSection.scrollIntoViewIfNeeded();
    await expect(aboutSection.locator('h2')).toContainText(/Il Mio Percorso|Chi Sono/i);

    // Navigates to Process (Come Funziona)
    const processSection = page.locator('#come-funziona');
    await processSection.scrollIntoViewIfNeeded();
    await expect(processSection.locator('h2')).toContainText(/Come Funziona/i);

    // Navigates to Footer and checks policies
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    
    const privacyLink = footer.locator('a', { hasText: /Privacy/i }).first();
    await expect(privacyLink).toBeVisible();
  });

  // Scenario 3: Mobile user views the whole page
  test('S3: Mobile user views the whole page', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});

    // Open hamburger menu
    const hamburger = page.locator('header button, header [aria-label="Menu"]').first();
    await hamburger.click();

    // Tap on services link
    const navOverlay = page.locator('header nav, .mobile-menu').first();
    const servicesLink = navOverlay.locator('a[href="#servizi"]').first();
    await servicesLink.click();

    // Menu should close
    await expect(navOverlay).toBeHidden();

    // Verify service card is responsive and visible
    const firstService = page.locator('section#servizi .glass').first();
    await expect(firstService).toBeVisible();
    const box = await firstService.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(375);
  });

  // Scenario 4: Tablet user checks policy links and contacts
  test('S4: Tablet user checks policy links and contacts', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});

    // Tablet layout header navigation should be visible without menu button
    const navMenu = page.locator('.nav-menu').first();
    await expect(navMenu).toBeVisible();

    // Scroll to footer
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();

    // Check email and WhatsApp contact links
    const emailLink = footer.locator('a[href^="mailto:"]').first();
    const waLink = footer.locator('a[href*="wa.me"]').first();
    await expect(emailLink).toBeVisible();
    await expect(waLink).toBeVisible();
  });

  // Scenario 5: User scrolls through page verifying all animations
  test('S5: User scrolls through page verifying all animations', async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
    await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});

    // Scroll incrementally checking for visible animations on elements
    const animElements = [
      page.locator('section#chi-sono div').first(),
      page.locator('section#servizi div').first(),
      page.locator('section#come-funziona div').first(),
      page.locator('section#preventivi div').first()
    ];

    for (const el of animElements) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await expect(el).toBeVisible();
      
      const opacity = await el.evaluate((node) => window.getComputedStyle(node).opacity);
      expect(Number(opacity)).toBeGreaterThan(0);
    }
  });
});
