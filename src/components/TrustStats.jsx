import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// NOTA: questi numeri sono indicativi/placeholder — vanno sostituiti con i dati REALI.
const stats = [
  { value: 150, suffix: '+', label: 'Progetti seguiti' },
  { value: 2, suffix: 'M+', label: 'Impression generate' },
  { value: 45, suffix: '+', label: 'Clienti soddisfatti' },
  { value: 98, suffix: '%', label: 'Tasso di soddisfazione' },
];

const TrustStats = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const numbers = gsap.utils.toArray('.stat-number');

      numbers.forEach((el) => {
        const target = Number(el.dataset.value);
        if (reduce) {
          el.textContent = target;
          return;
        }
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(counter.val);
          },
        });
      });

      if (!reduce) {
        gsap.from('.stat-card', {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 80%', once: true },
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} style={{ padding: '5rem 0', backgroundColor: 'var(--bg-color)' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-card"
              style={{
                padding: '2rem 1rem',
                borderRight: i < stats.length - 1 ? '1px solid var(--glass-border)' : 'none',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: 700,
                  color: 'var(--accent-color)',
                  lineHeight: 1,
                  marginBottom: '0.6rem',
                }}
              >
                <span className="stat-number" data-value={s.value}>0</span>
                {s.suffix}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', letterSpacing: '0.5px' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
