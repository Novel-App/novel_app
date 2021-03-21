const router = require('express').Router()
const {Message} = require('../db/models')
module.exports = router

// GET /api/chats/:chatId/messages
router.get('/:chatId/messages', async (req, res, next) => {
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
router.post('/', async (req, res, next) => {
  try {
    const message = await Message.create(req.body) //req.body will include content, chatId, userId
    res.status(201).send(message)
  } catch (err) {
    next(err)
  }
})
