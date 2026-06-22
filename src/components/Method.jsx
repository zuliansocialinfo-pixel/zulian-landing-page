import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Layers, Lock, FileSignature } from 'lucide-react';

const analysisPoints = [
  'cosa vende o cosa offre',
  'a chi si rivolge',
  'quali problemi deve risolvere',
  'quali canali digitali servono davvero',
  'quali contenuti sono utili',
  'cosa è prioritario e cosa può essere evitato',
];

const Method = () => {
  return (
    <section id="metodo" style={{ padding: '4rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '-5%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(34, 211, 238,0.08) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(50px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Intro: pochi progetti, seguiti bene */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '760px', marginBottom: '4rem' }}
        >
          <span
            style={{
              color: 'var(--accent-color)',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontSize: '0.85rem',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Disponibilità e metodo
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem' }}>
            Pochi progetti, <span style={{ color: 'var(--accent-color)' }}>seguiti bene.</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
            Non lavoro con decine di clienti contemporaneamente. I progetti importanti vengono seguiti
            personalmente, con attenzione diretta: ogni lavoro serio richiede analisi, tempo, confronto,
            strategia e controllo operativo. Per questo i posti per percorsi lunghi e progetti complessi
            sono limitati durante l'anno.
          </p>
        </motion.div>

        {/* Due velocità: veloci vs percorsi lunghi */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '5rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass"
            style={{ padding: '2.5rem' }}
          >
            <div style={{ color: 'var(--accent-color)', marginBottom: '1.2rem' }}>
              <Zap size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Progetti veloci</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Logo, setup account, mini shooting, landing page, piccole modifiche o automazioni semplici:
              lavori con confini chiari, gestiti in modo snello e con tempi più rapidi in base alla
              disponibilità del momento.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass"
            style={{ padding: '2.5rem', border: '1px solid rgba(34, 211, 238,0.3)' }}
          >
            <div style={{ color: 'var(--accent-color)', marginBottom: '1.2rem' }}>
              <Layers size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Percorsi lunghi e progetti importanti</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Siti completi, e-commerce avanzati, piattaforme, app o progetti turistici territoriali. Qui
              non realizzo solo un servizio tecnico: analizzo l'attività come se dovessi occuparmi
              direttamente della sua crescita digitale, con strategia e accompagnamento operativo.
            </p>
          </motion.div>
        </div>

        {/* Il metodo: analisi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '4rem' }}
        >
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
            Ogni progetto parte dall'<span style={{ color: 'var(--accent-color)' }}>analisi</span>
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Non realizzo siti o contenuti in modo automatico e uguale per tutti. Ogni attività ha una
            storia, un pubblico e un modo diverso di comunicare. Prima di costruire, capisco cosa serve
            davvero:
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.2rem',
            }}
          >
            {analysisPoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
              >
                <span
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid var(--accent-color)',
                    color: 'var(--accent-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span style={{ color: 'var(--text-primary)' }}>{point}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Strategia + Riservatezza */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass"
            style={{ padding: '2.5rem' }}
          >
            <div style={{ color: 'var(--accent-color)', marginBottom: '1.2rem' }}>
              <FileSignature size={32} />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Strategia e supporto</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Il cliente non riceve solo un sito o un contenuto: riceve indicazioni pratiche su come
              ragionare sulla propria presenza digitale, cosa comunicare, quali errori evitare. Quando
              serve, lascio linee guida e strategie operative per continuare a lavorare bene anche dopo
              la consegna.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass"
            style={{ padding: '2.5rem' }}
          >
            <div style={{ color: 'var(--accent-color)', marginBottom: '1.2rem' }}>
              <Lock size={32} />
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Metodo e riservatezza</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              I progetti vengono trattati con riservatezza e non vengono mostrati senza autorizzazione.
              Ogni collaborazione è definita tramite preventivo e condizioni scritte: servizi inclusi ed
              esclusi, tempi, revisioni, pagamenti ed extra. Il cliente ha tutto il tempo per valutare
              prima di accettare. Nessun accordo vago, nessuna aspettativa non scritta.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Method;
