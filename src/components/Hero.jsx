import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ start = true }) => {
  const rootRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // --- TIMELINE INGRESSO HERO ---
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (reduce) {
        gsap.set('.hero-anim', { opacity: 1, y: 0 });
      } else {
        tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.5 }, 0)
          .from('.hero-line', { y: 36, opacity: 0, duration: 0.6, stagger: 0.12 }, 0.08)
          .from('.hero-gold', { backgroundSize: '0% 100%', duration: 0.6, ease: 'power2.inOut' }, 0.15)
          .from('.hero-desc', { y: 16, opacity: 0, duration: 0.5 }, 0.2)
          .from('.hero-tags > span', { y: 14, opacity: 0, duration: 0.35, stagger: 0.06 }, 0.35)
          .from('.hero-cta', { y: 16, opacity: 0, duration: 0.4, stagger: 0.1 }, 0.45)
          .from('.hero-scroll', { opacity: 0, duration: 0.5 }, 0.55);
      }

      const mm = gsap.matchMedia();

      // --- PARALLAX + MAGNETIC solo su desktop con puntatore fine ---
      mm.add('(min-width: 992px) and (pointer: fine)', () => {
        // Parallax leggero sul glow di sfondo durante lo scroll
        gsap.to(glowRef.current, {
          y: 120,
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
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '80px',
        overflow: 'hidden',
        opacity: start ? 1 : 0,
        transition: start ? 'opacity 0.6s ease-out 0.1s' : 'opacity 0s',
      }}
    >
      {/* Background Effect */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(40px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '800px' }}>
          <span
            className="hero-badge hero-anim"
            style={{
              color: 'var(--accent-color)',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '1.5rem',
              padding: '0.5rem 1.2rem',
              border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '999px',
              fontSize: '0.95rem',
            }}
          >
            Social Media Marketing & Crescita Digitale
          </span>
          <h1 style={{ fontSize: 'clamp(3.2rem, 7vw, 6rem)', marginBottom: '1.8rem', lineHeight: 1.05, fontWeight: 700 }}>
            <span className="hero-line hero-anim" style={{ display: 'block', fontWeight: 700 }}>Non sono il classico</span>
            <span className="hero-line hero-anim" style={{ display: 'block', fontWeight: 700 }}>
              <span
                className="hero-gold"
                style={{
                  color: 'var(--accent-color)',
                  fontWeight: 800,
                  backgroundImage: 'linear-gradient(transparent 65%, rgba(212,175,55,0.18) 0)',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100% 100%',
                }}
              >
                consulente social
              </span>
            </span>
          </h1>
          <p
            className="hero-desc hero-anim"
            style={{
              fontSize: '1.4rem',
              color: 'var(--text-secondary)',
              marginBottom: '1.8rem',
              maxWidth: '680px',
              lineHeight: 1.7,
              fontWeight: 500,
            }}
          >
            Aiuto aziende e professionisti a far crescere il loro business online con un approccio concreto.
            <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}> Più visibilità, più clienti, più fatturato.</strong> Niente scorciatoie, solo strategie su misura.
          </p>

          {/* Frasi chiare: cosa faccio, in breve */}
          <p
            className="hero-desc hero-anim"
            style={{
              fontSize: '1.25rem',
              color: 'var(--text-primary)',
              marginBottom: '2rem',
              maxWidth: '680px',
              lineHeight: 1.7,
              fontWeight: 600,
            }}
          >
            In parole semplici: <strong style={{ color: 'var(--accent-color)', fontWeight: 700 }}>gestisco i tuoi social,
            creo siti ed e-commerce, lancio campagne pubblicitarie</strong> e costruisco una strategia che
            porta risultati misurabili. Ti seguo passo dopo passo, sempre con la massima trasparenza.
          </p>

          <div className="hero-tags" style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {['Social Media', 'Siti & E-commerce', 'Pubblicità Online', 'Strategia di Crescita'].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '0.4rem 1rem',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--text-secondary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
          fontSize: '0.75rem',
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
