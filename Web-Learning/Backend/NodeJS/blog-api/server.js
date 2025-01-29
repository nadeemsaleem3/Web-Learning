require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("DB Connection Error:", err));

// Routes
app.use("/api/posts", require("./routes/postRoutes"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));