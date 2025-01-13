const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product'); // Assuming the product model is stored here
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

// MongoDB connection
connectDB();

// Middleware
app.use(express.json());

// Routes
app.get('/products', async (req, res) => {
  try {
    // Get pagination parameters from the query string
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 products per page
    const skip = (page - 1) * limit;

    // Get filters from query parameters
    const searchQuery = req.query.search || ''; // Default to empty string if no search term
    const category = req.query.category || '';
    const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : 0;
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : Infinity;

    // Build the query object dynamically based on filters
    let filter = {};

    // Search by name or description
    if (searchQuery) {
      filter.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },  // Case-insensitive search
        { description: { $regex: searchQuery, $options: 'i' } }
      ];
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice !== Infinity) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }

    // Fetch filtered and paginated products from MongoDB
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit);

    // Get the total count of filtered products
    const totalProducts = await Product.countDocuments(filter);

    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / limit);

    // Return paginated data with filters applied
    res.json({
      currentPage: page,
      totalPages: totalPages,
      totalProducts: totalProducts,
      products: products
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});