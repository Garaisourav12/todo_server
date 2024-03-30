const router = require('express').Router();
const todoController = require('../controllers/todoController')
const { isLoggedIn } = require('../middlewares/middlewares')


router.get('/todos/:page_no/:max_results', isLoggedIn, todoController.getTodos);
router.post('/add', isLoggedIn, todoController.addTodo);
router.delete('/delete/:id', isLoggedIn, todoController.deleteTodo);
router.put('/edit/:id', isLoggedIn, todoController.editTodo);
router.put('/complete/:id', isLoggedIn, todoController.completeTodo);


module.exports = router;