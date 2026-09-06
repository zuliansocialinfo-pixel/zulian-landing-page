"""Regression checks for the September 2026 commercial release."""
import json
import sys
import unittest
from html.parser import HTMLParser
from pathlib import Path

ROOT=Path(__file__).resolve().parent.parent
sys.path.insert(0,str(ROOT/'tools'))
from commercial_release import visual_supplement, AUTOMATIONS, INTEGRATIONS, apply_commercial_release

class Elements(HTMLParser):
    def __init__(self,text):
        super().__init__();self.ids=[];self.headings=[];self.links=[];self.images=[];self.text=[];self.feed(text)
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if attrs.get('id'):self.ids.append(attrs['id'])
        if tag=='h1':self.headings.append(tag)
        if tag=='a':self.links.append(attrs.get('href',''))
        if tag=='img':self.images.append(attrs.get('src',''))
    def handle_data(self,value):self.text.append(value)

class CommercialRelease(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data=json.loads((ROOT/'src/site-data.json').read_text())
        cls.price=(ROOT/'public/prezzi/index.html').read_text()
        cls.dom=Elements(cls.price)

    def test_package_price_and_counts(self):
        ps=self.data['packages']
        self.assertEqual([p['price'] for p in ps],[1100,1600,2400])
        self.assertEqual([p['pageCount'] for p in ps],[4,7,10])
        self.assertEqual([p['languages'] for p in ps],[3,5,7])
        self.assertEqual([p['videos'] for p in ps],[1,3,6])
        self.assertEqual([p['sourceWords'] for p in ps],[1500,3000,5000])

    def test_material_boundaries(self):
        m=self.data['commercial']['materials']
        for n,cost in [(0,0),(1,0),(5,0),(6,100),(10,100),(15,100),(16,200),(20,200),(25,200),(26,300),(30,300)]:
            with self.subTest(quantity=n):self.assertEqual(visual_supplement(n,m),cost)

    def test_invalid_quantities(self):
        for value in [-1,True,1.5,'10',None]:
            with self.subTest(value=value),self.assertRaises(ValueError):
                visual_supplement(value,self.data['commercial']['materials'])

    def test_automation_prices_support(self):
        self.assertEqual([r[1] for r in AUTOMATIONS],[1500,1200,650,450,550])
        self.assertEqual([r[3] for r in AUTOMATIONS],[60,60,30,30,30])
        self.assertEqual([r[1] for r in INTEGRATIONS],[200,300,250,350,650,350])

    def test_pricing_anchors_and_single_h1(self):
        for id in ['pacchetti','essential','business','signature','materiali','automazioni','integrazioni','app-start','e-commerce','costi-esterni','consegna-assistenza','pagamenti']:
            with self.subTest(id=id):self.assertEqual(self.dom.ids.count(id),1)
        self.assertEqual(len(self.dom.headings),1)
        self.assertLess(self.price.index('id="pacchetti"'),self.price.index('id="materiali"'))

    def test_scope_not_unlimited(self):
        for term in ['€2.500','5 schermate','2 ruoli','€100','500 parole','riprese originali','IVA inclusa se dovuta','approvazione','diritti inderogabili']:
            with self.subTest(term=term):self.assertIn(term,self.price)
        self.assertIn('non si aggiungono €650',self.price)
        self.assertIn('Il calendario/connettore standard previsto nel prodotto è già incluso',self.price)

    def test_new_routes_and_sitemap(self):
        sitemap=(ROOT/'public/sitemap.xml').read_text()
        for route in ['prezzi','certificazioni','applicazioni','automazioni-ai']:
            with self.subTest(route=route):
                path=ROOT/'public'/route/'index.html'
                self.assertTrue(path.is_file())
                self.assertEqual(len(Elements(path.read_text()).headings),1)
                self.assertIn('/'+route+'/',sitemap)

    def test_certificates_not_fabricated(self):
        page=(ROOT/'public/certificazioni/index.html').read_text()
        self.assertIn('non consentono un’anteprima leggibile',page)
        self.assertIn('non riportiamo ente emittente, data, codice',page)
        self.assertIn('applied-ai-foundations.jpg',page)
        self.assertIn('higgsfield-ai-filmmaking.jpg',page)
        self.assertFalse(any('certificates' in src for src in Elements(page).images))
        self.assertNotIn('hasCredential',page)

    def test_legacy_training(self):
        for file in ['formazione.html','formazione/index.html']:
            self.assertIn('0;url=/certificazioni/',(ROOT/'public'/file).read_text())

    def test_demo_counts_remain_actual(self):
        models=json.loads((ROOT/'src/models.json').read_text())
        for model in models:
            self.assertGreater(model['pages'],0)
        text=(ROOT/'public/modelli/index.html').read_text()
        self.assertIn('nella demo;',text)
        self.assertIn('nel pacchetto',text)

    def test_shared_navigation(self):
        home=(ROOT/'public/index.html').read_text()
        self.assertIn('href="/certificazioni/"',home)
        self.assertIn('href="/applicazioni/"',home)
        self.assertIn('4 pagine funzionali',home)
        self.assertNotIn('8–10 pagine',self.price)

if __name__=='__main__':unittest.main()
