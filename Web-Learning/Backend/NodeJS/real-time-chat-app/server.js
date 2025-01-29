const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static("public"));

// Listen for incoming connections from clients
io.on("connection", (socket) => {
    console.log("A user connected");

    // Listen for chat messages from the client
    socket.on("chatMessage", (msg) => {
        console.log("Message received:", msg);

        // Broadcast the message to all other clients
        io.emit("chatMessage", msg);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});