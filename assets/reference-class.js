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
})();
