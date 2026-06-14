# Project: Zulian Social Media Marketing

## Architecture
- React/Vite SPA.
- Dark Mode theme: Dark background, gold/champagne accents, light text.
- Navigation: Header with smooth scroll links and a CTA button.
- UI Animations: Framer Motion for scroll fade-ins, initial loader.
- External Integration: Google Calendar link on CTA.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Scaffolding & Theme | App layout, Tailwind/CSS setup, global variables for colors, fonts | none | PLANNED |
| 2 | Core Sections | Preloader, Hero Section, Chi Sono (About) | M1 | PLANNED |
| 3 | Services & Workflow | Servizi, Come Funziona, Footer with policy links | M2 | PLANNED |
| 4 | Final Integration | Google Calendar link, Final E2E checks | M3, TEST_READY | PLANNED |

## Interface Contracts
### App ↔ Sections
- Sections will be rendered sequentially in `App.jsx`.
- Components should receive basic props like `id` for scrolling.

## Code Layout
- `/src/assets` - images and logo
- `/src/components` - modular UI sections
- `/src/styles` - global CSS and variables
