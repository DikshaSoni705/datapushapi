
const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://diksha089:Soni%401616@cluster0.ns6hza9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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
