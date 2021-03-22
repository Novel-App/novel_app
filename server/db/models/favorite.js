const Sequelize = require('sequelize')
const db = require('../db')

const Favorite = db.define('favorite', {
  isFavorite: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      isEmpty: false
    }
  }
})

Favorite.getCount = function(productId) {
  return this.findAll({
    where: {
      productId,
      isFavorite: true
    }
  }).length
}

module.exports = Favorite
