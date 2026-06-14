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
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>
            ZULIAN
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
      </main>

      <Footer />
    </>
  );
}

export default App;
