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

Message.belongsToMany(User, {
  through: Chat
})

User.belongsToMany(Message, {
  through: Chat
})

module.exports = {
  User,
  Product,
  Genre,
  Favorite,
  Chat,
  db
}
