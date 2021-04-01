const path = require('path')

const home = (req, res) => {
  //don't think this path is correct
  return res.sendFile(path.join(`${__dirname}/../public/index.html`))
}

module.exports = {
  getHome: home
}
