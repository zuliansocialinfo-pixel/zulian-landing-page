#!/usr/bin/env python3
from pathlib import Path
from html.parser import HTMLParser
import json, sys

ROOT = Path(__file__).resolve().parents[1]
contract = json.loads((ROOT / "data/site-contract.json").read_text(encoding="utf-8"))
errors = []

class P(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonical = False
        self.main = 0
        self.privacy = False
        self.desc = False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "link" and a.get("rel") == "canonical": self.canonical = True
        if tag == "main": self.main += 1
        if tag == "a" and str(a.get("href", "")).endswith("privacy.html"): self.privacy = True
        if tag == "meta" and a.get("name") == "description" and a.get("content"): self.desc = True

htmls = sorted([p for p in ROOT.rglob("*.html") if ".git" not in p.parts])
for f in htmls:
    text = f.read_text(encoding="utf-8", errors="replace")
    p = P(); p.feed(text)
    rel = f.relative_to(ROOT).as_posix()
    if "<title>" not in text: errors.append(f"{rel}: missing title")
    if not p.desc: errors.append(f"{rel}: missing meta description")
    if not p.canonical: errors.append(f"{rel}: missing canonical")
    if p.main != 1: errors.append(f"{rel}: expected exactly one main, got {p.main}")
    if not p.privacy: errors.append(f"{rel}: missing privacy link")
    if "is-loading" in text: errors.append(f"{rel}: blocking is-loading found")
    if "02 / Premium" in text or "03 / Enterprise" in text or ">Premium<" in text or ">Enterprise<" in text:
        errors.append(f"{rel}: forbidden legacy tier label")

sol = (ROOT / "soluzioni.html").read_text(encoding="utf-8")
for product in contract["website_products"]:
    price = f"€{product['price_eur']:,}".replace(",", ".")
    if product["label"] not in sol or price not in sol:
        errors.append(f"soluzioni.html: missing canonical product {product['label']} / {product['price_eur']}")

index = (ROOT / "index.html").read_text(encoding="utf-8")
if "4.270" in index or "ore stimate" in index.lower():
    errors.append("index.html: unsupported study-hours metric remains")

if errors:
    print("FAIL")
    for e in errors: print("-", e)
    sys.exit(1)
print(f"PASS_LOCAL: {len(htmls)} HTML files comply with reference-class contract")
