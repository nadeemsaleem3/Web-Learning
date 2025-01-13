const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Webhook Endpoint
app.post("/webhook", (req, res) => {
  console.log("Webhook received:", req.body);

  // Respond to the webhook
  res.status(200).send("Webhook received!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});