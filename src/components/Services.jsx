import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Share2, Target, Globe, Video } from 'lucide-react';

const services = [
  {
    icon: <BarChart3 size={32} />,
    title: "Analisi e Strategia",
    desc: "Un'analisi approfondita dell'attività, del mercato e del pubblico per costruire un piano strategico su misura che porti risultati concreti e duraturi."
  },
  {
    icon: <Share2 size={32} />,
    title: "Gestione Social",
    desc: "Gestione completa dei profili: creazione contenuti, programmazione, interazione con la community e monitoraggio delle performance."
  },
  {
    icon: <Target size={32} />,
    title: "Pubblicità Online",
    desc: "Campagne su Facebook, Instagram e Google. Definizione del pubblico target, copywriting, gestione budget e report analitici."
  },
  {
    icon: <Globe size={32} />,
    title: "Siti Web ed E-commerce",
    desc: "Sviluppo di siti moderni, responsive e ottimizzati. Dalla vetrina istituzionale all'e-commerce integrato."
  },
  {
    icon: <Video size={32} />,
    title: "Creazione Contenuti",
    desc: "Produzione di contenuti visivi professionali: riprese video, shooting, reels e materiali creativi capaci di valorizzare il brand."
  }
];

const Services = () => {
  return (
    <section id="servizi" style={{ padding: '6rem 0' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>I Nostri Servizi</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Niente scorciatoie, solo strategie concrete che fanno crescere davvero.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass"
              style={{
                padding: '2.5rem',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.borderColor = 'var(--accent-color)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--glass-border)';
              }}
            >
              <div style={{ color: 'var(--accent-color)', marginBottom: '1.5rem' }}>
                {service.icon}
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{service.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
