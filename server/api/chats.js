const router = require('express').Router()
const {Chat, Product, User} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

// GET /api/chats
router.get('/', async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
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
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'profileImage', 'reviewScore']
        },
        {
          model: Product,
          attributes: [
            'title',
            'author',
            'id',
            'image',
            'price',
            'availability'
          ],
          include: {
            model: User,
            as: 'seller',
            attributes: ['id', 'firstName', 'profileImage', 'reviewScore']
          }
        }
      ]
    })

    const filteredChats = chats.filter(chat => chat.users.length > 0)

    res.status(200).send(filteredChats)
  } catch (err) {
    next(err)
  }
})

// GET /api/chats/:chatId
router.get('/:chatId', async (req, res, next) => {
  try {
    const chat = await Chat.findOne({
      where: {
        id: req.params.chatId,
        [Op.or]: [
          {
            sellerId: req.user.id
          },
          {
            browserId: req.user.id
          }
        ]
      },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'profileImage', 'reviewScore']
        },
        {
          model: Product,
          attributes: [
            'title',
            'author',
            'id',
            'image',
            'price',
            'availability'
          ],
          include: {
            model: User,
            as: 'seller',
            attributes: ['id', 'firstName', 'profileImage', 'reviewScore']
          }
        }
      ]
    })
    res.status(200).send(chat)
  } catch (err) {
    next(err)
  }
})

//GET CHATS BY PRODUCT ID
// GET /api/chats/product/:productId
router.get('/product/:productId', async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
      where: {
        productId: req.params.productId,
        [Op.or]: [
          {
            sellerId: req.user.id
          },
          {
            browserId: req.user.id
          }
        ]
      },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'profileImage', 'reviewScore']
        },
        {
          model: Product
        }
      ]
    })
    res.status(200).send(chats)
  } catch (err) {
    next(err)
  }
})

// POST /api/chats
router.post('/', async (req, res, next) => {
  try {
    const chat = await Chat.findOrCreate({
      where: {
        browserId: req.body.browserId,
        productId: req.body.productId
      },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'profileImage', 'reviewScore']
        },
        {
          model: Product
        }
      ]
    })
    res.status(201).send(chat[0])
  } catch (err) {
    next(err)
  }
})

// DELETE /api/chats
router.delete('/:chatId', async (req, res, next) => {
  try {
    const chat = await Chat.findOne({
      where: {
        id: req.params.chatId,
        [Op.or]: [
          {
            sellerId: req.user.id
          },
          {
            browserId: req.user.id
          }
        ]
      }
    })
    if (chat) {
      await chat.destroy()
    } else {
      res.sendStatus(400)
    }
    res.status(204).send(chat)
  } catch (err) {
    next(err)
  }
})
