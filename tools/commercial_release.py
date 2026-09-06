"""Commercial release: V4 + owner-approved material supplements (2026-09-06).

Applied by build.py after the original editorial registry is loaded. All pages
use the existing shell, typography and components; no client-side price injection.
"""
from copy import deepcopy
from html import escape
from math import ceil

VERSION = '6 settembre 2026 · V4 + materiali'
CERT_SOURCE = 'https://github.com/zuliansocialinfo-pixel/zulian-landing-page/blob/5e5d78a449036f0d0200b353bb3ed8a9493767d2/assets/certificates/'
AUTOMATIONS = [
 ('Assistente vocale AI + appuntamenti',1500,'Un numero, un calendario, una lingua. Risponde alle chiamate in entrata, usa FAQ e script approvati, verifica disponibilità e crea, modifica o annulla appuntamenti. Passaggio a una persona nei casi previsti.',60),
 ('Assistente WhatsApp AI + appuntamenti',1200,'Un numero WhatsApp, un calendario, una lingua e un percorso principale. Risponde, raccoglie le informazioni concordate e prenota, modifica o annulla appuntamenti.',60),
 ('Recupero lead e risposta immediata',650,'Un evento iniziale, un canale e una destinazione. Risposta automatica, fino a 3 tentativi concordati, notifica al referente e arresto quando la persona risponde o prenota.',30),
 ('Conferme e promemoria appuntamenti',450,'Un calendario e un canale transazionale: conferma, fino a 2 promemoria e percorso per annullare o riprogrammare. Non include un assistente conversazionale AI.',30),
 ('Raccolta, qualificazione e smistamento lead',550,'Fino a 8 campi, regole approvate, riepilogo e inoltro a email, WhatsApp, foglio dati o destinazione concordata. Nessun CRM sviluppato o amministrato da ZAD.',30),
]
INTEGRATIONS = [
 ('Integrazione automazione/app nel sito',200,'Un punto compatibile: widget, modulo, webhook o CTA. Non comprende lo sviluppo dell’automazione/app esterna. Un semplice link di contatto già incluso non viene riaddebitato.'),
 ('API standard documentata',300,'Una API esterna, un flusso dati, autenticazione standard, mapping e test. Non si applica al collegamento già compreso nel prodotto acquistato.'),
 ('API standard aggiuntiva',250,'Una ulteriore API documentata nello stesso progetto. Non sostituisce né duplica la prima API.'),
 ('Installazione n8n self-hosted',350,'Una VPS del cliente, installazione, HTTPS, segreti, export/backup iniziale e consegna. Server, aggiornamenti e monitoraggio continuativi esclusi.'),
 ('Deploy runtime custom',650,'Un servizio/container già sviluppato e previsto nel progetto, su server del cliente. Non si somma al deploy standard incluso in APP START.'),
 ('Integrazione CRM/gestionale esistente',350,'Un collegamento standard a un sistema già scelto e gestito dal cliente. Nessuna costruzione o amministrazione del gestionale.'),
]
OTHER_EXTRAS = [
 ('Pagina funzionale aggiuntiva',150,'Una pagina nel layout del progetto, fino a 400 parole fornite.'),
 ('Modulo avanzato',150,'Un modulo: massimo 10 campi e 2 regole condizionali; trasporto dati concordato.'),
 ('Modulo multistep',300,'Un percorso: massimo 4 passaggi e 15 campi; trasporto dati concordato.'),
 ('Upload file',120,'Un campo e un tipo di file; limiti, storage e protezioni definiti prima dell’attivazione.'),
 ('WhatsApp Business: configurazione base',150,'Profilo, orari e 5 risposte rapide su account del cliente. Non è un assistente AI e non comprende WhatsApp API.'),
 ('Calendario tramite embed',150,'Un calendario esistente e un servizio. Account e impostazioni privacy concordati.'),
 ('Prenotazione con pagamento',350,'Un servizio e un gateway standard; esclusi commissioni, split payment e gestionale.'),
 ('Assistente AI documentale',900,'Fino a 20 documenti testuali / 100 pagine, un canale; esclusi dati sensibili.'),
 ('Assistente AI raccolta contatti',1200,'Un canale web, 5 campi e un percorso; nessuna decisione vincolante.'),
 ('Prima lingua oltre quelle incluse',250,'Una lingua ulteriore entro il limite di testo sorgente del pacchetto.'),
 ('Ulteriore lingua nello stesso ordine',150,'Seconda o successiva lingua extra nello stesso ordine.'),
 ('Configurazione Weglot',250,'Alternativa concordata al multilingua nativo, non un doppio costo automatico. Canone esterno escluso.'),
 ('Tracciamento conversioni',300,'Fino a 3 eventi, un contenitore, consenso e test prima dell’attivazione.'),
 ('Dashboard essenziale',450,'Una fonte dati, fino a 5 indicatori e un report. Non è un gestionale.'),
 ('Google Business Profile',250,'Un profilo idoneo, dati e fino a 10 foto già fornite; verifica del provider non garantita.'),
 ('Landing locale aggiuntiva',180,'Una pagina distinta e utile, una località, fino a 500 parole.'),
 ('Audit dati strutturati',250,'Un sito fino a 10 pagine: verifica e correzione di dati documentabili.'),
 ('Digital Guide Light',350,'8 pagine e un giro di revisione. Già inclusa in Business: non si somma.'),
 ('Digital Guide Expanded',650,'12 pagine e due giri di revisione. Già inclusa in Signature; upgrade da Light inclusa: solo €300.'),
 ('Micro-intervento',50,'Fino a 30 minuti concordati; non si applica alla correzione di difetti imputabili a ZAD.'),
 ('Email di conferma',180,'Un messaggio transazionale e un evento. Non si duplica se compreso nell’automazione scelta.'),
 ('Sequenza di 3 email',350,'Tre messaggi e un flusso, con base giuridica e piattaforma approvate.'),
 ('Triage AI non decisionale',900,'Fino a 5 categorie e revisione umana; esclusi ambiti ad alto rischio.'),
]

