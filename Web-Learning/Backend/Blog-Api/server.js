require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const blogRoutes = require('./routes/blogRoutes');
const authorRoutes = require('./routes/authorRoutes'); // Import author routes
app.use('/api/blogs', blogRoutes);
app.use('/api/authors', authorRoutes); // Set up the endpoint for authors

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));