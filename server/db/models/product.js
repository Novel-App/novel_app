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

module.exports = Product
