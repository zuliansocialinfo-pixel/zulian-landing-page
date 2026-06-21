import React, { useEffect, useRef } from 'react';

/**
 * Sfondo "galassia" su canvas per la Hero.
 * - Campo stellare a piu' livelli di profondita' (parallax).
 * - Lenta rotazione/drift dell'intera galassia.
 * - Parallax sul movimento del mouse (desktop).
 * - Stelle cadenti occasionali.
 * - Nebulose dorate sfumate (gradienti radiali).
 * - Colore stelle legato a --accent-color (cambia con il tema/le luci).
 * Performante: un solo requestAnimationFrame, niente DOM per le particelle.
 * Rispetta prefers-reduced-motion e alleggerisce su mobile.
 */
const GalaxyBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars = [];
    let shootingStars = [];
    let raf = 0;
    let running = true;

    // Legge l'accento corrente come rgb per colorare alcune stelle
    const getAccent = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent-color').trim() || '#d4af37';
      return raw;
    };
    let accent = getAccent();

    // Parallax mouse
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const STAR_COUNT = isMobile ? 90 : 220;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        const depth = Math.random(); // 0 = lontano, 1 = vicino
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: depth,
          r: 0.4 + depth * 1.6,
          baseAlpha: 0.25 + depth * 0.6,
          tw: Math.random() * Math.PI * 2,       // fase twinkle
          twSpeed: 0.6 + Math.random() * 1.4,
          gold: Math.random() < 0.28,            // alcune stelle dorate
        });
      }
    };

    const spawnShootingStar = () => {
      const fromLeft = Math.random() < 0.5;
      const startX = fromLeft ? -50 : width + 50;
      const startY = Math.random() * height * 0.5;
      const angle = fromLeft ? Math.PI / 5 : Math.PI - Math.PI / 5;
      const speed = 9 + Math.random() * 6;
      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 60 + Math.random() * 30,
        len: 80 + Math.random() * 120,
      });
    };

    // Centro galassia per drift rotazionale
    let angle = 0;

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      // Inerzia parallax
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      if (!reduce) angle += 0.00035;

      const cx = width / 2;
      const cy = height / 2;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Rotazione lenta attorno al centro (drift galattico)
        const dx = s.x - cx;
        const dy = s.y - cy;
        let rx = cx + dx * cosA - dy * sinA;
        let ry = cy + dx * sinA + dy * cosA;

        // Parallax mouse in base alla profondita'
        rx += mouse.x * s.z * 0.04;
        ry += mouse.y * s.z * 0.04;

        // Twinkle
        if (!reduce) s.tw += 0.016 * s.twSpeed;
        const twinkle = 0.65 + Math.sin(s.tw) * 0.35;
        const alpha = s.baseAlpha * twinkle;

        ctx.beginPath();
        ctx.arc(rx, ry, s.r, 0, Math.PI * 2);
        if (s.gold) {
          ctx.fillStyle = hexToRgba(accent, alpha);
          ctx.shadowColor = accent;
          ctx.shadowBlur = 6 * s.z;
        } else {
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Stelle cadenti
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life++;
        const t = ss.life / ss.maxLife;
        const a = Math.sin(t * Math.PI); // fade in/out
        const tailX = ss.x - ss.vx * (ss.len / 12);
        const tailY = ss.y - ss.vy * (ss.len / 12);
        const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        grad.addColorStop(0, hexToRgba(accent, a));
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        if (ss.life >= ss.maxLife || ss.x < -100 || ss.x > width + 100) {
          shootingStars.splice(i, 1);
        }
      }

      // Refresh accent ogni tanto (cambia coi click/temi)
      raf = requestAnimationFrame(draw);
    };

    // Stella cadente a intervalli casuali
    let shootTimer = 0;
    const scheduleShoot = () => {
      if (reduce) return;
      shootTimer = window.setTimeout(() => {
        if (running) spawnShootingStar();
        scheduleShoot();
      }, 2500 + Math.random() * 4000);
    };

    // Aggiorna accent quando cambia la CSS var (click/temi)
    let accentTimer = window.setInterval(() => {
      accent = getAccent();
    }, 600);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left - width / 2);
      mouse.ty = (e.clientY - rect.top - height / 2);
    };

    const hexToRgba = (hex, a) => {
      let h = hex.replace('#', '');
      if (h.length === 3) h = h.split('').map((c) => c + c).join('');
      const n = parseInt(h, 16);
      const r = (n >> 16) & 255;
      const g = (n >> 8) & 255;
      const b = n & 255;
      return `rgba(${r},${g},${b},${a})`;
    };

    resize();
    initStars();
    draw();
    scheduleShoot();
    if (!isMobile) window.addEventListener('mousemove', onMouseMove);
    const onResize = () => { resize(); initStars(); };
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(shootTimer);
      clearInterval(accentTimer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Nebulose dorate sfumate dietro le stelle */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: '60%',
          height: '70%',
          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.10) 0%, transparent 65%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '65%',
          height: '75%',
          background: 'radial-gradient(ellipse at center, rgba(120,90,220,0.10) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '20%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle at center, rgba(212,175,55,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
};

export default GalaxyBackground;
