# Prezzi, materiali e certificazioni — 6 settembre 2026

Richiesta del titolare: pubblicare sul sito ZAD il listino V4 con inclusioni e spese esterne chiare, aggiungere supplementi da EUR 100 per materiali mancanti e creare una pagina certificazioni senza cambiare design. Nessuna modifica a Divetta/Shopify.

## Fonti commerciali
Pacchetto documentale ZULIAN V4 del 6 settembre: siti 1100/1600/2400 EUR e 4/7/10 pagine; lingue 3/5/7; video 1/3/6; cinque automazioni e APP START 2500 EUR a perimetro chiuso. Produzione e costi dei fornitori distinti, niente CRM/ERP gestiti e niente assistenza applicativa illimitata.

## Nuova specificazione per i materiali
Il titolare ha richiesto soglie chiare e supplementi da EUR 100. Per rendere operativa questa richiesta il sito fissa: primi 5 visual semplici e un logo tipografico base inclusi; EUR 100 per ogni blocco anche parziale di 10 visual aggiuntivi. Materiali pronti entro il perimetro: sola ottimizzazione web inclusa. Logo aggiuntivo semplice: EUR 100 per il perimetro scritto; testo originale mancante: EUR 100 / massimo 500 parole. Questi limiti numerici sono la nuova specificazione commerciale del sito, non una citazione del precedente PDF. Contratti gia sottoscritti non modificati. Shooting, riprese e branding completo fuori da questi blocchi.

## Implementazione
`src/site-data.json` alimenta homepage, confronto e advisor. `tools/commercial_release.py` applica i nuovi contenuti al registro editoriale generato da `tools/write_content.py`. Ordine build: write_content, build_models, build, build_legacy. `tools/build.py` usa sempre lo stesso shell e genera tutte le route; `public/assets/site.css` e la grafica originale restano invariati. CSS aggiuntivo limitato a tabelle e ancore commerciali. URL prezzi mantenuto; nuove route `/certificazioni/` e `/applicazioni/`; formazione legacy collegata al nuovo archivio.

## Certificati
I due JPEG disponibili nel repository originale non danno una lettura affidabile; il registro conserva i link al commit originale. Nessuna ricostruzione, nessun ente/data/codice dichiarato senza prova. La pagina e completa come archivio trasparente, non come verifica dell'ente emittente. Per mostrare attestati convalidati servono copie integre e relativi riferimenti.

## Verifica
Il workflow di verifica non pubblica. Esegue build, test esistenti e nuovi controlli su prezzi, soglie, ancore, route, costi non duplicati e assenza di attestazioni inventate. La pubblicazione rimane riservata al workflow esistente su main. Il report finale deve distinguere test automatici, browser e deploy effettivamente verificati.
