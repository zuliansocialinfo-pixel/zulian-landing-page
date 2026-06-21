import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logo from '../assets/logo.jpg';

const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    let timer;
    let timeoutId;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const finish = () => {
        if (doneRef.current) return;
        doneRef.current = true;
        onComplete?.();
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => setLoading(false),
        });
      };

      // Accessibilita': niente animazioni, mostra subito e chiudi.
      if (reduce) {
        gsap.set(['.circuit-trace', '.circuit-pad', '.axis-line', '.node', '.center-ring', logoRef.current, '.pl-text'], {
          opacity: 1,
          strokeDashoffset: 0,
          scale: 1,
        });
        timeoutId = setTimeout(finish, 800);
        return;
      }

      // --- Stati iniziali ---
      const traces = gsap.utils.toArray('.circuit-trace');
      const axes = gsap.utils.toArray('.axis-line');
      const secondary = gsap.utils.toArray('.axis-secondary');

      [...traces, ...axes, ...secondary].forEach((el) => {
        const len = el.getTotalLength();
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
      });
      gsap.set('.circuit-pad', { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
      gsap.set('.circuit-pad-glow', { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
      gsap.set('.node', { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
      gsap.set('.center-ring', { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' });
      gsap.set('.center-ring-inner', { opacity: 0, scale: 0.8, transformOrigin: '50% 50%' });
      gsap.set('.center-glow', { opacity: 0, scale: 0.3, transformOrigin: '50% 50%' });
      gsap.set(logoRef.current, { opacity: 0, scale: 0.1 });
      gsap.set('.pl-text', { opacity: 0, y: 12 });

      const tl = gsap.timeline();

      // Fase 1: Tracce circuito si accendono eleganti (0-0.65s)
      tl.to(traces, {
        strokeDashoffset: 0,
        duration: 0.65,
        ease: 'power1.inOut',
        stagger: 0.075,
      }, 0);

      // Pad si illuminano con effetto glow cascade (0.2-0.48s)
      tl.to('.circuit-pad', {
        opacity: 1,
        scale: 1,
        duration: 0.18,
        ease: 'back.out(2.8)',
        stagger: 0.04,
      }, 0.2);

      tl.to('.circuit-pad-glow', {
        opacity: 1,
        scale: 1.8,
        duration: 0.22,
        ease: 'power2.out',
        stagger: 0.04,
      }, 0.21, '<+0.02');

      // Fase 2: Assi primari si espandono dal centro (0.48-1.05s)
      tl.to(axes, {
        strokeDashoffset: 0,
        duration: 0.57,
        ease: 'power2.out',
        stagger: 0.045,
      }, 0.48);

      // Assi secondari sfumati appaiono (0.8-1.02s)
      tl.to(secondary, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.35,
        ease: 'sine.out',
        stagger: 0.06,
      }, 0.8);

      // Fase 3: Centro si illumina con glow tripled (0.95-1.28s)
      tl.to('.center-glow', {
        opacity: 1,
        scale: 1,
        duration: 0.33,
        ease: 'back.out(2.3)',
      }, 0.95);

      tl.to('.center-ring', {
        opacity: 1,
        scale: 1,
        duration: 0.28,
        ease: 'back.out(2.4)',
      }, 1.02);

      tl.to('.center-ring-inner', {
        opacity: 1,
        scale: 1,
        duration: 0.28,
        ease: 'back.out(2.4)',
      }, 1.06);

      // Fase 4: Nodi toggle pop sincronizzati (1.12-1.5s)
      tl.to('.node', {
        opacity: 1,
        scale: 1,
        duration: 0.38,
        ease: 'back.out(1.7)',
        stagger: 0.08,
      }, 1.12);

      // Fase 5: Logo emerge dal centro con scale pulito (1.0-1.7s)
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.4)',
      }, 1.0);

      // Fase 6: Testo finale sale e appare (1.4-1.9s)
      tl.to('.pl-text', {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out',
        stagger: 0.08,
      }, 1.4);

      // Timeline completa ~2.0s, trigger finish con minimo delay
      tl.add(() => {
        timeoutId = setTimeout(finish, 80);
      });
    }, rootRef);

    return () => {
      clearTimeout(timer);
      clearTimeout(timeoutId);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading) return null;

  // Geometria SVG: centro (180,180) per viewBox 360x360
  const C = 180;
  const tips = [
    { x: C, y: 25, tick: 'h' },   // alto
    { x: C, y: 335, tick: 'h' },  // basso
    { x: 25, y: C, tick: 'v' },   // sinistra
    { x: 335, y: C, tick: 'v' },  // destra
  ];

  return (
    <div
      ref={rootRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', width: '360px', height: '360px' }}>
        <svg
          viewBox="0 0 360 360"
          width="360"
          height="360"
          style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="goldTrace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(212,175,55,0.9)" />
              <stop offset="100%" stopColor="rgba(212,175,55,0.3)" />
            </linearGradient>
            <radialGradient id="glowCenter">
              <stop offset="0%" stopColor="rgba(212,175,55,0.6)" />
              <stop offset="100%" stopColor="rgba(212,175,55,0)" />
            </radialGradient>
          </defs>

          {/* Tracce di circuito con design piu' complesso (angoli + mediani) */}
          <path className="circuit-trace" d="M 15,65 L 75,65 L 100,90 L 125,90" stroke="url(#goldTrace)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path className="circuit-trace" d="M 345,100 L 275,100 L 250,125 L 225,125" stroke="url(#goldTrace)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path className="circuit-trace" d="M 25,265 L 85,265 L 110,240 L 135,240" stroke="url(#goldTrace)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path className="circuit-trace" d="M 345,260 L 275,260 L 250,235 L 225,235" stroke="url(#goldTrace)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path className="circuit-trace" d="M 60,15 L 60,70 L 85,95" stroke="url(#goldTrace)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path className="circuit-trace" d="M 300,345 L 300,290 L 275,265" stroke="url(#goldTrace)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

          {/* Pad circuito con effetto connessione */}
          {[[15,65],[345,100],[25,265],[345,260],[60,15],[300,345]].map(([x,y],i)=>(
            <g key={i}>
              <circle className="circuit-pad" cx={x} cy={y} r="3" fill="var(--accent-color)" opacity="0" />
              <circle className="circuit-pad-glow" cx={x} cy={y} r="6" fill="none" stroke="var(--accent-color)" strokeWidth="1" opacity="0" />
            </g>
          ))}

          {/* Due assi primari che si incontrano al centro */}
          <path className="axis-line" d={`M ${C},${C} L ${C},25`} stroke="var(--accent-color)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path className="axis-line" d={`M ${C},${C} L ${C},335`} stroke="var(--accent-color)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path className="axis-line" d={`M ${C},${C} L 25,${C}`} stroke="var(--accent-color)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path className="axis-line" d={`M ${C},${C} L 335,${C}`} stroke="var(--accent-color)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Assi secondari diagonali (sottili) */}
          <path className="axis-secondary" d={`M ${C},${C} L 40,40`} stroke="rgba(212,175,55,0.3)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0" />
          <path className="axis-secondary" d={`M ${C},${C} L 280,40`} stroke="rgba(212,175,55,0.3)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0" />
          <path className="axis-secondary" d={`M ${C},${C} L 40,280`} stroke="rgba(212,175,55,0.3)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0" />
          <path className="axis-secondary" d={`M ${C},${C} L 280,280`} stroke="rgba(212,175,55,0.3)" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0" />

          {/* Anello pulsante al punto d'incontro con doppio livello */}
          <circle className="center-ring" cx={C} cy={C} r="90" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" opacity="0" />
          <circle className="center-ring-inner" cx={C} cy={C} r="60" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="1" opacity="0" />

          {/* Nodi / toggle alle estremita' */}
          {tips.map((t, i) => (
            <g className="node" key={i}>
              <circle cx={t.x} cy={t.y} r="13" fill="var(--bg-color)" stroke="var(--accent-color)" strokeWidth="2" />
              <circle cx={t.x} cy={t.y} r="19" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
              {t.tick === 'h' ? (
                <line x1={t.x - 6} y1={t.y} x2={t.x + 6} y2={t.y} stroke="var(--accent-color)" strokeWidth="2.5" strokeLinecap="round" />
              ) : (
                <line x1={t.x} y1={t.y - 6} x2={t.x} y2={t.y + 6} stroke="var(--accent-color)" strokeWidth="2.5" strokeLinecap="round" />
              )}
            </g>
          ))}

          {/* Decorazione centrale con glow */}
          <circle className="center-glow" cx={C} cy={C} r="110" fill="url(#glowCenter)" opacity="0" />
        </svg>

        {/* Logo INTERO che emerge dal centro (non ritagliato) */}
        <div
          ref={logoRef}
          className="logo-container"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '200px',
            height: '200px',
            marginTop: '-100px',
            marginLeft: '-100px',
            borderRadius: '18px',
            overflow: 'hidden',
            background: 'var(--bg-color)',
            border: '2px solid rgba(212,175,55,0.5)',
            boxShadow: '0 0 40px rgba(212,175,55,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={logo} alt="Zulian Social Media Marketing" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      </div>

      {/* Solo il claim sotto: il nome e' gia' dentro il logo */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p className="pl-text" style={{ marginTop: 0, fontStyle: 'italic', color: 'var(--text-primary)', maxWidth: '360px', fontSize: '1.1rem', letterSpacing: '0.5px' }}>
          "La strategia vincente, fatta su misura."
        </p>
      </div>
    </div>
  );
};

export default Preloader;
