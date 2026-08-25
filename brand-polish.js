window.addEventListener('DOMContentLoaded',()=>{
  if(document.querySelector('.contact-chip')) return;
  const link=document.createElement('a');
  link.className='contact-chip';
  link.href='https://wa.me/393927950038?text='+encodeURIComponent('Ciao Marco, vorrei parlarti del mio progetto digitale.');
  link.target='_blank';
  link.rel='noopener noreferrer';
  link.setAttribute('aria-label','Scrivi a Marco Zulian su WhatsApp');
  link.textContent='Parla con Marco';
  document.body.appendChild(link);
});
