const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// User Schema
const authorSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
  });
  
  // Models
  const Author = mongoose.model('Author', authorSchema);
  const Blog = mongoose.model('Blog', BlogSchema);

module.exports = {Author, Blog};