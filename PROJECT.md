# Project: Zulian Social Media Marketing

## Architecture
- Single Page Application built with React and Vite.
- Theme: Ultra-Premium Dark Mode (Dark background #0d0d0d, gold/champagne #d4af37 accents, light text #f5f5f5, glassmorphism UI).
- Motion & Interactions: Framer Motion and custom SVGs for continuous subtle background movement, floating elements, scroll-triggered reveals, interactive elements, and a Preloader with code-reveal/typing animation.
- Media Assets: Logo (`src/assets/logo.jpg`), Profile Face (`src/assets/face.jpg`), Dashboard (`src/assets/dashboard.png`).
- Integrations: Google Calendar appointment schedule embed, interactive WhatsApp button, Instagram, Email, and the `VideoShowcase` component (embedded video showcase with premium glassmorphism styling).

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Theme & Global Styling | Base layout, Tailwind/global CSS, background animations, font pairings | none | PLANNED |
| 2 | Premium Preloader & Hero | Animated logo preloader featuring a 'code typing / passing codes' animation, a SIGNIFICANTLY bigger logo in both the Preloader and the Hero (using logo.jpg), and Hero section with floating SVG elements, CTA | M1 | PLANNED |
| 3 | Core Sections & Trust | About (integrating face.jpg), Services, and Process sections with animations, and the new Video Presentation section (`VideoShowcase.jsx`) below the About or Services section with placeholders for YouTube/Vimeo/HTML5 video embeds styled with premium glassmorphism | M2 | PLANNED |
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
- `src/components/` - Sections (Preloader, Hero, About, Services, HowItWorks, VideoShowcase.jsx, Pricing, Footer, FloatingWhatsApp)
- `src/components/VideoShowcase.jsx` - Premium glassmorphism video showcase component
- `src/styles/` or `src/index.css` - Global CSS styles and Tailwind configurations