def money(value):
    return '€' + format(value, ',').replace(',', '.')

def visual_supplement(quantity, materials):
    """New/sourced/lightly edited visuals only; ready files are not counted."""
    if isinstance(quantity, bool) or not isinstance(quantity, int) or quantity < 0:
        raise ValueError('La quantità deve essere un intero non negativo.')
    return max(0, ceil((quantity - materials['includedVisuals']) / materials['extraVisualBlock'])) * materials['extraVisualPrice']

def table(caption, headers, rows):
    return ('<div class="table-scroll" role="region" tabindex="0" aria-label="' + escape(caption) + '"><table><caption>' + escape(caption) + '</caption><thead><tr>' + ''.join('<th scope="col">'+escape(str(h))+'</th>' for h in headers) + '</tr></thead><tbody>' + ''.join('<tr>'+''.join(('<th scope="row">' if i==0 else '<td>')+escape(str(v))+('</th>' if i==0 else '</td>') for i,v in enumerate(row))+'</tr>' for row in rows) + '</tbody></table></div>')

def section(id, heading, *paragraphs, items=None, html=''):
    return {'id':id,'heading':heading,'paragraphs':list(paragraphs),'items':items or [],'html':html}

def automation_table():
    return table('Cinque automazioni: prezzo del progetto, funzioni e assistenza iniziale', ['Automazione','Prezzo fisso ZAD','Che cosa ricevi','Assistenza iniziale'], [(n,money(p),s,str(d)+' giorni') for n,p,s,d in AUTOMATIONS])

def integration_table():
    return table('Integrazioni separate: si acquistano soltanto quando necessarie', ['Voce','Prezzo ZAD','Perimetro'],[(n,money(p),s) for n,p,s in INTEGRATIONS])

