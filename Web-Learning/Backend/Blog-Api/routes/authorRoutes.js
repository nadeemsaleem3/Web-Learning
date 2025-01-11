const express = require('express');
const router = express.Router();
const { Author } = require('../models/Blog');  // Import Author model

// CREATE a new author
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newAuthor = new Author({ name, email });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all authors
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ a single author by ID
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE an author by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true } // Return the updated document
    );
    if (!updatedAuthor) return res.status(404).json({ message: 'Author not found' });
    res.json(updatedAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an author by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) return res.status(404).json({ message: 'Author not found' });
    res.json({ message: 'Author deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;