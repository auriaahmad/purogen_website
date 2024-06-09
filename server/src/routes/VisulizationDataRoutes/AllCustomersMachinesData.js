// src/routes/dataRoutes.js

const express = require('express');
const router = express.Router();
const UserData = require('../../models/CustomerMachineDataModel');

router.get('/', async (req, res) => {
    try {
        const userData = await UserData.findAll();
        res.json(userData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

module.exports = router;