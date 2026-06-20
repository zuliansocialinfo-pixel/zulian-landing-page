# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier3/cross-feature.spec.ts >> Cross-Feature Combination Tests - Tier 3 >> T3.1: Theme interactions with services and process cards during scroll and reload
- Location: e2e-tests/tier3/cross-feature.spec.ts:4:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "rgb(212, 175, 55)"
Received: "rgba(255, 255, 255, 0.08)"
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
        - generic [ref=e43]: "0"
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
        - img "Marco Zulian — Fondatore di Zulian Social Media Marketing" [ref=e202]
        - generic [ref=e203]:
          - heading "I Miei Valori" [level=4] [ref=e204]
          - list [ref=e205]:
            - listitem [ref=e206]:
              - img [ref=e208]
              - text: Risultati misurabili
            - listitem [ref=e210]:
              - img [ref=e212]
              - text: Trasparenza totale
            - listitem [ref=e214]:
              - img [ref=e216]
              - text: Concretezza, non promesse
            - listitem [ref=e218]:
              - img [ref=e220]
              - text: Partnership vera, non fornitore
    - generic [ref=e223]:
      - heading "Presentazione Video" [level=2] [ref=e225]
      - iframe [ref=e228]:
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
    - generic [ref=e230]:
      - generic [ref=e231]:
        - generic [ref=e233]: Il Processo
        - heading "Come Funziona" [level=2] [ref=e234]:
          - generic [ref=e236]: Come Funziona
        - paragraph [ref=e237]: Il percorso chiaro per iniziare a lavorare insieme.
      - generic [ref=e238]:
        - generic [ref=e240]:
          - generic [ref=e241]: "1"
          - generic [ref=e242]:
            - heading "Consulenza in videochiamata" [level=3] [ref=e243]
            - paragraph [ref=e244]: Ci incontreremo inizialmente in videochiamata, su appuntamento. Questo primo confronto serve per conoscerci, analizzare i tuoi obiettivi e capire come posso aiutarti.
        - generic [ref=e245]:
          - generic [ref=e246]: "2"
          - generic [ref=e247]:
            - heading "Firma del contratto" [level=3] [ref=e248]
            - paragraph [ref=e249]: Per garantire un impegno reciproco serio e professionale, firmeremo un contratto chiaro e trasparente per evitare disguidi prima dell'incontro operativo.
        - generic [ref=e250]:
          - generic [ref=e251]: "3"
          - generic [ref=e252]:
            - heading "Incontro di persona" [level=3] [ref=e253]
            - paragraph [ref=e254]: Sarò io a raggiungerti di persona. Analizzeremo ogni aspetto del tuo progetto per costruire insieme una strategia su misura che porti risultati concreti.
        - generic [ref=e255]:
          - generic [ref=e256]: "4"
          - generic [ref=e257]:
            - heading "Avvio del lavoro" [level=3] [ref=e258]
            - paragraph [ref=e259]: "Dopo l'incontro, si passa all'azione: inizieremo il percorso. Nessuna perdita di tempo, solo risultati."
    - generic [ref=e261]:
      - generic [ref=e262]:
        - generic [ref=e264]: Investimento
        - heading "Listino Prezzi" [level=2] [ref=e265]:
          - generic [ref=e267]: Listino Prezzi
        - paragraph [ref=e268]: Trasparenza totale. Nessun costo nascosto, solo soluzioni su misura per la tua crescita.
      - generic [ref=e269]:
        - generic [ref=e270]:
          - heading "Starter" [level=3] [ref=e271]
          - generic [ref=e272]: € 1200/mese
          - paragraph [ref=e273]: Perfetto per liberi professionisti e piccole attività che vogliono una presenza curata e professionale.
          - list [ref=e274]:
            - listitem [ref=e275]: ✓ Gestione 2 profili social
            - listitem [ref=e276]: ✓ Piano editoriale mensile
            - listitem [ref=e277]: ✓ Creazione contenuti grafici
            - listitem [ref=e278]: ✓ Report mensile base
          - link "Richiedi" [ref=e279]:
            - /url: "#contatto"
        - generic [ref=e280]:
          - generic [ref=e281]: Consigliato
          - heading "Growth" [level=3] [ref=e282]
          - generic [ref=e283]: € 2900/mese
          - paragraph [ref=e284]: La soluzione ideale per aziende che vogliono acquisire clienti e scalare il proprio fatturato.
          - list [ref=e285]:
            - listitem [ref=e286]: ✓ Gestione 3 profili social
            - listitem [ref=e287]: ✓ Campagne Ads incluse (Meta/Google)
            - listitem [ref=e288]: ✓ Video Making & Reels (1 sessione/mese)
            - listitem [ref=e289]: ✓ Funnel di acquisizione contatti
            - listitem [ref=e290]: ✓ Consulenza strategica bi-settimanale
          - link "Richiedi" [ref=e291]:
            - /url: "#contatto"
        - generic [ref=e292]:
          - heading "Custom" [level=3] [ref=e293]
          - generic [ref=e294]: Su Misura
          - paragraph [ref=e295]: Progetti complessi, e-commerce strutturati e restyling completi del brand.
          - list [ref=e296]:
            - listitem [ref=e297]: ✓ Sviluppo Sito Web / Shopify
            - listitem [ref=e298]: ✓ Strategia multicanale avanzata
            - listitem [ref=e299]: ✓ Shooting fotografico premium
            - listitem [ref=e300]: ✓ Gestione budget Ads elevati
          - link "Parliamone" [ref=e301]:
            - /url: "#contatto"
    - generic [ref=e303]:
      - generic [ref=e304]:
        - generic [ref=e306]: Portfolio
        - heading "Lavori Selezionati" [level=2] [ref=e307]:
          - generic [ref=e309]: Lavori Selezionati
        - paragraph [ref=e310]: Alcuni dei progetti su cui abbiamo lavorato.
      - generic [ref=e311]:
        - generic [ref=e312] [cursor=pointer]:
          - generic [ref=e313]: "01"
          - generic [ref=e314]: E-commerce Luxury Brand
          - generic [ref=e315]: Social + E-commerce
          - generic [ref=e316]: "2024"
          - generic [ref=e317]: ↗
        - generic [ref=e318] [cursor=pointer]:
          - generic [ref=e319]: "02"
          - generic [ref=e320]: App Delivery Locale
          - generic [ref=e321]: App iOS/Android
          - generic [ref=e322]: "2024"
          - generic [ref=e323]: ↗
        - generic [ref=e324] [cursor=pointer]:
          - generic [ref=e325]: "03"
          - generic [ref=e326]: Studio Professionale Milano
          - generic [ref=e327]: Brand + Web
          - generic [ref=e328]: "2024"
          - generic [ref=e329]: ↗
        - generic [ref=e330] [cursor=pointer]:
          - generic [ref=e331]: "04"
          - generic [ref=e332]: Ristorante Stellato Calabria
          - generic [ref=e333]: Content + Social Media
          - generic [ref=e334]: "2023"
          - generic [ref=e335]: ↗
        - generic [ref=e336] [cursor=pointer]:
          - generic [ref=e337]: "05"
          - generic [ref=e338]: Startup GreenTech
          - generic [ref=e339]: Growth Strategy
          - generic [ref=e340]: "2023"
          - generic [ref=e341]: ↗
    - generic [ref=e343]:
      - heading "Pronto a far crescere il tuo business?" [level=2] [ref=e344]:
        - text: Pronto a far crescere
        - text: il tuo business?
      - paragraph [ref=e345]: Parliamone. Il primo passo è una consulenza gratuita.
      - generic [ref=e346]:
        - link "Prenota una Consulenza" [ref=e347]:
          - /url: https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3fOx-uImUyUZK6k2uRZRBFTz8quyI6UDW3lyfeuClz2oZc1gnax33Mkw_VPe6IVnNpuX3sOFce?gv=true
          - img [ref=e348]
          - text: Prenota una Consulenza
        - link "Scrivimi su WhatsApp" [ref=e350]:
          - /url: https://wa.me/393927950038
          - img [ref=e351]
          - text: Scrivimi su WhatsApp
      - generic [ref=e353]:
        - img [ref=e354]
        - text: Hai vinto un bando o un finanziamento?
        - strong [ref=e356]: Accettiamo pagamenti tramite bandi
        - text: e siamo disposti ad attendere l'erogazione dei fondi statali/regionali.
    - generic [ref=e358]:
      - generic [ref=e359]:
        - heading "Prenota la tua Consulenza" [level=2] [ref=e360]:
          - generic [ref=e362]: Prenota la tua Consulenza
        - paragraph [ref=e363]: Scegli l'orario migliore per te direttamente dal mio calendario.
      - iframe [ref=e365]:
        
  - contentinfo [ref=e366]:
    - generic [ref=e367]:
      - generic [ref=e368]:
        - generic [ref=e369]:
          - img "Zulian Logo" [ref=e370]
          - paragraph [ref=e371]: La strategia vincente, fatta su misura. Aiuto aziende e professionisti a crescere online con strategie concrete.
        - generic [ref=e372]:
          - heading "Contatti Diretti" [level=4] [ref=e373]
          - list [ref=e374]:
            - listitem [ref=e375]:
              - link "+39 392 795 0038" [ref=e376]:
                - /url: tel:+393927950038
                - img [ref=e377]
                - text: +39 392 795 0038
            - listitem [ref=e379]:
              - link "WhatsApp" [ref=e380]:
                - /url: https://wa.me/393927950038
                - img [ref=e381]
                - text: WhatsApp
            - listitem [ref=e383]:
              - link "zuliansocial.info@gmail.com" [ref=e384]:
                - /url: mailto:zuliansocial.info@gmail.com
                - img [ref=e385]
                - text: zuliansocial.info@gmail.com
            - listitem [ref=e388]:
              - link "Tutta Italia (base Reggio Calabria)" [ref=e389]:
                - /url: "#"
                - img [ref=e390]
                - text: Tutta Italia (base Reggio Calabria)
        - generic [ref=e393]:
          - heading "Note Legali" [level=4] [ref=e394]
          - list [ref=e395]:
            - listitem [ref=e396]:
              - link "Privacy Policy" [ref=e397]:
                - /url: "#"
            - listitem [ref=e398]:
              - link "Cookie Policy" [ref=e399]:
                - /url: "#"
            - listitem [ref=e400]:
              - link "Termini e Condizioni" [ref=e401]:
                - /url: "#"
      - generic [ref=e402]:
        - generic [ref=e403]: © 2025 Zulian Social Media Marketing — Tutti i diritti riservati.
        - generic [ref=e404]:
          - link "Instagram" [ref=e405]:
            - /url: https://instagram.com/zuliansocialmedia
            - img [ref=e406]
          - link "Facebook" [ref=e409]:
            - /url: https://facebook.com/zuliansocialmedia
            - img [ref=e410]
          - link "LinkedIn" [ref=e412]:
            - /url: https://linkedin.com/in/marcozulian
            - img [ref=e413]
          - link "WhatsApp" [ref=e415]:
            - /url: https://wa.me/393927950038
            - img [ref=e416]
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
  3  | test.describe('Cross-Feature Combination Tests - Tier 3', () => {
  4  |   test('T3.1: Theme interactions with services and process cards during scroll and reload', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
  7  |     await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  8  |     
  9  |     // Simulate scroll down to cards
  10 |     const card = page.locator('section#servizi .glass').first();
  11 |     await card.scrollIntoViewIfNeeded();
  12 |     await page.waitForTimeout(300);
  13 |     
  14 |     // Verify theme style is maintained (dark background, gold borders/accent colors)
  15 |     const bgColor = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
  16 |     expect(bgColor).toBe('rgb(13, 13, 13)');
  17 |     
  18 |     // Hover on services card triggers hover border styling
  19 |     await card.hover();
  20 |     const borderColor = await card.evaluate((el) => window.getComputedStyle(el).borderColor);
  21 |     // Gold/champagne accent is rgb(212, 175, 55)
> 22 |     expect(borderColor).toBe('rgb(212, 175, 55)');
     |                         ^ Error: expect(received).toBe(expected) // Object.is equality
  23 |   });
  24 | 
  25 |   test('T3.2: Mobile menu overlay open state vs calendar iframe overlay layout', async ({ page }) => {
  26 |     await page.setViewportSize({ width: 375, height: 667 });
  27 |     await page.goto('/');
  28 |     const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
  29 |     await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  30 | 
  31 |     // Open mobile menu
  32 |     const hamburger = page.locator('header button, header [aria-label="Menu"]').first();
  33 |     await hamburger.click();
  34 |     
  35 |     const menuOverlay = page.locator('header nav, .mobile-menu').first();
  36 |     await expect(menuOverlay).toBeVisible();
  37 | 
  38 |     // Verify z-index of mobile menu is higher than iframe calendar container
  39 |     const menuZIndex = await menuOverlay.evaluate((el) => window.getComputedStyle(el).zIndex);
  40 |     const iframeSection = page.locator('iframe').first();
  41 |     const iframeContainer = iframeSection.locator('..');
  42 |     const iframeZIndex = await iframeContainer.evaluate((el) => window.getComputedStyle(el).zIndex);
  43 | 
  44 |     expect(Number(menuZIndex)).toBeGreaterThan(Number(iframeZIndex || 0));
  45 |   });
  46 | 
  47 |   test('T3.3: Resizing viewport during preloader fadeout adapts layout successfully', async ({ page }) => {
  48 |     await page.setViewportSize({ width: 1024, height: 768 });
  49 |     await page.goto('/');
  50 |     
  51 |     const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
  52 |     await expect(preloader).toBeVisible();
  53 |     
  54 |     // Resize viewport during preloader active phase
  55 |     await page.setViewportSize({ width: 375, height: 667 });
  56 |     
  57 |     // Ensure preloader still covers the screen
  58 |     const box = await preloader.boundingBox();
  59 |     expect(box?.width).toBe(375);
  60 |     expect(box?.height).toBe(667);
  61 |     
  62 |     // Wait for preloader fadeout
  63 |     await expect(preloader).toBeHidden({ timeout: 10000 });
  64 |     
  65 |     // Mobile toggle hamburger should now be visible instead of desktop nav
  66 |     const hamburger = page.locator('header button, header [aria-label="Menu"]').first();
  67 |     await expect(hamburger).toBeVisible();
  68 |   });
  69 | 
  70 |   test('T3.4: Footer contacts are obscured or not primary click target while mobile menu overlay is active', async ({ page }) => {
  71 |     await page.setViewportSize({ width: 375, height: 667 });
  72 |     await page.goto('/');
  73 |     const preloader = page.locator('#preloader, .preloader, [data-testid="preloader"]');
  74 |     await expect(preloader).toBeHidden({ timeout: 10000 }).catch(() => {});
  75 | 
  76 |     // Open mobile menu
  77 |     const hamburger = page.locator('header button, header [aria-label="Menu"]').first();
  78 |     await hamburger.click();
  79 |     
  80 |     const menuOverlay = page.locator('header nav, .mobile-menu').first();
  81 |     await expect(menuOverlay).toBeVisible();
  82 |     
  83 |     // Attempting to click footer link should be prevented or the link should be outside viewport / overlay should cover events
  84 |     const footerLink = page.locator('footer a[href*="wa.me"]').first();
  85 |     
  86 |     // Check if the menu overlay has a backdrop-filter or covers viewport
  87 |     const menuBox = await menuOverlay.boundingBox();
  88 |     const footerBox = await footerLink.boundingBox();
  89 |     
  90 |     if (menuBox && footerBox) {
  91 |       // If menu covers the full screen (bottom=667), it will overlap/obscure the footer
  92 |       const overlaps = menuBox.y + menuBox.height >= footerBox.y;
  93 |       expect(overlaps).toBeTruthy();
  94 |     }
  95 |   });
  96 | });
  97 | 
```