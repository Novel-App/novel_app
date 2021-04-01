const router = require('express').Router()
const {User, Product} = require('../db/models')
const currentUserOnly = require('../utils/currentUserOnly')
const upload = require('../utils/photoUpload')
module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'profileImage',
        'reviewScore',
        'photoVerified',
        'emailVerified',
        'locationVerified'
      ]
    })
    res.status(200).send(users)
  } catch (err) {
    next(err)
  }
})

// GET single User
// GET /api/users/:userId
router.get('/:userId', currentUserOnly, async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'profileImage',
        'reviewScore',
        'photoVerified',
        'emailVerified',
        'locationVerified'
      ],
      where: {id: req.params.userId}
    })
    if (!user) {
      res.status(404).send('This user does not exist!')
    }
    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
})

// PUT api/users
router.put('/:userId', currentUserOnly, async (req, res, next) => {
  try {
    // console.log('req.file ===>', req.file)
    const user = await User.findByPk(req.params.userId)
    if (!user) res.send('This user does not exist.')
    const updatedUser = await user.update(req.body)
    res.status(201).send(updatedUser)
  } catch (err) {
    next(err)
  }
})

// get all available / reserved / sold listings by user (for profile)
// GET api/users/:sellerId/listings/:availability
// req.params.availability options: ["available", "reserved", "sold"]
router.get(
  '/:userId/listings/:availability',
  currentUserOnly,
  async (req, res, next) => {
    try {
      const listings = await Product.findAll({
        where: {
          availability: req.params.availability,
          sellerId: req.params.userId
        }
      })
      res.status(200).send(listings)
    } catch (err) {
      next(err)
    }
  }
)

// get all purchases by user
// GET api/users/:buyerId/purchases
router.get('/:userId/purchases', currentUserOnly, async (req, res, next) => {
  try {
    const purchases = await Product.findAll({
      where: {
        buyerId: req.params.userId
      }
    })
    res.status(200).send(purchases)
  } catch (err) {
    next(err)
  }
})

// get all favorites by users
// GET api/users/:userId/favorites
router.get('/:userId/favorites', currentUserOnly, async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: {model: User, where: {id: req.params.userId}}
    })
    const faves = products.filter(
      product => product.users[0].favorite.isFavorite === true
    )
    // const products = await Product.getFavorites(req.params.userId)
    res.status(200).send(faves)
  } catch (err) {
    next(err)
  }
})

// POST api/users/:userId/upload
router.post('/upload/:userId', upload.single('wallpaper'), async function(
  req,
  res,
  next
) {
  try {
    const imagePath = await req.file.path.replace(/^public\//, '')
    console.log('post route!!!')
    res.redirect(imagePath)
    // res.send(req.file)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
