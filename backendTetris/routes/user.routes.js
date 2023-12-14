const Router = require('express')
const router = new Router()
const userScoreController = require('../controller/user.controller')

router.post('/user', userScoreController.createUserScore)
router.get('/leaderboard', userScoreController.getLiderUserScore)
router.get('/user/:id', userScoreController.getOneUserScore)
router.put('/user', userScoreController.updateUserScore)
router.delete('/user/:id', userScoreController.deleteUserScore)

module.exports = router