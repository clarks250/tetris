const Router = require('express')
const router = new Router()
const userScoreController = require('../controller/user.controller')

router.get('/leaderboard', userScoreController.getLiderUserScore)
router.get('/user/:id', userScoreController.getOneUserScore)
router.put('/user', userScoreController.updateUserScore)
router.delete('/user/:id', userScoreController.deleteUserScore)
router.post('/createUserScore', userScoreController.createUserScore);

module.exports = router