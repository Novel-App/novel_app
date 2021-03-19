const Sequelize = require('sequelize')
const db = require('../db')

const Favorite = db.define('Favorite', {
  isFavorite: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      isEmpty: false
    }
  }
})

module.exports = Favorite
