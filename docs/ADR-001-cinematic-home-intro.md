# ADR-001 — Cinematic Home Intro

Status: USER_LOCKED / TECHNICAL_DECISION
Branch: `work/zulian-architecture-sep2026`
Production branch protected: `main` (no changes)

## Context
The approved direction is to preserve the existing V3 visual language and motion identity, then raise its quality without a full redesign. The Home currently has a strong architecture motif (Zulian mark, nodes, route/orbit geometry) but no complete cinematic opening sequence.

## Decision
Add a Home-only cinematic intro as an additive layer. Do not rewrite `assets/site-v3.css` or `assets/site-v3.js` for this step. Use the existing Zulian mark and the same architecture/node/route visual grammar already present in the V3 hero.

## Experience contract
TRIGGER → first Home visit in the current browser session.
PRECONDITIONS / START STATE → `index.html` loaded; `prefers-reduced-motion` is not `reduce`; intro has not already completed in `sessionStorage`.
OWNER / FILES → `index.html` owns markup and entry state; `assets/site-intro.css` owns the cinematic timeline. Existing hero remains owned by `assets/site-v3.css` and `assets/site-v3.js`.
ACTION / TRANSITION → nearly empty dark first frame → Zulian Z mark resolves → architecture network/orbits/routes build around the mark → wordmark resolves → network expands/fades into the existing hero architecture → hero typography/copy/metrics become the final state.
EXACT VALUES → maximum intro window 3.2 s; no external motion dependency; intro plays once per session; overlay is decorative and `aria-hidden`; Home remains semantically present underneath; reduced-motion skips the intro entirely.
END STATE → original V3 Home hero, navigation and content are fully usable and visually unchanged in structure.
ERROR / FALLBACK → if reduced motion is active, intro is skipped; a 3.2 s failsafe changes root state to `done`; if the decorative intro CSS is unavailable, the underlying Home remains the canonical content.
ROLLBACK → remove the `site-intro.css` include, the small intro-state script and the `data-cinematic-intro` markup from `index.html`; delete this CSS file. No other owner requires rollback.

## Timing model
- 0–180 ms: dark first frame / stage settling.
- 180–820 ms: Z mark scale + opacity reveal.
- 420–1350 ms: orbit and route strokes construct.
- 700–1450 ms: architecture nodes resolve.
- 980–1720 ms: `ZULIAN / ARCHITETTURA DIGITALE` wordmark reveal.
- 1650–2500 ms: network expands and becomes spatially continuous with the Home hero.
- 2050–2920 ms: Home eyebrow, display, copy and metrics reveal in ordered handoff.
- 2920–3200 ms: overlay leaves; root state becomes `done`.

## Responsive
Desktop/tablet keep the complete network composition. Mobile keeps the same semantic choreography but uses a smaller stage, fewer visible secondary nodes and reduced travel/scale. No horizontal overflow.

## Accessibility / motion safety
- `prefers-reduced-motion: reduce` => intro skipped.
- Decorative intro uses `aria-hidden="true"`.
- No essential information exists only in animation.
- No audio.
- Navigation/main content remain the semantic source.

## Acceptance tests
1. `main` commit/tree remains unchanged.
2. First Home visit on the work branch shows the intro and hands off to the existing hero in <= 3.2 s.
3. Reload/navigation back within the same session does not replay the intro.
4. Reduced-motion shows the Home immediately.
5. Intro failure cannot permanently hide or replace the Home content.
6. Existing V3 navigation, hero markup, CTA targets and downstream sections remain intact.
7. Browser visual/runtime verification is still required before this motion can be called final.
