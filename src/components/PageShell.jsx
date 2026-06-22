import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ACCENTS, GOLD, tweenAccent } from '../theme';

/**
 * Contenitore comune di ogni pagina interna:
 * - imposta il colore-accento della pagina (vira luci/cursore/bottoni)
 * - intestazione con occhiello, titolo grande (reveal a maschera) e sottotitolo
 * - link "Torna alla home"
 * - animazione d'ingresso del contenuto
 */
const PageShell = ({ accentKey, kicker, title, subtitle, children }) => {
  const rootRef = useRef(null);

  useEffect(() => {
    const color = ACCENTS[accentKey] || GOLD;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.ps-line, .ps-anim', { yPercent: 0, opacity: 1, y: 0 });
      } else {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.ps-kicker', { y: -16, opacity: 0, duration: 0.5 }, 0.1)
          .from('.ps-line', { yPercent: 115, duration: 0.9, stagger: 0.12, ease: 'power4.out' }, 0.18)
          .from('.ps-sub', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
          .from('.ps-body', { y: 26, opacity: 0, duration: 0.7 }, '-=0.3');
      }
    }, rootRef);

    const t = tweenAccent(gsap, color, 0.8);

    return () => {
      ctx.revert();
      t && t.kill();
    };
  }, [accentKey]);

  return (
    <div ref={rootRef} className="page-shell" style={{ minHeight: '100vh', paddingTop: '120px', paddingBottom: '5rem', position: 'relative' }}>
      <div className="container">
        <Link to="/" className="ps-back ps-anim">
          <ArrowLeft size={18} />
          Torna alla home
        </Link>

        <div className="ps-head" style={{ marginTop: '1.6rem', marginBottom: '3rem' }}>
          {kicker && (
            <span className="ps-kicker" style={{ color: 'var(--accent-color)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', display: 'inline-block', marginBottom: '1rem' }}>
              {kicker}
            </span>
          )}
          <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', lineHeight: 1.05, fontWeight: 800, marginBottom: subtitle ? '1.2rem' : 0 }}>
            <span className="line-mask"><span className="ps-line" style={{ display: 'block' }}>{title}</span></span>
          </h1>
          {subtitle && (
            <p className="ps-sub" style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1.05rem, 3vw, 1.3rem)', maxWidth: '720px', lineHeight: 1.6, fontWeight: 500 }}>
              {subtitle}
            </p>
          )}
        </div>

        <div className="ps-body">{children}</div>

        <div style={{ marginTop: '4rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-secondary">
            <ArrowLeft size={18} style={{ marginRight: '0.5rem' }} />
            Torna alla home
          </Link>
          <Link to="/prezzi" className="btn-primary">
            Vedi i prezzi
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageShell;
