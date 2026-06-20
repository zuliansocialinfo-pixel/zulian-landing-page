# Synthesis: Milestone 1 & Build/E2E Test Corrections (v2)

The previous implementation failed the build step due to a Tailwind v4 PostCSS integration mismatch. Additionally, baseline E2E tests have identified 4 key test failure points.

## Consensus and Implementation Steps:

### 1. Fix PostCSS & Tailwind v4 Integration (Build Failure)
- Tailwind CSS version 4 requires `@tailwindcss/postcss` to be used as a PostCSS plugin.
- **Action**: Run `npm install -D @tailwindcss/postcss`.
- **Action**: Update `postcss.config.js` to:
  ```javascript
  export default {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  }
  ```
- **Action**: Keep `tailwind.config.js` or configure it to make sure Tailwind compiles correctly. In Tailwind v4, config is often loaded directly from CSS via `@theme` or through the PostCSS plugin. If using `@tailwindcss/postcss`, it will load configurations from `tailwind.config.js` automatically.

### 2. Preloader ID (E2E Test Failure 1)
- **Problem**: Tests look for `#preloader, .preloader, [data-testid="preloader"]` to wait for loading, but none exists, leading to other tests executing while preloader is active.
- **Action**: In `src/components/Preloader.jsx`, add `id="preloader"` and `data-testid="preloader"` to the root `<motion.div>`.

### 3. Process Steps Numbering (E2E Test Failure 2)
- **Problem**: The tests search for text `"1"`, `"2"`, `"3"`, `"4"` inside the `Come Funziona` (HowItWorks) section. Currently, only Lucide icons are in the badges.
- **Action**: In `src/components/HowItWorks.jsx`, make sure step numbers `1`, `2`, `3`, `4` are clearly rendered as text inside a dedicated element inside each step container (e.g., `<span data-testid="process-step">1</span>` or a circular badge showing only the number `1`, `2`, `3`, `4`).

### 4. Footer WhatsApp Link (E2E Test Failure 3)
- **Problem**: The tests expect a WhatsApp link (`wa.me` or `whatsapp`) inside the `<footer>` element.
- **Action**: In `src/components/Footer.jsx` or similar, add a WhatsApp contact link containing `wa.me/39...` or `whatsapp` under the contacts section.

### 5. Responsive Hamburger Menu (E2E Test Failure 4)
- **Problem**: Navigation links are hidden on mobile viewports but no alternative toggle is rendered.
- **Action**: In `src/App.jsx` (or header section), implement a mobile menu toggle button and slide-out menu drawer.
