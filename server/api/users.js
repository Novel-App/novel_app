const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'profileImage',
        'reviewScore',
        'photoVerified',
        'emailVerified',
        'locationVerified'
      ]
    })
    res.status(200).send(users)
  } catch (err) {
    next(err)
  }
})

// GET single User
// GET /api/users/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'profileImage',
        'reviewScore',
        'photoVerified',
        'emailVerified',
        'locationVerified'
      ],
      where: {id: req.params.userId}
    })
    if (!user) {
      res.status(404).send('This user does not exist!')
    }
    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
})

// PUT api/users
router.put('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    if (!user) res.send('This user does not exist.')
    const updatedUser = await user.update(req.body)
    res.status(201).send(updatedUser)
  } catch (err) {
    next(err)
  }
})
