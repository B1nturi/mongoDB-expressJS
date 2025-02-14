const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userSchema = require('../schemas/userSchema');

// Correct way to define the model
const User = mongoose.model('User', userSchema);

// signup
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
            status: req.body.status
        });
        await newUser.save();
        res.status(201).json({
            message: 'User added successfully',
            //data: newUser
        });
    } catch (err) {
        res.status(500).json({ error: "There was an error while adding the user" });
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ 
                username: user.username,
                userId: user._id
            }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({
                message: 'Login successful',
                access_token: token
            });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ error: "There was an error while logging in" });
    }
});

// get all users
router.get('/all', async (req, res) => {
    try {
        const users = await User.find().populate('todos');
        res.status(200).json({
            message: 'Users are fetched successfully',
            data: users
        });
    } catch (err) {
        res.status(500).json({ error: "There was an error while getting the users" });
    }
});

// Export the router
module.exports = router;
