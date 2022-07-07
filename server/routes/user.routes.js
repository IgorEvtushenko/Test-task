const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')
const authMiddlewere = require('../middleware/auth.middleware')

router.post('/user', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/auth', authMiddlewere, userController.authUser)
router.get('/users', userController.getAllUsers)
router.get('/user/:id', userController.getOneUser)
router.put('/user', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

module.exports = router