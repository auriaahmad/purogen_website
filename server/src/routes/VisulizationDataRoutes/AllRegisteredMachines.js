// src/routes/dataRoutes.js

const express = require('express');
const router = express.Router();
const Machine = require('../../models/MachineRegistrationModel');

router.get('/', async (req, res) => {
    try {
        const MachineList = await Machine.findAll();
        res.json(MachineList);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

module.exports = router;
