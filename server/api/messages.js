const router = require('express').Router()
const {Chat, Message, User} = require('../db/models')
module.exports = router

// POST /api/messages
router.post('/', async (req, res, next) => {
  try {
    const message = await Message.create(req.body) //req.body will include content, chatId, userId
    res.status(201).send(message)
  } catch (err) {
    next(err)
  }
})
