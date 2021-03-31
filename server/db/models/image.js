const Sequelize = require('sequelize')
const db = require('../db')

const Image = db.define('image', {
  type: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  data: {
    type: Sequelize.BLOB
  }
})

module.exports = Image
