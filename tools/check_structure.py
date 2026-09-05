"""Check generated HTML and local targets; does not replace browser QA."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import sys

ROOT = Path(__file__).resolve().parent.parent / 'public'

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids = set()
        self.duplicates = []
        self.references = []
        self.h1 = 0
        self.in_select = False
        self.in_option = False
        self.invalid_select_text = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        if tag == "select": self.in_select = True
        if tag == "option": self.in_option = True
        attrs = dict(attrs)
        self.h1 += tag == 'h1'
        if attrs.get('id'):
            if attrs['id'] in self.ids:
                self.duplicates.append(attrs['id'])
            self.ids.add(attrs['id'])
        for key in ('href', 'src'):
            if attrs.get(key):
                self.references.append(attrs[key])

    def handle_endtag(self, tag):
        if tag == 'select': self.in_select = False
        if tag == 'option': self.in_option = False

    def handle_data(self, data):
        if self.in_select and not self.in_option and data.strip():
            self.invalid_select_text.append(data.strip())

pages = {p: Page(p.read_text()) for p in sorted(ROOT.rglob('*.html'))}
errors = []
for path, page in pages.items():
    relative = str(path.relative_to(ROOT))
    if page.h1 != 1:
        errors.append(f'{relative}: expected one h1, found {page.h1}')
    for text in page.invalid_select_text:
        errors.append(f'{relative}: text outside option in select: {text}')
    for duplicate in page.duplicates:
        errors.append(f'{relative}: duplicate id {duplicate}')
    for reference in page.references:
        parts = urlsplit(reference)
        if parts.scheme or parts.netloc:
            continue
        target = (ROOT / unquote(parts.path).lstrip('/') if parts.path.startswith('/') else path.parent / unquote(parts.path)) if parts.path else path
        target = target.resolve()
        if not target.is_relative_to(ROOT.resolve()):
            errors.append(f'{relative}: target escapes public directory: {reference}')
            continue
        if target.is_dir():
            target /= 'index.html'
        if not target.is_file():
            errors.append(f'{relative}: missing target {reference}')
        elif parts.fragment and target in pages and unquote(parts.fragment) not in pages[target].ids:
            errors.append(f'{relative}: missing anchor {reference}')
report = {'files': len(pages), 'errors': errors, 'scope': 'Static HTML: H1, duplicate IDs, local href/src and fragment targets. No browser or remote claim.'}
print(json.dumps(report, ensure_ascii=False, indent=2))
sys.exit(bool(errors))
