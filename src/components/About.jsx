import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import face from '../assets/face.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Stagger reveal for both columns
      gsap.utils.toArray('.about-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 65%',
              scrub: 0.5,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="chi-sono" style={{ padding: '2rem 0 4rem' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center'
        }}>
          <div className="about-reveal">
            <h2 className="text-accent" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Il Mio Percorso</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Mi chiamo Marco Zulian e vengo da una famiglia operaia. Ho iniziato a lavorare presto, imparando sul campo il valore dell'impegno, della responsabilità e della determinazione.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Nulla è arrivato per caso: ogni traguardo è stato costruito con sacrificio, costanza e voglia di crescere. Questo percorso mi ha insegnato valori che porto ogni giorno nel mio lavoro: <strong>serietà, coerenza, rispetto e concretezza.</strong>
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              Non vendo scorciatoie né promesse irrealistiche: costruisco percorsi solidi, passo dopo passo, con trasparenza, competenza e obiettivi concreti.
            </p>
          </div>

          <div
            className="about-reveal glass"
            style={{ padding: '3rem', position: 'relative' }}
          >
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              fontSize: '4rem',
              color: 'var(--accent-color)',
              opacity: 0.2,
              fontFamily: 'var(--font-serif)',
              lineHeight: 1
            }}>
              "
            </div>
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <img src={face} alt="Marco Zulian" style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-color)' }} />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Chi c'è dietro Zulian Social Media Marketing</h3>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', fontStyle: 'italic', marginBottom: '2rem' }}>
              Dietro c'è una storia fatta di lavoro, sacrificio e crescita personale.
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              Quando un'azienda sceglie di lavorare con me, non trova promesse vuote o soluzioni improvvisate, ma un percorso costruito con metodo, trasparenza e obiettivi chiari.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
