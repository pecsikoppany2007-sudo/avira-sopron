#!/bin/bash
# összerakja a két oldalt és a main.js-t
set -e
cd /home/claude/avira
python3 - <<'PY'
import re
P={k:open(f'part/{k}.html').read().strip() for k in ['icon','headjs','pt','foot']}
P['defs']=open('defs.svg').read()
for n in ['index','pilates']:
    s=open(f'{n}.src.html').read()
    for k,v in P.items(): s=s.replace(f'<!--{k.upper()}-->',v)
    assert '<!--' not in s.replace('<!-- ','')
    open(f'/home/claude/avira-sopron/site/{n}.html','w').write(s)
PY
cat css-fonts.css css-a.css css-carte.css css-b.css css-week.css css-c.css > /home/claude/avira-sopron/site/css/style.css
cat js-head.js data.js js-mid.js gl.js js-leaves.js js-tail.js > /home/claude/avira-sopron/site/js/main.js
echo built
