import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import {
  Package, Palette, UserCircle, Globe, Hotel, ShoppingCart,
  Filter, Smartphone, Camera, Megaphone, Wrench, Download,
  FileText, Check, ChevronDown,
} from 'lucide-react';

/**
 * LISTINO PREZZI — dati reali dal listino ufficiale Zulian.
 * Prezzi indicativi: il preventivo scritto resta il riferimento finale.
 *
 * Include due "preview" animate (Logo e Foto/Camera) per far capire a colpo
 * d'occhio cosa è compreso, e i due documenti ufficiali scaricabili.
 */

const categories = [
  {
    id: 'pacchetti', icon: Package, title: 'Pacchetti Principali',
    desc: 'Soluzioni complete: più convenienti dei servizi presi singolarmente.',
    items: [
      { name: 'Presenza Digitale Locale', price: 'da 1.500 €' },
      { name: 'Azienda Professionale', price: 'da 2.500 €' },
      { name: 'Turismo Professional', price: 'da 2.500 €' },
      { name: 'Turismo Premium', price: 'da 5.500 €' },
      { name: 'E-commerce Start', price: 'da 3.000 €' },
      { name: 'E-commerce Brand', price: 'da 8.500 €' },
      { name: 'Percorso Digitale Avanzato', price: 'da 20.000 €' },
      { name: 'Marketplace / community complessa', price: 'da 25.000 €' },
    ],
  },
  {
    id: 'logo', icon: Palette, title: 'Logo e Identità Visiva',
    desc: 'Costruire o sistemare l’immagine iniziale dell’attività.',
    items: [
      { name: 'Logo Operativo', price: '250 €' },
      { name: 'Logo su Misura', price: '500 €' },
      { name: 'Identità Visiva Coordinata', price: '800 €' },
      { name: 'Brand Identity Completa', price: 'da 1.500 €' },
      { name: 'Kit Grafico Social', price: '350 €' },
    ],
  },
  {
    id: 'account', icon: UserCircle, title: 'Account e Profili',
    desc: 'Setup ordinato di pagine, account e canali digitali.',
    items: [
      { name: 'Creazione/configurazione pagina o account', price: '50 € cad.' },
      { name: 'Setup Digitale Base', price: '500 €' },
      { name: 'Setup Digitale Completo', price: '800 €' },
    ],
  },
  {
    id: 'siti', icon: Globe, title: 'Siti Web',
    desc: 'Siti chiari, funzionali e coerenti col valore reale dell’attività.',
    items: [
      { name: 'Sito One Page', price: 'da 700 €' },
      { name: 'Sito Vetrina Professionale', price: 'da 1.500 €' },
      { name: 'Sito Aziendale Completo', price: 'da 2.500 €' },
      { name: 'Sito avanzato / progetto speciale', price: 'da 4.000 €' },
    ],
  },
  {
    id: 'turismo', icon: Hotel, title: 'Turismo, B&B e Case Vacanze',
    desc: 'Pacchetti per strutture ricettive e progetti territoriali.',
    items: [
      { name: 'Turistico Base', price: 'da 1.200 €' },
      { name: 'Turistico Completo', price: 'da 2.500 €' },
      { name: 'Turistico Avanzato', price: 'da 4.000 €' },
      { name: 'Premium con Foto, Reel e Social', price: 'da 5.500 €' },
    ],
  },
  {
    id: 'ecommerce', icon: ShoppingCart, title: 'E-commerce',
    desc: 'Negozi online con confini chiari: prodotti, pagamenti, spedizioni.',
    items: [
      { name: 'E-commerce Starter', price: 'da 3.000 €' },
      { name: 'E-commerce Professional', price: 'da 5.500 €' },
      { name: 'E-commerce Brand / Avanzato', price: 'da 8.500 €' },
      { name: 'E-commerce + community / automazioni', price: 'da 12.000 €' },
      { name: 'Caricamento prodotti', price: 'da 20 € cad.' },
    ],
  },
  {
    id: 'funnel', icon: Filter, title: 'Landing Page e Funnel',
    desc: 'Pagine vendita, lead generation e percorsi commerciali.',
    items: [
      { name: 'Landing Page Essenziale', price: 'da 700 €' },
      { name: 'Landing Page Commerciale', price: 'da 1.200 €' },
      { name: 'Mini Funnel Lead Generation', price: 'da 2.000 €' },
      { name: 'Funnel Commerciale Completo', price: 'da 2.500 €' },
    ],
  },
  {
    id: 'app', icon: Smartphone, title: 'Automazioni, App e Piattaforme',
    desc: 'Web app, app, gestionali, community e automazioni.',
    items: [
      { name: 'Analisi funzionale app/piattaforma', price: 'da 250 €' },
      { name: 'Micro Web App', price: 'da 2.500 €' },
      { name: 'Web App / Gestionale', price: 'da 4.000 €' },
      { name: 'PWA / App web installabile', price: 'da 6.000 €' },
      { name: 'App MVP', price: 'da 9.000 €' },
      { name: 'App Completa', price: 'da 15.000 €' },
    ],
  },
  {
    id: 'foto', icon: Camera, title: 'Foto, Video e Contenuti Visivi',
    desc: 'Shooting, reel, video aziendali ed eventi business.',
    items: [
      { name: 'Mini Shooting Fotografico', price: '300 €' },
      { name: 'Shooting Mezza Giornata', price: '500 €' },
      { name: 'Shooting Giornata Intera', price: '950 €' },
      { name: 'Reel / Clip Breve', price: '250 € cad.' },
      { name: 'Pacchetto 5 Reel', price: '1.100 €' },
      { name: 'Video Aziendale', price: 'da 950 €' },
      { name: 'Montaggio video/foto', price: '60 €/h' },
    ],
  },
  {
    id: 'ads', icon: Megaphone, title: 'Social Media e Advertising',
    desc: 'Gestione social e campagne valutate su misura.',
    items: [
      { name: 'Gestione Social Media', price: 'su preventivo' },
      { name: 'Advertising (budget escluso)', price: 'su preventivo' },
    ],
  },
  {
    id: 'manutenzione', icon: Wrench, title: 'Manutenzione e Assistenza',
    desc: 'Supporto dopo la consegna per ordine e continuità operativa.',
    items: [
      { name: 'Manutenzione sito', price: 'da 80 €/mese' },
      { name: 'Manutenzione sito / e-commerce', price: 'da 150 €/mese' },
      { name: 'Manutenzione app / web app', price: 'da 300 €/mese' },
    ],
  },
];

