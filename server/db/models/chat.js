const Sequelize = require('sequelize')
const db = require('../db')

const Chat = db.define('chat', {
  // chatting: {
  //   type: Sequelize.BOOLEAN
  // }
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  }
})

module.exports = Chat
