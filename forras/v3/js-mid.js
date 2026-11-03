  /* ------------------------------------------------------------------ budapesti idő (EU nyári időszámítás szabálya, Intl nélkül, mert lassú telefonon drága) */
  function lastSun(y, m) { var d = new Date(Date.UTC(y, m + 1, 0)); return d.getUTCDate() - d.getUTCDay(); }
  function bud() {
    var n = new Date(), y = n.getUTCFullYear();
    var s = Date.UTC(y, 2, lastSun(y, 2), 1), e = Date.UTC(y, 9, lastSun(y, 9), 1);
    var off = (n.getTime() >= s && n.getTime() < e) ? 2 : 1;
    var b = new Date(n.getTime() + off * 3600000);
    return { d: b.getUTCDay(), m: b.getUTCHours() * 60 + b.getUTCMinutes(), h: b.getUTCHours(), mi: b.getUTCMinutes(), t: n.getTime() };
  }
  function mins(s) { var p = s.split(':'); return +p[0] * 60 + +p[1]; }
  function hm(m) { m = Math.round(m); return Math.floor(m / 60) + ':' + ('0' + m % 60).slice(-2); }
  function renderLive() {
    var b = bud(), open = b.m >= 420 && b.m < 1320;
    $('#clock').textContent = hm(b.m);
    if (PAGE === 'pil') { $('#liveTxt').textContent = nextTxt || 'Avira Pilates'; return; }
    $('#live').classList.toggle('is-open', open);
    $('#liveTxt').textContent = open
      ? L(['Most nyitva, 22:00-ig', 'Jetzt geöffnet, bis 22:00', 'Open now, until 22:00'])
      : L(['Most zárva, ' + (b.m < 420 ? 'ma' : 'holnap') + ' 7:00-kor nyitunk', 'Jetzt geschlossen, öffnet ' + (b.m < 420 ? 'heute' : 'morgen') + ' um 7:00', 'Closed now, opens ' + (b.m < 420 ? 'today' : 'tomorrow') + ' at 7:00']);
    if (dialNow) placeNow(b.m);
  }

  /* ------------------------------------------------------------------ étlap, órarend, árak kirajzolása */
  var ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'], tabI = 0;
  var nextTxt = '';
  function renderTabs() {
    $('#tabs').innerHTML = MENU.map(function (g, i) { return '<button type="button" role="tab" id="tab' + i + '" aria-controls="menuList" aria-selected="' + (i === tabI) + '" tabindex="' + (i === tabI ? 0 : -1) + '"><i>' + ROM[i] + '</i>' + esc(L(g.k)) + '</button>'; }).join('');
  }
  function itemHtml(it) {
    var price = it[2] ? ft(it[2]) : L(it[4]);
    return '<div class="mi"><span class="mi__n">' + esc(L(it[0])) + (it[1] ? '<sup>' + it[1] + '</sup>' : '') + '</span><span class="mi__l"></span><span class="mi__p">' + price + '</span>' + (it[3] ? '<p class="mi__d">' + esc(L(it[3])) + '</p>' : '') + '</div>';
  }
  function renderMenu(animate) {
    var g = MENU[tabI], list = $('#menuList');
    list.setAttribute('aria-labelledby', 'tab' + tabI);
    list.innerHTML = '<h3 class="carte__cat">' + esc(L(g.k)) + '</h3>' + (g.note ? '<p class="carte__sub">' + esc(L(g.note)) + '</p>' : '') + g.items.map(itemHtml).join('');
    if (animate && !reduced) gsap.from([$('.carte__cat', list)].concat($$('.carte__sub, .mi', list).slice(0, 14)), { y: 16, opacity: 0, duration: .9, stagger: .035, ease: 'power3.out', clearProps: 'all' });
  }
  function renderAl() {
    var a = lang === 'de' ? AL_DE : lang === 'en' ? AL_EN : AL;
    $('#alList').textContent = a.map(function (x, i) { return (i + 1) + '. ' + x; }).join(' · ');
  }
  function renderWeek() {
    var b = bud(), before = b.t < START, nextK = null;
    var now = before ? { d: 1, m: -1 } : b;
    for (var add = 0; add < 8 && !nextK; add++) {
      var d = (now.d + add) % 7;
      WEEK.forEach(function (w) { if (nextK || w[0] !== d) return; w[1].forEach(function (s) { if (!nextK && (add > 0 || mins(s) > now.m)) nextK = d + '-' + s; }); });
    }
    $('#weekGrid').innerHTML = WEEK.map(function (w) {
      var today = !before && w[0] === b.d;
      return '<div class="day' + (today ? ' is-today' : '') + '"><h3>' + esc(L(DAYS[w[0]])) + (today ? '<small>' + L(['ma', 'heute', 'today']) + '</small>' : '') + '</h3><div class="slots">' +
        w[1].map(function (s) { return '<span class="slot' + (nextK === w[0] + '-' + s ? ' is-next' : '') + '"><b>' + s + '–' + hm(mins(s) + 50) + '</b><span>Funkcionális Reformer Pilates</span></span>'; }).join('') + '</div></div>';
    }).join('');
    var nk = nextK ? nextK.split('-') : null;
    var wn = $('#weekNext'); wn.innerHTML = nk ? (before ? L(['Az első óra: ', 'Die erste Stunde: ', 'First class: ']) + '<b>' + L(['november 9., hétfő ', 'Montag, 9. November, ', 'Monday 9 November, ']) + nk[1] + '</b>'
      : L(['A következő óra: ', 'Die nächste Stunde: ', 'Next class: ']) + '<b>' + esc(L(DAYS[+nk[0]])).toLowerCase().replace(/^./, function (c) { return lang === 'hu' ? c : c.toUpperCase(); }) + ' ' + nk[1] + '</b>') : '';
    nextTxt = wn.textContent;
  }
  function renderPrices() {
    $('#priceList').innerHTML = PRICES.map(function (p) {
      if (p[0] === 'sep') return '<li class="sep">' + esc(L(p[1])) + '</li>';
      return '<li class="' + (p[3] || '') + '"><span class="pn">' + esc(L(p[0])) + '</span><span class="pl"></span><span class="pv">' + ft(p[1]) + (p[4] ? ' ' + L(p[4]) : '') + '</span>' + (p[2] ? '<span class="pd">' + esc(L(p[2])) + '</span>' : '') + '</li>';
    }).join('');
  }

  /* ------------------------------------------------------------------ címek szavanként (kiélesedés), bevezető szavanként világosodik */
    function splitBl() {
    $$('.bl').forEach(function (h) {
      var tx = h.textContent.trim();
      h.setAttribute('aria-label', tx);
      h.innerHTML = tx.split(/ +/).map(function (w) { return '<span class="w" aria-hidden="true">' + esc(w) + '</span>'; }).join(' ');
    });
  }
  function blIn(h, delay) {
    h.classList.add('is-in');
    if (reduced) return;
    var d = desk();
    gsap.fromTo($$('.w', h), { opacity: 0, y: d ? 8 : 16, filter: d ? 'blur(12px)' : 'blur(0px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: d ? 1.7 : 1.1, stagger: .07, ease: d ? 'power2.out' : 'expo.out', delay: delay || 0, clearProps: 'filter,transform,opacity' });
  }
  var ledeWords = [], ledeP = 0;
  function splitLede() {
    var q = $('#ledeP'), tx = q.textContent.trim();
    q.setAttribute('aria-label', tx);
    q.innerHTML = tx.split(/ +/).map(function (w) { return '<span class="wd" aria-hidden="true">' + esc(w) + '</span>'; }).join(' ');
    ledeWords = $$('.wd', q);
  }
  function lightLede(p) {
    ledeP = p;
    var n = Math.round(p * ledeWords.length);
    ledeWords.forEach(function (w, i) { w.classList.toggle('on', reduced || i < n); });
  }

  /* ------------------------------------------------------------------ napóra: vékony számlap 6:00-tól 22:00-ig, a megtett út vonallal */
  var nap = $('#nap'), chs = nap ? $$('.ch', nap) : [], TT = chs.map(function (c) { return +c.getAttribute('data-t'); }), CC = chs.map(function (c) { return c.getAttribute('data-c'); });
  var NS = 'http://www.w3.org/2000/svg', dialDot = $('#dialDot'), dialNow = $('#dialNow'), dialT = $('#dialT'), dialN = $('#dialN'), dialArc = $('#dialArc'), nowT;
  var DR = 112;
  function ang(h) { return (-75 + 330 * (h - 6) / 16) * Math.PI / 180; }
  function svgEl(n, at) { var e = document.createElementNS(NS, n); for (var k in at) e.setAttribute(k, at[k]); return e; }
  function arcTo(h) {
    var a0 = ang(6), a1 = ang(Math.max(6.001, h)), large = (a1 - a0) > Math.PI ? 1 : 0;
    return 'M' + (Math.cos(a0) * DR).toFixed(2) + ' ' + (Math.sin(a0) * DR).toFixed(2) + 'A' + DR + ' ' + DR + ' 0 ' + large + ' 1 ' + (Math.cos(a1) * DR).toFixed(2) + ' ' + (Math.sin(a1) * DR).toFixed(2);
  }
  if (dialDot) (function () {
    var g = $('#dialTicks');
    for (var h = 6; h <= 22; h++) {
      var a = ang(h), c = Math.cos(a), s = Math.sin(a), ev = h % 2 === 0, r1 = ev ? 100 : 104;
      g.appendChild(svgEl('line', { x1: (c * r1).toFixed(1), y1: (s * r1).toFixed(1), x2: (c * (DR - 5)).toFixed(1), y2: (s * (DR - 5)).toFixed(1), 'class': 'dial__tick' }));
      if (ev) { var tx = svgEl('text', { x: (c * 132).toFixed(1), y: (s * 132).toFixed(1), 'class': 'dial__lab' }); tx.textContent = h; g.appendChild(tx); }
    }
    nowT = svgEl('text', { 'class': 'dial__nowT' }); g.appendChild(nowT);
  })();
  function placeNow(m) {
    var on = m >= 360 && m <= 1320;
    dialNow.style.display = nowT.style.display = on ? '' : 'none';
    if (!on) return;
    var a = ang(m / 60), cA = Math.cos(a);
    dialNow.setAttribute('cx', (cA * 150).toFixed(1)); dialNow.setAttribute('cy', (Math.sin(a) * 150).toFixed(1));
    nowT.setAttribute('x', (cA * 160).toFixed(1)); nowT.setAttribute('y', (Math.sin(a) * 158).toFixed(1)); nowT.style.textAnchor = cA > .3 ? 'start' : cA < -.3 ? 'end' : 'middle';
    nowT.textContent = L(['most', 'jetzt', 'now']);
  }

  /* ------------------------------------------------------------------ nyelv */
  function pickLang() {
    var s = null; try { s = localStorage.getItem('avira-lang'); } catch (e) {}
    if (s && LI[s] != null) return s;
    var n = (navigator.languages || [navigator.language || 'hu']);
    for (var i = 0; i < n.length; i++) { var c = String(n[i]).slice(0, 2).toLowerCase(); if (LI[c] != null) return c; }
    return 'en';
  }
  var ready = false, heroDone = false;
  function applyLang(l, save) {
    lang = l; html.lang = l;
    if (save) { try { localStorage.setItem('avira-lang', l); } catch (e) {} }
    $$('[data-i18n]').forEach(function (el) { var v = t(el.getAttribute('data-i18n')); if (el.textContent !== v) el.textContent = v; });
    $$('.ui__lang button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-lang') === l); });
    if ($('#tabs')) { renderTabs(); renderMenu(false); renderAl(); }
    if ($('#weekGrid')) { renderWeek(); renderPrices(); }
    renderLive();
    splitBl(); if ($('#ledeP')) { splitLede(); lightLede(ledeP); }
    if (window.ScrollTrigger && ready) ScrollTrigger.refresh();
  }
  applyLang(pickLang(), false);
  setInterval(renderLive, 15000);
  $$('.ui__lang button').forEach(function (b) { b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang'), true); }); });

  /* ------------------------------------------------------------------ étlap fülei */
  if ($('#tabs')) {
  $('#tabs').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var i = $$('#tabs button').indexOf(b); if (i === tabI) return;
    tabI = i; renderTabs(); renderMenu(true); $('#tab' + i).focus({ preventScroll: true });
  });
  $('#tabs').addEventListener('keydown', function (e) {
    var k = e.key, f = k === 'ArrowDown' || k === 'ArrowRight', bk = k === 'ArrowUp' || k === 'ArrowLeft';
    if (!f && !bk) return;
    e.preventDefault(); tabI = (tabI + (f ? 1 : MENU.length - 1)) % MENU.length;
    renderTabs(); renderMenu(true); $('#tab' + tabI).focus({ preventScroll: true });
  });
  }
  function toggler(btn, box) { btn.addEventListener('click', function () { var o = box.hidden; box.hidden = !o; btn.setAttribute('aria-expanded', o); if (ready) ScrollTrigger.refresh(); }); }
  if ($('#alBtn')) toggler($('#alBtn'), $('#alList')); toggler($('#privBtn'), $('#priv'));

  /* ------------------------------------------------------------------ nyitókép */
  function heroIn() {
    if (heroDone) return; heroDone = true;
    blIn($('#heroTitle'), .05);
    if (reduced) return;
    gsap.from($$('.hero__kick, .hero__addr, .hero__go .go'), { y: 20, opacity: 0, duration: 1.4, stagger: .1, ease: 'expo.out', delay: .45, clearProps: 'transform,opacity' });
    if (!html.classList.contains('intro-on')) gsap.fromTo('.hero__stack img', { scale: 1.12 }, { scale: 1.04, duration: 2.8, ease: 'expo.out' });
  }

