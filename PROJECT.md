# Zulian Architettura Digitale — Runtime V3

## Source truth
- Production branch: `main`
- Working redesign branch: `redesign/zulian-architecture-v3`
- Deployment: GitHub Pages from repository root via `.github/workflows/deploy.yml`

## Architecture
Static multi-page HTML5 website with a shared CSS design system and minimal JavaScript progressive enhancement.

### Canonical pages
- `index.html`
- `soluzioni.html`
- `metodo.html`
- `modelli-progettuali.html`
- `lab.html`
- `partnership.html`
- `qualita-standard.html`
- `ai-e-lavoro.html`
- `chi-marco-zulian.html`
- `formazione.html`
- `giornale.html`
- `contatti.html`

### Interactive Lab
- `lab/video-pipeline.html`
- `lab/app-architecture.html`
- `lab/automation-control-room.html`

## Shared owners
- Visual system: `assets/site-v3.css`
- Interaction/state: `assets/site-v3.js`
- Brand mark: `zulian-mark.svg`
- Social card: `zulian-social-card.svg`

## Principles
Semantic HTML owns content and navigation. CSS owns layout, typography and most visual states. JavaScript only enhances behavior; critical content must remain usable without JavaScript. Motion respects `prefers-reduced-motion`.

## Verification status
Static HTML structure and local references were checked before release. Browser visual acceptance, full accessibility validation and field performance measurement remain separate runtime gates after deployment.
