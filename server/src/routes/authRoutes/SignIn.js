const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../../models/AdminRegistrationModel');
const UserSession = require('../../models/AdminSessionsModel');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Route to handle user sign-in
router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);

        // Find the user by username
        let user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const exp = 5000;
        // Generate JWT token
        const token = jwt.sign({ admin_id: user.admin_id }, JWT_SECRET, { expiresIn: `${exp}s` });

        // Delete password field from user object
        delete user.password;

        // Attach token to user object
        user.token = token;

        // Generate session ID
        const admin_session_id = uuidv4();

        // Calculate session expiration time
        const expires_at = new Date(Date.now() + exp * 1000); // 10 seconds from now

        // Create session record in the database
        await UserSession.create({
            admin_session_id,
            admin_id: user.admin_id,
            expires_at
        });

        // Set JWT token as a cookie
        res.cookie('purogen_cookie', token, { httpOnly: true, expires: expires_at, secure: true });

        // Return success response with modified user object
        user.password = undefined;
        user.admin = undefined;
        user.created_at = undefined;
        user.updated_at = undefined;
        user.phone_number = undefined;
        user.email = undefined;
        
        
        // console.log(user);
        res.status(200).json({ message: 'Sign-in successful', user, token });

    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ error: 'Error signing in' });
    }
});

module.exports = router;
