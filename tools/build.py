from pathlib import Path
import json, html, shutil
from catalog import comparison, catalog
from metadata import structured_data

ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'public'
DATA=json.loads((ROOT/'src/site-data.json').read_text())
PAGES=json.loads((ROOT/'src/pages.json').read_text()) if (ROOT/'src/pages.json').exists() else []
e=html.escape
groups={
 'Servizi':[('Siti web','siti-web'),('E-commerce','e-commerce'),('SEO e Local SEO','seo-local-seo'),('GEO e AI Search','geo-ai-search'),('Automazioni e AI','automazioni-ai')],
 'Capire prima di scegliere':[('Modelli','modelli'),('Prezzi','prezzi'),('Metodo','metodo'),('Qualità','qualita'),('Consulente Digitale','advisor')],
 'Zulian':[('Architettura Digitale','architettura-digitale'),('Chi sono','chi-sono'),('Reggio Calabria','reggio-calabria'),('Contatti','contatti')],
 'Informazioni':[('Guide','guide'),('Privacy','privacy'),('Cookie','cookie'),('Note legali','note-legali'),('Condizioni servizi','condizioni-servizi')]
}
def grouped_links():
 return ''.join('<div><h3>'+e(g)+'</h3>'+''.join(f'<a href="/{slug}/">{e(label)}</a>' for label,slug in links)+'</div>' for g,links in groups.items())
def shell(title,description,body,route='/',noindex=False):
 url=DATA['origin']+route
 schema=structured_data(DATA,title,route,PAGES)
 header='''<a class="skip" href="#main">Salta al contenuto</a><header class="site-header"><div class="shell header-inner"><a class="brand" href="/" aria-label="Zulian Architettura Digitale, home"><img class="brand-original" src="/assets/zulian-logo-452.webp" srcset="/assets/zulian-logo-452.webp 452w, /assets/zulian-logo-904.webp 904w" sizes="(max-width: 700px) 194px, 226px" alt="Zulian Architettura Digitale" width="226" height="66"></a><nav class="desktop-nav" aria-label="Navigazione principale"><a href="/siti-web/">Siti web</a><a href="/modelli/">Modelli</a><a href="/prezzi/">Prezzi</a><a href="/automazioni-ai/">Automazioni e AI</a><details><summary>Visibilità</summary><div><a href="/seo-local-seo/">SEO e Local SEO</a><a href="/geo-ai-search/">GEO e AI Search</a></div></details><a href="/metodo/">Metodo</a><a href="/guide/">Guide</a><a class="btn primary" href="/advisor/">Trova la soluzione</a></nav><button class="menu-button" data-menu-open aria-controls="menu" aria-expanded="false">Menu +</button></div></header>'''
 menu='<dialog class="menu-dialog" id="menu" aria-label="Menu del sito"><div class="menu-top"><span>Zulian Architettura Digitale</span><button class="menu-close" data-menu-close>Chiudi ×</button></div><nav class="menu-groups" aria-label="Tutte le pagine">'+grouped_links()+'</nav></dialog>'
 footer='<footer class="footer"><div class="shell"><nav class="footer-grid" aria-label="Navigazione footer">'+grouped_links()+f'</nav><div class="footer-bottom"><p>© 2026 {e(DATA["brand"])}<br>{e(DATA["legalName"])} · P.IVA {e(DATA["vat"])} · REA {e(DATA["rea"])}<br>{e(DATA["address"])}</p><p><a href="tel:{DATA["telephone"]}">+39 392 795 0038</a><a href="mailto:{DATA["email"]}">{e(DATA["email"])}</a><a href="mailto:{DATA["pec"]}">PEC: {e(DATA["pec"])}</a></p></div></div></footer>'
 robots='<meta name="robots" content="noindex,follow">' if noindex else ''
 return f'''<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{e(title)} — {e(DATA['brand'])}</title><meta name="description" content="{e(description)}">{robots}<link rel="canonical" href="{url}"><meta name="theme-color" content="#07101d"><meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(description)}"><meta property="og:type" content="website"><meta property="og:url" content="{url}"><meta property="og:image" content="{DATA['origin']}/assets/zulian-logo.png"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/site.css"><script type="module" src="/assets/site.js"></script><script type="application/ld+json">{json.dumps(schema,ensure_ascii=False).replace('</','<\\/')}</script></head><body>{header}{menu}{'<div class="loader" aria-hidden="true">ZULIAN / APERTURA <strong data-counter>00</strong></div>' if route=='/' else ''}<main id="main">{body}</main>{footer}</body></html>'''
