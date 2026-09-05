export function normalize(value){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
const aliases={costi:['costo','costi'],prezzo:['costo','prezzo'],prezzi:['costo','prezzi'],preventivo:['costo','preventivo'],maps:['seo','maps'],google:['google','seo'],ia:['ai','intelligenza'],workflow:['automazioni','processo'],processi:['processi','automazioni']};
export function matches(text,query){const source=normalize(text);return normalize(query).trim().split(/\s+/).filter(Boolean).every(token=>(aliases[token]||[token]).some(term=>source.includes(term)));}
export async function mountSearch(scope){
 const input=scope.querySelector('[data-search]'),items=[...scope.querySelectorAll('[data-search-item]')];let index=null;
 function update(write=true){const q=input.value.slice(0,100);let count=0;for(const item of items){const record=index?.find(r=>r.url===item.getAttribute('href'));item.hidden=!matches(record?.text||item.textContent,q);if(!item.hidden)count++;}scope.querySelector('[data-result-count]').textContent=`${count} ${count===1?'risultato':'risultati'}`;scope.querySelector('[data-empty]').hidden=count!==0;if(write){const url=new URL(location.href);if(q.trim())url.searchParams.set('q',q);else url.searchParams.delete('q');history.replaceState(null,'',url);}}
 function restore(){input.value=new URL(location.href).searchParams.get('q')?.slice(0,100)||'';update(false);}
 input.maxLength=100;input.addEventListener('input',()=>update());scope.querySelector('[data-reset]').addEventListener('click',()=>{input.value='';update();input.focus();});addEventListener('popstate',restore);restore();
 try{const result=await fetch('/assets/guide-index.json');if(!result.ok)throw Error();index=await result.json();update(false);}catch{const note=document.createElement('p');note.className='note';note.textContent='La ricerca completa non è disponibile: puoi cercare nei titoli e nelle descrizioni oppure aprire le guide qui sotto.';scope.prepend(note);}
}
