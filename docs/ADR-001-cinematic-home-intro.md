# ADR-001 — Cinematic Home Intro

Status: SUPERSEDED
Branch: `work/zulian-architecture-sep2026`
Production branch protected: `main` (no changes)

## Context
The first additive Home intro was implemented as a network/orbit/node construction sequence derived from the V3 architecture motif. After local visual review, the user rejected that direction because it drifted toward an "AI/tech demo" aesthetic and weakened the pre-existing Zulian visual character.

## Original decision
Add a Home-only cinematic intro built around the Zulian mark plus network/orbit/route geometry, without rewriting the V3 core CSS/JS.

## Rejection evidence
USER_FACT / VISUAL ACCEPTANCE FAIL: preserve and improve the visual style that existed before; do not replace it with an AI-looking aesthetic.

## Superseding decision
The implemented intro is removed. The V3 Home visual structure is restored exactly to the pre-intro state. Future cinematic work must derive from the established Zulian language already present in the repository: editorial typography, controlled dark/light contrast, existing circle/spatial motifs, real imagery where appropriate, GSAP-style choreography only when justified, and continuity with the site's prior motion identity.

## Consequences
- `index.html` restored to the V3 baseline.
- `assets/site-intro.css` deleted.
- No first-session intro is currently approved.
- Motion architecture remains open for redesign, but must pass a visual-language fit test before implementation.
- `main` remains untouched.

## Reopen condition
A new intro may be proposed only after its first frame, visual motif, transition logic and relationship to the existing Zulian style are specified and shown to preserve—not replace—the established identity.

## Rollback status
COMPLETED on work branch only.
