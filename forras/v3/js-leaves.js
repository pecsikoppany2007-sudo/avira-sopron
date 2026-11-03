  /* ------------------------------------------------------------------ levelek: valódi levélfotók a sarkokban; legyezőként kinyílnak, lassan ringatóznak,
     az egér és a görgetés meglebbenti őket (rugós lengés, csak amíg mozognak) */
  // [kép szélessége px, szár helye x %, y %] – a szár az a pont, ami körül a levél forog
  var LF = [null, [365, 42.9, 91.4], [373, 49.9, 91.4], [168, 42.3, 95.6], [371, 42.3, 91.5], [163, 46.9, 96], [172, 44.8, 95.8], [153, 45.8, 96.2], [373, 46.5, 91.5], [374, 40.9, 91.5], [175, 44, 95.8]];
  // csoportok: [levél, irány fokban (0 = felfelé, óramutató szerint), méret]
  var CL = {
    ledeL: [[5, 34, .9], [4, 58, 1.1], [3, 80, 1.05], [1, 102, 1], [6, 124, .95], [9, 146, .85]],
    ledeR: [[6, -34, .85], [2, -56, 1.1], [10, -78, 1], [8, -102, 1], [7, -126, .9], [4, -148, .85]],
    carte: [[5, 12, .9], [1, 30, .95], [3, 52, 1], [9, 72, .9], [2, 94, .8]],
    night: [[2, -108, .85], [4, -130, .95], [6, -152, .9], [7, -172, .8]],
    pilR: [[3, -40, 1], [1, -62, 1.05], [5, -84, .95], [8, -106, .95], [10, -128, .85]],
    coach: [[5, 36, .9], [2, 60, 1], [3, 84, 1], [9, 108, .9], [6, 132, .85]],
    coachR: [[6, -36, .85], [4, -60, 1], [10, -84, 1], [1, -108, .9], [7, -132, .85]]
  };
  var LV = { list: [], cl: [], run: false };
  function initLeaves() {
    $$('.lfc').forEach(function (el) {
      var cfg = CL[el.getAttribute('data-cl')]; if (!cfg) return;
      var c = { el: el, lv: [], on: false, k: 1, ox: 0, oy: 0 };
      if (innerWidth < 760) cfg = cfg.filter(function (d) { return Math.abs(d[1]) <= 125; });
      cfg.forEach(function (d, i) {
        var m = LF[d[0]], wide = m[0] > 300, w = Math.round((wide ? 150 : 72) * d[2]), h = 720 * w / m[0];
        var lf = document.createElement('span'); lf.className = 'lf';
        var off = i - (cfg.length - 1) / 2, oy = Math.round(off * 30), ox = -Math.round(Math.abs(off) * 10) * (d[1] < 0 ? -1 : 1);
        lf.style.cssText = '--w:' + w + 'px;--sx:' + m[1] + '%;--sy:' + m[2] + '%;--r:' + d[1] + 'deg;left:calc(var(--k) * ' + ox + 'px);top:calc(var(--k) * ' + oy + 'px)';
        lf.innerHTML = '<span class="lf__g"><span class="lf__m"><span class="lf__s" style="--d:' + (5.5 + (i * 1.7) % 4).toFixed(1) + 's;--dl:-' + (i * 1.3).toFixed(1) + 's;--sw:' + (wide ? 1.4 : 2.2) + 'deg">' +
          '<img src="img/lf/lf' + d[0] + '.webp?v=3" alt="" width="' + m[0] + '" height="720" loading="lazy" decoding="async"></span></span></span>';
        el.appendChild(lf);
        c.lv.push({ g: lf.firstChild, m: lf.firstChild.firstChild, r: d[1], a: 0, v: 0, len: h * m[2] / 100, last: '' });
      });
      LV.cl.push(c);
    });
    if (!LV.cl.length) return;
    var measureK = function () { LV.cl.forEach(function (c) { c.k = parseFloat(getComputedStyle(c.el).getPropertyValue('--k')) || 1; }); };
    measureK(); window.addEventListener('resize', measureK);
    // kinyílás: a levelek összecsukva, kicsiben indulnak, és legyezőként szétnyílnak
    var open = function (c) {
      c.el.classList.add('is-open');
      if (reduced) return;
      var mean = c.lv.reduce(function (s, o) { return s + o.r; }, 0) / c.lv.length;
      gsap.fromTo(c.lv.map(function (o) { return o.g; }),
        { scale: .1, opacity: 0, rotation: function (i) { return (mean - c.lv[i].r) * .9; } },
        { scale: 1, opacity: 1, rotation: 0, duration: 2.6, ease: 'expo.out', stagger: .085, delay: .05 });
    };
    if (!('IntersectionObserver' in window)) { LV.cl.forEach(function (c) { c.el.classList.add('is-open', 'is-on'); c.on = true; }); return; }
    var oOpen = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { oOpen.unobserve(e.target); open(LV.cl.filter(function (c) { return c.el === e.target; })[0]); } }); }, { rootMargin: '0px 0px -14% 0px' });
    var oOn = new IntersectionObserver(function (es) { es.forEach(function (e) { var c = LV.cl.filter(function (x) { return x.el === e.target; })[0]; c.on = e.isIntersecting; c.el.classList.toggle('is-on', c.on); }); }, { rootMargin: '360px 0px 360px 0px' });
    LV.cl.forEach(function (c) { oOpen.observe(c.el); oOn.observe(c.el); });
    if (reduced || !canHover) return;

    // rugós lengés: szög (a) és szögsebesség (v) levelenként
    function tick() {
      var dr = Math.min(3, gsap.ticker.deltaRatio()), moving = false;
      LV.cl.forEach(function (c) {
        c.lv.forEach(function (o) {
          if (o.a === 0 && o.v === 0) return;
          o.v += -o.a * .045 * dr; o.v *= Math.pow(.9, dr); o.a += o.v * dr;
          if (o.a > 24) { o.a = 24; o.v *= -.3; } else if (o.a < -24) { o.a = -24; o.v *= -.3; }
          if (Math.abs(o.a) < .02 && Math.abs(o.v) < .02) { o.a = o.v = 0; }
          else moving = true;
          var t = 'rotate(' + o.a.toFixed(2) + 'deg)'; if (t !== o.last) { o.last = t; o.m.style.transform = t; }
        });
      });
      if (!moving) { LV.run = false; gsap.ticker.remove(tick); }
    }
    function kick() { if (!LV.run) { LV.run = true; gsap.ticker.add(tick); } }
    // egér: ahol a mutató átsöpör egy levélen, a mozgás merőleges része meglöki; a levél vége jobban leng, mint a töve
    var px = -1e4, py = -1e4;
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      var x = e.clientX, y = e.clientY, dx = x - px, dy = y - py, first = px < -1e3;
      px = x; py = y; if (first) return;
      dx = Math.max(-60, Math.min(60, dx)); dy = Math.max(-60, Math.min(60, dy));
      var hit = false;
      LV.cl.forEach(function (c) {
        if (!c.on) return;
        var r = c.el.getBoundingClientRect(), qx0 = x - r.left, qy0 = y - r.top, reach = 0;
        c.lv.forEach(function (o) { reach = Math.max(reach, o.len * c.k); });
        if (qx0 * qx0 + qy0 * qy0 > (reach + 90) * (reach + 90)) return;
        c.lv.forEach(function (o) {
          var ra = (o.r + o.a) * Math.PI / 180, ux = Math.sin(ra), uy = -Math.cos(ra), L = o.len * c.k;
          var t = Math.max(0, Math.min(L, qx0 * ux + qy0 * uy)), nx = qx0 - ux * t, ny = qy0 - uy * t, d = Math.sqrt(nx * nx + ny * ny), R = 26 + 34 * c.k;
          if (d > R) return;
          var f = (1 - d / R) * (.3 + .7 * t / L), push = dx * Math.cos(ra) + dy * Math.sin(ra);
          o.v += push * f * .16; hit = true;
        });
      });
      if (hit) kick();
    }, { passive: true });
    // görgetés: a levél vége lemarad a tartalom mögött, mintha a levegő fogná
    if (lenis) lenis.on('scroll', function (l) {
      var vel = Math.max(-40, Math.min(40, l.velocity || 0)); if (Math.abs(vel) < .5) return;
      var any = false;
      LV.cl.forEach(function (c) { if (!c.on) return; any = true; c.lv.forEach(function (o, i) { o.v += Math.sin(o.r * Math.PI / 180) * vel * (.010 + (i % 3) * .003); }); });
      if (any) kick();
    });
  }

