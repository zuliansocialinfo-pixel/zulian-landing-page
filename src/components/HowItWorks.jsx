import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Video, FileSignature, Users, Rocket } from 'lucide-react';
import Reveal from './Reveal';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Video,
    title: 'Consulenza in videochiamata',
    desc: "Ci incontriamo in videochiamata, su appuntamento. Questo primo confronto serve per conoscerci, analizzare i tuoi obiettivi e capire come posso aiutarti.",
  },
  {
    icon: FileSignature,
    title: 'Firma del contratto',
    desc: "Per un impegno reciproco serio e professionale, firmiamo un contratto chiaro e trasparente: niente disguidi prima dell'incontro operativo.",
  },
  {
    icon: Users,
    title: 'Incontro di persona',
    desc: 'Sarò io a raggiungerti. Analizziamo ogni aspetto del progetto per costruire insieme una strategia su misura che porti risultati concreti.',
  },
  {
    icon: Rocket,
    title: 'Avvio del lavoro',
    desc: "Dopo l'incontro si passa all'azione: si parte. Nessuna perdita di tempo, solo risultati.",
  },
];

const HowItWorks = () => {
  const rootRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      // La linea verticale si "disegna" man mano che scorri.
      if (lineRef.current && !reduce) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top 70%',
              end: 'bottom 75%',
              scrub: true,
            },
          }
        );
      } else if (lineRef.current) {
        gsap.set(lineRef.current, { scaleY: 1 });
      }

      // Ogni nodo si accende quando entra nello schermo.
      gsap.utils.toArray('.tl-node').forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0.4, opacity: 0, boxShadow: '0 0 0px var(--accent-color)' },
          {
            scale: 1,
            opacity: 1,
            boxShadow: '0 0 26px var(--accent-color)',
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: node, start: 'top 80%' },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} style={{ padding: '2rem 0 3rem' }}>
      <div style={{ position: 'relative', maxWidth: '820px', margin: '0 auto' }}>
        {/* Binario della linea (traccia spenta) */}
        <div
          className="tl-track"
          style={{
            position: 'absolute', left: '31px', top: '12px', bottom: '12px',
            width: '2px', background: 'var(--glass-border)', zIndex: 0,
          }}
        />
        {/* Linea luminosa che si disegna */}
        <div
          ref={lineRef}
          style={{
            position: 'absolute', left: '31px', top: '12px', bottom: '12px',
            width: '2px', zIndex: 1, transformOrigin: 'top center',
            background: 'linear-gradient(180deg, var(--accent-color), transparent)',
            boxShadow: '0 0 12px var(--accent-color)',
          }}
        />

        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Reveal
              key={index}
              x={-24}
              delay={index * 0.05}
              style={{
                display: 'flex', gap: '1.6rem', alignItems: 'flex-start',
                marginBottom: index === steps.length - 1 ? 0 : '2.4rem',
                position: 'relative', zIndex: 2,
              }}
            >
              <div
                className="tl-node"
                style={{
                  width: '64px', height: '64px', borderRadius: '50%', flexShrink: 0,
                  background: 'var(--bg-color)', border: '2px solid var(--accent-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-color)', position: 'relative',
                }}
              >
                <Icon size={28} />
                <span style={{
                  position: 'absolute', top: '-8px', right: '-8px',
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'var(--accent-color)', color: '#04121a',
                  fontSize: '0.78rem', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'ui-monospace, Menlo, monospace',
                }}>{index + 1}</span>
              </div>

              <div className="glass" style={{ padding: '1.6rem 1.8rem', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.6rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
