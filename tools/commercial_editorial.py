"""Keep the original editorial pages consistent with the commercial registry."""
import re

def align_pages(pages, data):
    """Normalize legacy paragraphs and make repeated builds idempotent."""
    for page in pages:
        page['related'] = list(dict.fromkeys(tuple(link) for link in page.get('related', [])))
        unique=[];seen=set()
        for section in page.get('sections', []):
            key=section.get('id')
            if key and key in seen:continue
            if key:seen.add(key)
            unique.append(section)
            route=page['route'];heading=section['heading']
            if route=='/guide/costo-sito-web/' and heading=='I livelli Zulian':
                section['paragraphs']=['Essential €1.100, Business €1.600 e Signature €2.400: rispettivamente 4, 7 e 10 pagine funzionali; 3, 5 e 7 lingue totali; almeno 1, 3 e 6 video brevi integrati. Le pagine legali sono fuori conteggio. Il listino spiega limiti dei materiali, supplementi e costi dei fornitori. Automazioni, e-commerce e APP START sono prodotti distinti.']
            if route=='/condizioni-servizi/' and heading=='Revisioni, correzioni e supporto':
                section['paragraphs']=['Essential comprende un round di revisioni; Business e Signature due. Il feedback è consolidato. Errori rispetto al concordato sono correzioni; nuove funzioni sono extra. Per i siti la finestra iniziale di correzione è 30 giorni dalla consegna o pubblicazione concordata; per gli assistenti voce e WhatsApp del listino è 60 giorni. Non sono gestione continuativa e non limitano i diritti inderogabili.']
            if route=='/siti-web/' and heading=='Quando serve un altro perimetro':
                section['paragraphs']=['E-commerce, accessi riservati, database applicativi e integrazioni importanti hanno un perimetro distinto. APP START copre un singolo processo entro i suoi limiti. ZAD non sviluppa né amministra CRM o gestionali; può collegare un sistema esistente già gestito dal cliente, con voce separata.']
        page['sections']=unique
    return pages

def align_home(text):
    text=re.sub(r'IVA inclusa(?! se dovuta)', 'IVA inclusa se dovuta', text)
    return text.replace('30 giorni di correzione dei bug nello scope. Nuove funzioni e manutenzione continuativa richiedono un accordo.', 'Per i siti: 30 giorni di correzioni iniziali nel perimetro, senza limitare i diritti inderogabili. Nuove richieste sono separate; server e applicazioni non sono in gestione continuativa.')
