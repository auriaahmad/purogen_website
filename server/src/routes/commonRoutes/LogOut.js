// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const  UserSession  = require('../../models/UserSessions');

// Route to handle user logout
router.post('/', async (req, res) => {
    try {
        // Extract the session ID from the request
        // console.log(req);
        const { session_id } = req.body;

        // Delete the session record from the database
        await UserSession.destroy({ where: { session_id } });

        // Clear the JWT token cookie
        res.clearCookie('token');

        // Return success response
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ error: 'Error logging out' });
    }
});

module.exports = router;
