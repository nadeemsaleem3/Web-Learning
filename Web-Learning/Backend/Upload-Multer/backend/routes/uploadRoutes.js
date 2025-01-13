const express = require('express');
const upload = require('../middlewares/uploadMiddleware'); // Import the configured upload middleware
const router = express.Router();

router.post('/upload', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err.message);
      return res.status(400).json({ error: err.message });
    } else if (err) {
      console.error('General error:', err.message);
      return res.status(500).json({ error: 'Error uploading file' });
    }

    if (!req.file) {
      console.log('No file received');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File received:', req.file);
    res.status(200).json({
      message: 'File uploaded successfully',
      file: req.file,
    });
  });
});

module.exports = router;