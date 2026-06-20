with open('index.html', 'r') as f:
    content = f.read()

svg_filter = """
<!-- SVG FILTERS -->
<svg style="display:none;">
  <filter id="glass-distort">
    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="1" result="noise" />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" />
  </filter>
</svg>
</body>
"""

content = content.replace('</body>', svg_filter)

# Upgrade distort-img:hover to use the SVG filter
old_distort = """
.distort-img:hover {
  filter: contrast(1.2) saturate(1.5) hue-rotate(15deg);
  transform: scale(1.02);
}
"""

new_distort = """
.distort-img {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.distort-img:hover {
  filter: url('#glass-distort') contrast(1.2);
  transform: scale(1.05) rotateZ(1deg);
}
"""

content = content.replace(old_distort.strip(), new_distort.strip())

with open('index.html', 'w') as f:
    f.write(content)
