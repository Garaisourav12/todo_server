const userRouter = require('express').Router();
const userController = require('../controllers/userController')
const { notLoggedIn, isLoggedIn } = require('../middlewares/middlewares')


userRouter.post('/register', notLoggedIn, userController.register)
userRouter.post('/login', notLoggedIn, userController.login)
userRouter.get('/logout', isLoggedIn, userController.logout)
userRouter.get('/logout_all', isLoggedIn, userController.logoutAll)


module.exports = userRouter;