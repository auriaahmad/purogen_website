// src/routes/dataRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../../models/UserRegistrationModel');

router.get('/', async (req, res) => {
    try {
        const userList = await User.findAll();
        // Remove the unwanted fields
        const cleanedUserList = userList.map(user => {
            const { password, ...cleanedUser } = user.dataValues;
            return cleanedUser;
        });
        res.json(cleanedUserList);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

module.exports = router;
