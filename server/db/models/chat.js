const Sequelize = require('sequelize')
const Product = require('../models/product')
const db = require('../db')
const Message = require('./message')

const Chat = db.define('chat', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  sellerId: {
    type: Sequelize.INTEGER
  },
  browserId: {
    type: Sequelize.INTEGER
  }
})

async function getSellerId(chat) {
  try {
    const seller = await Product.findOne({
      where: {
        id: chat.productId
      }
    })
    chat.sellerId = seller.sellerId
  } catch {
    console.log('seller is not found')
  }
}

//hook to create sellerId columns in each instance
Chat.beforeCreate(getSellerId)
Chat.beforeUpdate(getSellerId)
Chat.beforeBulkCreate(async chats => {
  await Promise.all(chats.map(chat => getSellerId(chat)))
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
