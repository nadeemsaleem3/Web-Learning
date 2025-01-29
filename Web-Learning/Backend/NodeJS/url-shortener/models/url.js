const mongoose = require("mongoose");

// Define URL schema
const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
});

// Create URL model from schema
const Url = mongoose.model("Url", urlSchema);

module.exports = Url;