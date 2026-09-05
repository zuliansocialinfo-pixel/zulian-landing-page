# Reference-Class Verification Boundary

## Deterministic local checks
Run:

```bash
python3 tools/check_site_contract.py
python3 analyze_html_structure.py . --output html_structure.json
python3 check_links.py . --output links.json
```

`tools/check_site_contract.py` verifies:
- canonical metadata;
- one semantic `<main>`;
- privacy link on every HTML route;
- no blocking `is-loading`;
- no legacy Premium/Enterprise package labels;
- canonical product labels/prices;
- removal of the unsupported Home study-hours metric.

## Runtime gates still required on a real preview
- desktop/mobile/tablet composition;
- menu keyboard/focus lifecycle;
- tier/model interactions;
- certificate dialog;
- Lab demo states;
- Contact → WhatsApp handoff;
- reduced motion;
- no-JS readable critical content;
- console/network;
- LCP/INP/CLS measurement;
- privacy/tracking behavior when ad tags are later added.

A successful static check or GitHub Pages deployment is not by itself `PASS_VISUAL_RUNTIME_CANDIDATE`.
