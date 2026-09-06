import json
import re
import sys
import unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
sys.path.insert(0,str(ROOT/'tools'))
from commercial_release import apply_commercial_release
from commercial_editorial import align_pages

class Consistency(unittest.TestCase):
    def test_current_counts_in_cost_guide(self):
        text=(ROOT/'public/guide/costo-sito-web/index.html').read_text()
        self.assertIn('4, 7 e 10 pagine funzionali',text)
        self.assertNotIn('3, 5 e 10 pagine',text)
        self.assertNotIn('8–10 pagine',text)

    def test_home_tax_and_scope(self):
        text=(ROOT/'public/index.html').read_text()
        self.assertIsNone(re.search(r'IVA inclusa(?! se dovuta)',text))
        self.assertIn('Per i siti: 30 giorni',text)
        self.assertIn('non sono in gestione continuativa',text)

    def test_repeated_build_has_unique_content(self):
        data=json.loads((ROOT/'src/site-data.json').read_text())
        pages=json.loads((ROOT/'src/pages.json').read_text())
        one=align_pages(apply_commercial_release(pages,data),data)
        two=align_pages(apply_commercial_release(one,data),data)
        self.assertEqual(json.dumps(one,sort_keys=True),json.dumps(two,sort_keys=True))
        for page in two:
            ids=[s['id'] for s in page.get('sections',[]) if s.get('id')]
            self.assertEqual(len(ids),len(set(ids)))

if __name__=='__main__':unittest.main()
