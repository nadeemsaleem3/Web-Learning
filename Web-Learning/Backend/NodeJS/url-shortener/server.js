const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const urlRoutes = require("./routes/urlRoutes");

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/urlshortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to MongoDB:", error);
});

// Use the URL routes
app.use("/api", urlRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});