const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const  User  = require('../../models/User');
const validator = require('../../middleware/dataValidator');

// Route to register a new user
router.post('/', validator,  async (req, res) => {
    try {
        const { username, first_name, last_name, phone_number, password, email, admin } = req.body;

        // Check if username already exists
        let existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Check if phone number already exists
        existingUser = await User.findOne({ where: { phone_number } });
        if (existingUser) {
            return res.status(400).json({ error: 'Phone number already exists' });
        }

        // Check if email already exists
        existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Generate UUID for user_id
        const user_id = uuidv4();

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user in the database
        const newUser = await User.create({
            user_id,
            username,
            first_name,
            last_name,
            phone_number,
            password: hashedPassword,
            email,
            admin
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

module.exports = router;
