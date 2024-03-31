const todoRouter = require('express').Router();
const todoController = require('../controllers/todoController')
const { isLoggedIn } = require('../middlewares/middlewares')


todoRouter.get('/my-todos', isLoggedIn, todoController.getTodos);
todoRouter.get('/my-completed-todos', isLoggedIn, todoController.getCompletedTodos);
todoRouter.get('/my-running-todos', isLoggedIn, todoController.getRunningTodos);
todoRouter.post('/add', isLoggedIn, todoController.addTodo);
todoRouter.delete('/delete', isLoggedIn, todoController.deleteTodo);
todoRouter.delete('/delete-all-completed', isLoggedIn, todoController.deleteAllCompletedTodo);
todoRouter.put('/edit', isLoggedIn, todoController.editTodo);
todoRouter.put('/complete', isLoggedIn, todoController.completeTodo);


module.exports = todoRouter;