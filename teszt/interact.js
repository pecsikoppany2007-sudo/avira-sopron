// Görgő, menülinkek, fülek, nyelvváltás, rejtett rétegek: node teszt/interact.js [szélesség]
const { chromium } = require('playwright');
(async () => {
  const W = +(process.argv[2] || 1440), mob = W < 700;
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: 900 }, isMobile: mob, hasTouch: mob, locale: 'hu-HU' });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:8811/?nogate', { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
  const out = [];
  if (!mob) { await p.mouse.move(700, 500); for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 300); await p.waitForTimeout(120); } await p.waitForTimeout(1500); out.push('wheel->' + await p.evaluate(() => Math.round(scrollY))); }
  for (const id of ['rolunk', 'nap', 'etlap', 'pilates', 'orarend', 'elerhetoseg']) {
    const inMenu = await p.$(`#menu a[href="#${id}"]`);
    if (inMenu) { if (mob) await p.evaluate(() => scrollBy(0, -40)); else await p.mouse.wheel(0, -80); await p.waitForTimeout(900); await p.click('#menuBtn'); await p.waitForTimeout(1300); await p.click(`#menu a[href="#${id}"]`); }
    else await p.click(`a.btn[href="#${id}"], a[href="#${id}"]:not(#menu a)`);
    await p.waitForTimeout(2800);
    const r = await p.evaluate(id => { const s = document.getElementById(id); const h = s.querySelector('h2'); const t = (h || s).getBoundingClientRect().top; const x = h ? h.getBoundingClientRect() : null; const el = x ? document.elementFromPoint(x.left + 10, x.top + x.height / 2) : null; return Math.round(t) + (el && !s.contains(el) ? ' COVERED by ' + el.className : ''); }, id);
    out.push(id + ':' + r);
  }
  await p.click('#tab2'); await p.waitForTimeout(400); out.push('tab2 ' + (await p.textContent('#menuList')).includes('Cappuccino'));
  await p.click('.ui__lang button[data-lang="de"]');
  await p.waitForTimeout(600); out.push('de h1: ' + await p.evaluate(() => document.getElementById('heroTitle').textContent));
  const cov = await p.evaluate(() => { const a = document.querySelector('.night__btns a'); a.scrollIntoView({ block: 'center' }); const r = a.getBoundingClientRect(); const e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return a.contains(e) ? 'ok' : 'COVERED ' + (e && e.className); });
  out.push('contact btn ' + cov);
  out.push('tone ' + await p.evaluate(() => [document.documentElement.className.match(/tone-dark\S*/g), document.getElementById('menu').hidden, document.getElementById('main').inert]));
  console.log(out.join('\n'), '\nerrors', errs); await b.close();
})();
