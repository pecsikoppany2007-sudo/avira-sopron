/* Avira Move & Relax – bemutató oldal (v3, két oldal: kávézó és pilates). GSAP + ScrollTrigger; egérrel Lenis (lassabb, puhább görgetés), érintőn natív görgetés, ott semmi nem követi az ujjat. */
(function () {
  'use strict';
  var html = document.documentElement;
  if (!window.gsap || !window.ScrollTrigger) { html.classList.remove('intro-on', 'pt-in', 'js'); return; }
  html.classList.add('intro-run', 'pt-run');
  var PAGE = html.getAttribute('data-page');
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ autoRound: false });

  var canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hwGpu = (function () {
    try {
      var c = document.createElement('canvas'), g = c.getContext('webgl');
      if (!g) return false;
      var ext = g.getExtension('WEBGL_debug_renderer_info');
      var r = ext ? String(g.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : '';
      var lose = g.getExtension('WEBGL_lose_context'); if (lose) lose.loseContext();
      return !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(r);
    } catch (e) { return false; }
  })();
  if (hwGpu) html.classList.add('grain');
  var desk = function () { return canHover && !reduced && innerWidth >= 1024; };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  /* ------------------------------------------------------------------ szövegek (a magyar a HTML-ben van) */
  var T = {
    de: {
      'skip': 'Zum Inhalt',
      'ui.menu': 'Menü', 'hero.pil': 'Avira Pilates', 'tease.s': 'Reformer-Pilates-Studio im selben Gebäude, ab 9. November', 'tease.go': 'Zum Studio',
      'navp.studio': 'Das Studio', 'navp.coach': 'Die Trainerin', 'navp.time': 'Stundenplan', 'navp.price': 'Preise', 'navp.foot': 'im selben Gebäude wie das Avira Café',
      'phero.s': 'Reformer-Pilates-Studio in Sopron, ab 9. November', 'phero.addr': 'Táncsics u. 68., im selben Gebäude wie das Avira Café und das GYMTronic',
      'pcontact.h': 'Montag bis Freitag, laut Stundenplan', 'pcontact.k': 'Nach dem Training', 'pcontact.p': 'Im selben Gebäude: Kaffee, Smoothies, Proteinshakes, mit GYMTronic-Abo 10 % günstiger.',
      'nav.about': 'Das Avira', 'nav.day': 'Ein Tag bei uns', 'nav.menu': 'Speisekarte', 'nav.pilates': 'Pilates-Studio', 'nav.time': 'Stundenplan und Preise', 'nav.contact': 'Kontakt', 'nav.pil': 'Avira Pilates',
      'hero.title': 'Café und Reformer-Pilates in Sopron', 'hero.addr': 'Táncsics u. 68., im alten Eisenwarenhaus, neben dem GYMTronic', 'hero.menu': 'Speisekarte', 'hero.time': 'Pilates-Stundenplan',
      'lede.p': 'Das Avira hat im alten Eisenwarenhaus eröffnet, im selben Gebäude wie das Fitnessstudio GYMTronic. Das Café ist täglich von 7 bis 22 Uhr geöffnet, im Reformer-Pilates-Studio gibt es ab dem 9. November Stunden.',
      'pair.cafe': 'Kaffee, Brunch, Cocktails', 'pair.pil': 'Reformer-Pilates',
      'nap.title': 'Ein Tag im Avira', 'nap.p': 'Von 6 Uhr morgens bis 22 Uhr, nach Stundenplan und Speisekarte.',
      'ch1.h': 'Die erste Stunde', 'ch1.p': 'Mittwochs beginnt die erste Reformer-Pilates-Stunde schon um 6 Uhr. Im Studio stehen vier neue Align-Reformer vor den großen Fenstern.',
      'ch2.h': 'Wir öffnen', 'ch2.p': 'Das Café öffnet täglich um 7 Uhr. Wir brühen italienischen Kaffee von Caffè Vergnano 1882, auch mit Mandel-, Hafer- oder Kokosdrink.',
      'ch3.t': 'Vormittags', 'ch3.p': 'Eggs Benedict auf Brioche, Burrata mit Sauerteigbrot, Croque Madame mit Spiegelei, Pancakes mit Waldbeeren.',
      'ch4.t': 'Tagsüber', 'ch4.h': 'Pinsa, Platten, Salat', 'ch4.p': 'Fünf Sorten Pinsa, Käseplatte, kalte Platte und Salate. Hunde sind willkommen, bring deinen gerne mit.',
      'ch5.h': 'Nachmittagsstunde, danach ein Smoothie', 'ch5.p': 'Freitags um 15:00 und montags um 16:00 und 17:00 gibt es Stunden. Danach Smoothie oder Proteinshake im Café, mit GYMTronic-Abo 10 % günstiger.',
      'ch6.h': 'Abendstunde', 'ch6.p': 'Dienstags um 18:00 und donnerstags um 19:00 sind die Abendstunden, nach der Arbeit.',
      'ch7.t': 'Abends', 'ch7.h': 'Cocktails', 'ch7.p': 'Hugo, Aperol und Limoncello Spritz, Espresso Martini, Negroni und drei Gin Tonics mit Thomas Henry Tonic. Virgin Mojito und alkoholfreien Gin Tonic gibt es auch.',
      'ch8.h': 'Wir schließen', 'ch8.p': 'Um 22 Uhr schließen wir, um 7 Uhr morgens öffnen wir wieder.',
      'menu.title': 'Speisekarte', 'menu.lede': 'Preise in Forint, inklusive Mehrwertsteuer.',
      'menu.al': 'Die Zahlen kennzeichnen Allergene:', 'menu.alBtn': 'was bedeuten sie?', 'menu.more': 'Bier, Wein, Spirituosen und Softdrinks auf der vollständigen Karte:', 'menu.pdf': 'Speise- und Getränkekarte (PDF, ungarisch)',
      'pil.title': 'Reformer-Pilates-Studio', 'pil.p1': 'Im Studio stehen 4 neue Align-Reformer. Ihr seid also wenige in einer Stunde, und die Trainerin kann auf jede und jeden achten.',
      'pil.p2': 'Jede Stunde dauert 50 Minuten, Funktionelles Reformer-Pilates. Neben Gruppenstunden geben wir auch Einzel- und Paarstunden.',
      'coach.role': 'Physiotherapeutin, Reformer-Pilates-Trainerin', 'coach.q': '„Als Physiotherapeutin sind mir bewusste, kontrollierte Bewegung und die richtige Ausführung der Übungen wichtig. Mein Ziel ist, dass du in den Stunden nicht nur stärker wirst, sondern auch körperlich und seelisch auftankst.”',
      'week.title': 'Stundenplan', 'week.p': 'Ab 9. November, Montag bis Freitag. Jede Stunde dauert 50 Minuten, Funktionelles Reformer-Pilates.',
      'week.book': 'Die Online-Buchung startet bald. Bis dahin schreib uns auf Instagram oder frag im Café.', 'week.ig': 'Auf Instagram schreiben',
      'price.title': 'Preise', 'price.p': 'Die erste Stunde kostet 3 000 Ft. Danach kommst du mit Einzelticket oder Mehrfachkarte.',
      'contact.title': 'Kontakt', 'contact.addr': 'Adresse', 'contact.addr2': 'im alten Eisenwarenhaus, neben dem GYMTronic', 'contact.cafe': 'Avira Café', 'contact.cafeH': 'Montag bis Sonntag 7:00–22:00', 'contact.pil': 'Avira Pilates', 'contact.pilH': 'laut Stundenplan', 'contact.tel': 'Telefon', 'contact.route': 'Route planen', 'contact.call': 'Anrufen',
      'rev.t': 'Wir haben gerade eröffnet, deshalb gibt es noch keine Google-Bewertungen. Warst du schon bei uns? Schreib, wie es war.', 'rev.btn': 'Auf Google bewerten',
      'foot.company': 'Betreiber: Hajnal Bolt Kft. · Geschäftsführer: László Meszlényi', 'foot.photos': 'Fotos: Avira Move & Relax', 'foot.priv': 'Datenschutz', 'foot.privT': 'Diese Seite verwendet keine Cookies und sammelt keine personenbezogenen Daten. Die gewählte Sprache merkt sich dein Browser.', 'foot.demo': 'Demoseite, nicht die offizielle Website von Avira.', 'foot.made': 'Gestaltet von kettő'
    },
    en: {
      'skip': 'Skip to content',
      'ui.menu': 'Menu', 'hero.pil': 'Avira Pilates', 'tease.s': 'Reformer Pilates studio in the same building, from 9 November', 'tease.go': 'Visit the studio',
      'navp.studio': 'The studio', 'navp.coach': 'The instructor', 'navp.time': 'Timetable', 'navp.price': 'Prices', 'navp.foot': 'in the same building as Avira Café',
      'phero.s': 'Reformer Pilates studio in Sopron, from 9 November', 'phero.addr': 'Táncsics u. 68., in the same building as Avira Café and GYMTronic',
      'pcontact.h': 'Monday to Friday, see the timetable', 'pcontact.k': 'After class', 'pcontact.p': 'In the same building: coffee, smoothies, protein shakes, 10% off with a GYMTronic pass.',
      'nav.about': 'About Avira', 'nav.day': 'A day with us', 'nav.menu': 'Menu', 'nav.pilates': 'Pilates studio', 'nav.time': 'Timetable and prices', 'nav.contact': 'Contact',
      'hero.title': 'Café and reformer Pilates in Sopron', 'hero.addr': 'Táncsics u. 68., in the old hardware store, next to GYMTronic', 'hero.menu': 'Menu', 'hero.time': 'Pilates timetable',
      'lede.p': 'Avira opened in the old hardware store, in the same building as the GYMTronic gym. The café is open every day from 7 am to 10 pm, and reformer Pilates classes start in the studio on 9 November.',
      'pair.cafe': 'Coffee, brunch, cocktails', 'pair.pil': 'Reformer Pilates',
      'nap.title': 'A day at Avira', 'nap.p': 'From 6 am to 10 pm, going by the timetable and the menu.',
      'ch1.h': 'The first class', 'ch1.p': 'On Wednesdays the first reformer Pilates class starts at 6 am. Four brand-new Align reformers stand in front of the big studio windows.',
      'ch2.h': 'We open', 'ch2.p': 'The café opens at 7 every day. We brew Italian coffee from Caffè Vergnano 1882, also with almond, oat or coconut milk.',
      'ch3.t': 'Late morning', 'ch3.p': 'Eggs Benedict on brioche, burrata with sourdough, Croque Madame with a fried egg, pancakes with forest fruit.',
      'ch4.t': 'During the day', 'ch4.h': 'Pinsa, boards, salads', 'ch4.p': 'Five kinds of pinsa, cheese and cold cuts boards, and salads. Dogs are welcome, so bring yours along.',
      'ch5.h': 'Afternoon class, then a smoothie', 'ch5.p': 'There are classes on Friday at 15:00 and on Monday at 16:00 and 17:00. Afterwards a smoothie or protein shake in the café, 10% off with a GYMTronic pass.',
      'ch6.h': 'Evening class', 'ch6.p': 'The evening classes are on Tuesday at 18:00 and Thursday at 19:00, after work.',
      'ch7.t': 'Evening', 'ch7.h': 'Cocktails', 'ch7.p': 'Hugo, Aperol and Limoncello Spritz, Espresso Martini, Negroni and three gin and tonics with Thomas Henry tonic. There is a Virgin Mojito and an alcohol-free gin and tonic too.',
      'ch8.h': 'Closing', 'ch8.p': 'We close at 10 pm and open again at 7 am.',
      'menu.title': 'Menu', 'menu.lede': 'Prices in forints, VAT included.',
      'menu.al': 'The numbers mark allergens:', 'menu.alBtn': 'what do they mean?', 'menu.more': 'Beer, wine, spirits and soft drinks are on the full list:', 'menu.pdf': 'food and drinks menu (PDF, Hungarian)',
      'pil.title': 'Reformer Pilates studio', 'pil.p1': 'The studio has 4 brand-new Align reformers, so classes stay small and the instructor can watch everyone.',
      'pil.p2': 'Every class is a 50-minute Functional Reformer Pilates session. Besides group classes we also teach private and duo sessions.',
      'coach.role': 'physiotherapist, reformer Pilates instructor', 'coach.q': '“As a physiotherapist, mindful, controlled movement and doing each exercise correctly matter to me. My goal is that you don’t just get stronger in class, but recharge in body and mind.”',
      'week.title': 'Timetable', 'week.p': 'From 9 November, Monday to Friday. Every class is 50 minutes of Functional Reformer Pilates.',
      'week.book': 'Online booking opens soon. Until then, message us on Instagram or ask in the café.', 'week.ig': 'Message us on Instagram',
      'price.title': 'Prices', 'price.p': 'Your first class is 3,000 Ft. After that, come with a single ticket or a pass.',
      'contact.title': 'Contact', 'contact.addr': 'Address', 'contact.addr2': 'in the old hardware store, next to GYMTronic', 'contact.cafe': 'Avira Café', 'contact.cafeH': 'Monday to Sunday 7:00–22:00', 'contact.pil': 'Avira Pilates', 'contact.pilH': 'see the timetable', 'contact.tel': 'Phone', 'contact.route': 'Get directions', 'contact.call': 'Call',
      'rev.t': 'We have only just opened, so there are no Google reviews yet. If you have been in, tell us how it was.', 'rev.btn': 'Write a Google review',
      'foot.company': 'Operated by Hajnal Bolt Kft. · Manager: László Meszlényi', 'foot.photos': 'Photos: Avira Move & Relax', 'foot.priv': 'Privacy', 'foot.privT': 'This site uses no cookies and collects no personal data. Your browser remembers the language you chose.', 'foot.demo': 'Demo site, not the official Avira website.', 'foot.made': 'Made by kettő'
    }
  };
  var huText = {};
  $$('[data-i18n]').forEach(function (el) { huText[el.getAttribute('data-i18n')] = el.textContent; });
  var lang = 'hu', LI = { hu: 0, de: 1, en: 2 };
  function nb(s) { return lang === 'hu' ? String(s).replace(/(^|[\s(„])(a|az|A|Az|és) /g, '$1$2 ') : s; }
  function t(k) { var d = T[lang] || {}; return nb(k in d ? d[k] : huText[k] || ''); }
  function L(a) { return nb(a == null ? '' : typeof a === 'string' ? a : (a[LI[lang]] != null ? a[LI[lang]] : a[0])); }
  function ft(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, lang === 'en' ? ',' : ' ') + ' Ft'; }

