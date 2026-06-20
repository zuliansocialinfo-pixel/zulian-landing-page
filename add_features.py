import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Add "Bandi" step to Come Funziona
step_4 = """      <div class="process-step reveal-up">
        <div class="step-num">4</div>
        <div class="step-content">
          <h3>Avvio del lavoro</h3>
          <p>Dopo l'incontro, si passa all'azione: inizieremo il percorso. Nessuna perdita di tempo, solo risultati.</p>
        </div>
      </div>"""

step_5 = """      <div class="process-step reveal-up">
        <div class="step-num">5</div>
        <div class="step-content">
          <h3>Bandi e Finanziamenti</h3>
          <p>Hai vinto un bando o hai accesso a un finanziamento pubblico? Nessun problema. Gestiamo tutta la burocrazia necessaria e siamo disposti ad attendere l'erogazione dei fondi per il pagamento.</p>
        </div>
      </div>"""

content = content.replace(step_4, step_4 + "\n\n" + step_5)

# 2. Add Prezzi section before Lavori
prezzi_section = """<!-- ═════════════════ PREZZI ═════════════════ -->
<section id="prezzi" class="section-pad">
  <div class="container">
    <div class="section-header reveal-up" style="text-align:center">
      <div class="section-tag"><span class="tag">Investimento</span></div>
      <h2>
        <span class="reveal-line-wrap"><span class="reveal-line-inner">Listino Prezzi</span></span>
      </h2>
      <p style="margin:0 auto">Trasparenza totale. Nessun costo nascosto, solo soluzioni su misura per la tua crescita.</p>
    </div>

    <div class="pricing-grid">
      <div class="pricing-card reveal-up">
        <h3>Starter</h3>
        <div class="price">€ 490<span>/mese</span></div>
        <p>Perfetto per liberi professionisti e piccole attività che vogliono una presenza curata e professionale.</p>
        <ul>
          <li>Gestione 2 profili social</li>
          <li>Piano editoriale mensile</li>
          <li>Creazione contenuti grafici</li>
          <li>Report mensile base</li>
        </ul>
        <a href="#contatto" class="btn-ghost" style="width:100%; justify-content:center;">Richiedi</a>
      </div>

      <div class="pricing-card popular reveal-up">
        <div class="popular-badge">Consigliato</div>
        <h3>Growth</h3>
        <div class="price">€ 950<span>/mese</span></div>
        <p>La soluzione ideale per aziende che vogliono acquisire clienti e scalare il proprio fatturato.</p>
        <ul>
          <li>Gestione 3 profili social</li>
          <li>Campagne Ads incluse (Meta/Google)</li>
          <li>Video Making & Reels (1 sessione/mese)</li>
          <li>Funnel di acquisizione contatti</li>
          <li>Consulenza strategica bi-settimanale</li>
        </ul>
        <a href="#contatto" class="btn-primary" style="width:100%; justify-content:center;">Richiedi</a>
      </div>

      <div class="pricing-card reveal-up">
        <h3>Custom / E-commerce</h3>
        <div class="price">Su Misura</div>
        <p>Progetti complessi, e-commerce strutturati e restyling completi del brand.</p>
        <ul>
          <li>Sviluppo Sito Web / Shopify</li>
          <li>Strategia multicanale avanzata</li>
          <li>Shooting fotografico premium</li>
          <li>Gestione budget Ads elevati</li>
        </ul>
        <a href="#contatto" class="btn-ghost" style="width:100%; justify-content:center;">Parliamone</a>
      </div>
    </div>
  </div>
</section>

"""

content = content.replace('<!-- ═════════════════ LAVORI ═════════════════ -->', prezzi_section + '<!-- ═════════════════ LAVORI ═════════════════ -->')

# 3. Add Bandi text to Contatto
cta_buttons = """    <div class="cta-buttons reveal-up">
      <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3fOx-uImUyUZK6k2uRZRBFTz8quyI6UDW3lyfeuClz2oZc1gnax33Mkw_VPe6IVnNpuX3sOFce" target="_blank" rel="noopener noreferrer" class="btn-primary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        Prenota una Consulenza
      </a>
      <a href="https://wa.me/393927950038" target="_blank" rel="noopener noreferrer" class="btn-ghost">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Scrivimi su WhatsApp
      </a>
    </div>"""

