# Handoff Report: E2E Playwright Setup & Tier 1 Test Design (Milestone 1)

## 1. Observation
Based on `TEST_INFRA.md`, `SCOPE.md`, and `original_prompt.md`:
- **Tooling:** Playwright Test (`@playwright/test`).
- **Directory Structure:** Tests must reside in `e2e-tests/`, specifically `e2e-tests/tier1/` for Tier 1.
- **Execution:** Run via `npm run test:e2e` or `npx playwright test`.
- **Methodology:** Opaque-box testing (no internal state mocking).
- **Coverage Goal:** At least 5 test cases per feature for 8 specified features (Preloader, Hero, About, Services, Process, Footer, Responsive, Theme/Animations).
- **Application Context:** React/Vite SPA, dark mode, gold/champagne accents, framer-motion animations, Google Calendar CTA.

## 2. Logic Chain
- To achieve Milestone 1, we must provide a concrete Playwright setup strategy aligning with the scoped architecture and NPM scripts.
- We must define a `playwright.config.ts` configuration that accommodates the Vite dev server and various browser environments (including mobile viewports for Feature 7).
- We must derive exactly 5 Tier 1 test cases for each of the 8 features by inspecting their primary requirements from the prompt (e.g., 5 services listed, 4 process steps, specific footer links).
- Each test case must strictly rely on opaque-box verification (UI assertions, visibility, attribute checks, and layout) rather than React component state.

## 3. Caveats
- Exact text copies, URLs for Google Calendar, Privacy, and Cookie policies are not fully specified in the prompt. Test implementation will need to use placeholder assertions or verify partial attributes (e.g., `href` containing `calendar.google.com`) until the actual text is finalized.
- Checking Framer Motion animations in Playwright can be tricky due to timing; test cases should focus on final visibility state or use Playwright's auto-waiting/assertions for CSS classes.

## 4. Conclusion

### Setup Strategy
1. **Installation:** Run `npm install -D @playwright/test` to add Playwright.
2. **NPM Scripts:** Add `"test:e2e": "playwright test"` to `package.json`.
3. **Playwright Config (`playwright.config.ts`):**
   - `testDir`: `'./e2e-tests'`
   - `webServer`: Start the Vite server using `command: 'npm run dev'`, port 5173.
   - `projects`: Configure Desktop Chrome, Desktop Firefox, Desktop Safari, and Mobile Chrome/Safari.

### Tier 1 Test Cases Design (e2e-tests/tier1/)

**Feature 1: Application Load (Preloader)**
1. Verify preloader element is visible immediately on initial page load.
2. Verify preloader element disappears after the application finishes loading.
3. Verify main content is hidden while the preloader is active.
4. Verify main content becomes visible after the preloader disappears.
5. Verify document title is correctly set ("Zulian Social Media Marketing").

**Feature 2: Hero Section & CTA**
1. Verify the Hero heading and subtitle are visible.
2. Verify the "Prenota una Consulenza" CTA button is visible and actionable.
3. Verify clicking the CTA navigates to or opens the Google Calendar booking link.
4. Verify the Hero section covers approximately the full viewport height.
5. Verify the visual presence of dark background and gold/champagne accents in the Hero area.

**Feature 3: About Section (Chi Sono / Il Mio Percorso)**
1. Verify the "Chi Sono" / "Il Mio Percorso" heading is visible.
2. Verify the biographical text content is present.
3. Verify the section is reachable by scrolling down from the Hero section.
4. Verify the text maintains sufficient contrast against the dark background.
5. Verify any associated profile image or graphic is successfully loaded and visible.

**Feature 4: Services Section (Servizi)**
1. Verify the "Servizi" heading is visible.
2. Verify exactly 5 service items are listed.
3. Verify the specific service titles are present (Analisi e Strategia, Gestione Social, Pubblicità Online, Siti Web ed E-commerce, Creazione Contenuti).
4. Verify each service item includes an explanatory description.
5. Verify the services are displayed in a structured grid or list layout.

**Feature 5: Process Section (Come Funziona)**
1. Verify the "Come Funziona" heading is visible.
2. Verify exactly 4 step elements are rendered.
3. Verify each step contains a numerical indicator or clear sequence marker.
4. Verify each step contains a title and descriptive text.
5. Verify the section correctly flows logically from step 1 to step 4.

**Feature 6: Footer & Policy Links**
1. Verify the Footer section is visible at the bottom of the page.
2. Verify the Email contact link is present and has a valid `mailto:` `href`.
3. Verify the WhatsApp contact link is present and has a valid `wa.me` (or similar) `href`.
4. Verify the Privacy Policy link is present and navigable.
5. Verify the Cookie Policy link is present and navigable.

**Feature 7: Responsive Design**
1. Verify the Hero section elements stack vertically on mobile viewports.
2. Verify the Services section adapts to a single-column layout on mobile viewports.
3. Verify the Process section steps display vertically without overlapping on mobile.
4. Verify no horizontal scrolling occurs on mobile viewports (e.g., width <= 375px).
5. Verify the CTA button remains easily tappable and fully visible on small screens.

**Feature 8: Theme & Animations (Dark Mode / Framer)**
1. Verify the root application background color is dark (e.g., checking computed style).
2. Verify primary buttons/accents have the correct gold/champagne computed color.
3. Verify key elements (e.g., Hero content) transition from opacity 0 to 1 upon load (Framer motion behavior).
4. Verify section contents become visible as they are scrolled into the viewport (scroll animations).
5. Verify CTA button has a hover animation or style change (e.g., scaling or color shift).

## 5. Verification Method
- **Verify Setup:** Run `npm run test:e2e`; Playwright should launch and look for tests in `e2e-tests/`.
- **Verify Test Implementation:** Inspect `e2e-tests/tier1/` files to ensure all 40 test cases (8 features x 5 tests) are defined.
- **Run Tests:** Ensure the test runner reports 40 tests executed. Pass/fail results will depend on application implementation progress.
