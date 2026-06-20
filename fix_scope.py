with open('index.html', 'r') as f:
    content = f.read()

content = content.replace('(function() {\n  "use strict";', '// "use strict";')
content = content.replace('})();\n</script>', '\n</script>')

with open('index.html', 'w') as f:
    f.write(content)
