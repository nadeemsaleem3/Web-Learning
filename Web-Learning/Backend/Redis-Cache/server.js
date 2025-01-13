const express = require('express');
const Redis = require('ioredis');
const app = express();
const redis = new Redis(); // Connect to Redis server

// Simulated database function
const getUserFromDatabase = (userId) => {
  // Simulate a database call with some delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: 'John Doe',
        age: 30,
      });
    }, 2000); // Simulated delay for DB query
  });
};

// API to get user profile
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  // Check if data is cached in Redis
  const cachedData = await redis.get(userId);

  if (cachedData) {
    console.log('Cache hit');
    // If data is in cache, return it
    return res.json(JSON.parse(cachedData));
  } else {
    console.log('Cache miss');
    // If data is not cached, fetch it from the database
    const user = await getUserFromDatabase(userId);

    // Cache the user data in Redis with an expiration time of 1 hour (3600 seconds)
    redis.setex(userId, 3600, JSON.stringify(user));

    // Return the user data
    return res.json(user);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});