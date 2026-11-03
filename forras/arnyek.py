# Levélárnyék a krém felületekre: két ág a felső sarkokból, elmosva, átlátszó háttéren. python3 forras/arnyek.py
import math, random
from PIL import Image, ImageDraw, ImageFilter
random.seed(5)
W, H = 2000, 1300
m = Image.new('L', (W, H), 0); d = ImageDraw.Draw(m)
def leaf(x, y, a, L, w):
    pts = [(t / 40 * L, math.sin(math.pi * t / 40) ** .8 * w) for t in range(41)]
    pts += [(px, -py) for px, py in reversed(pts)]
    ca, sa = math.cos(a), math.sin(a)
    d.polygon([(x + px * ca - py * sa, y + px * sa + py * ca) for px, py in pts], fill=255)
def branch(x, y, a, n, sub):
    for s in range(n):
        a += random.uniform(-.05, .05); nx, ny = x + math.cos(a) * 16, y + math.sin(a) * 16
        d.line([(x, y), (nx, ny)], fill=255, width=4 if sub == 0 else 3); x, y = nx, ny
        if s % 4 == 2:
            for side in (-1, 1):
                if random.random() < .8: leaf(x, y, a + side * random.uniform(.55, .95), random.uniform(80, 125), random.uniform(20, 28))
        if sub == 0 and s in (14, 30): branch(x, y, a + random.choice([-1, 1]) * .6, 14, 1)
    leaf(x, y, a, 110, 24)
branch(-40, 120, .38, 44, 0)
branch(W + 40, 40, math.pi - .5, 36, 0)
m = m.filter(ImageFilter.GaussianBlur(13))
im = Image.new('RGBA', (W, H), (34, 40, 22, 0)); im.putalpha(m.point(lambda v: int(v * .8)))
im.resize((1400, 910), Image.LANCZOS).save('site/img/levelarnyek.webp', quality=72, method=6)
