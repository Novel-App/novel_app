'use strict'

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
      firstName: 'Tobie',
      lastName: 'Ahrens',
      email: 'tahrens0@usda.gov',
      password: 'U1WHr0',
      coordinates: [40.726096, -73.984152]
    },
    {
      firstName: 'Doretta',
      lastName: 'Camoletto',
      email: 'dcamoletto1@odnoklassniki.ru',
      password: 'rnEmVrgIr',
      coordinates: [40.919913, -74.814766]
    },
    {
      firstName: 'Clement',
      lastName: 'Petruskevich',
      email: 'cpetruskevich2@mac.com',
      password: 'XzK4gezebv6',
      coordinates: [43.621196, -84.682435]
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
    {isFiction: true, category: 'Fantasy/Adventure'},
    {isFiction: true, category: 'Romance'},
    {isFiction: true, category: 'Thriller/Mystery'},
    {isFiction: true, category: 'Science Fiction/Dystopian'},
    {isFiction: false, category: 'Memoir'},
    {isFiction: false, category: 'History'},
    {isFiction: false, category: 'Lifestyle'},
    {isFiction: false, category: 'Development/How-To/Education'},
    {isFiction: true, category: 'Humor'},
    {isFiction: true, category: 'Childrens'}
  ]

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
    childrens
  ] = await Genre.bulkCreate(genres)
  console.log('Seeded genres')
  console.log('dev id!', developmentHowToEducation.id)
  const products = [
    {
      title: 'Little Fires Everywhere',
      author: 'Celeste Ng',
      ISBN: '0735224293',
      description:
        'Little Fires Everywhere is a 2017 novel by American author Celeste Ng. It is her second novel and takes place in Shaker Heights, Ohio, where Ng grew up.',
      image: 'https://pictures.abebooks.com/inventory/md/md30853210698.jpg',
      condition: 'Like New',
      numFavorites: 2,
      price: 14,
      canBargain: false,
      availability: 'Available',
      sellerId: 1,
      buyerId: null,
      genreId: thrillerMystery.id
    },
    {
      title: 'We Were the Lucky Ones',
      author: 'Georgia Hunter',
      ISBN: '0399563091',
      description:
        'Inspired by the incredible true story of one Jewish family separated at the start of World War II, determined to survive—and to reunite—We Were the Lucky Ones is a tribute to the triumph of hope and love against all odds.',
      image: 'https://pictures.abebooks.com/inventory/md/md30568451278.jpg',
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
      image: 'https://pictures.abebooks.com/inventory/md/md21556602983.jpg',
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
      image: 'https://pictures.abebooks.com/inventory/md/md30346052192.jpg',
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
      image: 'https://pictures.abebooks.com/inventory/md/md1090740259.jpg',
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
      description: 'The fourth and last book in the Odyssey series.',
      image: 'https://pictures.abebooks.com/inventory/md/md30800602444.jpg',
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
      image: 'https://pictures.abebooks.com/inventory/md/md3870823688.jpg',
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
      image: 'https://pictures.abebooks.com/inventory/md/md30863319630.jpg',
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
      ISBN: '0844290432',
      description: 'Guide to Amsterdam',
      image: 'https://pictures.abebooks.com/isbn/9780844290430-us.jpg',
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
      image: 'https://pictures.abebooks.com/inventory/md/md8655857930.jpg',
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
      image: 'https://pictures.abebooks.com/inventory/md/md30310824446.jpg',
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
      image: 'https://pictures.abebooks.com/inventory/md/md30744350421.jpg',
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
      image: 'https://pictures.abebooks.com/inventory/md/md30472342163.jpg',
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
      image: 'https://pictures.abebooks.com/inventory/md/md22878683997.jpg',
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
      image: 'https://pictures.abebooks.com/inventory/md/md30616504538.jpg',
      condition: 'Good',
      numFavorites: 0,
      price: 9,
      canBargain: true,
      availability: 'Available',
      buyerId: null,
      sellerId: 2,
      genreId: humor.id
    }
  ]
  const createdProducts = await Product.bulkCreate(products)
  console.log('Seeded products')
  // Genre/Products
  // const flattenProductGenres = products => {
  //   const productGenres = []

  //   return products.reduce((acc, currProduct, idx) => {
  //     console.log("currentProduct -->",currProduct)
  //     const currProductGenres = currProduct.map(product => {
  //       const genreId = product.genreId
  //       return {productId: idx + 1, genreId}
  //     })

  //     return acc.concat(currProductGenres)
  //   }, productGenres)
  // }
  // const productGenres = flattenProductGenres(products)
  // console.log('Seeded product_genres')
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
