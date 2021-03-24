const Sequelize = require('sequelize')
const db = require('../db')

const Genre = db.define('genre', {
  isFiction: {
    type: Sequelize.BOOLEAN,
    allowNull: false
    // validate: {
    //   notEmpty: true
    // }
  },
  category: {
    type: Sequelize.ENUM(
      'Fantasy/Adventure',
      'Romance',
      'Thriller/Mystery',
      'Science Fiction/Dystopian',
      'Memoir',
      'History',
      'Lifestyle',
      'Development/How-To/Education',
      'Humor',
      'Childrens'
    ),
    allowNull: false
    // validate: {
    //   notEmpty: true
    // }
  }
})

module.exports = Genre
