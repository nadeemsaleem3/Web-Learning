const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const uploadRoutes = require('./routes/uploadRoutes'); 

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
  }));

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use upload routes
app.use('/api', uploadRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));