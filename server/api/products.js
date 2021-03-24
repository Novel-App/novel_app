const router = require('express').Router()
const {Product, User, Genre} = require('../db/models')
module.exports = router

// GET /api/products
// filters by user location
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
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
    let [newProduct, wasCreated] = await Product.create(req.body, {
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
// PUT api/users/:sellerId/product/:productId
router.put('/:sellerId/product/:productId', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.productId
      }
    })
    if (!product) res.send('This product does not exist.')
    const updatedProduct = await product.update(req.body)
    res.status(201).send(updatedProduct)
  } catch (err) {
    next(err)
  }
})
