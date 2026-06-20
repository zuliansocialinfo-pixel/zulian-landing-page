import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import logo from '../assets/logo.jpg';

/**
 * Intro "circuito": prima si accendono le tracce di circuito, poi due assi
 * (X e Y) si incontrano al centro, compaiono i nodi/toggle alle estremita',
 * e dal punto d'incontro emerge il logo. Tutto orchestrato con GSAP.
 *
 * Robusto: la timeline arriva SEMPRE a uno stato finale visibile, il timer di
 * uscita viene pulito correttamente (anche in StrictMode) e gli stati iniziali
 * sono impostati con gsap.set per evitare flash.
 */
const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true);
  const rootRef = useRef(null);
  const logoRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    let timer;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const finish = () => {
        if (doneRef.current) return;
        doneRef.current = true;
        onComplete?.();
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.6,
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
        timer = setTimeout(finish, 900);
        return;
      }

      // --- Stati iniziali ---
      const traces = gsap.utils.toArray('.circuit-trace');
      const axes = gsap.utils.toArray('.axis-line');
      [...traces, ...axes].forEach((el) => {
        const len = el.getTotalLength();
        gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
      });
      gsap.set('.circuit-pad', { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
      gsap.set('.node', { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
      gsap.set('.center-ring', { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' });
      gsap.set(logoRef.current, { opacity: 0, scale: 0.3 });
      gsap.set('.pl-text', { opacity: 0, y: 14 });

      const tl = gsap.timeline({ onComplete: () => { timer = setTimeout(finish, 500); } });

      // 1) Le tracce di circuito si "accendono" dai bordi
      tl.to(traces, {
        strokeDashoffset: 0,
        duration: 0.7,
        ease: 'power2.inOut',
        stagger: 0.08,
      }, 0);

      // I pad si illuminano lungo le tracce
      tl.to('.circuit-pad', {
        opacity: 0.9,
        scale: 1,
        duration: 0.3,
        ease: 'back.out(2)',
        stagger: 0.06,
      }, 0.2);

      // 2) I due assi si disegnano dal centro verso le estremita' (si incontrano)
      tl.to(axes, {
        strokeDashoffset: 0,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.05,
      }, 0.5);

      // 3) Flash al punto d'incontro
      tl.to('.center-ring', {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(2)',
      }, 0.95);

      // 4) I nodi/toggle scattano alle estremita'
      tl.to('.node', {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: 'back.out(1.8)',
        stagger: 0.07,
      }, 1.05);

      // 5) Dal centro emerge il logo
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.4)',
      }, 1.35);

      // 6) Il testo sale in dissolvenza
      tl.to('.pl-text', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.12,
      }, 1.6);

      // Loop ambientali (non bloccano la chiusura)
      gsap.to('.center-ring', {
        scale: 1.15,
        opacity: 0.6,
        duration: 1.6,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.4,
      });
      gsap.to('.node', {
        opacity: 0.65,
        duration: 1.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.25, from: 'random' },
        delay: 1.6,
      });
    }, rootRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading) return null;

  // Geometria SVG: centro (160,160), assi che si incontrano al centro.
  const C = 160;
  const tips = [
    { x: C, y: 28, tick: 'h' },   // alto
    { x: C, y: 292, tick: 'h' },  // basso
    { x: 28, y: C, tick: 'v' },   // sinistra
    { x: 292, y: C, tick: 'v' },  // destra
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
      <div style={{ position: 'relative', width: '320px', height: '320px' }}>
        <svg
          viewBox="0 0 320 320"
          width="320"
          height="320"
          style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="goldTrace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(212,175,55,0.85)" />
              <stop offset="100%" stopColor="rgba(212,175,55,0.25)" />
            </linearGradient>
          </defs>

          {/* Tracce di circuito decorative (angoli) */}
          <path className="circuit-trace" d="M 20,60 L 70,60 L 90,80 L 110,80" stroke="url(#goldTrace)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path className="circuit-trace" d="M 300,90 L 250,90 L 232,108 L 210,108" stroke="url(#goldTrace)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path className="circuit-trace" d="M 30,250 L 80,250 L 100,230 L 120,230" stroke="url(#goldTrace)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path className="circuit-trace" d="M 296,240 L 246,240 L 226,220 L 206,220" stroke="url(#goldTrace)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path className="circuit-trace" d="M 60,20 L 60,55 L 80,75" stroke="url(#goldTrace)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path className="circuit-trace" d="M 260,300 L 260,265 L 240,245" stroke="url(#goldTrace)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Piccoli pad di circuito */}
          {[[20,60],[300,90],[30,250],[296,240],[60,20],[260,300]].map(([x,y],i)=>(
            <rect key={i} className="circuit-pad" x={x-2.5} y={y-2.5} width="5" height="5" rx="1" fill="var(--accent-color)" />
          ))}

          {/* Due assi che si incontrano al centro (disegnati dal centro) */}
          <path className="axis-line" d={`M ${C},${C} L ${C},28`} stroke="var(--accent-color)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path className="axis-line" d={`M ${C},${C} L ${C},292`} stroke="var(--accent-color)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path className="axis-line" d={`M ${C},${C} L 28,${C}`} stroke="var(--accent-color)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path className="axis-line" d={`M ${C},${C} L 292,${C}`} stroke="var(--accent-color)" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Nodi / toggle alle estremita' */}
          {tips.map((t, i) => (
            <g className="node" key={i}>
              <circle cx={t.x} cy={t.y} r="11" fill="var(--bg-color)" stroke="var(--accent-color)" strokeWidth="1.5" />
              {t.tick === 'h' ? (
                <line x1={t.x - 5} y1={t.y} x2={t.x + 5} y2={t.y} stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <line x1={t.x} y1={t.y - 5} x2={t.x} y2={t.y + 5} stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" />
              )}
            </g>
          ))}

          {/* Anello pulsante al punto d'incontro */}
          <circle className="center-ring" cx={C} cy={C} r="78" fill="none" stroke="rgba(212,175,55,0.5)" strokeWidth="1" />
        </svg>

        {/* Logo che emerge dal centro */}
        <div
          ref={logoRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '128px',
            height: '128px',
            marginTop: '-64px',
            marginLeft: '-64px',
            borderRadius: '50%',
            overflow: 'hidden',
            background: 'var(--bg-color)',
            border: '2px solid rgba(212,175,55,0.5)',
            boxShadow: '0 0 28px rgba(212,175,55,0.45)',
          }}
        >
          <img src={logo} alt="Zulian Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* Testo */}
      <div style={{ textAlign: 'center', marginTop: '1.8rem' }}>
        <h1 className="pl-text" style={{ color: 'var(--accent-color)', fontSize: '1.8rem', letterSpacing: '4px', marginBottom: '0.4rem' }}>
          ZULIAN
        </h1>
        <p className="pl-text" style={{ color: 'var(--text-secondary)', letterSpacing: '3px', fontSize: '0.82rem', textTransform: 'uppercase' }}>
          Social Media Marketing
        </p>
        <p className="pl-text" style={{ marginTop: '1.1rem', fontStyle: 'italic', color: 'var(--text-primary)', maxWidth: '340px', fontSize: '0.95rem' }}>
          "La strategia vincente, fatta su misura."
        </p>
      </div>
    </div>
  );
};

export default Preloader;
