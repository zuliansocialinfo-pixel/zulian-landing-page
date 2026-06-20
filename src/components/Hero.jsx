import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

const Hero = ({ start = true }) => {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      paddingTop: '80px', // Space for header if we add one
      overflow: 'hidden'
    }}>
      {/* Background Effect */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(40px)',
        zIndex: 0
      }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '800px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span style={{ 
              color: 'var(--accent-color)', 
              fontWeight: 600, 
              letterSpacing: '2px',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '1rem'
            }}>
              Strategie di Business e Crescita Aziendale
            </span>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
              marginBottom: '1.5rem',
              lineHeight: 1.1
            }}>
              Non sono il classico <br/>
              <span style={{ color: 'var(--accent-color)' }}>consulente social</span>
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem',
              maxWidth: '600px',
              lineHeight: 1.8
            }}>
              Aiuto aziende e professionisti a far crescere il loro business online con un approccio concreto.
              Più visibilità, più clienti, più fatturato. Niente scorciatoie, solo strategie su misura.
            </p>

            {/* Frasi chiare: cosa faccio, in breve */}
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              maxWidth: '600px',
              lineHeight: 1.8,
              fontWeight: 500
            }}>
              In parole semplici: <span style={{ color: 'var(--accent-color)' }}>gestisco i tuoi social,
              creo siti ed e-commerce, lancio campagne pubblicitarie</span> e costruisco una strategia che
              porta risultati misurabili. Ti seguo passo dopo passo, sempre con la massima trasparenza.
            </p>

            <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
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
                className="btn-primary"
              >
                <Calendar size={20} />
                Prenota una Consulenza Gratuita
              </a>
              <a href="#servizi" className="btn-secondary">
                Scopri i servizi
                <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
