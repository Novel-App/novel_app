const Sequelize = require('sequelize')
const db = require('../db')

const Favorites = db.define('favorite', {
  isFavorite: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      isEmpty: false
    }
  }
})

module.exports = Favorites
