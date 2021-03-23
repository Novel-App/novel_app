const Sequelize = require('sequelize')
const db = require('../db')
const Chat = require('./chat')

const Message = db.define('message', {
  content: {
    type: Sequelize.TEXT
  },
  unread: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

//renders array of all unread messages (to style unread msgs + to render total number next to chat icon in navbar)
Message.getUnread = function() {
  return this.findAll({
    where: {
      unread: true
    }
  })
}

//returns number of unread messages of a single chat (to render number of unread message for each chat in AllChats view)
Message.getUnreadCountByChat = function(chatId) {
  return this.findAll({
    where: {
      unread: true,
      chatId
    }
  }).length
}

module.exports = Message
