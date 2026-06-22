// Colore "identità" per ogni pagina/sezione. Pilota --accent-color, quindi
// luci, cursore, bottoni, link, glow stelle. Palette futuristica AI/luxury-tech:
// cyan elettrico, blu, viola controllati su fondo blu-notte. Coerente ovunque.
export const ACCENTS = {
  home: '#22d3ee',          // cyan elettrico
  'chi-sono': '#38bdf8',    // sky / blu chiaro
  servizi: '#2dd4bf',       // teal / acqua tech
  'come-funziona': '#3b82f6', // blu segnale
  metodo: '#8b5cf6',        // viola pulse
  prezzi: '#06b6d4',        // cyan profondo
  progetti: '#6366f1',      // indaco
};

// Accento primario del sistema (cyan elettrico). Nome storico mantenuto
// per compatibilita' con gli import esistenti.
export const GOLD = '#22d3ee';

// Voci di navigazione = pagine interne dedicate.
export const NAV = [
  { to: '/chi-sono', label: 'Chi Sono', key: 'chi-sono' },
  { to: '/servizi', label: 'Servizi', key: 'servizi' },
  { to: '/come-funziona', label: 'Come Funziona', key: 'come-funziona' },
  { to: '/metodo', label: 'Metodo', key: 'metodo' },
  { to: '/progetti', label: 'Progetti', key: 'progetti' },
  { to: '/prezzi', label: 'Prezzi', key: 'prezzi' },
];

// Interpola in modo morbido --accent-color verso un colore (usato al cambio pagina).
export const tweenAccent = (gsap, color, duration = 0.8) => {
  const root = document.documentElement;
  const start = getComputedStyle(root).getPropertyValue('--accent-color').trim() || GOLD;
  const proxy = { c: start };
  return gsap.to(proxy, {
    c: color,
    duration,
    ease: 'power2.inOut',
    overwrite: true,
    onUpdate: () => root.style.setProperty('--accent-color', proxy.c),
  });
};
