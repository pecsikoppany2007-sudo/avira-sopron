import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as nd
im=np.asarray(Image.open('/home/claude/avira-assets/raw/levelek-4x.png').convert('RGB')).astype(np.float32)
mx=im.max(2)
a=np.clip((mx-26)/34,0,1)
m=nd.binary_opening(a>0.5,iterations=3)
lab,n=nd.label(m)
sizes=nd.sum(m,lab,range(1,n+1))
objs=nd.find_objects(lab)
k=0
out=[]
for i,(s,sl) in enumerate(zip(sizes,objs)):
    if s<20000: continue
    y0,y1=sl[0].start,sl[0].stop; x0,x1=sl[1].start,sl[1].stop
    pad=40
    Y0,Y1,X0,X1=max(0,y0-pad),min(im.shape[0],y1+pad),max(0,x0-pad),min(im.shape[1],x1+pad)
    reg=nd.binary_dilation(lab[Y0:Y1,X0:X1]==i+1,iterations=14)
    al=a[Y0:Y1,X0:X1]*reg
    core=nd.binary_fill_holes(nd.binary_closing(al>0.3,iterations=4))
    core=nd.binary_erosion(core,iterations=4)
    al=np.maximum(al,nd.gaussian_filter(core.astype(np.float32),1.5))
    al=nd.gaussian_filter(al,0.7)
    rgb=im[Y0:Y1,X0:X1]/np.maximum(al[...,None],0.05)
    rgb=np.clip(rgb,0,255)
    # stem side: column coverage near ends
    col=(al>0.5).sum(0); nz=np.nonzero(col)[0]; L=len(nz)
    left=col[nz[0]:nz[0]+int(L*.06)].mean(); right=col[nz[-1]-int(L*.06):nz[-1]].mean()
    stem_left=left<right
    img=Image.fromarray(np.dstack([rgb,al*255]).astype(np.uint8),'RGBA')
    img=img.rotate(90 if stem_left else -90,expand=True,resample=Image.BICUBIC)
    img=img.crop(img.getbbox())
    # bake soft shadow
    W,H=img.size; P=int(W*.35)
    can=Image.new('RGBA',(W+2*P,H+2*P),(0,0,0,0))
    sh=Image.new('RGBA',can.size,(0,0,0,0))
    alpha=img.split()[3].point(lambda v:int(v*.32))
    blk=Image.new('RGBA',img.size,(32,30,22,255)); blk.putalpha(alpha)
    sh.paste(blk,(P+int(W*.06),P+int(W*.10)),blk)
    sh=sh.filter(ImageFilter.GaussianBlur(W*.07))
    can=Image.alpha_composite(sh,can)
    can.alpha_composite(img,(P,P))
    can=can.crop(can.getbbox())
    tgt=720
    sc=tgt/can.size[1]; can=can.resize((round(can.size[0]*sc),tgt),Image.LANCZOS)
    k+=1
    g=im[Y0:Y1,X0:X1][al>0.6].mean(0)
    kind='olive' if g[1]-g[0]<45 else 'coffee'
    fn=f'leaves/lf{k}.webp'; can.save(fn,'WEBP',quality=82,method=6)
    out.append((fn,can.size,kind,int(x0),int(y0)))
for o in out: print(o)
