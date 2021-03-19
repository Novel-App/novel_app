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
    
  } catch (error){
    next (error)
  }
})