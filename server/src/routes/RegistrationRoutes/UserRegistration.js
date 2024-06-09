const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const  User  = require('../../models/UserRegistrationModel');
const validator = require('../../middleware/dataValidator');
router.post('/', validator,  async (req, res) => {
    try {
        const { customer_id, username, first_name, last_name, phone_number, password, email } = req.body;
        let existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        existingUser = await User.findOne({ where: { phone_number } });
        if (existingUser) {
            return res.status(400).json({ error: 'Phone number already exists' });
        }
        existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const user_id = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            user_id,
            customer_id,
            username,
            first_name,
            last_name,
            phone_number,
            password: hashedPassword,
            email
        });

        res.status(201).json({ message: 'Admin registered successfully', user: {
            
                user_id: newUser.user_id,
                customer_id: newUser.customer_id,
                username: newUser.username,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                phone_number: newUser.phone_number,
                password: password,
                email: newUser.email
        } });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

module.exports = router;