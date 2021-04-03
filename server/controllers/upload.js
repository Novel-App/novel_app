const fs = require('fs')
const path = require('path')

const upload = (req, res, next) => {
  try {
    console.log(req.file)
    if (req.file === undefined) {
      return res.send('You must select a file.')
    }
    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      // data: fs.readFileSync(__basedir + 'resources/uploads' + req.file.filename)
      // data: fs.readFileSync(path.join(__basedir, 'public/images', req.file.filename))
      data: fs.readFileSync(__basedir + 'public/images' + req.file.filename)
    }).then(image => {
      // fs.writeFileSync(__basedir + 'resources/uploads' + image.name, image.data)
      fs.writeFileSync(__basedir + 'public/images' + image.name + image.data)
      return res.send(`File has been uploaded.`)
    })
  } catch (error) {
    next(error)
    return res.send(`Error when trying upload images: ${error}`)
  }
}

module.exports = {upload}
