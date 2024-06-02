// src/routes/dataRoutes.js

const express = require('express');
const router = express.Router();
const Customer = require('../../models/CustomerRegistrationModel');

router.get('/', async (req, res) => {
    try {
        const customerList = await Customer.findAll();

        // Remove the unwanted fields
        const cleanedCustomerList = customerList.map(customer => {
            const { password, ...cleanedCustomer } = customer.dataValues;
            return cleanedCustomer;
        });

        res.json(cleanedCustomerList);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

module.exports = router;
