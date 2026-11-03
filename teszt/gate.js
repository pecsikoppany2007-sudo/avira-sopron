// A nyitány képkockái: node teszt/gate.js [szélesség] [magasság]
const { chromium } = require('playwright');
(async () => {
  const W = +(process.argv[2] || 1440), H = +(process.argv[3] || 900);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H }, locale: 'hu-HU' });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(() => { window.addEventListener('DOMContentLoaded', () => { const iv = setInterval(() => { if (window.gsap) { gsap.globalTimeline.timeScale(0.1); gsap.ticker.lagSmoothing(0); clearInterval(iv); } }, 5); }); });
  await p.goto('http://localhost:8811/');
  const t0 = Date.now();
  for (const t of [0.5, 1.0, 1.6, 2.1, 2.4, 2.7, 3.3, 4.4]) {
    const wait = t * 10000 + 800 - (Date.now() - t0); if (wait > 0) await p.waitForTimeout(wait);
    await p.screenshot({ path: `/home/claude/avira/s/g-${String(t).padEnd(3, '0')}.jpg`, type: 'jpeg', quality: 55 });
  }
  console.log('errors', errs, await p.evaluate(() => document.documentElement.className));
  await b.close();
})();
