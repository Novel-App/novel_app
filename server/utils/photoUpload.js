const multer = require('multer')

const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    //first arg is error, then destination
    callback(null, 'resources/uploads')
  },
  filename: (req, file, callback) => {
    //mimetype looks at the type of image (jpeg, etc)
    const ext = file.mimetype.split('/')[1]
    //creates filename as user id and current time stamp
    callback(null, `user-${req.user.id}-${Date.now()}.${ext}`)
  }
})

//filter to make sure file is an image
const multerFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true)
  } else {
    callback(new error('Not an image! Please upload an image!', 400), false)
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
})

module.exports = upload
