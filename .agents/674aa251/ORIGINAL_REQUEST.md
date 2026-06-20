## 2026-06-14T23:36:05Z

You are a worker. Your task is to update the file `/Users/iMac21/Downloads/Zulian Social Media Marketing/PROJECT.md` with the new premium overhaul project plan.

Please write the following content to `/Users/iMac21/Downloads/Zulian Social Media Marketing/PROJECT.md`:

```markdown
# Project: Zulian Social Media Marketing

## Architecture
- Single Page Application built with React and Vite.
- Theme: Ultra-Premium Dark Mode (Dark background #0d0d0d, gold/champagne #d4af37 accents, light text #f5f5f5, glassmorphism UI).
- Motion & Interactions: Framer Motion and custom SVGs for continuous subtle background movement, floating elements, scroll-triggered reveals, and interactive elements.
- Media Assets: Logo (`src/assets/logo.jpg`), Profile Face (`src/assets/face.jpg`), Dashboard (`src/assets/dashboard.png`).
- Integrations: Google Calendar appointment schedule embed, interactive WhatsApp button, Instagram, and Email.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Theme & Global Styling | Base layout, Tailwind/global CSS, background animations, font pairings | none | PLANNED |
| 2 | Premium Preloader & Hero | Animated logo preloader (using logo.jpg) and Hero section with floating SVG elements, CTA | M1 | PLANNED |
| 3 | Core Sections & Trust | About (integrating face.jpg), Services, and Process sections with animations | M2 | PLANNED |
| 4 | High-Ticket Pricing & Footer | Interactive pricing cards (€1000+, €3000+, custom quote), WhatsApp & social contacts, policy links | M3 | PLANNED |
| 5 | Final Integration & E2E Pass | Google Calendar booking, E2E validation, bug fixing | M4, TEST_READY | PLANNED |

## Interface Contracts
### App Component ↔ Sub-sections
- `Preloader` controls its own state and fades out, revealing the main layout.
- Sections are structured sequentially inside `App.jsx`.
- Standardized layout spacing and consistent animations across all sections.

### Google Calendar ↔ App
- Embedded scheduling widget styled container (`<iframe>` or custom embed) showing calendar schedules.

## Code Layout
- `src/assets/` - Media files (logo.jpg, face.jpg, dashboard.png)
- `src/components/` - Sections (Preloader, Hero, About, Services, HowItWorks, Pricing, Footer, FloatingWhatsApp)
- `src/styles/` or `src/index.css` - Global CSS styles and Tailwind configurations
```

Do not make any other changes. Confirm when done.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
