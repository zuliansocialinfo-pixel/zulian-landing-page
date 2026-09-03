# Zulian Architettura Digitale — Motion System Map V1

Branch: `work/zulian-architecture-sep2026`
Status: ARCHITECTURE WORKING SOURCE
Visual lock: preserve V3 visual identity; no total redesign.

## 1. Motion thesis
Motion must express the idea of architecture: construct, connect, reveal state, transfer context, verify. It must not behave like a generic luxury template. The recurring visual verbs are BUILD → CONNECT → RESOLVE → HANDOFF.

## 2. Existing V3 mechanics
### PRESERVE
- Hero architecture SVG: orbit, route, nodes and pulse.
- Header hide/reveal based on scroll direction.
- Accessible mobile menu lifecycle, Escape close and focus restoration.
- Progressive reveal capability via `IntersectionObserver`.
- Lab stateful interactions (pipeline, system mapper, automation console).
- `prefers-reduced-motion` handling in `assets/site-v3.js`.

### UPGRADE
- Generic `[data-reveal]` is currently a utility, not a cinematic language. Keep it for low-priority content; important scenes need explicit choreography.
- Home currently has ambient geometry but no opening/body/exit contract. ADR-001 supplies the opening; later Home architecture must define section handoffs.
- Page heroes are visually strong but currently arrive mostly as static first frames. They need route-entry choreography derived from the Home language.

## 3. Legacy V2 mechanics
### PORT THE MECHANIC, NOT THE OLD IMPLEMENTATION
- Hero line reveal: useful for high-priority display typography; adapt to V3 type hierarchy.
- Logo/brand reveal: superseded on Home by ADR-001, reusable for selected route transitions only.
- Scroll-linked manifesto text fill: useful only for a page/scene that communicates a principle or commitment.
- Media parallax: use only on real photography/media with a defined focal point; never as default decoration.
- Circle/spatial transformation: potentially reusable when a content concept genuinely maps to convergence/system architecture.
- Demo-card scroll depth: usable as subtle spatial reinforcement in Lab/template showcases.

### DO NOT PORT AS DEFAULT
- Numeric loader as identity. The new Home intro replaces it with a brand/system construction sequence.
- Global Lenis dependency. Re-evaluate only if native scroll cannot deliver a required scene; no scroll hijacking.
- GSAP everywhere. Add a library only when the required state/scroll orchestration cannot be expressed cleanly with CSS/WAAPI/current JS.

## 4. Motion character
- Pace: decisive, not slow-luxury.
- Weight: precise, engineered, controlled.
- Directionality: mostly vertical reveal + radial/network expansion where architecture is the subject.
- Continuity: outgoing geometry should visually hand off to incoming geometry/content when possible.
- Restraint: one dominant motion idea per scene.
- Texture: crisp line construction, node activation, controlled depth, selective type masks.
- Interaction response: immediate for controls; cinematic only for narrative transitions.

## 5. Global timing classes
These are DESIGN_DECISION defaults, not universal requirements.

### UI response
- hover/focus visual response: 160–240 ms
- menu/control state transition: 220–360 ms
- active/pressed feedback: <= 180 ms

### Content reveal
- supporting content: 480–680 ms
- major heading/scene reveal: 650–900 ms
- stagger between related elements: 55–90 ms

### Cinematic transition
- scene construction/handoff: 800–1300 ms when it communicates structure/state
- Home first-session intro: governed by ADR-001, maximum 3.2 s total

## 6. Scene grammar
Every important scene must use this contract before implementation:

FIRST FRAME
→ OPENING (what builds/reveals and why)
→ BODY STATE (what is readable/interactable)
→ EXIT/HANDOFF (what gives context to the next scene)
→ REVERSE/INTERRUPTION (if scroll/state controlled)
→ REDUCED MOTION replacement

A generic fade is acceptable only for supporting content, never as the complete motion architecture of a primary scene.

## 7. Page-level roles
### Home
Role: brand trust + orientation.
Motion: cinematic first-session intro → hero handoff → selective scene transitions. Do not animate every block equally.

### Soluzioni / three levels
Role: comparison and selection.
Motion direction: tiers should resolve as three depths of the same system, not three floating cards. Final naming/content remains governed by IA/content decisions.

### Metodo
Role: demonstrate reasoning sequence.
Motion direction: progression should communicate dependency/order; current timeline is the structural base.

### Lab
Role: observable proof.
Motion direction: state changes are the proof. Prefer functional animation over decorative entrance effects.

### Competenze / certificazioni
Role: trust evidence.
Motion direction: restrained evidence reveal; certificate media must remain legible and authentic. No gamified badges or fake 3D credential effects.

### Marco / identity
Role: human trust.
Motion direction: editorial narrative and real-media continuity; avoid over-technical effects that compete with the person/story.

## 8. Responsive motion
Desktop: may use larger spatial travel and geometry continuity.
Tablet: preserve hierarchy, reduce overlap/travel.
Mobile: shorter travel, fewer simultaneous layers, no long pinned scenes by default, no hover dependency.

## 9. Reduced motion
- Home intro skipped.
- Large radial expansion/parallax replaced by static final state or short opacity transition.
- Scroll-scrub narratives must become natural document flow.
- Functional state changes remain immediate and understandable.

## 10. Performance rules
- CSS/WAAPI for simple transforms/opacity/stroke construction.
- JavaScript only owns state/orchestration that CSS cannot safely own.
- Transform/opacity preferred; avoid layout-thrashing animation.
- Infinite animation limited to low-cost ambient layers and paused/removed when not useful.
- No animation may hide critical content if JS fails.

## 11. Acceptance
PASS only when important motion has a purpose, exact owner, reduced-motion path, responsive behavior and observable end state.
FAIL when motion is added because a section looks empty, when every section repeats the same reveal, when scroll is hijacked, or when animation compensates for weak information architecture.

## 12. Next architectural work
Do not mass-apply this motion system yet. For each new/updated page, first lock page purpose, content hierarchy and proof; then compile only the motion needed by that page.
