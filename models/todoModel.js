const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    isCompleted: {
        type: Boolean,
        require: true
    },
    userId: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("todo", todoSchema);