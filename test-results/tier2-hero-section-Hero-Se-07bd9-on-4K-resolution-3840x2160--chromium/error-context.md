# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier2/hero-section.spec.ts >> Hero Section & CTA - Tier 2 >> T2.2.2: Verify Hero layout structure and CTA visibility on 4K resolution (3840x2160)
- Location: e2e-tests/tier2/hero-section.spec.ts:16:3

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 1500
Received:   1561.5625
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - link "Servizi" [ref=e3]:
      - /url: "#servizi"
    - link "Chi Sono" [ref=e4]:
      - /url: "#chi-sono"
    - link "Come Funziona" [ref=e5]:
      - /url: "#come-funziona"
    - link "Lavori" [ref=e6]:
      - /url: "#lavori"
    - link "Contatto" [ref=e7]:
      - /url: "#contatto"
    - link "Prenota Consulenza" [ref=e8]:
      - /url: https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3fOx-uImUyUZK6k2uRZRBFTz8quyI6UDW3lyfeuClz2oZc1gnax33Mkw_VPe6IVnNpuX3sOFce?gv=true
  - banner:
    - navigation [ref=e9]:
      - generic [ref=e10]:
        - link "Zulian Logo" [ref=e11]:
          - /url: "#"
          - img "Zulian Logo" [ref=e12]
        - generic [ref=e13]:
          - link "Servizi" [ref=e14]:
            - /url: "#servizi"
          - link "Chi Sono" [ref=e15]:
            - /url: "#chi-sono"
          - link "Come Funziona" [ref=e16]:
            - /url: "#come-funziona"
          - link "Lavori" [ref=e17]:
            - /url: "#lavori"
          - link "Contatto" [ref=e18]:
            - /url: "#contatto"
        - link "Prenota" [ref=e19]:
          - /url: https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3fOx-uImUyUZK6k2uRZRBFTz8quyI6UDW3lyfeuClz2oZc1gnax33Mkw_VPe6IVnNpuX3sOFce?gv=true
  - main [ref=e20]:
    - generic [ref=e21]:
      - generic [ref=e23]:
        - img "Zulian Logo" [ref=e24]
        - generic [ref=e26]: ↳ Social Media Marketing & Crescita Digitale
        - heading "Strategie concrete. Risultati reali. Crescita misurabile." [level=1] [ref=e27]:
          - generic [ref=e29]: Strategie concrete.
          - generic [ref=e31]: Risultati reali.
          - generic [ref=e33]: Crescita misurabile.
        - paragraph [ref=e34]: Aiuto aziende e professionisti a crescere online con un approccio serio, trasparente e basato sui dati. Niente promesse vuote — solo strategie su misura che portano risultati.
        - generic [ref=e35]:
          - link "Prenota una Consulenza" [ref=e36]:
            - /url: https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3fOx-uImUyUZK6k2uRZRBFTz8quyI6UDW3lyfeuClz2oZc1gnax33Mkw_VPe6IVnNpuX3sOFce?gv=true
            - img [ref=e37]
            - text: Prenota una Consulenza
          - link "Scopri i servizi" [ref=e39]:
            - /url: "#servizi"
            - text: Scopri i servizi
            - img [ref=e40]
      - generic [ref=e42]:
        - generic [ref=e43]: 73+
        - text: Clienti soddisfatti
      - img [ref=e45]
    - generic [ref=e48]:
      - generic [ref=e49]: Social Media
      - generic [ref=e51]: Pubblicità Online
      - generic [ref=e53]: Content Creation
      - generic [ref=e55]: Brand Strategy
      - generic [ref=e57]: E-commerce
      - generic [ref=e59]: Web Design
      - generic [ref=e61]: Growth Hacking
      - generic [ref=e63]: Video & Reels
      - generic [ref=e65]: Social Media
      - generic [ref=e67]: Pubblicità Online
      - generic [ref=e69]: Content Creation
      - generic [ref=e71]: Brand Strategy
      - generic [ref=e73]: E-commerce
      - generic [ref=e75]: Web Design
      - generic [ref=e77]: Growth Hacking
      - generic [ref=e79]: Video & Reels
    - generic [ref=e82]:
      - generic [ref=e83]:
        - generic [ref=e85]: Cosa Facciamo
        - heading "I Nostri Servizi" [level=2] [ref=e86]:
          - generic [ref=e88]: I Nostri Servizi
        - paragraph [ref=e89]: Niente scorciatoie, solo strategie concrete che fanno crescere davvero.
      - generic [ref=e90]:
        - generic [ref=e91]:
          - generic [ref=e92]: "01"
          - img [ref=e94]
          - heading "Analisi e Strategia" [level=3] [ref=e95]
          - paragraph [ref=e96]: Analisi strategica del mercato, pianificazione del posizionamento e integrazione di Bandi e Finanziamenti pubblici per supportare la crescita.
          - list [ref=e97]:
            - listitem [ref=e98]: · Analisi del mercato e dei competitor
            - listitem [ref=e99]: · Definizione del target e del posizionamento
            - listitem [ref=e100]: · Integrazione Bandi e Finanziamenti
            - listitem [ref=e101]: · Strategia di funnel marketing
          - generic [ref=e102]:
            - text: Scopri
            - generic [ref=e103]: →
        - generic [ref=e104]:
          - generic [ref=e105]: "02"
          - img [ref=e107]
          - heading "Gestione Social" [level=3] [ref=e109]
          - paragraph [ref=e110]: Gestione completa della presenza organica sui principali canali social per costruire community e relazioni solide.
          - list [ref=e111]:
            - listitem [ref=e112]: · Content strategy & Copywriting
            - listitem [ref=e113]: · Piano editoriale e moderazione community
            - listitem [ref=e114]: · Gestione profili Instagram, Facebook, LinkedIn
            - listitem [ref=e115]: · Report periodici delle performance
          - generic [ref=e116]:
            - text: Scopri
            - generic [ref=e117]: →
        - generic [ref=e118]:
          - generic [ref=e119]: "03"
          - img [ref=e121]
          - heading "Pubblicità Online" [level=3] [ref=e123]
          - paragraph [ref=e124]: Campagne pubblicitarie a pagamento mirate per generare contatti qualificati e vendite immediate.
          - list [ref=e125]:
            - listitem [ref=e126]: · Advertising su Meta (Facebook & Instagram)
            - listitem [ref=e127]: · Google Ads (Search, Display, Shopping)
            - listitem [ref=e128]: · Retargeting avanzato delle audience
            - listitem [ref=e129]: · Ottimizzazione continua del ROI
          - generic [ref=e130]:
            - text: Scopri
            - generic [ref=e131]: →
        - generic [ref=e132]:
          - generic [ref=e133]: "04"
          - img [ref=e135]
          - heading "Siti Web ed E-commerce" [level=3] [ref=e138]
          - paragraph [ref=e139]: Sviluppo di piattaforme web veloci, responsive e ottimizzate per la massima conversione dei visitatori.
          - list [ref=e140]:
            - listitem [ref=e141]: · Web design moderno e UX/UI personalizzata
            - listitem [ref=e142]: · E-commerce e sistemi di pagamento sicuri
            - listitem [ref=e143]: · Velocità e ottimizzazione SEO tecnica
            - listitem [ref=e144]: · Manutenzione e integrazione analytics
          - generic [ref=e145]:
            - text: Scopri
            - generic [ref=e146]: →
        - generic [ref=e147]:
          - generic [ref=e148]: "05"
          - img [ref=e150]
          - heading "Creazione Contenuti" [level=3] [ref=e153]
          - paragraph [ref=e154]: Produzione di materiale visivo e testuale di alta qualità che cattura l'attenzione e comunica il valore del brand.
          - list [ref=e155]:
            - listitem [ref=e156]: · Produzione foto e video professionali
            - listitem [ref=e157]: · Copywriting persuasivo per web e social
            - listitem [ref=e158]: · Grafica personalizzata e brand assets
            - listitem [ref=e159]: · Reels e formati video brevi ottimizzati
          - generic [ref=e160]:
            - text: Scopri
            - generic [ref=e161]: →
      - generic [ref=e162]:
        - img "Zulian Marketing Dashboard" [ref=e163]
        - generic [ref=e164]:
          - heading "Dati alla mano" [level=3] [ref=e165]
          - paragraph [ref=e166]: Monitoriamo le metriche che contano davvero per il tuo business. Report trasparenti, conversioni reali, crescita misurabile.
    - generic [ref=e169]:
      - generic [ref=e170]:
        - generic [ref=e171]: "0"
        - text: Clienti
      - generic [ref=e172]:
        - generic [ref=e173]: "0"
        - text: Impression / mese
      - generic [ref=e174]:
        - generic [ref=e175]: "0"
        - text: Progetti completati
      - generic [ref=e176]:
        - generic [ref=e177]: "0"
        - text: Soddisfazione
    - paragraph [ref=e180]:
      - text: "\"Non vendo scorciatoie."
      - text: Costruisco percorsi."
    - generic [ref=e183]:
      - generic [ref=e184]:
        - generic [ref=e186]: Chi Sono
        - heading "Il Mio Percorso" [level=2] [ref=e187]:
          - generic [ref=e189]: Il Mio Percorso
        - paragraph [ref=e190]:
          - text: Mi chiamo
          - strong [ref=e191]: Marco Zulian
          - text: e vengo da una famiglia operaia. Ho iniziato a lavorare presto, imparando sul campo il valore dell'impegno, della responsabilità e della determinazione.
        - paragraph [ref=e192]:
          - text: "Nulla è arrivato per caso: ogni traguardo è stato costruito con sacrificio, costanza e voglia di crescere. Questo percorso mi ha insegnato valori che porto ogni giorno nel mio lavoro:"
          - strong [ref=e193]: serietà, coerenza, rispetto e concretezza.
        - paragraph [ref=e194]: "Non vendo scorciatoie né promesse irrealistiche: costruisco percorsi solidi, passo dopo passo, con trasparenza, competenza e obiettivi concreti."
        - generic [ref=e195]:
          - generic [ref=e196]:
            - generic [ref=e197]: "2021"
            - text: Anno di fondazione
          - generic [ref=e198]:
            - generic [ref=e199]: Italia
            - text: Operativo ovunque
      - generic [ref=e200]:
        - generic [ref=e201]:
          - img "Marco Zulian — Fondatore di Zulian Social Media Marketing"
        - generic [ref=e202]:
          - heading "I Miei Valori" [level=4] [ref=e203]
          - list [ref=e204]:
            - listitem [ref=e205]:
              - img [ref=e207]
              - text: Risultati misurabili
            - listitem [ref=e209]:
              - img [ref=e211]
              - text: Trasparenza totale
            - listitem [ref=e213]:
              - img [ref=e215]
              - text: Concretezza, non promesse
            - listitem [ref=e217]:
              - img [ref=e219]
              - text: Partnership vera, non fornitore
    - generic [ref=e222]:
      - heading "Presentazione Video" [level=2] [ref=e224]
      - iframe [ref=e227]:
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
    - generic [ref=e229]:
      - generic [ref=e230]:
        - generic [ref=e232]: Il Processo
        - heading "Come Funziona" [level=2] [ref=e233]:
          - generic [ref=e235]: Come Funziona
        - paragraph [ref=e236]: Il percorso chiaro per iniziare a lavorare insieme.
      - generic [ref=e237]:
        - generic [ref=e239]:
          - generic [ref=e240]: "1"
          - generic [ref=e241]:
            - heading "Consulenza in videochiamata" [level=3] [ref=e242]
            - paragraph [ref=e243]: Ci incontreremo inizialmente in videochiamata, su appuntamento. Questo primo confronto serve per conoscerci, analizzare i tuoi obiettivi e capire come posso aiutarti.
        - generic [ref=e244]:
          - generic [ref=e245]: "2"
          - generic [ref=e246]:
            - heading "Firma del contratto" [level=3] [ref=e247]
            - paragraph [ref=e248]: Per garantire un impegno reciproco serio e professionale, firmeremo un contratto chiaro e trasparente per evitare disguidi prima dell'incontro operativo.
        - generic [ref=e249]:
          - generic [ref=e250]: "3"
          - generic [ref=e251]:
            - heading "Incontro di persona" [level=3] [ref=e252]
            - paragraph [ref=e253]: Sarò io a raggiungerti di persona. Analizzeremo ogni aspetto del tuo progetto per costruire insieme una strategia su misura che porti risultati concreti.
        - generic [ref=e254]:
          - generic [ref=e255]: "4"
          - generic [ref=e256]:
            - heading "Avvio del lavoro" [level=3] [ref=e257]
            - paragraph [ref=e258]: "Dopo l'incontro, si passa all'azione: inizieremo il percorso. Nessuna perdita di tempo, solo risultati."
    - generic [ref=e260]:
      - generic [ref=e261]:
        - generic [ref=e263]: Investimento
        - heading "Listino Prezzi" [level=2] [ref=e264]:
          - generic [ref=e266]: Listino Prezzi
        - paragraph [ref=e267]: Trasparenza totale. Nessun costo nascosto, solo soluzioni su misura per la tua crescita.
      - generic [ref=e268]:
        - generic [ref=e269]:
          - heading "Starter" [level=3] [ref=e270]
          - generic [ref=e271]: € 1200/mese
          - paragraph [ref=e272]: Perfetto per liberi professionisti e piccole attività che vogliono una presenza curata e professionale.
          - list [ref=e273]:
            - listitem [ref=e274]: ✓ Gestione 2 profili social
            - listitem [ref=e275]: ✓ Piano editoriale mensile
            - listitem [ref=e276]: ✓ Creazione contenuti grafici
            - listitem [ref=e277]: ✓ Report mensile base
          - link "Richiedi" [ref=e278]:
            - /url: "#contatto"
        - generic [ref=e279]:
          - generic [ref=e280]: Consigliato
          - heading "Growth" [level=3] [ref=e281]
          - generic [ref=e282]: € 2900/mese
          - paragraph [ref=e283]: La soluzione ideale per aziende che vogliono acquisire clienti e scalare il proprio fatturato.
          - list [ref=e284]:
            - listitem [ref=e285]: ✓ Gestione 3 profili social
            - listitem [ref=e286]: ✓ Campagne Ads incluse (Meta/Google)
            - listitem [ref=e287]: ✓ Video Making & Reels (1 sessione/mese)
            - listitem [ref=e288]: ✓ Funnel di acquisizione contatti
            - listitem [ref=e289]: ✓ Consulenza strategica bi-settimanale
          - link "Richiedi" [ref=e290]:
            - /url: "#contatto"
        - generic [ref=e291]:
          - heading "Custom" [level=3] [ref=e292]
          - generic [ref=e293]: Su Misura
          - paragraph [ref=e294]: Progetti complessi, e-commerce strutturati e restyling completi del brand.
          - list [ref=e295]:
            - listitem [ref=e296]: ✓ Sviluppo Sito Web / Shopify
            - listitem [ref=e297]: ✓ Strategia multicanale avanzata
            - listitem [ref=e298]: ✓ Shooting fotografico premium
            - listitem [ref=e299]: ✓ Gestione budget Ads elevati
          - link "Parliamone" [ref=e300]:
            - /url: "#contatto"
    - generic [ref=e302]:
      - generic [ref=e303]:
        - generic [ref=e305]: Portfolio
        - heading "Lavori Selezionati" [level=2] [ref=e306]:
          - generic [ref=e308]: Lavori Selezionati
        - paragraph [ref=e309]: Alcuni dei progetti su cui abbiamo lavorato.
      - generic [ref=e310]:
        - generic [ref=e311] [cursor=pointer]:
          - generic [ref=e312]: "01"
          - generic [ref=e313]: E-commerce Luxury Brand
          - generic [ref=e314]: Social + E-commerce
          - generic [ref=e315]: "2024"
          - generic [ref=e316]: ↗
        - generic [ref=e317] [cursor=pointer]:
          - generic [ref=e318]: "02"
          - generic [ref=e319]: App Delivery Locale
          - generic [ref=e320]: App iOS/Android
          - generic [ref=e321]: "2024"
          - generic [ref=e322]: ↗
        - generic [ref=e323] [cursor=pointer]:
          - generic [ref=e324]: "03"
          - generic [ref=e325]: Studio Professionale Milano
          - generic [ref=e326]: Brand + Web
          - generic [ref=e327]: "2024"
          - generic [ref=e328]: ↗
        - generic [ref=e329] [cursor=pointer]:
          - generic [ref=e330]: "04"
          - generic [ref=e331]: Ristorante Stellato Calabria
          - generic [ref=e332]: Content + Social Media
          - generic [ref=e333]: "2023"
          - generic [ref=e334]: ↗
        - generic [ref=e335] [cursor=pointer]:
          - generic [ref=e336]: "05"
          - generic [ref=e337]: Startup GreenTech
          - generic [ref=e338]: Growth Strategy
          - generic [ref=e339]: "2023"
          - generic [ref=e340]: ↗
    - generic [ref=e342]:
      - heading "Pronto a far crescere il tuo business?" [level=2] [ref=e343]:
        - text: Pronto a far crescere
        - text: il tuo business?
      - paragraph [ref=e344]: Parliamone. Il primo passo è una consulenza gratuita.
      - generic [ref=e345]:
        - link "Prenota una Consulenza" [ref=e346]:
          - /url: https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3fOx-uImUyUZK6k2uRZRBFTz8quyI6UDW3lyfeuClz2oZc1gnax33Mkw_VPe6IVnNpuX3sOFce?gv=true
          - img [ref=e347]
          - text: Prenota una Consulenza
        - link "Scrivimi su WhatsApp" [ref=e349]:
          - /url: https://wa.me/393927950038
          - img [ref=e350]
          - text: Scrivimi su WhatsApp
      - generic [ref=e352]:
        - img [ref=e353]
        - text: Hai vinto un bando o un finanziamento?
        - strong [ref=e355]: Accettiamo pagamenti tramite bandi
        - text: e siamo disposti ad attendere l'erogazione dei fondi statali/regionali.
    - generic [ref=e357]:
      - generic [ref=e358]:
        - heading "Prenota la tua Consulenza" [level=2] [ref=e359]:
          - generic [ref=e361]: Prenota la tua Consulenza
        - paragraph [ref=e362]: Scegli l'orario migliore per te direttamente dal mio calendario.
      - iframe [ref=e364]:
        
  - contentinfo [ref=e365]:
    - generic [ref=e366]:
      - generic [ref=e367]:
        - generic [ref=e368]:
          - img "Zulian Logo" [ref=e369]
          - paragraph [ref=e370]: La strategia vincente, fatta su misura. Aiuto aziende e professionisti a crescere online con strategie concrete.
        - generic [ref=e371]:
          - heading "Contatti Diretti" [level=4] [ref=e372]
          - list [ref=e373]:
            - listitem [ref=e374]:
              - link "+39 392 795 0038" [ref=e375]:
                - /url: tel:+393927950038
                - img [ref=e376]
                - text: +39 392 795 0038
            - listitem [ref=e378]:
              - link "WhatsApp" [ref=e379]:
                - /url: https://wa.me/393927950038
                - img [ref=e380]
                - text: WhatsApp
            - listitem [ref=e382]:
              - link "zuliansocial.info@gmail.com" [ref=e383]:
                - /url: mailto:zuliansocial.info@gmail.com
                - img [ref=e384]
                - text: zuliansocial.info@gmail.com
            - listitem [ref=e387]:
              - link "Tutta Italia (base Reggio Calabria)" [ref=e388]:
                - /url: "#"
                - img [ref=e389]
                - text: Tutta Italia (base Reggio Calabria)
        - generic [ref=e392]:
          - heading "Note Legali" [level=4] [ref=e393]
          - list [ref=e394]:
            - listitem [ref=e395]:
              - link "Privacy Policy" [ref=e396]:
                - /url: "#"
            - listitem [ref=e397]:
              - link "Cookie Policy" [ref=e398]:
                - /url: "#"
            - listitem [ref=e399]:
              - link "Termini e Condizioni" [ref=e400]:
                - /url: "#"
      - generic [ref=e401]:
        - generic [ref=e402]: © 2025 Zulian Social Media Marketing — Tutti i diritti riservati.
        - generic [ref=e403]:
          - link "Instagram" [ref=e404]:
            - /url: https://instagram.com/zuliansocialmedia
            - img [ref=e405]
          - link "Facebook" [ref=e408]:
            - /url: https://facebook.com/zuliansocialmedia
            - img [ref=e409]
          - link "LinkedIn" [ref=e411]:
            - /url: https://linkedin.com/in/marcozulian
            - img [ref=e412]
          - link "WhatsApp" [ref=e414]:
            - /url: https://wa.me/393927950038
            - img [ref=e415]
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
  13 |     expect(bodyWidth).toBeLessThanOrEqual(280);
  14 |   });
  15 | 
  16 |   test('T2.2.2: Verify Hero layout structure and CTA visibility on 4K resolution (3840x2160)', async ({ page }) => {
  17 |     await page.setViewportSize({ width: 3840, height: 2160 });
  18 |     const cta = page.locator('a:has-text("Prenota una Consulenza"), button:has-text("Prenota una Consulenza")').first();
  19 |     await expect(cta).toBeVisible();
  20 |     const box = await cta.boundingBox();
> 21 |     expect(box?.y).toBeLessThan(1500); // Should be in the upper/middle half of a 4K display
     |                    ^ Error: expect(received).toBeLessThan(expected)
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