def materials_section(data):
    m=data['commercial']['materials']
    samples=[(f'{n} immagini da preparare',money(visual_supplement(n,m))) for n in (5,10,15,20,25,30)]
    return section('materiali','Foto, logo e materiali: incluso oppure extra?',
      'I pacchetti comprendono l’inserimento e l’ottimizzazione web dei materiali pronti previsti nelle pagine concordate: ridimensionamento, compressione e adattamento leggero. Non si applica un supplemento solo perché consegni 10 o 20 foto già utilizzabili. Cataloghi, ritocchi complessi e ampliamenti del perimetro sono diversi.',
      'Se parti senza immagini pronte, sono compresi fino a 5 visual semplici complessivi: ricerca di immagini utilizzabili, adattamento leggero oppure creazione digitale illustrativa concordata. Oltre questa soglia: €100 per ogni blocco, anche parziale, di 10 visual aggiuntivi. Il conteggio riguarda il progetto intero, non ogni pagina o lingua.',
      'Il logo esistente viene adattato per il web. Se manca, è incluso un logo tipografico semplice: 1 proposta e 1 revisione, esportazione web. Non comprende naming, ricerca marchi, registrazione, illustrazione complessa o un sistema completo di identità visiva.',
      'Hai bisogno di più lavoro sul logo? Il pacchetto aggiuntivo da €100 comprende 2 proposte tipografiche semplici alternative e fino a 2 revisioni, con file SVG/PNG. Si applica solo dopo approvazione. Branding completo o marchio illustrato: preventivo dedicato, non promesso a €100.',
      'La sistemazione del testo sorgente entro 1.500 / 3.000 / 5.000 parole resta inclusa nel rispettivo pacchetto. La scrittura originale quando mancano testi pronti, su informazioni reali fornite dal cliente, costa €100 per blocco fino a 500 parole, con 1 revisione. Non si riaddebita una lavorazione già compresa.',
      'Esempio: Essential + 10 nuovi visual semplici = €1.200 ZAD. Essential + 20 nuovi visual semplici = €1.300 ZAD. Un logo tipografico semplice entro la soglia inclusa non cambia questi totali. Provider e licenze a pagamento restano separati.',
      'Questi blocchi da €100 NON sono servizi fotografici in presenza: shooting, riprese originali, trasferte, modelli, musica e licenze premium richiedono un preventivo specifico. Le immagini illustrative o generate non vengono spacciate per foto reali di lavori, locali, personale o clienti.',
      'Prima di procedere scriviamo quanti materiali mancano, che cosa verrà realizzato e il totale. Nessun extra automatico o a sorpresa. Quantità, diritti e approvazione finale sono registrati nel preventivo.',
      html=table('Esempi di supplemento per nuovi visual semplici, con i primi 5 inclusi', ['Quantità totale da preparare','Supplemento complessivo ZAD'],samples))

def app_section():
    return section('app-start','APP START — €2.500, prezzo fisso',
      'Una web app/PWA essenziale per un solo processo reale, non una promessa di qualunque software a €2.500. Massimo 5 schermate funzionali e 2 ruoli. Esempi da verificare: raccolta strutturata di richieste o consultazione di dati con accesso riservato. Non è un CRM o ERP.',
      'Inclusi: analisi e perimetro scritto; un flusso completo; interfaccia responsive; PWA installabile quando compatibile; autenticazione base se necessaria; database strutturato e pannello essenziale per i dati del flusso; validazioni e stati di errore.',
      'Per farla funzionare: repository e configurazione iniziale di un ambiente standard di produzione sull’account del cliente; HTTPS, segreti separati, controllo accessi e validazione lato server; logging/errori essenziale; backup/export nativo disponibile nel piano oppure procedura di export documentata; deploy automatico quando supportato; collegamento dominio/subdominio disponibile.',
      'Consegna: test del flusso critico, sorgenti/build, mappa delle dipendenze, istruzioni di deploy e una sessione guidata fino a 60 minuti. Inclusi 30 giorni di correzione iniziale dei difetti del lavoro consegnato, senza limitare i diritti inderogabili applicabili.',
      'Non inclusi: app native e store, pagamenti, AI/Voice/WhatsApp, chat/realtime, geolocalizzazione, multi-tenant, ulteriori ruoli/schermate/flussi, migrazioni, API esterne, CRM/ERP, VPS/Docker/runtime custom e audit o certificazioni di sicurezza. Si quotano separatamente; un progetto più grande diventa Applicazione Custom.',
      'La messa in produzione standard sopra descritta è già nei €2.500: non si aggiungono €650 di deploy per lo stesso lavoro. L’integrazione in un sito esistente è una voce distinta quando richiesta. Hosting, database, dominio e altri fornitori restano del cliente.',
      'ZAD consegna l’applicazione funzionante e documentata. Il cliente individua chi gestirà esercizio, log, backup, rinnovi, aggiornamenti e manutenzione successiva. Non è compresa una gestione operativa continuativa.')

