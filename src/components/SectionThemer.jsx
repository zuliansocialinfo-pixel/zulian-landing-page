import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Motore di theming "vivo": man mano che scorri, l'accento del sito
 * (--accent-color, che pilota luci, cursore, bottoni, link, glow stelle)
 * vira verso il colore proprio della sezione che stai guardando.
 * La transizione e' interpolata davvero (proxy) per essere morbida.
 * Rispetta prefers-reduced-motion: niente listener, resta oro.
 */

// Colore accento per ogni sezione (oltre alla Hero, che resta oro).
const SECTION_COLORS = [
  { sel: '.hero-section', color: '#d4af37' }, // oro
  { sel: '#chi-sono', color: '#d98c3f' },     // ambra/rame
  { sel: '#servizi', color: '#3fb98f' },      // smeraldo
  { sel: '#come-funziona', color: '#4f9bd9' },// acciaio
  { sel: '#metodo', color: '#a86fe0' },       // viola
  { sel: '#listino', color: '#e0b53f' },      // oro intenso
  { sel: '#preventivi', color: '#e8a13f' },   // oro-arancio
  { sel: '#contatti', color: '#d4af37' },     // oro
];

const SectionThemer = ({ active = true }) => {
  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const root = document.documentElement;
    // Proxy per interpolare davvero il colore esadecimale.
    const proxy = { c: getComputedStyle(root).getPropertyValue('--accent-color').trim() || '#d4af37' };

    const setAccent = (color) => {
      gsap.to(proxy, {
        c: color,
        duration: 0.9,
        ease: 'power2.inOut',
        overwrite: true,
        onUpdate: () => root.style.setProperty('--accent-color', proxy.c),
      });
    };

    const triggers = [];
    SECTION_COLORS.forEach(({ sel, color }) => {
      const el = document.querySelector(sel);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => setAccent(color),
          onEnterBack: () => setAccent(color),
        })
      );
    });

    // Le sezioni sotto la piega sono lazy: ricalcola le posizioni quando
    // compaiono nel DOM (altrimenti i trigger nascono con misure sbagliate).
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 600);
    window.addEventListener('load', refresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener('load', refresh);
      triggers.forEach((tr) => tr.kill());
    };
  }, [active]);

  return null;
};

export default SectionThemer;
