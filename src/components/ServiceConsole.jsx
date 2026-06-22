import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import {
  BarChart3, Share2, Target, Globe, Video, Sparkles, ArrowRight, Check,
} from 'lucide-react';
import { tweenAccent } from '../theme';

/**
 * Console servizi interattiva (stile dashboard/pannello AI).
 * - Colonna sinistra: elenco "canali" selezionabili.
 * - Pannello destro: si aggiorna con animazione e glow quando selezioni.
 * - Ogni servizio ha il suo colore: alla selezione vira --accent-color
 *   (luci, cursore, bordi) -> il sito reagisce alla scelta dell'utente.
 */
const SERVICES = [
  {
    id: 'strategia',
    icon: BarChart3,
    color: '#22d3ee',
    title: 'Analisi e Strategia',
    tag: 'Fondamenta',
    desc: 'Prima di pubblicare qualsiasi cosa: capiamo mercato, pubblico e numeri. Costruiamo un piano dove ogni mossa ha un perché.',
    items: ['Analisi mercato e competitor', 'Definizione del pubblico', 'Piano editoriale strategico', 'KPI e obiettivi misurabili'],
  },
  {
    id: 'social',
    icon: Share2,
    color: '#38bdf8',
    title: 'Gestione Social',
    tag: 'Presenza',
    desc: 'Profili gestiti come un sistema: contenuti, calendario, community e dati che lavorano insieme, non a caso.',
    items: ['Creazione contenuti', 'Programmazione e pubblicazione', 'Gestione community', 'Report performance mensile'],
  },
  {
    id: 'ads',
    icon: Target,
    color: '#3b82f6',
    title: 'Pubblicità Online',
    tag: 'Crescita',
    desc: 'Campagne Meta e Google costruite per convertire. Budget controllato, pubblico giusto, risultati tracciati.',
    items: ['Strategia advertising', 'Targeting e copywriting', 'Gestione e ottimizzazione budget', 'Report conversioni'],
  },
  {
    id: 'web',
    icon: Globe,
    color: '#2dd4bf',
    title: 'Siti & E-commerce',
    tag: 'Piattaforma',
    desc: 'Siti moderni, veloci e ottimizzati. Dalla vetrina all’e-commerce: la base solida su cui poggia tutto il resto.',
    items: ['Siti web responsive', 'E-commerce integrato', 'Ottimizzazione velocità e SEO', 'Manutenzione continua'],
  },
  {
    id: 'video',
    icon: Video,
    color: '#8b5cf6',
    title: 'Contenuti & Video',
    tag: 'Creatività',
    desc: 'Riprese, reel e shooting che fermano lo scroll. Contenuti pensati per la percezione, non solo per fare numero.',
    items: ['Riprese e shooting', 'Reel e short-form', 'Montaggio professionale', 'Materiali creativi brand'],
  },
  {
    id: 'growth',
    icon: Sparkles,
    color: '#6366f1',
    title: 'Strategia di Crescita',
    tag: 'Sistema',
    desc: 'Tutto collegato: contenuto, dati e timing che si muovono come un’unica macchina. Crescita reale, non vanity metrics.',
    items: ['Funnel e conversione', 'Posizionamento del brand', 'Ottimizzazione basata sui dati', 'Crescita misurabile nel tempo'],
  },
];

const ServiceConsole = () => {
  const [active, setActive] = useState(SERVICES[0]);

  const select = (s) => {
    setActive(s);
    tweenAccent(gsap, s.color, 0.6);
  };

  const ActiveIcon = active.icon;

  return (
    <section id="servizi" style={{ padding: '2rem 0 4rem' }}>
      <div
        className="console-grid"
        style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', alignItems: 'start' }}
      >
        {/* Colonna canali */}
        <div className="console-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.4rem', paddingLeft: '0.2rem' }}>
            // seleziona un servizio
          </span>
          {SERVICES.map((s) => {
            const Icon = s.icon;
            const on = s.id === active.id;
            return (
              <button
                key={s.id}
                onClick={() => select(s)}
                className="console-item"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.85rem',
                  padding: '0.9rem 1rem', borderRadius: '12px', textAlign: 'left',
                  border: `1px solid ${on ? s.color : 'var(--glass-border)'}`,
                  background: on ? `${s.color}14` : 'rgba(255,255,255,0.02)',
                  color: on ? 'var(--text-primary)' : 'var(--text-secondary)',
                  boxShadow: on ? `0 0 24px ${s.color}33, inset 0 0 0 1px ${s.color}22` : 'none',
                  transition: 'all 0.3s ease',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* barra indicatrice attiva */}
                <span style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                  background: s.color, transform: on ? 'scaleY(1)' : 'scaleY(0)',
                  transition: 'transform 0.3s ease', transformOrigin: 'center',
                }} />
                <span style={{ color: s.color, display: 'flex', flexShrink: 0 }}>
                  <Icon size={20} />
                </span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.98rem' }}>{s.title}</span>
                  <span style={{ fontSize: '0.72rem', opacity: 0.6, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{s.tag}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Pannello dettaglio */}
        <div
          className="console-panel glass"
          style={{ padding: 'clamp(1.5rem, 4vw, 2.6rem)', position: 'relative', overflow: 'hidden', minHeight: 380 }}
        >
          {/* glow di sfondo che segue il colore attivo */}
          <div style={{
            position: 'absolute', top: '-30%', right: '-10%', width: '50%', height: '70%',
            background: `radial-gradient(circle, ${active.color}26 0%, transparent 70%)`,
            filter: 'blur(40px)', pointerEvents: 'none', transition: 'all 0.5s ease',
          }} />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.4rem' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16, flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `${active.color}1a`, border: `1px solid ${active.color}55`,
                  color: active.color, boxShadow: `0 0 30px ${active.color}33`,
                }}>
                  <ActiveIcon size={30} />
                </div>
                <div>
                  <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: '0.7rem', letterSpacing: '1px', textTransform: 'uppercase', color: active.color }}>
                    {active.tag}
                  </span>
                  <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.1rem)', lineHeight: 1.1, marginTop: '0.2rem' }}>{active.title}</h3>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '1.8rem', maxWidth: 620 }}>
                {active.desc}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.7rem', marginBottom: '2rem' }}>
                {active.items.map((it) => (
                  <div key={it} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.95rem' }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `${active.color}1f`, color: active.color,
                    }}>
                      <Check size={13} />
                    </span>
                    <span style={{ color: 'var(--text-primary)' }}>{it}</span>
                  </div>
                ))}
              </div>

              <a href="#contatti" className="btn-primary" style={{ background: active.color }}>
                Voglio questo servizio
                <ArrowRight size={18} />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ServiceConsole;
