# Handoff Report: E2E Playwright Setup & Tier 1 Test Design

## 1. Observation
- `TEST_INFRA.md` requires Playwright for E2E testing of 8 features: Preloader, Hero Section & CTA, About Section, Services, Process, Footer & Links, Responsive Design, Theme & Animations.
- Test thresholds: Tier 1 requires ≥5 tests per feature. Directory layout maps E2E tests to `e2e-tests/tier1/`.
- `SCOPE.md` confirms Milestone 1 is Playwright installation, config, and Tier 1 feature tests. It explicitly states an interface contract: tests must be run via `npm run test:e2e` or `npx playwright test` and validation must be opaque-box.
- `original_prompt.md` / `PROJECT.md` specifies a React/Vite SPA architecture running on localhost.

## 2. Logic Chain
- **Playwright Setup Strategy**: Because the application is a React/Vite SPA, Playwright needs to automatically launch the Vite dev server (`npm run dev`) during test execution. The tests should be isolated from source code, placed in `e2e-tests/` as specified by `TEST_INFRA.md`. The package.json needs a `test:e2e` script to satisfy the interface contract.
- **Playwright Config**: The configuration (`playwright.config.js`) should specify the `testDir` as `./e2e-tests`, set the `baseURL` to `http://localhost:5173`, and configure the `webServer` block to use `npm run dev`. It should test across major engines.
- **Test Design**: Based on the 8 features and the strict ≥5 tests-per-feature requirement, 40 distinct test scenarios are designed to validate visual presence, specific content, interactions, and layout behavior entirely from an opaque-box perspective.

## 3. Caveats
- These tests are designed under the assumption that standard semantic HTML tags, roles, or text matchers will be sufficient for an opaque-box approach. 
- Animations (Framer Motion) and Preloader timings might cause test flakiness; tests should rely on Playwright's auto-waiting and assertions rather than hardcoded sleeps.

## 4. Conclusion
The testing infrastructure should be initialized using Playwright, targeted at Vite's dev server port. The directory structure must branch into `e2e-tests/tier1/` with 8 test files corresponding to the features. 

### Recommended Setup Strategy
1. **Installation**: Install Playwright via `npm init playwright@latest` or `npm i -D @playwright/test`.
2. **NPM Script**: Add `"test:e2e": "playwright test"` to `package.json`.
3. **Directory Structure**: Create the `e2e-tests/tier1/` directory.
4. **Configuration**: Create `playwright.config.js` at the project root with the following structure:
   ```javascript
   import { defineConfig, devices } from '@playwright/test';

   export default defineConfig({
     testDir: './e2e-tests',
     fullyParallel: true,
     retries: 1,
     use: {
       baseURL: 'http://localhost:5173',
       trace: 'on-first-retry',
     },
     webServer: {
       command: 'npm run dev',
       url: 'http://localhost:5173',
       reuseExistingServer: !process.env.CI,
     },
     projects: [
       { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
       { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
       { name: 'webkit', use: { ...devices['Desktop Safari'] } },
       { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
       { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
     ],
   });
   ```

### Tier 1 Test Cases (5 per feature)

**F1. Application Load (Preloader)** (`e2e-tests/tier1/preloader.spec.js`)
1. Preloader is visible immediately upon page load.
2. Preloader displays the "ZULIAN" text/logo.
3. Preloader background utilizes the dark theme palette.
4. Preloader automatically disappears after its duration.
5. Main application content is visible once the preloader hides.

**F2. Hero Section & CTA** (`e2e-tests/tier1/hero.spec.js`)
1. Hero title is visible and prominently displayed.
2. Background color adheres to the dark mode specification.
3. "Prenota una Consulenza" CTA button is visible in the Hero section.
4. CTA button utilizes the gold/champagne accent color scheme.
5. Clicking the CTA button opens the Google Calendar URL in a new tab.

**F3. About Section (Chi Sono)** (`e2e-tests/tier1/about.spec.js`)
1. The section heading (e.g., "Chi Sono" o "Il Mio Percorso") is visible.
2. The section contains body text detailing Marco Zulian's story.
3. The core values are clearly legible within the text blocks.
4. High contrast is maintained between text and background.
5. The section can be navigated to by scrolling from the Hero.

**F4. Services Section** (`e2e-tests/tier1/services.spec.js`)
1. The "Servizi" heading is visible.
2. All 5 services are listed: Analisi e Strategia, Gestione Social, Pubblicità Online, Siti Web ed E-commerce, Creazione Contenuti.
3. Typography across all service items is consistent.
4. Layout correctly handles the rendering of the list items without overlap.
5. Section background or card backgrounds contrast well with surrounding sections.

**F5. Process Section (Come Funziona)** (`e2e-tests/tier1/process.spec.js`)
1. The "Come Funziona" heading is prominently visible.
2. Exactly 4 distinct process steps are rendered.
3. Each step contains an accompanying title or descriptive text.
4. Sequential indicators (numbers or step markers) are present for each step.
5. Steps flow logically (horizontally on desktop, vertically on smaller screens).

**F6. Footer & Policy Links** (`e2e-tests/tier1/footer.spec.js`)
1. Footer container is placed at the bottom of the document.
2. Email contact information is present.
3. Telephone/WhatsApp contact information is present.
4. A hyperlink to the "Privacy Policy" exists and is clickable.
5. A hyperlink to the "Cookie Policy" exists and is clickable.

**F7. Responsive Design** (`e2e-tests/tier1/responsive.spec.js`)
1. Mobile viewport (< 640px) loads without horizontal overflow.
2. CTA remains accessible and does not overlap text on mobile devices.
3. Tablet viewport renders sections correctly (e.g., proper grid spacing).
4. Desktop viewport limits maximum width and centers content.
5. Elements scale appropriately across layout shifts.

**F8. Theme & Animations** (`e2e-tests/tier1/theme.spec.js`)
1. Default background color evaluates to the specified dark tone across sections.
2. Default text color evaluates to a light, readable tone.
3. Accent elements (buttons, active links) evaluate to the gold/champagne color.
4. Scrolling down the page triggers elements to become visible (fade-in).
5. Animations execute without causing sudden layout shifts (Cumulative Layout Shift check).

## 5. Verification Method
- **Verification Commands**: 
  - `cat e2e-tests/playwright.config.js` to inspect the Playwright config.
  - `ls e2e-tests/tier1/` to verify all 8 test files are present.
  - Run `npm run test:e2e` to execute the tests.
- **Invalidation Condition**: If `npm run dev` fails or starts on a different port than 5173, the `playwright.config.js` will need a port update.
