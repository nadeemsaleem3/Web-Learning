const express = require("express");
const Task = require("../models/task");

const router = express.Router();

// Create a new task
router.post("/tasks", async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ title, description });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all tasks
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single task by ID
router.get("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a task
router.put("/tasks/:id", async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, completed },
            { new: true }
        );
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a task
router.delete("/tasks/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;