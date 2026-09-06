"""Read-only post-deploy check: public HTML must match the built release."""
from pathlib import Path
from urllib.request import Request, urlopen
from hashlib import sha256
import json
import os
import sys
import time

ROOT=Path(__file__).resolve().parent.parent
ORIGIN='https://www.zuliansocialmediamarketing.com'
ROUTES=['/prezzi/','/certificazioni/','/applicazioni/','/automazioni-ai/','/','/assets/commercial-data.js']
commit=os.environ.get('GITHUB_SHA','local')
report={'commit':commit,'scope':'HTTP GET of public release files; no form submission or external-provider transaction','pages':{},'success':False}
pending=set(ROUTES)
deadline=time.monotonic()+120
while pending and time.monotonic()<deadline:
    for route in list(pending):
        target=ROOT/'public'/route.strip('/')
        if route.endswith('/'):target=target/'index.html'
        expected=sha256(target.read_bytes()).hexdigest()
        url=ORIGIN+route+'?zad_release='+commit
        try:
            request=Request(url,headers={'User-Agent':'ZAD-Public-Release-Check/1.0','Cache-Control':'no-cache','Accept-Encoding':'identity'})
            with urlopen(request,timeout=10) as response:
                body=response.read()
                actual=sha256(body).hexdigest()
                result={'url':url,'http_status':response.status,'expected_sha256':expected,'received_sha256':actual,'matches_build':actual==expected}
            if result['matches_build']:pending.remove(route)
        except Exception as exc:
            result={'url':url,'matches_build':False,'error':str(exc)}
        report['pages'][route]=result
        if time.monotonic()>=deadline:break
    if pending and time.monotonic()<deadline:time.sleep(8)
report['success']=not pending
report['pending']=sorted(pending)
(ROOT/'remote-commercial-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
sys.exit(0 if report['success'] else 1)
