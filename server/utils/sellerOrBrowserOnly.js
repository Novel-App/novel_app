const {Chat} = require('../db/models')

module.exports = async (req, res, next) => {
  try {
    const chat = await Chat.findByPk(req.params.chatId || req.body.chatId)
    if (
      req.user &&
      (req.user.id === +chat.sellerId || req.user.id === +chat.browserId)
    )
      next()
    else {
      const err = new Error('Unauthorized')
      err.status = 401
      next(err)
    }
  } catch (err) {
    next(err)
  }
}
