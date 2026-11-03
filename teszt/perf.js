// Eldobott képkockák Chrome-nyomkövetésből (PipelineReporter), egyedül futtatva: node teszt/perf.js desk|phone
// desk: --disable-webgl + a GPU-próba csonkja (valódi GPU-t mutat), így a gazdag mód fut SwiftShader nélkül.
const { chromium } = require('playwright');
(async () => {
  const mode = process.argv[2] || 'desk', phone = mode === 'phone';
  const b = await chromium.launch({ args: phone ? [] : ['--disable-webgl', '--disable-3d-apis'] });
  const ctx = await b.newContext(phone ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 } : { viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  if (!phone) await p.addInitScript(() => { const o = HTMLCanvasElement.prototype.getContext; let first = true; HTMLCanvasElement.prototype.getContext = function (k, a) { if (first && /webgl/.test(k)) { first = false; return { getExtension: n => n === 'WEBGL_debug_renderer_info' ? { UNMASKED_RENDERER_WEBGL: 1 } : null, getParameter: () => 'ANGLE (Apple, Apple M1, OpenGL 4.1)' }; } return o.call(this, k, a); }; });
  const cdp = await ctx.newCDPSession(p);
  if (process.env.PERF_GATE) {
    if (phone) await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await p.goto('about:blank'); await b.startTracing(p, { categories: ['benchmark', 'cc', 'disabled-by-default-devtools.timeline.frame'] });
    await p.goto('http://localhost:8811/'); await p.waitForFunction(() => document.documentElement.classList.contains('gate-run')); await p.waitForTimeout(4200);
    const ev = JSON.parse((await b.stopTracing()).toString()).traceEvents.filter(e => e.name === 'PipelineReporter' && e.args && e.args.frame_reporter);
    const d = ev.filter(e => e.args.frame_reporter.state === 'STATE_DROPPED').length;
    console.log(mode, 'gate frames', ev.length, 'dropped', d, (100 * d / Math.max(1, ev.length)).toFixed(1) + '%'); await b.close(); return;
  }
  if (phone) await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await p.goto('http://localhost:8811/' + (process.env.PG || '') + '?nointro', { waitUntil: 'networkidle' }); if (process.env.PERF_CSS) await p.addStyleTag({ content: process.env.PERF_CSS }); await p.waitForTimeout(3500);
  const H = await p.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  await b.startTracing(p, { categories: ['benchmark', 'cc', 'disabled-by-default-devtools.timeline.frame'] });
  if (!phone) { await p.mouse.move(700, 450); for (let y = 0; y < H; y += 220) { await p.mouse.wheel(0, 220); await p.waitForTimeout(70); } await p.waitForTimeout(1200); }
  else {
    for (let i = 0; i < 26; i++) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 200, y: 700 }] });
      for (let k = 1; k <= 8; k++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 200, y: 700 - k * 60 }] }); await p.waitForTimeout(16); }
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] }); await p.waitForTimeout(380);
    }
  }
  const buf = await b.stopTracing();
  const all = JSON.parse(buf.toString()).traceEvents; const pr = all.filter(e => e.name === 'PipelineReporter'); if (process.env.DBG) console.log(pr.length, JSON.stringify(pr.slice(0, 2)).slice(0, 600)); const ev = pr.filter(e => e.args && (e.args.chrome_frame_reporter || e.args.frame_reporter)).map(e => ({ args: { chrome_frame_reporter: e.args.chrome_frame_reporter || e.args.frame_reporter } }));
  const st = {}; ev.forEach(e => { const s = e.args.chrome_frame_reporter.state; st[s] = (st[s] || 0) + 1; });
  const tot = ev.length, dr = (st.STATE_DROPPED || 0);
  console.log(mode, 'frames', tot, 'dropped', dr, (100 * dr / Math.max(1, tot)).toFixed(1) + '%', 'scrolled', await p.evaluate(() => Math.round(scrollY)), '/', H);
  await b.close();
})();
