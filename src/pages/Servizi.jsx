import React from 'react';
import PageShell from '../components/PageShell';
import ServiceConsole from '../components/ServiceConsole';

const Servizi = () => (
  <PageShell
    accentKey="servizi"
    kicker="Servizi"
    title="Tutto ciò che faccio per farti crescere"
    subtitle="Non pubblico post a caso: costruisco un sistema. Seleziona un servizio per vedere come lavoro — il pannello si aggiorna in tempo reale."
  >
    <ServiceConsole />
  </PageShell>
);

export default Servizi;
