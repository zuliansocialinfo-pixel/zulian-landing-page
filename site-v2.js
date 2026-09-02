document.documentElement.classList.add('js');
document.body?.classList.add('is-loading');

window.addEventListener('DOMContentLoaded',()=>{
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse=window.matchMedia('(pointer: coarse)').matches;
  const loader=document.querySelector('.loader');
  const counter=document.querySelector('.loader-number');
  const menuToggle=document.querySelector('.menu-toggle');
  const menuPanel=document.querySelector('.menu-panel');
  document.querySelectorAll('.site-header .brand').forEach(link=>{if(!link.hasAttribute('aria-label')) link.setAttribute('aria-label','Zulian Architettura Digitale home')});

  const endLoader=()=>{
    document.body.classList.remove('is-loading');
    loader?.classList.add('is-done');
  };

  if(reduce){
    if(counter) counter.textContent='100';
    endLoader();
  }else{
    let value=0;
    const start=performance.now();
    const duration=1100;
    const tick=(now)=>{
      const p=Math.min(1,(now-start)/duration);
      value=Math.round(100*(1-Math.pow(1-p,3)));
      if(counter) counter.textContent=String(value).padStart(2,'0');
      if(p<1) requestAnimationFrame(tick); else setTimeout(endLoader,120);
    };
    requestAnimationFrame(tick);
  }

  const setMenu=(open)=>{
    menuPanel?.classList.toggle('is-open',open);
    menuToggle?.setAttribute('aria-expanded',String(open));
    document.body.style.overflow=open?'hidden':'';
  };
  menuToggle?.addEventListener('click',()=>setMenu(!menuPanel?.classList.contains('is-open')));
  menuToggle?.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();menuToggle.click();}});
  menuPanel?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));

  if(!reduce && window.Lenis){
    const lenis=new Lenis({duration:1.05,smoothWheel:true,wheelMultiplier:.92,touchMultiplier:1.15});
    window.__zulianLenis=lenis;
    const raf=(time)=>{lenis.raf(time);requestAnimationFrame(raf)};
    requestAnimationFrame(raf);
  }

  if(window.gsap){
    gsap.registerPlugin(ScrollTrigger);
    const revealEls=gsap.utils.toArray('[data-reveal]');
    if(reduce){
      gsap.set(revealEls,{opacity:1,y:0});
      gsap.set('[data-maintenance-logo]',{opacity:1,y:0,scale:1});
    }else{
      revealEls.forEach((el,i)=>{
        gsap.fromTo(el,{opacity:0,y:36},{opacity:1,y:0,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true},delay:(i%3)*.03});
      });

      gsap.fromTo('.hero h1 .line',{yPercent:105},{yPercent:0,duration:1.1,stagger:.08,ease:'power4.out',delay:1.1});
      gsap.fromTo('.hero-copy',{opacity:0,y:30},{opacity:1,y:0,duration:.9,ease:'power3.out',delay:1.4});

      const maintenanceLogo=document.querySelector('[data-maintenance-logo]');
      if(maintenanceLogo){
        const maintenanceTl=gsap.timeline({delay:.72});
        maintenanceTl
          .fromTo(maintenanceLogo,{opacity:0,y:24,scale:.94},{opacity:1,y:0,scale:1,duration:1.05,ease:'power4.out'})
          .fromTo('.maintenance-status',{opacity:0,x:-18},{opacity:1,x:0,duration:.55,ease:'power3.out'},'-=.55')
          .fromTo('.maintenance-prices > div',{opacity:0,y:14},{opacity:1,y:0,duration:.55,stagger:.08,ease:'power3.out'},'-=.25');

        gsap.to('.maintenance-hero .hero-orbit svg',{scale:1.035,duration:4.8,repeat:-1,yoyo:true,ease:'sine.inOut',transformOrigin:'50% 50%'});
        gsap.to('.maintenance-hero .orbit-dot',{scale:1.75,opacity:.46,duration:1.45,repeat:-1,yoyo:true,ease:'sine.inOut',transformOrigin:'50% 50%'});

        if(!coarse){
          document.querySelectorAll('[data-maintenance-offer]').forEach(card=>{
            card.addEventListener('mouseenter',()=>gsap.to(card,{y:-8,duration:.28,ease:'power2.out',overwrite:true}));
            card.addEventListener('mouseleave',()=>gsap.to(card,{y:0,duration:.36,ease:'power3.out',overwrite:true}));
          });
        }
      }

      if(!coarse){
        gsap.to('.face-frame img',{yPercent:8,ease:'none',scrollTrigger:{trigger:'.face-strip',start:'top bottom',end:'bottom top',scrub:true}});
      }

      const statement=document.querySelector('.statement [data-fill-text]');
      if(statement){
        const words=statement.textContent.trim().split(/\s+/);
        statement.innerHTML=words.map(w=>`<span class="word">${w}</span>`).join(' ');
        const els=[...statement.querySelectorAll('.word')];
        ScrollTrigger.create({trigger:statement,start:'top 78%',end:'bottom 30%',scrub:true,onUpdate:self=>{
          const count=Math.ceil(self.progress*els.length);
          els.forEach((el,i)=>el.classList.toggle('is-active',i<count));
        }});
      }

      const circleSection=document.querySelector('.circle-story');
      if(circleSection){
        const tl=gsap.timeline({scrollTrigger:{trigger:circleSection,start:'top top',end:'bottom bottom',scrub:1}});
        tl.fromTo('.circle-a',{xPercent:-35,yPercent:18,scale:.8,opacity:.35},{xPercent:0,yPercent:0,scale:1,opacity:1,duration:1},0)
          .fromTo('.circle-b',{yPercent:-35,scale:.8,opacity:.35},{yPercent:0,scale:1,opacity:1,duration:1},0)
          .fromTo('.circle-c',{xPercent:35,yPercent:18,scale:.8,opacity:.35},{xPercent:0,yPercent:0,scale:1,opacity:1,duration:1},0)
          .to('.circle-stage',{scale:1.65,duration:1.6,ease:'power2.inOut'},1)
          .to('.circle',{opacity:.16,duration:.7},1.9)
          .to('.circle-copy h2',{opacity:1,duration:.7},2.05);
      }

      gsap.to('.demo-card',{yPercent:-3,stagger:.06,ease:'none',scrollTrigger:{trigger:'.demos',start:'top bottom',end:'bottom top',scrub:true}});
    }
  }else{
    document.querySelectorAll('[data-reveal]').forEach(el=>{el.style.opacity='1';el.style.transform='none'});
  }
});
