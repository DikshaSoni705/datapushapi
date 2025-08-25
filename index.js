const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
app.use(express.json());

const connectDB = require('./db');
connectDB();

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    dob: { type: String, required: true },
    pancard: { type: String, required: true },
    employeeType: { type: String, required: true }
}, { strict: false });
const User = mongoose.model('testapi', userSchema);

app.post('/client', async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            // Extract all mobile numbers from the request
            const mobiles = req.body.map(user => user.mobile);

            // Check which mobiles already exist
            const existingUsers = await User.find({ mobile: { $in: mobiles } });
            if (existingUsers.length > 0) {
                const existingMobiles = existingUsers.map(u => u.mobile);
                return res.status(400).json({
                    error: `Mobile number(s) already exist: ${existingMobiles.join(', ')}`
                });
            }

            // Insert users if no duplicates found
            const users = await User.insertMany(req.body, { ordered: false });
            return res.status(201).json({ message: 'Users added successfully', users });
        } else {
            // Check single user duplicate
            const existingUser = await User.findOne({ mobile: req.body.mobile });
            if (existingUser) {
                return res.status(400).json({ error: 'Mobile number already exists' });
            }

            // Insert single user
            const newUser = new User(req.body);
            await newUser.save();
            return res.status(201).json({ message: 'User added successfully', user: newUser });
        }
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'All fields are required' });
        }
        res.status(500).json({ error: 'Error saving user' });
    }
});



app.get('/get-client', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

