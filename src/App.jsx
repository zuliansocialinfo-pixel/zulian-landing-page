import React from 'react';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Preloader />
      
      {/* Simple Header Navbar */}
      <header style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        padding: '1.5rem 0',
        zIndex: 100,
        background: 'rgba(13, 13, 13, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--glass-border)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/src/assets/logo.jpg" alt="Zulian Logo" style={{ height: '40px', width: 'auto', borderRadius: '4px' }} />
          </div>
          <nav style={{ display: 'flex', gap: '2rem' }} className="hidden-mobile">
            <a href="#chi-sono" style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.3s' }}>Chi Sono</a>
            <a href="#servizi" style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.3s' }}>Servizi</a>
            <a href="#come-funziona" style={{ fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.3s' }}>Come Funziona</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <About />
        <Services />
        <HowItWorks />
        
        {/* Calendar Section */}
        <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--glass-border)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 className="text-accent" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Prenota la tua Consulenza</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Scegli l'orario migliore per te direttamente dal mio calendario.</p>
            <div style={{ maxWidth: '1000px', margin: '0 auto', background: '#fff', borderRadius: '12px', overflow: 'hidden' }}>
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
    </>
  );
}

export default App;
