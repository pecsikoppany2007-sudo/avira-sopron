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

