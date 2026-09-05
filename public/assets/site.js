const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const menu=document.querySelector('#menu');
const opener=document.querySelector('[data-menu-open]');
opener?.addEventListener('click',()=>{menu.showModal();opener.setAttribute('aria-expanded','true');});
document.querySelector('[data-menu-close]')?.addEventListener('click',()=>menu.close());
menu?.addEventListener('close',()=>{opener.setAttribute('aria-expanded','false');opener.focus();});
menu?.addEventListener('click',e=>{if(e.target===menu)menu.close();});
const counter=document.querySelector('[data-counter]');
if(counter&&!reduced.matches){const start=performance.now();function tick(now){const p=Math.min(1,(now-start)/1100);counter.textContent=String(Math.round(p*100)).padStart(2,'0');if(p<1)requestAnimationFrame(tick);}requestAnimationFrame(tick);}
const landscape=document.querySelector('.landscape');
if(landscape&&!reduced.matches&&matchMedia('(min-width: 1100px)').matches){
  let pending=false;
  const update=()=>{pending=false;if(document.hidden||reduced.matches)return;const p=Math.min(scrollY/700,1);landscape.style.transform=`rotateX(${16+p*10}deg) rotateZ(${15-p*9}deg) translateY(${p*35}px)`;};
  addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update);}},{passive:true});
  reduced.addEventListener('change',()=>{landscape.style.transform='';});
}
import {mountSearch} from './search.js';
document.querySelectorAll('[data-search-scope]').forEach(mountSearch);
if(!document.querySelector('#advisor')){
 let dialog=null,dispose=null,lastTrigger=null;
 document.addEventListener('click',async event=>{
  const a=event.target.closest('a');if(!a||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;
  const url=new URL(a.href,location.href);if(url.origin!==location.origin||url.pathname!=='/advisor/'||url.search)return;
  event.preventDefault();lastTrigger=a;
  if(!dialog){
   dialog=document.createElement('dialog');dialog.className='advisor-drawer';dialog.setAttribute('aria-label','Consulente Digitale');
   const top=document.createElement('div');top.className='menu-top';const title=document.createElement('span');title.textContent='Consulente Digitale';const close=document.createElement('button');close.className='menu-close';close.textContent='Chiudi ×';close.addEventListener('click',()=>dialog.close());top.append(title,close);
   const note=document.createElement('p');note.className='note';note.textContent='Percorso guidato a regole, senza AI generativa. Le risposte rimangono nel browser finché scegli di condividerle.';
   const mount=document.createElement('div');mount.className='advisor';mount.dataset.advisorMount='';dialog.append(top,note,mount);document.body.append(dialog);
   dialog.addEventListener('close',()=>{lastTrigger?.focus();});
   try{const {mountAdvisor}=await import('./advisor-ui.js');dispose=mountAdvisor(mount);}catch{mount.textContent='Il percorso non è disponibile. Puoi aprire la pagina dedicata o confrontare i prezzi.';const fallback=document.createElement('a');fallback.href='/prezzi/';fallback.textContent='Confronta i prezzi';mount.append(fallback);}
  }
  if(!dialog.open)dialog.showModal();
 });
}
document.querySelectorAll('[data-model-catalog]').forEach(scope=>{
 const tier=scope.querySelector('[data-model-tier]'),sector=scope.querySelector('[data-model-sector]'),items=[...scope.querySelectorAll('[data-model-entry]')];
 function update(){let count=0;for(const item of items){item.hidden=!!((tier.value&&item.dataset.tier!==tier.value)||(sector.value&&item.dataset.sector!==sector.value));if(!item.hidden)count++;}scope.querySelector('[data-model-count]').textContent=`${count} modelli`;scope.querySelector('[data-model-empty]').hidden=count!==0;}
 function store(){update();const u=new URL(location.href);for(const [k,v] of [['tier',tier.value],['sector',sector.value]]){if(v)u.searchParams.set(k,v);else u.searchParams.delete(k);}history.replaceState(null,'',u);}
 function restore(){const u=new URL(location.href);for(const [k,el] of [['tier',tier],['sector',sector]])el.value=[...el.options].some(o=>o.value===u.searchParams.get(k))?u.searchParams.get(k):'';update();}
 tier.addEventListener('change',store);sector.addEventListener('change',store);addEventListener('popstate',restore);restore();scope.querySelector('[data-model-reset]').addEventListener('click',()=>{tier.value='';sector.value='';store();tier.focus();});
});

const systemScene=document.querySelector('[data-system-scene]');
if(systemScene&&!reduced.matches&&'IntersectionObserver' in window){
 systemScene.classList.add('motion-ready');
 const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){systemScene.classList.add('is-connected');observer.disconnect();}},{threshold:.45});
 observer.observe(systemScene);
 reduced.addEventListener('change',()=>{if(reduced.matches){observer.disconnect();systemScene.classList.remove('motion-ready','is-connected');}});
}
