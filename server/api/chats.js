const router = require('express').Router()
const {Chat, Message, Product, User} = require('../db/models')
const Op = require('Sequelize').Op
module.exports = router

// GET /api/chats/
router.get('/', async (req, res, next) => {
  try {
    const chat = await Chat.findAll({
      where: {
        [Op.or]: [
          {
            sellerId: req.user.id
          },
          {
            browserId: req.user.id
          }
        ]
      },
      include: {
        model: User,
        attributes: ['firstName', 'profileImage', 'reviewScore']
      }
    })
    res.status(200).send(chat)
  } catch (err) {
    next(err)
  }
})

// GET /api/chats/:chatId
router.get('/:chatId', async (req, res, next) => {
  try {
    const chat = await Chat.findByPk(req.params.chatId, {
      include: [
        {
          model: User,
          attributes: ['firstName', 'profileImage', 'reviewScore']
        },
        {
          model: Product
        }
      ]
    })
    res.status(200).send(chat)
  } catch (err) {
    next(err)
  }
})

// POST /api/chats
//THUNKS MUST SEND: browserId & productId
router.post('/', async (req, res, next) => {
  try {
    const chat = await Chat.findOrCreate({
      where: {
        browserId: req.body.browserId,
        productId: req.body.productId
      }
    })
    res.status(201).send(chat[0])
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
