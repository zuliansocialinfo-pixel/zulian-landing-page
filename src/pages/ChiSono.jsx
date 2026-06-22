import React from 'react';
import PageShell from '../components/PageShell';
import About from '../components/About';
import TrustStats from '../components/TrustStats';

const ChiSono = () => (
  <PageShell
    accentKey="chi-sono"
    kicker="Chi Sono"
    title="La persona dietro Zulian"
    subtitle="Visione, valori e modo di lavorare. Un partner concreto per la tua crescita digitale, non il classico consulente."
  >
    <About />
    <TrustStats />
  </PageShell>
);

export default ChiSono;
