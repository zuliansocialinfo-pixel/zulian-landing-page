const toggle=document.querySelector('.demo-menu'),nav=document.querySelector('.demo-mobile');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.hidden=!open;});
addEventListener('keydown',e=>{if(e.key==='Escape'&&!nav.hidden){nav.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.focus();}});
const form=document.querySelector('#demo-request');
form?.addEventListener('submit',e=>{
 e.preventDefault();let first=null;
 for(const el of form.querySelectorAll('select')){const error=document.getElementById(el.id+'-error');error.textContent=el.value?'':'Scegli un’opzione per continuare.';el.setAttribute('aria-invalid',String(!el.value));el.setAttribute('aria-describedby',error.id);if(!el.value&&!first)first=el;}
 if(first){first.focus();return;}
 const result=document.querySelector('#demo-result');result.replaceChildren();
 const title=document.createElement('strong');title.textContent='Simulazione completata. Nessun dato è stato inviato.';result.append(title);
 for(const el of form.querySelectorAll('select')){const p=document.createElement('p');p.textContent=el.labels[0].textContent+': '+el.value;result.append(p);}
 const p=document.createElement('p');p.textContent='Nel progetto reale, consegna della richiesta, destinatario e risposta vengono definiti e verificati separatamente.';result.append(p);result.focus();
});
