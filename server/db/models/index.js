const User = require('./user')
const Product = require('./product')
const Genre = require('./genre')
const Favorite = require('./favorite')
const Message = require('./message')
const Chat = require('./chat')
const Review = require('./review')
const db = require('../db')

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

//adding associations between user and review
User.belongsToMany(User, {through: Review, as: 'reviewer'})

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
