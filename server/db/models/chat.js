const Sequelize = require('sequelize')
const db = require('../db')
const Message = require('./message')

const Chat = db.define('chat', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  }
})

// Chat.getChatsByUser = function(browserId) {
//   return this.findAll({
//     include: {
//       model: Message,
//       as: 'authorId'
//     },
//     where: {
//       browserId: "authorId"
//     }
//   })
// }

//findAll where authorId === browserId
//require message to get authorId

module.exports = Chat
