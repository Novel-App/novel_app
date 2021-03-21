const router = require('express').Router()
const {Chat, Message, User} = require('../db/models')
module.exports = router

// GET /api/messages
router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.findAll()
    res.json(messages)
  } catch (err) {
    next(err)
  }
})

// POST /api/messages
router.post('/', async (req, res, next) => {
  try {
    const message = await Message.create(
      {
        content: req.body.content,
        senderId: req.user.id,
        //receiverId: ____
        chatId: req.body.chatId
      },
      {
        include: [
          {
            association: User,
            as: 'Sender'
          },
          {
            association: User,
            as: 'Receiver'
          }
        ]
      }
    )
    res.status(201).send(message)
  } catch (err) {
    next(err)
  }
})
