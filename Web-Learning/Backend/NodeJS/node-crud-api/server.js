const http = require("http");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const PORT = 3000;
const dataFilePath = path.join(__dirname, "data", "users.json");

const server = http.createServer((req, res) => {
    // Middleware to parse JSON bodies
    if (req.headers["content-type"] === "application/json") {
        bodyParser.json()(req, res, () => {});
    }

    // GET users (Read)
    if (req.method === "GET" && req.url === "/users") {
        fs.readFile(dataFilePath, "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Unable to read data" }));
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
        });
    }

    // POST user (Create)
    else if (req.method === "POST" && req.url === "/users") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            const newUser = JSON.parse(body);

            fs.readFile(dataFilePath, "utf8", (err, data) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ error: "Unable to read data" }));
                }

                const users = JSON.parse(data);
                const newId = users.length ? users[users.length - 1].id + 1 : 1;
                newUser.id = newId;

                users.push(newUser);

                fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "application/json" });
                        return res.end(JSON.stringify({ error: "Unable to save data" }));
                    }

                    res.writeHead(201, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(newUser));
                });
            });
        });
    }

    // PUT user (Update)
    else if (req.method === "PUT" && req.url.startsWith("/users/")) {
        const id = parseInt(req.url.split("/")[2]);

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            const updatedUser = JSON.parse(body);

            fs.readFile(dataFilePath, "utf8", (err, data) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ error: "Unable to read data" }));
                }

                const users = JSON.parse(data);
                const userIndex = users.findIndex(u => u.id === id);

                if (userIndex === -1) {
                    res.writeHead(404, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ error: "User not found" }));
                }

                // Update the user details
                users[userIndex] = { ...users[userIndex], ...updatedUser };

                fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500, { "Content-Type": "application/json" });
                        return res.end(JSON.stringify({ error: "Unable to save data" }));
                    }

                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(users[userIndex]));
                });
            });
        });
    }

    // DELETE user (Delete)
    else if (req.method === "DELETE" && req.url.startsWith("/users/")) {
        const id = parseInt(req.url.split("/")[2]);

        fs.readFile(dataFilePath, "utf8", (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Unable to read data" }));
            }

            const users = JSON.parse(data);
            const userIndex = users.findIndex(u => u.id === id);

            if (userIndex === -1) {
                res.writeHead(404, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "User not found" }));
            }

            // Remove the user from the list
            users.splice(userIndex, 1);

            fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ error: "Unable to save data" }));
                }

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "User deleted" }));
            });
        });
    }

    // Handle 404
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});