const express = require("express");
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

const tasksFilePath = path.join(__dirname, "tasks.json");

// Load tasks from file
function loadTasks() {
    if (!fs.existsSync(tasksFilePath)) {
        return [];
    }
    try {
        const data = fs.readFileSync(tasksFilePath);
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading tasks.json:", error);
        return [];
    }
}

// Save tasks to file
function saveTasks(tasks) {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

// Reschedule tasks on startup
const tasks = loadTasks();
tasks.forEach(({ task, time }) => {
    if (cron.validate(time)) {
        cron.schedule(time, () => {
            console.log(`Running task: ${task}`);
        });
    } else {
        console.error(`Invalid cron expression skipped: ${time}`);
    }
});

// Endpoint to add a new task
app.post("/schedule", (req, res) => {
    const { task, time } = req.body;

    if (!task || !time) {
        return res.status(400).json({ message: "Task and time are required" });
    }

    if (!cron.validate(time)) {
        return res.status(400).json({ message: "Invalid cron expression" });
    }

    // Schedule the task
    cron.schedule(time, () => {
        console.log(`Running task: ${task}`);
    });

    // Store the task info
    const tasks = loadTasks();
    tasks.push({ task, time }); // Don't store cron object
    saveTasks(tasks);

    res.status(200).json({ message: "Task scheduled successfully", task, time });
});

// Endpoint to list all scheduled tasks
app.get("/tasks", (req, res) => {
    const tasks = loadTasks();
    res.status(200).json(tasks);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});