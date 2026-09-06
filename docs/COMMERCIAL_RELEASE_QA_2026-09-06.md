# Verifica rilascio commerciale — 6 settembre 2026

## Stato pre-pubblicazione
Build sul ramo release riuscita (Actions 34044384158), 14 test Python e 13 test Node passati, 58 HTML controllati senza ID duplicati, H1 errati, link locali o ancore mancanti. Ulteriori controlli di regressione aggiunti per coerenza editoriale e ripetibilita della build.

## Browser locale
Controllati prezzi, certificazioni, applicazioni, automazioni, siti web e home a 320, 390, 768 e 1440 px: 24 combinazioni, nessun overflow della pagina, immagini mancanti o errore JS rilevato. Menu mobile, link certificazioni nel menu e chiusura con Esc verificati. Esaminate immagini desktop/mobile di prezzi, materiali, automazioni e certificazioni.

Il browser dell'ambiente non consentiva la navigazione HTTP/HTTPS. La verifica visuale ha quindi caricato localmente gli HTML della build, incorporando le risorse CSS, immagini e i moduli JS originali come dati. E una verifica offline della resa e dei componenti, NON una prova di rete, API o ricezione dei moduli live. Le tabelle ampie rimangono scorribili su schermi piccoli.

## Preservazione
Foglio di stile principale, logo, palette, homepage strutturale e grafica originali non sostituiti. Nuovo CSS limitato alle tabelle commerciali e alle ancore. Demo esistenti mantengono il numero reale di pagine, distinto dal pacchetto contrattuale.

## Attestati
Entrambi i JPEG sorgente generano OSError broken data stream in decodifica PIL. Non sono stati ricostruiti o esposti come certificazioni convalidate; la pagina riporta provenienza e stato della documentazione. Servono copie integre per un'esposizione verificabile degli attestati.

## Verifica da completare al rilascio
Confermare workflow di deploy main sul commit finale. Verifica remota delle nuove route separata dalla verifica offline. Non inviare richieste commerciali reali durante il QA.
