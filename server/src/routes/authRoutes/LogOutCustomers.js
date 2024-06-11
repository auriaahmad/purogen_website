const express = require('express');
const router = express.Router();
const  CustomerSession  = require('../../models/CustomerSessionsModel');

// Route to handle user logout
router.post('/customer', async (req, res) => {
    try {
        const { customer_session_id } = req.body;
        // Delete the session record from the database
        await CustomerSession.destroy({ where: { customer_session_id } });

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
