const router = require('express').Router()
const {Message} = require('../db/models')
const sellerOrBrowserOnly = require('../utils/sellerOrBrowserOnly')
const {Op} = require('sequelize')
module.exports = router

//COMMENT: unable to serve specific user information, need to do this on the front-end
// GET /api/messages/:chatId'
router.get('/:chatId', sellerOrBrowserOnly, async (req, res, next) => {
  try {
    const chatId = req.params.chatId
    const messages = await Message.findAll({
      where: {
        chatId
      }
    })
    res.status(200).send(messages)
  } catch (err) {
    next(err)
  }
})
//post messages to specific chat
// POST /api/messages
router.post('/', sellerOrBrowserOnly, async (req, res, next) => {
  try {
    if (req.body.authorId === req.user.id) {
      const message = await Message.create(req.body) //req.body will include content, chatId, authorId, (could maybe be unread)
      res.status(201).send(message)
    }
  } catch (err) {
    next(err)
  }
})
