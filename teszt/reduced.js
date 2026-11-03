// Csökkentett mozgás: minden szöveg és kép látszik, a nyitány nem fut: node teszt/reduced.js
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('http://localhost:8811/' + (process.argv[2] || ''), { waitUntil: 'networkidle' }); await p.waitForTimeout(1200);
  const r = await p.evaluate(() => {
    const hid = [...document.querySelectorAll('.rv, .rvi > span, .bl .w, .lede__p .wd, .lfc .lf__g')].filter(e => { const s = getComputedStyle(e); return +s.opacity < .99 || /matrix\(1, 0, 0, 1, 0, [1-9]/.test(s.transform) || (s.clipPath && s.clipPath !== 'none' && !/inset\(0(px)?\)/.test(s.clipPath)); }).map(e => e.className).slice(0, 6);
    return { gate: document.documentElement.classList.contains('intro-on'), hidden: hid };
  });
  console.log(JSON.stringify(r), errs); await b.close();
})();
