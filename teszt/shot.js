// Képernyőképek görgetési pontokon: node teszt/shot.js [szélesség] [magasság] [kimenet-előtag]
const { chromium } = require('playwright');
(async () => {
  const W = +(process.argv[2] || 1440), H = +(process.argv[3] || 900), out = process.argv[4] || '/tmp/av';
  const b = await chromium.launch();
  const mobile = W < 700;
  const p = await b.newPage({ viewport: { width: W, height: H }, hasTouch: mobile, isMobile: mobile, locale: 'hu-HU' });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('http://localhost:8811/?nogate', { waitUntil: 'networkidle' });
  await p.waitForTimeout(2500);
  const ids = ['top', 'rolunk', 'nap', 'etlap', 'portal', 'pilates', 'orarend', 'arak', 'elerhetoseg', 'foot'];
  const tops = await p.evaluate(ids => ids.map(id => { let e = document.getElementById(id), y = 0; while (e) { y += e.offsetTop; e = e.offsetParent; } return y; }), ids);
  const extra = [];
  const ni = ids.indexOf('nap'); [1.2, 2.9, 4.4, 6.4, 7.4].forEach(k => extra.push(['nap-' + k, tops[ni] + H * k]));
  const pi = ids.indexOf('portal'); extra.push(['portal-40', tops[pi] + H * .55], ['portal-80', tops[pi] + H * 1.1]);
  const list = ids.map((id, i) => [id, tops[i]]).concat(extra).sort((a, b) => a[1] - b[1]);
  let n = 0;
  for (const [id, y] of list) {
    await p.evaluate(y => { if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true, force: true }); else window.scrollTo(0, y); }, y);
    await p.waitForTimeout(1700);
    await p.screenshot({ path: `${out}-${String(++n).padStart(2, '0')}-${id}.jpg`, type: 'jpeg', quality: 60 });
  }
  const sw = await p.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
  console.log('errors:', errs.slice(0, 8), 'scrollWidth', sw);
  await b.close();
})();
