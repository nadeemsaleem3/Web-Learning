const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

// Configure storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Set upload directory
    },
    filename: (req, file, cb) => {
        // Use the original filename with a timestamp to avoid overwriting
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// Route to serve the file upload form (Optional)
app.get("/", (req, res) => {
    res.send(`
        <h1>Upload a File</h1>
        <form action="/upload" method="POST" enctype="multipart/form-data">
            <input type="file" name="file" required>
            <button type="submit">Upload</button>
        </form>
    `);
});

// Route to handle file upload
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    
    // Successful file upload response
    res.status(200).send({
        message: "File uploaded successfully!",
        file: req.file
    });
});

// Serve the uploaded files (Optional: Allows users to download files)
app.use("/uploads", express.static("uploads"));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});