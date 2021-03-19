const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  zipCode: {
    type: Sequelize.INTEGER
  },
  locationAuthorization: {
    type: Sequelize.BOOLEAN
  },
  coordinates: {
    type: Sequelize.ARRAY(Sequelize.DOUBLE)
  },
  reviewScore: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    validate: {
      isValidReview: function(value) {
        return value > 1 && value <= 5
          ? value
          : 'Review must be between 1 and 5'
      }
    }
  },
  //Update image validater once we figure out another way to store images
  profileImage: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://ih1.redbubble.net/image.1251162799.6563/flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
    allowNull: false
  },
  photoVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  emailVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  locationVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
