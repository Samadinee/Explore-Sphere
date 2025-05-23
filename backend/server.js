// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Apply JSON parsing middleware first
app.use(express.json());

// Configuring CORS to allow specific origins
const allowedOrigins = [
  'https://6815d88501302c81f78830e5--explore-sphere.netlify.app',
  'https://explore-sphere.netlify.app',
  'http://localhost:3000',
  'http://localhost:5000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Loading environment variables
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

console.log('JWT_SECRET loaded:', JWT_SECRET);

// Connecting to MongoDB
console.log('Attempting to connect to MongoDB...');
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Setting up routes
app.use('/api/auth', authRoutes);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Error handling middleware - corrected to properly handle errors
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Request Headers:', req.headers);
  res.status(500).json({ error: err.message || 'Internal server error' });
});