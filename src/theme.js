// Colore "identità" per ogni pagina/sezione. Pilota --accent-color, quindi
// luci, cursore, bottoni, link, glow stelle. Coerente tra home e pagine interne.
export const ACCENTS = {
  home: '#d4af37',          // oro
  'chi-sono': '#d98c3f',    // ambra / rame
  servizi: '#3fb98f',       // smeraldo
  'come-funziona': '#4f9bd9', // acciaio
  metodo: '#a86fe0',        // viola
  prezzi: '#e0b53f',        // oro intenso
  progetti: '#e8a13f',      // oro-arancio
};

export const GOLD = '#d4af37';

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
