import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader';
import SiteHeader from './components/SiteHeader';
import InteractiveFX from './components/InteractiveFX';
import PageTransition from './components/PageTransition';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import SiteMotion from './components/SiteMotion';
import NeuralField from './components/NeuralField';
import { RevealContext } from './revealContext';
import useSmoothScroll from './hooks/useSmoothScroll';

import Home from './pages/Home';
import ChiSono from './pages/ChiSono';
import Servizi from './pages/Servizi';
import ComeFunziona from './pages/ComeFunziona';
import Metodo from './pages/Metodo';
import Prezzi from './pages/Prezzi';
import Progetti from './pages/Progetti';
import ProgettoDettaglio from './pages/ProgettoDettaglio';

function App() {
  const [revealed, setRevealed] = useState(false);

  // Scroll fluido cinematografico, attivo dopo l'intro
  useSmoothScroll(revealed);

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', minHeight: '100vh', overflow: revealed ? 'visible' : 'hidden' }}>
      <Preloader onComplete={() => setRevealed(true)} />

      {/* Sfondo interattivo globale: la rete neurale "viva" dietro TUTTO il sito */}
      {revealed && <NeuralField />}

      {/* Luci interattive futuristiche: attive dopo l'intro */}
      {revealed && <InteractiveFX />}

      <SiteHeader revealed={revealed} />

      <RevealContext.Provider value={revealed}>
        <main>
          <PageTransition>
            {(location) => (
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/chi-sono" element={<ChiSono />} />
                <Route path="/servizi" element={<Servizi />} />
                <Route path="/come-funziona" element={<ComeFunziona />} />
                <Route path="/metodo" element={<Metodo />} />
                <Route path="/prezzi" element={<Prezzi />} />
                <Route path="/progetti" element={<Progetti />} />
                <Route path="/progetti/:slug" element={<ProgettoDettaglio />} />
                <Route path="*" element={<Home />} />
              </Routes>
            )}
          </PageTransition>
        </main>
      </RevealContext.Provider>

      {revealed && <SiteMotion active={revealed} />}
      {revealed && <Footer />}
      {revealed && <FloatingWhatsApp />}
    </div>
  );
}

export default App;
