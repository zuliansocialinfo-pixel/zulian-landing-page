import React, { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import logo from './assets/logo.jpg';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import ThemeSwitcher from './components/ThemeSwitcher';
import InteractiveFX from './components/InteractiveFX';

// Caricamento progressivo "a strati": prima la Home (Hero), poi il resto.
// L'intro e la prima schermata restano immediate; le sezioni pesanti e le
// loro animazioni vengono caricate solo quando servono, senza rallentare.
const Marquee = lazy(() => import('./components/Marquee'));
const TrustStats = lazy(() => import('./components/TrustStats'));
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const Method = lazy(() => import('./components/Method'));
const PricingStore = lazy(() => import('./components/PricingStore'));
const Listino = lazy(() => import('./components/Listino'));
const Footer = lazy(() => import('./components/Footer'));
const FloatingWhatsApp = lazy(() => import('./components/FloatingWhatsApp'));

const Fallback = () => (
  <div style={{ minHeight: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <span className="loading-dots" aria-label="Caricamento" />
  </div>
);

function App() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', minHeight: '100vh', overflow: revealed ? 'visible' : 'hidden' }}>
      <Preloader onComplete={() => setRevealed(true)} />

      {/* Luci interattive futuristiche: attive dopo l'intro */}
      {revealed && <InteractiveFX />}

      {/* Dynamic Header */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={revealed ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        padding: '1rem 0',
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        borderBottom: '1px solid var(--glass-border)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Zulian Logo" style={{ height: '40px', width: 'auto', borderRadius: '4px' }} />
          </div>
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="hidden-mobile">
            <a href="#chi-sono" style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.3s' }}>Chi Sono</a>
            <a href="#servizi" style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.3s' }}>Servizi</a>
            <a href="#come-funziona" style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.3s' }}>Come Funziona</a>
            <a href="#metodo" style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.3s' }}>Metodo</a>
            <a href="#listino" style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.3s' }}>Listino</a>
            <a href="#preventivi" style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.3s' }}>Prezzi</a>
            <ThemeSwitcher />
          </nav>
        </div>
      </motion.header>

      <main>
        {/* Sopra la piega: caricato subito */}
        <Hero start={revealed} />

        {/* Sotto la piega: caricato progressivamente */}
        <Suspense fallback={<Fallback />}>
          <Marquee />
          <TrustStats />
          <About />
          <Services />
          <HowItWorks />
          <Method />
          <PricingStore />
          <Listino />

          {/* Calendar Section */}
          <section id="contatti" style={{ padding: '4rem 0', backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--glass-border)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
              <h2 className="text-accent" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Prenota la tua Consulenza</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Scegli l'orario migliore per te direttamente dal mio calendario.</p>
              <div style={{ maxWidth: '1000px', margin: '0 auto', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                <iframe
                  src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3fOx-uImUyUZK6k2uRZRBFTz8quyI6UDW3lyfeuClz2oZc1gnax33Mkw_VPe6IVnNpuX3sOFce?gv=true"
                  style={{ border: 0, width: '100%', height: '700px' }}
                  frameBorder="0"
                  title="Prenota Consulenza"
                ></iframe>
              </div>
            </div>
          </section>

          <Footer />
          <FloatingWhatsApp />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
