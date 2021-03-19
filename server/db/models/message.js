const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  message: {
    type: Sequelize.TEXT
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  receiverId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Message
