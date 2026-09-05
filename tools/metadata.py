"""Structured data derived from visible identity, titles and hierarchy."""
def structured_data(data, title, route, pages):
    origin=data['origin']; url=origin+route
    organization={'@type':'Organization','@id':origin+'/#organization','name':data['brand'],'legalName':data['legalName'],'url':origin,'telephone':data['telephone'],'email':data['email']}
    website={'@type':'WebSite','@id':origin+'/#website','url':origin+'/','name':data['brand'],'publisher':{'@id':origin+'/#organization'}}
    current={'@type':'WebPage','@id':url+'#webpage','url':url,'name':title,'inLanguage':'it-IT','isPartOf':{'@id':origin+'/#website'}}
    graph=[current]
    if route=='/':
        graph.extend([organization,website])
    page=next((p for p in pages if p['route']==route),None)
    if page:
        entries=[('Home',origin+'/')]
        article=route.startswith('/guide/') and route!='/guide/'
        if article: entries.append(('Guide',origin+'/guide/'))
        entries.append((page['label'],url))
        crumb={'@type':'BreadcrumbList','@id':url+'#breadcrumb','itemListElement':[{'@type':'ListItem','position':i,'name':name,'item':href} for i,(name,href) in enumerate(entries,1)]}
        current['breadcrumb']={'@id':crumb['@id']};graph.append(crumb)
        if article:
            graph.append({'@type':'Article','@id':url+'#article','headline':title,'inLanguage':'it-IT','mainEntityOfPage':{'@id':current['@id']},'author':{'@type':'Person','name':'Marco Zulian','url':origin+'/chi-sono/'},'publisher':{'@id':origin+'/#organization'}})
        elif route=='/guide/':current['@type']='CollectionPage'
    return {'@context':'https://schema.org','@graph':graph}