def external_section():
    return section('costi-esterni','Spese accessorie a carico del cliente',
      'Non sono comprese nel prezzo ZAD. Nel preventivo sono separate dal lavoro: fornitore, piano, valuta, rinnovo o unità di consumo e responsabile dell’account. Si attiva solo quanto serve al progetto ed è stato approvato, non tutta la lista.',
      'Account, server, numeri e abbonamenti sono intestati e pagati dal cliente quando possibile; eventuali eccezioni sono esplicite. Il prezzo fisso ZAD non rende gratuiti o illimitati i consumi di terzi.',
      items=['Dominio, hosting, server/VPS, database gestiti, spazio per file e backup.',
        'Zapier, n8n Cloud e altre piattaforme; anche con n8n self-hosted il server resta un costo distinto.',
        'API, modelli AI, elaborazione voce, telefonia, numero e minuti di conversazione.',
        'WhatsApp/Meta/BSP, SMS, email transazionali e relativi messaggi o consumi.',
        'Calendari o servizi di prenotazione, quando richiedono un piano a pagamento.',
        'Shopify o altra piattaforma commerce, gateway e commissioni di pagamento.',
        'Licenze di plugin, font, foto, video, musica e altri asset premium.',
        'Account sviluppatore e pubblicazione su store, solo per progetti che li prevedono.',
        'Budget pubblicitario, shooting/trasferte e professionisti esterni (legale, traduzioni, audit) approvati separatamente.'])

def support_section():
    return section('consegna-assistenza','Consegna, assistenza iniziale e gestione successiva',
      'Racconti il bisogno; definiamo il flusso, scegliamo gli strumenti, configuriamo, testiamo e consegniamo. Le cinque automazioni comprendono analisi, configurazione del percorso standard, test e istruzioni. L’assistente vocale e quello WhatsApp includono 60 giorni di assistenza iniziale; le altre automazioni e APP START ne includono 30.',
      'La finestra iniziale copre problemi riproducibili della configurazione e del lavoro consegnato. Non è un abbonamento di gestione, un presidio 24/7 o una garanzia di risultato. Nuove funzioni, credenziali cambiate/scadute, blocchi o modifiche dei provider e gestione ordinaria non sono automaticamente inclusi. Restano fermi i diritti inderogabili applicabili.',
      'ZAD non sviluppa né amministra CRM o gestionali. Un sistema già del cliente può essere integrato con voce distinta. Server, rinnovi, monitoraggio, backup e manutenzione applicativa dopo la consegna richiedono un responsabile scelto dal cliente.',
      'I siti statici non hanno un canone ZAD obbligatorio. L’eventuale Care CMS a €120/mese è un servizio facoltativo, limitato a un sito compatibile e con incarico separato: non comprende app, server, CRM o automazioni in gestione continua.')

