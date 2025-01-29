const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const querystring = require("querystring");
const cookieParser = require("cookie-parser");

const server = http.createServer((req, res) => {
    // Use cookie-parser middleware to parse cookies
    cookieParser()(req, res, () => {});

    // Normalize URL path
    const parsedUrl = url.parse(req.url, true);
    let requestedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, "");

    // Serve index page directly if logged in
    if (req.method === "GET" && requestedPath === "") {
        if (req.cookies && req.cookies.authenticated === "true") {
            // If logged in, redirect to index.html
            const filePath = path.join(__dirname, "public", "index.html");
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(404, { "Content-Type": "text/html" });
                    res.end("<h1>404 - File Not Found</h1>");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }
            });
        } else {
            // If not logged in, serve the login page
            const filePath = path.join(__dirname, "public", "login.html");
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(404, { "Content-Type": "text/html" });
                    res.end("<h1>404 - File Not Found</h1>");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(content);
                }
            });
        }
    }

    // Handle login submission
    else if (req.method === "POST" && requestedPath === "login") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const parsedData = querystring.parse(body);
            const username = parsedData.username;
            const password = parsedData.password;

            // Simulate simple authentication (without a real database)
            if (username === "admin" && password === "password") {
                res.writeHead(200, {
                    "Content-Type": "text/html",
                    "Set-Cookie": "authenticated=true; HttpOnly"
                });
                res.end("<h1>Login successful!</h1><a href='/'>Go to home</a>");
            } else {
                res.writeHead(401, { "Content-Type": "text/html" });
                res.end("<h1>Login failed. Invalid credentials.</h1><a href='/'>Try again</a>");
            }
        });
    }

    // Handle logout (via navbar action)
    else if (req.method === "GET" && requestedPath === "logout") {
        res.writeHead(200, {
            "Content-Type": "text/html",
            "Set-Cookie": "authenticated=false; Max-Age=0; HttpOnly"
        });
        res.end("<h1>You have logged out successfully.</h1><a href='/'>Go to home</a>");
    }

    // Serve other static files (HTML, CSS, JS, etc.)
    else {
        let filePath = path.join(__dirname, "public", requestedPath === "" ? "index.html" : requestedPath + ".html");
        const extname = path.extname(filePath);
        let contentType = "text/html";

        switch (extname) {
            case ".css":
                contentType = "text/css";
                break;
            case ".js":
                contentType = "application/javascript";
                break;
            case ".png":
                contentType = "image/png";
                break;
            case ".jpg":
            case ".jpeg":
                contentType = "image/jpeg";
                break;
            case ".gif":
                contentType = "image/gif";
                break;
            case ".svg":
                contentType = "image/svg+xml";
                break;
        }

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("<h1>404 - Page Not Found</h1>");
            } else {
                res.writeHead(200, { "Content-Type": contentType });
                res.end(content);
            }
        });
    }
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});