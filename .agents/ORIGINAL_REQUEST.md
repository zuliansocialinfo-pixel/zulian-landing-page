# Original User Request

## 2026-06-14T23:34:55Z

# Teamwork Project Prompt

Overhaul the Zulian Social Media Marketing landing page to be an ultra-premium, high-ticket agency site with extreme "WOW" factor, rich SVG animations, complex floating UI elements, and high-end pricing. The site must exude extreme trust and authority to justify premium prices.

Working directory: /Users/iMac21/Downloads/Zulian Social Media Marketing
Integrity mode: development

## Requirements

### R1. Ultra-Premium Aesthetics & "WOW" Factor
- Transform the site from a basic dark mode to a hyper-dynamic, visually rich experience.
- Implement complex SVG animations, floating elements, scroll-triggered reveals, and glassmorphism.
- Use the provided logo (`src/assets/logo.jpg`) prominently, specifically creating an impressive animated intro/preloader using the logo.
- Ensure the site does not look "dead" ("mortorio"); it needs continuous, subtle background motion and dynamic interactions.

### R2. High-Ticket Pricing Section
- Redesign the pricing section to reflect high-end, premium agency services (e.g., packages starting at €1000, €3000, or custom high-ticket quotes).
- The pricing tables must be highly interactive (e.g., sliding, glowing on hover, floating).

### R3. Trust & Authority Building
- Integrate the user's face (`src/assets/face.jpg`) strategically to build deep personal trust.
- Make contact information (WhatsApp, Email, Instagram) extremely accessible and visually appealing.
- The overall UX must convince a high-paying client that Marco Zulian is a top-tier, reliable expert.

## Acceptance Criteria

### Design & Animations
- [ ] The preloader features the user's actual logo (`logo.jpg`) with a premium animation.
- [ ] The site contains at least 3 distinct complex SVG or Framer Motion animations (e.g., floating elements, animated backgrounds).
- [ ] The pricing section lists high-ticket prices (minimum €1000+) in a highly interactive, animated layout.

### Functionality
- [ ] The project builds successfully with `npm run build` and runs via `npm run dev`.
- [ ] The design is fully responsive across mobile, tablet, and desktop.
- [ ] Contact links and the Google Calendar embed are fully functional and prominent.

## Follow-up — 2026-06-14T23:49:50Z

### URGENT USER FEEDBACK:
"nella home e nel iltor non veod il mio logo falgi piu grandi e fai dei codicichi che passnao e e fanno apaprire il lgoo el aniamzione"

Translation/Actionable requirement:
1. Make the logo SIGNIFICANTLY bigger in the Preloader and in the Hero section.
2. Implement a "code typing / passing codes" animation (like a tech/glitch/matrix code reveal or an animated data stream) that reveals the main logo in the Preloader.
3. Ensure the logo is prominently displayed and animated in the Home/Hero section as well, not just text.

## Follow-up — 2026-06-14T23:55:35Z

### URGENT USER FEEDBACK:
"ECCO POI METTI DELEL SESSIONI VIDOE DOVE POSOS PRENSATMI AMGARI OTRNO UTLITI IN FUTURO"

Translation/Actionable requirement:
- Add a new "Video Presentation" section (e.g., `VideoShowcase.jsx`) below the About or Services section.
- It should feature placeholders for YouTube/Vimeo embeds or local HTML5 `<video>` tags where the user can introduce themselves and pitch their services.
- Style it to look extremely premium (glassmorphism frames, glowing play buttons, etc.).



## Follow-up — 2026-06-20T00:16:45+02:00

# Teamwork Project Prompt — Draft

> Status: Launched

Costruire la versione di produzione del sito web "Zulian Social Media Marketing", partendo rigorosamente dal logo fornito. Il sito deve essere un'esperienza "Awwwards-level" (ultra-luxury, dark mode, accenti oro/bronzo) completamente funzionante e priva di bug.

Working directory: `/Users/iMac21/Downloads/Zulian Social Media Marketing`
Integrity mode: development

## Requirements

### R1. Implementazione Perfetta del Logo e dell'Intro Cinematografica
L'intro deve partire dal logo fornito in `src/assets/logo.jpg`. Deve esserci un'animazione Canvas o GSAP avanzata in cui elementi grafici (es. circuiti/numeri/particelle) si fondono per rivelare il logo in modo fluido.

### R2. Design Luxury e Interazioni "WOW" Senza Errori
Sviluppare un design dark puro (nero assoluto, antracite) con dettagli oro. Implementare un "liquid trail cursor" e transizioni GSAP (es. color scroll, page transitions, hover distorsivi sulle immagini). L'architettura JavaScript deve essere solida, senza conflitti di scope o errori in console che blocchino le animazioni.

### R3. Contenuti e Funzionalità Core
Il sito deve contenere il listino prezzi interattivo (`#prezzi`), l'integrazione della strategia "Bandi e Finanziamenti" nei Servizi e nei Contatti, e i modali interattivi del portfolio ("Lavori").

## Acceptance Criteria

### Esecuzione e Stabilità JavaScript
- [ ] L'apertura di `index.html` nel browser genera **zero** errori di sintassi o ReferenceError nella console JavaScript.
- [ ] Tutte le funzioni di inizializzazione (loader, scroll, cursor, modali) vengono eseguite con successo al caricamento della pagina senza bloccarsi.

### Funzionalità Animazioni
- [ ] Il loader cinematografico iniziale completa la sua sequenza visiva e scompare automaticamente (display: none o opacity: 0) entro un massimo di 10 secondi, svelando il sito sottostante.
- [ ] Il "liquid cursor" (elemento `.liquid-cursor`) aggiorna fluidamente le sue coordinate CSS `transform` ascoltando l'evento `mousemove` su desktop.
- [ ] L'effetto GSAP che cambia il colore di sfondo del `body` allo scroll (`ScrollTrigger`) si attiva correttamente senza stacchi netti (transizioni morbide).


