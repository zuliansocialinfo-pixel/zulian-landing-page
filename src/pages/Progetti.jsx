import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import PageShell from '../components/PageShell';
import Tilt from '../components/Tilt';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects';

const ProjectCard = ({ p }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.92, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.92 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    style={{ height: '100%' }}
  >
    <Tilt max={7} style={{ height: '100%' }}>
    <Link to={`/progetti/${p.slug}`} className="glass project-card" style={{ display: 'block', overflow: 'hidden', height: '100%' }}>
      {/* Cover segnaposto */}
      <div className="project-cover" style={{ position: 'relative', aspectRatio: '16 / 10', background: `linear-gradient(135deg, ${p.cover}, #0c0c0c)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ position: 'absolute', top: '0.9rem', left: '0.9rem', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#0a0a0a', background: 'var(--accent-color)', padding: '0.25rem 0.7rem', borderRadius: '999px' }}>
          {p.category}
        </span>
        {p.category === 'Video' && (
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Play size={22} style={{ color: '#fff', marginLeft: 3 }} />
          </div>
        )}
      </div>
      <div style={{ padding: '1.3rem 1.4rem 1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          {p.title}
          <ArrowUpRight size={18} className="teaser-arrow" style={{ color: 'var(--accent-color)' }} />
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.55 }}>{p.excerpt}</p>
      </div>
    </Link>
    </Tilt>
  </motion.div>
);

const Progetti = () => {
  const [filter, setFilter] = useState('Tutti');
  const list = useMemo(
    () => (filter === 'Tutti' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <PageShell
      accentKey="progetti"
      kicker="Portfolio"
      title="Progetti e lavori"
      subtitle="Una selezione di lavori: video, social, siti, branding e campagne. (Contenuti segnaposto — verranno sostituiti con i progetti reali.)"
    >
      <div className="price-filters" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2.5rem' }}>
        {PROJECT_CATEGORIES.map((g) => {
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

      <motion.div layout className="project-grid">
        <AnimatePresence mode="popLayout">
          {list.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </AnimatePresence>
      </motion.div>
    </PageShell>
  );
};

export default Progetti;
