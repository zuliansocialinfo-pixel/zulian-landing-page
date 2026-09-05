import {models} from './model-data.js';
import {questions,information} from './advisor-knowledge.js';
import {createSession,nextState,previousState,websiteSteps,automationSteps} from './advisor-state.js';
import {recommend,projectProfile} from './advisor-rules.js';
function element(tag,text,className){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(className)el.className=className;return el;}
function link(text,url){const a=element('a',text,'btn');a.href=url;return a;}
export function mountAdvisor(root){
 let session=createSession();
 const sourceModel=models.find(m=>m.id===new URLSearchParams(location.search).get('model')); 
 if(new URLSearchParams(location.search).get('intent')==='automation')session=nextState(session,'intent','automation',questions);
 const render=(moveFocus=true)=>{
  root.replaceChildren();
  const screen=element('div');root.append(screen);
  if(sourceModel)screen.append(element('p','Punto di partenza: '+sourceModel.title+'. Il livello consigliato dipenderà dalle tue esigenze.','note'));
  if(session.current==='information'){
   const info=information[session.answers.intent];
   const heading=element('h2',info.title,'advisor-question');heading.tabIndex=-1;screen.append(heading,element('p',info.text));
   const actions=element('div',undefined,'actions');actions.append(link(info.label,info.link));
   const qualify=element('button','Valuta il mio progetto','btn primary');qualify.type='button';qualify.onclick=()=>{session={...session,current:'business'};render();};actions.append(qualify);screen.append(actions);
  }else if(session.current==='recommendation'){
   const r=recommend(session.answers),profile=projectProfile(session.answers,r)+(sourceModel?'\nModello consultato: '+sourceModel.title+' ('+sourceModel.package+')':'');
   const heading=element('h2',r.title,'advisor-question');heading.tabIndex=-1;screen.append(heading);
   if(r.price)screen.append(element('p',`Prezzo del livello: €${r.price.toLocaleString('it-IT')}. IVA inclusa. Costi esterni separati e dichiarati nel preventivo.`));
   const list=element('ul');[...r.reasons,...r.gates,...r.missing].forEach(reason=>list.append(element('li',reason)));screen.append(list);
   screen.append(element('p','È un orientamento basato sulle risposte, da verificare sui materiali reali. Non costituisce un preventivo o una promessa di fattibilità.','note'));
   const pre=element('pre',profile,'advisor-profile');screen.append(pre);
   const actions=element('div',undefined,'actions');actions.append(link('Approfondisci il perimetro',r.link));
   const download=element('button','Scarica il riepilogo','btn');download.type='button';download.onclick=()=>{const blob=new Blob([profile],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob);const a=link('Scarica',url);a.download='zulian-profilo-progetto.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};actions.append(download);
   const copy=element('button','Copia il riepilogo','btn');copy.type='button';copy.onclick=async()=>{try{await navigator.clipboard.writeText(profile);copy.textContent='Riepilogo copiato';}catch{const range=document.createRange();range.selectNodeContents(pre);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);copy.textContent='Testo selezionato: usa Copia';}};actions.append(copy);
   const print=element('button','Stampa il riepilogo','btn');print.type='button';print.onclick=()=>{document.querySelector('#print-profile')?.remove();const sheet=element('section',undefined);sheet.id='print-profile';sheet.append(element('h1','Zulian — profilo di progetto'),element('pre',profile));document.body.append(sheet);const clear=()=>sheet.remove();addEventListener('afterprint',clear,{once:true});window.print();};actions.append(print);
   const contact=element('button','Prepara la richiesta via email','btn primary');contact.type='button';contact.onclick=()=>{try{sessionStorage.setItem('zulian-project-profile',profile.slice(0,3000));location.assign('/contatti/');}catch{contact.replaceWith(link('Apri i contatti e copia il riepilogo','/contatti/'));}};actions.append(contact);
   const share=element('button','Prepara un messaggio WhatsApp','btn primary');share.type='button';share.onclick=()=>{const choice=element('div',undefined,'share-confirm');choice.append(element('p','Il riepilogo sarà inserito in un link verso WhatsApp. Aprendo il servizio esterno, il testo viene comunicato a quel servizio. Potrai rileggerlo prima di inviare il messaggio a Marco.'));const a=link('Apri WhatsApp con questo riepilogo','https://wa.me/393927950038?text='+encodeURIComponent(profile));a.target='_blank';a.rel='noopener noreferrer';choice.append(a);share.replaceWith(choice);};actions.append(share);screen.append(actions);
  }else{
   const q=questions[session.current];const steps=session.answers.intent==='automation'?automationSteps:websiteSteps;
   screen.append(element('p',session.current==='clarify_current'?'Chiarimento':`Passaggio ${steps.indexOf(session.current)+1} di ${steps.length}`,'advisor-progress'));
   const heading=element('h2',q.title,'advisor-question');heading.tabIndex=-1;screen.append(heading);
   if(q.help)screen.append(element('p',q.help,'note'));
   const choices=element('div',undefined,'advisor-options');choices.setAttribute('role','group');choices.setAttribute('aria-label',q.title);
   q.options.forEach(([id,label])=>{const b=element('button',label,'advisor-option');b.type='button';b.onclick=()=>{session=nextState(session,session.current,id,questions);render();};choices.append(b);});screen.append(choices);
  }
  const controls=element('div',undefined,'advisor-controls');
  if(session.history.length){const back=element('button','← Indietro','btn');back.type='button';back.onclick=()=>{session=previousState(session);render();};controls.append(back);}
  if(session.current!=='intent'){const restart=element('button','Ricomincia','btn');restart.type='button';restart.onclick=()=>{session=createSession();render();};controls.append(restart);}
  screen.append(controls);
  if(moveFocus)screen.querySelector('h2')?.focus({preventScroll:true});
 };
 render(false);
 return ()=>{session=createSession();root.replaceChildren();};
}
const root=document.querySelector('#advisor');if(root)mountAdvisor(root);
