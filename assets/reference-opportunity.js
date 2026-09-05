(() => {
  'use strict';
  const doc = document;
  const $$ = (s, c = doc) => Array.from(c.querySelectorAll(s));

  const workflows = {
    inbox: {
      name: 'Email & richieste',
      steps: [
        ['TRIGGER','Nuova email / form'],
        ['CHECK','Campi minimi e consenso'],
        ['CLASSIFY','Intento e priorità'],
        ['HUMAN GATE','Revisione risposta'],
        ['OUTPUT','Bozza / instradamento']
      ],
      logs: [
        ['ok','Trigger ricevuto: richiesta digitale.'],
        ['ok','Controllo dati minimi: PASS.'],
        ['ok','Classificazione: preventivo / priorità normale.'],
        ['human','Human gate: la risposta richiede approvazione.'],
        ['ok','Output preparato: bozza + destinazione commerciale.']
      ]
    },
    documenti: {
      name: 'Documenti & preventivi',
      steps: [
        ['TRIGGER','Nuovo documento'],
        ['CHECK','Formato e completezza'],
        ['EXTRACT','Dati / campi utili'],
        ['HUMAN GATE','Conferma commerciale'],
        ['OUTPUT','Preventivo / task']
      ],
      logs: [
        ['ok','Documento dimostrativo acquisito.'],
        ['ok','Controllo struttura: documento leggibile.'],
        ['ok','Campi estratti: attività, obiettivo, scadenza.'],
        ['human','Human gate: prezzo e perimetro restano decisione umana.'],
        ['ok','Output preparato: scheda + task preventivo.']
      ]
    },
    social: {
      name: 'Contenuti social',
      steps: [
        ['TRIGGER','Nuovo video / asset'],
        ['CHECK','Formato, diritti, account'],
        ['PREPARE','Copy e varianti'],
        ['HUMAN GATE','Approvazione finale'],
        ['OUTPUT','Coda di pubblicazione']
      ],
      logs: [
        ['ok','Asset dimostrativo ricevuto.'],
        ['warn','Check richiesto: diritti e account autorizzati.'],
        ['ok','Varianti copy preparate secondo il canale.'],
        ['human','Human gate: contenuto e destinazione approvati.'],
        ['ok','Output simulato: pronto per la coda di pubblicazione.']
      ]
    }
  };

  $$('[data-automation-board]').forEach(board => {
    const controls = $$('[data-workflow]', board);
    const canvas = board.querySelector('[data-workflow-canvas]');
    const consoleEl = board.querySelector('[data-workflow-console]');
    const title = board.querySelector('[data-workflow-title]');
    const status = board.querySelector('[data-workflow-status]');
    const run = board.querySelector('[data-workflow-run]');
    const reset = board.querySelector('[data-workflow-reset]');
    let key = controls[0]?.dataset.workflow || 'inbox';
    let timer = 0;

    const clearTimer = () => { if (timer) { clearTimeout(timer); timer = 0; } };
    const paint = () => {
      const flow = workflows[key];
      if (!flow || !canvas || !consoleEl) return;
      title && (title.textContent = flow.name);
      status && (status.textContent = 'READY');
      canvas.innerHTML = flow.steps.map((s,i) => `<article class="op-node${s[0] === 'HUMAN GATE' ? ' is-human' : ''}" data-flow-node="${i}"><small>${s[0]}</small><strong>${s[1]}</strong></article>`).join('');
      consoleEl.innerHTML = '<div>Pronto. Avvia la simulazione.</div>';
    };
    const select = next => {
      clearTimer(); key = next;
      controls.forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.workflow === key)));
      paint();
    };
    const execute = () => {
      clearTimer();
      const flow = workflows[key];
      const nodes = $$('[data-flow-node]', canvas);
      consoleEl.innerHTML = '';
      status && (status.textContent = 'RUNNING');
      let i = 0;
      const step = () => {
        nodes.forEach((node,n) => {
          node.classList.toggle('is-active', n === i);
          node.classList.toggle('is-past', n < i);
        });
        if (flow.logs[i]) {
          const [kind,text] = flow.logs[i];
          const line = doc.createElement('div');
          line.className = kind;
          line.textContent = `[${String(i+1).padStart(2,'0')}] ${text}`;
          consoleEl.appendChild(line);
        }
        if (i >= nodes.length - 1) {
          status && (status.textContent = 'HUMAN-VERIFIED');
          timer = 0; return;
        }
        i += 1; timer = setTimeout(step, 520);
      };
      step();
    };
    controls.forEach(btn => btn.addEventListener('click', () => select(btn.dataset.workflow)));
    run?.addEventListener('click', execute);
    reset?.addEventListener('click', () => select(key));
    select(key);
  });

  $$('[data-deck]').forEach(deck => {
    const slides = $$('[data-slide]', deck);
    const prev = deck.querySelector('[data-deck-prev]');
    const next = deck.querySelector('[data-deck-next]');
    const bar = deck.querySelector('[data-deck-progress]');
    const count = deck.querySelector('[data-deck-count]');
    let index = 0;
    const show = i => {
      if (!slides.length) return;
      index = (i + slides.length) % slides.length;
      slides.forEach((slide,n) => {
        slide.classList.toggle('is-active', n === index);
        slide.setAttribute('aria-hidden', String(n !== index));
      });
      if (bar) bar.style.width = `${((index + 1) / slides.length) * 100}%`;
      if (count) count.textContent = `${String(index+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
    };
    prev?.addEventListener('click', () => show(index - 1));
    next?.addEventListener('click', () => show(index + 1));
    deck.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
      if (e.key === 'Home') { e.preventDefault(); show(0); }
      if (e.key === 'End') { e.preventDefault(); show(slides.length - 1); }
    });
    show(0);
  });
})();
