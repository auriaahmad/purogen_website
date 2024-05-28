// src/routes/dataRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../../models/UserRegistrationModel');

router.get('/', async (req, res) => {
    try {
        const userList = await User.findAll();
        res.json(userList);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

module.exports = router;