def offers():
 return ''.join(f'''<article class="offer-row" id="{p['id']}"><span class="offer-number">0{i+1}</span><div><h3>{p['name']}</h3><span class="detail">{p['pages']}</span></div><div class="offer-copy"><p><strong>{p['purpose']}</strong></p><p>{p['buyer']}</p></div><div class="offer-price"><span class="price">€{p['price']:,}</span><span class="detail">{p['rounds']} {'revisione' if p['rounds']==1 else 'revisioni'} {'consolidata' if p['rounds']==1 else 'consolidate'}</span><a href="/prezzi/#{p['id']}">Scopri {p['name']} ↗</a></div></article>'''.replace(f"€{p['price']:,}",f"€{p['price']:,}".replace(',','.')) for i,p in enumerate(DATA['packages']))
GUIDES=[('costo-sito-web','Costi e perimetro','Quanto costa davvero un sito professionale?','Architettura, contenuti, funzioni e costi esterni: cosa confrontare in un preventivo.'),('seo-locale','Ricerca locale','Come può farsi trovare un’attività locale.','Sito, informazioni coerenti e Google Business Profile: ruoli e limiti.'),('automazioni-aziendali','Processi','Quali attività conviene automatizzare?','Prima di scegliere uno strumento, osserva frequenza, eccezioni e responsabilità.'),('geo-ai-search','GEO e AI Search','Cosa possiamo ottimizzare, senza promesse magiche.','Fondamentali SEO, fonti e misurazione: distinguere prove e ipotesi.')]
def guides():
 return '<div class="guide-list">'+''.join(f'<a class="guide-item" data-search-item href="/guide/{slug}/"><span class="mono">{e(category)}</span><h3>{e(title)}</h3><p>{e(desc)}</p></a>' for slug,category,title,desc in GUIDES)+'</div>'
FAQ=[('Quanto costa un sito?','Essential €1.100, Business €1.600, Signature €2.400. La scelta dipende da contenuti, percorso e personalizzazione. Provider e costi esterni sono separati; i prezzi dei tre livelli sono IVA inclusa.'),('Quanto tempo richiede?','Il listino prevede obiettivi di 7–10 giorni per Essential, 10–15 per Business e 15–25 per Signature. I tempi decorrono da accordo, acconto, materiali e accessi completi. Dipendenze e attese di approvazione possono spostare la consegna.'),('Cosa devo fornire?','Informazioni accurate sull’attività, logo e materiali utilizzabili, servizi, contatti e accessi necessari. Testi, foto e video avanzati vengono concordati: non inventiamo prove, recensioni o caratteristiche aziendali.'),('Che cosa succede dopo la consegna?','Sono previsti 30 giorni di correzione dei bug riproducibili nel perimetro concordato. Nuovi contenuti, funzioni e assistenza continuativa sono attività separate. Per i siti statici non è previsto un canone obbligatorio nel listino.'),('SEO e GEO garantiscono visibilità?','No. Prepariamo struttura, contenuti e informazioni perché siano accessibili e comprensibili ai motori di ricerca. Indicizzazione, posizioni, citazioni AI e risultati commerciali dipendono anche da fattori esterni.'),('Dominio e hosting sono inclusi?','Sono costi esterni, dichiarati nel preventivo e intestati al cliente quando possibile. Il progetto precisa piattaforma, licenze, rinnovi e chi gestisce gli aggiornamenti.')]
def faq():
 return '<div class="faq">'+''.join(f'<details><summary>{e(q)}</summary><p>{e(a)}</p></details>' for q,a in FAQ)+'</div>'
def write(route,text):
 path=OUT/route.strip('/')/'index.html' if route!='/' else OUT/'index.html'
 path.parent.mkdir(parents=True,exist_ok=True);path.write_text(text)

