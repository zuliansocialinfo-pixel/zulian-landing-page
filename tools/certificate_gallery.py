"""Render the evidence-backed ZAD training/certificate gallery.

The commercial release creates the /certificazioni/ route with the common ZAD
shell. This module replaces only that page's main content after the regular build,
so the existing navigation, typography and site layout remain unchanged.
"""
from pathlib import Path
from html import escape

AI = [
    ("Higgsfield Academy", "The AI Filmmaking Pipeline", "1 agosto 2026", "Credential ID HFA-2026-CIG4KQLSIZHZ", ""),
    ("OpenAI Academy", "Applied AI Foundations", "3 agosto 2026", "Certificate ID 6x0h6tmdmx", ""),
    ("OpenAI Academy", "AI Foundations", "2 agosto 2026", "Certificate ID 8plcntz7ay", "https://academy.openai.com/public/certificate/8plcntz7ay"),
    ("OpenAI Academy", "Agents and Workflows", "4 agosto 2026", "Certificate ID olnihzxmk4", ""),
]

ANTHROPIC = [
    ("Anthropic", "Claude Code in Action", "", "", ""),
    ("Anthropic", "AI Fluency: Framework & Foundations", "", "", ""),
    ("Anthropic", "Claude with the Anthropic API", "", "", ""),
    ("Anthropic", "Introduction to Model Context Protocol", "", "", ""),
    ("Anthropic", "Model Context Protocol: Advanced Topics", "", "", ""),
    ("Anthropic", "Introduction to agent skills", "", "", ""),
    ("Anthropic", "Claude 101", "", "", ""),
]

MARKETING = [
    ("Meta / Coursera", "Introduction to Social Media Marketing", "1 giugno 2025", "", "https://coursera.org/verify/4O51PEJ28JNT"),
    ("Meta / Coursera", "Fundamentals of Social Media Advertising", "2 giugno 2025", "", "https://coursera.org/verify/0T9OO0SAKRU5"),
    ("Meta / Coursera", "Advertising with Meta", "2 giugno 2025", "", "https://coursera.org/verify/14338SVA6IBM"),
    ("Meta / Coursera", "Measure and Optimize Social Media Marketing Campaigns", "2 giugno 2025", "", "https://coursera.org/verify/YJD3ORF6IMFI"),
    ("Meta / Coursera", "Social Media Management", "4 giugno 2025", "", "https://coursera.org/verify/JI10ZE13H10I"),
    ("Lacerba.io", "Google Ads - Introduzione", "31 maggio 2025", "Identificativo b1076c", ""),
]

SHEETS = {
    "ai": "/assets/certificates/certificazioni-ai.jpg",
    "anthropic": "/assets/certificates/certificazioni-anthropic.jpg",
    "marketing": "/assets/certificates/certificazioni-marketing.jpg",
}


def _table(caption, rows):
    parts = [
        f'<div class="table-scroll" role="region" tabindex="0" aria-label="{escape(caption)}">',
        f'<table><caption>{escape(caption)}</caption>',
        '<thead><tr><th scope="col">Ente / piattaforma</th><th scope="col">Corso</th><th scope="col">Data</th><th scope="col">Riferimento</th></tr></thead><tbody>'
    ]
    for issuer, title, date, identifier, url in rows:
        ref = escape(identifier) if identifier else '—'
        if url:
            label = escape(identifier or 'Verifica')
            ref = f'<a href="{escape(url)}" target="_blank" rel="noopener noreferrer">{label} ↗</a>'
        parts.append(
            '<tr>'
            f'<th scope="row">{escape(issuer)}</th>'
            f'<td>{escape(title)}</td>'
            f'<td>{escape(date) if date else "Non indicata nella copia fornita"}</td>'
            f'<td>{ref}</td>'
            '</tr>'
        )
    parts.append('</tbody></table></div>')
    return ''.join(parts)


def _figure(src, alt, caption):
    return (
        '<figure style="margin:2rem 0 2.5rem">'
        f'<a href="{escape(src)}" target="_blank" rel="noopener">'
        f'<img src="{escape(src)}" alt="{escape(alt)}" loading="lazy" '
        'style="display:block;width:100%;height:auto;border-radius:20px" />'
        '</a>'
        f'<figcaption class="detail" style="margin-top:.75rem">{escape(caption)}</figcaption>'
        '</figure>'
    )


