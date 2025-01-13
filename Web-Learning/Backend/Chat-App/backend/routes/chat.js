const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Fetch all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 }).limit(50);
        res.json(messages.reverse());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Save a new message
router.post('/', async (req, res) => {
    const { username, content } = req.body;
    try {
        const newMessage = new Message({ username, content });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;