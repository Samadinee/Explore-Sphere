// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  
    // Log the JWT_SECRET to confirm it's being used
    console.log("JWT_SECRET for signing:", JWT_SECRET);
  
    const token = jwt.sign({ id: user._id, username: user.username },JWT_SECRET, {
      expiresIn: '1h',
    });
  
    res.json({ token });
  };
  

exports.getProfile = async (req, res) => {
  const { username } = req.user;
  const user = await User.findOne({ username }).select('-password');
  res.json(user);
};


exports.toggleFavorite = async (req, res) => {
  const userId = req.user.id;
  const { countryCode } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const index = user.favorites.indexOf(countryCode);
  if (index > -1) {
    user.favorites.splice(index, 1); // remove
  } else {
    user.favorites.push(countryCode); // add
  }

  await user.save();
  res.json({ favorites: user.favorites });
};

exports.getFavorites = async (req, res) => {
  const user = await User.findById(req.user.id).select('favorites');
  res.json({ favorites: user?.favorites || [] });
};