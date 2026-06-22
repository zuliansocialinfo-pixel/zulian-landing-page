import React, { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { Download, FileText, Check, ArrowRight } from 'lucide-react';
import PageShell from '../components/PageShell';
import { PRICING, PRICING_GROUPS } from '../data/pricing';
import { tweenAccent, GOLD } from '../theme';

// Colore-accento per gruppo: alla selezione vira le luci del sito.
const GROUP_COLORS = {
  Pacchetti: '#22d3ee',
  'Siti & E-commerce': '#2dd4bf',
  Social: '#38bdf8',
  Video: '#8b5cf6',
  Branding: '#6366f1',
  Ads: '#3b82f6',
};
const colorOf = (cat) => GROUP_COLORS[cat.group] || GOLD;

const Prezzi = () => {
  const [group, setGroup] = useState('Tutti');
  const list = useMemo(
    () => (group === 'Tutti' ? PRICING : PRICING.filter((c) => c.group === group)),
    [group]
  );
  const [activeId, setActiveId] = useState(PRICING[0].id);

  // Tieni valida la selezione quando cambia il filtro.
  useEffect(() => {
    if (!list.some((c) => c.id === activeId)) {
      setActiveId(list[0]?.id);
    }
  }, [list, activeId]);

  const active = list.find((c) => c.id === activeId) || list[0];

  const select = (cat) => {
    setActiveId(cat.id);
    tweenAccent(gsap, colorOf(cat), 0.6);
  };

  const ActiveIcon = active?.icon;
  const accent = active ? colorOf(active) : GOLD;

  return (
    <PageShell
      accentKey="prezzi"
      kicker="Listino Interattivo"
      title="Prezzi chiari, esplora e scegli"
      subtitle="Seleziona una categoria: il pannello mostra voci e prezzi in tempo reale. Prezzi indicativi — il preventivo scritto resta il riferimento finale."
    >
      {/* Filtri per gruppo */}
      <div className="price-filters" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
        {PRICING_GROUPS.map((g) => {
          const on = g === group;
          return (
            <button
              key={g}
              onClick={() => setGroup(g)}
              className="price-chip"
              style={{
                padding: '0.5rem 1.1rem', borderRadius: '999px',
                border: `1px solid ${on ? 'var(--accent-color)' : 'var(--glass-border)'}`,
                background: on ? 'var(--accent-color)' : 'transparent',
                color: on ? '#04121a' : 'var(--text-secondary)',
                fontWeight: on ? 700 : 500, fontSize: '0.9rem',
                transition: 'all 0.25s ease',
              }}
            >
              {g}
            </button>
          );
        })}
      </div>

      {/* Console: lista categorie + pannello dettaglio */}
      <div className="console-grid" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', alignItems: 'start' }}>
        <div className="console-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
          <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.3rem', paddingLeft: '0.2rem' }}>
            // {list.length} categorie
          </span>
          {list.map((cat) => {
            const Icon = cat.icon;
            const on = cat.id === active?.id;
            const c = colorOf(cat);
            return (
              <button
                key={cat.id}
                onClick={() => select(cat)}
                className="console-item"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.85rem',
                  padding: '0.85rem 1rem', borderRadius: '12px', textAlign: 'left',
                  border: `1px solid ${on ? c : 'var(--glass-border)'}`,
                  background: on ? `${c}14` : 'rgba(255,255,255,0.02)',
                  color: on ? 'var(--text-primary)' : 'var(--text-secondary)',
                  boxShadow: on ? `0 0 24px ${c}33` : 'none',
                  transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden',
                }}
              >
                <span style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: c,
                  transform: on ? 'scaleY(1)' : 'scaleY(0)', transition: 'transform 0.3s ease',
                }} />
                <span style={{ color: c, display: 'flex', flexShrink: 0 }}><Icon size={20} /></span>
                <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{cat.title}</span>
                  <span style={{ fontSize: '0.72rem', opacity: 0.6 }}>{cat.items.length} voci · {cat.group}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Pannello dettaglio */}
        <div className="console-panel glass" style={{ padding: 'clamp(1.4rem, 4vw, 2.4rem)', position: 'relative', overflow: 'hidden', minHeight: 380 }}>
          <div style={{
            position: 'absolute', top: '-30%', right: '-10%', width: '50%', height: '70%',
            background: `radial-gradient(circle, ${accent}26 0%, transparent 70%)`,
            filter: 'blur(40px)', pointerEvents: 'none', transition: 'all 0.5s ease',
          }} />

          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: 16, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${accent}1a`, border: `1px solid ${accent}55`, color: accent,
                    boxShadow: `0 0 30px ${accent}33`,
                  }}>
                    {ActiveIcon && <ActiveIcon size={28} />}
                  </div>
                  <div>
                    <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: '0.7rem', letterSpacing: '1px', textTransform: 'uppercase', color: accent }}>
                      {active.group}
                    </span>
                    <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', lineHeight: 1.1, marginTop: '0.2rem' }}>{active.title}</h3>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.6rem', maxWidth: 620 }}>
                  {active.desc}
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.1rem', marginBottom: '1.8rem' }}>
                  {active.items.map((it, i) => (
                    <motion.li
                      key={it.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
                      style={{
                        display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'baseline',
                        padding: '0.7rem 0', borderBottom: '1px solid var(--glass-border)',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', fontSize: '0.96rem' }}>
                        <Check size={14} style={{ color: accent, flexShrink: 0, transform: 'translateY(2px)' }} />
                        {it.name}
                      </span>
                      <strong style={{ color: accent, whiteSpace: 'nowrap', fontWeight: 700, fontSize: '0.96rem' }}>{it.price}</strong>
                    </motion.li>
                  ))}
                </ul>

                <a href="#contatti" className="btn-primary" style={{ background: accent }}>
                  Richiedi preventivo
                  <ArrowRight size={18} />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Documenti scaricabili */}
      <div className="glass" style={{ marginTop: '2.5rem', padding: '1.6rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
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
