(() => {
  'use strict';
  const doc = document;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$ = (s, c = doc) => Array.from(c.querySelectorAll(s));

  $$('[data-tier-stage]').forEach(stage => {
    const controls = $$('[data-tier-control]', stage);
    const panels = $$('[data-tier-panel]', stage);
    if (!controls.length || !panels.length) return;
    const activate = key => {
      controls.forEach(btn => {
        const active = btn.dataset.tierControl === key;
        btn.setAttribute('aria-selected', String(active));
        btn.classList.toggle('is-active', active);
        btn.tabIndex = active ? 0 : -1;
      });
      panels.forEach(panel => panel.classList.toggle('is-active', panel.dataset.tierPanel === key));
    };
    controls.forEach(btn => {
      btn.addEventListener('click', () => activate(btn.dataset.tierControl));
      btn.addEventListener('keydown', e => {
        if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(e.key)) return;
        e.preventDefault();
        const i = controls.indexOf(btn);
        const next = e.key === 'Home' ? 0 : e.key === 'End' ? controls.length - 1 :
          (i + (e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 1) + controls.length) % controls.length;
        controls[next].focus();
        activate(controls[next].dataset.tierControl);
      });
    });
    activate((controls.find(b => b.getAttribute('aria-selected') === 'true') || controls[0]).dataset.tierControl);
  });

  $$('[data-architecture-sequence]').forEach(sequence => {
    const buttons = $$('[data-architecture-step]', sequence);
    const nodes = $$('[data-arch-node]', sequence);
    const activate = index => {
      buttons.forEach((btn,i) => btn.setAttribute('aria-pressed', String(i === index)));
      nodes.forEach((node,i) => {
        node.classList.toggle('is-active', i === index);
        node.classList.toggle('is-past', i < index);
      });
    };
    buttons.forEach((btn,i) => btn.addEventListener('click', () => activate(i)));
    activate(0);
  });

  $$('[data-model-switcher]').forEach(switcher => {
    const controls = $$('[data-model]', switcher);
    const panels = $$('[data-model-panel]', switcher);
    const activate = key => {
      controls.forEach(btn => btn.classList.toggle('is-active', btn.dataset.model === key));
      panels.forEach(panel => panel.classList.toggle('is-active', panel.dataset.modelPanel === key));
    };
    controls.forEach(btn => btn.addEventListener('click', () => activate(btn.dataset.model)));
    if (controls[0]) activate(controls[0].dataset.model);
  });

  const method = doc.querySelector('[data-method-system]');
  if (method && !reduceMotion && 'IntersectionObserver' in window) {
    const steps = $$('.rc-method-steps li', method);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      steps.forEach(step => step.classList.toggle('is-active', step === visible.target));
    }, {threshold:[.35,.6,.85], rootMargin:'-20% 0px -45% 0px'});
    steps.forEach(step => observer.observe(step));
  }

  const certDialog = doc.querySelector('[data-cert-dialog]');
  if (certDialog) {
    const img = certDialog.querySelector('[data-cert-dialog-image]');
    const caption = certDialog.querySelector('[data-cert-dialog-caption]');
    $$('[data-cert-open]').forEach(btn => btn.addEventListener('click', () => {
      const source = btn.querySelector('img');
      if (!source || !img) return;
      img.src = source.src;
      img.alt = source.alt;
      if (caption) caption.textContent = source.alt;
      if (typeof certDialog.showModal === 'function') certDialog.showModal();
    }));
    certDialog.querySelector('[data-cert-close]')?.addEventListener('click', () => certDialog.close());
    certDialog.addEventListener('click', e => {
      if (e.target === certDialog) certDialog.close();
    });
  }

  const baseHero = doc.querySelector('.rc-home-hero');
  let heroSystem = null;
  if (baseHero && !baseHero.closest('[data-hero-system]')) {
    const wrap = doc.createElement('div');
    wrap.className = 'rc-home-hero-wrap';
    wrap.setAttribute('data-hero-system', '');
    const sticky = doc.createElement('div');
    sticky.className = 'rc-home-hero-stick';
    const spacer = doc.createElement('div');
    spacer.className = 'rc-home-hero-empty';
    spacer.setAttribute('aria-hidden', 'true');
    baseHero.parentNode.insertBefore(wrap, baseHero);
    sticky.appendChild(baseHero);
    wrap.append(sticky, spacer);
    baseHero.querySelector('.rc-ambient')?.setAttribute('hidden', '');
    baseHero.insertAdjacentHTML('afterbegin', `<div class="rc-hero-field" aria-hidden="true"><div class="rc-hero-sphere"><div class="rc-hero-shadow rc-hero-shadow--blue"></div><div class="rc-hero-shadow rc-hero-shadow--cyan"></div><div class="rc-hero-shadow rc-hero-shadow--deep"></div><svg class="rc-hero-network" viewBox="0 0 800 800" role="presentation"><defs><radialGradient id="heroSphere" cx="38%" cy="32%" r="72%"><stop offset="0" stop-color="#296cff" stop-opacity=".72"/><stop offset=".42" stop-color="#0b2d8d" stop-opacity=".46"/><stop offset="1" stop-color="#050b16" stop-opacity=".98"/></radialGradient><linearGradient id="heroLine" x1="0" x2="1"><stop stop-color="#6ea8ff"/><stop offset="1" stop-color="#5de0d0"/></linearGradient><filter id="heroGlow"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><circle class="rc-hero-surface" cx="400" cy="400" r="304" fill="url(#heroSphere)"/><circle class="rc-hero-ring rc-hero-ring--a" cx="400" cy="400" r="252"/><circle class="rc-hero-ring rc-hero-ring--b" cx="400" cy="400" r="184"/><path class="rc-hero-line rc-hero-line--1" d="M224 330C300 250 364 248 424 326S534 478 604 428"/><path class="rc-hero-line rc-hero-line--2" d="M246 506C312 450 332 388 402 392S526 328 586 278"/><path class="rc-hero-line rc-hero-line--3" d="M302 228C344 312 446 336 518 254"/><g class="rc-hero-points" filter="url(#heroGlow)"><circle cx="224" cy="330" r="8"/><circle cx="302" cy="228" r="8"/><circle cx="402" cy="392" r="10"/><circle cx="518" cy="254" r="8"/><circle cx="586" cy="278" r="8"/><circle cx="604" cy="428" r="8"/><circle cx="246" cy="506" r="8"/></g></svg><div class="rc-hero-core"><img src="zulian-mark.svg" alt="" aria-hidden="true"></div><div class="rc-hero-chip rc-hero-chip--outcome"><span>01</span><strong>OUTCOME</strong></div><div class="rc-hero-chip rc-hero-chip--audience"><span>02</span><strong>AUDIENCE</strong></div><div class="rc-hero-chip rc-hero-chip--content"><span>03</span><strong>CONTENT</strong></div><div class="rc-hero-chip rc-hero-chip--proof"><span>04</span><strong>PROOF</strong></div><div class="rc-hero-chip rc-hero-chip--build"><span>05</span><strong>BUILD</strong></div><div class="rc-hero-chip rc-hero-chip--verify"><span>06</span><strong>VERIFY</strong></div></div></div>`);
    baseHero.insertAdjacentHTML('beforeend', `<div class="rc-hero-scroll" aria-hidden="true"><span>Scroll / esplora il sistema</span><i></i></div><div class="rc-hero-transition" aria-hidden="true"></div>`);
    heroSystem = wrap;
  } else {
    heroSystem = baseHero?.closest('[data-hero-system]') || null;
  }

  if (heroSystem && !reduceMotion && matchMedia('(min-width: 901px)').matches) {
    let frame = 0;
    const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
    const smooth = t => t * t * (3 - 2 * t);
    const renderHero = () => {
      frame = 0;
      const max = Math.max(1, heroSystem.offsetHeight - innerHeight);
      const rect = heroSystem.getBoundingClientRect();
      const p = clamp(-rect.top / max);
      const expand = smooth(clamp((p - .18) / .52));
      const exit = smooth(clamp((p - .68) / .32));
      heroSystem.style.setProperty('--hero-progress', p.toFixed(4));
      heroSystem.style.setProperty('--hero-sphere-x', `${(-10 * expand - 5 * exit).toFixed(2)}vw`);
      heroSystem.style.setProperty('--hero-sphere-y', `${(2 * expand - 4 * exit).toFixed(2)}vh`);
      heroSystem.style.setProperty('--hero-sphere-scale', (1 + .16 * expand + .28 * exit).toFixed(4));
      heroSystem.style.setProperty('--hero-sphere-rotate', `${(-8 + 18 * p).toFixed(2)}deg`);
      heroSystem.style.setProperty('--hero-chip-opacity', (.12 + .72 * smooth(clamp((p - .08) / .42)) - .28 * exit).toFixed(3));
      heroSystem.style.setProperty('--hero-line-offset', String(Math.round(160 - 155 * smooth(clamp((p - .05) / .62)))));
      heroSystem.style.setProperty('--hero-text-opacity', (1 - .82 * exit).toFixed(3));
      heroSystem.style.setProperty('--hero-text-y', `${(-18 * exit).toFixed(2)}px`);
      heroSystem.style.setProperty('--hero-rail-opacity', (1 - .96 * smooth(clamp((p - .58) / .25))).toFixed(3));
      heroSystem.style.setProperty('--hero-veil-y', `${(100 - 100 * smooth(clamp((p - .82) / .18))).toFixed(2)}%`);
    };
    const requestHero = () => { if (!frame) frame = requestAnimationFrame(renderHero); };
    addEventListener('scroll', requestHero, { passive: true });
    addEventListener('resize', requestHero, { passive: true });
    renderHero();
  }

})();
