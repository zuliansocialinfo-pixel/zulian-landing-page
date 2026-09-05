/* Zulian contact delivery. Owner account; no mailbox read permission. */
var ZULIAN_RECIPIENT = 'zulian.architettura.digitale@gmail.com';
function response_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
function validate_(body) {
 if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('invalid');
 var out = {};
 [['name',2,100],['email',5,254],['message',20,3000],['requestId',36,36]].forEach(function(rule) {
  if (typeof body[rule[0]] !== 'string') throw new Error('invalid');
  var value = body[rule[0]].trim();
  if (value.length < rule[1] || value.length > rule[2] || /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(value)) throw new Error('invalid');
  out[rule[0]] = value;
 });
 if (!/^[^\s@\r\n]+@[^\s@\r\n]+\.[^\s@\r\n]+$/.test(out.email) || /[\r\n]/.test(out.name)) throw new Error('invalid');
 if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(out.requestId)) throw new Error('invalid');
 if (body.privacyAcknowledged !== true || body.website) throw new Error('invalid');
 return out;
}
function doGet() { return response_({service:'zulian-contact',version:1}); }
function doPost(event) {
 var input;
 try {
  if (!event || !event.postData || event.postData.contents.length > 16000) return response_({ok:false,code:'invalid'});
  input=validate_(JSON.parse(event.postData.contents));
 } catch (_) { return response_({ok:false,code:'invalid'}); }
 var lock=LockService.getScriptLock();
 if (!lock.tryLock(3000)) return response_({ok:false,code:'busy'});
 try {
  var props=PropertiesService.getScriptProperties(),now=Date.now();
  var ledger=JSON.parse(props.getProperty('deliveryLedger') || '{"day":"","count":0,"requests":{}}');
  var day=new Date(now).toISOString().slice(0,10);
  if (ledger.day!==day) { ledger.day=day;ledger.count=0; }
  Object.keys(ledger.requests).forEach(function(id) { if(now-ledger.requests[id].at>86400000)delete ledger.requests[id]; });
  var old=ledger.requests[input.requestId];
  if (old) return response_({ok:old.state==='accepted',code:old.state==='accepted'?'accepted':'uncertain',requestId:input.requestId});
  if(ledger.count>=60 || MailApp.getRemainingDailyQuota()<1)return response_({ok:false,code:'capacity'});
  var digest=Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,input.email.toLowerCase()));
  var recent=Object.keys(ledger.requests).filter(function(id){var r=ledger.requests[id];return r.sender===digest&&now-r.at<3600000;}).length;
  if(recent>=3)return response_({ok:false,code:'rate'});
  ledger.count++;ledger.requests[input.requestId]={at:now,state:'pending',sender:digest};
  props.setProperty('deliveryLedger',JSON.stringify(ledger));
  try {
   MailApp.sendEmail({to:ZULIAN_RECIPIENT,replyTo:input.email,subject:'Zulian — nuova richiesta dal sito',name:'Zulian · modulo sito',body:'Nuova richiesta dal sito Zulian\n\nNome: '+input.name+'\nEmail: '+input.email+'\n\n'+input.message+'\n\nRiferimento: '+input.requestId+'\nInformativa privacy: presa visione dichiarata nel modulo.'});
   ledger.requests[input.requestId].state='accepted';props.setProperty('deliveryLedger',JSON.stringify(ledger));
   return response_({ok:true,code:'accepted',requestId:input.requestId});
  }catch(_){return response_({ok:false,code:'uncertain',requestId:input.requestId});}
 }catch(_){return response_({ok:false,code:'unavailable'});}finally{lock.releaseLock();}
}
