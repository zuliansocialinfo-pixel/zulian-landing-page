export const websiteSteps=['intent','business','current','problem','goal','priority','functions','complexity','budget'];
export const automationSteps=['intent','business','auto_work','auto_frequency','auto_owner','auto_standard','auto_exceptions','auto_human','auto_failure'];
export function createSession(){return {answers:{},history:[],current:'intent'};}
export function nextState(session,key,value,questions){
 if(session.current!==key||!questions[key]?.options.some(([id])=>id===value))throw new Error('Risposta non valida');
 const answers={...session.answers,[key]:value};
 const steps=value==='automation'||answers.intent==='automation'?automationSteps:websiteSteps;
 const informational=['comparison','price','process','support','seo_local','geo'];
 let current=key==='intent'&&informational.includes(value)?'information':steps[steps.indexOf(key)+1]||'recommendation';
 if(key==='intent'&&value==='unknown')current='business';
 if(key==='current'&&value==='none'&&answers.intent==='redesign')current='clarify_current';
 if(key==='clarify_current'){if(value==='new_site'){answers.intent='new_site';current='problem';}else{delete answers.current;current='current';}delete answers.clarify_current;}
 return {answers,history:[...session.history,{key,answers:session.answers}],current};
}
export function previousState(session){
 if(!session.history.length)return createSession();
 const last=session.history.at(-1);return {answers:{...last.answers},history:session.history.slice(0,-1),current:last.key};
}
