'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Message,
  Genre,
  Favorite,
  Chat
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = [
    {
      firstName: 'Tobie',
      lastName: 'Ahrens',
      email: 'tahrens0@usda.gov',
      password: 'U1WHr0',
      zipCode: 10128
    },
    {
      firstName: 'Doretta',
      lastName: 'Camoletto',
      email: 'dcamoletto1@odnoklassniki.ru',
      password: 'rnEmVrgIr',
      zipCode: 10014
    },
    {
      firstName: 'Clement',
      lastName: 'Petruskevich',
      email: 'cpetruskevich2@mac.com',
      password: 'XzK4gezebv6',
      zipCode: 10012
    },
    {
      firstName: 'Tiffany',
      lastName: 'Feye',
      email: 'tfeye3@mtv.com',
      password: 'SkhyqqvwO',
      zipCode: 10128
    },
    {
      firstName: 'Gretchen',
      lastName: 'Fowlie',
      email: 'gfowlie4@hubpages.com',
      password: 'cP9HOvsjo',
      zipCode: 10012
    },
    {
      firstName: 'Mercie',
      lastName: 'Bounds',
      email: 'mbounds5@boston.com',
      password: 'KfOBBTeBpvFS',
      zipCode: 10128
    },
    {
      firstName: 'Georgeanna',
      lastName: 'Rubinshtein',
      email: 'grubinshtein6@xing.com',
      password: '733iWK',
      zipCode: 10014
    },
    {
      firstName: 'Tarrance',
      lastName: 'McArte',
      email: 'tmcarte7@abc.net.au',
      password: 'rFnpeSTvCo',
      zipCode: 10008
    },
    {
      firstName: 'Babita',
      lastName: 'Clifft',
      email: 'bclifft8@twitpic.com',
      password: 'W7UiNxX',
      zipCode: 10008
    },
    {
      firstName: 'Petra',
      lastName: 'Toretta',
      email: 'ptoretta9@springer.com',
      password: 'bcqYPtca',
      zipCode: 10014
    },
    {
      firstName: 'Maxim',
      lastName: 'Maybery',
      email: 'mmayberya@goo.ne.jp',
      password: 'wiBy9Bft1',
      zipCode: 10128
    },
    {
      firstName: 'Cherise',
      lastName: 'Bennet',
      email: 'cbennetb@yolasite.com',
      password: 'a3yBhDq',
      zipCode: 10012
    },
    {
      firstName: 'Georgeanne',
      lastName: 'Skatcher',
      email: 'gskatcherc@ox.ac.uk',
      password: 'DS5AgFHq',
      zipCode: 10128
    },
    {
      firstName: 'Deina',
      lastName: 'Caitlin',
      email: 'dcaitlind@indiatimes.com',
      password: 'XeVlgjtDo',
      zipCode: 10014
    },
    {
      firstName: 'Bailie',
      lastName: 'Scriver',
      email: 'bscrivere@nbcnews.com',
      password: 'k5TDztv8MdW',
      zipCode: 10008
    },
    {
      firstName: 'Job',
      lastName: 'Paynter',
      email: 'jpaynterf@amazon.co.uk',
      password: 'Esa0BaY',
      zipCode: 10008
    },
    {
      firstName: 'Ashely',
      lastName: 'Ludvigsen',
      email: 'aludvigseng@theatlantic.com',
      password: 'FNV2YgSwh7',
      zipCode: 10012
    },
    {
      firstName: 'Saidee',
      lastName: 'Pickaver',
      email: 'spickaverh@salon.com',
      password: 'i0qOZr',
      zipCode: 10014
    },
    {
      firstName: 'Siouxie',
      lastName: 'Rasor',
      email: 'srasori@dell.com',
      password: 'TL4S3KaBKx',
      zipCode: 10036
    },
    {
      firstName: 'Maurits',
      lastName: 'Askew',
      email: 'maskewj@sun.com',
      password: 'k6sLTqYKK2',
      zipCode: 10036
    },
    {
      firstName: 'Odessa',
      lastName: 'Halsworth',
      email: 'ohalsworthk@tumblr.com',
      password: 'YyoAEkKbWR',
      zipCode: 10036
    },
    {
      firstName: 'Northrup',
      lastName: 'Viveash',
      email: 'nviveashl@bloglines.com',
      password: 'MlKmv72Re',
      zipCode: 10036
    },
    {
      firstName: 'Quinton',
      lastName: 'Frany',
      email: 'qfranym@soundcloud.com',
      password: 'Ukq2HU0fiF',
      zipCode: 10036
    },
    {
      firstName: 'Odey',
      lastName: 'Hatton',
      email: 'ohattonn@ustream.tv',
      password: 'gfhArxvH',
      zipCode: 10128
    },
    {
      firstName: 'Timi',
      lastName: "O'Scanlan",
      email: 'toscanlano@sciencedaily.com',
      password: 'mdC6zQyu',
      zipCode: 10014
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
    {category: 'Childrens'}
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
      transactionComplete: false,
      sellerId: null,
      buyerId: 1,
      genreId: [thrillerMystery.id]
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
      transactionComplete: false,
      buyerId: 2,
      sellerId: null,
      genreId: [history.id]
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
      transactionComplete: false,
      buyerId: 3,
      sellerId: null,
      genreId: [fantasyAdventure.id]
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
      transactionComplete: false,
      buyerId: 4,
      sellerId: null,
      genreId: [children.id]
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
      transactionComplete: false,
      buyerId: 5,
      sellerId: null,
      genreId: [thrillerMystery.id]
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
      transactionComplete: false,
      buyerId: 6,
      sellerId: null,
      genreId: [scienceFictionDystopian.id]
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
      transactionComplete: false,
      buyerId: 7,
      sellerId: null,
      genreId: [romance.id]
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
      transactionComplete: false,
      buyerId: 8,
      sellerId: null,
      genreId: [memoir.id]
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
      transactionComplete: false,
      buyerId: 9,
      sellerId: null,
      genreId: [developmentHowToEducation.id]
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
      canBargain: True,
      transactionComplete: false,
      buyerId: 10,
      sellerId: null,
      genreId: [humor.id]
    }
  ]
  const createdProducts = await Product.bulkCreate(products)
  console.log(green('Seeded products'))

  // Genre/Products
  const flattenProductGenres = products => {
    const productGenres = []

    return products.reduce((acc, currProduct, idx) => {
      const currProductGenres = currProduct.genreIds.map(genreId => {
        return {productId: idx + 1, genreId}
      })

      return acc.concat(currProductGenres)
    }, productGenres)
  }
  const productGenres = flattenProductGenres(products)
  await ProductGenre.bulkCreate(productGenres)
  console.log(green('Seeded product_genres'))
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
