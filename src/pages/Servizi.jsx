import React from 'react';
import PageShell from '../components/PageShell';
import Services from '../components/Services';

const Servizi = () => (
  <PageShell
    accentKey="servizi"
    kicker="Servizi"
    title="Tutto ciò che faccio per farti crescere"
    subtitle="Social, siti ed e-commerce, video e contenuti, pubblicità online e strategia. Servizi pensati per portare risultati misurabili."
  >
    <Services />
  </PageShell>
);

export default Servizi;
