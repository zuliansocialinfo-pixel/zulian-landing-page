import React, { useContext, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { User, Layers, Workflow, Target, FolderKanban, Tag, ArrowUpRight, Calendar } from 'lucide-react';
import Hero from '../components/Hero';
import Tilt from '../components/Tilt';
import { RevealContext } from '../revealContext';
import { ACCENTS, GOLD, tweenAccent } from '../theme';

const Marquee = lazy(() => import('../components/Marquee'));
const TrustStats = lazy(() => import('../components/TrustStats'));

const TEASERS = [
  { to: '/chi-sono', key: 'chi-sono', icon: User, title: 'Chi Sono', desc: 'La persona dietro Zulian: visione, valori e modo di lavorare.' },
  { to: '/servizi', key: 'servizi', icon: Layers, title: 'Servizi', desc: 'Social, siti, e-commerce, video e pubblicità: tutto ciò che faccio.' },
  { to: '/come-funziona', key: 'come-funziona', icon: Workflow, title: 'Come Funziona', desc: 'Il percorso passo dopo passo, dalla prima call ai risultati.' },
  { to: '/metodo', key: 'metodo', icon: Target, title: 'Metodo', desc: 'Il metodo di lavoro che porta a risultati misurabili.' },
  { to: '/progetti', key: 'progetti', icon: FolderKanban, title: 'Progetti', desc: 'Una selezione di lavori: video, social, siti e campagne.' },
  { to: '/prezzi', key: 'prezzi', icon: Tag, title: 'Prezzi', desc: 'Listino interattivo: filtra per categoria e trova quello che cerchi.' },
];

const TeaserCard = ({ t }) => {
  const color = ACCENTS[t.key] || GOLD;
  const Icon = t.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ height: '100%' }}
    >
      <Tilt style={{ height: '100%' }}>
        <Link
          to={t.to}
          className="glass teaser-card"
          onMouseEnter={() => tweenAccent(gsap, color, 0.5)}
          onMouseLeave={() => tweenAccent(gsap, GOLD, 0.6)}
          onMouseMove={(e) => {
            // Spotlight che segue il cursore (rete energetica)
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
            e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
          }}
          style={{ display: 'block', padding: '1.8rem', height: '100%', position: 'relative' }}
        >
          <div className="teaser-icon" style={{ width: 52, height: 52, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', marginBottom: '1.2rem' }}>
            <Icon size={26} style={{ color }} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
            {t.title}
            <ArrowUpRight size={20} className="teaser-arrow" style={{ color }} />
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.98rem' }}>{t.desc}</p>
        </Link>
      </Tilt>
    </motion.div>
  );
};

const Home = () => {
  const revealed = useContext(RevealContext);

  return (
    <>
      <Hero start={revealed} />

      <Suspense fallback={null}>
        <Marquee />
        <TrustStats />
      </Suspense>

      {/* Griglia "voci": ogni card porta alla sua pagina dedicata */}
      <section style={{ padding: '6rem 0', position: 'relative' }}>
        <div className="container">
          <div data-anim="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ color: 'var(--accent-color)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Esplora</span>
            <h2 style={{ marginTop: '0.8rem' }}>Tutto quello che posso fare per te</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', margin: '1rem auto 0', fontSize: '1.1rem' }}>
              Ogni voce ha la sua pagina dedicata. Passa il mouse e clicca per entrare.
            </p>
          </div>

          <div className="teaser-grid">
            {TEASERS.map((t) => <TeaserCard key={t.to} t={t} />)}
          </div>
        </div>
      </section>

      {/* Calendario / contatti */}
      <section id="contatti" style={{ padding: '4rem 0 6rem', borderTop: '1px solid var(--glass-border)' }}>
        <div data-anim="reveal" className="container" style={{ textAlign: 'center' }}>
          <h2 className="text-accent" style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', marginBottom: '1rem' }}>Prenota la tua Consulenza</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} /> Scegli l'orario migliore per te direttamente dal mio calendario.
          </p>
          <div style={{ maxWidth: '1000px', margin: '0 auto', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3fOx-uImUyUZK6k2uRZRBFTz8quyI6UDW3lyfeuClz2oZc1gnax33Mkw_VPe6IVnNpuX3sOFce?gv=true"
              style={{ border: 0, width: '100%', height: '700px' }}
              title="Prenota Consulenza"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
