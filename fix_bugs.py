import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Fix mobile menu showing on desktop
old_css = """#mobile-menu {
  display: flex;
  gap: 2.5rem;
}"""
new_css = """#mobile-menu {
  display: none;
}"""
content = content.replace(old_css, new_css)

# 2. Add Modal HTML just before script tags
modal_html = """
<!-- ═════════════════ PROJECT MODAL ═════════════════ -->
<div id="project-modal" class="modal-overlay">
  <div class="modal-content glass">
    <button class="modal-close" aria-label="Chiudi">&times;</button>
    <div class="modal-body">
      <div class="modal-tag"><span class="tag" id="modal-cat">Categoria</span></div>
      <h2 id="modal-title">Titolo Progetto</h2>
      <p id="modal-desc">Descrizione del progetto in dettaglio. Abbiamo curato l'identità visiva e la strategia social portando risultati eccellenti in termini di ROAS e conversioni.</p>
      <div class="modal-stats">
        <div class="stat-box">
          <h4>+150%</h4>
          <span>Crescita Follower</span>
        </div>
        <div class="stat-box">
          <h4>+300%</h4>
          <span>Vendite</span>
        </div>
      </div>
    </div>
  </div>
</div>
"""
if 'id="project-modal"' not in content:
    content = content.replace('</main>', '</main>\n' + modal_html)

# Add Modal CSS
modal_css = """
/* ═══════════════════════════════════════════
   PROJECT MODALS
   ═══════════════════════════════════════════ */
.modal-overlay {
  position: fixed; inset: 0; z-index: 10000;
  background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; pointer-events: none; transition: opacity 0.4s ease;
}
.modal-overlay.open { opacity: 1; pointer-events: all; }
.modal-content {
  position: relative; width: 90%; max-width: 800px;
  padding: 3rem; border-radius: 12px;
  transform: translateY(40px); transition: transform 0.4s ease;
}
.modal-overlay.open .modal-content { transform: translateY(0); }
.modal-close {
  position: absolute; top: 1rem; right: 1.5rem;
  background: none; border: none; color: var(--fg); font-size: 2rem;
  cursor: pointer; transition: color 0.3s;
}
.modal-close:hover { color: var(--acc1); }
.modal-body h2 { font-size: 2.5rem; margin-bottom: 1rem; color: var(--acc1); }
.modal-desc { font-size: 1.1rem; line-height: 1.6; color: #CCC; margin-bottom: 2rem; }
.modal-stats { display: flex; gap: 2rem; margin-top: 2rem; }
.stat-box { background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.2); flex: 1; text-align: center; }
.stat-box h4 { font-size: 2rem; color: var(--acc1); margin-bottom: 0.5rem; }
.stat-box span { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; color: #888; }
"""
if '.modal-overlay' not in content:
    content = content.replace('/* ═══════════════════════════════════════════\n   REVEAL ANIMATIONS', modal_css + '\n/* ═══════════════════════════════════════════\n   REVEAL ANIMATIONS')

# Add Modal JS
modal_js = """
  // ─── PROJECT MODALS ───
  function initProjectModals() {
    const works = document.querySelectorAll('.work-item');
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.modal-close');
    const titleEl = document.getElementById('modal-title');
    const catEl = document.getElementById('modal-cat');
    
    works.forEach(work => {
      work.addEventListener('click', () => {
        const title = work.querySelector('.work-name').innerText;
        const cat = work.querySelector('.work-cat').innerText;
        titleEl.innerText = title;
        catEl.innerText = cat;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
"""
if 'initProjectModals()' not in content:
    content = content.replace('// ─── INIT ───', modal_js + '\n  // ─── INIT ───')
    content = content.replace('initColorScroll();', 'initColorScroll();\n    initProjectModals();')

with open('index.html', 'w') as f:
    f.write(content)
