// Címek és vízszintes túlcsordulás minden nyelven és szélességen: node teszt/fit.js
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const bad = [];
  for (const pg of ['/', '/pilates.html']) for (const lang of ['hu', 'de', 'en']) for (const W of [320, 390, 768, 1024, 1280, 1920]) {
    const p = await b.newPage({ viewport: { width: W, height: 800 }, isMobile: W < 700, hasTouch: W < 700 });
    await p.addInitScript(l => localStorage.setItem('avira-lang', l), lang);
    await p.goto('http://localhost:8811' + pg + '?nointro', { waitUntil: 'networkidle' }); await p.waitForTimeout(600);
    const r = await p.evaluate(() => {
      const o = []; const sw = document.documentElement.scrollWidth; if (sw > innerWidth) o.push('scrollWidth ' + sw);
      document.querySelectorAll('.bl .w, .fees__list .pn, .day h3, .mi__n, .ch h3, .menu__nav span, .carte__idx button, .lede__p .wd').forEach(w => {
        const h = w.closest('h1,h2,h3,li,.mi,p,button,a') || w.parentNode; const a = w.getBoundingClientRect(), c = h.getBoundingClientRect();
        if (a.right > c.right + 6) o.push((w.textContent || '').trim().slice(0, 30) + ' ' + Math.round(a.right - c.right));
      });
      return o;
    });
    if (r.length) bad.push(pg + ' ' + lang + ' ' + W + ': ' + r.slice(0, 5).join(' | '));
    await p.close();
  }
  console.log(bad.length ? bad.join('\n') : 'all fit'); await b.close();
})();
