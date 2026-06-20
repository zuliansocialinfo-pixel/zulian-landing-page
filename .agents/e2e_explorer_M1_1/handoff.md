# Milestone 1: E2E Playwright Setup & Tier 1 Feature Coverage

## 1. Observation
Based on `TEST_INFRA.md`, `SCOPE.md`, and `original_prompt.md`:
- **Philosophy**: Opaque-box, requirement-driven, using Playwright for a React/Vite SPA.
- **Milestone 1 Scope**: Install Playwright, setup configuration (`playwright.config.ts`), and write Tier 1 Feature coverage tests for 8 features (≥5 tests per feature).
- **Target App Details**: Dark mode theme with gold/champagne accents, Framer Motion animations, Preloader. Sections include: Hero (CTA: "Prenota una Consulenza" to Google Calendar), About ("Chi Sono / Il Mio Percorso"), Services (5 specific services), Process ("Come Funziona" with 4 steps), and Footer (Email, WhatsApp, Policy links).
- **Architecture**: `e2e-tests/` root directory with a `test:e2e` npm script.

## 2. Logic Chain
To complete Milestone 1:
1. **Playwright Setup**: Define `playwright.config.ts` supporting cross-browser (Chromium, Firefox, WebKit) and mobile testing (Responsive Design). Add `webServer` to run `npm run dev`.
2. **Directory Structure**: Create `e2e-tests/tier1/` and populate it with a `.spec.ts` file for each of the 8 features.
3. **Test Case Design (Tier 1)**: For each feature, write 5 opaque-box assertions tailored to the original requirements (e.g., verifying the 5 specific services, the 4 process steps, and the Google Calendar CTA).

## 3. Caveats
- Precise locators/data-test-ids are unknown at this stage; tests will rely on visible text, ARIA roles, and standard HTML elements matching the requirements.
- Google Calendar integration is external; opaque-box tests should verify the `href` attribute of the CTA without executing the actual booking flow to avoid external dependencies and state mutation.

## 4. Conclusion
Below is the concrete setup strategy, Playwright config structure, and the exact Tier 1 test cases to implement for the 8 features.

### A. Setup Strategy & Playwright Config
**1. Installation & Scripts**
Run: `npm install -D @playwright/test` and `npx playwright install`.
Add to `package.json`: `"test:e2e": "playwright test"`

**2. Directory Layout**
```
e2e-tests/
  ├── playwright.config.ts
  └── tier1/
      ├── application-load.spec.ts
      ├── hero-section.spec.ts
      ├── about-section.spec.ts
      ├── services-section.spec.ts
      ├── process-section.spec.ts
      ├── footer-policy.spec.ts
      ├── responsive-design.spec.ts
      └── theme-animations.spec.ts
```

**3. `playwright.config.ts` Outline**
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e-tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173', // Default Vite port
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### B. Tier 1 Test Cases (40 Tests Total)

**1. Application Load (Preloader)**
*   **T1.1:** Verify preloader element is initially visible in the DOM on page load.
*   **T1.2:** Verify preloader element disappears after loading completes.
*   **T1.3:** Verify the main content is hidden or inaccessible while the preloader is active.
*   **T1.4:** Verify the main content becomes fully visible after the preloader finishes.
*   **T1.5:** Verify the preloader does not reappear upon navigating back to the top of the page.

**2. Hero Section & CTA**
*   **T2.1:** Verify the main Hero heading and subtitle are rendered correctly.
*   **T2.2:** Verify the "Prenota una Consulenza" CTA button is visible.
*   **T2.3:** Verify the "Prenota una Consulenza" CTA points to a valid Google Calendar URL.
*   **T2.4:** Verify the Hero background (dark mode with gold/champagne accents) renders properly.
*   **T2.5:** Verify the header navigation links remain accessible overlaying the Hero section.

**3. About Section (Chi Sono)**
*   **T3.1:** Verify the section heading "Chi Sono" or "Il Mio Percorso" is displayed.
*   **T3.2:** Verify the profile image/avatar loads correctly without broken links.
*   **T3.3:** Verify the biography/path text is present and readable.
*   **T3.4:** Verify any structural layout consistency for the text and image sections.
*   **T3.5:** Verify responsive layout of image and text on smaller screens (stacking order).

**4. Services Section**
*   **T4.1:** Verify the "Servizi" section heading is visible.
*   **T4.2:** Verify exactly 5 service cards/items are rendered in the DOM.
*   **T4.3:** Verify the presence of specific service titles: "Analisi e Strategia", "Gestione Social", "Pubblicità Online", "Siti Web ed E-commerce", "Creazione Contenuti".
*   **T4.4:** Verify each service contains a brief descriptive text.
*   **T4.5:** Verify any icons or visual elements associated with each service are visible.

**5. Process Section (Come Funziona)**
*   **T5.1:** Verify the "Come Funziona" section heading is visible.
*   **T5.2:** Verify exactly 4 process steps are rendered.
*   **T5.3:** Verify the steps are visually ordered (e.g., 1, 2, 3, 4).
*   **T5.4:** Verify each step includes a distinct description.
*   **T5.5:** Verify process steps align correctly within the viewport layout.

**6. Footer & Policy Links**
*   **T6.1:** Verify the Footer element renders at the very bottom of the document.
*   **T6.2:** Verify the Email contact link is visible and uses a `mailto:` href.
*   **T6.3:** Verify the WhatsApp contact link is visible and uses a valid `wa.me` or similar href.
*   **T6.4:** Verify the Privacy Policy and Cookie Policy links are visible.
*   **T6.5:** Verify clicking the Privacy/Cookie policy links navigates correctly or opens the correct modal/page.

**7. Responsive Design**
*   **T7.1:** Verify the desktop layout renders correctly at >= 1024px width.
*   **T7.2:** Verify the main navigation converts to a mobile hamburger menu on narrow viewports.
*   **T7.3:** Verify clicking the mobile hamburger menu opens the navigation overlay successfully.
*   **T7.4:** Verify the 5 service cards and 4 process steps stack vertically on mobile viewports.
*   **T7.5:** Verify interactive elements (buttons, links) maintain sufficient touch-target sizes on mobile.

**8. Theme & Animations**
*   **T8.1:** Verify the dark mode theme (dark background) is the default state on initial load.
*   **T8.2:** Verify UI elements exhibit the specified gold/champagne accents.
*   **T8.3:** Verify Framer Motion elements (e.g., in Services or Process sections) start in a hidden or off-screen state.
*   **T8.4:** Verify elements animate into the viewport (fade/slide) as the user scrolls down.
*   **T8.5:** Verify animations do not cause unintended horizontal scrolling.

## 5. Verification Method
1. The implementer should create the `e2e-tests/tier1/` directory and `.spec.ts` files.
2. The implementer must configure `playwright.config.ts` as specified.
3. Once tests are written, verify by running `npm run test:e2e` (or `npx playwright test --project=chromium`).
4. Ensure the HTML reporter output confirms 40 passing tests covering all 8 features.
