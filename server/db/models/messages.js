const Sequelize = require('sequelize')
const db = require('../db')

const Messages = db.define('Messages', {
  message: {
    type: Sequelize.TEXT,
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

module.export = Messages