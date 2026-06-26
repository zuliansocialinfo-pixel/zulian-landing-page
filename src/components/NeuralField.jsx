import React, { useEffect, useMemo, useRef } from 'react';

/**
 * Sfondo Hero unico: una RETE NEURALE / campo di segnali interattivo.
 * - Nodi che derivano lentamente e si collegano fra loro (linee per vicinanza).
 * - Il MOUSE è un nodo attivo: attira i nodi vicini, ci si collega con linee
 *   più luminose e proietta un alone che lo segue -> "vivo, segue il cursore".
 * - Ripple al click.
 * - DIVERSO PER OGNI SESSIONE: palette, densità e velocità vengono scelte a
 *   caso e memorizzate in sessionStorage (stabili nella stessa visita,
 *   diverse alla sessione successiva).
 * Performante: un solo requestAnimationFrame, canvas. Rispetta
 * prefers-reduced-motion (render statico) e alleggerisce su mobile.
 */

// Varianti di sfondo: ognuna ha una sua personalità (colori/densità/velocità).
const VARIANTS = [
  { name: 'cyan-violet', primary: [34, 211, 238], secondary: [139, 92, 246], density: 1.0, speed: 1.0 },
  { name: 'emerald-teal', primary: [16, 185, 129], secondary: [45, 212, 191], density: 1.15, speed: 0.85 },
  { name: 'fuchsia-pink', primary: [217, 70, 239], secondary: [244, 114, 182], density: 0.9, speed: 1.1 },
  { name: 'amber-orange', primary: [245, 158, 11], secondary: [249, 115, 22], density: 0.85, speed: 1.2 },
  { name: 'sky-indigo', primary: [56, 189, 248], secondary: [99, 102, 241], density: 1.1, speed: 0.9 },
  { name: 'rose-red', primary: [244, 63, 94], secondary: [251, 113, 133], density: 1.0, speed: 1.05 },
  { name: 'lime-green', primary: [132, 204, 22], secondary: [34, 197, 94], density: 1.2, speed: 0.8 },
];

const pickVariant = () => {
  try {
    const saved = sessionStorage.getItem('heroBgVariant');
    if (saved !== null && VARIANTS[+saved]) return VARIANTS[+saved];
    const idx = Math.floor(Math.random() * VARIANTS.length);
    sessionStorage.setItem('heroBgVariant', String(idx));
    return VARIANTS[idx];
  } catch (e) {
    return VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
  }
};

const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

const NeuralField = () => {
  const canvasRef = useRef(null);
  const variant = useMemo(pickVariant, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    const primary = variant.primary;
    const secondary = variant.secondary;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes = [];
    let ripples = [];
    let raf = 0;
    let running = true;

    const NODE_COUNT = Math.round((isMobile ? 46 : 92) * variant.density);
    const LINK_DIST = isMobile ? 120 : 150;
    const MOUSE_DIST = isMobile ? 150 : 220;

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35 * variant.speed,
          vy: (Math.random() - 0.5) * 0.35 * variant.speed,
          r: 1 + Math.random() * 1.6,
          alt: Math.random() < 0.33,
        });
      }
    };

    const drawLinks = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const o = (1 - Math.sqrt(d2) / LINK_DIST) * 0.28;
            ctx.strokeStyle = rgba(primary, o);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    const drawNodes = () => {
      for (const n of nodes) {
        const c = n.alt ? secondary : primary;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(c, 0.85);
        ctx.fill();
      }
    };

    const render = (animate) => {
      ctx.clearRect(0, 0, width, height);

      if (animate) {
        mouse.x += (mouse.tx - mouse.x) * 0.14;
        mouse.y += (mouse.ty - mouse.y) * 0.14;

        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = width + 20; else if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20; else if (n.y > height + 20) n.y = -20;

          if (mouse.active) {
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < MOUSE_DIST * MOUSE_DIST && d2 > 1) {
              const d = Math.sqrt(d2);
              const f = (1 - d / MOUSE_DIST) * 0.7;
              n.x += (dx / d) * f;
              n.y += (dy / d) * f;
            }
          }
        }
      }

      drawLinks();

      if (mouse.active) {
        for (const n of nodes) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_DIST * MOUSE_DIST) {
            const o = 1 - Math.sqrt(d2) / MOUSE_DIST;
            ctx.strokeStyle = rgba(primary, o * 0.55);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_DIST);
        g.addColorStop(0, rgba(primary, 0.16));
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_DIST, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = rgba(primary, 0.95);
        ctx.fill();
      }

      drawNodes();

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        if (animate) { rp.r += 6; rp.life -= 1; }
        const o = Math.max(0, rp.life / rp.max);
        ctx.strokeStyle = rgba(primary, o * 0.5);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
        if (rp.life <= 0) ripples.splice(i, 1);
      }
    };

    const loop = () => {
      if (!running) return;
      render(true);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
      mouse.active = true;
      if (mouse.x < -1000) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
    };
    const onLeave = () => { mouse.active = false; };
    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, r: 0, life: 42, max: 42 });
    };

    resize();
    init();
    if (reduce) {
      render(false);
    } else {
      loop();
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseleave', onLeave);
      window.addEventListener('click', onClick);
    }
    const onResize = () => { resize(); init(); if (reduce) render(false); };
    window.addEventListener('resize', onResize);
    const onVis = () => {
      running = !document.hidden;
      if (running && !reduce) { raf = requestAnimationFrame(loop); }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [variant]);

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: '-15%', left: '-10%', width: '60%', height: '70%', background: `radial-gradient(ellipse at center, ${rgba(variant.primary, 0.1)} 0%, transparent 65%)`, filter: 'blur(60px)' }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '65%', height: '75%', background: `radial-gradient(ellipse at center, ${rgba(variant.secondary, 0.1)} 0%, transparent 65%)`, filter: 'blur(70px)' }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
};

export default NeuralField;
