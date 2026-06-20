# Synthesis: Milestone 1 (Theme & Global Styling)

## Consensus
- **Tailwind Setup**: DevDependencies `tailwindcss`, `postcss`, and `autoprefixer` must be installed. Configurations `tailwind.config.js` and `postcss.config.js` must be created.
- **Color Theme**: Map variables and custom colors: bg `#0d0d0d` (gold-luxury tone), gold `#d4af37` (with hover `#b5952f`), light text `#f5f5f5`, and secondary text `#a3a3a3`.
- **Glassmorphism**: A utility class `.glass` with `backdrop-filter: blur(12px)` and thin border `rgba(255, 255, 255, 0.08)` to be configured in Tailwind/CSS.
- **Background Motion**: A hybrid performance-focused approach combining:
  1. Slow drifting radial gradients (`BackgroundGlows.jsx`) running on GPU compositor thread via CSS translation.
  2. A lightweight canvas-based particle emitter (`BackgroundParticles.jsx`) capped at ~45 particles, visibility-aware to conserve CPU cycles.

## Action Plan for Worker
1. Install `tailwindcss`, `postcss`, `autoprefixer` via npm.
2. Initialize Tailwind and set configuration mapping color theme variables.
3. Update `src/index.css` to import Tailwind layers, define `@layer components` and `@layer utilities` (including `.glass` and keyframes for glows).
4. Create `src/components/BackgroundGlows.jsx` and `src/components/BackgroundParticles.jsx`.
5. Update `src/App.jsx` to render these background components, and use Tailwind styling.
6. Verify build (`npm run build`) succeeds.
