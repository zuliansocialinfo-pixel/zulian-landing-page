import React from 'react';
import { motion } from 'framer-motion';
import { Video, FileSignature, Users, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <Video size={32} />,
    title: "1. Consulenza in videochiamata",
    desc: "Ci incontreremo inizialmente in videochiamata, su appuntamento. Questo primo confronto serve per conoscerci, analizzare i tuoi obiettivi e capire come posso aiutarti."
  },
  {
    icon: <FileSignature size={32} />,
    title: "2. Firma del contratto",
    desc: "Per garantire un impegno reciproco serio e professionale, firmeremo un contratto chiaro e trasparente per evitare disguidi prima dell'incontro operativo."
  },
  {
    icon: <Users size={32} />,
    title: "3. Incontro di persona",
    desc: "Sarò io a raggiungerti di persona. Analizzeremo ogni aspetto del tuo progetto per costruire insieme una strategia su misura che porti risultati concreti."
  },
  {
    icon: <Rocket size={32} />,
    title: "4. Avvio del lavoro",
    desc: "Dopo l'incontro, si passa all'azione: inizieremo il percorso. Nessuna perdita di tempo, solo risultati."
  }
];

const HowItWorks = () => {
  return (
    <section id="come-funziona" style={{ padding: '6rem 0', backgroundColor: '#111' }}>
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-accent" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Come Funziona</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Il percorso chiaro per iniziare a lavorare insieme.</p>
        </div>

        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Vertical line connecting steps */}
          <div style={{
            position: 'absolute',
            left: '32px',
            top: '0',
            bottom: '0',
            width: '2px',
            backgroundColor: 'var(--glass-border)',
            zIndex: 0
          }} className="hidden-mobile"></div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              style={{
                display: 'flex',
                gap: '2rem',
                marginBottom: index === steps.length - 1 ? '0' : '3rem',
                position: 'relative',
                zIndex: 1
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-color)',
                border: '2px solid var(--accent-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-color)',
                flexShrink: 0
              }}>
                {step.icon}
              </div>
              
              <div className="glass" style={{ padding: '2rem', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Small inline style for the vertical line to hide on very small screens if needed, 
          though it works fine. Just a basic setup. */}
      <style>{`
        @media (max-width: 600px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
