const router = require('express').Router()
const {Product, User, Genre, Favorite} = require('../db/models')
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

//POST /api/products
//post must include: title, author, ISBN, description, condition, price, sellerId
//could include 'image', canBargin. could switch: availability ==> then need to add buyerId

router.post('/', async (req, res, next) => {
  try {
    let newProduct = await Product.create(req.body, {
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'firstName', 'coordinates', 'reviewScore']
        },
        {model: Genre}
      ]
    })
    res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
})

//FAVORITE PRODUCT
//POST /api/products/:productId/favorite
//PASS IN userId FROM FE
router.post('/:productId/favorite', async (req, res, next) => {
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
// GET /api/products/:productId/favorite-count
router.get('/:productId/favorite-count', async (req, res, next) => {
  try {
    const favCount = await Favorite.getCount(req.params.productId)
    res.status(200).send(favCount.toString())
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

// edit listing info (seller can update info for their listings) ==> info to update -> pass in as req.body
// ** ex) use this when updating product availability status --> ex) req.body = {availability: "Sold", buyerId: 3}
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
