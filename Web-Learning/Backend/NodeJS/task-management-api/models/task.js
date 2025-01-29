const mongoose = require("mongoose");

// Define Task schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

// Create Task model from schema
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;