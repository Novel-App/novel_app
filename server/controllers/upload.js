const fs = require('fs')
const db = require('../db')
const User = require('../db/models/user')

const upload = (req, res, next) => {
  try {
    console.log(req.file)
    if (req.file === undefined) {
      return res.send('You must select a file.')
    }
    User.create({
      profileImageType: req.file.mimetype,
      profileImageName: req.file.originalname,
      profileImageData: fs.readFileSync(
        __basedir + 'resources/uploads' + req.file.filename
      )
    }).then(image => {
      fs.writeFileSync(__basedir + 'resources/uploads' + image.name, image.data)
      return res.send(`File has been uploaded.`)
    })
  } catch (error) {
    next(error)
    return res.send(`Error when trying upload images: ${error}`)
  }
}

module.exports = {upload}
