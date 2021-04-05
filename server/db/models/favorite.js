const Sequelize = require('sequelize')
const db = require('../db')

const Favorite = db.define('favorite', {
  isFavorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

Favorite.getCount = async function(productId) {
  try {
    const favs = await this.findAll({
      where: {
        productId,
        isFavorite: true
      }
    })
    return {productId: productId, count: favs.length}
  } catch (error) {
    console.log(error)
  }
}

module.exports = Favorite
