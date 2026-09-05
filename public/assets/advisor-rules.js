import {packages} from './commercial-data.js';
import {labelOf} from './advisor-knowledge.js';
const processLabels={auto_work:'Attività ripetitiva',auto_frequency:'Frequenza',auto_owner:'Responsabile',auto_standard:'Ripetibilità',auto_exceptions:'Eccezioni',auto_human:'Controllo umano',auto_failure:'Conseguenze di un errore'};
export function recommend(a){
 const reasons=[],missing=[],gates=[];
 if(a.intent==='automation'){
  for(const k of ['auto_work','auto_frequency','auto_owner','auto_standard','auto_exceptions','auto_human','auto_failure'])if(!a[k]||a[k]==='unknown'||['shared','unclear'].includes(a[k]))missing.push(processLabels[k]+': da chiarire.');
  if(a.auto_human==='sensitive')gates.push('Dati o decisioni sensibili: valutazione specifica.');
  if(a.auto_frequency==='rare')reasons.push('La bassa frequenza può rendere più conveniente semplificare il processo senza automatizzarlo.');
  if(a.auto_standard==='mixed')reasons.push('Le molte eccezioni richiedono prima una mappa dei casi e del controllo umano.');
  reasons.push('Il costo e la fattibilità vanno valutati sul processo e sugli strumenti reali.');
  return {id:'assessment',title:missing.length?'Possibile area da analizzare.':'Analisi di processo consigliata.',price:null,reasons,missing,gates,link:'/automazioni-ai/',useful:['Mappare processo, eccezioni e responsabilità'],unnecessary:['Aggiungere AI prima di conoscere il problema'],automation:missing.length?'Non abbastanza informazioni per raccomandare un’automazione.':'Candidato da verificare, con un responsabile e gestione degli errori.'};
 }
 if(a.intent==='ecommerce'||a.functions==='payments')gates.push('Catalogo, pagamenti e ordini: scope e-commerce separato.');
 if(['account','database','api','sensitive'].includes(a.functions))gates.push(labelOf('functions',a.functions)+': requisiti oltre il sito standard.');
 if(a.priority==='integration')gates.push('Strumenti e dati aziendali richiedono verifica delle integrazioni.');
 if(a.complexity==='large')gates.push('Oltre il perimetro pagine o piattaforma applicativa.');
 if(a.goal==='simplify')gates.push('Il risultato richiesto riguarda un processo interno da analizzare.');
 if(gates.length)return {id:'custom',title:'Prima, una valutazione su misura.',price:null,reasons:['I requisiti indicati richiedono un perimetro dedicato. Non è corretto assegnare automaticamente Signature.'],gates,missing:['Verifica tecnica e commerciale del perimetro'],link:'/contatti/',useful:['Analisi di dati, integrazioni e responsabilità'],unnecessary:['Acquistare un livello prima della verifica'],automation:a.problem==='manual'?'Possibile processo da approfondire.':'Non valutata.'};
 let id='essential';
 if(a.complexity==='medium'||a.goal==='choose'||a.functions==='compare'||a.functions==='booking'||a.priority==='complete')id='business';
 if(a.complexity==='deep'||a.goal==='differentiate'||a.functions==='editorial'||a.priority==='identity')id='signature';
 const prices=Object.fromEntries(packages.map(p=>[p.id,p.price]));
 if(id==='essential')reasons.push('Offerta e contatto rimangono entro un percorso essenziale.');
 if(id==='business')reasons.push('Servono informazioni o funzioni più articolate per accompagnare la scelta.');
 if(id==='signature')reasons.push('La profondità richiesta riguarda struttura, presentazione o personalizzazione.');
 if(a.complexity==='unknown')missing.push('Numero e struttura dei contenuti da definire.');
 if(a.current==='unknown')missing.push('Situazione attuale da verificare.');
 if(a.business==='other')missing.push('Settore e pubblico da approfondire.');
 if(/^\d+$/.test(a.budget)&&Number(a.budget)<prices[id])missing.push('Il livello compatibile supera il budget indicato: ridurre il perimetro oppure rivalutare il budget con Marco.');
 if(a.current==='none'&&a.intent==='redesign')missing.push('Hai indicato redesign e assenza di sito: chiarire la situazione attuale.');
 return {id,title:`${id[0].toUpperCase()+id.slice(1)} può essere un punto di partenza.`,price:prices[id],reasons,missing,gates,link:'/prezzi/#'+id,useful:id==='essential'?['Offerta chiara e contatto semplice']:['Percorsi e contenuti coerenti con le priorità'],unnecessary:['Account, database e AI generativa senza un bisogno definito'],automation:a.problem==='manual'?'Possibile area da analizzare: mancano processo, frequenza e responsabile.':'Nessuna automazione raccomandata dai dati disponibili.'};
}
export function projectProfile(a,r){
 const lines=['PROFILO DI PROGETTO — NON È UN PREVENTIVO'];
 const fields=[['business','Tipo attività'],['current','Situazione attuale'],['problem','Problema'],['goal','Obiettivo'],['priority','Priorità'],['functions','Funzioni richieste'],['complexity','Contenuti'],['budget','Budget']];
 if(a.intent!=='automation')for(const [key,title]of fields)lines.push(`${title}: ${a[key]?labelOf(key,a[key]):'Da chiarire'}`);
 if(a.intent==='automation')lines.push(`Tipo attività: ${a.business?labelOf('business',a.business):'Da chiarire'}`);
 if(a.intent==='automation')for(const key of ['auto_work','auto_frequency','auto_owner','auto_standard','auto_exceptions','auto_human','auto_failure'])lines.push(`${processLabels[key]}: ${a[key]?labelOf(key,a[key]):'Da chiarire'}`);
 lines.push(`Orientamento: ${r.title}`,`Motivi: ${r.reasons.join(' ')}`,`Funzioni suggerite: ${r.useful.join('; ')}`,`Probabilmente non necessarie: ${r.unnecessary.join('; ')}`,`Automazioni: ${r.automation}`,`Vincoli: ${r.gates.join(' ')||'Non sono emerse esigenze fuori dai livelli standard; resta da verificare il progetto.'}`,`Informazioni mancanti: ${r.missing.join(' ')||'Materiali, accessi e perimetro definitivo.'}`,'Prossimo passo: confrontare il perimetro e parlarne con Marco.');
 return lines.join('\n');
}
