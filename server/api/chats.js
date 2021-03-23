const router = require('express').Router()
const {Chat, Message, Product, User} = require('../db/models')
module.exports = router

// GET /api/chats
router.get('/', async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
      include: [{model: User}, {model: Product}]
    })
    res.status(200).send(chats)
  } catch (err) {
    next(err)
  }
})

// GET /api/chats/:chatId
router.get('/:chatId', async (req, res, next) => {
  try {
    const chat = await Chat.findByPk(req.params.chatId, {
      include: [{model: User}, {model: Product}]
    })
    res.status(200).send(chat)
  } catch (err) {
    next(err)
  }
})

// POST /api/chats
//must send browerId and productId to create or find a new chat
router.post('/', async (req, res, next) => {
  try {
    const chat = await Chat.findOrCreate({
      where: {
        browserId: req.body.browserId,
        productId: req.body.productId
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