bandi_text = """    <div class="bandi-notice reveal-up" style="margin-top:3rem; padding-top:2rem; border-top:1px solid rgba(255,255,255,0.06); font-size:0.9rem; color:rgba(255,255,255,0.6);">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--acc1)" stroke-width="2" style="vertical-align:middle; margin-right:0.5rem;"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      Hai vinto un bando o un finanziamento? <strong style="color:var(--acc1);">Accettiamo pagamenti tramite bandi</strong> e siamo disposti ad attendere l'erogazione dei fondi statali/regionali.
    </div>"""

content = content.replace(cta_buttons, cta_buttons + "\n" + bandi_text)

# 4. Add Pricing CSS and body transition CSS
css_to_add = """
/* ═══════════════════════════════════════════
   PREZZI
   ═══════════════════════════════════════════ */
#prezzi { background: var(--surface); }
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}
.pricing-card {
  background: var(--bg);
  border: 1px solid rgba(255,255,255,0.06);
  padding: 3rem 2rem;
  border-radius: 8px;
  position: relative;
  transition: transform 0.4s cubic-bezier(.4,0,.2,1), border-color 0.4s;
  display: flex;
  flex-direction: column;
}
.pricing-card:hover {
  transform: translateY(-10px);
  border-color: rgba(212, 175, 55, 0.4);
}
.pricing-card.popular {
  border-color: var(--acc1);
  box-shadow: 0 20px 40px rgba(212, 175, 55, 0.05);
}
.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--acc1);
  color: #000;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.4rem 1.2rem;
  border-radius: 999px;
}
.pricing-card h3 {
  font-family: var(--font-body);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--fg);
}
.pricing-card .price {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  color: var(--acc1);
  margin-bottom: 1rem;
  line-height: 1;
}
.pricing-card .price span {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 400;
  color: var(--muted);
}
.pricing-card p {
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
  margin-bottom: 2rem;
  min-height: 50px;
}
.pricing-card ul {
  flex-grow: 1;
  margin-bottom: 2.5rem;
}
.pricing-card ul li {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  padding: 0.6rem 0;
  color: rgba(255,255,255,0.8);
  font-size: 0.9rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.pricing-card ul li::before {
  content: '✓';
  color: var(--acc1);
  font-weight: 700;
}
"""
content = content.replace('/* Reduced Motion */', css_to_add + '\n/* Reduced Motion */')
content = content.replace('body{', 'body{ transition: background-color 1s ease; ')

# 5. Add GSAP Color Scroll JS
gsap_js = """
  // ─── GSAP COLOR SCROLL ───
  function initColorScroll() {
    // Array of sections and their corresponding luxury background colors
    const sections = [
      { id: '#hero', color: '#050505' },
      { id: '#servizi', color: '#0A0A0E' },
      { id: '.dashboard-section', color: '#050505' },
      { id: '.stats-section', color: '#0A0A0E' },
      { id: '#chi-sono', color: '#050505' },
      { id: '#come-funziona', color: '#0A0A0E' },
      { id: '#prezzi', color: '#0D0B05' }, // Very deep gold-tinted black
      { id: '#lavori', color: '#050505' },
      { id: '#contatto', color: '#0A0A0E' }
    ];

    sections.forEach(sec => {
      const el = document.querySelector(sec.id);
      if(el) {
        // Remove static backgrounds to let body color show through
        el.style.background = 'transparent';
        
        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => gsap.to('body', { backgroundColor: sec.color, duration: 1.5, ease: 'power2.out' }),
          onEnterBack: () => gsap.to('body', { backgroundColor: sec.color, duration: 1.5, ease: 'power2.out' })
        });
      }
    });
    
    // Ensure body starts with correct color
    document.body.style.backgroundColor = '#050505';
  }
"""

content = content.replace('// ─── INIT ───', gsap_js + '\n  // ─── INIT ───')
content = content.replace('initHeroOrbs();', 'initColorScroll();')

with open('index.html', 'w') as f:
    f.write(content)
