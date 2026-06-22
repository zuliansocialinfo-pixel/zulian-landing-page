import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Gestione Base',
      price: 'Da €299',
      period: '/ mese',
      description: 'Ideale per professionisti che vogliono una presenza curata sui social senza pensieri.',
      features: [
        'Analisi profilo e competitors',
        'Piano editoriale mensile',
        '2 Post / settimana',
        'Gestione community base',
        'Report bimestrale'
      ],
      popular: false
    },
    {
      name: 'Crescita Pro',
      price: 'Da €599',
      period: '/ mese',
      description: 'Per aziende che vogliono trasformare i social in una macchina di acquisizione clienti.',
      features: [
        'Tutto il piano Base',
        '4 Post + 2 Reels / settimana',
        'Campagne Ads base (Meta)',
        'Creazione contenuti visivi',
        'Strategia funnel',
        'Report mensile dettagliato'
      ],
      popular: true
    },
    {
      name: 'E-commerce & Scale',
      price: 'Su Misura',
      period: '',
      description: 'Soluzione completa per chi vende online e vuole scalare il fatturato aggressivamente.',
      features: [
        'Gestione Ads Avanzata (Meta & Google)',
        'Strategia di remarketing',
        'Ottimizzazione conversioni',
        'Gestione budget illimitata',
        'Dashboard in tempo reale',
        'Consulenza strategica 1-to-1'
      ],
      popular: false
    }
  ];

  return (
    <section id="preventivi" style={{ padding: '6rem 0', backgroundColor: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '50%',
        background: 'radial-gradient(ellipse, rgba(34, 211, 238,0.1) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(60px)',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent" 
            style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
          >
            Piani & Investimenti
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}
          >
            Trasparenza totale. Ogni business è diverso, ma ecco un'idea dell'investimento per farti crescere davvero.
          </motion.p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="glass"
              style={{
                padding: '3rem 2rem',
                position: 'relative',
                border: plan.popular ? '2px solid var(--accent-color)' : '1px solid var(--glass-border)',
                transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                zIndex: plan.popular ? 2 : 1,
                boxShadow: plan.popular ? '0 10px 40px rgba(34, 211, 238, 0.15)' : 'none'
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(90deg, var(--accent-color), var(--accent-hover))',
                  color: '#000',
                  padding: '5px 15px',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <Star size={14} fill="#000" /> Il più scelto
                </div>
              )}
              
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{plan.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', minHeight: '40px' }}>
                {plan.description}
              </p>
              
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>{plan.price}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{plan.period}</span>
              </div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '10px', 
                    marginBottom: '1rem',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem'
                  }}>
                    <Check size={18} color="var(--accent-color)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <a 
                href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3fOx-uImUyUZK6k2uRZRBFTz8quyI6UDW3lyfeuClz2oZc1gnax33Mkw_VPe6IVnNpuX3sOFce" 
                target="_blank" 
                rel="noopener noreferrer"
                className={plan.popular ? "btn-primary" : "btn-secondary"}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Inizia ora
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