/* ---------- Preview animata: LOGO che si costruisce ---------- */
const LogoPreview = () => {
  const ref = useRef(null);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(['.lp-mono', '.lp-ring', '.lp-swatch'], { opacity: 1, strokeDashoffset: 0, scale: 1 });
        return;
      }
      const mono = ref.current.querySelector('.lp-mono');
      const len = mono.getTotalLength();
      gsap.set(mono, { strokeDasharray: len, strokeDashoffset: len });
      gsap.set('.lp-swatch', { scale: 0, opacity: 0, transformOrigin: '50% 50%' });
      gsap.set('.lp-ring', { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6 });
      tl.to('.lp-ring', { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)' })
        .to(mono, { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut' }, '-=0.2')
        .to(mono, { fill: 'var(--accent-color)', duration: 0.4 }, '-=0.1')
        .to('.lp-swatch', { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)', stagger: 0.1 }, '-=0.2')
        .to({}, { duration: 1.2 })
        .to(['.lp-mono', '.lp-ring', '.lp-swatch'], { opacity: 0, duration: 0.5 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 200 200" width="100%" height="100%" style={{ maxWidth: 200 }}>
      <circle className="lp-ring" cx="100" cy="86" r="54" fill="none" stroke="rgba(34, 211, 238,0.4)" strokeWidth="1.5" />
      {/* Monogramma Z stilizzato */}
      <path className="lp-mono" d="M 74,60 L 126,60 L 80,112 L 128,112"
        fill="none" stroke="var(--accent-color)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      {/* Palette colori che compaiono */}
      {['#22d3ee', '#1a1a1a', '#f5f5f5', '#06b6d4'].map((c, i) => (
        <rect key={i} className="lp-swatch" x={58 + i * 22} y="150" width="16" height="16" rx="3"
          fill={c} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      ))}
    </svg>
  );
};

/* ---------- Preview animata: CAMERA che scatta una foto ---------- */
const CameraPreview = () => {
  const ref = useRef(null);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.cam-photo', { opacity: 1, y: 70 });
        return;
      }
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });
      // lente che mette a fuoco
      tl.fromTo('.cam-lens-inner', { scale: 1 }, { scale: 0.82, duration: 0.5, ease: 'power1.inOut', yoyo: true, repeat: 1 })
        // FLASH dello scatto
        .to('.cam-flash', { opacity: 0.9, duration: 0.08, ease: 'power2.out' }, '+=0.1')
        .to('.cam-flash', { opacity: 0, duration: 0.35, ease: 'power2.in' })
        // la foto esce dal basso e "si sviluppa"
        .fromTo('.cam-photo', { y: 6, opacity: 0 }, { y: 70, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.2')
        .fromTo('.cam-photo-img', { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power1.in' }, '-=0.4')
        .to({}, { duration: 1 })
        // reset
        .to('.cam-photo', { opacity: 0, duration: 0.4 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 200 200" width="100%" height="100%" style={{ maxWidth: 200, overflow: 'visible' }}>
      {/* Foto che esce (dietro al corpo macchina) */}
      <g className="cam-photo" style={{ opacity: 0 }}>
        <rect x="60" y="40" width="80" height="64" rx="4" fill="#fff" />
        <rect className="cam-photo-img" x="66" y="46" width="68" height="44" rx="2" fill="url(#camShot)" />
        <rect x="66" y="94" width="40" height="5" rx="2.5" fill="#d9d9d9" />
      </g>
      <defs>
        <linearGradient id="camShot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="55%" stopColor="#7a6320" />
          <stop offset="100%" stopColor="#2a2a2a" />
        </linearGradient>
      </defs>

      {/* Corpo macchina fotografica */}
      <rect x="44" y="84" width="112" height="74" rx="12" fill="#1c1c1c" stroke="var(--accent-color)" strokeWidth="2" />
      <rect x="74" y="74" width="34" height="14" rx="4" fill="#1c1c1c" stroke="var(--accent-color)" strokeWidth="2" />
      {/* mirino / flash hot-shoe */}
      <rect x="120" y="96" width="20" height="8" rx="2" fill="#0d0d0d" stroke="rgba(34, 211, 238,0.6)" strokeWidth="1" />
      {/* Lente */}
      <circle cx="100" cy="124" r="26" fill="#0d0d0d" stroke="var(--accent-color)" strokeWidth="2" />
      <circle className="cam-lens-inner" cx="100" cy="124" r="17" fill="#141414" stroke="rgba(34, 211, 238,0.6)" strokeWidth="1.5" style={{ transformOrigin: '100px 124px' }} />
      <circle cx="100" cy="124" r="7" fill="#222" />
      <circle cx="94" cy="118" r="3" fill="rgba(255,255,255,0.35)" />
      {/* Flash bianco a tutto schermo */}
      <rect className="cam-flash" x="-20" y="-20" width="240" height="240" fill="#fff" style={{ opacity: 0 }} />
    </svg>
  );
};

const Listino = () => {
  const [open, setOpen] = useState('pacchetti');

  return (
    <section id="listino" style={{ padding: '6rem 0', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        {/* Intestazione */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span style={{
            display: 'inline-block', padding: '0.35rem 1rem', borderRadius: 30,
            border: '1px solid var(--glass-border)', color: 'var(--accent-color)',
            fontSize: '0.8rem', letterSpacing: 2, textTransform: 'uppercase', marginBottom: '1.2rem',
          }}>
            Listino Prezzi
          </span>
          <h2 style={{ fontSize: '2.6rem', marginBottom: '1rem' }}>Trasparenza prima di tutto</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto' }}>
            Prezzi indicativi per orientarti. Il preventivo scritto resta sempre il riferimento finale:
            definisce cosa è incluso, cosa non lo è, tempi e revisioni.
          </p>
        </motion.div>

        {/* Due preview animate: cosa ottieni davvero */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}
          >
            <div style={{ width: 120, height: 150, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LogoPreview />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Logo & Identità</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '0.8rem' }}>
                Monogramma, palette colori coordinata e varianti pronte per ogni canale. Da 250 €.
              </p>
              <a href="#contatti" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem' }}>Richiedi un logo</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="glass" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}
          >
            <div style={{ width: 120, height: 150, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CameraPreview />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>Foto & Video</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '0.8rem' }}>
                Shooting professionali, reel e video aziendali. Immagini ordinate e pronte all’uso. Da 250 €.
              </p>
              <a href="#contatti" className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem' }}>Prenota uno shooting</a>
            </div>
          </motion.div>
        </div>

        {/* Listino completo: accordion per categoria */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.2rem', alignItems: 'start' }}>
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const isOpen = open === cat.id;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.05 }}
                className="glass"
                style={{ overflow: 'hidden' }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : cat.id)}
                  style={{
                    width: '100%', background: 'transparent', border: 'none', color: 'var(--text-primary)',
                    padding: '1.4rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left',
                  }}
                >
                  <span style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(34, 211, 238,0.1)', color: 'var(--accent-color)',
                  }}>
                    <Icon size={22} />
                  </span>
                  <span style={{ flex: 1 }}>
                    <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 600 }}>{cat.title}</span>
                    <span style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{cat.desc}</span>
                  </span>
                  <ChevronDown
                    size={20}
                    style={{ color: 'var(--accent-color)', flexShrink: 0, transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'none' }}
                  />
                </button>

                <div style={{
                  maxHeight: isOpen ? `${cat.items.length * 60 + 20}px` : 0,
                  transition: 'max-height 0.4s ease', overflow: 'hidden',
                }}>
                  <ul style={{ listStyle: 'none', margin: 0, padding: '0 1.5rem 1.2rem' }}>
                    {cat.items.map((it, k) => (
                      <li key={k} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
                        padding: '0.7rem 0', borderTop: '1px solid var(--glass-border)',
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.92rem' }}>
                          <Check size={15} style={{ color: 'var(--accent-color)', flexShrink: 0 }} />
                          {it.name}
                        </span>
                        <span style={{ color: 'var(--accent-color)', fontWeight: 600, whiteSpace: 'nowrap', fontSize: '0.92rem' }}>
                          {it.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Download documenti ufficiali */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass"
          style={{
            marginTop: '3rem', padding: '2.5rem', textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(34, 211, 238,0.08), rgba(34, 211, 238,0.02))',
          }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.6rem' }}>Documenti ufficiali</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto 1.6rem' }}>
            Scarica il listino completo e il contratto quadro. Tutto scritto, chiaro e senza sorprese.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/listino-prezzi.pdf" download className="btn-primary">
              <Download size={18} /> Listino Prezzi (PDF)
            </a>
            <a href="/contratto.pdf" download className="btn-secondary">
              <FileText size={18} /> Contratto Commerciale (PDF)
            </a>
          </div>
          <p style={{ color: '#777', fontSize: '0.8rem', marginTop: '1.4rem' }}>
            Prezzi indicativi · Pagamento standard 50% anticipo e 50% a consegna, salvo diverso accordo scritto.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Listino;
