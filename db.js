
const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/test';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
