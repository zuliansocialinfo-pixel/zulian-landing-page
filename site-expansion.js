window.addEventListener('DOMContentLoaded',()=>{
  const partnerInput=document.querySelector('[data-partner-name]');
  const partnerOutput=document.querySelector('[data-partner-output]');
  document.querySelector('[data-partner-generate]')?.addEventListener('click',()=>{
    const safe=(partnerInput?.value||'DEMO').trim().toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,4)||'DEMO';
    let hash=17; for(const c of safe) hash=(hash*31+c.charCodeAt(0))%9999;
    if(partnerOutput) partnerOutput.textContent=`ZA-${safe}-${String(hash).padStart(4,'0')}`;
  });

  const pipeline=document.querySelector('[data-pipeline]');
  if(pipeline){
    const cards=[...pipeline.querySelectorAll('[data-pipeline-card]')];
    let state=0;
    const render=()=>cards.forEach((card,i)=>{
      card.style.opacity=i===state?'1':'.35';
      card.style.transform=i===state?'translateY(-4px)':'none';
      card.style.borderColor=i===state?'rgba(240,111,69,.75)':'var(--line)';
      const label=card.querySelector('[data-state]');
      if(label) label.textContent=i<state?'COMPLETATO':i===state?'ATTIVO':'IN ATTESA';
    });
    document.querySelector('[data-pipeline-next]')?.addEventListener('click',()=>{state=(state+1)%cards.length;render()});
    cards.forEach((card,i)=>card.addEventListener('click',()=>{state=i;render()}));
    render();
  }

  const automation=document.querySelector('[data-automation-console]');
  document.querySelector('[data-run-automation]')?.addEventListener('click',async e=>{
    const button=e.currentTarget; button.disabled=true;
    const rows=[
      ['event','TRIGGER  nuova richiesta dal sito'],
      ['','CHECK    consenso e campi minimi'],
      ['','ROUTE    richiesta → percorso commerciale'],
      ['ok','ACTION   scheda operativa creata'],
      ['ok','ACTION   notifica inviata'],
      ['event','HUMAN    decisione finale assegnata a una persona']
    ];
    if(automation) automation.innerHTML='';
    for(const [cls,text] of rows){
      const line=document.createElement('div'); line.className=cls; line.textContent=text; automation?.appendChild(line);
      if(!matchMedia('(prefers-reduced-motion: reduce)').matches) await new Promise(r=>setTimeout(r,240));
    }
    button.disabled=false;
  });

  const certificateDialog=document.querySelector('[data-certificate-dialog]');
  const certificateDialogImage=certificateDialog?.querySelector('[data-certificate-dialog-image]');
  const certificateClose=certificateDialog?.querySelector('[data-certificate-close]');
  document.querySelectorAll('[data-certificate-image]').forEach(button=>{
    button.addEventListener('click',()=>{
      if(!certificateDialog||!certificateDialogImage) return;
      const source=button.getAttribute('data-certificate-image');
      const thumb=button.querySelector('img');
      if(!source) return;
      certificateDialogImage.src=source;
      certificateDialogImage.alt=thumb?.alt||'Certificato ingrandito';
      if(typeof certificateDialog.showModal==='function') certificateDialog.showModal();
      else certificateDialog.setAttribute('open','');
    });
  });
  certificateClose?.addEventListener('click',()=>certificateDialog?.close());
  certificateDialog?.addEventListener('click',event=>{
    if(event.target===certificateDialog) certificateDialog.close();
  });
  certificateDialog?.addEventListener('close',()=>{
    if(certificateDialogImage) certificateDialogImage.src='';
  });
});
