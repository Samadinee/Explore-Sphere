// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// CORS Configuration
const allowedOrigins = [
  'https://6815d88501302c81f78830e5--explore-sphere.netlify.app', // Correct Netlify URL
  'http://localhost:3000', // For local development
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  })
);

// Handle CORS preflight requests
app.options('*', cors());

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Routes
app.use('/api/auth', authRoutes);

// DB Connection
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err.message, err.stack);
    process.exit(1);
  }
};

connectDB();

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', {
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    headers: req.headers,
  });
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});