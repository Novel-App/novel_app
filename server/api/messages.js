const router = require('express').Router()
const {Message} = require('../db/models')
module.exports = router

//COMMENT: unable to serve specific user information, need to do this on the front-end
// GET /api/messages/:chatId'
router.get('/:chatId', async (req, res, next) => {
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
router.post('/', async (req, res, next) => {
  console.log('start:posting a new mesg', req.body)
  try {
    const message = await Message.create(req.body) //req.body will include content, chatId, authorId, (could maybe be unread)
    res.status(201).send(message)
  } catch (err) {
    next(err)
  }
})
