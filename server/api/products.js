const router = require('express').Router()
const {Product, User, Genre} = require('../db/models')
module.exports = router

//GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      include: [{model: User, as: 'seller'}, {model: Genre}]
    })
    res.status(200).send(allProducts)
  } catch (error) {
    next(error)
  }
})

//POST /api/products
router.post('/', async (req, res, next) => {
  try {
    let [newProduct, wasCreated] = await Product.create(req.body, {
      include: [{model: User}, {model: Genre}]
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
      where: {id: id},
      include: [{model: User}, {model: Genre}]
    })
    res.status(200).send(singleProduct)
  } catch (err) {
    next(err)
  }
})
