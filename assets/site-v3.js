(() => {
  'use strict';
  const doc = document;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = doc) => c.querySelector(s);
  const $$ = (s, c = doc) => [...c.querySelectorAll(s)];

  $$('[data-year]').forEach(el => el.textContent = String(new Date().getFullYear()));

  const menuButton = $('[data-menu-button]');
  const menu = $('[data-mobile-menu]');
  const menuPanel = menu?.querySelector('.mobile-menu__panel');
  const menuClose = $('[data-menu-close]');
  let lastFocus = null;

  function setMenu(open) {
    if (!menu || !menuButton) return;
    if (open) {
      lastFocus = doc.activeElement;
      menu.hidden = false;
      doc.body.classList.add('menu-open');
      menuButton.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(() => menuClose?.focus());
    } else {
      menu.hidden = true;
      doc.body.classList.remove('menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
      if (lastFocus instanceof HTMLElement) lastFocus.focus();
    }
  }
  menuButton?.addEventListener('click', () => setMenu(menu.hidden));
  menuClose?.addEventListener('click', () => setMenu(false));
  menu?.addEventListener('click', e => { if (e.target === menu) setMenu(false); });
  doc.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu && !menu.hidden) setMenu(false);
    if (e.key === 'Tab' && menu && !menu.hidden && menuPanel) {
      const focusable = $$('a,button,[tabindex]:not([tabindex="-1"])', menuPanel).filter(x => !x.hasAttribute('disabled'));
      if (!focusable.length) return;
      const first = focusable[0], last = focusable.at(-1);
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  const header = $('[data-header]');
  let previousY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    header?.classList.toggle('is-hidden', y > previousY && y > 180 && (!menu || menu.hidden));
    previousY = y;
  }, { passive: true });

  const reveal = $$('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveal.forEach(el => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    reveal.forEach(el => io.observe(el));
  }

  const partnerName = $('[data-partner-name]');
  const partnerOutput = $('[data-partner-output]');
  $('[data-partner-generate]')?.addEventListener('click', () => {
    const safe = (partnerName?.value || 'DEMO').trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4) || 'DEMO';
    let hash = 17;
    for (const c of safe) hash = (hash * 31 + c.charCodeAt(0)) % 9999;
    if (partnerOutput) partnerOutput.textContent = `ZA-${safe}-${String(hash).padStart(4, '0')}`;
  });

  const form = $('[data-project-form]');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const status = $('[data-form-status]', form);
    const required = ['name','activity','goal'];
    const missing = required.filter(k => !String(data.get(k) || '').trim());
    if (missing.length) {
      if (status) { status.textContent = 'Completa nome, attività e obiettivo.'; status.style.color = 'var(--danger)'; }
      form.querySelector(`[name="${missing[0]}"]`)?.focus();
      return;
    }
    const message = [
      'Ciao Marco, vorrei parlarti di un progetto.',
      `Nome: ${data.get('name')}`,
      `Attività: ${data.get('activity')}`,
      `Obiettivo: ${data.get('goal')}`,
      `Livello considerato: ${data.get('level') || 'da definire'}`,
      `Note: ${data.get('notes') || '—'}`
    ].join('\n');
    if (status) { status.textContent = 'Apro WhatsApp con il riepilogo. Nessun dato è stato salvato dal sito.'; status.style.color = 'var(--success)'; }
    window.open(`https://wa.me/393927950038?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });

  const pipeline = $('[data-pipeline]');
  if (pipeline) {
    const cards = $$('[data-pipeline-card]', pipeline);
    const buttons = $$('[data-pipeline-step]');
    let state = 0;
    const render = next => {
      state = Math.max(0, Math.min(cards.length - 1, next));
      cards.forEach((card, i) => {
        card.classList.toggle('is-active', i === state);
        card.classList.toggle('is-done', i < state);
        card.querySelector('[data-state]')?.replaceChildren(doc.createTextNode(i < state ? 'Completato' : i === state ? 'In lavorazione' : 'In attesa'));
      });
      buttons.forEach((b, i) => b.classList.toggle('is-active', i === state));
    };
    buttons.forEach((b, i) => b.addEventListener('click', () => render(i)));
    $('[data-pipeline-next]')?.addEventListener('click', () => render((state + 1) % cards.length));
    render(0);
  }

  const archOutput = $('[data-arch-output]');
  const architectures = {
    local: [['ARRIVAL','Home orientata al contatto'],['PROOF','Servizi, zona e lavori'],['ACTION','WhatsApp / chiamata'],['DISCOVERY','SEO locale'],['DATA','Analytics essenziali'],['CARE','Aggiornamento leggero']],
    commerce: [['DISCOVERY','Collezioni e ricerca'],['EVALUATION','Scheda prodotto'],['COMMERCE','Cart e checkout'],['TRUST','Spedizioni e resi'],['DATA','Catalogo / ordini'],['GROWTH','Email e retention']],
    system: [['ENTRY','Portale / login'],['WORKFLOW','Stati operativi'],['AUTOMATION','Trigger e azioni'],['DATA','API / database'],['CONTROL','Ruoli e permessi'],['OBSERVE','Log e metriche']]
  };
  function renderArchitecture(key) {
    if (!archOutput) return;
    archOutput.innerHTML = '';
    architectures[key].forEach(([type,label], i) => {
      const node = doc.createElement('article');
      node.className = `arch-node${i===0?' arch-node--primary':''}`;
      node.style.animationDelay = `${i*55}ms`;
      node.innerHTML = `<small>${type}</small><strong>${label}</strong>`;
      archOutput.appendChild(node);
    });
    $$('[data-arch-choice]').forEach(b => b.classList.toggle('is-active', b.dataset.archChoice === key));
  }
  $$('[data-arch-choice]').forEach(b => b.addEventListener('click', () => renderArchitecture(b.dataset.archChoice)));
  if (archOutput) renderArchitecture('local');

  const consoleEl = $('[data-automation-console]');
  let automationRun = 0;
  $('[data-run-automation]')?.addEventListener('click', async e => {
    e.currentTarget.disabled = true;
    automationRun += 1;
    const now = () => new Date().toLocaleTimeString('it-IT');
    const entries = [
      ['log--event',`[${now()}] TRIGGER  Nuova richiesta preventivo #${1000+automationRun}`],
      ['log',`[${now()}] CHECK    Consenso contatto: OK`],
      ['log',`[${now()}] ROUTE    Livello suggerito: CRESCITA`],
      ['log--ok',`[${now()}] ACTION   Scheda CRM creata`],
      ['log--ok',`[${now()}] ACTION   Riepilogo inviato al responsabile`],
      ['log--warn',`[${now()}] REVIEW   Decisione commerciale richiesta a una persona`]
    ];
    if (consoleEl) consoleEl.innerHTML = '';
    for (const [cls,text] of entries) {
      const line = doc.createElement('div'); line.className = `log ${cls}`; line.textContent = text;
      consoleEl?.appendChild(line);
      if (!reduceMotion) await new Promise(r => setTimeout(r, 280));
    }
    e.currentTarget.disabled = false;
  });
})();
