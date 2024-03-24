const router = require('express').Router();
const userController = require('../controllers/userController')
const { notLoggedIn, isLoggedIn } = require('../middlewares/middlewares')


router.post('/register', notLoggedIn, userController.register)
router.post('/login', notLoggedIn, userController.login)
router.get('/logout', isLoggedIn, userController.logout)
router.get('/logout_all', isLoggedIn, userController.logoutAll)


module.exports = router;