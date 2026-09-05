import json
from pathlib import Path
import sys
import unittest
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'tools'))
from metadata import structured_data
DATA=json.loads((ROOT/'src/site-data.json').read_text())
PAGES=json.loads((ROOT/'src/pages.json').read_text())

class MetadataTests(unittest.TestCase):
    def test_home_defines_referenced_site_and_publisher(self):
        graph=structured_data(DATA,'Home','/',PAGES)['@graph']
        ids={n['@id'] for n in graph}
        self.assertIn(DATA['origin']+'/#website',ids)
        self.assertIn(DATA['origin']+'/#organization',ids)
    def test_all_secondary_pages_have_matching_breadcrumb(self):
        for page in PAGES:
            graph=structured_data(DATA,page['title'],page['route'],PAGES)['@graph']
            crumb=next(n for n in graph if n['@type']=='BreadcrumbList')
            items=crumb['itemListElement']
            self.assertEqual(items[-1]['name'],page['label'])
            self.assertEqual(items[-1]['item'],DATA['origin']+page['route'])
            self.assertEqual([n['position'] for n in items],list(range(1,len(items)+1)))
    def test_only_four_editorial_pages_are_articles(self):
        articles=[]
        for page in PAGES:
            graph=structured_data(DATA,page['title'],page['route'],PAGES)['@graph']
            for node in graph:
                if node['@type']=='Article':
                    articles.append(node)
                    self.assertEqual(node['author']['name'],'Marco Zulian')
                    self.assertNotIn('datePublished',node)
                    self.assertNotIn('aggregateRating',node)
        self.assertEqual(len(articles),4)

if __name__=='__main__':unittest.main()
