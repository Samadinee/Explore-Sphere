require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route (Handle GET request to /)
app.get('/', (req, res) => {
  res.send('Hello, World!'); // Simple response for the root URL
});

// Routes
app.use('/api/auth', authRoutes);

// DB Connection
const connectDB = async () => {
  try {
    console.log("MONGO_URI loaded:", process.env.MONGO_URI); // Debugging Mongo URI
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1); // Exit on error
  }
};

connectDB();

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Something went wrong!" });
});
