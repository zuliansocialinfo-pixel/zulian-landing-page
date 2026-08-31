window.addEventListener('DOMContentLoaded',()=>{
  const brandName='Zulian — Architettura Digitale';
  const isMarcoPage=/chi-marco-zulian\.html$/.test(location.pathname);

  /* Header: sostituisce il vecchio wordmark testuale con il nuovo logo ufficiale. */
  const headerBrand=document.querySelector('.site-header .brand');
  if(headerBrand){
    headerBrand.innerHTML='<img class="zulian-brand-logo" src="zulian-logo-dark.svg" alt="'+brandName+'">';
    headerBrand.setAttribute('aria-label',brandName+' home');
  }

  /* Home: aggiorna la grande firma editoriale senza modificare la struttura della hero. */
  const heroTitle=document.querySelector('.hero-brand-title');
  if(heroTitle){
    heroTitle.innerHTML='<span class="line">ZULIAN</span><span class="line">ARCHITETTURA</span><span class="line serif">DIGITALE</span>';
  }
  const heroEyebrow=document.querySelector('.hero.hero-brand .eyebrow');
  if(heroEyebrow){
    heroEyebrow.textContent='Web · E-commerce · App · Software · Automazioni';
  }
  const heroCopy=document.querySelector('.hero.hero-brand .hero-copy > p');
  if(heroCopy){
    heroCopy.textContent='Progetto siti, e-commerce, applicazioni, software e automazioni partendo dall’architettura: prima definiamo cosa deve fare il sistema, poi lo costruiamo.';
  }

  /* Navigazione: espone le nuove pagine senza cambiare la composizione del menu. */
  const mainNav=document.querySelector('#site-menu nav');
  if(mainNav){
    mainNav.innerHTML=[
      '<a href="soluzioni.html">Le <span>soluzioni</span></a>',
      '<a href="metodo.html">Il <span>metodo</span></a>',
      '<a href="lab.html">Zulian <span>Lab</span></a>',
      '<a href="formazione.html">La <span>formazione</span></a>',
      '<a href="contatti.html"><span>Parliamone</span></a>'
    ].join('');
    mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      document.querySelector('.menu-panel')?.classList.remove('is-open');
      document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }));
  }

  /* Footer: elimina i vecchi riferimenti visuali a Social Media Marketing. */
  document.querySelectorAll('.footer .footer-block').forEach(block=>{
    const strong=block.querySelector('strong');
    const span=block.querySelector('span');
    if(strong && strong.textContent.trim()==='Zulian Social Media Marketing'){
      strong.innerHTML='<img class="zulian-footer-logo" src="zulian-logo-dark.svg" alt="'+brandName+'">';
    }
    if(span && span.textContent.trim()==='Zulian Social Media Marketing'){
      span.textContent=brandName;
    }
  });

  /* Browser title + descrizione visibile ai motori che eseguono JS. */
  document.title=isMarcoPage
    ? 'Chi è Marco Zulian — Zulian Architettura Digitale'
    : 'Zulian — Architettura Digitale | Web, App, Software e Automazioni';

  const description=document.querySelector('meta[name="description"]');
  if(description && !isMarcoPage){
    description.content='Zulian Architettura Digitale progetta e sviluppa siti web, e-commerce, applicazioni, software e automazioni costruiti intorno a un obiettivo reale.';
  }
  const ogTitle=document.querySelector('meta[property="og:title"]');
  if(ogTitle && !isMarcoPage){
    ogTitle.content='Zulian — Architettura Digitale';
  }

  /* Favicon: solo la Z proprietaria. */
  let favicon=document.querySelector('link[rel~="icon"]');
  if(!favicon){
    favicon=document.createElement('link');
    favicon.rel='icon';
    document.head.appendChild(favicon);
  }
  favicon.type='image/svg+xml';
  favicon.href='zulian-mark.svg';

  /* Override minimo: stessa pagina, nuovo sistema di identità. */
  const style=document.createElement('style');
  style.setAttribute('data-zulian-brand','architettura-digitale');
  style.textContent=`
    .site-header{mix-blend-mode:normal!important}
    .zulian-brand-logo{display:block;height:36px;width:auto;max-width:min(320px,68vw)}
    .zulian-footer-logo{display:block;width:min(290px,80vw);height:auto;margin:0 0 8px}
    @media(max-width:600px){
      .zulian-brand-logo{height:30px;max-width:72vw}
      .zulian-footer-logo{width:min(250px,82vw)}
    }
  `;
  document.head.appendChild(style);

  /* Mantiene il contatto rapido già presente nel sito. */
  if(!document.querySelector('.contact-chip')){
    const link=document.createElement('a');
    link.className='contact-chip';
    link.href='https://wa.me/393927950038?text='+encodeURIComponent('Ciao Marco, vorrei parlarti del mio progetto digitale.');
    link.target='_blank';
    link.rel='noopener noreferrer';
    link.setAttribute('aria-label','Scrivi a Marco Zulian su WhatsApp');
    link.textContent='Parla con Marco';
    document.body.appendChild(link);
  }
});
