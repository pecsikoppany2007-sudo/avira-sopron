# Fotók: egységes színezés, WebP több méretben. python3 forras/img.py
from PIL import Image, ImageEnhance, ImageFilter, ImageOps
import os, json
R='/home/claude/avira/raw/'; O='site/img/'
L={ # név: (forrás, crop (l,t,r,b) arányban vagy None, szélességek)
 'cafe-boksz':('DfB1mp2jrpA_c4',None,[800,1400,2200]),
 'cafe-sarok':('DfB1mp2jrpA_c2',None,[800,1400]),
 'cafe-logo':('DfB1mp2jrpA_c3',None,[800,1400]),
 'cafe-asztal':('DfB1mp2jrpA_c6',None,[800,1400]),
 'cafe-pult':('DfB1mp2jrpA_c5',None,[800,1400]),
 'cafe-latte':('DfB1mp2jrpA_c7',(0,0,.62,1),[800,1400]),
 'cafe-tulipan':('DfRMB1lj8hU_c3',None,[800,1400]),
 'cafe-felirat':('DfRMB1lj8hU_0',None,[800,1400]),
 'cafe-fotelek':('DfRMB1lj8hU_c1',None,[800,1400]),
 'bar-polc':('DfKWp7Ajv_t_c1',None,[800,1400]),
 'brunch':('DfSXkoJDPAF_0',None,[800,1400]),
 'kave':('DfO1HjLFbNW_0',None,[800,1400]),
 'smoothie':('DfOj3uUDU1x_0',None,[800,1400]),
 'kutya':('DfMF-uYCuL8_0',(0,.08,.56,1),[800]),
 'pilates-tukor':('PDfFL1ijCG5U_c1',None,[800,1400,2200]),
 'pilates-terem':('PDfFL1ijCG5U_c3',None,[800,1400]),
 'pilates-ablak':('PDfFL1ijCG5U_0',None,[800,1400]),
 'align':('PDfFL1ijCG5U_c2',None,[800]),
 'sziszi':('PDfNWXJJopeh_0',None,[800,1200]),
}
meta={}
for n,(src,crop,ws) in L.items():
  im=Image.open(R+src+'.jpg').convert('RGB')
  if crop:
    W,H=im.size; im=im.crop((int(crop[0]*W),int(crop[1]*H),int(crop[2]*W),int(crop[3]*H)))
  # egységes, kissé meleg, visszafogott telítettség
  im=ImageEnhance.Color(im).enhance(.92)
  r,g,b=im.split(); r=r.point(lambda v:min(255,int(v*1.02))); b=b.point(lambda v:int(v*.97)); im=Image.merge('RGB',(r,g,b))
  meta[n]=im.size
  for w in ws:
    if w>im.size[0]: w=im.size[0]
    t=im.resize((w,round(im.size[1]*w/im.size[0])),Image.LANCZOS)
    t.save(f'{O}{n}-{w}.webp',quality=80 if w<2000 else 76,method=6)
json.dump({k:list(v) for k,v in meta.items()},open('forras/kepek.json','w'))
print('ok',len(L))