def apply_commercial_release(original_pages, data):
    pages=deepcopy(original_pages)
    by_route={p['route']:p for p in pages}
    # One canonical product source also feeds homepage offers, comparison and advisor.
    packages=data['packages']
    assert [p['price'] for p in packages]==[1100,1600,2400]
    assert [p['pageCount'] for p in packages]==[4,7,10]
    def replace(route,label,title,intro,sections,related=None,before=''):
        item={'route':route,'label':label,'title':title,'intro':intro,'sections':sections,
              'related':related or [('Chiedi il preventivo','/contatti/'),('Confronta i modelli','/modelli/')], 'before':before}
        if route in by_route: by_route[route].clear();by_route[route].update(item)
        else: pages.append(item);by_route[route]=item
    price_sections=[
      section('inclusioni','Che cosa comprende il sito',
        'I tre pacchetti riguardano siti non e-commerce. Le versioni in più lingue non moltiplicano le pagine funzionali; le pagine legali necessarie sono fuori conteggio, su testi forniti o validati dal cliente.',
        'La base include struttura, responsive/mobile, navigazione e contatti, metadati essenziali, sitemap e indicizzazione pertinente, ottimizzazione dei media e verifiche di base su funzioni, tastiera, focus, contrasto e movimento ridotto. SEO, vendite e citazioni AI non sono garantite.',
        'Le lingue totali 3 / 5 / 7 includono la principale: predisposizione tecnica e testi forniti oppure bozza di traduzione assistita entro il limite sorgente. Approvazione del cliente prima della pubblicazione; revisione madrelingua e traduzioni giurate escluse.',
        'I video inclusi 1 / 3 / 6 sono clip integrate fino a 20 secondi, un formato web per clip, ricavate da materiali pronti, del cliente o già utilizzabili con licenza, con adattamento leggero. Riprese originali e nuove produzioni complesse sono separate.',
        'Digital Guide: Light di 8 pagine già inclusa in Business; Expanded di 12 pagine già inclusa in Signature. Non si paga due volte la guida compresa. Upgrade Business da Light a Expanded: solo €300.',
        'Sito, automazione e applicazione sono prodotti distinti. Link ordinari di contatto previsti nel sito non sono integrazioni a pagamento; un widget, un collegamento API o un flusso dati esterno richiede invece la voce concordata.'),
      materials_section(data),
      section('automazioni','Cinque automazioni utili, cinque prezzi fissi',
        'Prezzi del progetto finito: analisi del bisogno, configurazione/sviluppo del flusso standard, test, messa in funzione e consegna. Non sono canoni ZAD. Il calendario/connettore standard previsto nel prodotto è già incluso; adattatori non standard e collegamenti ulteriori si preventivano prima.',
        'Funzionamento anche fuori orario secondo la configurazione, la disponibilità dei provider e i limiti del piano del cliente: non equivale a un operatore umano o a disponibilità garantita. Uso dell’AI dichiarato, regole approvate e passaggio umano per eccezioni. Nessuna promessa di non perdere mai un contatto.',
        html=automation_table()),
      section('integrazioni','Integrazioni: separate, solo se necessarie',
        'Una stessa funzione già inclusa non viene venduta nuovamente come extra. Il preventivo distingue sviluppo del prodotto, eventuale punto di integrazione nel sito, infrastruttura speciale e provider.',
        'API non standard: da €650, con totale definito sul caso reale prima dell’ordine. Non è il prezzo di qualsiasi integrazione.',
        html=integration_table()),
      app_section(),
      section('e-commerce','E-commerce: un perimetro diverso',
        'Starter €2.500: fino a 25 prodotti semplici e 5 categorie, un mercato/valuta, un gateway standard e una regola di spedizione. Business €4.500: fino a 100 prodotti semplici e 10 categorie, import pulito, un gateway, regole standard e una integrazione documentata.',
        'Fattibilità, materiali e gestione degli ordini si verificano prima. Non ereditano automaticamente lingue e video dei siti vetrina. Commissioni, piattaforma, cataloghi da ripulire, migrazioni complesse, mercati o funzioni ulteriori sono separati. Commerce avanzato: preventivo dedicato.'),
      external_section(),
      section('altri-extra','Altre funzioni acquistabili separatamente',
        'Queste voci si applicano solo a richieste ulteriori. Il preventivo evita sovrapposizioni con ciò che è già compreso nel pacchetto o nell’automazione.',
        html='<div class="faq"><details><summary>Apri il listino degli altri extra e dei relativi limiti</summary>'+table('Extra opzionali, non preselezionati', ['Servizio','Prezzo ZAD','Perimetro'],[(n,money(p),s) for n,p,s in OTHER_EXTRAS])+'</details></div>'),
      support_section(),
      section('pagamenti','Prezzo finale, pagamento e avvio',
        'Prezzi complessivi della prestazione ZAD, IVA inclusa se dovuta; eventuale bollo assorbito. Il trattamento fiscale compare nel preventivo. Nessuna IVA aggiunta in seguito al totale accettato.',
        '50% all’accettazione e 50% dopo collaudo positivo, prima della pubblicazione o consegna definitiva. Esempi: Essential €550 + €550; Business €800 + €800; Signature €1.200 + €1.200; APP START €1.250 + €1.250.',
        'Per i siti: finestre indicative di 7–10, 10–15 e 15–25 giorni lavorativi. Partono dall’avvio confermato con accordo, acconto, materiali e accessi completi. La data del singolo progetto è scritta nel preventivo, non una promessa automatica di 48 ore.',
        'Preventivo valido 15 giorni; gli extra richiedono approvazione scritta prima dell’esecuzione. Le condizioni già sottoscritte non cambiano retroattivamente. Per i consumatori restano le tutele e gli adempimenti applicabili, incluse le regole sull’avvio anticipato.',
        'Aggiornamento commerciale: '+VERSION+'. Questa pagina spiega il listino; non attiva un ordine o un pagamento senza un preventivo identificato.'),
    ]
    anchors=[('Pacchetti','pacchetti'),('Materiali e logo','materiali'),('Automazioni','automazioni'),('Integrazioni','integrazioni'),('APP START','app-start'),('Costi del cliente','costi-esterni'),('Assistenza','consegna-assistenza')]
    before='<p class="route-status">Prezzo ZAD + extra approvati + costi dei fornitori. Tre voci distinte, nessun “tutto incluso” ambiguo.</p><nav class="related" aria-label="Indice del listino">'+''.join('<a class="btn" href="#'+a+'">'+escape(t)+'</a>' for t,a in anchors)+'</nav>'
    replace('/prezzi/','Prezzi','Prezzi. Tutto chiaro, prima di iniziare.','Siti, automazioni e applicazioni: funzioni incluse, limiti, materiali da preparare e spese del cliente. Il totale si concorda prima, non a lavoro finito.',price_sections,[('Richiedi un preventivo dettagliato','/contatti/'),('Siti e modelli','/modelli/'),('Condizioni dei servizi','/condizioni-servizi/')],before)
    replace('/automazioni-ai/','Automazioni e AI','Meno passaggi manuali. Responsabilità chiare.','Cinque automazioni a prezzo fisso: progettate, configurate, testate e consegnate. Strumenti e consumi restano separati.',[
      section('prodotti','Scegli il risultato, non il nome del robot.',html=automation_table()),
      section('metodi','Zapier, n8n o programma dedicato?',
        'Zapier e n8n Cloud usano account e piani del cliente. Configuriamo il flusso standard con i connettori compatibili; canone, limiti e consumi sono verificati prima dell’ordine.',
        'n8n self-hosted: l’installazione su una VPS del cliente costa €350 se necessaria. Un runtime custom già previsto nel progetto richiede €650 di deploy dedicato. Server e gestione successiva sono del cliente o del tecnico incaricato.',
        'La scelta dipende da integrazioni disponibili, volumi, privacy e possibilità di consegnare il sistema a un altro tecnico. Non imponiamo tutti i costi insieme: il preventivo riporta soltanto la soluzione scelta.'),
      section('confini','Che cosa è già incluso e cosa no',
        'Il flusso principale e il collegamento standard al calendario previsto dall’assistente sono inclusi nel prodotto. L’integrazione nel sito è separata (€200 per un punto compatibile), così come API aggiuntive o non standard. Nessun doppio addebito per lo stesso lavoro.',
        'L’automazione può operare fuori orario, ma dipende da disponibilità dei provider, connessione, quote e account attivi. È previsto un percorso di errore e passaggio umano. Non promettiamo disponibilità assoluta né zero contatti persi.',
        'Contenuti e script sono approvati. Si informa l’utente quando interagisce con l’AI; raccolta dati, messaggi transazionali e promozionali hanno regole distinte. Questi prodotti non forniscono diagnosi, pareri professionali vincolanti o decisioni in ambiti ad alto rischio.'),
      support_section(),external_section()
    ],[('Prezzi e integrazioni','/prezzi/#integrazioni'),('APP START','/applicazioni/'),('Racconta il processo','/contatti/')])
    replace('/applicazioni/','Applicazioni','Un’applicazione pronta. Un perimetro preciso.','APP START a €2.500: una web app essenziale per un processo. Sviluppo e configurazione iniziale inclusi, servizi esterni e gestione successiva distinti.',[app_section(),section('integrazioni','Collegamenti ulteriori solo su richiesta',html=integration_table()),support_section(),external_section()],[('Listino completo','/prezzi/'),('Definisci la tua applicazione','/contatti/')])
    certs=[('Applied AI Foundations','applied-ai-foundations.jpg'),('Higgsfield AI Filmmaking','higgsfield-ai-filmmaking.jpg')]
    cert_html=table('Documenti presenti nell’archivio originale', ['Riferimento del file','Stato della documentazione'],[(n,'Copia immagine non leggibile in modo affidabile. Ente, data, codice e validità non verificati.') for n,f in certs])
    cert_html+='<div class="actions">'+''.join('<a class="btn" href="'+CERT_SOURCE+f+'" target="_blank" rel="noopener noreferrer">Documento in archivio: '+escape(n)+'</a>' for n,f in certs)+'</div>'
    replace('/certificazioni/','Certificazioni e formazione','Formazione, attestati e prove.','Uno spazio dedicato al percorso formativo di Marco Zulian, distinto dai controlli tecnici dei progetti e dalle certificazioni di terzi.',[
      section('documenti','Documentazione dei percorsi formativi',
        'Nell’archivio originale del sito sono presenti i due file elencati sotto. I titoli riprendono i nomi dei file: non costituiscono da soli una verifica del rilascio o del completamento dei corsi.',
        'Le copie disponibili non consentono un’anteprima leggibile e una verifica affidabile. Per questo non mostriamo immagini ricostruite, firme o badge inventati e non riportiamo ente emittente, data, codice o livello non verificati. I collegamenti permettono di consultare la provenienza dei file.',html=cert_html),
      section('distinzioni','Un attestato non certifica automaticamente un sito',
        'Un percorso formativo personale, una certificazione professionale e la verifica di un software sono cose diverse. Il controllo del lavoro consegnato riguarda le funzioni e i requisiti effettivamente testati.',
        'Questa pagina non attribuisce a ZAD certificazioni ISO, partnership ufficiali, abilitazioni o conformità universali. Eventuali attestazioni convalidate verranno accompagnate dai dati e dai riferimenti verificabili del documento.'),
      section('qualita','Come valutare il lavoro di ZAD',
        'Per valutare un progetto guarda il modello navigabile, il perimetro scritto, le prove di funzionamento e la documentazione di consegna. I controlli di base non equivalgono a un penetration test o a una certificazione formale.',
        html='<div class="actions"><a class="btn" href="/qualita/">Controlli di qualità</a><a class="btn" href="/modelli/">Modelli navigabili</a></div>')
    ],[('Chi è Marco','/chi-sono/'),('Metodo di lavoro','/metodo/'),('Contatti','/contatti/')])
    # Keep original layout/editorial organization for existing pages; remove only
    # obsolete product claims. Demo counts remain the actual counts of the demo.
    replacements={
      'con 3 pagine principali':'con 4 pagine funzionali',
      'in 5 pagine':'in 7 pagine funzionali',
      'con 8–10 pagine quando il contenuto lo giustifica':'con 10 pagine funzionali',
      '3 pagine principali':'4 pagine funzionali',
      '5 pagine principali':'7 pagine funzionali',
      '8–10 pagine':'10 pagine funzionali',
      'circa 3 pagine':'4 pagine funzionali',
      'circa 5 pagine':'7 pagine funzionali',
      'IVA inclusa.':'IVA inclusa se dovuta.',
    }
    for p in pages:
        if p['route'] in ('/siti-web/','/guide/costo-sito-web/','/condizioni-servizi/','/reggio-calabria/'):
            for s in p.get('sections',[]):
                for k in ('paragraphs','items'):
                    s[k]=[replace_text(text,replacements) for text in s.get(k,[])]
        if p['route']=='/siti-web/':
            for s in p['sections']:
                if s['heading']=='Contenuti e personalizzazione':
                    s['paragraphs']=['Materiali pronti previsti nel progetto: inserimento e ottimizzazione web inclusi. Quando mancano: fino a 5 visual semplici e un logo tipografico semplice inclusi; oltre la soglia, blocchi da €100 con quantità e totale approvati. Shooting, branding completo e licenze premium sono separati. Il listino dettaglia soglie ed esempi.','Le lingue totali sono 3/5/7, i video brevi integrati almeno 1/3/6. Testi sorgente fino a 1.500/3.000/5.000 parole. Non si inventano recensioni, certificazioni o caratteristiche aziendali.']
        if p['route']=='/e-commerce/':
            for s in p['sections']:
                if s['heading']=='Il perimetro cambia il costo':
                    s['paragraphs']=['Starter €2.500: fino a 25 prodotti semplici e 5 categorie, un mercato/valuta, un gateway e una regola di spedizione. Business €4.500: fino a 100 prodotti semplici e 10 categorie, import pulito, un gateway, regole standard e una integrazione documentata. Fattibilità da confermare prima dell’ordine.','Le lingue e i video dei siti vetrina non si trasferiscono automaticamente a un e-commerce. Piattaforma, commissioni e fornitori sono separati. Dati da ripulire, migrazioni, mercati e funzioni ulteriori richiedono preventivo dedicato.']
            p.setdefault('related',[]).append(('Prezzi e costi del cliente','/prezzi/#e-commerce'))
        if p['route']=='/condizioni-servizi/':
            p['sections'].append(section('materiali-extra','Materiali, extra e servizi esterni','Il listino aggiornato distingue quantità incluse, materiali da creare, integrazioni e spese dei fornitori. I supplementi richiedono accettazione prima del lavoro; non modificano retroattivamente contratti già sottoscritti. Una prestazione già inclusa non si addebita nuovamente.','Le finestre iniziali di correzione sono 30 giorni, 60 per gli assistenti voce e WhatsApp del listino. Non includono gestione continuativa né sostituiscono i diritti inderogabili applicabili.',html='<p><a href="/prezzi/#materiali">Soglie e supplementi per i materiali</a> · <a href="/prezzi/#costi-esterni">Costi dei fornitori</a></p>'))
        if p['route'] in ('/qualita/','/chi-sono/'):
            p.setdefault('related',[]).append(('Certificazioni e formazione','/certificazioni/'))
    return pages

