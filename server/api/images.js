const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
// const uploadController = require('../controllers/upload')
const upload = require('../utils/photoUpload')
module.exports = router

//GET route for image
router.get('/', homeController.getHome)

//POST route for image
router.post('/upload', upload.single('file'))
