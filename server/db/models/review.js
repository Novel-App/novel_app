const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
})

// update avg user rating based on all the reviews
/**
 * classMethods
 */
// Review.findUserRatings = (id) => {
//   const reviews = this.findAll({
//     where: {
//       userId: id,
//     },
//   })
//   return reviews
// }

// /**
//  * hooks
//  */
// const updateUserAverageRating = (userId) => {
//   const ratings = Review.findUserRatings(userId)
//   if (!ratings) {
//     return
//   } else {
//     const allRatings = ratings.map((accum, rating) => {
//       return accum + rating
//     })
//     const avgRating = allRatings / ratings.length
//     return avgRating
//   }
// }

// Review.beforeCreate(updateUserAverageRating)
// Review.beforeUpdate(updateUserAverageRating)
// Review.beforeBulkCreate((reviews) => {
//   reviews.forEach(updateUserAverageRating)
// })

module.exports = Review