home=(ROOT/'src/home.html').read_text().replace('{{OFFERS}}',offers()).replace('{{GUIDES}}',guides()).replace('{{FAQ}}',faq()).replace('{{COMMERCIAL_NOTE}}',DATA['commercial']['note'])
write('/',shell('Siti e sistemi digitali per imprese a Reggio Calabria','Siti web, SEO e automazioni progettati intorno alla tua impresa. Essential €1.100, Business €1.600, Signature €2.400. Scopri modelli, metodo e consulente digitale.',home))
for page in PAGES:
 route=page['route'];title=page['title'];intro=page['intro']
 is_article=route.startswith('/guide/') and route!='/guide/'
 parent_crumb='<a href="/guide/">Guide</a><span aria-hidden="true">/</span>' if is_article else ''
 body=f'<section class="page-hero"><div class="shell"><nav class="breadcrumbs" aria-label="Percorso"><a href="/">Home</a><span aria-hidden="true">/</span>{parent_crumb}<span>{e(page["label"])}</span></nav><span class="eyebrow">{e(page["label"])}</span><h1>{e(title)}</h1><p>{e(intro)}</p></div></section><section class="section"><div class="shell">'
 if is_article:
  body+='<p class="article-byline">A cura di <a href="/chi-sono/">Marco Zulian</a> · Zulian Architettura Digitale</p>'
  body+='<nav class="article-toc" aria-label="Indice della guida"><h2>In questa guida</h2><ol>'+''.join(f'<li><a href="#section-{i+1}">{e(sec["heading"])}</a></li>' for i,sec in enumerate(page.get('sections',[])))+'</ol></nav>'
 body+=page.get('before','')+'<div class="prose">'
 for section_index,section in enumerate(page.get('sections',[]),1):
  body+=f'<section id="section-{section_index}"><h2>{e(section["heading"])}</h2>'
  for paragraph in section.get('paragraphs',[]):body+=f'<p>{e(paragraph)}</p>'
  if 'items' in section:body+='<ul>'+''.join(f'<li>{e(item)}</li>' for item in section['items'])+'</ul>'
  body+=section.get('html','')+'</section>'
 body+='</div>'+page.get('after','').replace('{{GUIDE_CATALOG}}',guides()).replace('<div id="contact-mount"></div>',(ROOT/'src/contact.html').read_text())
 if route=='/modelli/':body+=catalog(DATA,json.loads((ROOT/'src/models.json').read_text()))
 if route=='/prezzi/':body+=offers()+comparison(DATA)+faq()
 if page.get('related'):body+='<nav class="related" aria-label="Approfondimenti">'+''.join(f'<a class="btn" href="{u}">{e(t)}</a>' for t,u in page['related'])+'</nav>'
 body+='</div></section>'
 write(route,shell(title,intro,body,route,page.get('noindex',False)))
(OUT/'robots.txt').write_text(f'User-agent: *\nAllow: /\nSitemap: {DATA["origin"]}/sitemap.xml\n')
urls=['/']+[p['route'] for p in PAGES if not p.get('noindex')]
(OUT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join(f'<url><loc>{DATA["origin"]}{r}</loc></url>' for r in urls)+'</urlset>')
(OUT/'CNAME').write_text('www.zuliansocialmediamarketing.com\n')
(OUT/'404.html').write_text(shell('Pagina non trovata','La pagina cercata non è disponibile.','<section class="section"><div class="shell"><span class="eyebrow">404</span><h1>Questa pagina<br>non c’è.</h1><div class="actions"><a class="btn primary" href="/">Torna alla home</a><a class="btn" href="/contatti/">Contatti</a></div></div></section>','/404.html',True))
print(f'Generate {len(PAGES)+1} route, sitemap e 404 in {OUT}')

(OUT/'assets/commercial-data.js').write_text('export const packages = '+json.dumps(DATA['packages'],ensure_ascii=False)+';\nexport const commercial = '+json.dumps(DATA['commercial'],ensure_ascii=False)+';\n')

index=[{'url':p['route'],'text':p['title']+' '+p['intro']+' '+' '.join(sec['heading']+' '+' '.join(sec.get('paragraphs',[]))+' '+' '.join(sec.get('items',[])) for sec in p.get('sections',[]))} for p in PAGES if p['route'].startswith('/guide/') and p['route']!='/guide/']
(OUT/'assets/guide-index.json').write_text(json.dumps(index,ensure_ascii=False))
(OUT/'assets/model-data.js').write_text('export const models = '+(ROOT/'src/models.json').read_text()+';\n')
