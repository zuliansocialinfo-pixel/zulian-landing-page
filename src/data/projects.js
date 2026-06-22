// Portfolio progetti — SEGNAPOSTO. Sostituisci testi, immagini e video reali.
// Ogni progetto ha la sua pagina: /progetti/:slug
export const PROJECT_CATEGORIES = ['Tutti', 'Video', 'Social', 'Siti & E-commerce', 'Branding', 'Ads'];

export const PROJECTS = [
  {
    slug: 'video-spot-ristorante',
    title: 'Spot Video — Ristorante',
    category: 'Video',
    year: '2025',
    client: 'Cliente segnaposto',
    cover: '#1d2a24',
    excerpt: 'Reel cinematografico per il lancio del nuovo menù. (contenuto segnaposto)',
    body: 'Descrizione segnaposto del progetto video: obiettivi, lavorazione, risultati. Qui andranno il video, le foto dietro le quinte e i numeri della campagna.',
    tags: ['Reel', 'Montaggio', 'Color grading'],
  },
  {
    slug: 'social-brand-locale',
    title: 'Gestione Social — Brand Locale',
    category: 'Social',
    year: '2025',
    client: 'Cliente segnaposto',
    cover: '#22202c',
    excerpt: 'Piano editoriale e crescita organica su Instagram e TikTok. (segnaposto)',
    body: 'Descrizione segnaposto: strategia di contenuti, calendario, crescita follower e engagement. Inserire grafici e screenshot reali.',
    tags: ['Piano editoriale', 'Community', 'Crescita'],
  },
  {
    slug: 'ecommerce-moda',
    title: 'E-commerce — Moda',
    category: 'Siti & E-commerce',
    year: '2024',
    client: 'Cliente segnaposto',
    cover: '#1b2430',
    excerpt: 'Negozio online completo con pagamenti e spedizioni. (segnaposto)',
    body: 'Descrizione segnaposto: progettazione UX, catalogo prodotti, checkout, integrazione pagamenti. Inserire screenshot del sito reale.',
    tags: ['Shopify', 'UX', 'Pagamenti'],
  },
  {
    slug: 'rebranding-studio',
    title: 'Rebranding — Studio Professionale',
    category: 'Branding',
    year: '2024',
    client: 'Cliente segnaposto',
    cover: '#2a2620',
    excerpt: 'Nuova identità visiva: logo, palette e materiali coordinati. (segnaposto)',
    body: 'Descrizione segnaposto: ricerca, concept, logo, sistema visivo e applicazioni. Inserire il prima/dopo e le tavole del brand.',
    tags: ['Logo', 'Identità', 'Coordinato'],
  },
  {
    slug: 'campagna-ads-lead',
    title: 'Campagna Ads — Lead Generation',
    category: 'Ads',
    year: '2025',
    client: 'Cliente segnaposto',
    cover: '#2b2230',
    excerpt: 'Funnel pubblicitario per acquisizione contatti qualificati. (segnaposto)',
    body: 'Descrizione segnaposto: struttura del funnel, creatività, budget, costo per lead e risultati. Inserire i numeri reali della campagna.',
    tags: ['Meta Ads', 'Funnel', 'Lead'],
  },
  {
    slug: 'video-aziendale-corporate',
    title: 'Video Aziendale — Corporate',
    category: 'Video',
    year: '2024',
    client: 'Cliente segnaposto',
    cover: '#202a2e',
    excerpt: 'Video istituzionale per presentare l’azienda e il team. (segnaposto)',
    body: 'Descrizione segnaposto: storyboard, riprese, interviste e montaggio. Inserire il video finale e le foto di backstage.',
    tags: ['Corporate', 'Interviste', 'Storytelling'],
  },
];

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug);
