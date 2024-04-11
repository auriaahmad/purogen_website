// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const UserSession  = require('../models/UserSessions');
require('dotenv').config(); 
const JWT_SECRET = process.env.JWT_SECRET;

// Route to handle user sign-in
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);

        // Find the user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: '30s' });
        console.log(token);

        // Generate session ID
        const session_id = uuidv4();
        console.log(session_id);

        // Calculate session expiration time
        const expires_at = new Date(Date.now() + 30 * 1000); // 30 seconds from now
        console.log(expires_at);

        // Create session record in the database
        await UserSession.create({
            session_id,
            user_id: user.user_id,
            expires_at
        });

        // Set JWT token as a cookie
        res.cookie('token', token, { httpOnly: true, expires: expires_at });

        // Return success response
        res.status(200).json({ message: 'Sign-in successful', token });
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ error: 'Error signing in' });
    }
});

module.exports = router;
