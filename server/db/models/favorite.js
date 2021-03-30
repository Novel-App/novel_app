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

Favorite.getCount = async function(productId) {
  try {
    const favs = await this.findAll({
      where: {
        productId,
        isFavorite: true
      }
    })
    return favs.length
  } catch (error) {
    console.log(error)
  }
}

module.exports = Favorite
