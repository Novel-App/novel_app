const router = require('express').Router()

module.exports = router


//GET /api/products

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll
    res.json(allProducts)
  } catch (error){
    next (error)
  }
})

//POST /api/products

router.post('/', async (req, res, next) => {
  try{
    let [newProduct, wasCreated] = await Product.create({
      name: req.body.name
    })
    res.status(201).json(newProduct)
  } catch (error){
    next (error)
  }
})


// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const singleProduct = await Product.findOne({
      where: {id: id}
    })
    res.json(singleProduct)
  } catch (err) {
    next(err)
  }
})