def replace_text(text,replacements):
    for old,new in replacements.items(): text=text.replace(old,new)
    return text

def faq_items(data):
    return [
      ('Quanto costa e che cosa è incluso?','Essential €1.100: 4 pagine, 3 lingue, almeno 1 video breve. Business €1.600: 7 pagine, 5 lingue, almeno 3 video e Digital Guide Light. Signature €2.400: 10 pagine, 7 lingue, almeno 6 video e Digital Guide Expanded. Prezzi finali ZAD, IVA inclusa se dovuta; limiti e costi esterni nel listino.'),
      ('Se non ho foto o logo?','Fino a 5 visual semplici da preparare e un logo tipografico semplice sono inclusi, con i limiti del listino. Oltre i 5 visual: €100 per blocco anche parziale di 10 aggiuntivi. Per 10 nuovi visual il supplemento è €100; per 20 è €200. Foto già pronte nel perimetro: ottimizzazione inclusa. Shooting e branding completo separati.'),
      ('Automazioni e integrazione nel sito sono comprese?','No: sono prodotti e voci separati. Un’automazione si consegna configurata e testata nel proprio perimetro. Il collegamento standard al calendario previsto dal prodotto è incluso; l’integrazione nel sito, quando richiesta, costa €200. Mai due addebiti per la stessa funzione già inclusa.'),
      ('APP START costa davvero €2.500?','Sì, entro il perimetro standard: un processo, fino a 5 schermate e 2 ruoli, database, configurazione standard di produzione e consegna documentata. Provider, API esterne e moduli ulteriori sono separati. Non è il prezzo di qualsiasi app e non comprende CRM o ERP.'),
      ('Quanto tempo richiede un sito?','Finestre indicative: 7–10 giorni lavorativi Essential, 10–15 Business, 15–25 Signature. Dall’avvio confermato con accordo, acconto, materiali e accessi completi. Le date effettive sono nel preventivo.'),
      ('Chi paga server, API e abbonamenti?','Il cliente paga i propri fornitori: hosting, dominio, server, database, Zapier/n8n, telefonia, WhatsApp, AI, licenze e altri servizi scelti. Costi e consumi sono elencati prima dell’ordine; nessun piano è attivato automaticamente.'),
      ('Che cosa succede dopo la consegna?','Assistenza iniziale nel perimetro: 30 giorni, oppure 60 per assistenti voce e WhatsApp. Non è gestione continuativa. Restano fermi i diritti inderogabili applicabili; server, rinnovi, monitoraggio e manutenzione successiva spettano al cliente o al suo tecnico.'),
      ('SEO, AI e automazioni garantiscono risultati?','No. Il progetto comprende le funzioni e le verifiche concordate, non un numero garantito di contatti, vendite, posizioni SEO o citazioni AI. Le automazioni dipendono anche da provider e account attivi.')
    ]
