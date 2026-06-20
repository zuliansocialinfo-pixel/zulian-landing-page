import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Add Canvas to loader and hide logo initially
loader_old = '<div class="loader-overlay">'
loader_new = '<div class="loader-overlay">\n  <canvas id="loader-canvas" style="position:absolute; inset:0; z-index:0;"></canvas>'
content = content.replace(loader_old, loader_new)

content = content.replace('<img src="src/assets/logo.jpg" alt="Zulian Logo" style="max-width:140px; border-radius:4px; mix-blend-mode:screen;">', 
                          '<img src="src/assets/logo.jpg" alt="Zulian Logo" style="max-width:140px; border-radius:4px; mix-blend-mode:screen; opacity:0; transform:scale(0.8); position:relative; z-index:1;">')

# 2. Add CSS for new effects
css_add = """
/* ═══════════════════════════════════════════
   CINEMATIC EFFECTS
   ═══════════════════════════════════════════ */
.page-transition {
  position: fixed;
  top: 100%;
  left: 0;
  width: 100%;
  height: 0;
  background: var(--surface);
  z-index: 99999;
  pointer-events: none;
  border-top: 1px solid var(--acc1);
  border-bottom: 1px solid var(--acc1);
}

.liquid-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background: var(--acc1);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s, background-color 0.3s;
}

.liquid-cursor.hover {
  width: 60px;
  height: 60px;
  background: transparent;
  border: 2px solid var(--acc1);
  mix-blend-mode: normal;
}

.distort-img {
  transition: filter 0.4s ease, transform 0.4s ease;
}

.distort-img:hover {
  filter: contrast(1.2) saturate(1.5) hue-rotate(15deg);
  transform: scale(1.02);
}

body::after {
  content: '';
  position: fixed;
  inset: 0;
  background: url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E');
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}
"""
content = content.replace('/* Reduced Motion */', css_add + '\n/* Reduced Motion */')

# 3. Disable old loader JS
content = re.sub(r'function initLoader\(\) \{[\s\S]*?\}', 'function initLoader() { /* Disabled, using CinematicExperience */ }', content)

# 4. Remove initLoader() call from INIT to avoid double start
content = content.replace('initLoader();', '// initLoader() handled by cinematic.js')

# 5. Add script tag at the end
content = content.replace('</body>', '  <script src="src/assets/cinematic.js"></script>\n</body>')

with open('index.html', 'w') as f:
    f.write(content)

