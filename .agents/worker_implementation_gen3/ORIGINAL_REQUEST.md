## 2026-06-20T00:23:36Z
You are a Worker. Implement the required bug fixes, missing features, and E2E selector alignments in the Zulian Social Media Marketing project workspace at `/Users/iMac21/Downloads/Zulian Social Media Marketing`.

MANDATORY INTEGRITY WARNING:
> DO NOT CHEAT. All implementations must be genuine. DO NOT
> hardcode test results, create dummy/facade implementations, or
> circumvent the intended task. A Forensic Auditor will independently
> verify your work. Integrity violations WILL be detected and your
> work WILL be rejected.

Here is the exact task description:

1. **Preloader & Initialization Flow**:
   - In `index.html`:
     - Rename `#loader` to `#preloader` and add class `preloader` and `loader-overlay` to it: `<div id="preloader" class="preloader loader-overlay">`.
     - Inside this preloader div, add `<canvas id="loader-canvas" style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:0; pointer-events:none;"></canvas>`.
     - Replace all CSS/JS references from `#loader` to `#preloader` in `index.html`.
     - Fix the stray syntax error `});` on line 1632 in `index.html`. Ensure the script compiles with no syntax errors.
   - In `src/assets/cinematic.js`:
     - Update references to `.loader-overlay` or `#loader` to match the HTML.
     - In `endLoader()`, make sure that inside the `onComplete` callback, if `initAfterLoader` is defined on `window`, call it:
       `if (typeof initAfterLoader === 'function') { initAfterLoader(); } else { initAfterCinematicLoader(); }`
     - Make sure GSAP is correctly utilized to fade out/move `#preloader`.

2. **Implement Video Showcase Section**:
   - Add `#video-showcase` section in `index.html` below `#chi-sono` and before `#come-funziona`.
   - The section must contain:
     - Heading with text "Presentazione Video".
     - A wrapper with class `glass`.
     - A video container with class `video-container` (or `data-testid="video-container"`) that has a 16:9 aspect ratio (e.g., using padding-bottom: 56.25%).
     - Inside it, an `iframe` with a valid YouTube/Vimeo embed URL placeholder (e.g. `https://www.youtube.com/embed/dQw4w9WgXcQ`).

3. **Hero Logo**:
   - Add a logo image with class `hero-logo` inside `#hero`'s content container.
   - It must be visible, have dimensions >= 100px width/height, and fade into view after the preloader finishes (it can be added to the GSAP timeline of the Hero section).

4. **Services Section & Dashboard**:
   - Change service headings to match E2E expectations:
     - Card 1: `Analisi e Strategia` (Integrate the "Bandi e Finanziamenti" strategy into its description).
     - Card 2: `Gestione Social`
     - Card 3: `Pubblicità Online`
     - Card 4: `Siti Web ed E-commerce`
     - Card 5: `Creazione Contenuti`
   - Add class `glass` to the service cards (`<div class="service-card glass reveal-up">`).
   - Move the dashboard image div (class `dashboard-wrapper`) to be inside `section#servizi` (e.g., at the bottom).
   - Change the image alt attribute to exactly `alt="Zulian Marketing Dashboard"`. Keep the text overlay containing `h3:has-text("Dati alla mano")`.

5. **Process Section**:
   - Revert the process steps in `#come-funziona` to exactly 4 steps (reverting step 5 "Bandi e Finanziamenti" since it is integrated into Services and Contacts).
   - Ensure the process step cards have class `glass`.
   - Ensure the step numbers are represented by `span.step-number` with text `1`, `2`, `3`, `4`.

6. **Pricing & Header Navigation**:
   - Change the pricing section ID to `preventivi` (e.g., `<section id="preventivi" class="section-pad">`), and place `<div id="prezzi"></div>` inside it.
   - Make sure pricing cards have class `glass` and set pricing values to be high-ticket (Starter: €1200/mese, Growth: €2900/mese, Custom).
   - Wrap the `#navbar` in a `<header>` tag in `index.html`.
   - Add class `nav-menu` to `<div class="nav-links">`.
   - Ensure calendar URLs in anchor tags include `?gv=true`.

7. **Verification**:
   - Run `npm run build` and `npx playwright test` to verify that all E2E tests pass without errors.
   - Write a handoff report at `.agents/worker_implementation_gen3/handoff.md` and report back.
