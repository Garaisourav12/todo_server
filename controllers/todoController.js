const Todo = require("../entities/Todo");
const { todoDataValidator } = require("../utils/todoUtils");

// Controller function to get all todos of current user
module.exports.getTodos = async (req, res) => {
    // Extract the userID from the request session data
    const userId = req.session.user.userId;
    const skip = req.query.page ? Number(req.query.page) - 1 : 0;
    const limit = req.query.max || 5;

    try {
        const todoDocs = await Todo.getTodos({ userId, skip, limit });

        return res.status(200).json({
            status: 200,
            message: "Todos retrieved successfully",
            data: todoDocs,
        });
    } catch (error) {
        console.log(error);
        // Return a database error response if an error occurs
        return res.status(error.status).json(error);
    }
};

module.exports.getCompletedTodos = async (req, res) => {
    // Extract the userID from the request session data
    const userId = req.session.user.userId;
    const skip = req.query.page ? Number(req.query.page) - 1 : 0;
    const limit = req.query.max || 5;

    try {
        const todoDocs = await Todo.getCompletedTodos({ userId, skip, limit });

        return res.status(200).json({
            status: 200,
            message: "Todos retrieved successfully",
            data: todoDocs,
        });
    } catch (error) {
        console.log(error);
        // Return a database error response if an error occurs
        return res.status(error.status).json(error);
    }
};

module.exports.getRunningTodos = async (req, res) => {
    // Extract the userID from the request session data
    const userId = req.session.user.userId;
    const skip = req.query.page ? Number(req.query.page) - 1 : 0;
    const limit = req.query.max || 5;

    try {
        const todoDocs = await Todo.getRunningTodos({ userId, skip, limit });

        return res.status(200).json({
            status: 200,
            message: "Todos retrieved successfully",
            data: todoDocs,
        });
    } catch (error) {
        console.log(error);
        // Return a database error response if an error occurs
        return res.status(error.status).json(error);
    }
};

// Controller function to add a new todo
module.exports.addTodo = async (req, res) => {
    // Extract & Destructure the title and isCompleted from the request body
    const { title } = req.body;

    // Extract the userID from the request session data
    const userId = req.session.user.userId;

    try {
        await todoDataValidator({ title });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error,
        });
    }

    try {
        // Create a new todo instance
        const todo = new Todo({ title, userId });

        // Save the new todo to the database
        const todoDoc = await todo.create();

        // Return a success response with the saved todo
        return res.status(201).json({
            status: 201,
            message: "Todo added successfully",
            data: todoDoc,
        });
    } catch (error) {
        // Return a database error response if an error occurs
        return res.status(error.status).json(error);
    }
};

// Controller function to delete a todo
module.exports.deleteTodo = async (req, res) => {
    // Extract the todo ID from the request query
    const todoId = req.query.id;
    // Extract the userID from the request session data
    const userId = req.session.user.userId;

    try {
        // Create a new todo instance
        const todo = new Todo({ userId, todoId });

        // Delete the todo from the database
        const deletedTodoDoc = await todo.delete();

        // Return a success response with the deleted todo data
        return res.status(200).json({
            status: 200,
            message: "Todo deleted successfully",
            data: deletedTodoDoc,
        });
    } catch (error) {
        // Return a database error response if an error occurs
        return res.status(error.status).json(error);
    }
};

module.exports.deleteAllCompletedTodo = async (req, res) => {
    // Extract the todo ID from the request query
    const todoId = req.query.id;
    // Extract the userID from the request session data
    const userId = req.session.user.userId;

    try {
        // Delete the todo from the database
        const deletedTodoDoc = await Todo.deleteAllCompleted({ userId });

        // Return a success response with the deleted todo data
        return res.status(200).json({
            status: 200,
            message: "Todo deleted successfully",
            data: deletedTodoDoc,
        });
    } catch (error) {
        // Return a database error response if an error occurs
        return res.status(error.status).json(error);
    }
};

// Controller function to edit a todo
module.exports.editTodo = async (req, res) => {
    // Extract the todo ID from the request query
    const todoId = req.query.id;
    // Extract the userID from the request session data
    const userId = req.session.user.userId;
    // Extract the newTitle from the request body
    const newTitle = req.body.title;

    try {
        await todoDataValidator({ title: newTitle });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error,
        });
    }

    try {
        // Create a new todo instance
        const todo = new Todo({ userId, todoId });

        // Update todoDoc.title with neTitle to edit the todo
        const todoDoc = await todo.edit({ title: newTitle });

        // Return a success response with the deleted todo data
        return res.status(200).json({
            status: 200,
            message: "Todo deleted successfully",
            data: todoDoc,
        });
    } catch (error) {
        console.log(error.message);
        // Return a database error response if an error occurs
        return res.status(error.status).json(error);
    }
};

// Controller function to mark a todo as complete
module.exports.completeTodo = async (req, res) => {
    // Extract the todo ID from the request query
    const todoId = req.query.id;
    // Extract the userID from the request session data
    const userId = req.session.user.userId;

    try {
        // Create a new todo instance
        const todo = new Todo({ userId, todoId });

        const todoDoc = await todo.complete();

        // Return a success response with the deleted todo data
        return res.status(200).json({
            status: 200,
            message: "Todo completed successfully",
            data: todoDoc,
        });
    } catch (error) {
        // Return a database error response if an error occurs
        return res.status(error.status).json(error);
    }
};
