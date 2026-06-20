import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Colors
content = content.replace('--bg:#06060A;', '--bg:#050505;')
content = content.replace('--surface:#0F0F18;', '--surface:#0A0A0C;')
content = content.replace('--acc1:#7B5CFF;', '--acc1:#D4AF37;')
content = content.replace('--acc2:#FF3CAC;', '--acc2:#C5A059;')
content = content.replace('--acc3:#00F5D4;', '--acc3:#E0E0E0;')
content = content.replace('--muted:rgba(255,255,255,0.55);', '--muted:rgba(255,255,255,0.45);')

# 2. Clean tech backgrounds
content = re.sub(r'body::before\s*\{[^}]+\}', '', content)
content = re.sub(r'\.hero-watermark\s*\{[^}]+\}', '', content)
content = re.sub(r'<div class="hero-watermark">ZULIAN</div>', '', content)
content = re.sub(r'<div class="hero-orb orb-[1-3]"></div>', '', content)
content = re.sub(r'background:\s*linear-gradient[^;]+;', 'background:var(--surface);', content)
content = content.replace('background:#06060A;', 'background:var(--bg);')
content = content.replace('background:#0A0815;', 'background:var(--bg);')
content = content.replace('background:#0F0518;', 'background:var(--surface);')
content = content.replace('background:#0C1018;', 'background:var(--surface);')
content = content.replace('background:#0A0A12;', 'background:var(--bg);')
content = content.replace('background:#030305;', 'background:#020202;')

# 3. Loader Logo
content = re.sub(r'<div class="loader-logo">.*?</div>', '<div class="loader-logo"><img src="src/assets/logo.jpg" alt="Zulian Logo" style="max-width:140px; border-radius:4px; mix-blend-mode:screen;"></div>', content, flags=re.DOTALL)

# 4. Nav Logo
content = re.sub(r'<a href="#" class="nav-logo">.*?</a>', '<a href="#" class="nav-logo" style="display:flex; align-items:center;"><img src="src/assets/logo.jpg" alt="Zulian Logo" style="height:56px; width:auto; border-radius:4px; mix-blend-mode:screen;"></a>', content, flags=re.DOTALL)

# 5. Footer Logo
content = re.sub(r'<div class="footer-logo">Zulian\.</div>\s*<div class="footer-logo-sub">Social Media Marketing</div>', '<img src="src/assets/logo.jpg" alt="Zulian Logo" style="max-width:220px; border-radius:6px; margin-bottom:1.5rem; mix-blend-mode:screen;">', content, flags=re.DOTALL)

# 6. Elegant Buttons
content = re.sub(r'\.btn-primary\s*\{[^}]+\}', '.btn-primary{display:inline-flex;align-items:center;gap:0.6rem;padding:1rem 2.2rem;background:transparent;color:var(--acc1);font-family:var(--font-display);font-weight:600;font-size:0.95rem;border:1px solid var(--acc1);transition:all 0.5s ease;}', content)
content = content.replace('.btn-primary:hover{background:transparent;color:var(--acc1)}', '.btn-primary:hover{background:var(--acc1);color:#000;}')

# 7. Slower animations
content = content.replace("duration: prefersReduced ? 0 : 0.8,", "duration: prefersReduced ? 0 : 1.2,")
content = content.replace("duration: prefersReduced ? 0 : 1,", "duration: prefersReduced ? 0 : 1.5,")

with open('index.html', 'w') as f:
    f.write(content)
