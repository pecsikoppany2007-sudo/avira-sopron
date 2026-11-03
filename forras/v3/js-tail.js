  /* ------------------------------------------------------------------ puha görgetés egérrel */
  var lenis = null;
  if (canHover && !reduced && window.Lenis) {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    window.__lenis = lenis;
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || a.classList.contains('skip')) return;
      var id = a.getAttribute('href'), el = id === '#top' ? 0 : document.getElementById(id.slice(1));
      if (el === null) return;
      e.preventDefault();
      if (el === 0) { lenis.scrollTo(0, { duration: 1.8 }); return; }
      var h = el.querySelector('h2, h3');
      lenis.scrollTo(h || el, { offset: h ? -130 : 0, duration: 1.8 });
    });
  }

  /* ------------------------------------------------------------------ oldalváltás: panel fut fel a cél logójával, az új oldalon felfelé kifut */
  var pt = $('#pt');
  function leave(href, to) {
    try { sessionStorage.setItem('avira-pt', PAGE); } catch (e) {}
    if (reduced || !pt) { location.href = href; return; }
    pt.className = 'pt to-' + to;
    gsap.killTweensOf([pt, $('.pt__in', pt)]);
    gsap.set(pt, { visibility: 'visible' });
    gsap.fromTo(pt, { yPercent: 100 }, { yPercent: 0, duration: .9, ease: 'expo.inOut', onComplete: function () { location.href = href; } });
    gsap.fromTo($('.pt__in', pt), { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: .35 });
    if (lenis) lenis.stop();
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-page]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
    var to = a.getAttribute('data-page'), href = a.getAttribute('href');
    e.preventDefault();
    if (to === PAGE) { if (lenis) lenis.scrollTo(0, { duration: 1.6 }); else scrollTo(0, 0); return; }
    leave(href, to);
  });
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted || !pt) return;
    gsap.killTweensOf([pt, $('.pt__in', pt)]); gsap.set([pt, $('.pt__in', pt)], { clearProps: 'all' }); pt.className = 'pt';
    if (lenis) lenis.start();
  });

  /* ------------------------------------------------------------------ teljes képernyős menü: kör alakban nyílik a gomb felől */
  var menu = $('#menu'), mBtn = $('#menuBtn'), mOpen = false, mainEl = $('#main'), footEl = $('#foot');
  var mLinks = $$('.menu__nav a', menu), phs = $$('.menu__ph img', menu), phI = 0, phCur = phs[0].getAttribute('src');
  phs[0].style.opacity = 1; phs[1].style.opacity = 0;
  function mOrigin() { var r = mBtn.getBoundingClientRect(); return Math.round(r.left + r.width - 13) + 'px ' + Math.round(r.top + r.height / 2) + 'px'; }
  function openMenu() {
    if (mOpen) return; mOpen = true;
    gsap.killTweensOf(menu);
    menu.hidden = false; html.classList.add('menu-open'); mBtn.setAttribute('aria-expanded', 'true');
    mainEl.inert = footEl.inert = true;
    if (lenis) lenis.stop();
    tone();
    if (!reduced) {
      var o = mOrigin(), R = Math.ceil(Math.hypot(innerWidth, innerHeight));
      gsap.fromTo(menu, { clipPath: 'circle(0px at ' + o + ')' }, { clipPath: 'circle(' + R + 'px at ' + o + ')', duration: 1.1, ease: 'expo.inOut', onComplete: function () { menu.style.clipPath = ''; } });
      gsap.fromTo(mLinks, { y: 46, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3, stagger: .055, ease: 'expo.out', delay: .4, clearProps: 'transform,opacity' });
      gsap.fromTo('.menu__ph, .menu__foot', { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out', delay: .6, clearProps: 'opacity' });
    }
    setTimeout(function () { if (mOpen) mLinks[0].focus({ preventScroll: true }); }, 60);
  }
  function closeMenu(focusBtn, keepStopped) {
    if (!mOpen) return; mOpen = false;
    gsap.killTweensOf(menu);
    html.classList.remove('menu-open'); mBtn.setAttribute('aria-expanded', 'false');
    mainEl.inert = footEl.inert = false;
    if (lenis && !keepStopped) lenis.start();
    tone();
    if (reduced || keepStopped) menu.hidden = true;
    else gsap.to(menu, { clipPath: 'circle(0px at ' + mOrigin() + ')', duration: .8, ease: 'expo.inOut', onComplete: function () { menu.hidden = true; menu.style.clipPath = ''; } });
    if (focusBtn) mBtn.focus({ preventScroll: true });
  }
  mBtn.addEventListener('click', function () { mOpen ? closeMenu(false) : openMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mOpen) closeMenu(true); });
  mLinks.forEach(function (a) {
    a.addEventListener('click', function () { var x = a.hasAttribute('data-page'); if (x) setTimeout(function () { closeMenu(false, true); }, 950); else closeMenu(false); });
    a.addEventListener('mouseenter', function () {
      var n = a.getAttribute('data-ph'); if (!n || n === phCur) return; phCur = n;
      var nx = phs[1 - phI], cu = phs[phI], done = false;
      var go = function () {
        if (done || phCur !== n) return; done = true;
        nx.style.opacity = 1; nx.style.transform = 'scale(1)'; cu.style.opacity = 0; cu.style.transform = 'scale(1.06)'; phI = 1 - phI;
      };
      nx.onload = go; nx.src = n;
      if (nx.complete && nx.naturalWidth) go();
    });
  });
  if (canHover) (window.requestIdleCallback || setTimeout)(function () { mLinks.forEach(function (a) { var i = new Image(); i.src = a.getAttribute('data-ph'); }); });

  /* ------------------------------------------------------------------ sarokfeliratok színe: világos a sötét szakaszok fölött */
  var darkEls = $$('[data-tone="dark"]'), darkCh = $$('.ch--dark'), sky = false, night = false, tTop = null, tBot = null;
  function under(y) {
    var list = darkEls.concat(sky ? (night ? [nap] : []) : darkCh);
    for (var i = 0; i < list.length; i++) { var r = list[i].getBoundingClientRect(); if (r.top <= y && r.bottom > y) return true; }
    return false;
  }
  function tone() {
    var a = mOpen || under(44), b = mOpen || under(innerHeight - 24);
    if (a !== tTop) { tTop = a; html.classList.toggle('tone-dark', a); }
    if (b !== tBot) { tBot = b; html.classList.toggle('tone-dark-b', b); }
  }
  // a felső sáv lefelé görgetve elbújik, felfelé görgetve visszajön, a nyitókép után háttérrel
  var toneQ = false, lastY = scrollY, uiHide = false, uiSolid = null, heroH = $('#top').offsetHeight;
  function uiState() {
    var y = scrollY, dy = y - lastY, hide = uiHide;
    if (y < 140 || mOpen) hide = false; else if (dy > 6) hide = true; else if (dy < -6) hide = false;
    if (Math.abs(dy) > 6 || y < 140) lastY = y;
    if (hide !== uiHide) { uiHide = hide; html.classList.toggle('ui-hide', hide); }
    var so = y > heroH - 90; if (so !== uiSolid) { uiSolid = so; html.classList.toggle('ui-solid', so); }
  }
  window.addEventListener('scroll', function () { if (!toneQ) { toneQ = true; requestAnimationFrame(function () { toneQ = false; tone(); uiState(); }); } }, { passive: true });
  window.addEventListener('resize', function () { heroH = $('#top').offsetHeight; });

  /* ------------------------------------------------------------------ nyitány: a logó kirajzolódik, egy kis ablakban képek villannak, az utolsó kitágul a nyitóképpé */
  function introRun() {
    var intro = $('#intro');
    try { sessionStorage.setItem('avira-intro', '1'); } catch (e) {}
    if (lenis) lenis.stop();
    var logo = $('.intro__logo'), win = $('.intro__win'), wimgs = $$('img', win), hero = $('.intro__hero'), himg = $('img', hero);
    var fin = false, tl = null;
    var done = function () {
      if (fin) return; fin = true;
      html.classList.remove('intro-on');
      if (lenis) lenis.start();
      ScrollTrigger.refresh(); tone();
    };
    var dec = function (im) { return im.decode ? im.decode().catch(function () {}) : 0; };
    var wait = new Promise(function (res) { setTimeout(res, 1400); });
    Promise.race([Promise.all([document.fonts ? document.fonts.ready : 0, dec(himg)].concat(wimgs.map(dec))), wait]).then(function () {
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        var r = win.getBoundingClientRect();
        var from = 'inset(' + r.top.toFixed(1) + 'px ' + (innerWidth - r.right).toFixed(1) + 'px ' + (innerHeight - r.bottom).toFixed(1) + 'px ' + r.left.toFixed(1) + 'px)';
        var F = .16, t0 = 1.95;
        tl = gsap.timeline({ onComplete: done });
        tl.to('.intro__ring', { '--a': '360deg', duration: 1.3, ease: 'power2.inOut' }, 0)
          .fromTo('.intro__bean', { opacity: 0, scale: .6, y: 12 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'expo.out' }, .35)
          .fromTo('.intro__l', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' }, .5)
          .fromTo('.intro__sub', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .9, ease: 'power2.out' }, .8)
          .to(logo, { opacity: 0, scale: .92, duration: .45, ease: 'power2.in' }, 1.6)
          .set(win, { visibility: 'visible' }, t0)
          .fromTo(win, { scale: .82 }, { scale: 1, duration: .8, ease: 'expo.out' }, t0);
        wimgs.forEach(function (im, i) { tl.set(im, { opacity: 1 }, t0 + i * F); });
        var t1 = t0 + wimgs.length * F;
        tl.set(hero, { visibility: 'visible', clipPath: from }, t1)
          .to(hero, { clipPath: 'inset(0px 0px 0px 0px)', duration: 1.35, ease: 'expo.inOut' }, t1 + .05)
          .fromTo(himg, { scale: 1.32 }, { scale: 1.04, duration: 1.35, ease: 'expo.inOut' }, t1 + .05)
          .to(hero, { '--sh': 1, duration: 1, ease: 'power2.inOut' }, t1 + .3)
          .call(heroIn, null, t1 + .75);
        var skip = function () { if (!fin) { tl.progress(1); done(); heroIn(); } };
        ['wheel', 'touchstart', 'click'].forEach(function (ev) { intro.addEventListener(ev, skip, { passive: true }); });
        window.addEventListener('keydown', skip, { once: true });
      }); });
    });
  }
  function arrive() {
    if (lenis) lenis.stop();
    var im = $('.hero__img'), went = false;
    var go = function () {
      if (went) return; went = true;
      if (lenis) lenis.start();
      gsap.to($('.pt__in', pt), { y: -50, opacity: 0, duration: .55, ease: 'power2.in' });
      gsap.fromTo(pt, { yPercent: 0 }, { yPercent: -100, duration: 1.05, ease: 'expo.inOut', delay: .12, onComplete: function () { html.classList.remove('pt-in'); gsap.set([pt, $('.pt__in', pt)], { clearProps: 'all' }); } });
      setTimeout(heroIn, 520);
    };
    setTimeout(go, 1200);
    Promise.resolve(im && im.decode ? im.decode().catch(function () {}) : 0).then(function () { requestAnimationFrame(go); });
  }
  if (html.classList.contains('intro-on') && $('#intro')) introRun();
  else if (html.classList.contains('pt-in') && pt) arrive();
  else heroIn();

  /* ------------------------------------------------------------------ előtűnések */
  function io(els, fn, margin) {
    if (!('IntersectionObserver' in window)) { els.forEach(fn); return; }
    var o = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { o.unobserve(e.target); fn(e.target); } }); }, { rootMargin: margin || '0px 0px -14% 0px' });
    els.forEach(function (el) { o.observe(el); });
  }
  $$('.nap__head p, .ch__tx, .carte__side > p, .studio__txt p, .coach__q, .coach__who, .week__head p, .fees__p, .week__book, .night__dl, .night__btns, .rev__t, .xpage, .tease__s, .tease .go, .foot__addr, .foot__small').forEach(function (el) { el.classList.add('rv'); });
  $$('.ch__ph, .studio__ph, .coach__ph, .rev__ph').forEach(function (el) { el.classList.add('rvi'); });
  if (reduced) { $$('.rv, .rvi, .bl').forEach(function (el) { el.classList.add('is-in'); }); }
  else {
    io($$('.rv, .rvi'), function (el) { el.classList.add('is-in'); });
    io($$('.bl').filter(function (h) { return h.id !== 'heroTitle'; }), function (h) { blIn(h, 0); }, '0px 0px -12% 0px');
    if ($('.pair')) gsap.from('.pair__i, .pair__amp', { scrollTrigger: { trigger: '.pair', start: 'top 86%' }, y: 46, opacity: 0, duration: 1.5, stagger: .12, ease: 'expo.out', clearProps: 'transform,opacity' });
    if ($('#weekGrid')) {
      gsap.from('#weekGrid .day', { scrollTrigger: { trigger: '#weekGrid', start: 'top 84%' }, y: 36, opacity: 0, duration: 1.3, stagger: .08, ease: 'expo.out', clearProps: 'transform,opacity' });
      gsap.from('#priceList li', { scrollTrigger: { trigger: '#priceList', start: 'top 84%' }, y: 18, opacity: 0, duration: 1.2, stagger: .05, ease: 'expo.out', clearProps: 'transform,opacity' });
    }
    if ($('.tease__lg')) gsap.from('.tease__lg', { scrollTrigger: { trigger: '.tease', start: 'top 62%' }, scale: .7, opacity: 0, duration: 1.8, ease: 'expo.out' });
    gsap.fromTo('.foot__ring', { '--a': '0deg' }, { '--a': '360deg', duration: 2.6, ease: 'power2.inOut', scrollTrigger: { trigger: '#foot', start: 'top 80%' } });
    gsap.from('.foot__m--p', { scrollTrigger: { trigger: '#foot', start: 'top 80%' }, y: 30, opacity: 0, duration: 1.6, delay: .3, ease: 'expo.out', clearProps: 'transform,opacity' });
  }
  if ($('#ledeP')) {
    if (reduced) lightLede(1);
    else if (canHover) ScrollTrigger.create({ trigger: '#ledeP', start: 'top 82%', end: 'bottom 42%', onUpdate: function (st) { lightLede(st.progress); } });
    else io([$('#ledeP')], function () { var o = { p: 0 }; gsap.to(o, { p: 1, duration: 2.8, ease: 'none', onUpdate: function () { lightLede(o.p); } }); }, '0px 0px -22% 0px');
  }
  initLeaves();

  // egérrel: a nyitókép lassabban gördül el, a pilates kép a keretében úszik
  if (desk()) {
    gsap.to('.hero__stack', { yPercent: 16, ease: 'none', scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true } });
    if ($('.tease')) gsap.fromTo('.tease__ph img', { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: { trigger: '.tease', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* ------------------------------------------------------------------ egy nap: a háttér fénye hajnaltól éjszakáig változik, a napórán a pont halad, mögötte vonal */
  if (nap) (function () {
    var bg = $('.nap__bg'), layers = [], cs = [], F = { cur: 0, tgt: 0, run: false }, lastTxt = '', lastN = '', lastOp = [], lastArc = '';
    CC.forEach(function (c) { var i = document.createElement('i'); i.style.background = c; layers.push(i); lastOp.push(-1); });
    chs.forEach(function (c, k) { c.style.setProperty('--c', CC[k]); });
    function measure() {
      var y = scrollY, head = $('.nap__head', nap), hr = head.getBoundingClientRect();
      cs = [hr.top + y + hr.height / 2].concat(chs.map(function (c) { var r = c.getBoundingClientRect(); return r.top + y + r.height / 2; }));
    }
    function target() {
      var vc = scrollY + innerHeight / 2, n = cs.length - 1;
      if (vc <= cs[0]) return 0;
      if (vc >= cs[n]) return n;
      for (var i = 0; i < n; i++) if (vc < cs[i + 1]) return i + (vc - cs[i]) / (cs[i + 1] - cs[i]);
      return n;
    }
    function apply(f) {
      for (var k = 0; k < layers.length; k++) {
        var o = Math.min(1, Math.max(0, (f - k - .5) * (k === 6 ? 5 : 2.6) + .5)); o = o * o * (3 - 2 * o); o = Math.round(o * 500) / 500;
        if (o !== lastOp[k]) { lastOp[k] = o; layers[k].style.opacity = o; }
      }
      var ci = Math.max(0, f - 1), i0 = Math.min(TT.length - 1, Math.floor(ci)), i1 = Math.min(TT.length - 1, i0 + 1);
      var h = TT[i0] + (TT[i1] - TT[i0]) * (ci - i0), a = ang(h);
      dialDot.setAttribute('cx', (Math.cos(a) * DR).toFixed(2)); dialDot.setAttribute('cy', (Math.sin(a) * DR).toFixed(2));
      var d = arcTo(h); if (d !== lastArc) { lastArc = d; dialArc.setAttribute('d', d); }
      var txt = hm(Math.round(h * 12) * 5); if (txt !== lastTxt) { lastTxt = txt; dialT.textContent = txt; }
      var nn = '0' + (Math.min(TT.length - 1, Math.round(ci)) + 1) + ' / 0' + TT.length; if (nn !== lastN) { lastN = nn; dialN.textContent = nn; }
      var nt = f >= 6.5; if (nt !== night) { night = nt; nap.classList.toggle('is-night', nt); tone(); }
    }
    function tick() {
      var d = F.tgt - F.cur;
      if (Math.abs(d) < .001) { F.cur = F.tgt; apply(F.cur); F.run = false; gsap.ticker.remove(tick); return; }
      F.cur += d * (1 - Math.exp(-gsap.ticker.deltaRatio() * 16.7 / 110)); apply(F.cur);
    }
    function setMode() {
      var want = desk();
      if (want !== sky) {
        sky = want;
        nap.classList.toggle('has-sky', sky); nap.classList.toggle('is-flat', !sky);
        layers.forEach(function (l) { if (sky) bg.appendChild(l); else if (l.parentNode) l.parentNode.removeChild(l); });
        if (!sky && night) { night = false; nap.classList.remove('is-night'); }
        lastOp = lastOp.map(function () { return -1; });
      }
    }
    setMode();
    ScrollTrigger.addEventListener('refreshInit', setMode);
    ScrollTrigger.addEventListener('refresh', function () { if (sky) { measure(); F.cur = F.tgt = target(); apply(F.cur); } tone(); });
    ScrollTrigger.create({ trigger: nap, start: 'top bottom', end: 'bottom top', onUpdate: function () {
      if (!sky) return;
      F.tgt = target(); if (!F.run) { F.run = true; gsap.ticker.add(tick); }
    } });
    if (!reduced && !canHover) io(chs.map(function (c) { return $('.ch__time', c); }), function (el) { gsap.from(el, { opacity: 0, x: -14, duration: 1.2, ease: 'expo.out' }); });
  })();

  /* ------------------------------------------------------------------ kurzor: kis pont, linkek fölött vékony kör (csak egérrel) */
  if (canHover) {
    var cur = document.createElement('div');
    cur.className = 'cursor'; cur.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cur);
    var tx = -100, ty = -100, cx = -100, cy = -100, craf = 0, seen = false, k = reduced ? 1 : .2;
    var cloop = function () {
      cx += (tx - cx) * k; cy += (ty - cy) * k;
      cur.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
      craf = (Math.abs(tx - cx) + Math.abs(ty - cy) > .15) ? requestAnimationFrame(cloop) : 0;
    };
    var kick = function () { if (!craf) craf = requestAnimationFrame(cloop); };
    document.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!seen) { seen = true; cx = tx; cy = ty; html.classList.add('has-cursor'); cur.classList.add('is-on'); }
      kick();
    }, { passive: true });
    document.addEventListener('mouseover', function (e) {
      var el = e.target; if (!el.closest) return;
      var link = !!el.closest('a, button, [role="tab"]'), photo = !link && !!el.closest('.ch__ph, .studio__ph, .coach__ph, .rev__ph, .pair__ph, .menu__ph');
      var dark = !!el.closest('[data-tone="dark"], .ch--dark, .menu') || (night && !!el.closest('.nap'));
      cur.classList.toggle('is-link', link); cur.classList.toggle('is-photo', photo); cur.classList.toggle('is-dark', dark);
    });
    html.addEventListener('mouseleave', function () { cur.classList.remove('is-on'); });
    html.addEventListener('mouseenter', function () { if (seen) cur.classList.add('is-on'); });
  }

  /* ------------------------------------------------------------------ újramérés */
  var lastW = innerWidth, lastH = innerHeight;
  ScrollTrigger.config({ ignoreMobileResize: true });
  window.addEventListener('resize', function () { if (innerWidth !== lastW || Math.abs(innerHeight - lastH) > 160) { lastW = innerWidth; lastH = innerHeight; ScrollTrigger.refresh(); } });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  ready = true;
  ScrollTrigger.refresh();
  tone();
  window.__aviraReady = true;
})();
