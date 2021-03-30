const Sequelize = require('sequelize')
const db = require('../db')

const Favorite = db.define('favorite', {
  isFavorite: {
    type: Sequelize.BOOLEAN
    // allowNull: false,
  }
})

Favorite.getCount = async function(productId) {
  const favorites = await this.findAll({
    where: {
      productId,
      isFavorite: true
    }
  })
  return favorites.length
}

module.exports = Favorite
