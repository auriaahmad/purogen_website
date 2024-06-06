// Import necessary modules
const express = require('express');
const router = express.Router();
const Customer = require('../../models/CustomerRegistrationModel'); // Assuming this is the Customer model

// Route to handle customer updating
router.put('/:customerId', async (req, res) => {
    try {
        const customer_id = req.params.customerId;
        const { box_name, first_name, last_name, phone_number, email } = req.body;

        // Check if the customer exists
        const customer = await Customer.findByPk(customer_id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Update the customer details, excluding username and password
        customer.box_name = box_name || customer.box_name;
        customer.first_name = first_name || customer.first_name;
        customer.last_name = last_name || customer.last_name;
        customer.phone_number = phone_number || customer.phone_number;
        customer.email = email || customer.email;

        // Save the updated customer
        await customer.save();

        res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ error: 'Error updating customer' });
    }
});

// Export the router
module.exports = router;
