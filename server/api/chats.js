const router = require('express').Router()
const {Chat, Message, Product, User} = require('../db/models')
module.exports = router

// GET /api/chats
router.get('/', async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
      include: {
        model: Product,
        include: [{model: User}]
      }
    })
    res.status(200).send(chats)
  } catch (err) {
    next(err)
  }
})

// GET /api/chats/:chatId/messages
router.get('/:chatId/messages', async (req, res, next) => {
  try {
    const chatId = req.params.chatId
    const messages = await Message.findAll({
      where: {
        chatId
      },
      include: [
        {
          association: User,
          as: 'Sender'
        },
        {
          association: User,
          as: 'Receiver'
        },
        {
          model: Chat
        }
      ]
    })
    res.status(200).send(messages)
  } catch (err) {
    next(err)
  }
})

// POST /api/chats
router.post('/', async (req, res, next) => {
  try {
    const chat = await Chat.create({
      where: {
        postId: req.body.postId
      }
    })
    res.status(201).send(chat)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/chats
router.delete('/:chatId', async (req, res, next) => {
  try {
    const id = req.params.chatId
    await Chat.destroy({where: {id}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
