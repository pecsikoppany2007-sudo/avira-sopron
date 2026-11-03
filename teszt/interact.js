// Görgő, menülinkek, fülek, nyelvváltás, rejtett rétegek: node teszt/interact.js [szélesség]
const { chromium } = require('playwright');
(async () => {
  const W = +(process.argv[2] || 1440), mob = W < 700;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: 900 }, isMobile: mob, hasTouch: mob, locale: 'hu-HU' });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:8811/?nogate', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  const out = [];
  if (!mob) { await p.mouse.move(700, 500); for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 300); await p.waitForTimeout(120); } await p.waitForTimeout(1500); out.push('wheel->' + await p.evaluate(() => Math.round(scrollY))); }
  for (const id of ['kavezo', 'etlap', 'pilates', 'orarend', 'arak', 'elerhetoseg']) {
    if (mob) { await p.click('#burger'); await p.waitForTimeout(500); }
    await p.click(`#navLinks a[href="#${id}"]`); await p.waitForTimeout(2600);
    const r = await p.evaluate(id => { const s = document.getElementById(id); const h = s.querySelector('h2'); const t = (h || s).getBoundingClientRect().top; const x = h ? h.getBoundingClientRect() : null; const el = x ? document.elementFromPoint(x.left + 10, x.top + x.height / 2) : null; return Math.round(t) + (el && !s.contains(el) ? ' COVERED by ' + el.className : ''); }, id);
    out.push(id + ':' + r);
  }
  await p.click('#tab2'); await p.waitForTimeout(400); out.push('tab2 ' + (await p.textContent('#menuList')).includes('Cappuccino'));
  await p.click('.nav__lang button[data-lang="de"]').catch(async () => { await p.click('#burger'); await p.click('.nav__lang button[data-lang="de"]'); });
  await p.waitForTimeout(600); out.push('de h1: ' + await p.evaluate(() => document.getElementById('heroTitle').textContent));
  const cov = await p.evaluate(() => { const a = document.querySelector('.contact__btns a'); a.scrollIntoView({ block: 'center' }); const r = a.getBoundingClientRect(); const e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return a.contains(e) ? 'ok' : 'COVERED ' + (e && e.className); });
  out.push('contact btn ' + cov);
  console.log(out.join('\n'), '\nerrors', errs); await b.close();
})();
