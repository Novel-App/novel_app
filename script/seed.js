'use strict'

// const {ForeignKeyConstraintError} = require('sequelize/types')
const db = require('../server/db')
const {
  User,
  Product,
  Message,
  Review,
  Genre,
  Favorite,
  Chat
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = [
    {
      firstName: 'Cody',
      lastName: 'Pug',
      email: 'cody@gmail.com',
      password: 'cody123',
      coordinates: [40.726096, -73.984152]
    },
    {
      firstName: 'Toby',
      lastName: 'Ahrens',
      email: 'toby@gmail.com',
      password: 'toby123',
      coordinates: [40.726096, -73.984152]
    },
    {
      firstName: 'Doretta',
      lastName: 'Camoletto',
      email: 'dcamoletto1@odnoklassniki.ru',
      password: 'rnEmVrgIr',
      coordinates: [40.726096, -73.984152]
    },
    {
      firstName: 'Clement',
      lastName: 'Petruskevich',
      email: 'cpetruskevich2@mac.com',
      password: 'XzK4gezebv6',
      coordinates: [40.726096, -73.984152]
    },
    {
      firstName: 'Tiffany',
      lastName: 'Feye',
      email: 'tfeye3@mtv.com',
      password: 'SkhyqqvwO',
      coordinates: [43.622442, -84.655136]
    },
    {
      firstName: 'Gretchen',
      lastName: 'Fowlie',
      email: 'gfowlie4@hubpages.com',
      password: 'cP9HOvsjo',
      coordinates: [28.382407, -81.561708]
    },
    {
      firstName: 'Mercie',
      lastName: 'Bounds',
      email: 'mbounds5@boston.com',
      password: 'KfOBBTeBpvFS',
      coordinates: [28.384825, -81.5472]
    },
    {
      firstName: 'Georgeanna',
      lastName: 'Rubinshtein',
      email: 'grubinshtein6@xing.com',
      password: '733iWK',
      coordinates: [28.386581, -81.56003]
    },
    {
      firstName: 'Tarrance',
      lastName: 'McArte',
      email: 'tmcarte7@abc.net.au',
      password: 'rFnpeSTvCo',
      coordinates: [37.511104, -127.098233]
    },
    {
      firstName: 'Babita',
      lastName: 'Clifft',
      email: 'bclifft8@twitpic.com',
      password: 'W7UiNxX',
      coordinates: [37.511104, 127.098233]
    },
    {
      firstName: 'Petra',
      lastName: 'Toretta',
      email: 'ptoretta9@springer.com',
      password: 'bcqYPtca',
      coordinates: [37.514931, 127.105153]
    },
    {
      firstName: 'Maxim',
      lastName: 'Maybery',
      email: 'mmayberya@goo.ne.jp',
      password: 'wiBy9Bft1',
      coordinates: [39.3438277, -84.2658113]
    },
    {
      firstName: 'Cherise',
      lastName: 'Bennet',
      email: 'cbennetb@yolasite.com',
      password: 'a3yBhDq',
      coordinates: [39.34279399764515, -84.25989403259177]
    },
    {
      firstName: 'Georgeanne',
      lastName: 'Skatcher',
      email: 'gskatcherc@ox.ac.uk',
      password: 'DS5AgFHq',
      coordinates: [40.1343634, -74.4416524]
    },
    {
      firstName: 'Deina',
      lastName: 'Caitlin',
      email: 'dcaitlind@indiatimes.com',
      password: 'XeVlgjtDo',
      coordinates: [40.13600502765449, -74.43409303394144]
    },
    {
      firstName: 'Bailie',
      lastName: 'Scriver',
      email: 'bscrivere@nbcnews.com',
      password: 'k5TDztv8MdW',
      coordinates: [40.13600502765449, -74.43409303394145]
    },
    {
      firstName: 'Job',
      lastName: 'Paynter',
      email: 'jpaynterf@amazon.co.uk',
      password: 'Esa0BaY',
      coordinates: [28.4772482, 81.4697068]
    },
    {
      firstName: 'Ashely',
      lastName: 'Ludvigsen',
      email: 'aludvigseng@theatlantic.com',
      password: 'FNV2YgSwh7',
      coordinates: [28.4772482, 81.469707]
    },
    {
      firstName: 'Saidee',
      lastName: 'Pickaver',
      email: 'spickaverh@salon.com',
      password: 'i0qOZr',
      coordinates: [44.8550204, -93.2421195]
    },
    {
      firstName: 'Siouxie',
      lastName: 'Rasor',
      email: 'srasori@dell.com',
      password: 'TL4S3KaBKx',
      coordinates: [44.85431899035432, -93.23840165446136]
    },
    {
      firstName: 'Maurits',
      lastName: 'Askew',
      email: 'maskewj@sun.com',
      password: 'k6sLTqYKK2',
      coordinates: [44.85431899035432, -93.23840165446138]
    },
    {
      firstName: 'Odessa',
      lastName: 'Halsworth',
      email: 'ohalsworthk@tumblr.com',
      password: 'YyoAEkKbWR',
      coordinates: [44.85431899035432, -93.23840165446134]
    },
    {
      firstName: 'Northrup',
      lastName: 'Viveash',
      email: 'nviveashl@bloglines.com',
      password: 'MlKmv72Re',
      coordinates: [40.7484284, 73.9856546]
    },
    {
      firstName: 'Quinton',
      lastName: 'Frany',
      email: 'qfranym@soundcloud.com',
      password: 'Ukq2HU0fiF',
      coordinates: [40.7484284, 73.9856545]
    },
    {
      firstName: 'Odey',
      lastName: 'Hatton',
      email: 'ohattonn@ustream.tv',
      password: 'gfhArxvH',
      coordinates: [40.7484284, 73.9856548]
    },
    {
      firstName: 'Timi',
      lastName: "O'Scanlan",
      email: 'toscanlano@sciencedaily.com',
      password: 'mdC6zQyu',
      coordinates: [40.7484284, 73.9856542]
    }
  ]
  const [tobie, doretta, clement, tiffany, gretchen] = await User.bulkCreate(
    users,
    {returning: ['id']}
  )
  console.log('Seeded users')

  //Genre
  const genres = [
    {category: 'Fantasy/Adventure'},
    {category: 'Romance'},
    {category: 'Thriller/Mystery'},
    {category: 'Science Fiction/Dystopian'},
    {category: 'Memoir'},
    {category: 'History'},
    {category: 'Lifestyle'},
    {category: 'Development/How-To/Education'},
    {category: 'Humor'},
    {category: 'Childrens'},
    {category: 'Fiction'}
  ]
  const bulkCreateContent = await Genre.bulkCreate(genres)

  const [
    fantasyAdventure,
    romance,
    thrillerMystery,
    scienceFictionDystopian,
    memoir,
    history,
    lifestyle,
    developmentHowToEducation,
    humor,
    childrens,
    fiction
  ] = await Genre.findAll()
  console.log('Seeded genres')
  const products = [
    {
      title: 'Little Fires Everywhere',
      author: 'Celeste Ng',
      ISBN: '0735224293',
      description:
        'Little Fires Everywhere is a 2017 novel by American author Celeste Ng. It is her second novel and takes place in Shaker Heights, Ohio, where Ng grew up.',
      isFiction: true,
      image: [
        'https://pictures.abebooks.com/inventory/md/md30853210698.jpg',
        'https://cdn.thefashionmagpie.com/wp-content/uploads/2018/04/little-fires-everywhere-celeste-ng-best-instagrams-735x565.jpeg',
        'https://i.ebayimg.com/images/g/vsYAAOSwCl9fXUp3/s-l1600.jpg'
      ],
      condition: 'Like New',
      numFavorites: 2,
      price: 14,
      canBargain: false,
      availability: 'Available',
      sellerId: 1,
      buyerId: null,
      genreId: fiction.id
    },
    {
      title: 'We Were the Lucky Ones',
      author: 'Georgia Hunter',
      ISBN: '0399563091',
      description:
        'Inspired by the incredible true story of one Jewish family separated at the start of World War II, determined to survive—and to reunite—We Were the Lucky Ones is a tribute to the triumph of hope and love against all odds.',
      isFiction: true,
      image: [
        'https://pictures.abebooks.com/inventory/md/md30568451278.jpg',
        'https://i1.wp.com/www.globolibri.it/wp-content/uploads/2020/01/we-were-the-lucky-ones-hunter-retro.jpg?fit=600%2C927&ssl=1'
      ],
      condition: 'Good',
      numFavorites: 1,
      price: 10,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 2,
      genreId: history.id
    },
    {
      title: 'The Dark is Rising',
      author: 'Susan Cooper',
      ISBN: '0689851952',
      description:
        'On the Midwinter Day that is his eleventh birthday, Will Stanton discovers a special gift--he is the last of the Old Ones, immortals dedicated to keeping the world from dominations by the forces of evil, the Dark. At once, he is plunged into a quest for the six magical Signs that will one day and the Old Ones in the final battle between the Dark and the Light. And for the twelve days of Christmas, while the Dark is rising, life for Will is fill of wonder, terror, and delight.',
      isFiction: true,
      image: [
        'https://pictures.abebooks.com/inventory/md/md21556602983.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/51X8qP9CWGL.jpg'
      ],
      condition: 'Loved',
      numFavorites: 4,
      price: 8,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 3,
      genreId: fantasyAdventure.id
    },
    {
      title: 'I am a Bunny',
      author: 'Richard Scarry',
      ISBN: '0375827781',
      description:
        'Cuddle up with Nicholas the bunny in Richard Scarrys beloved classic.',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md30346052192.jpg'],
      condition: 'Loved',
      numFavorites: 0,
      price: 4,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 4,
      genreId: childrens.id
    },
    {
      title: 'The Agatha Christie Hour',
      author: 'Agatha Christie',
      ISBN: '0002313316',
      description:
        'Collection of short stories, these stories were selected for television.',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md1090740259.jpg'],
      condition: 'Good',
      numFavorites: 0,
      price: 10,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 5,
      genreId: thrillerMystery.id
    },
    {
      title: '3001: The Final Odyssey',
      author: 'Arthur C. Clarke',
      ISBN: '0345315227',
      isFiction: true,
      description: 'The fourth and last book in the Odyssey series.',
      image: [
        'https://pictures.abebooks.com/inventory/md/md30800602444.jpg',
        'https://www.prestoimages.net/store30/rd10459/10459_pd1777611_2.jpg'
      ],
      condition: 'Like New',
      numFavorites: 0,
      price: 20,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 6,
      genreId: scienceFictionDystopian.id
    },
    {
      title: 'Kathleen',
      author: 'Francine Rivers',
      ISBN: '0515047260',
      description:
        'A GLITTERING CENTURY WAS ABOUT TO END . . . AND SO WAS KATHLEENS INNOCENCE!',
      isFiction: true,
      image: [
        'https://pictures.abebooks.com/inventory/md/md3870823688.jpg',
        'https://g.christianbook.com/g/slideshow/5/525132/main/525132_99_bkc.jpg'
      ],
      condition: 'Aged',
      numFavorites: 1,
      price: 3,
      canBargain: true,
      availability: 'Reserved',
      buyerId: null,
      sellerId: 7,
      genreId: romance.id
    },
    {
      title: 'The Path to Power',
      author: 'Margaret Thatcher',
      ISBN: '0002550504',
      description:
        'Margaret Thatchers government was, she says, about the application of a philosophy, not the implementation of an administrative programme.',
      isFiction: false,
      image: ['https://pictures.abebooks.com/inventory/md/md30863319630.jpg'],
      condition: 'Like New',
      numFavorites: 0,
      price: 15,
      canBargain: false,
      availability: 'Reserved',
      buyerId: null,
      sellerId: 8,
      genreId: memoir.id
    },
    {
      title: 'Passports Illustrated Travel Guide to Amsterdam',
      author: 'Thomas Cook',
      isFiction: false,
      ISBN: '0844290432',
      description: 'Guide to Amsterdam',
      image: ['https://pictures.abebooks.com/isbn/9780844290430-us.jpg', ''],
      condition: 'Loved',
      numFavorites: 0,
      price: 2,
      canBargain: false,
      availability: 'Reserved',
      buyerId: null,
      sellerId: 9,
      genreId: lifestyle.id
    },
    {
      title: 'In Search of the Far Side',
      author: 'Gary Larson',
      ISBN: '0844290432',
      description: 'Book of Far Side Cartoons',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md8655857930.jpg'],
      condition: 'Loved',
      numFavorites: 0,
      price: 6,
      canBargain: true,
      availability: 'Sold',
      buyerId: null,
      sellerId: 10,
      genreId: humor.id
    },
    {
      title: 'Building Node Applications with MongoDB and Backbone',
      author: 'Mike Wilson',
      ISBN: '1449337392',
      description:
        'Building Node Applications with MongoDB and Backbone The enthusiasm behind Node does not just reflect the promise of server side JavaScript. Developers also have the potential to create elegant applications with this open source framework that are much easier to maintain.',
      isFiction: false,
      image: ['https://pictures.abebooks.com/inventory/md/md30310824446.jpg'],
      condition: 'Loved',
      numFavorites: 0,
      price: 3,
      canBargain: true,
      availability: 'Sold',
      buyerId: null,
      sellerId: 14,
      genreId: developmentHowToEducation.id
    },
    {
      title: 'The Thursday Murder Club',
      author: 'Richard Osman',
      ISBN: '0241425441',
      description:
        'Record-breaking Sunday Times Number One Bestseller. Great series!',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md30744350421.jpg'],
      condition: 'Like New',
      numFavorites: 0,
      price: 12,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 2,
      genreId: thrillerMystery.id
    },
    {
      title: 'Vienna, 1890-1920',
      author: 'Hans Bisanz',
      ISBN: '0914427075',
      description: 'Book on Vienna',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md30472342163.jpg'],
      condition: 'Loved',
      numFavorites: 0,
      price: 5,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 2,
      genreId: history.id
    },
    {
      title: 'The Fifth Elephant',
      author: 'Terry Pratchett',
      ISBN: '0385409958',
      description:
        'A new stage adaptation of one of Pratchetts best-selling novels Commander Vimes is sent to wild, wintry and Transylvania-like Uberwald to establish trade links with the King of the Dwarfs but he ends up trying to stop and inter-species war.',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md22878683997.jpg'],
      condition: 'Good',
      numFavorites: 0,
      price: 7,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 2,
      genreId: fantasyAdventure.id
    },
    {
      title: 'In A Sunburnt Country',
      author: 'Bill Bryson',
      ISBN: '0767903862',
      description:
        'Every time Bill Bryson walks out the door, memorable travel literature threatens to break out. This time in Australia.',
      isFiction: false,
      image: ['https://pictures.abebooks.com/inventory/md/md30616504538.jpg'],
      condition: 'Good',
      numFavorites: 0,
      price: 9,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 2,
      genreId: humor.id
    },
    {
      title: 'The Da Vinci Code',
      author: 'Dan Brown',
      ISBN: '0385504209',
      description:
        'A first printing of Browns best-seller about Robert Langdons search to crack a codex discovered near the body of a murdered curator of the Louvre, adapted into the 2006 Ron Howard film starring Tom Hanks and Audrey Tautou.',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md30524810640.jpg'],
      condition: 'Like New',
      numFavorites: 0,
      price: 25,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 4,
      genreId: thrillerMystery.id
    },
    {
      title: 'The Girl on the Train',
      author: 'Paula Hawkins',
      ISBN: '9781594633669',
      description: 'Nice copy of the runaway best-seller.',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md22674753875.jpg'],
      condition: 'Like New',
      numFavorites: 0,
      price: 25,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 3,
      genreId: thrillerMystery.id
    },
    {
      title: 'Cold Mountain',
      author: 'Charles Frazier',
      ISBN: '9780340680599',
      description:
        'Frazier s first book, set in the Appalachian Mountains at end of the Civil War, was a runaway best seller.',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md17813966474.jpg'],
      condition: 'Good',
      numFavorites: 0,
      price: 25,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 4,
      genreId: fiction.id
    },
    {
      title: 'Hotel on the Corner of Bitter and Sweet',
      author: 'Jamie Ford',
      ISBN: '9780345505330',
      description:
        'A nice pre-publication copy of Fords best-seller about a friendship between a Chinese-American boy and a Japanese-American girl in a World War II internment camp.',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md30130529153.jpg'],
      condition: 'Loved',
      numFavorites: 0,
      price: 15,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 3,
      genreId: fiction.id
    },
    {
      title: 'Molly the Marine',
      author: 'Pat White',
      ISBN: '1633372537',
      description:
        'Molly the Marine talks about just a few of the jobs that are available in the United States Marine Corps. The book encourages girls to believe in themselves and work together. Together we can change the world. ',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md30687498269.jpg'],
      condition: 'Good',
      numFavorites: 0,
      price: 16,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 4,
      genreId: childrens.id
    },
    {
      title: 'The Best of Annie Lennox',
      author: 'Hal Leonard',
      ISBN: '0793567270',
      description: 'Bipgraphy of Annie Lennox',
      isFiction: false,
      image: ['https://pictures.abebooks.com/inventory/md/md30543003517.jpg'],
      condition: 'Like New',
      numFavorites: 0,
      price: 18,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 3,
      genreId: memoir.id
    },
    {
      title: 'Women Without Men',
      author: 'Reed Marr',
      ISBN: '9788881588060',
      description:
        'Women Without Men is notable for being one of the 10 paperback best-sellers of 1957',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md30819865579.jpg'],
      condition: 'Loved',
      numFavorites: 0,
      price: 20,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 4,
      genreId: fiction.id
    },
    {
      title: 'Lord Of Thunder : Ace G-691',
      author: 'Andre Norton',
      ISBN: '9781511385718',
      description:
        'This is one of Andre Nortons Beast Master / Hosteen Storm Books.',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md30838685103.jpg'],
      condition: 'Loved',
      numFavorites: 0,
      price: 21,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 3,
      genreId: scienceFictionDystopian.id
    },
    {
      title: 'Battlefield Earth',
      author: 'L Ron Hubbard',
      ISBN: '1592129579',
      description:
        'In response to the Voyager launched in 1977, an alien race, the Psychlos, remorselessly wiped out the humans with a poisonous gas barrage, and ground and air bombings. They killed more than 99.9% of the people on Earth, not to mention their sadistic hunting sprees of people for pure pleasure for the ensuing 1,000 years. ',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md30380200847.jpg'],
      condition: 'Loved',
      numFavorites: 0,
      price: 22,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 4,
      genreId: scienceFictionDystopian.id
    },
    {
      title: 'The Kite Runner',
      author: 'Khaled Hosseini',
      ISBN: '9781408217290',
      description:
        'Taking us from Afghanistan in the final days of the monarchy to the present, The Kite Runner is the unforgettable and beautifully told story of the friendship between two boys growing up in Kabul. ',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md22608690491.jpg'],
      condition: 'Good',
      numFavorites: 0,
      price: 24,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 3,
      genreId: fiction.id
    },
    {
      title: 'Lost Horizon',
      author: 'James Hilton',
      ISBN: '9780671783075',
      description:
        'Flying out of India, a light aircraft is hi-jacked and flown into the high Tibetan Himalayas. The passengers on board anxiously await their fate, among them Conway, a talented British consul. But on landing they are unexpectedly conducted to a remote valley, a legendary paradise of peace and beauty, known as Shangri-La.',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md22671737075.jpg'],
      condition: 'Loved',
      numFavorites: 0,
      price: 24,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 4,
      genreId: thrillerMystery.id
    },
    {
      title: 'Outrageous Acts and Everyday Rebellions',
      author: 'Gloria Steinam',
      ISBN: '9780805042023',
      description: 'Signed by author',
      isFiction: false,
      image: ['https://pictures.abebooks.com/inventory/md/md1306399868.jpg'],
      condition: 'Good',
      numFavorites: 0,
      price: 24,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 3,
      genreId: memoir.id
    },
    {
      title: 'The Crooked Road',
      author: 'Morris West',
      ISBN: '9780553234831',
      description:
        'An exciting novel about an American newspaperman fighting for his big story in the turbulence of Italian political intrigue.',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md30808488658.jpg'],
      condition: 'Loved',
      numFavorites: 0,
      price: 23,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 4,
      genreId: fiction.id
    },
    {
      title: 'Emily and Alice, Best Friends',
      author: 'Joyce Champion',
      ISBN: '9780152021986',
      description:
        'When rainy days and sick stuffed animals test Emily and Alices friendship, the girls learn that being a best friend isnt always as fun as eating cookies.',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md30280645139.jpg'],
      condition: 'Like New',
      numFavorites: 0,
      price: 2,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 3,
      genreId: childrens.id
    },
    {
      title: 'Sword and Sorceress II',
      author: 'Marion Zimmer Bradley',
      ISBN: '9780886770419',
      description:
        'What better guide could there be through the realms of witchery and wonder, of combat and danger, of romance and magic than the hand and mind of Marion Zimmer Bradley, author of best-sellers CITY OF SORCERY, THENDARA HOUSE and MISTS OF AVALON?',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md30508944456.jpg'],
      condition: 'Loved',
      numFavorites: 0,
      price: 4,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 4,
      genreId: scienceFictionDystopian.id
    },
    {
      title: 'Men: An Owners Manual',
      author: 'Stephanie Brush',
      ISBN: '9780671604134',
      description:
        'The hilarious best-seller tells you what they are, where to get them, what to call them, and whether to keep them!.',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md867391491.jpg'],
      condition: 'Loved',
      numFavorites: 0,
      price: 5,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 3,
      genreId: humor.id
    },
    {
      title: 'How to Be Your Own Nutritionist',
      author: 'Stuart Berger',
      ISBN: '9780380703180',
      description:
        'Only read once, looks nice From Library Journal: "Berger is the Park Avenue physician/nutritionist who wrote last years best seller The Immune Power Diet.',
      isFiction: false,
      image: ['https://pictures.abebooks.com/inventory/md/md867392025.jpg'],
      condition: 'New',
      numFavorites: 0,
      price: 5,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 4,
      genreId: developmentHowToEducation.id
    },
    {
      title:
        'Havana Nocturne: How the Mob Owned Cuba and Then Lost It to the Revolution',
      author: 'T.J. English',
      ISBN: '9780061712746',
      description:
        'Mob dreams collided with those of Fidel Castro, Che Guevara, and others who would lead an uprising of the countrys disenfranchised against Batistas hated government and its foreign partners—an epic cultural battle that bestselling author T. J. English captures here in all its sexy, decadent, ugly glory.',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md30832707023.jpg'],
      condition: 'Loved',
      numFavorites: 0,
      price: 4,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 3,
      genreId: scienceFictionDystopian.id
    },
    {
      title: 'Creative Winemaking',
      author: 'Andre de Chambeau',
      ISBN: '9780317119848',
      description: 'How to for winemaking',
      isFiction: false,
      image: ['https://pictures.abebooks.com/inventory/md/md30021310765.jpg'],
      condition: 'Loved',
      numFavorites: 0,
      price: 2,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 4,
      genreId: developmentHowToEducation.id
    },
    {
      title: 'The Biggest, Best Snowman',
      author: 'Margery Cuyler',
      ISBN: '9780439669405',
      description: 'Dog eared at corners : Minimal edge and spine scuffing',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md20747824317.jpg'],
      condition: 'Good',
      numFavorites: 0,
      price: 3,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 3,
      genreId: childrens.id
    },
    {
      title: 'Remembrance: A Novel',
      author: 'Danielle Steel',
      ISBN: '9780440173700',
      description:
        'different cover markings first page some self wear spine and binding good tiny creases tiny corner peel tiny corner crease back cover light readers crease tiny corner creases',
      isFiction: true,
      image: ['https://pictures.abebooks.com/inventory/md/md30607256535_2.jpg'],
      condition: 'Loved',
      numFavorites: 0,
      price: 3,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 4,
      genreId: romance.id
    }
  ]
  const createdProducts = await Product.bulkCreate(products)
  console.log('Seeded products')

  //Reviews
  const reviews = [
    {
      rating: 1,
      userId: 1,
      reviewerId: 3
    },
    {
      rating: 1,
      userId: 3,
      reviewerId: 1
    },
    {
      rating: 5,
      userId: 1,
      reviewerId: 5
    },
    {
      rating: 5,
      userId: 5,
      reviewerId: 1
    },
    {
      rating: 3,
      userId: 2,
      reviewerId: 1
    },
    {
      rating: 3,
      userId: 1,
      reviewerId: 2
    },
    {
      rating: 4,
      userId: 6,
      reviewerId: 1
    }
  ]
  const createReviews = await Review.bulkCreate(reviews)
  console.log('Seeded reviews')

  //chats
  const chats = [
    {
      productId: 1,
      browserId: 10
    },
    {
      productId: 2,
      browserId: 5
    },
    {
      productId: 3,
      browserId: 5
    },
    {
      productId: 1,
      browserId: 15
    }
  ]
  const createChats = await Chat.bulkCreate(chats)
  console.log('Seeded chats')
  //messages
  const messages = [
    {
      content: 'Is this still available?',
      authorId: 10,
      chatId: 1
    },
    {
      content: 'Hey can I buy this?',
      authorId: 5,
      chatId: 2
    },
    {
      content: 'Love this book!',
      unread: false,
      authorId: 5,
      chatId: 3
    },
    {
      content: 'Same! Are you looking to buy this?',
      authorId: 3,
      chatId: 3
    },
    {
      content: 'Can we bargain?',
      authorId: 15,
      chatId: 4
    }
  ]
  const createMessages = await Message.bulkCreate(messages)
  console.log('Seeded messages')
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
