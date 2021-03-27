const User = require('./user')
const Product = require('./product')
const Genre = require('./genre')
const Favorite = require('./favorite')
const Message = require('./message')
const Chat = require('./chat')
const Review = require('./review')
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
Product.belongsTo(Genre)
Genre.hasMany(Product)

Product.belongsToMany(User, {
  through: Favorite
})
User.belongsToMany(Product, {
  through: Favorite
})

//adding associations between product and user
Product.belongsTo(User, {as: 'seller'})
Product.belongsTo(User, {as: 'buyer'})

Product.hasMany(Chat)
Chat.belongsTo(Product)

//adding associations between user and chat
User.belongsToMany(Chat, {
  through: {
    model: Message,
    // as: 'author',
    unique: false
  },
  foreignKey: 'authorId',
  constraints: false
})
Chat.belongsToMany(User, {
  through: {
    model: Message,
    unique: false
  },
  constraints: false
})

// Post.belongsToMany(Tag, {
//   through: {
//       model: ItemTag,
//       unique: false,
//       scope: {
//           taggable: 'post'
//       }
//   },
//   foreignKey: 'taggable_id',
//   constraints: false
// });

//adding associations between user and review
User.belongsToMany(User, {through: Review, as: 'reviewer'})

// Through table for review score (update database schema)
// Association between two sets of users (reviewer, and review score)
// Leave reviewScore as that average (update db each time)

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
  Review,
  db
}
