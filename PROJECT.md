# Zulian Architettura Digitale — Reference-Class Runtime

## Source truth
- Production branch: `main` (maintenance until explicit release)
- Reference-class implementation branch: `work/reference-class-implementation-20260905`
- Baseline lineage: `work/zulian-architecture-sep2026`
- Deployment: GitHub Pages from repository root through `.github/workflows/deploy.yml`

## Architecture
Static multi-page semantic HTML5 site.

Owners:
- V3 identity baseline: `assets/site-v3.css`
- Reference-class extension: `assets/reference-class.css`
- Existing state/forms/lab runtime: `assets/site-v3.js`
- Reference-class enhancements: `assets/reference-class.js`
- Commercial/identity contract: `data/site-contract.json`
- Contract regression: `tools/check_site_contract.py`
- Product requirements: `docs/ZULIAN_REFERENCE_CLASS_WEBSITE_PRD_V1.md`

## Product rule
The site is one Web Experience System. Page composition changes with the page job; consistency comes from shared tokens, typography, navigation, behavior laws and QA.

## Critical invariant
Navigation, identity, offer, proof, contact and privacy must remain readable without cinematic JavaScript.

## Release boundary
This branch is an implementation candidate. Updating `main` publishes to GitHub Pages and therefore requires an explicit release action after QA.
