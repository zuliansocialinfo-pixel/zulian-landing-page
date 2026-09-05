import {contactEndpoint} from './contact-config.js';
const form=document.querySelector('#contact-form');
if(form){
 const button=form.querySelector('[type=submit]'),status=form.querySelector('#contact-status');
 let requestId=null,lastBody=null,pending=false;
 try{const profile=sessionStorage.getItem('zulian-project-profile');sessionStorage.removeItem('zulian-project-profile');if(profile&&profile.startsWith('PROFILO DI PROGETTO'))form.elements.message.value=profile.slice(0,3000);}catch{} 
 if(!contactEndpoint){button.disabled=true;status.textContent='L’invio dal modulo è in fase di attivazione. Per ora usa email, telefono o WhatsApp indicati sopra.';}
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(pending||!contactEndpoint)return;
  const fields=[...form.querySelectorAll('[required]')];let first=null;
  for(const field of fields){const valid=field.checkValidity();field.setAttribute('aria-invalid',String(!valid));form.querySelector('#'+field.id+'-error').textContent=valid?'':field.type==='checkbox'?'Conferma di aver letto l’informativa.':field.type==='email'?'Inserisci un indirizzo email valido.':field.tagName==='TEXTAREA'?'Descrivi il progetto con almeno 20 caratteri.':'Inserisci il tuo nome (almeno 2 caratteri).';if(!valid&&!first)first=field;}
  if(first){first.focus();return;}
  const data={name:form.elements.name.value.trim(),email:form.elements.email.value.trim(),message:form.elements.message.value.trim(),website:form.elements.website.value,privacyAcknowledged:form.querySelector('#contact-privacy').checked};
  const body=JSON.stringify(data);if(body!==lastBody){requestId=crypto.randomUUID();lastBody=body;}
  pending=true;button.disabled=true;status.textContent='Invio in corso…';
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),25000);
  try{
   const result=await fetch(contactEndpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=UTF-8'},body:JSON.stringify({...data,requestId}),signal:controller.signal,redirect:'follow',credentials:'omit'});
   const response=await result.json();
   if(!result.ok||!response.ok||response.requestId!==requestId){
    const code=response.code;
    throw new Error(['capacity','rate'].includes(code)?'Il servizio ha raggiunto il limite di invio. Puoi contattarmi direttamente via email o telefono.':code==='uncertain'?'Non è possibile confermare l’invio. Contattami direttamente indicando il riferimento '+requestId+'.':'Invio non riuscito. I dati restano nel modulo: riprova oppure usa i contatti diretti.');
   }
   status.textContent='La richiesta è stata affidata al servizio email. Grazie: potrai ricevere la risposta all’indirizzo indicato. Riferimento: '+requestId;form.reset();lastBody=null;requestId=null;
  }catch(error){status.textContent=error.name==='AbortError'?'Il servizio non ha risposto in tempo. L’esito è da verificare: puoi riprovare con gli stessi dati oppure contattarmi direttamente.':error instanceof TypeError?'Non riesco a confermare l’invio. Controlla la connessione e riprova con gli stessi dati.':error.message;}
  finally{clearTimeout(timer);pending=false;button.disabled=false;status.focus();}
 });
}
