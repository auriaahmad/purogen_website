const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const  User  = require('../../models/CustomerRegistrationModel');
const validator = require('../../middleware/dataValidator');

// Route to register a new user
router.post('/', validator,  async (req, res) => {
    try {
        const { box_name, username, first_name, last_name, phone_number, password, email } = req.body;

        // Check if username already exists
        let existingBoxName = await User.findOne({ where: { box_name } });
        if (existingBoxName) {
            return res.status(400).json({ error: 'Box Name Already Exist' });
        }

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
            box_name,
            username,
            first_name,
            last_name,
            phone_number,
            password: hashedPassword,
            email
        });

        res.status(201).json({ message: 'Customer registered successfully', user: {
            
                user_id: newUser.user_id,
                box_name: newUser.box_name,
                username: newUser.username,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                phone_number: newUser.phone_number,
                password: password,
                email: newUser.email
        } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

module.exports = router;
