import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from './assets/logo.jpg';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import VideoShowcase from './components/VideoShowcase';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackgroundGlows from './components/BackgroundGlows';
import BackgroundParticles from './components/BackgroundParticles';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      <BackgroundGlows />
      <BackgroundParticles />
      <Preloader />
      
      {/* Dynamic Header */}
      <header style={{ 
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
            <img src={logoImg} alt="Zulian Logo" style={{ height: '40px', width: 'auto', borderRadius: '4px' }} />
          </div>
          
          <nav style={{ gap: '2rem' }} className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <a href="#chi-sono" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.3s' }}>Chi Sono</a>
            <a href="#servizi" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.3s' }}>Servizi</a>
            <a href="#come-funziona" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.3s' }}>Come Funziona</a>
            <a href="#preventivi" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.3s' }}>Prezzi</a>
          </nav>

          <button 
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              display: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              outline: 'none',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <main>
        <Hero />
        <About />
        <Services />
        <VideoShowcase />
        <HowItWorks />
        <Pricing />
        
        {/* Calendar Section */}
        <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--glass-border)' }}>
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
      </main>

      <Footer />
      <FloatingWhatsApp />
      <style>{`
        @media (min-width: 1024px) {
          .nav-menu {
            display: flex !important;
            flex-direction: row;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          .mobile-toggle {
            display: flex !important;
          }
          .nav-menu {
            display: none;
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(13, 13, 13, 0.95);
            backdrop-filter: blur(10px);
            padding: 4rem 2rem;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            gap: 2.5rem;
            z-index: 99;
            border-top: 1px solid var(--glass-border);
          }
          .nav-menu.open {
            display: flex !important;
          }
          .nav-menu a {
            font-size: 1.5rem !important;
            font-weight: 600 !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
