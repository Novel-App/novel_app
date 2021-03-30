const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  content: {
    type: Sequelize.TEXT
  },
  unread: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

//renders array of all unread messages (to style unread msgs + to render total number next to chat icon in navbar)
Message.getUnread = async function() {
  try {
    const unreadMessages = await this.findAll({
      where: {
        unread: true
      }
    })
    return unreadMessages
  } catch (error) {
    console.log(error)
  }
}

//returns number of unread messages of a single chat (to render number of unread message for each chat in AllChats view)
Message.getUnreadCountByChat = async function(chatId) {
  try {
    const unreadCount = await this.findAll({
      where: {
        unread: true,
        chatId
      }
    })
    return unreadCount.length
  } catch (error) {
    console.log(error)
  }
}

module.exports = Message
