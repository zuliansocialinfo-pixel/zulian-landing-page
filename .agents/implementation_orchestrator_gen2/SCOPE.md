# Scope: UI/UX Overhaul implementation

## Architecture
- React + Vite SPA.
- Styles: Premium Dark Mode with Gold/Champagne (#d4af37) accents.
- Framework: Vite, React, Framer Motion, Lucide icons.
- Background animations: custom SVG/Framer motion canvas or particles, fluid gradients.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Theme & Global Styling | Base styling, Tailwind config, global colors, and continuous subtle background particles/waves/motion to prevent the site looking "dead". | none | PLANNED |
| 2 | Premium Preloader & Hero | Animated preloader using actual logo.jpg with premium entrance animation, and Hero section featuring floating interactive SVG elements and CTA. | M1 | PLANNED |
| 3 | Core Sections & Trust | About section integrating face.jpg with elegant styling/effects, Services & Process sections with smooth Framer Motion scroll triggers. | M2 | PLANNED |
| 4 | High-Ticket Pricing & Footer | Redesigned interactive pricing tables (starting at €1000+; hover glow, sliding, floating effects), and Footer with contacts and policy links. | M3 | PLANNED |
| 5 | Final Integration & E2E Pass | E2E validation, run tests, fix failures. | M4, TEST_READY | PLANNED |

## Interface Contracts
### Preloader -> Main Content
- Preloader controls fade out and duration, signaling main layout to load.
### Styling
- Global CSS variables for gold (#d4af37), dark bg (#0d0d0d), dark gray text.
