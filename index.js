const express = require('express');
require('dotenv').config();
const { authMiddleware } = require('./middleware/auth');
const cartRoutes = require('./routes/cart');


const app = express();
app.use(express.json());

// Apply authentication middleware to all cart routes
app.use('/api/cart', authMiddleware, cartRoutes);

// Catch undefined routes
app.use((req, res) => {
    res.status(404).json({
      error: 'Route not found',
    });
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;