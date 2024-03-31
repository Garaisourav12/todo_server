const TodoModel = require("../models/TodoModel");

const Todo = class {
    todoId;
    title;
    isCompleted;
    userId;
    todoDoc;

    constructor({ title, userId, todoId }) {
        this.todoId = todoId;
        this.title = title;
        this.isCompleted = false;
        this.userId = userId;
        this.todoDoc = null;
    }

    initialize() {
        return new Promise(async (resolve, reject) => {
            try {
                // Find the todo by ID from the database
                const todoDoc = await TodoModel.findOne({ _id: this.todoId });

                if (!todoDoc) {
                    // If the todo with the specified ID does not exist, reject a not found message
                    reject({
                        status: 404,
                        message: "Todo not found",
                    });
                }

                // Check if the todo with the specified ID belongs to the current user
                const isNotOwner = todoDoc.userId != this.userId;

                if (isNotOwner) {
                    // If the todo does not exist or does not belong to the user, reject with a forbidden message
                    reject({
                        status: 403,
                        message:
                            "Forbidden. You do not have permission to perform this action.",
                    });
                }

                this.todoDoc = todoDoc;
                resolve();
            } catch (error) {
                // Reject with the database error message if an error occurs
                reject({
                    status: 500,
                    message: "Internal server error. Please try again later.",
                });
            }
        });
    }

    create() {
        return new Promise(async (resolve, reject) => {
            try {
                // Create a new todo object
                const todoObj = new TodoModel({
                    title: this.title,
                    isCompleted: this.isCompleted,
                    userId: this.userId,
                });

                // Save the new todo to the database
                const todoDoc = await todoObj.save();

                // Resolve with the saved todo
                resolve(todoDoc);
            } catch (error) {
                // Reject with the database error message if an error occurs
                reject({
                    status: 500,
                    message: "Internal server error. Please try again later.",
                });
            }
        });
    }

    delete() {
        return new Promise(async (resolve, reject) => {
            try {
                // Initialize this.todoDoc after finding it from database and
                await this.initialize();
            } catch (error) {
                reject(error);
            }

            try {
                // Delete the todo from the database
                const deletedTodoDoc = await TodoModel.deleteOne({
                    _id: this.todoId,
                });

                // Resolve with the number deleted todos data
                resolve(deletedTodoDoc);
            } catch (error) {
                // Reject with the database error message if an error occurs
                reject({
                    status: 500,
                    message: "Internal server error. Please try again later.",
                });
            }
        });
    }

    static deleteAllCompleted({ userId }) {
        return new Promise(async (resolve, reject) => {
            try {
                // Delete all the completed todos from the database
                const deletedTodoDocs = await TodoModel.deleteMany({
                    userId,
                    isCompleted: true,
                });

                // Resolve with the number of deleted todos data
                resolve(deletedTodoDocs);
            } catch (error) {
                // Reject with the database error message if an error occurs
                reject({
                    status: 500,
                    message: "Internal server error. Please try again later.",
                });
            }
        });
    }

    edit(newTodo) {
        return new Promise(async (resolve, reject) => {
            try {
                // Initialize this.todoDoc after finding it from database and
                await this.initialize();
            } catch (error) {
                reject(error);
            }

            try {
                // Update todoDoc.title with newTitle to edit the todo
                this.todoDoc.title = newTodo.title || this.todoDoc.title;

                // Save the updated todo document
                await this.todoDoc.save();

                // Resolve with a success message with the edited todo data
                resolve(this.todoDoc);
            } catch (error) {
                // Reject with the database error message if an error occurs
                reject({
                    status: 500,
                    message: "Internal server error. Please try again later.",
                });
            }
        });
    }

    complete() {
        return new Promise(async (resolve, reject) => {
            try {
                // Initialize this.todoDoc after finding it from database and
                await this.initialize();
            } catch (error) {
                reject(error);
            }

            try {
                // Update todoDoc.isCompleted with true value
                this.todoDoc.isCompleted = true;

                // Save the completed todo document
                await this.todoDoc.save();

                // Resolve with a success message with the completed todo data
                resolve(this.todoDoc);
            } catch (error) {
                // Reject with the database error message if an error occurs
                reject({
                    status: 500,
                    message: "Internal server error. Please try again later.",
                });
            }
        });
    }

    static getTodos({ userId, skip, limit }) {
        return new Promise(async (resolve, reject) => {
            try {
                // Finding all the todos by userId from the database
                const todoDocs = await TodoModel.find({ userId });
                // const todoDocs = await TodoModel.aggregate([
                //     {
                //         $match: {
                //             userId,
                //         },
                //     },
                //     {
                //         $facet: {
                //             data: [{ $skip: skip }, { $limit: limit }],
                //         },
                //     },
                // ]);

                // Resolve the retrieved todos
                resolve(todoDocs);
            } catch (error) {
                console.log(error);
                // Reject with the database error message if an error occurs
                reject({
                    status: 500,
                    message: "Internal server error. Please try again later.",
                });
            }
        });
    }

    static getCompletedTodos({ userId, skip, limit }) {
        return new Promise(async (resolve, reject) => {
            try {
                // Finding all the completed todos by userId from the database
                const todoDocs = await TodoModel.find({
                    userId,
                    isCompleted: true,
                });
                // const todoDocs = await TodoModel.aggregate([
                //     {
                //         $match: {
                //             userId,
                //         },
                //     },
                //     {
                //         $facet: {
                //             data: [{ $skip: skip }, { $limit: limit }],
                //         },
                //     },
                // ]);

                // Resolve the retrieved todos
                resolve(todoDocs);
            } catch (error) {
                console.log(error);
                // Reject with the database error message if an error occurs
                reject({
                    status: 500,
                    message: "Internal server error. Please try again later.",
                });
            }
        });
    }

    static getRunningTodos({ userId, skip, limit }) {
        return new Promise(async (resolve, reject) => {
            try {
                // Finding all the running todos by userId from the database
                const todoDocs = await TodoModel.find({
                    userId,
                    isCompleted: false,
                });
                // const todoDocs = await TodoModel.aggregate([
                //     {
                //         $match: {
                //             userId,
                //         },
                //     },
                //     {
                //         $facet: {
                //             data: [{ $skip: skip }, { $limit: limit }],
                //         },
                //     },
                // ]);

                // Resolve the retrieved todos
                resolve(todoDocs);
            } catch (error) {
                console.log(error);
                // Reject with the database error message if an error occurs
                reject({
                    status: 500,
                    message: "Internal server error. Please try again later.",
                });
            }
        });
    }
};

module.exports = Todo;
