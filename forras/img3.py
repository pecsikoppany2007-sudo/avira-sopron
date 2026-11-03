# v3 képek: a muapi-retusált, 4x felskálázott fotókból WebP méretek
import sys
from PIL import Image, ImageFilter, ImageEnhance
R='/home/claude/avira-assets/raw/'; O='site/img/'
JOBS=[('wix-bar.jpg','hero-bar',[1000,1600,2400],None),
('ablak-4x.png','pil-ablak',[1000,1600,2400],None),
('tukor-4x.png','pil-tukor',[1000,1600,2400],None),
('terem-4x.png','pil-terem',[800,1400],None),
('sziszi-4x.png','sziszi',[800,1200],None),
('brunch-4x.png','brunch',[800,1400],None),
('kave-4x.png','kave',[800,1400],None),
('smoothie-4x.png','smoothie',[800,1400],None),
('felirat-4x.png','cafe-felirat',[800,1400],None),
('tulipan-4x.png','cafe-tulipan',[800,1400],None),
('kutya-4x.png','kutya',[800,1400],None)]
for src,n,ws,crop in JOBS:
    im=Image.open(R+src).convert('RGB')
    for w in ws:
        h=round(im.height*w/im.width)
        t=im.resize((w,h),Image.LANCZOS).filter(ImageFilter.UnsharpMask(1.0,40,2))
        t.save(f'{O}{n}-{w}.webp',quality=80 if w<2000 else 74,method=6)
    print(n,im.size)
