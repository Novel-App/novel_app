const Sequelize = require('sequelize')
const db = require('../db')

const Chat = db.define('chat', {
  chatting: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = Chat
