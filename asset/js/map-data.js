var i18n = {
    'collapse': 'Expand',
    'fold': 'Fold',
    'findOnMap': 'Find On Map',
    'relatedLocations': 'Related Locations'
}

var siteFilterData = [
    {
        name: 'all',
        i18n: 'all'
    },
    {
        name: 'viewSpot',
        i18n: 'Must-see attractions',
        sites: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '16', '17', '21', '22', '24']
    },
    {
        name: 'food',
        i18n: 'Gourment',
        sites: ['14', '15', '23']
    },
    {
        name: 'entertainment',
        i18n: 'Activities',
        sites: ['18', '19', '20']
    },
    {
        name: 'holiday',
        i18n: 'Events and Festivals',
        sites: ['25', '26', '27']
    }
]

var siteI18nData = {
    "1": {
        "name": "Ruins of St. Paul's",
        "location": "Company of Jesus Square",
        "openingHours": "9:00am - 6:00pm",
        "description": "The Ruins of St. Paul's refer to the facade of what was originally the Church of Mater Dei built in 1602-1640, destroyed by fire in 1835, and the ruins of St. Paul's College, which stood adjacent to the Church. As a whole, the old Church of Mater Dei, St. Paul's College and Mount Fortress were all Jesuit constructions and formed what can be perceived as the Macao's \"acropolis\". Close by, the archaeological remains of the old College of St. Paul stand witness to what was the first western-style university in the Far East, with an elaborate academic programme. Nowadays, the facade of the Ruins of St. Paul's functions symbolically as an altar to the city.",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsv38tlue1j20ci08cmzz.jpg",
        "coordinates": [[[393, 2465], [514, 2465], [514, 2580], [393, 2580], [393, 2465]]],
        "subname": "",
        "relatedLocations": [2, 3]
    },
    "2": {
        "name": "Mount Fortress",
        "location": "Praceta do Museu de Macau",
        "openingHours": "7:00am - 7:00pm",
        "description": "Built in conjunction with the Jesuits from 1617 to 1626, this was the city's principal military defence structure. The fortress was equipped with cannons, military barracks, wells and an arsenal that held sufficient ammunition and supplies to endure a siege lasting up to two years. The fortress covers an area of 10,000 square metres, in the shape of a trapezoid. The four corners of the fortress protrude to form bulwarks.",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvkjavz8hj20cl08cdkt.jpg",
        "coordinates": [[[550, 2509], [621, 2509], [621, 2555], [550, 2555], [550, 2509]]],
        "subname": "",
        "relatedLocations": [4, 5]
    },
    "3": {
        "name": "Macao Museum",
        "location": "No. 112 Praceta do Museu de Macau",
        "openingHours": "10:00am - 6:00pm",
        "description": "The Macao Museum is a historical and cultural museum with a vast number of objects of great historical value, which demonstrates the way of life and cultures of the various communities which have been inhabited the city for ages.",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvkmbyfdoj20eu08ctan.jpg",
        "coordinates": [[[423, 2633], [671, 2633], [671, 2680], [423, 2680], [423, 2633]]],
        "subname": "",
        "relatedLocations": [6, 7]
    },
    "4": {
        "name": "Senado Square",
        "location": "Senado Square",
        "openingHours": "",
        "description": "Senado Square has been Macao's urban centre for centuries, and is still the most popular venue for public events and celebrations today. Located close to the former Senate building, Sam Kai Vui Kun ( Kuan Tai Temple ) is also a reminder of the active participation of the local Chinese community in general civic affairs, providing a clear example of the multicultural dimension of the Macao community. The square is surrounded by pastel coloured neo-classical buildings, creating a consistent and harmonious Mediterranean atmosphere. ",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvknvcktoj20cj08cgq4.jpg",
        "coordinates": [[[458, 2347], [565, 2347], [565, 2414], [458, 2414], [458, 2347]]],
        "subname": "",
        "relatedLocations": [8, 9]
    },
    "5": {
        "name": "St. Dominic's Church",
        "location": "St. Dominic's Square",
        "openingHours": "10:00am - 6:00pm",
        "description": "Founded in 1587 by three Spanish Dominican priests who originally came from Acapulco in Mexico, this church is also connected to the Brotherhood of Our Lady of the Rosary. It was here that the first Portuguese newspaper was published on Chinese soil, A Abelha da China (\"The China Bee\"), on 12th September 1822. The bell tower, at the back of the building, has been modified into a small Museum of Sacred Art, now exhibiting a collection of around 300 artifacts. ",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvkphcbpkj20ck08cjxg.jpg",
        "coordinates": [[[340, 2389], [411, 2389], [411, 2470], [340, 2470], [340, 2389]]],
        "subname": "",
        "relatedLocations": [10, 11]
    },
    "6": {
        "name": "Guia Fortress",
        "location": "St. Dominic's Square",
        "openingHours": "Fortress: 9:00am - 6:00pm",
        "description": "The fortress was built between 1622 and 1638. Inside the fortress stands Guia Chapel, originally established by Clarist nuns, who resided at the site before establishing the Convent of St. Clare. The chapel's elaborate frescoes depict representations of both western and Chinese themes, displaying motifs of religious and mythological inspiration that are a perfect example of Macao's multicultural dimension. Guia Lighthouse, dating from 1865, which also stands within the perimeter, is the first modern lighthouse on the Chinese coast. Guia Fortress, along with the chapel and lighthouse are symbols of Macao's maritime, military and missionary past. ",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvkphcbpkj20ck08cjxg.jpg",
        "coordinates": [[[633, 2418], [730, 2418], [730, 2500], [633, 2500], [633, 2418]]],
        "subname": "",
        "relatedLocations": [12, 13]
    },
    "7": {
        "name": "Grand Prix Museum",
        "location": "Rua Luis Gonzaga Gomes, 431",
        "openingHours": "10:00am - 6:00pm",
        "description": "*Closed on Tuesdays<br>Opened 1993 to celebrate the 40th anniversary of the Macau Grand Prix, which features a number of automobile and motorbike races and takes place every year in November. It started in 1954 due to the enthusiasm of a group of Macao residents and the support of the authorities. Today it is an international sports event that attracts thousands of tourists and racing enthusiasts to Macao, to watch the classic \"Guia Race\" and the \"Formula 3 Grand Prix\". As it takes place on a street circuit, which inevitably leads to a comparison with Monte Carlo, the Macau Grand Prix has been developing into a race that, due to the exactness and the need for precision which it imposes on the drivers, has had the participation of great names of the motor racing participating and which has also served as a launching platform for many other names, the visitor will certainly recognise while visiting the Grand Prix Museum. ",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvkphcbpkj20ck08cjxg.jpg",
        "coordinates": [[[725, 2362], [795, 2362], [795, 2394], [725, 2394], [725, 2362]]],
        "subname": "",
        "relatedLocations": [14, 15]
    },
    "8": {
        "name": "Macau Fisherman's Wharf",
        "location": "Avenida da Amizade e Av. Dr. Sun Yat-Sen",
        "openingHours": "24 hours",
        "description": "Macau Fisherman's Wharf is a 133,000m² park and the first-ever cultural, themed and creative attraction in the tourism industry of Macao. It is centrally located in the outer harbour and it is not purely a theme park, but also combines dining, shopping, entertainment, accommodation, convention and exhibition facilities in one single location which takes just a 5-minute walk from the Outer Harbour Ferry Terminal and Heliport.",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvktjp7jqj20ct08cq77.jpg",
        "coordinates": [[[723, 2216], [828, 2216], [828, 2268], [723, 2268], [723, 2216]]],
        "subname": "",
        "relatedLocations": [16, 17]
    },
    "9": {
        "name": "Macao Science Center",
        "location": "Avenida Dr. Sun Yat-Sen, Macau",
        "openingHours": "10:00am - 6:00pm",
        "description": "*Closed on Thursdays<br>Macao Science Center was designed by world renowned architect Mr. I.M. Pei and Pei Partnership Architects. With a gross floor area of 20,000 square metres, Macao Science Center consists of the Exhibition Center, the Planetarium and the Convention Center. ",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvkvc3k8rj20ck08cq65.jpg",
        "coordinates": [[[791, 2135], [906, 2135], [906, 2207], [791, 2207], [791, 2135]]],
        "subname": "",
        "relatedLocations": [18, 19]
    },
    "10": {
        "name": "Mandarin's House",
        "location": "No 10, Travessa de António da Silva",
        "openingHours": "10:00am - 6:00pm",
        "description": "*Closed on Wednesdays, except public holidays<br>Built before 1869, this was the traditional Chinese residential compound home of prominent Chinese literary figure Zheng Guanying. It is a traditional Chinese compound consisting of several courtyard houses, displaying a mix of Chinese and Western detailing, such as the use of grey bricks against arched ornamentations and Chinese timber lattice windows against mother-of-pearl window panels of Indian origin.        ",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvkvc3k8rj20ck08cq65.jpg",
        "coordinates": [[[210, 2288], [302, 2288], [302, 2341], [210, 2341], [210, 2288]]],
        "subname": "",
        "relatedLocations": [20, 21]
    },
    "11": {
        "name": "A-Ma Temple",
        "location": "Barra Square",
        "openingHours": "7:00am - 6:00pm",
        "description": "A-Ma Temple already existed before the city of Macao came into being. It consists of the Gate Pavilion, the Memorial Arch, the Prayer Hall, the Hall of Benevolence, the Hall of Guanyin, and Zhengjiao Chanlin (a Buddhist pavilion). The variety of pavilions dedicated to the worship of different deities in a single complex make A-Ma Temple an exemplary representation of Chinese culture inspired by Confucianism, Taoism, Buddhism and multiple folk beliefs.  ",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvl3ij43xj20ci08cjyy.jpg",
        "coordinates": [[[106, 2083], [219, 2083], [219, 2149], [106, 2149], [106, 2083]]],
        "subname": "",
        "relatedLocations": [22, 23]
    },
    "12": {
        "name": "Macau Tower",
        "location": "Largo da Torre de Macau",
        "openingHours": "Weekdays: 10:00am - 10:00pm Holidays: 9:00am - 10:00pm",
        "description": "\"Opened on 19th December, 2001, Macau Tower is 338 metres in height. It is an elegant construction offering magnificent panoramic views all over Macao and much of the Pearl River Delta from its observation deck and revolving restaurant, at the 223-metre level. There is the opportunity to walk around the outside of the tower, for instance \"Skywalk X\".<br> Besides the tower, there are a 4-floor Convention and Entertainment Centre, restaurants, cinema, a 2-level basement and an outdoor plaza.",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvl40pgsij20ci08cjut.jpg",
        "coordinates": [[[356, 1946], [392, 1946], [392, 2220], [356, 2220], [356, 1946]]],
        "subname": "",
        "relatedLocations": [24, 25]
    },
    "13": {
        "name": "Taipa Houses",
        "location": "Avenida da Praia, Taipa",
        "openingHours": "10:00am - 7:00pm",
        "description": "*Closed on Mondays<br>Acclaimed as one of the top eight sites of Macao, the Taipa Houses represents the charming Portuguese architectural style in Taipa. The Portuguese residences along Avenida da Praia, together with the neighbouring Our Lady of Carmel Church and the garden, comprise a picturesque landscape in which the five green houses stand out as the most representative.<br>These five houses, built in 1921, once served as the residences of senior civil servants, also namely Macanese families; in 1992, they were acknowledged as a building complex of architectural value. Later, the government decided to revamp the houses completely as a museum site, opened to the public at the end of 1999 as the ‘Taipa Houses-Museum’.",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvl5z9qt0j20ci08cjtr.jpg",
        "coordinates": [[[759, 1435], [886, 1435], [886, 1526], [759, 1526], [759, 1435]]],
        "subname": "",
        "relatedLocations": [26, 27]
    },
    "14": {
        "name": "Rua do Cunha",
        "location": "Taipa Old Village",
        "openingHours": "24 hours",
        "description": "Taipa Old Village is a treasure trove of souvenir shops, snacks, traditional cakes and exquisite furnishings where visitors can find the ideal gift or souvenir for family and friends.        ",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvl8qwawsj20ci08c0ub.jpg",
        "coordinates": [[[548, 1333], [783, 1333], [783, 1407], [548, 1407], [548, 1333]]],
        "subname": "",
        "relatedLocations": [1, 2]
    },
    "15": {
        "name": "Almound cakes",
        "location": "Rua do Cunha",
        "openingHours": "24 hours",
        "description": "Out of all the ‘must-try’ items you can find in Macao, alomund cakes are the most popular one without a doubt. On Rua do Cunha in Taipa Village are the place to find the best almound cakes; it packed with shops selling almond cakes and many other local specialties. Some of the almound cakes are cooked right in front of you – and it sure will make an excellent gift for your nearest and dearest. You can also find the famous almound cakes bakeries at The Venetian Macao and Sands Cotai Central to fulfill your needs of shopping.",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvlb5e57mj20eu08cjte.jpg",
        "coordinates": [[[511, 1390], [606, 1390], [606, 1447], [511, 1447], [511, 1390]]],
        "subname": "",
        "relatedLocations": [3, 4]
    },
    "16": {
        "name": "The Venetian Macao",
        "location": "Estrada da Baía de N. Senhora da Esperança, s/n, Taipa",
        "openingHours": "24 hours",
        "description": "Offering only suites, 3000 of them and all more than 70sqm, The Venetian Macao is an incredible, immersive hotel experience. 350 world-class shopping choices line a masterfully reconstructed Grand Canal, bridges spanning each bank, just as they do in Venice. An incredible array of dining options, from the food court to the Michelin-starred Golden Peacock to room service, bring guests the best of global cuisines no matter their appetite. ",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvlda4g6nj20ci08cmyt.jpg",
        "coordinates": [[[848, 1140], [942, 1140], [942, 1264], [848, 1264], [848, 1140]]],
        "subname": "",
        "relatedLocations": [5, 6]
    },
    "17": {
        "name": "The Parisian Macao",
        "location": "Estrada do Istmo, Lote 3, Cotai Strip",
        "openingHours": "Eiffel Tower: 11:00am - 11:00pm",
        "description": "The newest jewel in the crown of Sands Resorts, The Parisian Macao brings the City of Light to life in Asia, with its own 1/2 scale Eiffel Tower, 3,000 rooms, and architecture designed to transport you straight back to la belle époque. Let the kids roam free at the Kids Kingdom while you dine at La Brasserie or peruse the best in fashion, accessories, and gadgets curated by our selection of boutiques, home to over 170 of the world’s top brands, or just sit in your room and take in the view of the Eiffel Tower.  ",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvlfpqbpuj20ci08cjvc.jpg",
        "coordinates": [[[876, 968], [1010, 968], [1010, 1131], [876, 1131], [876, 968]]],
        "subname": "",
        "relatedLocations": [7, 8]
    },
    "18": {
        "name": "SANDS SHOPPES",
        "location": "Sands Resorts Macao, Sands Macao",
        "openingHours": "24 hours",
        "description": "The largest indoor shopping mall in Macao, Sands Shoppes offers an amazing retail experience at more than 850 duty free outlets. From finest prestige and designer labels at Shoppes at Four Seasons, Shoppes at Venetian’s world-renowned mass-market brands and boutiques, creative luxury at Shoppes at Parisian at newly opened The Parisian Macao, to the family-friendly consumer vibe of Shoppes at Cotai Central, Sands Shoppes is the perfect shopping venue. Whether you are looking for the latest seasonal trends, or collections from the finest designers, Sands Shoppes has you covered. ",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvlgymzssj20ci08cq7i.jpg",
        "coordinates": [[[711, 1060], [840, 1060], [840, 1138], [711, 1138], [711, 1060]]],
        "subname": "",
        "relatedLocations": [9, 10]
    },
    "19": {
        "name": "Kids & Family Play Zone",
        "location": "Planet J / Qube, Sands Shoppes",
        "openingHours": "Weekdays: 10:00am - 7:00pm Weekends: 10:00am - 8:00pm",
        "description": "Planet J proudly announces the world’s first ever, player centric, live action role playing (LARP) theme park. Macao is first to the table with this innovative and immersive family entertainment concept. Within its massive 100,000 square feet facility, Planet J is exquisitely designed to house eight distinct gaming zones containing more than 200 whimsical games.Rivaling traditional theme parks, Planet J is destined to become one of the most interactive entertainment experiences within Asia and abroad." ,
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvll0ldm4j20ci08cjwi.jpg",
        "coordinates": [[[1092, 1118], [1157, 1118], [1157, 1164], [1092, 1164], [1092, 1118]]],
        "subname": "",
        "relatedLocations": [11, 12]
    },
    "20": {
        "name": "COTAI ARENA",
        "location": "The Venetian Macao",
        "openingHours": "24 hours",
        "description": "The best concerts and shows venues ever. Cotai Arena is an ideal multi-purpose indoor area for any of functions.  ",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvlq61y5bj20ci08cmzs.jpg",
        "coordinates": [[[728, 1205], [837, 1205], [837, 1260], [728, 1260], [729, 1205]]],
        "subname": "",
        "relatedLocations": [13, 14]
    },
    "21": {
        "name": "Macao Giant Panda Pavilion",
        "location": "Seac Pai Van Park",
        "openingHours": "10:00am - 1:00pm, 2:00pm - 5:00pm",
        "description": "Nestled against a hill side in Seac Pai Van Park in Coloane in a fan-shaped layout of about 3000m2, Macao Giant Panda Pavilion is designed to take advantage of combining the terrain's natural undulations with the architectural characteristics.The pavilion comprises two 330m2 indoor activity quarters and a 600m2 outdoor yard for the inhabitation of the giant pandas and a 900m2 indoor exhibit area. Two viewing paths of different elevations align along the front edge of the fan-layout indoor activity area, accessible to two streams of visitors. Internal facilities include a logistic centre with panda dens, bamboo-washing and storage quarters, feed preparation room, feed warehouse ..." ,
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvlt2z221j20ci08cjrv.jpg",
        "coordinates": [[[971, 610], [1126, 610], [1126, 707], [971, 707], [971, 610]]],
        "subname": "",
        "relatedLocations": [15, 16]
    },
    "22": {
        "name": "Chapel of St. Francis Xavier",
        "location": "Rua do Caetano, Largo Eduardo Marques",
        "openingHours": "Weekdays: 10:00am - 4:00pm Sat: 10:00am - 1:00pm",
        "description": "*Closed on Sundays and public holidays<br>Built in 1928, this chapel follows the baroque style of Macao's major churches. It has a cream and white facade with oval windows and a bell tower. It stands behind the monument commemorating the local victory over pirates in 1910.        ",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvlugwd4hj20ci08cmxf.jpg",
        "coordinates": [[[829, 317], [1051, 317], [1051, 432], [829, 432], [829, 317]]],
        "subname": "",
        "relatedLocations": [17, 18]
    },
    "23": {
        "name": "Portuguese egg tarts - Lord Stow's Bakery",
        "location": "1 Rua do Tassara, Coloane Town Square",
        "openingHours": "7:00am - 10:00pm",
        "description": "Englishman, Andrew Stow opened Lord Stow’s Bakery on Coloane Island, Macau on 15th September 1989. It was a modest affair, in a small village shop, in an area he loved. Andrew’s philosophy was to ensure his produce was always fresh, healthy, natural and of the highest possible quality. He refused to allow his range to include the additives and preservatives so common in other bakeries.<br>During a trip to Portugal in the late-80s, Andrew had become familiar with their popular Pasteis de Nata – a kind of egg tart, which had its origins in Belem, Lisbon in 1837. Andrew then set forth experimenting with his own version. He dispensed with some conventional methods & ingredients, and introduced an English touch. By doing so, Andrew created his own specialty and introduced the “Portuguese” Egg Tart to Asia in the form they are now recognized and known.<br>Lord Stow’s Bakery suddenly became famous for one item – Andrew’s Egg Tart. His little bakery found itself on Macau’s list of tourist attractions. Andrew’s original recipe Egg Tarts became well known beyond their territorial confines, attracting a faithful following and becoming a visible export, almost a trademark of Macau.",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvlvsm0soj20cj08cn11.jpg",
        "coordinates": [[[700, 560], [821, 560], [821, 642], [700, 642], [700, 560]]],
        "subname": "",
        "relatedLocations": [19, 20]
    },
    "24": {
        "name": "Hac Sa Beach",
        "location": "Hac Sa Beach, Estrada de Hac Sá, Coloane",
        "openingHours": "24 hours",
        "description": "Hác-Sá (‘Black Sand’) Beach is Macao’s larger and more popular beach, both for its safe swimming and various other water activities like sailing and jet-skiing. Several BBQ-stalls ply their trade just off the beach, and families can enjoy tennis courts, swimming pool, picnic area, children’s playground, exercise area and several restaurants in and around the adjoining Hác-Sá Park.<br>  When it comes to beaches of Macao, the Hác Sá Beach is the most well-known of all. It is named after the black sea sand of its shoreline, the main attraction of the beach.  ",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvlyjx2xdj20ci0irmxn.jpg",
        "coordinates": [[[1558, 655], [1797, 655], [1797, 735], [1558, 735], [1558, 655]]],
        "subname": "",
        "relatedLocations": [21, 22]
    },
    "25": {
        "name": "Macao Light Festival",
        "location": "Senado Square",
        "openingHours": "Dec.2018",
        "description": "Macao Light Festival presenting video mapping projections, light installations, interactive games as well as a music and light show at various locations in Macao.        ",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvlzkdrnij20ci08cwex.jpg",
        "coordinates": [[[308, 2238], [419, 2238], [419, 2368], [308, 2368], [308, 2238]]],
        "subname": "",
        "relatedLocations": [23, 24]
    },
    "26": {
        "name": "Macau Grand Prix",
        "location": "The Guia Circuit",
        "openingHours": "15 - 18.Nov.2018",
        "description": "Recognized as the most internationally prestigious event on the local calendar, the legendary Macau Grand Prix - now edging into its sixth decade - pits the best motorcycle, WTCC and Formula 3 racers in the world against each other and the clock in dedicated competitions along the narrow, twisting Guia street circuit of Macao city. The high-pitched whine of racing engines, the roar of the crowd, and the adrenalin-charged atmosphere make for a colourful four days of non-stop, head-turning excitement.        ",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvm0na6k4j20ci08cwff.jpg",
        "coordinates": [[[591, 2225], [665, 2225], [665, 2253], [591, 2253], [591, 2225]]],
        "subname": "",
        "relatedLocations": [23, 22]
    },
    "27": {
        "name": "Macao International Fireworks Display Contest",
        "location": "Av. Panoramica do Lago Nam Van, Macau",
        "openingHours": "1, 8, 15, 24, Sep & 1, Oct, 2018",
        "description": "The annual Macao International Fireworks Display Contest - universally acclaimed as one of the best of its kind - takes place on the Macau Tower Shorefront from mid-September to 1st October every year. Over the years, more than 100 international teams from China, the Philippines, Thailand, Chinese Taiwan, Japan, Korea, Australia, the UK, Switzerland, France, Germany, Portugal and Spain have participated in this world-class pyrotechnic shoot-out. Many visitors choose this time of year to come to Macao to enjoy an exotic holiday illuminated by spectacular displays in the night sky that can be enjoyed from many vantage points on the Macao Peninsula and Taipa Island.        ",
        "image": "https://ws1.sinaimg.cn/large/9130c6a9gy1fsvm1ysgcyj20ck08c0ul.jpg",
        "coordinates": [[[238, 1819], [407, 1819], [407, 1928], [238, 1928], [238, 1819]]],
        "subname": "",
        "relatedLocations": [21, 20]
    }
};
