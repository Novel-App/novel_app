const Sequelize = require('sequelize')
const db = require('../db')

const Genre = db.define('genre', {
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
      'Childrens',
      'Fiction'
    ),
    allowNull: false
  }
})

module.exports = Genre
