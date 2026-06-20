# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier2/hero-section.spec.ts >> Hero Section & CTA - Tier 2 >> T2.2.1: Verify Hero headings do not cause horizontal layout overflow on 280px screen
- Location: e2e-tests/tier2/hero-section.spec.ts:10:3

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 280
Received:    324
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation:
    - link "Servizi":
      - /url: "#servizi"
    - link "Chi Sono":
      - /url: "#chi-sono"
    - link "Come Funziona":
      - /url: "#come-funziona"
    - link "Lavori":
      - /url: "#lavori"
    - link "Contatto":
      - /url: "#contatto"
    - link "Prenota Consulenza":
      - /url: https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3fOx-uImUyUZK6k2uRZRBFTz8quyI6UDW3lyfeuClz2oZc1gnax33Mkw_VPe6IVnNpuX3sOFce?gv=true
  - banner:
    - navigation [ref=e2]:
      - generic [ref=e3]:
        - link "Zulian Logo" [ref=e4]:
          - /url: "#"
          - img "Zulian Logo" [ref=e5]
        - button "Menu" [ref=e6]
  - main [ref=e10]:
    - generic [ref=e11]:
      - generic [ref=e13]:
        - img "Zulian Logo" [ref=e14]
        - generic [ref=e16]: ↳ Social Media Marketing & Crescita Digitale
        - heading "Strategie concrete. Risultati reali. Crescita misurabile." [level=1] [ref=e17]:
          - generic [ref=e19]: Strategie concrete.
          - generic [ref=e21]: Risultati reali.
          - generic [ref=e23]: Crescita misurabile.
        - paragraph [ref=e24]: Aiuto aziende e professionisti a crescere online con un approccio serio, trasparente e basato sui dati. Niente promesse vuote — solo strategie su misura che portano risultati.
        - generic [ref=e25]:
          - link "Prenota una Consulenza" [ref=e26]:
            - /url: https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3fOx-uImUyUZK6k2uRZRBFTz8quyI6UDW3lyfeuClz2oZc1gnax33Mkw_VPe6IVnNpuX3sOFce?gv=true
            - img [ref=e27]
            - text: Prenota una Consulenza
          - link "Scopri i servizi" [ref=e29]:
            - /url: "#servizi"
            - text: Scopri i servizi
            - img [ref=e30]
      - generic [ref=e32]:
        - generic [ref=e33]: "0"
        - text: Clienti soddisfatti
    - generic [ref=e35]:
      - generic [ref=e36]: Social Media
      - generic [ref=e38]: Pubblicità Online
      - generic [ref=e40]: Content Creation
      - generic [ref=e42]: Brand Strategy
      - generic [ref=e44]: E-commerce
      - generic [ref=e46]: Web Design
      - generic [ref=e48]: Growth Hacking
      - generic [ref=e50]: Video & Reels
      - generic [ref=e52]: Social Media
      - generic [ref=e54]: Pubblicità Online
      - generic [ref=e56]: Content Creation
      - generic [ref=e58]: Brand Strategy
      - generic [ref=e60]: E-commerce
      - generic [ref=e62]: Web Design
      - generic [ref=e64]: Growth Hacking
      - generic [ref=e66]: Video & Reels
    - generic [ref=e69]:
      - generic [ref=e70]:
        - generic [ref=e72]: Cosa Facciamo
        - heading "I Nostri Servizi" [level=2] [ref=e73]:
          - generic [ref=e75]: I Nostri Servizi
        - paragraph [ref=e76]: Niente scorciatoie, solo strategie concrete che fanno crescere davvero.
      - generic [ref=e77]:
        - generic [ref=e78]:
          - generic [ref=e79]: "01"
          - img [ref=e81]
          - heading "Analisi e Strategia" [level=3] [ref=e82]
          - paragraph [ref=e83]: Analisi strategica del mercato, pianificazione del posizionamento e integrazione di Bandi e Finanziamenti pubblici per supportare la crescita.
          - list [ref=e84]:
            - listitem [ref=e85]: · Analisi del mercato e dei competitor
            - listitem [ref=e86]: · Definizione del target e del posizionamento
            - listitem [ref=e87]: · Integrazione Bandi e Finanziamenti
            - listitem [ref=e88]: · Strategia di funnel marketing
          - generic [ref=e89]:
            - text: Scopri
            - generic [ref=e90]: →
        - generic [ref=e91]:
          - generic [ref=e92]: "02"
          - img [ref=e94]
          - heading "Gestione Social" [level=3] [ref=e96]
          - paragraph [ref=e97]: Gestione completa della presenza organica sui principali canali social per costruire community e relazioni solide.
          - list [ref=e98]:
            - listitem [ref=e99]: · Content strategy & Copywriting
            - listitem [ref=e100]: · Piano editoriale e moderazione community
            - listitem [ref=e101]: · Gestione profili Instagram, Facebook, LinkedIn
            - listitem [ref=e102]: · Report periodici delle performance
          - generic [ref=e103]:
            - text: Scopri
            - generic [ref=e104]: →
        - generic [ref=e105]:
          - generic [ref=e106]: "03"
          - img [ref=e108]
          - heading "Pubblicità Online" [level=3] [ref=e110]
          - paragraph [ref=e111]: Campagne pubblicitarie a pagamento mirate per generare contatti qualificati e vendite immediate.
          - list [ref=e112]:
            - listitem [ref=e113]: · Advertising su Meta (Facebook & Instagram)
            - listitem [ref=e114]: · Google Ads (Search, Display, Shopping)
            - listitem [ref=e115]: · Retargeting avanzato delle audience
            - listitem [ref=e116]: · Ottimizzazione continua del ROI
          - generic [ref=e117]:
            - text: Scopri
            - generic [ref=e118]: →
        - generic [ref=e119]:
          - generic [ref=e120]: "04"
          - img [ref=e122]
          - heading "Siti Web ed E-commerce" [level=3] [ref=e125]
          - paragraph [ref=e126]: Sviluppo di piattaforme web veloci, responsive e ottimizzate per la massima conversione dei visitatori.
          - list [ref=e127]:
            - listitem [ref=e128]: · Web design moderno e UX/UI personalizzata
            - listitem [ref=e129]: · E-commerce e sistemi di pagamento sicuri
            - listitem [ref=e130]: · Velocità e ottimizzazione SEO tecnica
            - listitem [ref=e131]: · Manutenzione e integrazione analytics
          - generic [ref=e132]:
            - text: Scopri
            - generic [ref=e133]: →
        - generic [ref=e134]:
          - generic [ref=e135]: "05"
          - img [ref=e137]
          - heading "Creazione Contenuti" [level=3] [ref=e140]
          - paragraph [ref=e141]: Produzione di materiale visivo e testuale di alta qualità che cattura l'attenzione e comunica il valore del brand.
          - list [ref=e142]:
            - listitem [ref=e143]: · Produzione foto e video professionali
            - listitem [ref=e144]: · Copywriting persuasivo per web e social
            - listitem [ref=e145]: · Grafica personalizzata e brand assets
            - listitem [ref=e146]: · Reels e formati video brevi ottimizzati
          - generic [ref=e147]:
            - text: Scopri
            - generic [ref=e148]: →
      - generic [ref=e149]:
        - img "Zulian Marketing Dashboard" [ref=e150]
        - generic [ref=e151]:
          - heading "Dati alla mano" [level=3] [ref=e152]
          - paragraph [ref=e153]: Monitoriamo le metriche che contano davvero per il tuo business. Report trasparenti, conversioni reali, crescita misurabile.
    - generic [ref=e156]:
      - generic [ref=e157]:
        - generic [ref=e158]: "0"
        - text: Clienti
      - generic [ref=e159]:
        - generic [ref=e160]: "0"
        - text: Impression / mese
      - generic [ref=e161]:
        - generic [ref=e162]: "0"
        - text: Progetti completati
      - generic [ref=e163]:
        - generic [ref=e164]: "0"
        - text: Soddisfazione
    - paragraph [ref=e167]:
      - text: "\"Non vendo scorciatoie."
      - text: Costruisco percorsi."
    - generic [ref=e170]:
      - generic [ref=e171]:
        - generic [ref=e173]: Chi Sono
        - heading "Il Mio Percorso" [level=2] [ref=e174]:
          - generic [ref=e176]: Il Mio Percorso
        - paragraph [ref=e177]:
          - text: Mi chiamo
          - strong [ref=e178]: Marco Zulian
          - text: e vengo da una famiglia operaia. Ho iniziato a lavorare presto, imparando sul campo il valore dell'impegno, della responsabilità e della determinazione.
        - paragraph [ref=e179]:
          - text: "Nulla è arrivato per caso: ogni traguardo è stato costruito con sacrificio, costanza e voglia di crescere. Questo percorso mi ha insegnato valori che porto ogni giorno nel mio lavoro:"
          - strong [ref=e180]: serietà, coerenza, rispetto e concretezza.
        - paragraph [ref=e181]: "Non vendo scorciatoie né promesse irrealistiche: costruisco percorsi solidi, passo dopo passo, con trasparenza, competenza e obiettivi concreti."
        - generic [ref=e182]:
          - generic [ref=e183]:
            - generic [ref=e184]: "2021"
            - text: Anno di fondazione
          - generic [ref=e185]:
            - generic [ref=e186]: Italia
            - text: Operativo ovunque
      - generic [ref=e187]:
        - generic [ref=e188]:
          - img "Marco Zulian — Fondatore di Zulian Social Media Marketing"
        - generic [ref=e189]:
          - heading "I Miei Valori" [level=4] [ref=e190]
          - list [ref=e191]:
            - listitem [ref=e192]:
              - img [ref=e194]
              - text: Risultati misurabili
            - listitem [ref=e196]:
              - img [ref=e198]
              - text: Trasparenza totale
            - listitem [ref=e200]:
              - img [ref=e202]
              - text: Concretezza, non promesse
            - listitem [ref=e204]:
              - img [ref=e206]
              - text: Partnership vera, non fornitore
    - generic [ref=e209]:
      - heading "Presentazione Video" [level=2] [ref=e211]
      - iframe [ref=e214]:
        - generic [active] [ref=f1e1]:
          - generic "YouTube Video Player" [ref=f1e3]
          - generic [ref=f1e5]:
            - generic:
              - generic:
                - button "Play video" [ref=f1e10] [cursor=pointer]
                - button "Hide player controls" [ref=f1e12] [cursor=pointer]
                - generic [ref=f1e14]:
                  - generic [ref=f1e19]:
                    - generic [ref=f1e20]:
                      - link "Rick Astley - Never Gonna Give You Up (Official Video) (4K Remaster)" [ref=f1e21] [cursor=pointer]:
                        - /url: https://www.youtube.com/watch?v=dQw4w9WgXcQ
                      - link "Rick Astley" [ref=f1e22] [cursor=pointer]:
                        - /url: /channel/UCuAXFkgsw1L7xaCfnd5JJOw
                        - generic [ref=f1e23]: Rick Astley
                    - generic [ref=f1e24]:
                      - button [ref=f1e25] [cursor=pointer]
                      - generic [ref=f1e27]:
                        - generic: Rick Astley
                        - generic: 4.51M subscribers
                  - generic [ref=f1e28]:
                    - button "Share" [ref=f1e31] [cursor=pointer]:
                      - generic [ref=f1e35]:
                        - img
                    - link "Watch on YouTube" [ref=f1e42] [cursor=pointer]:
                      - /url: https://www.youtube.com/watch?v=dQw4w9WgXcQ
                      - generic [ref=f1e45]:
                        - text: Watch on
                        - img [ref=f1e47]:
                          - generic [ref=f1e49]:
                            - img
    - generic [ref=e216]:
      - generic [ref=e217]:
        - generic [ref=e219]: Il Processo
        - heading "Come Funziona" [level=2] [ref=e220]:
          - generic [ref=e222]: Come Funziona
        - paragraph [ref=e223]: Il percorso chiaro per iniziare a lavorare insieme.
      - generic [ref=e224]:
        - generic [ref=e226]:
          - generic [ref=e227]: "1"
          - generic [ref=e228]:
            - heading "Consulenza in videochiamata" [level=3] [ref=e229]
            - paragraph [ref=e230]: Ci incontreremo inizialmente in videochiamata, su appuntamento. Questo primo confronto serve per conoscerci, analizzare i tuoi obiettivi e capire come posso aiutarti.
        - generic [ref=e231]:
          - generic [ref=e232]: "2"
          - generic [ref=e233]:
            - heading "Firma del contratto" [level=3] [ref=e234]
            - paragraph [ref=e235]: Per garantire un impegno reciproco serio e professionale, firmeremo un contratto chiaro e trasparente per evitare disguidi prima dell'incontro operativo.
        - generic [ref=e236]:
          - generic [ref=e237]: "3"
          - generic [ref=e238]:
            - heading "Incontro di persona" [level=3] [ref=e239]
            - paragraph [ref=e240]: Sarò io a raggiungerti di persona. Analizzeremo ogni aspetto del tuo progetto per costruire insieme una strategia su misura che porti risultati concreti.
        - generic [ref=e241]:
          - generic [ref=e242]: "4"
          - generic [ref=e243]:
            - heading "Avvio del lavoro" [level=3] [ref=e244]
            - paragraph [ref=e245]: "Dopo l'incontro, si passa all'azione: inizieremo il percorso. Nessuna perdita di tempo, solo risultati."
    - generic [ref=e247]:
      - generic [ref=e248]:
        - generic [ref=e250]: Investimento
        - heading "Listino Prezzi" [level=2] [ref=e251]:
          - generic [ref=e253]: Listino Prezzi
        - paragraph [ref=e254]: Trasparenza totale. Nessun costo nascosto, solo soluzioni su misura per la tua crescita.
      - generic [ref=e255]:
        - generic [ref=e256]:
          - heading "Starter" [level=3] [ref=e257]
          - generic [ref=e258]: € 1200/mese
          - paragraph [ref=e259]: Perfetto per liberi professionisti e piccole attività che vogliono una presenza curata e professionale.
          - list [ref=e260]:
            - listitem [ref=e261]: ✓ Gestione 2 profili social
            - listitem [ref=e262]: ✓ Piano editoriale mensile
            - listitem [ref=e263]: ✓ Creazione contenuti grafici
            - listitem [ref=e264]: ✓ Report mensile base
          - link "Richiedi" [ref=e265]:
            - /url: "#contatto"
        - generic [ref=e266]:
          - generic [ref=e267]: Consigliato
          - heading "Growth" [level=3] [ref=e268]
          - generic [ref=e269]: € 2900/mese
          - paragraph [ref=e270]: La soluzione ideale per aziende che vogliono acquisire clienti e scalare il proprio fatturato.
          - list [ref=e271]:
            - listitem [ref=e272]: ✓ Gestione 3 profili social
            - listitem [ref=e273]: ✓ Campagne Ads incluse (Meta/Google)
            - listitem [ref=e274]: ✓ Video Making & Reels (1 sessione/mese)
            - listitem [ref=e275]: ✓ Funnel di acquisizione contatti
            - listitem [ref=e276]: ✓ Consulenza strategica bi-settimanale
          - link "Richiedi" [ref=e277]:
            - /url: "#contatto"
        - generic [ref=e278]:
          - heading "Custom" [level=3] [ref=e279]
          - generic [ref=e280]: Su Misura
          - paragraph [ref=e281]: Progetti complessi, e-commerce strutturati e restyling completi del brand.
          - list [ref=e282]:
            - listitem [ref=e283]: ✓ Sviluppo Sito Web / Shopify
            - listitem [ref=e284]: ✓ Strategia multicanale avanzata
            - listitem [ref=e285]: ✓ Shooting fotografico premium
            - listitem [ref=e286]: ✓ Gestione budget Ads elevati
          - link "Parliamone" [ref=e287]:
            - /url: "#contatto"
    - generic [ref=e289]:
      - generic [ref=e290]:
        - generic [ref=e292]: Portfolio
        - heading "Lavori Selezionati" [level=2] [ref=e293]:
          - generic [ref=e295]: Lavori Selezionati
        - paragraph [ref=e296]: Alcuni dei progetti su cui abbiamo lavorato.
      - generic [ref=e297]:
        - generic [ref=e298]:
          - generic [ref=e299]: E-commerce Luxury Brand
          - generic [ref=e300]: "2024"
          - generic [ref=e301]: ↗
        - generic [ref=e302]:
          - generic [ref=e303]: App Delivery Locale
          - generic [ref=e304]: "2024"
          - generic [ref=e305]: ↗
        - generic [ref=e306]:
          - generic [ref=e307]: Studio Professionale Milano
          - generic [ref=e308]: "2024"
          - generic [ref=e309]: ↗
        - generic [ref=e310]:
          - generic [ref=e311]: Ristorante Stellato Calabria
          - generic [ref=e312]: "2023"
          - generic [ref=e313]: ↗
        - generic [ref=e314]:
          - generic [ref=e315]: Startup GreenTech
          - generic [ref=e316]: "2023"
          - generic [ref=e317]: ↗
    - generic [ref=e319]:
      - heading "Pronto a far crescere il tuo business?" [level=2] [ref=e320]:
        - text: Pronto a far crescere
        - text: il tuo business?
      - paragraph [ref=e321]: Parliamone. Il primo passo è una consulenza gratuita.
      - generic [ref=e322]:
        - link "Prenota una Consulenza" [ref=e323]:
          - /url: https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3fOx-uImUyUZK6k2uRZRBFTz8quyI6UDW3lyfeuClz2oZc1gnax33Mkw_VPe6IVnNpuX3sOFce?gv=true
          - img [ref=e324]
          - text: Prenota una Consulenza
        - link "Scrivimi su WhatsApp" [ref=e326]:
          - /url: https://wa.me/393927950038
          - img [ref=e327]
          - text: Scrivimi su WhatsApp
      - generic [ref=e329]:
        - img [ref=e330]
        - text: Hai vinto un bando o un finanziamento?
        - strong [ref=e332]: Accettiamo pagamenti tramite bandi
        - text: e siamo disposti ad attendere l'erogazione dei fondi statali/regionali.
    - generic [ref=e334]:
      - generic [ref=e335]:
        - heading "Prenota la tua Consulenza" [level=2] [ref=e336]:
          - generic [ref=e338]: Prenota la tua Consulenza
        - paragraph [ref=e339]: Scegli l'orario migliore per te direttamente dal mio calendario.
      - iframe [ref=e341]:
        
  - contentinfo [ref=e342]:
    - generic [ref=e343]:
      - generic [ref=e344]:
        - generic [ref=e345]:
          - img "Zulian Logo" [ref=e346]
          - paragraph [ref=e347]: La strategia vincente, fatta su misura. Aiuto aziende e professionisti a crescere online con strategie concrete.
        - generic [ref=e348]:
          - heading "Contatti Diretti" [level=4] [ref=e349]
          - list [ref=e350]:
            - listitem [ref=e351]:
              - link "+39 392 795 0038" [ref=e352]:
                - /url: tel:+393927950038
                - img [ref=e353]
                - text: +39 392 795 0038
            - listitem [ref=e355]:
              - link "WhatsApp" [ref=e356]:
                - /url: https://wa.me/393927950038
                - img [ref=e357]
                - text: WhatsApp
            - listitem [ref=e359]:
              - link "zuliansocial.info@gmail.com" [ref=e360]:
                - /url: mailto:zuliansocial.info@gmail.com
                - img [ref=e361]
                - text: zuliansocial.info@gmail.com
            - listitem [ref=e364]:
              - link "Tutta Italia (base Reggio Calabria)" [ref=e365]:
                - /url: "#"
                - img [ref=e366]
                - text: Tutta Italia (base Reggio Calabria)
        - generic [ref=e369]:
          - heading "Note Legali" [level=4] [ref=e370]
          - list [ref=e371]:
            - listitem [ref=e372]:
              - link "Privacy Policy" [ref=e373]:
                - /url: "#"
            - listitem [ref=e374]:
              - link "Cookie Policy" [ref=e375]:
                - /url: "#"
            - listitem [ref=e376]:
              - link "Termini e Condizioni" [ref=e377]:
                - /url: "#"
      - generic [ref=e378]:
        - generic [ref=e379]: © 2025 Zulian Social Media Marketing — Tutti i diritti riservati.
        - generic [ref=e380]:
          - link "Instagram" [ref=e381]:
            - /url: https://instagram.com/zuliansocialmedia
            - img [ref=e382]
          - link "Facebook" [ref=e385]:
            - /url: https://facebook.com/zuliansocialmedia
            - img [ref=e386]
          - link "LinkedIn" [ref=e388]:
            - /url: https://linkedin.com/in/marcozulian
            - img [ref=e389]
          - link "WhatsApp" [ref=e391]:
            - /url: https://wa.me/393927950038
            - img [ref=e392]
  - link "Scrivici su WhatsApp":
    - /url: https://wa.me/393927950038
    - img
  - generic:
    - generic:
      - button "Chiudi": ×
      - heading [level=2]
      - generic:
        - generic:
          - heading "La Sfida" [level=3]
          - paragraph
        - generic:
          - heading "La Soluzione" [level=3]
          - paragraph
        - generic:
          - heading "Risultati" [level=3]
          - list
      - generic:
        - link "Vuoi risultati simili? Parliamone":
          - /url: https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3fOx-uImUyUZK6k2uRZRBFTz8quyI6UDW3lyfeuClz2oZc1gnax33Mkw_VPe6IVnNpuX3sOFce?gv=true
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Hero Section & CTA - Tier 2', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/');
  6  |     const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
  7  |     await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  8  |   });
  9  | 
  10 |   test('T2.2.1: Verify Hero headings do not cause horizontal layout overflow on 280px screen', async ({ page }) => {
  11 |     await page.setViewportSize({ width: 280, height: 653 });
  12 |     const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
> 13 |     expect(bodyWidth).toBeLessThanOrEqual(280);
     |                       ^ Error: expect(received).toBeLessThanOrEqual(expected)
  14 |   });
  15 | 
  16 |   test('T2.2.2: Verify Hero layout structure and CTA visibility on 4K resolution (3840x2160)', async ({ page }) => {
  17 |     await page.setViewportSize({ width: 3840, height: 2160 });
  18 |     const cta = page.locator('a:has-text("Prenota una Consulenza"), button:has-text("Prenota una Consulenza")').first();
  19 |     await expect(cta).toBeVisible();
  20 |     const box = await cta.boundingBox();
  21 |     expect(box?.y).toBeLessThan(1500); // Should be in the upper/middle half of a 4K display
  22 |   });
  23 | 
  24 |   test('T2.2.3: Verify CTA calendar button query parameters match standard schedule settings', async ({ page }) => {
  25 |     const cta = page.locator('a:has-text("Prenota una Consulenza"), button:has-text("Prenota una Consulenza")').first();
  26 |     const href = await cta.getAttribute('href');
  27 |     expect(href).not.toBeNull();
  28 |     const url = new URL(href!);
  29 |     expect(url.searchParams.get('gv')).toBe('true');
  30 |   });
  31 | 
  32 |   test('T2.2.4: Verify the CTA button handles double-click or rapid clicks safely', async ({ page }) => {
  33 |     const cta = page.locator('a:has-text("Prenota una Consulenza"), button:has-text("Prenota una Consulenza")').first();
  34 |     await cta.hover();
  35 |     // Verify rapid double click is supported
  36 |     await cta.click({ clickCount: 2 });
  37 |   });
  38 | 
  39 |   test('T2.2.5: Verify Hero CTA button goes out of viewport when user scrolls down to Chi Sono', async ({ page }) => {
  40 |     const cta = page.locator('a:has-text("Prenota una Consulenza"), button:has-text("Prenota una Consulenza")').first();
  41 |     const chiSono = page.locator('#chi-sono');
  42 |     await chiSono.scrollIntoViewIfNeeded();
  43 |     
  44 |     // Check that the Hero CTA is no longer visible in the current viewport
  45 |     const isVisible = await cta.evaluate((el) => {
  46 |       const rect = el.getBoundingClientRect();
  47 |       return (
  48 |         rect.top >= 0 &&
  49 |         rect.left >= 0 &&
  50 |         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
  51 |         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  52 |       );
  53 |     });
  54 |     expect(isVisible).toBeFalsy();
  55 |   });
  56 | 
  57 |   test('T2.2.6: Verify the Hero logo displays prominently and meets size requirements (>= 100px)', async ({ page }) => {
  58 |     const logo = page.locator('.hero-logo');
  59 |     await expect(logo).toBeVisible({ timeout: 10000 });
  60 |     
  61 |     const box = await logo.boundingBox();
  62 |     expect(box).not.toBeNull();
  63 |     expect(box!.width).toBeGreaterThanOrEqual(100);
  64 |     expect(box!.height).toBeGreaterThanOrEqual(100);
  65 |   });
  66 | 
  67 |   test('T2.2.7: Verify the Hero logo animates into view after the preloader completes', async ({ page }) => {
  68 |     // Reload page to catch preloader
  69 |     await page.goto('/');
  70 |     const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
  71 |     await expect(preloader).toBeVisible();
  72 |     
  73 |     const logo = page.locator('.hero-logo');
  74 |     // While preloader is active, the Hero logo should be hidden or have opacity 0
  75 |     await expect(logo).toBeHidden();
  76 |     
  77 |     // Wait for preloader to complete and Hero content to fade in
  78 |     await expect(preloader).toBeHidden({ timeout: 10000 });
  79 |     await expect(logo).toBeVisible({ timeout: 10000 });
  80 |   });
  81 | });
  82 | 
```