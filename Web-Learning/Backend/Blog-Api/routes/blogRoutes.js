const express = require('express');
const router = express.Router();
const { Blog, Author } = require('../models/Blog'); // Import both Blog and Author models

// CREATE a new blog
router.post('/', async (req, res) => {
  try {
    // Destructure the incoming request body to get title, content, and authorId
    const { title, content, authorId } = req.body;

    // Find the Author by its ID
    const author = await Author.findById(authorId); 

    if (!author) {
      // If no author found, return an error response
      return res.status(404).json({ message: 'Author not found' });
    }

    // Create a new blog post with the provided details
    const newBlog = new Blog({ title, content, author: authorId }); 
    await newBlog.save();  // Save the new blog to the database

    // Add the newly created blog post's ID to the author's posts list
    author.posts.push(newBlog._id);
    await author.save();  // Save the updated author document

    res.status(201).json(newBlog); // Return the newly created blog post
  } catch (err) {
    res.status(400).json({ message: err.message }); // Return error if something went wrong
  }
});

// READ all blogs
router.get('/', async (req, res) => {
  try {
    // Fetch all blog posts and populate the author information (name, email)
    const blogs = await Blog.find().populate('author', 'name email');
    res.json(blogs); // Return the fetched blogs
  } catch (err) {
    res.status(500).json({ message: err.message }); // Return error in case of server failure
  }
});

// READ a single blog by ID
router.get('/:id', async (req, res) => {
  try {
    // Fetch a single blog by ID and populate the author's name and email
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    
    if (!blog) {
      // If the blog doesn't exist, return an error
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json(blog); // Return the found blog
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle any errors during fetching
  }
});

// UPDATE a blog by ID
router.put('/:id', async (req, res) => {
  try {
    // Destructure the request body to get updated title, content, and authorId
    const { title, content, authorId } = req.body;

    // Find the author by ID
    const author = await Author.findById(authorId);
    
    if (!author) {
      // If author not found, return an error
      return res.status(404).json({ message: 'Author not found' });
    }

    // Update the blog post with the new values (title, content, author)
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,  // Find the blog by its ID
      { title, content, author: authorId }, // Updated values
      { new: true } // Return the updated document
    );

    if (!updatedBlog) {
      // If the blog is not found, return an error
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(updatedBlog); // Return the updated blog
  } catch (err) {
    res.status(400).json({ message: err.message }); // Return error in case of failure
  }
});

// DELETE a blog by ID
router.delete('/:id', async (req, res) => {
  try {
    // Find the blog by its ID and delete it
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      // If the blog is not found, return an error
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Optionally, remove the deleted blog post's ID from the author's posts list
    const author = await Author.findById(deletedBlog.author);
    if (author) {
      // Filter out the deleted blog post ID from the author's posts array
      author.posts = author.posts.filter(postId => !postId.equals(deletedBlog._id));
      await author.save(); // Save the updated author document
    }

    res.json({ message: 'Blog deleted' }); // Return success message
  } catch (err) {
    res.status(500).json({ message: err.message }); // Return error if something goes wrong
  }
});

module.exports = router;