// Import necessary modules
const express = require('express');
const router = express.Router();
const User = require('../../models/UserRegistrationModel'); // Assuming this is the User model

// Route to handle user deletion
router.delete('/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;

        // Check if the user exists
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete the user
        await user.destroy();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Error deleting user' });
    }
});

// Export the router
module.exports = router;