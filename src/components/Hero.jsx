import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, ArrowRight, ChevronDown } from 'lucide-react';
import GalaxyBackground from './GalaxyBackground';
import SignalIntro from './SignalIntro';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ start = true }) => {
  const rootRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // --- SEQUENZA D'INGRESSO HERO (centrata, coreografata) ---
      if (reduce) {
        gsap.set(['.hero-line', '.hero-anim'], { yPercent: 0, opacity: 1, y: 0 });
        gsap.set('.hero-gold', { backgroundSize: '100% 100%' });
      } else {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl
          // 1. Il badge scende dall'alto con un piccolo "settle"
          .from('.hero-badge', { y: -24, opacity: 0, scale: 0.85, duration: 0.7, ease: 'back.out(1.6)' }, 0)
          // 2. Le righe del titolo emergono da sotto una maschera (reveal premium)
          .from('.hero-line', { yPercent: 115, duration: 0.95, stagger: 0.14, ease: 'power4.out' }, 0.2)
          // 3. L'evidenziatore dorato si "disegna" sotto la parola chiave
          .from('.hero-gold', { backgroundSize: '0% 100%', duration: 0.8, ease: 'power2.inOut' }, '-=0.45')
          // 4. I paragrafi salgono in dissolvenza
          .from('.hero-desc', { y: 28, opacity: 0, duration: 0.7, stagger: 0.18 }, '-=0.35')
          // 5. I tag fanno "pop" con rimbalzo
          .from('.hero-tags > span', { y: 18, opacity: 0, scale: 0.6, duration: 0.45, stagger: 0.07, ease: 'back.out(2)' }, '-=0.25')
          // 6. I bottoni salgono con leggera elasticita'
          .from('.hero-cta', { y: 24, opacity: 0, scale: 0.92, duration: 0.55, stagger: 0.12, ease: 'back.out(1.5)' }, '-=0.2')
          // 7. La freccia di scroll appare per ultima
          .from('.hero-scroll', { y: -12, opacity: 0, duration: 0.6 }, '-=0.1');

        // Ambient: il glow di sfondo pulsa lentamente per dare "vita"
        gsap.to(glowRef.current, {
          scale: 1.15,
          opacity: 0.18,
          duration: 4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

      const mm = gsap.matchMedia();

      // --- PARALLAX + MAGNETIC solo su desktop con puntatore fine ---
      mm.add('(min-width: 992px) and (pointer: fine)', () => {
        // Parallax leggero sul glow di sfondo durante lo scroll
        gsap.to(glowRef.current, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Bottoni magnetici
        const magnets = gsap.utils.toArray('.hero-cta');
        const handlers = [];
        magnets.forEach((btn) => {
          const onMove = (e) => {
            const r = btn.getBoundingClientRect();
            const mx = e.clientX - (r.left + r.width / 2);
            const my = e.clientY - (r.top + r.height / 2);
            gsap.to(btn, { x: mx * 0.3, y: my * 0.4, duration: 0.4, ease: 'power2.out' });
          };
          const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
          btn.addEventListener('mousemove', onMove);
          btn.addEventListener('mouseleave', onLeave);
          handlers.push([btn, onMove, onLeave]);
        });

        return () => {
          handlers.forEach(([btn, onMove, onLeave]) => {
            btn.removeEventListener('mousemove', onMove);
            btn.removeEventListener('mouseleave', onLeave);
          });
        };
      });
    }, rootRef);

    return () => ctx.revert();
  }, [start]);

  return (
    <section
      ref={rootRef}
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: '90px',
        paddingBottom: '40px',
        overflow: 'hidden',
        textAlign: 'center',
        opacity: start ? 1 : 0,
        transition: start ? 'opacity 0.6s ease-out 0.1s' : 'opacity 0s',
      }}
    >
      {/* Sfondo galassia animato */}
      <GalaxyBackground />

      {/* Glow centrale pulsante (sopra le stelle, sotto il testo) */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'min(700px, 90vw)',
          height: 'min(700px, 90vw)',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(34, 211, 238,0.14) 0%, rgba(0,0,0,0) 65%)',
          filter: 'blur(50px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-inner" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="hero-anim" style={{ display: 'flex', justifyContent: 'center' }}>
            <SignalIntro />
          </div>

          <span
            className="hero-badge"
            style={{
              color: 'var(--accent-color)',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '1.6rem',
              padding: '0.5rem 1.3rem',
              border: '1px solid rgba(34, 211, 238,0.35)',
              borderRadius: '999px',
              fontSize: 'clamp(0.72rem, 2.4vw, 0.95rem)',
              background: 'rgba(34, 211, 238,0.05)',
              backdropFilter: 'blur(4px)',
            }}
          >
            Sviluppo Web · E-commerce · App · Social
          </span>

          <h1
            className="hero-title"
            style={{
              fontSize: 'clamp(2.6rem, 8vw, 6rem)',
              marginBottom: '1.8rem',
              lineHeight: 1.05,
              fontWeight: 700,
            }}
          >
            <span className="line-mask">
              <span className="hero-line" style={{ display: 'block', fontWeight: 700 }}>Il tuo partner per la</span>
            </span>
            <span className="line-mask">
              <span className="hero-line" style={{ display: 'block', fontWeight: 800 }}>
                <span
                  className="hero-gold"
                  style={{
                    color: 'var(--accent-color)',
                    fontWeight: 800,
                    backgroundImage: 'linear-gradient(transparent 62%, rgba(34, 211, 238,0.22) 0)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left bottom',
                    backgroundSize: '100% 100%',
                  }}
                >
                  crescita digitale
                </span>
              </span>
            </span>
          </h1>

          <p
            className="hero-desc"
            style={{
              fontSize: 'clamp(1.1rem, 3.6vw, 1.4rem)',
              color: 'var(--text-secondary)',
              marginBottom: '1.6rem',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.65,
              fontWeight: 500,
            }}
          >
            Sono uno sviluppatore e partner digitale: progetto e realizzo siti, e-commerce e app, e li collego a social e pubblicità per farli crescere davvero.
            <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}> Tecnologia, strategia e contenuti come un unico sistema.</strong> Niente scorciatoie, solo lavoro su misura.
          </p>

          {/* Frasi chiare: cosa faccio, in breve */}
          <p
            className="hero-desc"
            style={{
              fontSize: 'clamp(1rem, 3.2vw, 1.25rem)',
              color: 'var(--text-primary)',
              marginBottom: '2.2rem',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.65,
              fontWeight: 600,
            }}
          >
            In parole semplici: <strong style={{ color: 'var(--accent-color)', fontWeight: 700 }}>sviluppo siti, e-commerce e
            piattaforme, gestisco i tuoi social e lancio campagne pubblicitarie</strong> con una strategia che
            porta risultati misurabili. Ti seguo passo dopo passo, sempre con la massima trasparenza.
          </p>

          <div
            className="hero-tags"
            style={{
              display: 'flex',
              gap: '0.6rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '2.5rem',
            }}
          >
            {['Sviluppo Web', 'E-commerce', 'App & Piattaforme', 'Social Media', 'Pubblicità Online'].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '0.4rem 1rem',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '999px',
                  fontSize: 'clamp(0.75rem, 2.4vw, 0.85rem)',
                  color: 'var(--text-secondary)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className="hero-actions"
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <a
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3fOx-uImUyUZK6k2uRZRBFTz8quyI6UDW3lyfeuClz2oZc1gnax33Mkw_VPe6IVnNpuX3sOFce"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hero-cta"
            >
              <Calendar size={20} />
              Prenota una Consulenza Gratuita
            </a>
            <a href="#servizi" className="btn-secondary hero-cta">
              Scopri i servizi
              <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
            </a>
          </div>
        </div>
      </div>

      {/* Freccia scroll */}
      <a
        href="#chi-sono"
        className="hero-scroll"
        aria-label="Scorri"
        style={{
          position: 'absolute',
          bottom: '1.6rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
          fontSize: '0.72rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          zIndex: 1,
        }}
      >
        Scorri
        <ChevronDown size={20} className="hero-scroll-icon" />
      </a>
    </section>
  );
};

export default Hero;