def main_html():
    total = len(AI) + len(ANTHROPIC) + len(MARKETING)
    return f'''<main id="main">
<section class="page-hero"><div class="shell">
<nav class="breadcrumbs" aria-label="Percorso"><a href="/">Home</a><span aria-hidden="true">/</span><span>Certificazioni e formazione</span></nav>
<span class="eyebrow">Certificazioni e formazione</span>
<h1>Formazione documentata.<br>Prove consultabili.</h1>
<p>{total} attestati e certificati di completamento o partecipazione forniti da Marco Zulian. Li mostriamo per ciò che documentano, senza trasformarli in qualifiche o partnership che non dichiarano.</p>
</div></section>
<section class="section"><div class="shell"><div class="prose">
<section id="ai-formazione"><h2>AI, agenti e produzione digitale</h2>
<p>Questa raccolta comprende attestati di completamento relativi a OpenAI Academy e Higgsfield Academy. I dati riportati sotto sono trascritti dalle copie fornite; dove nel documento è presente un riferimento verificabile viene collegato direttamente.</p>
{_figure(SHEETS['ai'], 'Raccolta di attestati OpenAI Academy e Higgsfield Academy intestati a Marco Zulian', 'Anteprima delle copie fornite: Higgsfield Academy e OpenAI Academy.')}
{_table('Attestati AI e produzione digitale', AI)}
</section>
<section id="anthropic-formazione"><h2>Anthropic, Claude e Model Context Protocol</h2>
<p>Le copie fornite attestano il completamento dei corsi elencati. Nei documenti disponibili non sono riportate in modo visibile data o identificativo: non li ricaviamo dal nome del file e non li inventiamo.</p>
{_figure(SHEETS['anthropic'], 'Raccolta di sette certificati Anthropic intestati a Marco Zulian', 'Anteprima delle sette copie Anthropic fornite.')}
{_table('Attestati Anthropic', ANTHROPIC)}
</section>
<section id="marketing-formazione"><h2>Marketing, advertising e social media</h2>
<p>I cinque attestati Meta/Coursera indicano corsi senza crediti autorizzati da Meta e offerti da Coursera; i documenti riportano anche un collegamento di verifica. Il certificato Google Ads - Introduzione è un attestato Lacerba.io. Queste formulazioni seguono i documenti, senza presentarle come abilitazioni professionali.</p>
{_figure(SHEETS['marketing'], 'Raccolta di attestati Meta Coursera e Lacerba intestati a Marco Zulian', 'Anteprima delle copie Meta/Coursera e Lacerba fornite.')}
{_table('Attestati marketing e advertising', MARKETING)}
</section>
<section id="cosa-dimostrano"><h2>Che cosa dimostrano — e che cosa no</h2>
<p>Questi documenti sono evidenze del percorso formativo indicato nelle singole copie. Non certificano automaticamente Zulian Architettura Digitale, non sono una licenza professionale e non dimostrano la sicurezza, conformità o qualità di uno specifico sito, software o automazione.</p>
<p>La presenza dei marchi OpenAI, Anthropic, Higgsfield, Meta, Coursera o Lacerba nei documenti non implica una partnership commerciale, un endorsement o lo status di partner ufficiale di ZAD. I marchi restano dei rispettivi titolari.</p>
<p>Il riferimento ISO visibile nel certificato Lacerba riguarda quanto dichiarato dal documento dell’ente e non costituisce una certificazione ISO di Marco Zulian o di Zulian Architettura Digitale.</p>
</section>
<section id="qualita"><h2>La formazione è una prova. Il progetto va verificato a parte.</h2>
<p>Per valutare il lavoro ZAD contano anche il perimetro scritto, il modello navigabile, i test delle funzioni concordate e la documentazione di consegna. Un attestato di corso non sostituisce queste prove.</p>
<div class="actions"><a class="btn" href="/qualita/">Controlli di qualità</a><a class="btn" href="/modelli/">Modelli navigabili</a><a class="btn primary" href="/contatti/">Parliamo del progetto</a></div>
</section>
</div><nav class="related" aria-label="Approfondimenti"><a class="btn" href="/chi-sono/">Chi è Marco</a><a class="btn" href="/metodo/">Metodo di lavoro</a><a class="btn" href="/prezzi/">Prezzi e perimetri</a></nav></div></section>
</main>'''


def patch_generated_certificate_page(root):
    root = Path(root)
    page = root / 'public' / 'certificazioni' / 'index.html'
    if not page.is_file():
        raise FileNotFoundError(f'Pagina certificazioni non generata: {page}')
    text = page.read_text()
    start = text.find('<main id="main">')
    end = text.find('</main>', start)
    if start < 0 or end < 0:
        raise ValueError('Shell certificazioni inattesa: main non trovato.')
    end += len('</main>')
    text = text[:start] + main_html() + text[end:]
    text = text.replace(
        '<title>Formazione, attestati e prove. — Zulian Architettura Digitale</title>',
        '<title>Certificazioni e formazione — Zulian Architettura Digitale</title>'
    )
    old_desc = 'Uno spazio dedicato al percorso formativo di Marco Zulian, distinto dai controlli tecnici dei progetti e dalle certificazioni di terzi.'
    new_desc = 'Attestati e certificati di completamento del percorso formativo di Marco Zulian: AI, agenti, social media, advertising e produzione digitale.'
    text = text.replace(escape(old_desc), escape(new_desc))
    text = text.replace('content="Formazione, attestati e prove."', 'content="Certificazioni e formazione"')
    page.write_text(text)
    return page


if __name__ == '__main__':
    patch_generated_certificate_page(Path(__file__).resolve().parent.parent)
