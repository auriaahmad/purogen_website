// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const  AdminSession  = require('../../models/AdminSessionsModel');

// Route to handle user logout
router.post('/', async (req, res) => {
    try {
        // Extract the session ID from the request
        // console.log(req);
        const { admin_session_id } = req.body;
        // Delete the session record from the database
        await AdminSession.destroy({ where: { admin_session_id } });

        // Clear the JWT token cookie
        res.clearCookie('purogen_cookie');

        // Return success response
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).json({ error: 'Error logging out' });
    }
});

module.exports = router;
