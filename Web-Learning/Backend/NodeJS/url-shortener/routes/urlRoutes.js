const express = require("express");
const Url = require("../models/url");
const shortid = require("shortid");

const router = express.Router();

// Generate a short URL
router.post("/shorten", async (req, res) => {
    try {
        const { longUrl } = req.body;

        // Check if the long URL is already shortened
        const existingUrl = await Url.findOne({ longUrl });
        if (existingUrl) {
            return res.status(200).json({ shortUrl: existingUrl.shortUrl });
        }

        // Generate a short URL using shortid
        const shortUrl = shortid.generate();
        const newUrl = new Url({
            longUrl,
            shortUrl,
        });

        // Save the new URL
        await newUrl.save();
        res.status(201).json({ shortUrl });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Redirect to the original long URL using the short URL
router.get("/:shortUrl", async (req, res) => {
    try {
        const shortUrl = req.params.shortUrl;

        // Find the URL in the database
        const url = await Url.findOne({ shortUrl });
        if (!url) return res.status(404).json({ message: "URL not found" });

        // Redirect to the original long URL
        res.redirect(url.longUrl);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;