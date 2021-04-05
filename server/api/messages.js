const router = require('express').Router()
const {Message} = require('../db/models')
const sellerOrBrowserOnly = require('../utils/sellerOrBrowserOnly')
module.exports = router

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

// POST /api/messages
router.post('/', sellerOrBrowserOnly, async (req, res, next) => {
  try {
    if (req.body.authorId === req.user.id) {
      const message = await Message.create(req.body)
      res.status(201).send(message)
    }
  } catch (err) {
    next(err)
  }
})
