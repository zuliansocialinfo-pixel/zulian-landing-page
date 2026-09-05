"""Preserve old public URLs without fabricating equivalent service offerings."""
from pathlib import Path
import html
import json
ROOT = Path(__file__).resolve().parent.parent
origin = json.loads((ROOT/'src/site-data.json').read_text())['origin']
for old, target in json.loads((ROOT/'src/legacy-routes.json').read_text()).items():
    refresh = ''
    canonical = ''
    if target:
        destination = ROOT/'public'/target.strip('/')/'index.html'
        if not destination.is_file():
            raise ValueError(f'Missing destination: {target}')
        refresh = f'<meta http-equiv="refresh" content="0;url={html.escape(target)}">'
        canonical = f'<link rel="canonical" href="{html.escape(origin+target)}">'
        message = f'<h1>La pagina ha un nuovo indirizzo.</h1><p><a href="{html.escape(target)}">Apri la pagina aggiornata</a></p>'
    else:
        message = '<h1>Il sito Zulian è cambiato.</h1><p>Questa pagina apparteneva alla precedente versione del sito. Consulta i servizi e i modelli attualmente disponibili.</p><p><a href="/architettura-digitale/">Scopri il progetto Zulian</a> · <a href="/modelli/">Esplora i modelli</a> · <a href="/contatti/">Contatti</a></p>'
    output = ROOT/'public'/old
    output.parent.mkdir(parents=True,exist_ok=True)
    output.write_text(f'<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow">{refresh}{canonical}<title>Pagina aggiornata — Zulian Architettura Digitale</title><link rel="stylesheet" href="/assets/site.css"></head><body><main class="shell section">{message}</main></body></html>')
