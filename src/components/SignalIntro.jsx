import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * "Segnali di sistema": un readout in stile HUD/terminale che fa scorrere
 * frasi strategiche, come l'output di un motore di analisi. Da' subito la
 * sensazione di tecnologia/AI prima ancora di leggere il claim.
 * Rispetta prefers-reduced-motion (mostra la prima frase, ferma).
 */
const SIGNALS = [
  'Strategia rilevata',
  'Segnali di crescita in analisi',
  'Audience · contenuto · timing sincronizzati',
  'Creatività trasformata in sistema',
  'Innovazione pronta all’impatto',
];

const SignalIntro = () => {
  const [i, setI] = useState(0);
  const reduce = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (reduce.current) return;
    const id = window.setInterval(() => {
      setI((v) => (v + 1) % SIGNALS.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="signal-intro"
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.7rem',
        padding: '0.45rem 1.1rem',
        marginBottom: '1.4rem',
        borderRadius: '999px',
        border: '1px solid rgba(255,255,255,0.10)',
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(6px)',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: 'clamp(0.66rem, 2.2vw, 0.78rem)',
        letterSpacing: '0.5px',
        color: 'var(--text-secondary)',
        maxWidth: '92vw',
      }}
    >
      {/* Indicatore di stato pulsante */}
      <span className="signal-dot" style={{
        width: 8, height: 8, borderRadius: '50%',
        background: 'var(--accent-color)',
        boxShadow: '0 0 10px var(--accent-color)',
        flexShrink: 0,
      }} />
      <span style={{ color: 'var(--accent-color)', fontWeight: 600, flexShrink: 0 }}>SYS</span>
      <span style={{ opacity: 0.5, flexShrink: 0 }}>›</span>
      <span style={{ position: 'relative', overflow: 'hidden', whiteSpace: 'nowrap', minWidth: 0 }}>
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'inline-block', color: 'var(--text-primary)' }}
          >
            {SIGNALS[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      {/* Cursore lampeggiante */}
      <span className="signal-caret" style={{
        width: 7, height: '1em',
        background: 'var(--accent-color)',
        flexShrink: 0,
        opacity: 0.85,
      }} />
    </div>
  );
};

export default SignalIntro;
