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

  /* ------------------------------------------------------------------ étlap (az Avira 2026 őszi étlapja, PDF) */
  var MENU = [
    { k: ['Brunch', 'Brunch', 'Brunch'], ph: 'brunch', items: [
      ["Ham 'N' Eggs / Bac 'N' Eggs", '1, 3', 2190, ['3 tojás, sonka vagy bacon, kovászos kenyér', '3 Eier, Schinken oder Bacon, Sauerteigbrot', '3 eggs, ham or bacon, sourdough bread']],
      [['Omlett 3 tojásból', 'Omelett aus 3 Eiern', 'Three-egg omelette'], '1, 3, 7', 1890, ['Feltét: sonka, gomba vagy sajt, +200 Ft', 'Extra: Schinken, Pilze oder Käse, +200 Ft', 'Add ham, mushrooms or cheese, +200 Ft']],
      [['Tükörtojás 3 tojásból', 'Spiegeleier aus 3 Eiern', 'Three fried eggs'], '1, 3, 7', 1890, null],
      ['Eggs Benedict', '1, 3, 7, 10', 2490, ['Hollandi mártás, bacon, briós', 'Sauce hollandaise, Bacon, Brioche', 'Hollandaise, bacon, brioche']],
      ['Burrata', '1, 3, 7', 3490, ['Pesto, prosciutto crudo, paradicsom, kovászos kenyér', 'Pesto, Prosciutto crudo, Tomate, Sauerteigbrot', 'Pesto, prosciutto crudo, tomato, sourdough']],
      [['Lazacos briós', 'Lachs-Brioche', 'Salmon brioche'], '1, 3, 4, 7', 2390, ['Vajkrém, friss avokádó, briós', 'Buttercreme, frische Avocado, Brioche', 'Butter cream, fresh avocado, brioche']],
      ['Croque Monsieur & Madame', '1, 3, 7, 10', 3490, ['Dijoni mustár, besamel, sonka, kalács, tükörtojás', 'Dijonsenf, Béchamel, Schinken, Hefezopf, Spiegelei', 'Dijon mustard, béchamel, ham, milk loaf, fried egg']],
      [['Croissant szendvics', 'Croissant-Sandwich', 'Croissant sandwich'], '1, 3, 7', 1690, ['Vajkrém, prágai sonka, sajt', 'Buttercreme, Prager Schinken, Käse', 'Butter cream, Prague ham, cheese']],
      [['Vajas croissant, 2 db', 'Buttercroissant, 2 Stück', 'Butter croissant, 2 pcs'], '1, 7', 1990, ['Lekvár, vaj', 'Marmelade, Butter', 'Jam, butter']],
      [['Nutellás croissant', 'Nutella-Croissant', 'Nutella croissant'], '1, 7', 2590, ['Nutella, friss gyümölcs', 'Nutella, frisches Obst', 'Nutella, fresh fruit']],
      [['Amerikai palacsinta', 'Pancakes', 'Pancakes'], '1, 7', 2190, ['Erdei gyümölcs chutney', 'Waldbeeren-Chutney', 'Forest fruit chutney']],
      ['Granola', '1, 3, 7', 1690, ['Görög joghurt, friss gyümölcs', 'Griechischer Joghurt, frisches Obst', 'Greek yoghurt, fresh fruit']]
    ] },
    { k: ['Tálak, pinsa, saláta', 'Platten, Pinsa, Salat', 'Boards, pinsa, salads'], ph: 'cafe-asztal', items: [
      [['Sajttál', 'Käseplatte', 'Cheese board'], '1, 7, 8', 1890, ['Sajtválogatás, dió, lekvár, kenyér', 'Käseauswahl, Walnüsse, Marmelade, Brot', 'Cheese selection, walnuts, jam, bread']],
      [['Hidegtál', 'Kalte Platte', 'Cold cuts board'], '1', 1890, ['Szalámi, sonka, friss zöldség, vaj, kenyér', 'Salami, Schinken, frisches Gemüse, Butter, Brot', 'Salami, ham, fresh vegetables, butter, bread']],
      [['Avira tál', 'Avira-Platte', 'Avira board'], '1, 7, 8', 3590, ['Sajttál és hidegtál együtt', 'Käse- und kalte Platte zusammen', 'Cheese and cold cuts together']],
      ['Pinsa Margherita', '1, 7', 2590, null],
      ['Pinsa Caprese / Quattro Formaggi / Diavola / Avira', '1, 7', 2890, null],
      [['Toast, 2 db', 'Toast, 2 Stück', 'Toast, 2 pcs'], '1, 7', 2190, ['Sonkás, szalámis vagy sajtos', 'Mit Schinken, Salami oder Käse', 'Ham, salami or cheese']],
      [['Caprese saláta', 'Caprese-Salat', 'Caprese salad'], '7', 2290, ['Mozzarella, paradicsom, pesto, bazsalikom', 'Mozzarella, Tomate, Pesto, Basilikum', 'Mozzarella, tomato, pesto, basil']],
      [['Tonhalsaláta', 'Thunfischsalat', 'Tuna salad'], '4', 2590, ['Lilahagyma, majonéz, rukkola', 'Rote Zwiebel, Mayonnaise, Rucola', 'Red onion, mayonnaise, rocket']],
      [['Fit saláta', 'Fit-Salat', 'Fit salad'], '', 1950, ['Kevert saláta, friss zöldség, csicseriborsó', 'Gemischter Salat, frisches Gemüse, Kichererbsen', 'Mixed leaves, fresh vegetables, chickpeas']]
    ] },
    { k: ['Kávé', 'Kaffee', 'Coffee'], ph: 'kave', note: ['Caffè Vergnano 1882. Növényi tej (mandula, zab, kókusz) vagy laktózmentes tej +200 Ft.', 'Caffè Vergnano 1882. Pflanzendrink (Mandel, Hafer, Kokos) oder laktosefreie Milch +200 Ft.', 'Caffè Vergnano 1882. Plant milk (almond, oat, coconut) or lactose-free milk +200 Ft.'], items: [
      ['Ristretto', '', 850, null], ['Espresso', '', 850, null], [['Hosszú kávé', 'Verlängerter', 'Long coffee'], '', 850, null], ['Espresso Macchiato', '', 900, null], ['Americano', '', 900, null],
      ['Cappuccino', '', 1190, null], ['Doppio', '', 1390, null], ['Latte', '', 1450, null], ['Latte Macchiato', '', 1450, null], ['Flat White', '', 1550, null], ['Espresso Tonic', '', 1590, null]
    ] },
    { k: ['Smoothie, shake', 'Smoothie, Shake', 'Smoothies, shakes'], ph: 'smoothie', note: ['Extrák: banán +200 Ft, mogyoróvaj +200 Ft, növényi tej +300 Ft, extra 30 g fehérje +500 Ft.', 'Extras: Banane +200 Ft, Erdnussbutter +200 Ft, Pflanzendrink +300 Ft, extra 30 g Protein +500 Ft.', 'Extras: banana +200 Ft, peanut butter +200 Ft, plant milk +300 Ft, extra 30 g protein +500 Ft.'], items: [
      [['Erdei gyümölcs smoothie, 3 dl', 'Waldbeeren-Smoothie, 3 dl', 'Forest fruit smoothie, 3 dl'], '', 1690, ['Eper, málna, áfonya, tejjel vagy növényi tejjel', 'Erdbeere, Himbeere, Heidelbeere, mit Milch oder Pflanzendrink', 'Strawberry, raspberry, blueberry, with milk or plant milk']],
      [['Csokis-banános smoothie, 3 dl', 'Schoko-Bananen-Smoothie, 3 dl', 'Chocolate banana smoothie, 3 dl'], '', 1690, ['Banán, csokoládé, tej', 'Banane, Schokolade, Milch', 'Banana, chocolate, milk']],
      ['Green Boost, 3 dl', '', 1690, ['Banán, zöld alma, bébispenót, lime, vízzel vagy almalével', 'Banane, grüner Apfel, Babyspinat, Limette, mit Wasser oder Apfelsaft', 'Banana, green apple, baby spinach, lime, with water or apple juice']],
      [['Fehérjeshake vízzel, 3 dl', 'Proteinshake mit Wasser, 3 dl', 'Protein shake with water, 3 dl'], '', 850, null],
      [['Fehérjeshake tejjel, 2,5 dl', 'Proteinshake mit Milch, 2,5 dl', 'Protein shake with milk, 2.5 dl'], '', 1050, null]
    ] },
    { k: ['Specials, tea', 'Specials, Tee', 'Specials, tea'], ph: 'cafe-latte', items: [
      ['Chai Latte', '', 1590, null], ['Pumpkin Spiced Latte', '', 1690, null], ['Gingerbread Latte', '', 1690, null], ['Matcha Latte', '', 1690, null], [['Epres Matcha Latte', 'Erdbeer-Matcha-Latte', 'Strawberry Matcha Latte'], '', 1790, null],
      [['Imperial Earl Grey, szálas fekete tea', 'Imperial Earl Grey, loser Schwarztee', 'Imperial Earl Grey, loose black tea'], '', 1390, null],
      [['Darjeeling Puttabong, szálas tea', 'Darjeeling Puttabong, loser Tee', 'Darjeeling Puttabong, loose tea'], '', 1390, null],
      [['Summer Fruits vagy Mango, szálas gyümölcstea', 'Summer Fruits oder Mango, loser Früchtetee', 'Summer Fruits or Mango, loose fruit tea'], '', 1390, null],
      [['Gyömbér-menta tea', 'Ingwer-Minz-Tee', 'Ginger mint tea'], '', 1390, null],
      [['Forró csokoládé tejszínhabbal, klasszikus vagy fehér', 'Heiße Schokolade mit Sahne, klassisch oder weiß', 'Hot chocolate with whipped cream, classic or white'], '', 1490, null]
    ] },
    { k: ['Koktélok', 'Cocktails', 'Cocktails'], ph: 'bar-polc', items: [
      ['Mimosa', '', 1490, ['Pezsgő, narancslé', 'Sekt, Orangensaft', 'Sparkling wine, orange juice']],
      ['Mojito', '', 2390, ['Fehér rum, lime, friss menta, cukor, szóda', 'Weißer Rum, Limette, frische Minze, Zucker, Soda', 'White rum, lime, fresh mint, sugar, soda']],
      ['Aperol Spritz', '', 2490, ['Aperol, prosecco, szóda', 'Aperol, Prosecco, Soda', 'Aperol, prosecco, soda']],
      ['Campari Spritz', '', 2490, ['Campari, prosecco, szóda', 'Campari, Prosecco, Soda', 'Campari, prosecco, soda']],
      ['Hugo Spritz', '', 2490, ['Prosecco, bodzaszirup, szóda, menta, lime', 'Prosecco, Holundersirup, Soda, Minze, Limette', 'Prosecco, elderflower syrup, soda, mint, lime']],
      ['Limoncello Spritz', '', 2490, ['Limoncello, prosecco, szóda', 'Limoncello, Prosecco, Soda', 'Limoncello, prosecco, soda']],
      ['Paloma', '', 2490, ['Tequila, grapefruitszóda, lime', 'Tequila, Grapefruit-Soda, Limette', 'Tequila, grapefruit soda, lime']],
      ['Espresso Martini', '', 2790, ['Vodka, kávé, kávélikőr', 'Wodka, Kaffee, Kaffeelikör', 'Vodka, coffee, coffee liqueur']],
      ['Negroni', '', 2790, ['Gin, Campari, Antica Formula', 'Gin, Campari, Antica Formula', 'Gin, Campari, Antica Formula']],
      ['Negroni Sbagliato', '', 2790, ['Campari, Antica Formula, prosecco', 'Campari, Antica Formula, Prosecco', 'Campari, Antica Formula, prosecco']],
      ['Porn Star Martini', '', 3290, ['Absolut Vanilia, Passoã, maracujapüré, lime, vaníliaszirup, prosecco', 'Absolut Vanilia, Passoã, Maracujapüree, Limette, Vanillesirup, Prosecco', 'Absolut Vanilia, Passoã, passion fruit purée, lime, vanilla syrup, prosecco']]
    ] },
    { k: ['Gin tonic, alkoholmentes', 'Gin Tonic, alkoholfrei', 'Gin & tonic, alcohol-free'], ph: 'cafe-logo', items: [
      ['Bombay Gin Tonic', '', 3090, ['Bombay Sapphire, Thomas Henry tonic, citrom, menta', 'Bombay Sapphire, Thomas Henry Tonic, Zitrone, Minze', 'Bombay Sapphire, Thomas Henry tonic, lemon, mint']],
      ['Malfy Gin Tonic', '', 3090, ['Malfy Gin Rosa, Thomas Henry Cherry Blossom, grapefruit, rozmaring', 'Malfy Gin Rosa, Thomas Henry Cherry Blossom, Grapefruit, Rosmarin', 'Malfy Gin Rosa, Thomas Henry Cherry Blossom, grapefruit, rosemary']],
      ["Hendrick's Gin Tonic", '', 3290, ["Hendrick's gin, Thomas Henry tonic, uborka, rózsabors", "Hendrick's Gin, Thomas Henry Tonic, Gurke, rosa Pfeffer", "Hendrick's gin, Thomas Henry tonic, cucumber, pink pepper"]],
      [['Virgin Mojito, alkoholmentes', 'Virgin Mojito, alkoholfrei', 'Virgin Mojito, alcohol-free'], '', 1790, ['Lime, friss menta, mojitoszirup, szóda, jég', 'Limette, frische Minze, Mojito-Sirup, Soda, Eis', 'Lime, fresh mint, mojito syrup, soda, ice']],
      [['Virgin Gin Tonic, alkoholmentes', 'Virgin Gin Tonic, alkoholfrei', 'Virgin Gin & Tonic, alcohol-free'], '', 1790, ['Tanqueray 0.0%, indian tonic, lime, jég', 'Tanqueray 0.0 %, Indian Tonic, Limette, Eis', 'Tanqueray 0.0%, Indian tonic, lime, ice']],
      [['Limonádé, 0,5 l', 'Limonade, 0,5 l', 'Lemonade, 0.5 l'], '', 1650, ['Klasszikus, eper, maracuja, bodza, málna, kivi vagy görögdinnye; cukormentesen málna vagy őszibarack', 'Klassisch, Erdbeere, Maracuja, Holunder, Himbeere, Kiwi oder Wassermelone; zuckerfrei Himbeere oder Pfirsich', 'Classic, strawberry, passion fruit, elderflower, raspberry, kiwi or watermelon; sugar-free raspberry or peach']],
      [['Frissen facsart narancslé', 'Frisch gepresster Orangensaft', 'Fresh orange juice'], '', 0, null, ['500 Ft / dl', '500 Ft / dl', '500 Ft / dl']]
    ] }
  ];
  var AL = ['Glutén', 'Rákfélék', 'Tojás', 'Halak', 'Földimogyoró', 'Szójabab', 'Tej (laktóz is)', 'Diófélék', 'Zeller', 'Mustár', 'Szezámmag', 'Kén-dioxid és szulfitok', 'Csillagfürt', 'Puhatestűek'];
  var AL_DE = ['Gluten', 'Krebstiere', 'Eier', 'Fisch', 'Erdnüsse', 'Soja', 'Milch (inkl. Laktose)', 'Schalenfrüchte', 'Sellerie', 'Senf', 'Sesam', 'Schwefeldioxid und Sulfite', 'Lupinen', 'Weichtiere'];
  var AL_EN = ['Gluten', 'Crustaceans', 'Eggs', 'Fish', 'Peanuts', 'Soy', 'Milk (incl. lactose)', 'Tree nuts', 'Celery', 'Mustard', 'Sesame', 'Sulphur dioxide and sulphites', 'Lupin', 'Molluscs'];

  /* ------------------------------------------------------------------ órarend és árak (Avira Pilates, Instagram, 2026. november) */
  var WEEK = [[1, ['16:00', '17:00']], [2, ['7:00', '8:00', '18:00']], [3, ['6:00', '7:00']], [4, ['19:00']], [5, ['8:00', '15:00']]];
  var DAYS = [['Vasárnap', 'Sonntag', 'Sunday'], ['Hétfő', 'Montag', 'Monday'], ['Kedd', 'Dienstag', 'Tuesday'], ['Szerda', 'Mittwoch', 'Wednesday'], ['Csütörtök', 'Donnerstag', 'Thursday'], ['Péntek', 'Freitag', 'Friday'], ['Szombat', 'Samstag', 'Saturday']];
  var START = Date.UTC(2026, 10, 8, 23, 0); // 2026. november 9., 0:00 budapesti idő
  var PRICES = [
    ['sep', ['Csoportos óra', 'Gruppenstunde', 'Group class']],
    [['Első alkalom', 'Erste Stunde', 'First class'], 3000, ['Ha most jössz először', 'Wenn du zum ersten Mal kommst', 'If it is your first time'], 'is-first'],
    [['1 alkalom', '1 Stunde', 'Single class'], 5000, null],
    [['5 alkalmas bérlet', '5er-Karte', '5-class pass'], 24000, null],
    [['10 alkalmas bérlet', '10er-Karte', '10-class pass'], 45000, null],
    ['sep', ['Privát óra', 'Privatstunde', 'Private session']],
    [['Egyéni óra', 'Einzelstunde', 'One-to-one'], 7000, null],
    [['Páros óra', 'Paarstunde', 'Duo session'], 6000, ['fejenként', 'pro Person', 'per person'], '', ['/ fő', '/ Person', '/ person']]
  ];

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

  var G = { ok: false, m: [0, 0], mT: [0, 0], run: false, vis: true };
  var heroEl = $('#top');
  if (canHover && !reduced && hwGpu && !window.__noGl && heroEl && heroEl.getAttribute('data-gl')) (function () {
    var VS = 'attribute vec2 a;varying vec2 v;void main(){v=vec2(a.x*.5+.5,.5-a.y*.5);gl_Position=vec4(a,0.,1.);}';
    var FS = [
      'precision highp float;varying vec2 v;',
      'uniform sampler2D uI,uD;uniform vec2 uRes,uM;uniform float uAR,uOver;',
      'const vec2 POS=vec2(.5,.42);',
      'vec2 img(vec2 p){float sa=uRes.x/uRes.y;vec2 s=sa>uAR?vec2(1.,uAR/sa):vec2(sa/uAR,1.);',
      ' vec2 o=(1.-s)*POS;vec2 c=o+.5*s;return c+(o+p*s-c)/uOver;}',
      'void main(){vec2 p=v;',
      ' for(int i=0;i<3;i++){float d=texture2D(uD,img(p)).r;p=v+uM*(d-.42)*vec2(.026,.018);}',
      ' gl_FragColor=vec4(texture2D(uI,img(p)).rgb,1.);}'
    ].join('\n');
    var cv = document.createElement('canvas'); cv.className = 'hero__gl'; cv.setAttribute('aria-hidden', 'true');
    $('.hero__stack').appendChild(cv);
    var gl = cv.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'high-performance' });
    if (!gl) return;
    function sh(tp, src) { var x = gl.createShader(tp); gl.shaderSource(x, src); gl.compileShader(x); return gl.getShaderParameter(x, gl.COMPILE_STATUS) ? x : null; }
    var vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS); if (!vs || !fs) return;
    var pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    var b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var al = gl.getAttribLocation(pr, 'a'); gl.enableVertexAttribArray(al); gl.vertexAttribPointer(al, 2, gl.FLOAT, false, 0, 0);
    var U = {}; ['uI', 'uD', 'uRes', 'uM', 'uAR', 'uOver'].forEach(function (nm) { U[nm] = gl.getUniformLocation(pr, nm); });
    function tex(unit, src) {
      var tx = gl.createTexture(); gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tx);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, src);
    }
    var im = new Image(), dep = new Image(); im.decoding = dep.decoding = 'async';
    var lastW = 0, lastH = 0;
    function size() {
      var w = cv.clientWidth, h = cv.clientHeight, dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      lastW = innerWidth; lastH = innerHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      gl.viewport(0, 0, cv.width, cv.height); gl.uniform2f(U.uRes, w, h);
    }
    function draw() { gl.uniform2f(U.uM, G.m[0], G.m[1]); gl.drawArrays(gl.TRIANGLES, 0, 3); }
    function frame() {
      var moving = false;
      for (var i = 0; i < 2; i++) { var dm = G.mT[i] - G.m[i]; if (Math.abs(dm) > .0008) { G.m[i] += dm * .055; moving = true; } else G.m[i] = G.mT[i]; }
      draw();
      if (!moving || !G.vis) { G.run = false; gsap.ticker.remove(frame); }
    }
    G.kick = function () { if (G.ok && G.vis && !G.run) { G.run = true; gsap.ticker.add(frame); } };
    function load() {
      im.src = 'img/hero-bar-2400.webp?v=3'; dep.src = 'img/hero-bar-depth.webp?v=3';
      var bm = function (x) { return window.createImageBitmap ? createImageBitmap(x).catch(function () { return x; }) : Promise.resolve(x); };
      Promise.all([im.decode(), dep.decode()]).then(function () { return Promise.all([bm(im), bm(dep)]); }).then(function (bms) {
        tex(0, bms[0]); tex(1, bms[1]);
        gl.uniform1i(U.uI, 0); gl.uniform1i(U.uD, 1);
        gl.uniform1f(U.uAR, im.naturalWidth / im.naturalHeight); gl.uniform1f(U.uOver, 1.04);
        G.ok = true; size(); draw();
        html.classList.add('hero-3d');
      }).catch(function () {});
    }
    var idle = window.requestIdleCallback || function (f) { return setTimeout(f, 1); };
    var wait = function () { if (heroDone) setTimeout(function () { idle(load, { timeout: 1500 }); }, 1600); else setTimeout(wait, 200); };
    wait();
    cv.addEventListener('webglcontextlost', function (e) { e.preventDefault(); G.ok = false; html.classList.remove('hero-3d'); });
    heroEl.addEventListener('pointermove', function (e) { G.mT[0] = (e.clientX / innerWidth - .5) * 2; G.mT[1] = (e.clientY / innerHeight - .5) * 2; G.kick(); });
    heroEl.addEventListener('pointerleave', function () { G.mT[0] = G.mT[1] = 0; G.kick(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { G.vis = es[0].isIntersecting; if (G.vis) G.kick(); }).observe(heroEl);
    window.addEventListener('resize', function () { if (G.ok && (innerWidth !== lastW || Math.abs(innerHeight - lastH) > 160)) { size(); draw(); } });
  })();

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
