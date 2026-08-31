# V3 verification boundary

## Local static checks performed before publication
- 15 HTML documents inspected with `analyze_html_structure.py`: 0 reported structural issues after correction.
- 545 local HTML references inspected with `check_links.py`: 0 missing targets/anchors.
- Production deployment remains GitHub Pages from `main`.

## Runtime gates after deployment
- Browser desktop/mobile visual review.
- Keyboard/focus/reflow review.
- Reduced-motion behavior.
- Console/network sanity.
- Core Web Vitals measurement on the live origin.

A successful GitHub Pages deployment is not by itself a visual or accessibility pass.
