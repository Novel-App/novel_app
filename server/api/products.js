const router = require('express').Router()
const {Product, User, Genre, Favorite} = require('../db/models')
const upload = require('../utils/photoUpload')
module.exports = router

// GET /api/products
// filters by user location & availability
router.get('/status/:availability', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      where: {
        availability: req.params.availability
      },
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'firstName', 'coordinates', 'reviewScore']
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['id', 'firstName', 'reviewScore']
        },
        {model: Genre}
      ]
    })
    const filteredProducts = Product.filterByLocation(allProducts, req.user)
    res.status(200).send(filteredProducts)
  } catch (error) {
    next(error)
  }
})

router.post('/', upload.array('productImg', 4), async (req, res, next) => {
  try {
    let imagePaths = req.files.map(file => file.path.replace(/^public\//, ''))

    const newProduct = await Product.create(
      {...req.body, image: imagePaths},
      {
        include: [
          {
            model: User,
            as: 'seller',
            attributes: ['id', 'firstName', 'coordinates', 'reviewScore']
          },
          {model: Genre}
        ]
      }
    )
    res.status(201).send(newProduct)
  } catch (error) {
    next(error)
  }
})

router.get('/favorites/:userId', async (req, res, next) => {
  try {
    const favorite = await Favorite.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.status(201).json(favorite)
  } catch (error) {
    next(error)
  }
})

//POST /api/favorite/:productId
//PASS IN userId FROM FE
router.post('/favorite/:productId', async (req, res, next) => {
  try {
    const favorite = await Favorite.findOrCreate({
      where: {
        productId: req.params.productId,
        userId: req.body.userId
      }
    })
    const updatedFavorite = await favorite[0].update({
      isFavorite: req.body.isFavorite
    })
    res.status(201).json(updatedFavorite)
  } catch (error) {
    next(error)
  }
})

//FAVORITE COUNT
// GET /api/products/favorite-count/:productId
router.get('/favoriteCount/:productId', async (req, res, next) => {
  try {
    const favCount = await Favorite.getCount(req.params.productId)
    res.status(200).send(favCount)
  } catch (error) {
    next(error)
  }
})

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const singleProduct = await Product.findOne({
      where: {id},
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'firstName', 'coordinates', 'reviewScore']
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['id', 'firstName', 'reviewScore']
        },
        {model: Genre}
      ]
    })
    res.status(200).send(singleProduct)
  } catch (err) {
    next(err)
  }
})

// PUT api/products/:productId
router.put('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'firstName', 'coordinates', 'reviewScore']
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['id', 'firstName', 'reviewScore']
        },
        {model: Genre}
      ]
    })
    if (!product) res.send('This product does not exist.')
    else if (req.user.id === product.sellerId) {
      const updatedProduct = await product.update(req.body)
      res.status(201).send(updatedProduct)
    } else {
      const err = new Error('Unauthorized')
      err.status = 401
      next(err)
    }
  } catch (err) {
    next(err)
  }
})

// DELETE /api/products/:productId
router.delete('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    if (!product) res.send('This product does not exist.')
    else if (req.user.id === product.sellerId) {
      await product.destroy()
      res.status(204).end()
    } else {
      const err = new Error('Unauthorized')
      err.status = 401
      next(err)
    }
  } catch (err) {
    next(err)
  }
})
