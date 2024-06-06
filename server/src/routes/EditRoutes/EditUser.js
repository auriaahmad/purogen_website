// Import necessary modules
const express = require('express');
const router = express.Router();
const User = require('../../models/UserRegistrationModel'); // Assuming this is the User model

// Route to handle user updating
router.put('/:userId', async (req, res) => {
    try {
        const user_id = req.params.userId;
        const { first_name, last_name, phone_number, email } = req.body;

        // Check if the user exists
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user details, excluding username and password
        user.first_name = first_name || user.first_name;
        user.last_name = last_name || user.last_name;
        user.phone_number = phone_number || user.phone_number;
        user.email = email || user.email;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user'});
    }
});

// Export the router
module.exports = router;
