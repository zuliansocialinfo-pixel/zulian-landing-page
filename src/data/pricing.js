import {
  Package, Palette, UserCircle, Globe, Hotel, ShoppingCart,
  Filter, Smartphone, Camera, Megaphone, Wrench,
} from 'lucide-react';

/**
 * Dati listino Zulian (indicativi: il preventivo scritto resta il riferimento).
 * Usati dalla pagina Prezzi interattiva (filtri + schede animate).
 */
export const PRICING = [
  {
    id: 'pacchetti', icon: Package, title: 'Pacchetti Principali', group: 'Pacchetti',
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
    id: 'logo', icon: Palette, title: 'Logo e Identità Visiva', group: 'Branding',
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
    id: 'account', icon: UserCircle, title: 'Account e Profili', group: 'Social',
    desc: 'Setup ordinato di pagine, account e canali digitali.',
    items: [
      { name: 'Creazione/configurazione pagina o account', price: '50 € cad.' },
      { name: 'Setup Digitale Base', price: '500 €' },
      { name: 'Setup Digitale Completo', price: '800 €' },
    ],
  },
  {
    id: 'siti', icon: Globe, title: 'Siti Web', group: 'Siti & E-commerce',
    desc: 'Siti chiari, funzionali e coerenti col valore reale dell’attività.',
    items: [
      { name: 'Sito One Page', price: 'da 700 €' },
      { name: 'Sito Vetrina Professionale', price: 'da 1.500 €' },
      { name: 'Sito Aziendale Completo', price: 'da 2.500 €' },
      { name: 'Sito avanzato / progetto speciale', price: 'da 4.000 €' },
    ],
  },
  {
    id: 'turismo', icon: Hotel, title: 'Turismo, B&B e Case Vacanze', group: 'Pacchetti',
    desc: 'Pacchetti per strutture ricettive e progetti territoriali.',
    items: [
      { name: 'Turistico Base', price: 'da 1.200 €' },
      { name: 'Turistico Completo', price: 'da 2.500 €' },
      { name: 'Turistico Avanzato', price: 'da 4.000 €' },
      { name: 'Premium con Foto, Reel e Social', price: 'da 5.500 €' },
    ],
  },
  {
    id: 'ecommerce', icon: ShoppingCart, title: 'E-commerce', group: 'Siti & E-commerce',
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
    id: 'funnel', icon: Filter, title: 'Landing Page e Funnel', group: 'Ads',
    desc: 'Pagine vendita, lead generation e percorsi commerciali.',
    items: [
      { name: 'Landing Page Essenziale', price: 'da 700 €' },
      { name: 'Landing Page Commerciale', price: 'da 1.200 €' },
      { name: 'Mini Funnel Lead Generation', price: 'da 2.000 €' },
      { name: 'Funnel Commerciale Completo', price: 'da 2.500 €' },
    ],
  },
  {
    id: 'app', icon: Smartphone, title: 'Automazioni, App e Piattaforme', group: 'Siti & E-commerce',
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
    id: 'foto', icon: Camera, title: 'Foto, Video e Contenuti Visivi', group: 'Video',
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
    id: 'ads', icon: Megaphone, title: 'Social Media e Advertising', group: 'Ads',
    desc: 'Gestione social e campagne valutate su misura.',
    items: [
      { name: 'Gestione Social Media', price: 'su preventivo' },
      { name: 'Advertising (budget escluso)', price: 'su preventivo' },
    ],
  },
  {
    id: 'manutenzione', icon: Wrench, title: 'Manutenzione e Assistenza', group: 'Pacchetti',
    desc: 'Supporto dopo la consegna per ordine e continuità operativa.',
    items: [
      { name: 'Manutenzione sito', price: 'da 80 €/mese' },
      { name: 'Manutenzione sito / e-commerce', price: 'da 150 €/mese' },
      { name: 'Manutenzione app / web app', price: 'da 300 €/mese' },
    ],
  },
];

export const PRICING_GROUPS = ['Tutti', 'Pacchetti', 'Siti & E-commerce', 'Social', 'Video', 'Branding', 'Ads'];
