const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('Product', {
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
  //Update image validater once we figure out another way to store images
  image: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://historyexplorer.si.edu/sites/default/files/book-348.jpg',
    allowNull: false
  },
  condition: {
    type: Sequelize.ENUM('Aged', 'Loved', 'Good', 'Like New'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  numFavorites: {
    type: Sequelize.INTEGER
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
  transactionComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  buyerId: {
    type: Sequelize.INTEGER
  },
  sellerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Product
