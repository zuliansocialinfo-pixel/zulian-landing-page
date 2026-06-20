import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Check } from 'lucide-react';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    base: 1200,
    description: 'Presenza curata, contenuti, base reporting.',
    features: [
      'Analisi profilo e competitors',
      'Piano editoriale mensile',
      '2 Post / settimana',
      'Gestione community base',
      'Report bimestrale',
    ],
    highlight: false,
  },
  {
    id: 'growth',
    name: 'Crescita Pro',
    base: 2900,
    description: 'Per aziende che vogliono acquisire clienti davvero.',
    features: [
      'Tutto il piano Starter',
      '4 Post + 2 Reels / settimana',
      'Campagne Ads base (Meta)',
      'Creazione contenuti visivi',
      'Strategia funnel',
      'Report mensile dettagliato',
    ],
    highlight: true,
  },
  {
    id: 'custom',
    name: 'Custom',
    base: 4500,
    description: 'E-commerce, brand, shooting, strategia completa.',
    features: [
      'Gestione Ads Avanzata (Meta & Google)',
      'Strategia di remarketing',
      'Ottimizzazione conversioni',
      'Gestione budget illimitata',
      'Dashboard in tempo reale',
      'Consulenza strategica 1-to-1',
    ],
    highlight: false,
  },
];

const addOns = [
  { id: 'reels', name: 'Sessione extra reels / video', price: 350 },
  { id: 'landing', name: 'Landing page dedicata campagna', price: 600 },
  { id: 'crm', name: 'Setup CRM / automazioni base', price: 450 },
];

const PricingStore = () => {
  const [activePlan, setActivePlan] = useState('growth');
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const previewRef = useRef(null);
  const totalRef = useRef(null);

  const currentPlan = plans.find((p) => p.id === activePlan);
  const baseCost = currentPlan.base;
  const extraCost = selectedAddOns.reduce((sum, id) => {
    const addon = addOns.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const total = baseCost + extraCost;

  useEffect(() => {
    // Anima il numero del totale quando cambia
    if (totalRef.current) {
      const oldValue = Number(totalRef.current.textContent.replace(/\D/g, '')) || baseCost;
      const counter = { val: oldValue };
      gsap.to(counter, {
        val: total,
        duration: 0.5,
        ease: 'power2.out',
        onUpdate: () => {
          totalRef.current.textContent = Math.round(counter.val).toLocaleString('it-IT');
        },
      });
    }

    // Anima il preview panel
    gsap.fromTo(
      previewRef.current,
      { opacity: 0.8, y: 4 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
  }, [total]);

  const toggleAddOn = (id) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <section id="preventivi" style={{ padding: '8rem 2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '50%',
          background: 'radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--accent-color)', marginBottom: '1rem' }}>
            Un prezzo che si capisce.
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
            Piano base + add-on scelti = totale trasparente. Niente sorprese, niente nascosti.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Sinistra: piani + add-on */}
          <div>
            {/* Piani */}
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                Scegli il tuo piano
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {plans.map((plan) => (
                  <motion.button
                    key={plan.id}
                    onClick={() => setActivePlan(plan.id)}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: plans.indexOf(plan) * 0.1 }}
                    style={{
                      padding: '1.5rem',
                      border: activePlan === plan.id ? '2px solid var(--accent-color)' : '1px solid var(--glass-border)',
                      background: activePlan === plan.id ? 'rgba(212,175,55,0.05)' : 'rgba(255,255,255,0.02)',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: 'inherit',
                      transition: 'all 0.3s ease',
                    }}
                    onHover={() => setActivePlan(plan.id)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                          {plan.name}
                        </h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{plan.description}</p>
                      </div>
                      <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--accent-color)', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
                        € {plan.base.toLocaleString('it-IT')}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Add-on */}
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                Aggiungi servizi (opzionali)
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {addOns.map((addon) => (
                  <motion.label
                    key={addon.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + addOns.indexOf(addon) * 0.08 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.01)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAddOns.includes(addon.id)}
                      onChange={() => toggleAddOn(addon.id)}
                      style={{
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{addon.name}</span>
                    </div>
                    <span style={{ color: 'var(--accent-color)', fontWeight: 700, whiteSpace: 'nowrap' }}>
                      + € {addon.price.toLocaleString('it-IT')}
                    </span>
                  </motion.label>
                ))}
              </div>
            </div>
          </div>

          {/* Destra: preview totale */}
          <motion.div
            ref={previewRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              position: 'sticky',
              top: '120px',
              padding: '2.5rem',
              borderRadius: '24px',
              background: 'linear-gradient(180deg, rgba(212,175,55,0.08) 0%, rgba(255,255,255,0.02))',
              border: '1px solid rgba(212,175,55,0.24)',
              boxShadow: '0 20px 80px rgba(0,0,0,0.28)',
              overflow: 'hidden',
            }}
          >
            <p style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.72rem', marginBottom: '1rem' }}>
              Preview preventivo
            </p>

            <h3 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 0.95, marginBottom: '0.5rem' }}>
              <span ref={totalRef}>{total.toLocaleString('it-IT')}</span> €
            </h3>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Piano {currentPlan.name} + add-on selezionati
            </p>

            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Base piano</span>
                <strong style={{ color: 'var(--text-primary)' }}>€ {baseCost.toLocaleString('it-IT')}</strong>
              </div>
              {selectedAddOns.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Add-on selezionati</span>
                  <strong style={{ color: 'var(--text-primary)' }}>€ {extraCost.toLocaleString('it-IT')}</strong>
                </div>
              )}
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '2rem', fontStyle: 'italic' }}>
              IVA, budget advertising e costi di piattaforma (Meta/Google) vanno indicati come extra, separati dal fee di gestione.
            </p>

            <a
              href="#contatto"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                minHeight: '56px',
                padding: '0 1.5rem',
                borderRadius: '999px',
                background: 'var(--accent-color)',
                color: 'var(--bg-color)',
                fontWeight: 800,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 30px rgba(212,175,55,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Prenota consulenza strategica
            </a>
          </motion.div>
        </div>

        {/* Piano scelto: feature list */}
        <motion.div
          key={activePlan}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            Incluso nel piano {currentPlan.name}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {currentPlan.features.map((feature, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                <Check size={20} style={{ color: 'var(--accent-color)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--text-secondary)' }}>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingStore;
