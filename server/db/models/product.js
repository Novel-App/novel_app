const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ISBN: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  isFiction: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  image: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: [
      'https://historyexplorer.si.edu/sites/default/files/book-348.jpg'
    ],
    allowNull: false
  },
  condition: {
    type: Sequelize.ENUM('Aged', 'Loved', 'Good', 'Like New', 'New'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  canBargain: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  availability: {
    type: Sequelize.ENUM('Available', 'Reserved', 'Sold'),
    defaultValue: 'Available'
  }
})

Product.filterByLocation = function(allProducts, user) {
  function filterProducts(checkPoint, centerPoint, km) {
    const ky = 40000 / 360
    const kx = Math.cos(Math.PI * centerPoint[0] / 180.0) * ky
    const dx = Math.abs(centerPoint[1] - checkPoint[1]) * kx
    const dy = Math.abs(centerPoint[0] - checkPoint[0]) * ky
    return Math.sqrt(dx * dx + dy * dy) <= km
  }
  return allProducts.filter(product =>
    filterProducts(product.seller.coordinates, user.coordinates, 3)
  )
}

Product.getListingsByAvailability = function(sellerId, availability) {
  return this.findAll({
    where: {
      sellerId,
      availability:
        availability === 'available'
          ? 'Available'
          : availability === 'reserved' ? 'Reserved' : 'Sold'
    }
  })
}

module.exports = Product
