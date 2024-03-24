const todoModel = require('../models/todoModel')

// Controller function to get all todos of current user
module.exports.getTodos = async (req, res) => {
    // Extract the userID from the request session data
    const userId = req.session.user.userId;

    try {
        // Finding all the todos by userId from the database
        const todoDocs = await todoModel.find({ userId: userId });

        // Return a success response with the retrieved todos
        return res.status(200).json({
            status: 200,
            message: "Todos retrieved successfully",
            data: todoDocs
        });
    } catch (error) {
        // Return a database error response if an error occurs
        return res.status(500).json({
            status: 500,
            message: "Internal server error. Please try again later.",
            error: error
        });
    }
};

// Controller function to add a new todo
module.exports.addTodo = async (req, res) => {
    // Extract & Destructure the title and isCompleted from the request body
    const { title } = req.body;

    // Extract the userID from the request session data
    const userId = req.session.user.userId;

    try {
        // Create a new todo object
        const todoObj = new todoModel({
            title: title,
            isCompleted: false,
            userId: userId
        });

        // Save the new todo to the database
        const todoDoc = await todoObj.save();

        // Return a success response with the saved todo
        return res.status(201).json({
            status: 201,
            message: "Todo added successfully",
            data: todoDoc
        });
    } catch (error) {
        // Return a database error response if an error occurs
        return res.status(500).json({
            status: 500,
            message: "Internal server error. Please try again later.",
            error: error
        });
    }
};

// Controller function to delete a todo
module.exports.deleteTodo = async (req, res) => {
    // Extract the todo ID from the request parameters
    const todoId = req.params.id;
    // Extract the userID from the request session data
    const userId = req.session.user.userId;

    try {
        // Find the todo by ID from the database
        const todoDoc = await todoModel.findOne({ _id: todoId });

        if (!todoDoc) {
            // If the todo with the specified ID does not exist, return a not found response
            return res.status(404).json({
                status: 404,
                message: "Todo not found"
            });
        }

        // Check if the todo with the specified ID belongs to the current user
        const isNotOwner = todoDoc.userId != userId;

        if (isNotOwner) {
            // If the todo does not exist or does not belong to the user, return a forbidden response
            return res.status(403).json({
                status: 403,
                message: "Forbidden. You do not have permission to perform this action."
            });
        }

        // Delete the todo from the database
        const deletedTodoDoc = await todoModel.deleteOne({ _id: todoId });

        // Return a success response with the deleted todo data
        return res.status(200).json({
            status: 200,
            message: "Todo deleted successfully",
            data: deletedTodoDoc
        });
    } catch (error) {
        // Return a database error response if an error occurs
        return res.status(500).json({
            status: 500,
            message: "Internal server error. Please try again later.",
            error: error
        });
    }
};

// Controller function to edit a todo
module.exports.editTodo = async (req, res) => {
    // Extract the todo ID from the request parameters
    const todoId = req.params.id;
    // Extract the userID from the request session data
    const userId = req.session.user.userId;
    // Extract the newTitle from the request body
    const newTitle = req.body.title;

    try {
        // Find the todo by ID from the database
        const todoDoc = await todoModel.findOne({ _id: todoId });

        if (!todoDoc) {
            // If the todo with the specified ID does not exist, return a not found response
            return res.status(404).json({
                status: 404,
                message: "Todo not found"
            });
        }

        // Check if the todo with the specified ID belongs to the current user
        const isNotOwner = todoDoc.userId != userId;

        if (isNotOwner) {
            // If the todo does not exist or does not belong to the user, return a forbidden response
            return res.status(403).json({
                status: 403,
                message: "Forbidden. You do not have permission to perform this action."
            });
        }

        // Update todoDoc.title with neTitle to edit the todo
        todoDoc.title = newTitle || todoDoc.title;

        // Save the updated todo document
        await todoDoc.save();

        // Return a success response with the deleted todo data
        return res.status(200).json({
            status: 200,
            message: "Todo deleted successfully",
            data: todoDoc
        });
    } catch (error) {
        console.log(error);
        // Return a database error response if an error occurs
        return res.status(500).json({
            status: 500,
            message: "Internal server error. Please try again later.",
            error: error
        });
    }
};

// Controller function to mark a todo as complete
module.exports.completeTodo = async (req, res) => {
    // Extract the todo ID from the request parameters
    const todoId = req.params.id;
    // Extract the userID from the request session data
    const userId = req.session.user.userId;

    try {
        // Find the todo by ID from the database
        const todoDoc = await todoModel.findOne({ _id: todoId });

        if (!todoDoc) {
            // If the todo with the specified ID does not exist, return a not found response
            return res.status(404).json({
                status: 404,
                message: "Todo not found"
            });
        }

        // Check if the todo with the specified ID belongs to the current user
        const isNotOwner = todoDoc.userId != userId;

        if (isNotOwner) {
            // If the todo does not exist or does not belong to the user, return a forbidden response
            return res.status(403).json({
                status: 403,
                message: "Forbidden. You do not have permission to perform this action."
            });
        }

        // Update todoDoc.isCompleted with true to set the todo as completed
        todoDoc.isCompleted = true;

        // Save the updated todo document
        await todoDoc.save();

        // Return a success response with the deleted todo data
        return res.status(200).json({
            status: 200,
            message: "Todo completed successfully",
            data: todoDoc
        });
    } catch (error) {
        console.log(error);
        // Return a database error response if an error occurs
        return res.status(500).json({
            status: 500,
            message: "Internal server error. Please try again later.",
            error: error
        });
    }
};