const User = require('./user')
const Product = require('./product')
const Genre = require('./genre')
const Favorites = require('./favorites')
const Chat = require('./chat')
const Messages = require('./messages')

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
  through: 'favorites'
})
User.belongsToMany(Product, {
  through: 'favorites'
})

User.belongsToMany(Messages, {
  through: 'chat'
})

module.exports = {
  User,
  Product,
  Genre,
  Favorites,
  Chat
}
