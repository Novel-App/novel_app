const User = require('./user')
const Product = require('./product')
const Genre = require('./genre')
const Favorite = require('./favorite')
const Message = require('./message')
const Chat = require('./chat')
const db = require('../db')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
Product.hasOne(Genre)

Product.belongsToMany(User, {
  through: Favorite
})
User.belongsToMany(Product, {
  through: Favorite
})

Chat.hasMany(Message, {
  onDelete: 'cascade',
  hooks: true
})
Message.belongsTo(Chat)

Product.hasMany(Chat)
Chat.belongsTo(Product)

User.belongsToMany(Chat, {through: Message})
Chat.belongsToMany(User, {through: Message})

// User.hasMany(Message, {
//   foreignKey: 'senderId',
//   as: 'OutgoingMessage'
// })
// User.hasMany(Message, {
//   foreignKey: 'receiverId',
//   as: 'IncomingMessage'
// })

// Message.belongsTo(User, {
//   foreignKey: 'senderId',
//   as: 'Sender'
// })
// Message.belongsTo(User, {
//   foreignKey: 'receiverId',
//   as: 'Receiver'
// })

module.exports = {
  User,
  Product,
  Genre,
  Favorite,
  Chat,
  Message,
  db
}
