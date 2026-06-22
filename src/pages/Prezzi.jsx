import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Check } from 'lucide-react';
import PageShell from '../components/PageShell';
import { PRICING, PRICING_GROUPS } from '../data/pricing';

const PriceCard = ({ cat }) => {
  const Icon = cat.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="glass price-card"
      style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
        <div style={{ width: 46, height: 46, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', flexShrink: 0 }}>
          <Icon size={24} style={{ color: 'var(--accent-color)' }} />
        </div>
        <h3 style={{ fontSize: '1.15rem', lineHeight: 1.2 }}>{cat.title}</h3>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.5 }}>{cat.desc}</p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', marginTop: 'auto' }}>
        {cat.items.map((it) => (
          <li key={it.name} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'baseline', paddingBottom: '0.55rem', borderBottom: '1px solid var(--glass-border)' }}>
            <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', fontSize: '0.92rem' }}>
              <Check size={14} style={{ color: 'var(--accent-color)', flexShrink: 0, transform: 'translateY(2px)' }} />
              {it.name}
            </span>
            <strong style={{ color: 'var(--accent-color)', whiteSpace: 'nowrap', fontWeight: 700, fontSize: '0.92rem' }}>{it.price}</strong>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Prezzi = () => {
  const [filter, setFilter] = useState('Tutti');
  const list = useMemo(
    () => (filter === 'Tutti' ? PRICING : PRICING.filter((c) => c.group === filter)),
    [filter]
  );

  return (
    <PageShell
      accentKey="prezzi"
      kicker="Listino Interattivo"
      title="Prezzi chiari, filtra e scegli"
      subtitle="Prezzi indicativi: il preventivo scritto resta il riferimento finale. Filtra per categoria per trovare subito quello che ti serve."
    >
      {/* Filtri */}
      <div className="price-filters" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem' }}>
        {PRICING_GROUPS.map((g) => {
          const active = g === filter;
          return (
            <button
              key={g}
              onClick={() => setFilter(g)}
              className="price-chip"
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '999px',
                border: `1px solid ${active ? 'var(--accent-color)' : 'var(--glass-border)'}`,
                background: active ? 'var(--accent-color)' : 'transparent',
                color: active ? '#0a0a0a' : 'var(--text-secondary)',
                fontWeight: active ? 700 : 500,
                fontSize: '0.9rem',
                transition: 'all 0.25s ease',
              }}
            >
              {g}
            </button>
          );
        })}
      </div>

      {/* Griglia schede animate */}
      <motion.div layout className="price-grid">
        <AnimatePresence mode="popLayout">
          {list.map((cat) => <PriceCard key={cat.id} cat={cat} />)}
        </AnimatePresence>
      </motion.div>

      {/* Documenti scaricabili */}
      <div className="glass" style={{ marginTop: '3rem', padding: '1.6rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <FileText size={28} style={{ color: 'var(--accent-color)' }} />
          <div>
            <strong style={{ display: 'block', fontSize: '1.05rem' }}>Documenti ufficiali</strong>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Listino completo e contratto commerciale in PDF.</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <a href="/listino-prezzi.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Download size={18} style={{ marginRight: '0.5rem' }} /> Listino
          </a>
          <a href="/contratto.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Download size={18} style={{ marginRight: '0.5rem' }} /> Contratto
          </a>
        </div>
      </div>
    </PageShell>
  );
};

export default Prezzi;
